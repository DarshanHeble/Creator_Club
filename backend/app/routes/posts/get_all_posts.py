from fastapi import APIRouter, HTTPException
from app.firebase import db

router = APIRouter()

@router.get("/posts", response_model=list[dict])
async def get_all_posts():
    """
    Fetch all posts stored in the database.

    Returns:
        List[dict]: A list of all posts.

    Raises:
        HTTPException: If there's a database error (500).
    """
    try:
        # Query Firestore for all posts
        posts_ref = db.collection("posts")
        posts_docs = posts_ref.stream()

        # Convert Firestore documents to a list of dictionaries
        posts = [doc.to_dict() for doc in posts_docs]

        return posts

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch posts: {str(e)}")