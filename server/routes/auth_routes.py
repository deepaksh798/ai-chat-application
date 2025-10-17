from fastapi import APIRouter, HTTPException
from models.user_model import User
from app.database import db
from passlib.hash import bcrypt
from utils.jwt_handler import create_token

router = APIRouter()

@router.post("/signup")
async def signup(user: User):
    print("Signup request received", user)
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    hashed_pwd = bcrypt.hash(user.password)
    result = await db.users.insert_one({"email": user.email, "password": hashed_pwd})
    return {"message": "User created"}

@router.post("/login")
async def login(user: User):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not bcrypt.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(str(db_user["_id"]))
    return {"token": token}
