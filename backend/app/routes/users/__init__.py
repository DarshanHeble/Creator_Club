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

# Specify which routers should be exported when using "from app.routes.user import *"
__all__ = [
    "router",
    "create_router",
    "update_router",
    "delete_router",
    "username_router",
    "get_user_router",
    "update_role_router",
]
