# models/chat.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Chat(BaseModel):
    user_id: Optional[str] = None  # You can relate it to your user if needed
    prompt: str
    response: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChatOut(Chat):
    id: str
