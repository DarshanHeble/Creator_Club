from fastapi import APIRouter, HTTPException
from app.models.user import User, UserRole
from app.firebase import db

router = APIRouter()

@router.get("/creators", response_model=list[User])
async def get_creators():
    """
    Fetch all users with the role of 'creator'.

    Returns:
        List[User]: A list of users with the role 'creator'

    Raises:
        HTTPException: If there's a database error (500)
    """
    try:
        # Query Firestore for all users with the role 'creator'
        users_ref = db.collection("users")
        query = users_ref.where("role", "==", UserRole.creator.value)
        creators_docs = query.stream()

        # Convert Firestore documents to User models
        creators = [User(**doc.to_dict()) for doc in creators_docs]

        return creators

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch creators: {str(e)}")