from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import base, websocket
from app.routes.user import create_user, update_user, delete_user

frontend_url = "http://localhost:5173"

# Initialize the FastAPI application with metadata
app = FastAPI(
    title="Creator Club API", description="Backend API for the Creator Club platform"
)

# Configure CORS middleware to allow cross-origin requests
# This is necessary for the frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    # TODO: In production, replace wildcard with specific allowed origins
    allow_origins=["*"],  # For development only
    # allow_origins=[frontend_url],  # Uncomment for production
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Register route modules with their respective URL prefixes
# The prefix determines the base path for all routes in that module
app.include_router(base.router)  # Base routes (/)
app.include_router(websocket.router)  # WebSocket routes (/ws/*)

# User management routes (/users/*)
app.include_router(create_user.router, prefix="/users")
app.include_router(update_user.router, prefix="/users")
app.include_router(delete_user.router, prefix="/users")
