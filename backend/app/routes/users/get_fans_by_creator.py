from fastapi import APIRouter, HTTPException
from app.models.user import User, UserRole
from app.firebase import db

router = APIRouter()

@router.get("/get-fans/{creator_id}", response_model=list[User])
async def get_fans_by_creator(creator_id: str):
    """
    Fetch all fans of a specific creator.

    Args:
        creator_id (str): The ID of the creator.

    Returns:
        List[User]: A list of fans following the creator.

    Raises:
        HTTPException: If the creator doesn't exist (404)
                       or if there's a database error (500).
    """
    try:
        # Get creator document from Firestore
        creator_ref = db.collection("users").document(creator_id)
        creator_doc = creator_ref.get()

        # Check if creator exists
        if not creator_doc.exists:
            raise HTTPException(
                status_code=404, detail=f"Creator with id {creator_id} not found"
            )

        creator_data = creator_doc.to_dict()
        if creator_data["role"] != UserRole.creator.value:
            raise HTTPException(
                status_code=400, detail=f"User with id {creator_id} is not a creator"
            )

        # Get all fans of the creator
        fans_ids = creator_data.get("fans", [])
        if not fans_ids:
            return []  # Return an empty list if no fans are found

        # Fetch fan details from Firestore
        fans = []
        for fan_id in fans_ids:
            fan_ref = db.collection("users").document(fan_id)
            fan_doc = fan_ref.get()
            if fan_doc.exists:
                fans.append(User(**fan_doc.to_dict()))

        return fans

    except HTTPException as e:
        raise e  # Re-raise HTTP exceptions to preserve their status codes and details
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch fans: {str(e)}")