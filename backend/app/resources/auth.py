from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas
from starlette.middleware.sessions import SessionMiddleware

router = APIRouter()



@router.post("/signup")
def restaurant(request:Request,db:Session=Depends(get_db),):
    return templates.TemplateResponse('restaurant_details.php', context={'request': request,})
