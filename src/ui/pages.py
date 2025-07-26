import streamlit as st
from streamlit_lottie import st_lottie
from src.constants import EXAMPLE_PROFILE_JSON_PATH
from src.utils.lottie_loader import load_lottie_url
from src.ui.components import render_profile_card, render_timeline
import json
import streamlit as st
from src.utils.file_parser import extract_resume_text
from src.utils.openai_api import call_openai_chat_completion
from src.constants import EXAMPLE_JSON_SCHEMA
import os


def load_example_profile():
    with open(EXAMPLE_PROFILE_JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def home_page():
    st.title("🚀 AI-Driven Job Portal: Smart Resume & LinkedIn Profiler")
    st.subheader("Transforming talent data extraction with LLMs")

    animation = load_lottie_url("https://assets4.lottiefiles.com/packages/lf20_82ytoh84.json")
    if animation:
        st_lottie(animation, height=300)

    st.markdown(
        """
    ### Welcome to the AI-Driven Job Portal
    - Seamlessly extract and structure resume/profile data for recruiters and job seekers.
    - Powered by Large Language Models for accurate and consistent data parsing.
    - Supports Resume uploads and LinkedIn profile imports.
    """
    )
    st.info("Use the sidebar to navigate through the workflow.")


def upload_resume_page():
    st.header("Upload Resume")
    uploaded_file = st.file_uploader("Upload your resume (PDF or DOCX)", type=["pdf", "docx"])
    if uploaded_file is not None:
        st.success(f"Uploaded file: {uploaded_file.name}")
        with st.spinner("Extracting resume text..."):
            try:
                resume_text = extract_resume_text(uploaded_file)
            except Exception as e:
                st.error(f"Failed to extract text from resume: {e}")
                return

        st.text_area("Extracted Resume Text (preview)", resume_text, height=500)

        if st.button("Parse Resume with AI"):
            prompt = f"""
                    You are a helpful assistant who extracts structured resume data.
                    
                    Extract relevant details from the following resume text and transform it into a JSON object strictly matching the example schema format below.
                    
                    If any data is unavailable, keep the corresponding fields empty or as empty arrays.
                    
                    Example JSON Schema:
                    {EXAMPLE_JSON_SCHEMA}
                    
                    Resume Text:
                    {resume_text}
                    
                    Notes:
                    Only return the JSON object, no additional text or quotes
                    """

            with st.spinner("Calling OpenAI Chat Completion API..."):
                try:
                    response_text = call_openai_chat_completion(prompt)
                    response_text = response_text.replace("```json","").replace("```","")
                    # Parse the JSON from the response
                    parsed_json = json.loads(response_text)
                except Exception as e:
                    st.error(f"Error parsing response from OpenAI: {e}")
                    st.text_area("OpenAI Response (raw)", response_text, height=300)
                    return

            # Save parsed JSON to file
            data_dir = os.path.join(os.getcwd(), "data")
            os.makedirs(data_dir, exist_ok=True)
            output_file = os.path.join(data_dir, "parsed_resume.json")
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(parsed_json, f, indent=2)

            st.success(f"Resume parsed and saved to {output_file}")

            # Store profile in session state for dynamic rendering
            st.session_state["parsed_profile"] = parsed_json

            st.rerun()  # Refresh app to update Profile Review page


def import_linkedin_page():
    st.header("Import LinkedIn Profile")
    linkedin_url = st.text_input("Enter LinkedIn Profile URL")
    if st.button("Import Data"):
        if not linkedin_url.strip():
            st.error("Please enter a valid LinkedIn URL.")
        else:
            st.success(f"Imported data from {linkedin_url} (demo placeholder).")
            # TODO: Integrate LinkedIn parsing here


def ai_extraction_page():
    st.header("AI Extraction")
    with st.spinner("Running AI extraction..."):
        st.info("This is a demo; your AI extraction logic would run here.")


def profile_review_page():
    st.header("Profile Preview")
    if "parsed_profile" in st.session_state:
        profile = st.session_state["parsed_profile"]
    else:
        profile = load_example_profile()

    tabs = st.tabs(["Profile Card", "Raw JSON", "Experience Timeline", "Education Timeline"])

    with tabs[0]:
        render_profile_card(profile)

    with tabs[1]:
        st.json(profile, expanded=True)

    with tabs[2]:
        render_timeline(profile.get("experience", []), "Experience")

    with tabs[3]:
        render_timeline(profile.get("education", []), "Education", date_start_key="start_date", date_end_key="end_date")


def data_export_page():
    st.header("Export Profile Data")
    if "parsed_profile" in st.session_state:
        profile = st.session_state["parsed_profile"]
    else:
        profile = load_example_profile()
    json_data = json.dumps(profile, indent=2)
    st.download_button("Download JSON", json_data, file_name="profile.json", mime="application/json")
