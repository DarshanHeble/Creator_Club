from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.firebase import db

router = APIRouter()


@router.post("/", response_model=User)
async def create_user(user: User):
    """
    Create a new user in the system.

    Args:
        user (User): The user data to create, including id, username, and email

    Returns:
        User: The created user object

    Raises:
        HTTPException: If a user with the given ID already exists (409)
                        or if there's a database error (500)
    """
    try:
        # Check if user already exists
        if db.collection("users").document(user.id).get().exists:
            raise HTTPException(
                status_code=409, detail=f"User with id {user.id} already exists"
            )

        # Convert user model to dict and store in Firestore
        user_dict = user.dict()
        db.collection("users").document(user.id).set(user_dict)
        return user

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
