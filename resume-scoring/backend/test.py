# import requests
# from supabase_client import supabase

# def test_get_jobs():
#     url = "http://127.0.0.1:8000/jobs"
#     try:
#         response = requests.get(url)
#         response.raise_for_status() 
#         jobs = response.json()
#         print("Jobs fetched successfully:")
#         for job in jobs:
#             print(job)
#     except requests.exceptions.RequestException as e:
#         print(f"Request failed: {e}")

# def test_supabase_connection():
#     try:
#         res = supabase.table("jobs").select("*").limit(1).execute()
#         if res.data is not None:
#             print("Supabase connection successful! Sample data:", res.data)
#         else:
#             print("Supabase connection OK but no data returned.")
#     except Exception as e:
#         print("Error connecting to Supabase:", e)

# if __name__ == "__main__":
#     test_get_jobs()
#     test_supabase_connection()

import requests

def test_login(email, password):
    url = "http://127.0.0.1:8000/login"
    payload = {
        "email": email,
        "password": password
    }
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raises HTTPError for bad responses (4xx,5xx)
        data = response.json()
        print("Login successful!")
        print("Response:", data)
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print("Response content:", response.text)
    except Exception as err:
        print(f"Other error occurred: {err}")

if __name__ == "__main__":
    # Replace these with your test credentials
    test_email = "parth2002j@gmail.com"
    test_password = "parth123j"
    test_login(test_email, test_password)

