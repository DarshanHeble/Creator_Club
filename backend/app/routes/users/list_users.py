from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.firebase import db

router = APIRouter()

@router.get("/list", response_model=list[User])
async def list_users():
    """
    Fetch all users from the database.

    Returns:
        List[User]: A list of all users.

    Raises:
        HTTPException: If there's a database error (500).
    """
    try:
        # Query Firestore for all users
        users_ref = db.collection("users")
        users_docs = users_ref.stream()

        # Convert Firestore documents to User models
        users = [User(**doc.to_dict()) for doc in users_docs]

        return users

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch users: {str(e)}")