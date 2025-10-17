from fastapi import FastAPI
from routes import auth_routes,chat_routes

app = FastAPI()

app.include_router(auth_routes.router)
app.include_router(chat_routes.router)