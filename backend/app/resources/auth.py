from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.orm import Session
from app.configs.base_config import BaseConfig
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.resources.utils import create_access_token
from datetime import  datetime,date, timedelta
from jose import jwt, JWTError

router = APIRouter()


@router.post("/signup")
def signup(user:schemas.User ,db:Session=Depends(get_db),):
    try:
        new_user = models.User(**user.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        access_token_expires = timedelta(minutes=BaseConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"user_name": user.email},expires_delta=access_token_expires)
        return JSONResponse({'status': 'True', 'access_token': access_token})
    except Exception as e:
        return JSONResponse({'status': 'False'})


@router.post("/login")
def login(user:schemas.Login ,db:Session=Depends(get_db),):
    try:
        data = db.query(models.User).filter(models.User.email == user.email).first()
        if data:
            if data.password == user.password:
                access_token_expires = timedelta(minutes=BaseConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
                access_token = create_access_token(data={"user_name": user.email},expires_delta=access_token_expires)
                return JSONResponse({'status': 'True', 'access_token': access_token})
            
            else:
                return JSONResponse({'status': 'Invalid Password'})
        else:
            return JSONResponse({'status': 'Invalid Email'})
    except Exception as e:
        print(e)
        return JSONResponse({'status': 'False'})
    

@router.post("/verify_session")
async def verify_session(request: Request):
    try:
        token = request.headers.get("Authorization")
        if not token:
            raise HTTPException(status_code=401, detail="Unauthorized: User not logged in")

        try:
            payload = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=[BaseConfig.ALGORITHM])
        except JWTError:
            raise HTTPException(status_code=401, detail="Unauthorized: Invalid token")

        username = payload.get("user_name")
        
        if not username:
            raise HTTPException(status_code=401, detail="Unauthorized: Invalid user token")
        
        return JSONResponse({'status': True})

    except HTTPException as http_exception:
        raise http_exception

    except Exception as e:
        return JSONResponse({'status': False, 'detail': 'Internal Server Error'}, status_code=500)


