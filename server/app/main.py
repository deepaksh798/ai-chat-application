from fastapi import FastAPI
from routes import auth_routes,chat_routes
from starlette.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(auth_routes.router)
app.include_router(chat_routes.router)