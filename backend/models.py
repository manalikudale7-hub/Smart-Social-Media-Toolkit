from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

# User Table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

# Hashtag Table
class Hashtag(Base):
    __tablename__ = "hashtags"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)  # user input
    result = Column(String)  # generated hashtags
    user_id = Column(Integer, ForeignKey("users.id"))