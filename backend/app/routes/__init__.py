from fastapi import APIRouter
from app.resources.auth import router as authRouter
from app.resources.placeData import router as placeDataRouter

router = APIRouter()


router.include_router(authRouter, prefix='', tags=['auth'])
router.include_router(placeDataRouter, prefix='', tags=['auth'])
