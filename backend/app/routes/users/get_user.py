from fastapi import APIRouter, HTTPException, Header
from app.models.user import User
from app.firebase import db

router = APIRouter()

@router.get("/get-user", response_model=User)
async def get_user(user_id: str = Header(...)):
    """
    Fetch a single user's data by their ID passed in the request header.

    Args:
        user_id (str): The ID of the user to fetch (passed in the header).

    Returns:
        User: The user object if found.

    Raises:
        HTTPException: If the user doesn't exist (404)
                       or if there's a database error (500).
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

        # Ensure the Firestore document contains all required fields for the User model
        if not user_data.get("id"):
            user_data["id"] = user_id  # Add the ID if it's missing in Firestore

        # Return the user as a Pydantic model
        return User(**user_data)

    except HTTPException as e:
        raise e  # Re-raise HTTP exceptions to preserve their status codes and details
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch user: {str(e)}")