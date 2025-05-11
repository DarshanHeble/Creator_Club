from fastapi import APIRouter, HTTPException
from app.firebase import db  # Import Firestore database instance

router = APIRouter()

@router.post("/posts/{post_id}/dislike")
async def dislike_post(post_id: str):
    """
    Decrement the like count for a specific post.

    Args:
        post_id (str): The ID of the post to dislike.

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

        # Decrement the like count
        post_data = post_doc.to_dict()
        current_likes = post_data.get("likes", 0)
        updated_likes = max(current_likes - 1, 0)  # Ensure likes do not go below 0

        # Update the Firestore document
        post_ref.update({"likes": updated_likes})

        return {"message": "Post disliked successfully", "post_id": post_id, "likes": updated_likes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to dislike post: {str(e)}")