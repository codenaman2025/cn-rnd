from pydantic import BaseModel, EmailStr
from typing import Optional

class SignupModel(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str  
    resume: Optional[str] = None

class LoginModel(BaseModel):
    email: EmailStr
    password: str

class JobModel(BaseModel):
    companyName: str
    jobTitle: str
    availability: int
    position: int
    jd: str

class ApplicationModel(BaseModel):
    name: str
    email: EmailStr
    appliedCompany: str
    jobTitle: str
    resume: Optional[str] = None
