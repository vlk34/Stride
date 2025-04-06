from fastapi import FastAPI, File, UploadFile, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from resume import get_cleaned_resume
from rag_model import agent_invoke
import io
from pydantic import BaseModel

router = APIRouter()


@router.post("/upload-pdf")
async def upload_pdf(file: Annotated[UploadFile, File(...)]):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files are allowed"}

    contents = await file.read()

    # convert bytes -> file-like object
    file_like = io.BytesIO(contents)

    # pass the file-like to get_cleaned_resume or pdfplumber.open()
    cleaned_text = get_cleaned_resume(file_like)

    sql_query = agent_invoke(cleaned_text)
    
    return {"results": sql_query["result"]}



class UploadTextRequest(BaseModel):
    description: str

@router.post("/upload-text")
async def upload_text(request: UploadTextRequest):
    sql_query = agent_invoke(request.description)
    return {"results": sql_query["result"]}


    

