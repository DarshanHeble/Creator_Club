from fastapi import APIRouter, HTTPException
from app.firebase import db

router = APIRouter()


@router.get("/check-username/{username}")
async def check_username(username: str):
    """
    Check if a username is already taken in Firestore.

    Args:
        username: The username to check.

    Returns:
        JSON response indicating if username is taken
    """
    try:
        # Query Firestore for the username
        users_ref = db.collection("users")
        query = users_ref.where("userName", "==", username).limit(1).get()

        # If the query returns any document, the username is taken
        is_taken = len(query) > 0
        return {
            "username": username,
            "is_taken": is_taken,
            "message": f"Username '{username}' is {'taken' if is_taken else 'available'}",
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error checking username availability: {str(e)}"
        )
