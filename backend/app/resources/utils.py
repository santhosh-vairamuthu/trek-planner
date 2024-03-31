from typing import Optional
from datetime import datetime, timedelta
from app.configs.base_config import BaseConfig
from fastapi import HTTPException, Request
from jose import jwt, JWTError

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({'exp': expire })
    encoded_jwt = jwt.encode(to_encode, BaseConfig.SECRET_KEY, algorithm=BaseConfig.ALGORITHM)
    return encoded_jwt

def verify_user(request: Request):
    token = request.headers.get("Authorization")
    token = list(token.split())[1]
    if token:
        try:
            payload = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=[BaseConfig.ALGORITHM])
            user_name = payload.get("user_name")
            if user_name:
                return user_name
        except JWTError:
            pass
    return "_false"
