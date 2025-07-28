import streamlit as st

def apply_theme(theme: str):
    if theme.lower() == "dark":
        st.markdown(
            """
            <style>
            .reportview-container {
                background-color: #0e1117;
                color: white;
            }
            </style>
            """,
            unsafe_allow_html=True,
        )
    else:
        # Reset or apply light theme by clearing the style or setting default
        st.markdown(
            """
            <style>
            .reportview-container {
                background-color: white;
                color: black;
            }
            </style>
            """,
            unsafe_allow_html=True,
        )
