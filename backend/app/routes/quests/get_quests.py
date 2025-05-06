from fastapi import APIRouter, HTTPException
from app.firebase import db
from app.models.user import Quest
from typing import List, Optional
import logging

# Initialize logging
logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/get-quests/{creator_id}", response_model=List[Quest])
async def get_quests(creator_id: str):
    """
    Retrieve all quests for a creator.
    """
    try:
        creator_ref = db.collection("users").document(creator_id)
        creator_doc = creator_ref.get()

        if not creator_doc.exists:
            raise HTTPException(status_code=404, detail="Creator not found")

        creator_data = creator_doc.to_dict()

        # Get quests safely (default to empty list if missing)
        quests: Optional[List[Quest]] = creator_data.get("quests", [])

        if not quests:
            raise HTTPException(
                status_code=404, detail="No quests found for this creator"
            )

        return quests

    except Exception as e:
        # Log the error for debugging purposes
        logger.error(f"Error retrieving quests for creator {creator_id}: {str(e)}")
        raise HTTPException(
            status_code=500, detail="An error occurred while retrieving quests"
        )
