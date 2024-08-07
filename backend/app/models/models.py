from sqlalchemy import Boolean, Column, ForeignKey,  String, DateTime, Integer, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models import engine
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()
Base.metadata.bind = engine

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    username = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)


    created_at = Column(DateTime, nullable=False, default=func.now())


class UserPlan(Base):
    __tablename__ = 'userPlans'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
    plan_city = Column(String(100), nullable=False)
    startDate = Column(Date, nullable=True)
    totalDays = Column(Integer, nullable=False)
    plan_id = Column(String(100),nullable=False)


    created_at = Column(DateTime, nullable=False, default=func.now())

Base.metadata.create_all(bind=engine)