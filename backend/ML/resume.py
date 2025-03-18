import pdfplumber

def extract_all_text(pdf_path):
    all_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                all_text += text + "\n"
    return all_text

if __name__ == "__main__":
    pdf_file = "C:/Users/mekin/OneDrive/Desktop/CV.pdf"  # Update the path to your PDF
    text = extract_all_text(pdf_file)
    print(text)
