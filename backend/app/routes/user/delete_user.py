from fastapi import APIRouter, HTTPException
from app.firebase import db

router = APIRouter()


@router.delete("/{user_id}")
async def delete_user(user_id: str):
    """
    Remove a user from the system.

    Args:
        user_id (str): The ID of the user to delete

    Returns:
        dict: A success message confirming the deletion

    Raises:
        HTTPException: If the user doesn't exist (404)
                      or if there's a database error (500)
    """
    try:
        # Verify user exists before deletion
        user_ref = db.collection("users").document(user_id)
        if not user_ref.get().exists:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )

        # Delete the user document
        user_ref.delete()
        return {"message": f"User {user_id} successfully deleted"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete user: {str(e)}")
