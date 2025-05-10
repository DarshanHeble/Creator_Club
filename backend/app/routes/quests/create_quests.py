from fastapi import APIRouter, HTTPException, Body
from google.cloud import firestore
from app.firebase import db
from app.models.user import Quest
import logging
import uuid

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/create-quest/")
async def create_quest(creator_id: str, quest: Quest = Body(...)):
    """Creates a new quest and updates the creator's quest list."""
    try:
        # Generate a unique ID for the quest
        # quest.id = str(uuid.uuid4())

        # Save the quest to the `quests` collection
        quest_ref = db.collection("quests").document(quest.id)
        quest_ref.set(quest.model_dump())

        # Update the creator's document with the new quest ID
        creator_ref = db.collection("users").document(creator_id)
        creator_ref.update({"quests": firestore.ArrayUnion([quest.id])})

        logger.info(f"Quest '{quest.id}' created for creator '{creator_id}'.")
        return {"detail": f"Quest '{quest.title}' created successfully."}
    except Exception as e:
        logger.error(f"Failed to create quest: {e}")
        raise HTTPException(status_code=500, detail="Failed to create quest.")
