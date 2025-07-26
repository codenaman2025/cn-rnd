import os
import openai
import streamlit as st
from dotenv import load_dotenv
import json
import re
from groq import Groq

load_dotenv()

# Get AI Together API key from environment variable
gorq_api_key = os.getenv("GROQ_API_KEY")

if not gorq_api_key:
    raise ValueError("Gorq API key is missing. Please set it in the .env file.")

def call_gorq_chat_completion(prompt: str) -> str:
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )

    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    content = response.choices[0].message.content.strip()
    print("LLM Response : ")
    print(content)

    # Remove `````` at the end
    # This handles cases where there might be spaces before/after the backticks
    clean_content = re.sub(r"^``````$", "", content, flags=re.DOTALL).strip()

    return clean_content
