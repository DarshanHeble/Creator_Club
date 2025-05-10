from fastapi import APIRouter, HTTPException
from app.firebase import db
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.delete("/remove-quest/{creator_id}/{quest_id}")
async def remove_quest(creator_id: str, quest_id: str):
    """Removes a specific quest from a creator's quest list."""
    try:
        creator_ref = db.collection("users").document(creator_id)
        creator_doc = creator_ref.get()

        if not creator_doc.exists:
            raise HTTPException(
                status_code=404, detail=f"Creator with ID '{creator_id}' not found."
            )

        creator_data = creator_doc.to_dict()
        existing_quests = creator_data.get("quests", [])

        initial_quest_count = len(existing_quests)
        updated_quests = [
            quest for quest in existing_quests if quest.get("id") != quest_id
        ]

        if len(updated_quests) == initial_quest_count:
            raise HTTPException(
                status_code=404,
                detail=f"Quest with ID '{quest_id}' not found for creator '{creator_id}'.",
            )

        creator_ref.update({"quests": updated_quests})
        logger.info(f"Quest '{quest_id}' removed from creator '{creator_id}'.")
        return {"detail": f"Quest with ID '{quest_id}' removed successfully."}

    except HTTPException as http_exc:
        logger.warning(f"HTTP Exception: {http_exc.detail}")
        raise
    except Exception as e:
        logger.error(
            f"An unexpected error occurred while removing quest '{quest_id}' for creator '{creator_id}': {e}"
        )
        raise HTTPException(status_code=500, detail="Internal server error")
