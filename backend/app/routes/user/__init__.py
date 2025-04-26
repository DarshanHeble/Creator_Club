"""
Initialize the users route module.
This module combines all user-related routers (create, update, delete)
into a single package for easy importing in the main application.
"""

# Import individual routers from their respective modules with aliases
# for clarity and to avoid naming conflicts
from app.routes.user.create_user import router as create_router
from app.routes.user.update_user import router as update_router
from app.routes.user.delete_user import router as delete_router

# Specify which routers should be exported when using "from app.routes.user import *"
__all__ = ["create_router", "update_router", "delete_router"]
