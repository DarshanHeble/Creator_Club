from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import websocket, base
from app.routes.users import (
    create_router,
    update_router,
    delete_router,
    username_router,
    get_user_router,
    update_role_router,
    get_creators_router,
    list_users_router,
    follow_creator_router,
    unfollow_creator_router,
    bulk_create_router,
    get_creators_by_fan_router,
    get_fans_by_creator_router,
)
from app.routes.quests import *
from app.routes.posts import *
# Initialize FastAPI application instance
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
app.include_router(get_user_router, prefix="/users", tags=["users"])
app.include_router(list_users_router, prefix="/users", tags=["users"])
app.include_router(bulk_create_router, prefix="/users", tags=["users"])

app.include_router(username_router, prefix="/users", tags=["users"])
app.include_router(update_role_router, prefix="/users", tags=["users"])

app.include_router(get_creators_router, prefix="/users", tags=["users"])
app.include_router(follow_creator_router, prefix="/users", tags=["users"])
app.include_router(unfollow_creator_router, prefix="/users", tags=["users"])
app.include_router(get_creators_by_fan_router, prefix="/users", tags=["users"])
app.include_router(get_fans_by_creator_router, prefix="/users", tags=["users"])

# Mount quest-related routers
app.include_router(create_quest_router, prefix="/quest", tags=["quest"])
app.include_router(complete_quest_router, prefix="/quest", tags=["quest"])
app.include_router(get_quests_router, prefix="/quest", tags=["quest"])
app.include_router(delete_quest_router, prefix="/quest", tags=["quest"])

# Mount post-related routers
app.include_router(create_post_router, tags=["Posts"])
app.include_router(update_post_router, tags=["Posts"])
app.include_router(delete_post_router, tags=["Posts"])
app.include_router(get_posts_router, tags=["Posts"])