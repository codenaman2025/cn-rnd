import os
import openai
import streamlit as st
from dotenv import load_dotenv
import json
import re

load_dotenv()

# Get AI Together API key from environment variable
ait_api_key = os.getenv("AIT_API_KEY")

if not ait_api_key:
    raise ValueError("AI Together API key is missing. Please set it in the .env file.")

def get_openai_api_key():
    # Tries to get from environment variable or streamlit secrets
    key = os.getenv("OPENAI_API_KEY")
    if not key and st.secrets.get("openai", {}).get("api_key"):
        key = st.secrets["openai"]["api_key"]
    if not key:
        st.error("OpenAI API key is missing. Please set OPENAI_API_KEY environment variable or streamlit secrets.")
        st.stop()
    return key

# def call_openai_chat_completion(prompt: str, model="gpt-4", temperature=0) -> str:
#
#     client = openai.OpenAI(
#         api_key=ait_api_key,
#         base_url='https://api.together.xyz/v1'
#     )
#     response = client.chat.completions.create(
#         model='meta-llama/Llama-3.3-70B-Instruct-Turbo',
#         messages=[
#             {"role": "user", "content": prompt}
#         ]
#     )
#     return response.choices[0].message.content.strip()


def call_openai_chat_completion(prompt: str, model="gpt-4", temperature=0) -> str:
    client = openai.OpenAI(
        api_key=ait_api_key,
        base_url='https://api.together.xyz/v1'
    )
    response = client.chat.completions.create(
        model='meta-llama/Llama-3.3-70B-Instruct-Turbo',
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    content = response.choices[0].message.content.strip()

    # Remove `````` at the end
    # This handles cases where there might be spaces before/after the backticks
    clean_content = re.sub(r"^``````$", "", content, flags=re.DOTALL).strip()

    return clean_content
