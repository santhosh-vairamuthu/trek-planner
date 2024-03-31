from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form
from api.foursquare import getPlaceData
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas, conn
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.resources.utils import verify_user

router = APIRouter()



@router.post("/getPlaceData")
def signup(placeData:schemas.placeForm ,db:Session=Depends(get_db),):
    try:
        data = getPlaceData(placeData.destinationCity)
        return JSONResponse({'data': data})
    except Exception as e:
        print(e)
        return JSONResponse({'data': 'False'})
    
''' TODO: Crate a plan with plan details, get the details from the request. 
    TODO: After creating a plan get the plan id and insert the data plan data in mongo db
    TODO: Create a schema for request
'''
@router.post("/save_plan")
def save_plan(request: Request,db:Session=Depends(get_db),user:str = Depends(verify_user)):
    print(user)
    if user == "_false":
        return JSONResponse({"status":False})
    try:
        user_data = db.query(models.User).filter(models.User.email == user).first()
        pass
    except Exception as e:
        pass
    pass
