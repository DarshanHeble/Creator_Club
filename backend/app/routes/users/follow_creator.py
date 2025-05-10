from fastapi import APIRouter, HTTPException
from app.models.user import User, UserRole
from app.firebase import db

router = APIRouter()

@router.post("/follow")
async def follow_creator(fan_id: str, creator_id: str):
    """
    Allows a fan to follow a creator.

    Args:
        fan_id (str): The ID of the fan.
        creator_id (str): The ID of the creator.

    Returns:
        dict: A success message if the operation is successful.

    Raises:
        HTTPException: If the fan or creator does not exist, or if the user role is invalid.
    """
    try:
        # Fetch the fan document
        fan_ref = db.collection("users").document(fan_id)
        fan_doc = fan_ref.get()

        if not fan_doc.exists:
            raise HTTPException(status_code=404, detail=f"Fan with id {fan_id} not found")

        fan_data = fan_doc.to_dict()
        if fan_data["role"] != UserRole.fan.value:
            raise HTTPException(status_code=400, detail="User role must be 'fan' to follow a creator")

        # Fetch the creator document
        creator_ref = db.collection("users").document(creator_id)
        creator_doc = creator_ref.get()

        if not creator_doc.exists:
            raise HTTPException(status_code=404, detail=f"Creator with id {creator_id} not found")

        creator_data = creator_doc.to_dict()
        if creator_data["role"] != UserRole.creator.value:
            raise HTTPException(status_code=400, detail="Target user must have the role 'creator'")

        # Update the fan's favouriteCreators list
        favorite_creators = fan_data.get("favouriteCreators", [])
        if creator_id in favorite_creators:
            raise HTTPException(status_code=400, detail="Fan is already following this creator")

        favorite_creators.append(creator_id)
        fan_ref.update({"favouriteCreators": favorite_creators})

        return {"message": f"Fan with id {fan_id} is now following creator with id {creator_id}"}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to follow creator: {str(e)}")