# routes/chat_routes.py
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

router = APIRouter(prefix="/chat", tags=["Chat"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("Please set GEMINI_API_KEY in your environment")

genai.configure(api_key=GEMINI_API_KEY)

class ChatRequest(BaseModel):
    text: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/", response_model=ChatResponse)
async def chat_with_gemini(body: ChatRequest):
    prompt = (body.text or "").strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="text is required")
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        resp = model.generate_content(prompt)
        return ChatResponse(answer=getattr(resp, "text", str(resp)))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
