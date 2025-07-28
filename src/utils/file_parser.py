import pdfplumber
from docx import Document

def extract_text_from_pdf(file) -> str:
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()

def extract_text_from_docx(file) -> str:
    doc = Document(file)
    full_text = []

    # Extract paragraphs in body
    for para in doc.paragraphs:
        if para.text.strip():
            full_text.append(para.text.strip())

    # Extract text from tables
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                cell_text = cell.text.strip()
                if cell_text:
                    full_text.append(cell_text)

    # Extract headers and footers text if possible
    # Note: python-docx does not provide simple interface for headers/footers
    # But you can try:
    for section in doc.sections:
        header = section.header
        for para in header.paragraphs:
            if para.text.strip():
                full_text.append(para.text.strip())
        footer = section.footer
        for para in footer.paragraphs:
            if para.text.strip():
                full_text.append(para.text.strip())

    # Join with newlines
    return "\n".join(full_text).strip()


def extract_resume_text(uploaded_file) -> str:
    if uploaded_file.type == "application/pdf":
        return extract_text_from_pdf(uploaded_file)
    elif uploaded_file.type in ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"]:
        return extract_text_from_docx(uploaded_file)
    else:
        raise ValueError("Unsupported file type for resume upload")
