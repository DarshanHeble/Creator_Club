"""
Initialize the users route module.
This module combines all user-related routers (create, update, delete)
into a single package for easy importing in the main application.
"""

# Import individual routers from their respective modules with aliases
# for clarity and to avoid naming conflicts
from .create_user import router as create_router
from .update_user import router as update_router
from .delete_user import router as delete_router
from .is_username_taken import router as username_router
from .get_user import router as get_user_router
from .update_role import router as update_role_router
from .get_creators import router as get_creators_router
from .list_users import router as list_users_router
from .bulk_create import router as bulk_create_router
from .follow_creator import router as follow_creator_router
from .unfollow_creator import router as unfollow_creator_router
from .get_creators_by_fan import router as get_creators_by_fan_router
from .get_fans_by_creator import router as get_fans_by_creator_router

# Specify which routers should be exported when using "from app.routes.user import *"
__all__ = [
    "router",
    "create_router",
    "update_router",
    "delete_router",
    "username_router",
    "get_user_router",
    "update_role_router",
    "get_creators_router",
    "get_creators_router",
    "list_users_router",
    "bulk_create_router",
    "unfollow_creator_router",
    "follow_creator_router",
    "get_creators_by_fan_router",
    "get_fans_by_creator_router",
]
