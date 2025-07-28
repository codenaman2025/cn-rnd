import streamlit as st
from src.ui.pages import (
    home_page,
    upload_resume_page,
    import_linkedin_page,
    ai_extraction_page,
    profile_review_page,
    data_export_page,
)
from src.utils.themes import apply_theme


def main():
    st.set_page_config(page_title="AI Job Portal POC", layout="wide", initial_sidebar_state="expanded")

    st.sidebar.title("Navigation")
    page = st.sidebar.radio(
        "Go to",
        [
            "Home",
            "Upload Resume",
            "Import LinkedIn",
            "Profile Review",
            "Data Export",
        ],
    )

    if page == "Home":
        home_page()
    elif page == "Upload Resume":
        upload_resume_page()
    elif page == "Import LinkedIn":
        import_linkedin_page()
    elif page == "AI Extraction":
        ai_extraction_page()
    elif page == "Profile Review":
        profile_review_page()
    elif page == "Data Export":
        data_export_page()
    else:
        st.write("Page not found")


if __name__ == "__main__":
    main()
