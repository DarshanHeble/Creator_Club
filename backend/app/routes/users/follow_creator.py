from fastapi import APIRouter, HTTPException
from app.firebase import db

router = APIRouter()

@router.post("/{fan_id}/follow/{creator_id}")
async def follow_creator(fan_id: str, creator_id: str):
    """
    Allow a fan to follow a creator.

    Args:
        fan_id (str): The ID of the fan.
        creator_id (str): The ID of the creator to follow.

    Returns:
        dict: A success message.

    Raises:
        HTTPException: If the fan or creator does not exist.
    """
    try:
        # Verify fan exists
        fan_ref = db.collection("users").document(fan_id)
        fan_doc = fan_ref.get()
        if not fan_doc.exists:
            raise HTTPException(status_code=404, detail="Fan not found")

        # Verify creator exists
        creator_ref = db.collection("users").document(creator_id)
        creator_doc = creator_ref.get()
        if not creator_doc.exists:
            raise HTTPException(status_code=404, detail="Creator not found")

        # Update the fan's favoriteCreators list
        fan_data = fan_doc.to_dict()
        favorite_creators = fan_data.get("favoriteCreators", [])
        if creator_id not in favorite_creators:
            favorite_creators.append(creator_id)
            fan_ref.update({"favoriteCreators": favorite_creators})

        return {"message": f"Fan {fan_id} successfully followed creator {creator_id}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to follow creator: {str(e)}")