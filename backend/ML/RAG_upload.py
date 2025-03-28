from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from resume import get_cleaned_resume
from rag_model import generate_sql_result
import io
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-pdf")
async def upload_pdf(file: Annotated[UploadFile, File(...)]):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files are allowed"}

    contents = await file.read()

    # convert bytes -> file-like object
    file_like = io.BytesIO(contents)

    # pass the file-like to get_cleaned_resume or pdfplumber.open()
    cleaned_text = get_cleaned_resume(file_like)

    sql_query = generate_sql_result(cleaned_text)
    
    return {"results": sql_query["result"]}



class UploadTextRequest(BaseModel):
    description: str

@app.post("/upload-text")
async def upload_text(request: UploadTextRequest):
    sql_query = generate_sql_result(request.description)
    return {"results": sql_query["result"]}


    

