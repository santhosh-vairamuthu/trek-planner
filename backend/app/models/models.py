from sqlalchemy import Boolean, Column, ForeignKey,  String, DateTime, Integer
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
    username = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)


    created_at = Column(DateTime, nullable=False, default=func.now())

class Plan(Base):
    __tablename__ = 'plan'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)


    created_at = Column(DateTime, nullable=False, default=func.now())

class UserPlan(Base):
    __tablename__ = 'userPlans'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
    plan_id = Column(Integer, ForeignKey('plan.id', ondelete="CASCADE"),nullable=False)


    created_at = Column(DateTime, nullable=False, default=func.now())

Base.metadata.create_all(bind=engine)