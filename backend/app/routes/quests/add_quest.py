from fastapi import APIRouter, HTTPException
from app.firebase import db
from app.models.quest import Quest

router = APIRouter()


@router.post("/add-quest/{creator_id}", response_model=Quest)
async def add_quest(creator_id: str, quest: Quest):
    """
    Add a quest to a creator's quest list.
    """

    creator_ref = db.collection("users").document(creator_id)
    creator_doc = creator_ref.get()

    if not creator_doc.exists:
        raise HTTPException(status_code=404, detail="Creator not found")

    creator_data = creator_doc.to_dict()
    existing_quests = creator_data.get("quests", [])

    # Check for unique quest ID
    new_quest = quest.model_dump(exclude_unset=True)
    if any(
        existing_quest["id"] == new_quest["id"] for existing_quest in existing_quests
    ):
        raise HTTPException(
            status_code=400, detail="Quest with this ID already exists."
        )

    # Add the new quest
    existing_quests.append(new_quest)

    try:
        creator_ref.update({"quests": existing_quests})
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to update creator data: {str(e)}"
        )

    return {"detail": "Quest added successfully", "quest": new_quest}
