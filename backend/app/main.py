from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from sqlalchemy.orm import Session
from app.models import get_db, models
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from datetime import datetime
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from jose import jwt, JWTError

app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="e8Lj5R$Zv@n8!sWm3P#q")




app.include_router(router, prefix='')