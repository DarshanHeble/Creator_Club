from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.firebase import db

router = APIRouter()


@router.get("/get-user/{user_id}", response_model=User)
async def get_user(user_id: str):
    """
    Fetch a single user's data by their ID.

    Args:
        user_id (str): The ID of the user to fetch

    Returns:
        User: The user object if found

    Raises:
        HTTPException: If the user doesn't exist (404)
                        or if there's a database error (500)
    """
    try:
        # Get user document from Firestore
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()

        # Check if user exists
        if not user_doc.exists:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )

        # Convert Firestore document to User model
        user_data = user_doc.to_dict()
        return User(**user_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch user: {str(e)}")
