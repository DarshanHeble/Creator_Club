from .create_quests import router as create_quest_router
from .complete_quest import router as complete_quest_router
from .get_quests import router as get_quests_router
from .delete_quest import router as delete_quest_router

# Specify which routers should be exported when using "from app.routes.quest import *"
__all__ = [
    "create_quest_router",
    "complete_quest_router",
    "get_quests_router",
    "delete_quest_router",
]
