from pydantic import BaseModel, EmailStr, constr, Field
from datetime import datetime, date
from typing import Optional, List, Union

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

class placeForm(BaseModel):
    destinationCity : str
    startDate : Optional[date] = None
    days : Optional[int] = None
    type : Optional[list[str]] = None
    class Config:
        from_attributes = True
        
class Review(BaseModel):
    id: str
    created_at: datetime
    text: str

class PlanData(BaseModel):
    fsq_id: str
    name: str
    category: str
    latitude: float
    longitude: float
    review: List[Review]
    image: str
    address: str
    day: int

class UserPlan(BaseModel):
    planData: List[PlanData]
    plan_city: str
    start_date: Optional[date] = None
    totalDays: int
    
class PlanDataInsert(BaseModel):
    fsq_id: str
    name: str
    category: str
    latitude: float
    longitude: float
    review: List[Review]
    image: str
    address: str
    day: int
    plan_id : str
    
class BlogCreate(BaseModel):
    blogContent: str
    planId: str
    blogImages: Optional[List[Union[bytes, str]]] = []
    
class BlogData(BaseModel):
    _id: Optional[str]
    user_id: int
    plan_city: str
    images: Optional[List[Union[bytes, str]]] = []
    blog_content: str
    plan_id: str
    date_created: date