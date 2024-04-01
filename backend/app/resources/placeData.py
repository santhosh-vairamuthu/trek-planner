from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form
from api.foursquare import getPlaceData
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas, conn
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.resources.utils import verify_user
from typing import List

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
            # Create a new instance of PlanData with updated plan_id and planid
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


