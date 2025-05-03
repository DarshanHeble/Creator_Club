from fastapi import APIRouter, HTTPException
from typing import List
from app.models.user import User
from app.firebase import db

router = APIRouter()

@router.post("/bulk-create", response_model=List[User])
async def bulk_create_users(users: List[User]):
    """
    Create multiple users in bulk.

    Args:
        users (List[User]): A list of user objects to create.

    Returns:
        List[User]: A list of successfully created user objects.

    Raises:
        HTTPException: If a database error occurs (500).
    """
    try:
        created_users = []

        for user in users:
            # Check if user already exists
            user_ref = db.collection("users").document(user.id)
            if user_ref.get().exists:
                raise HTTPException(
                    status_code=400,
                    detail=f"User with id {user.id} already exists"
                )

            # Add user to Firestore
            user_ref.set(user.dict())
            created_users.append(user)

        return created_users

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create users: {str(e)}")