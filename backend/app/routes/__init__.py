from fastapi import APIRouter
from app.resources.auth import router as authRouter
from app.resources.placeData import router as placeDataRouter
from app.resources.blogData import router as blogDataRouter
from app.resources.cityData import router as cityDataRouter

router = APIRouter()


router.include_router(authRouter, prefix='', tags=['auth'])
router.include_router(placeDataRouter, prefix='', tags=['auth'])
router.include_router(blogDataRouter, prefix='', tags=['auth'])
router.include_router(cityDataRouter, prefix='', tags=['auth'])
