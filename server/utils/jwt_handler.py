from jose import jwt
import os

def create_token(user_id: str):
    return jwt.encode({"user_id": user_id}, os.getenv("JWT_SECRET_KEY"), algorithm=os.getenv("JWT_ALGORITHM"))

def verify_token(token: str):
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=[os.getenv("JWT_ALGORITHM")])
        return payload["user_id"]
    except:
        return None
