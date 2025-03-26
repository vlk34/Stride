from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-pdf/")
async def upload_pdf(file: Annotated[UploadFile, File(...)]):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files are allowed"}

    contents = await file.read()

    
    with open(f"uploaded_{file.filename}", "wb") as f:
        f.write(contents)

    return {"filename": file.filename, "size": len(contents)}

