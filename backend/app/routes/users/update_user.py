from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.firebase import db

router = APIRouter()


@router.put("/{user_id}", response_model=User)
async def update_user(user_id: str, user: User):
    """
    Update an existing user's information.

    Args:
        user_id (str): The ID of the user to update
        user (User): The updated user data

    Returns:
        User: The updated user object

    Raises:
        HTTPException: If the user doesn't exist (404)
                        or if there's a database error (500)
    """
    try:
        # Verify user exists
        user_ref = db.collection("users").document(user_id)
        if not user_ref.get().exists:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )

        # Update only non-None fields
        update_data = {k: v for k, v in user.model_dump(by_alias=True).items() if v is not None}
        user_ref.update(update_data)

        # Return updated user data
        updated_user = User(**user_ref.get().to_dict())
        return updated_user

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update user: {str(e)}")
