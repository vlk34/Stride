# main.py
from fastapi import FastAPI
from RAG_upload import router as router1
from cv_jobpost_match import router as router2
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(router1)
app.include_router(router2)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
