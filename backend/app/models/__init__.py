from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.configs.local_config import Configuration
import pymongo


client = pymongo.MongoClient("localhost", 27017)
db = client.trek
conn = db["plans"]
connBlog = db["blogs"]
fs = gridfs.GridFS(connBlog)


SQLALCHEMY_DATABASE_URL = Configuration.DB_URI

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        