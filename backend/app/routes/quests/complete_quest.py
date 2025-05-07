from fastapi import APIRouter, HTTPException
from app.firebase import db
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/complete-quest/{user_id}/{quest_id}")
async def complete_quest(user_id: str, quest_id: str):
    """Marks a quest as completed by a user."""
    try:
        # Fetch the quest from the `quests` collection
        quest_ref = db.collection("quests").document(quest_id)
        quest_doc = quest_ref.get()

        if not quest_doc.exists:
            raise HTTPException(status_code=404, detail="Quest not found.")

        quest_data = quest_doc.to_dict()

        # Copy the quest to the `completedQuests` collection
        completed_ref = db.collection("completedQuests").document(quest_id)
        completed_ref.set(quest_data)

        # Update the user's document with the completed quest ID
        user_ref = db.collection("users").document(user_id)
        user_ref.update({"completedQuests": db.ArrayUnion([quest_id])})

        logger.info(f"Quest '{quest_id}' completed by user '{user_id}'.")
        return {"detail": f"Quest '{quest_id}' marked as completed."}
    except Exception as e:
        logger.error(f"Failed to complete quest: {e}")
        raise HTTPException(status_code=500, detail="Failed to complete quest.")
