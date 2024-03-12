from fastapi import APIRouter
from app.resources.auth import router as authRouter


router = APIRouter()


router.include_router(authRouter, prefix='', tags=['auth'])
