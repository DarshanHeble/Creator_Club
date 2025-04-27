from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.routes import websocket, base
from app.routes.user import create_router, update_router, delete_router

# Initialize FastAPI application instance
app = FastAPI()

frontend_url = "http://localhost:5173"

# Configure CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers from separate files
app.include_router(websocket.router)
app.include_router(base.router)

app.include_router(create_router, prefix="/users", tags=["users"])
app.include_router(update_router, prefix="/users", tags=["users"])
app.include_router(delete_router, prefix="/users", tags=["users"])
