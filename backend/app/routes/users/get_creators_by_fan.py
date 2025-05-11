from fastapi import APIRouter, HTTPException
from app.models.user import User, UserRole
from app.firebase import db

router = APIRouter()

@router.get("/get-creators/{fan_id}", response_model=list[User])
async def get_creators_by_fan(fan_id: str):
    """
    Fetch all creators followed by a specific fan.

    Args:
        fan_id (str): The ID of the fan.

    Returns:
        List[User]: A list of creators followed by the fan.

    Raises:
        HTTPException: If the fan doesn't exist (404)
                       or if there's a database error (500).
    """
    try:
        # Get fan document from Firestore
        fan_ref = db.collection("users").document(fan_id)
        fan_doc = fan_ref.get()

        # Check if fan exists
        if not fan_doc.exists:
            raise HTTPException(
                status_code=404, detail=f"Fan with id {fan_id} not found"
            )

        fan_data = fan_doc.to_dict()
        if fan_data["role"] != UserRole.fan.value:
            raise HTTPException(
                status_code=400, detail=f"User with id {fan_id} is not a fan"
            )

        # Get all creators followed by the fan
        creators_ids = fan_data.get("favoriteCreators", [])
        if not creators_ids:
            return []  # Return an empty list if no creators are followed

        # Fetch creator details from Firestore
        creators = []
        for creator_id in creators_ids:
            creator_ref = db.collection("users").document(creator_id)
            creator_doc = creator_ref.get()
            if creator_doc.exists:
                creators.append(User(**creator_doc.to_dict()))

        return creators

    except HTTPException as e:
        raise e  # Re-raise HTTP exceptions to preserve their status codes and details
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch creators: {str(e)}")