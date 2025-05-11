from fastapi import APIRouter, HTTPException
from app.firebase import db  # Import Firestore database instance

router = APIRouter()

@router.post("/posts/{post_id}/like")
async def like_post(post_id: str):
    """
    Increment the like count for a specific post.

    Args:
        post_id (str): The ID of the post to like.

    Returns:
        dict: A success message with the updated like count.

    Raises:
        HTTPException: If the post does not exist or if there's a database error.
    """
    try:
        # Reference the post document in Firestore
        post_ref = db.collection("posts").document(post_id)
        post_doc = post_ref.get()

        # Check if the post exists
        if not post_doc.exists:
            raise HTTPException(status_code=404, detail=f"Post with ID {post_id} not found")

        # Increment the like count
        post_data = post_doc.to_dict()
        current_likes = post_data.get("likes", 0)
        updated_likes = current_likes + 1

        # Update the Firestore document
        post_ref.update({"likes": updated_likes})

        return {"message": "Post liked successfully", "post_id": post_id, "likes": updated_likes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to like post: {str(e)}")