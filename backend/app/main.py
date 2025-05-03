from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.routes import websocket, base
from app.routes.users import get_creators_router
from app.routes.users import (
    create_router,
    update_router,
    delete_router,
    username_router,
    get_user_router,
    update_role_router,
    get_creators_router,
    list_users_router,
    
)


# Initialize FastAPI application instance
app = FastAPI()

frontend_url = "http://localhost:5173"

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(websocket.router)
app.include_router(base.router)

# Mount user-related routers
app.include_router(create_router, prefix="/users", tags=["users"])
app.include_router(update_router, prefix="/users", tags=["users"])
app.include_router(delete_router, prefix="/users", tags=["users"])
app.include_router(username_router, prefix="/users", tags=["users"])
app.include_router(get_user_router, prefix="/users", tags=["users"])
app.include_router(update_role_router, prefix="/users", tags=["users"])
app.include_router(get_creators_router, prefix="/users", tags=["users"])
app.include_router(list_users_router, prefix="/users", tags=["users"])