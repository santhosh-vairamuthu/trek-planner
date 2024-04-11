from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form, UploadFile, File
from api.foursquare import getPlaceData
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas, connCity
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.resources.utils import verify_user, verify_session
import requests
import base64 
from typing import List
from datetime import datetime, date
from bson.json_util import dumps

router = APIRouter()


@router.get("/getCityImage")
def getCityImage(request: Request, db: Session = Depends(get_db)):
    try:
        data = await request.json()
        ciy = data.get("city")
        img = False
        existing_city = connBlog.find_one({"city": city})
        if existing_city:
            img = str(existing_city.imgURL)
        else:
            img = True

        result = connBlog.insert_one(plan_data_dict)
        return {"img": img_url}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")