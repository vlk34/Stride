import pdfplumber
import re

def extract_all_text(pdf_path):
    all_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                all_text += text + "\n"
    return all_text

def clean_resume_text(text):
    """
    Removes special characters, dates, numbers and email addresses from text.
    Returns the cleaned text.
    """
    # Remove email addresses
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '', text)
    
    # Remove dates in formats like MM/DD/YYYY, DD-MM-YYYY, Month YYYY, etc.
    text = re.sub(r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b', '', text)
    text = re.sub(r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{2,4}\b', '', text)
    text = re.sub(r'\b\d{4}\b', '', text)  # Years (4 digits)
    
    # Remove phone numbers
    text = re.sub(r'\b(?:\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b', '', text)
    
    # Remove all other numbers
    text = re.sub(r'\b\d+\b', '', text)
    
    # Remove special characters but keep spaces and letters
    text = re.sub(r'[^\w\s]', '', text)
    
    # Replace multiple spaces with single space
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()

def get_cleaned_resume(pdf_path):
    """
    Extract text from PDF and clean it in one function call.
    """
    raw_text = extract_all_text(pdf_path)
    return clean_resume_text(raw_text)

if __name__ == "__main__":
    pdf_file = "C:/Users/mekin/OneDrive/Desktop/CV.pdf"  # Update the path to your PDF
    text = extract_all_text(pdf_file)
    print("Original text:")
    print(text[:500] + "...")  # Print first 500 characters
    
    cleaned_text = clean_resume_text(text)
    print("\nCleaned text (without special characters, dates, numbers, emails):")
    print(cleaned_text)  # Print first 500 characters
