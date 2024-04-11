from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form, UploadFile, File
from api.foursquare import getPlaceData
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas, conn, connBlog
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from app.resources.utils import verify_user, verify_session
import requests
import base64 
from typing import List
from datetime import datetime, date
from bson.json_util import dumps

router = APIRouter()

@router.post("/create_blog")
async def create_blog(request: Request, db: Session = Depends(get_db), user: str = Depends(verify_session)):
    if user == "_false":
        return JSONResponse({"status": False})
    
    try:
        data = await request.json()
        plan_id = data.get("planId")
        blog_content = data.get("blogContent")
        blog_images = data.get("blogImages", [])

        userDetails = db.query(models.User).filter(models.User.email == user).first()
        planDetails = db.query(models.UserPlan).filter(models.UserPlan.plan_id == plan_id).first()

        # image_data = []
        # for image in blog_images:
        #     try:
        #         contents = base64.b64encode(image)
        #         image_data.append(contents)
        #     except Exception as image_decode_error:
        #         continue

        date_created = date.today().isoformat() 
        plan_data_dict = {
            "user_id": userDetails.id,
            "plan_city": planDetails.plan_city,
            "images": blog_images,
            "blog_content": blog_content,
            "plan_id": plan_id,
            "date_created" : date_created
        }
        result = connBlog.insert_one(plan_data_dict)
        return {"status": True, "message": "Blog created successfully"}
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        print(f"Error creating blog: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/blogs")
def blogs(request: Request, db: Session = Depends(get_db)):
    try:
        blog_data = connBlog.find({})
        data = []
        for i in blog_data:
            if len(i["blog_content"]) > 120:
                i["blog_content"] = i["blog_content"][:120] + "..."
            data.append(schemas.BlogData(**i))
            
        return {"data" : data}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
