from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request, Form
from api.foursquare import getPlaceData
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from app.models import get_db, models, schemas
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session

router = APIRouter()



@router.post("/getPlaceData")
def signup(placeData:schemas.placeForm ,db:Session=Depends(get_db),):
    try:
        data = getPlaceData(placeData.destinationCity)
        return JSONResponse({'data': data})
    except Exception as e:
        print(e)
        return JSONResponse({'data': 'False'})
