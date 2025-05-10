from fastapi import APIRouter, HTTPException
from app.firebase import db
from app.models.quest import Quest
from typing import List
import logging

# Initialize logging
logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/get-quests/{creator_id}", response_model=List[Quest])
async def get_quests(creator_id: str):
    """
    Retrieve all quests for a creator from the `quests` collection.
    """
    try:
        # Get the creator's document
        creator_ref = db.collection("users").document(creator_id)
        creator_doc = creator_ref.get()

        if not creator_doc.exists:
            raise HTTPException(status_code=404, detail="Creator not found")

        creator_data = creator_doc.to_dict()
        quest_ids = creator_data.get("quests", [])

        if not quest_ids:
            raise HTTPException(
                status_code=404, detail="No quests found for this creator"
            )

        # Fetch quests from the `quests` collection
        quests = []
        for quest_id in quest_ids:
            quest_doc = db.collection("quests").document(quest_id).get()
            if quest_doc.exists:
                quests.append(quest_doc.to_dict())
            else:
                logger.warning(f"Quest with ID {quest_id} not found in the database.")

        if not quests:
            raise HTTPException(
                status_code=404, detail="No valid quests found for this creator"
            )

        return quests

    except Exception as e:
        # Log the error for debugging purposes
        logger.error(f"Error retrieving quests for creator {creator_id}: {str(e)}")
        raise HTTPException(
            status_code=500, detail="An error occurred while retrieving quests"
        )
