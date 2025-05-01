from fastapi import APIRouter, HTTPException
from app.models.user import User, UserRole
from app.firebase import db
from pydantic import BaseModel
from typing import Optional


class UserUpdate(BaseModel):
    """
    Schema for user update requests.
    Note: id is not included since it comes from the path parameter
    """

    userName: Optional[str] = None
    email: Optional[str] = None
    websiteURL: Optional[str] = None
    favoriteCreators: Optional[list[str]] = None


router = APIRouter()


@router.put("/{user_id}", response_model=User)
async def update_user(user_id: str, update_data: UserUpdate):
    """
    Update an existing user's information.

    Args:
        user_id (str): The ID of the user to update (from URL path)
        update_data (UserUpdate): The fields to update (from request body)

    Returns:
        User: The updated user object

    Raises:
        HTTPException:  If the user doesn't exist (404)
                        If the data is invalid (422)
                        If there's a database error (500)
    """
    try:
        # Verify user exists
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()
        if not user_doc.exists:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )

        # Convert update data to dict, excluding None values
        update_dict = {
            k: v for k, v in update_data.model_dump().items() if v is not None
        }

        if not update_dict:
            raise HTTPException(
                status_code=422, detail="No valid fields to update provided"
            )

        # Update only provided fields
        user_ref.update(update_dict)

        # Get and return updated user data
        updated_doc = user_ref.get()
        updated_user = User(**updated_doc.to_dict())
        return updated_user

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update user: {str(e)}")
