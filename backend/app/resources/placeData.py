from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form
from api.foursquare import getPlaceData
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas, conn
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.resources.utils import verify_user, verify_session
import requests
from typing import List
from datetime import datetime

router = APIRouter()



@router.post("/getPlaceData")
def signup(placeData:schemas.placeForm ,db:Session=Depends(get_db),):
    try:
        data = getPlaceData(placeData.destinationCity)
        return JSONResponse({'data': data})
    except Exception as e:
        print(e)
        return JSONResponse({'data': 'False'})
    

@router.post("/save_plan")
def save_plan(request: Request, plan_data: schemas.UserPlan, db: Session = Depends(get_db), user: str = Depends(verify_user)):
    print(user)
    if user == "_false":
        return JSONResponse({"status": False})
    try:
        received_plan_data = plan_data.planData
        userDetail = db.query(models.User).filter(models.User.email == user).first()
        if not userDetail:
            return JSONResponse({"status": False})
        
        userPlansCount = db.query(models.UserPlan).filter(models.UserPlan.user_id == userDetail.id).all()
        planCount = len(userPlansCount)
        data = {
            "plan_city": plan_data.plan_city,
            "totalDays": plan_data.totalDays,
            "user_id": userDetail.id,
            "plan_id": userDetail.username + str(planCount)
        }
        for i in received_plan_data:
            new_plan_data = schemas.PlanDataInsert(**i.dict(), plan_id=data["plan_id"])
            conn.insert_one(new_plan_data.dict())
        
        new_user_plan = models.UserPlan(**data)
        db.add(new_user_plan)
        db.commit()
        db.refresh(new_user_plan)
        
        return JSONResponse({"status": True})
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.get("/account")
def account(request: Request, db: Session = Depends(get_db), user: str = Depends(verify_session)):
    if user == "_false":
        return JSONResponse({"status": False})
    try:
        user_detail = db.query(models.User).filter(models.User.email == user).first()
        plans = db.query(models.UserPlan).filter(models.UserPlan.user_id == user_detail.id).all()
        user_detail_dict = user_detail.__dict__
        user_detail_dict['created_at'] = user_detail_dict['created_at'].strftime("%Y-%m-%d")

        plans_list = []
        for plan in plans:
            plan_dict = plan.__dict__
            plan_dict['created_at'] = plan_dict['created_at'].strftime("%Y-%m-%d")
            plans_list.append(plan_dict)

        plans_list = sorted(plans_list, key=lambda x: datetime.strptime(x['created_at'], "%Y-%m-%d"), reverse=True)
        
        user_detail_dict.pop('_sa_instance_state', None)
        for plan in plans_list:
            plan.pop('_sa_instance_state', None)
    
        return JSONResponse({"user": user_detail_dict["username"], "plans": plans_list})

        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
GRAPH_HOPPER_API_KEY = "f952753c-ed00-40cc-b7b7-17815c5b3e9e"

places = [
    {
        "fsq_id": "4b7fba44f964a520073b30e3",
        "name": "Sathyam Cinemas",
        "category": "Movie Theater",
        "latitude": 13.055426,
        "longitude": 80.25798,
        "address": "8 Thiruvika Road, Royapettah (Royapettah), Chennai 600014, Tamil Nadu"
    },
    # Add more places as needed
]

@router.get("/places", response_model=List[dict])
async def get_places():
    return places