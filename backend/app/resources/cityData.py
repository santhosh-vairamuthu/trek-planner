from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form, UploadFile, File
from api.foursquare import getPlaceData, getPlaceDataCity
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas, connCity, conn
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.resources.utils import verify_user, verify_session
import requests
import base64 
from typing import List
from datetime import datetime, date
from bson.json_util import dumps

router = APIRouter()


@router.post("/getNearPlaces")
def getNearPlaces(location : schemas.Location, request: Request, db: Session = Depends(get_db)):
    try:
        data  = getPlaceDataCity(location.latitude, location.longitude)
        return {"data" : data}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.get("/getUserPlans")
def getUserPlans(request: Request, db: Session = Depends(get_db), user = Depends(verify_session)):
    if user == "_false":
        return JSONResponse({"status": False})
    try:
        userDetails = db.query(models.User).filter(models.User.email == user).first()
        plans = db.query(models.UserPlan).filter(models.UserPlan.user_id == userDetails.id).all()
        return {"plans" : plans}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/saveCityToPlan")
def saveCityToPlan(selectedCity: schemas.PlanDataInsert,request: Request, db: Session = Depends(get_db), user = Depends(verify_session)):
    try:
        plan_id = selectedCity.plan_id
        if plan_id == "new":
            userDetail = db.query(models.User).filter(models.User.email == user).first()
            if not userDetail:
                return JSONResponse({"status": False})
            
            userPlansCount = db.query(models.UserPlan).filter(models.UserPlan.user_id == userDetail.id).all()
            planCount = len(userPlansCount)
            data = {
                "plan_city": "SuggestedPlans"+ str(planCount),
                "totalDays": 1,
                "user_id": userDetail.id,
                "plan_id": userDetail.username + str(planCount)
            }
            selectedCity.plan_id = data["plan_id"]
            
            new_user_plan = models.UserPlan(**data)
            db.add(new_user_plan)
            db.commit()
            db.refresh(new_user_plan)
        conn.insert_one(selectedCity.dict())
        return JSONResponse({"status": True})
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")