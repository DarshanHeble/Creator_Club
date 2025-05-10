from fastapi import APIRouter, HTTPException
from app.firebase import db

router = APIRouter()

@router.get("/posts/{user_id}")
async def get_user_posts(user_id: str):
    try:
        # Query Firestore for posts by user_id
        posts_ref = db.collection("posts").where("user_id", "==", user_id)
        docs = posts_ref.stream()

        posts = []
        for doc in docs:
            post = doc.to_dict()
            post["id"] = doc.id  # Include the document ID
            posts.append(post)

        if not posts:
            raise HTTPException(status_code=404, detail="No posts found for this user")

        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}")