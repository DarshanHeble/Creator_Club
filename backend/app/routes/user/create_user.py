from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.firebase import db
import uuid

router = APIRouter()

@router.post("/", response_model=User)
async def create_user(user: User):
    """
    Create a new user with a randomly generated ID.

    Args:
        user (User): The user data provided in the request body (excluding ID)

    Returns:
        User: The newly created user object with a generated ID

    Raises:
        HTTPException: If a database error occurs (500)
    """
    try:
        # Generate a unique random ID for the user
        user_id = str(uuid.uuid4())
        user_dict = user.dict()
        user_dict["id"] = user_id

        # Save the user document to Firestore, excluding fields with None values
        db.collection("users").document(user_id).set(
            {k: v for k, v in user_dict.items() if v is not None}
        )

        # Return the created user as a response
        return User(**user_dict)

    except Exception as e:
        # Handle any unexpected errors during user creation
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
