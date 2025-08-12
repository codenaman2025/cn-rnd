from fastapi import FastAPI, HTTPException, Form, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from supabase_client import supabase
from dotenv import load_dotenv
from typing import Optional
import traceback, logging
import uuid

load_dotenv()
logger = logging.getLogger("uvicorn.error")

FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
]

app = FastAPI(title="Job Portal API - FastAPI + Supabase")

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class LoginModel(BaseModel):
    email: EmailStr
    password: str

class JobModel(BaseModel):
    companyname: str = Field(..., alias="companyName")  
    jobtitle: str = Field(..., alias="jobTitle")        
    availability: int
    position: int
    jd: str

    model_config = {
        "populate_by_name": True  
    }

class ApplicationModel(BaseModel):
    name: str
    email: EmailStr
    appliedcompany: str
    jobtitle: str
    resume: Optional[str] = None  


def sanitize_user(user: dict) -> dict:
    user_copy = dict(user)
    user_copy.pop("password", None)
    return user_copy


async def save_resume_to_supabase_storage(resume: UploadFile) -> str:
    contents = await resume.read()
    filename = f"{uuid.uuid4()}_{resume.filename}"

    response = supabase.storage.from_('resumes').upload(filename, contents)

    if hasattr(response, "status_code") and response.status_code != 200:
        error_msg = getattr(response, "error", "Unknown error during upload")
        raise Exception(f"Failed to upload resume: {error_msg}")

    public_url_response = supabase.storage.from_('resumes').get_public_url(filename)

    if isinstance(public_url_response, str):
        return public_url_response

    public_url = getattr(public_url_response, "public_url", None) \
                 or (public_url_response.get("publicUrl") if isinstance(public_url_response, dict) else None) \
                 or (public_url_response.get("public_url") if isinstance(public_url_response, dict) else None)

    if not public_url:
        raise Exception("Failed to get public URL for uploaded resume")

    return public_url

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.post("/signup")
async def signup(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    resume: Optional[UploadFile] = File(None),
):
    try:
        existing = supabase.table("users_plain").select("*").eq("email", email).execute()
        if existing.data:
            raise HTTPException(status_code=400, detail="Email already registered")

        if role.lower() == "job_seeker":
            if not resume:
                raise HTTPException(status_code=400, detail="Resume is required for job seekers")
            resume_url = await save_resume_to_supabase_storage(resume)
        else:
            resume_url = None

        payload = {
            "name": name,
            "email": email,
            "password": password,
            "role": role,
            "resume": resume_url,
        }

        res = supabase.table("users_plain").insert(payload).execute()
        if not res.data:
            raise HTTPException(status_code=500, detail="Failed to create user")

        created = res.data[0]
        return {"message": "User created successfully", "user": sanitize_user(created)}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Exception in /signup: {e}")
        raise HTTPException(status_code=500, detail="Server error")

@app.post("/login")
def login(credentials: LoginModel):
    try:
        user_q = supabase.table("users_plain").select("*").ilike("email", credentials.email).execute()
        if not user_q.data:
            raise HTTPException(status_code=404, detail="User not found")

        user = user_q.data[0]

        if credentials.password != user.get("password", ""):
            raise HTTPException(status_code=400, detail="Invalid credentials")

        return {"message": "Login successful", "user": sanitize_user(user)}

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Exception in /login: %s\n%s", e, traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.get("/jobs")
def get_jobs():
    try:
        res = supabase.table("jobs").select("*").execute()
        if not res.data:
            return []
        return res.data
    except Exception as e:
        logger.error("Exception in /jobs: %s\n%s", e, traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.post("/jobs")
async def create_job(request: Request):
    data = await request.json()
    print("Received data:", data)
    
    job = JobModel(**data)
    
    res = supabase.table("jobs").insert(job.dict(by_alias=False)).execute()
    
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create job")
    return {"message": "Job posted", "job": res.data[0]}

@app.post("/apply")
def apply_job(application: ApplicationModel):
    try:
        res = supabase.table("applications").insert(application.dict()).execute()
        if not res.data:
            raise HTTPException(status_code=500, detail="Failed to submit application")
        return {"message": "Application submitted", "application": res.data[0]}
    except Exception as e:
        logger.error("Exception in /apply: %s\n%s", e, traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")



@app.get("/applicants/all")
def get_all_applicants():
    try:
        res = supabase.table("applications").select("*").execute()
        if not res.data:
            return []
        return res.data
    except Exception as e:
        logger.error("Exception in /applicants/all: %s\n%s", e, traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
