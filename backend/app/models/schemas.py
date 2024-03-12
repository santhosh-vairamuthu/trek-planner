from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from pydantic.types import conint


class User(BaseModel):
    username : str
    password : str
    email : EmailStr
    class Config:
        from_attributes = True

class Login(BaseModel):
    email : EmailStr
    password : str
    class Config:
        from_attributes = True