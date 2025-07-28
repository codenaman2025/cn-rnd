import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

EXAMPLE_PROFILE_JSON_PATH = os.path.join(DATA_DIR, "example_profile.json")

EXAMPLE_JSON_SCHEMA = '''

{
  "name": "",
  "contact": {
    "primary_email": "",
    "secondary_email": "",
    "primary_phone": "",
    "secondary_phone": "",
    "address": ""
  },
  "links": [
    { "type": "LinkedIn", "url": "" },
    { "type": "GitHub", "url": "" },
    { "type": "YouTube", "url": "" },
    { "type": "Portfolio", "url": "" }
  ],
  "summary": "",
  "domains": [
  ],
  "education": [
    {
      "degree": "",
      "major": "",
      "institution": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "grade": ""
    }
  ],
  "experience": [
    {
      "job_title": "",
      "company": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "achievements": [
        ""
      ],
      "domains": [
        ""
      ],
      "leadership_and_mentoring": [
        ""
      ]
    }
  ],
  "skills":[
  ],
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "date": ""
    }
  ],
  "projects": [
    {
      "title": "",
      "description": "",
      "url": ""
    }
  ],
  "technical_writing_and_documentation": [
    {
      "title": "",
      "description": "",
      "date": "",
      "url": ""
    }
  ],
  "leadership_and_mentoring": [
    ""
  ],
  "patents": [
    {
      "title": "",
      "number": "",
      "date": "",
      "link": ""
    }
  ],
  "publications": [
    {
      "title": "",
      "journal": "",
      "date": "",
      "url": ""
    }
  ],
  "open_source_contributions": [
    {
      "project": "",
      "role": "",
      "url": ""
    }
  ],
  "languages": [
    {
      "language": "",
      "proficiency": ""
    }
  ],
  "interests": [
    ""
  ],
  "additional_information": ""
}

'''