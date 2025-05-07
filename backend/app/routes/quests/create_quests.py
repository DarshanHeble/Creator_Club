from fastapi import APIRouter, HTTPException
from app.firebase import db
from app.models.user import Quest
import logging
import uuid

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/create-quest/{creator_id}")
async def create_quest(creator_id: str, quest: Quest):
    """Creates a new quest and updates the creator's quest list."""
    try:
        # Generate a unique ID for the quest
        quest.id = str(uuid.uuid4())

        # Save the quest to the `quests` collection
        quest_ref = db.collection("quests").document(quest.id)
        quest_ref.set(quest.dict())

        # Update the creator's document with the new quest ID
        creator_ref = db.collection("users").document(creator_id)
        creator_ref.update({"quests": db.ArrayUnion([quest.id])})

        logger.info(f"Quest '{quest.id}' created for creator '{creator_id}'.")
        return {"detail": f"Quest '{quest.title}' created successfully."}
    except Exception as e:
        logger.error(f"Failed to create quest: {e}")
        raise HTTPException(status_code=500, detail="Failed to create quest.")


@router.delete("/delete-quest/{creator_id}/{quest_id}")
async def delete_quest(creator_id: str, quest_id: str):
    """Deletes a quest created by a creator."""
    try:
        # Fetch and verify the creator's document
        creator_ref = db.collection("users").document(creator_id)
        creator_doc = creator_ref.get()

        if not creator_doc.exists:
            raise HTTPException(status_code=404, detail="Creator not found.")

        creator_data = creator_doc.to_dict()
        if quest_id not in creator_data.get("quests", []):
            raise HTTPException(
                status_code=404, detail="Quest not associated with this creator."
            )

        # Delete the quest from the `quests` collection
        quest_ref = db.collection("quests").document(quest_id)
        quest_ref.delete()

        # Remove the quest ID from the creator's quest list
        creator_ref.update({"quests": db.ArrayRemove([quest_id])})

        logger.info(f"Quest '{quest_id}' deleted by creator '{creator_id}'.")
        return {"detail": f"Quest '{quest_id}' deleted successfully."}
    except Exception as e:
        logger.error(f"Failed to delete quest: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete quest.")
