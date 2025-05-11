from fastapi import APIRouter, HTTPException
from app.firebase import db  # Import Firestore database instance
from app.models.user import User
from app.models.post import Post

router = APIRouter()

@router.get("/posts/following/{user_id}", response_model=list[Post])
async def get_posts_for_user(user_id: str):
    """
    Fetch posts for a user based on the creators they are following.

    Args:
        user_id (str): The ID of the user.

    Returns:
        List[Post]: A list of posts from the creators the user is following.

    Raises:
        HTTPException: If the user does not exist or if there's a database error.
    """
    try:
        # Reference the user document in Firestore
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()

        # Check if the user exists
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")

        # Get the list of favorite creators the user is following
        user_data = user_doc.to_dict()
        favorite_creators = user_data.get("favoriteCreators", [])

        if not favorite_creators:
            return []  # Return an empty list if the user is not following any creators

        # Query posts from the creators the user is following
        posts_ref = db.collection("posts")
        posts_query = posts_ref.where("user_id", "in", favorite_creators)
        posts_docs = posts_query.stream()

        # Convert Firestore documents to a list of Post objects
        posts = [Post(**doc.to_dict()) for doc in posts_docs]

        return posts

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch posts: {str(e)}")