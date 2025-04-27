from fastapi import APIRouter, HTTPException
from app.firebase import db

router = APIRouter()

@router.get("/list")
async def list_users():
    """
    Retrieve a list of all users in the system.

    Returns:
        list: A list of user documents

    Raises:
        HTTPException: If there's a database error (500)
    """
    try:
        users_ref = db.collection("users")
        docs = users_ref.stream()

        users = []
        for doc in docs:
            user_data = doc.to_dict()
            user_data["id"] = doc.id  # Include the document ID
            users.append(user_data)

        return users

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list users: {str(e)}")
