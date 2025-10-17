from app.database import db
from app.models.chat_model import Chat
from app.schemas.chat_schema import ChatCreate
from datetime import datetime

async def save_chat(chat: ChatCreate):
    chat_data = Chat(**chat.dict(), timestamp=datetime.utcnow())
    result = await db.chats.insert_one(chat_data.dict())
    return str(result.inserted_id)