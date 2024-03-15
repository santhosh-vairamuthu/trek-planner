from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/signup")
def signup(user:schemas.User ,db:Session=Depends(get_db),):
    try:
        new_user = models.User(**user.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return JSONResponse({'status': 'True'})
    except Exception as e:
        return JSONResponse({'status': 'False'})


@router.post("/login")
def login(user:schemas.Login ,db:Session=Depends(get_db),):
    try:
        data = db.query(models.User).filter(models.User.email == user.email).first()
        if data:
            if data.password == user.password:
                return JSONResponse({'status': 'True'})
            else:
                return JSONResponse({'status': 'Invalid Password'})
        else:
            return JSONResponse({'status': 'Invalid Email'})
    except Exception as e:
        return JSONResponse({'status': 'False'})
