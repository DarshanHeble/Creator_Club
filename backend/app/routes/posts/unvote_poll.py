from fastapi import APIRouter, HTTPException
from app.firebase import db  # Import Firestore database instance

router = APIRouter()

@router.post("/posts/{post_id}/unvote")
async def unvote_poll(post_id: str, option: str):
    """
    Decrement the vote count for a specific poll option.

    Args:
        post_id (str): The ID of the post containing the poll.
        option (str): The poll option to unvote.

    Returns:
        dict: A success message with the updated poll votes.

    Raises:
        HTTPException: If the post does not exist, is not a poll, or if the option is invalid.
    """
    try:
        # Reference the post document in Firestore
        post_ref = db.collection("posts").document(post_id)
        post_doc = post_ref.get()

        # Check if the post exists
        if not post_doc.exists:
            raise HTTPException(status_code=404, detail=f"Post with ID {post_id} not found")

        # Check if the post is a poll
        post_data = post_doc.to_dict()
        if post_data.get("post_type") != "poll":
            raise HTTPException(status_code=400, detail=f"Post with ID {post_id} is not a poll")

        # Check if the option is valid
        poll_options = post_data.get("poll_options", [])
        if option not in poll_options:
            raise HTTPException(status_code=400, detail=f"Invalid poll option: {option}")

        # Decrement the vote count for the selected option
        poll_votes = post_data.get("poll_votes", {})
        current_votes = poll_votes.get(option, 0)
        updated_votes = max(current_votes - 1, 0)  # Ensure votes do not go below 0
        poll_votes[option] = updated_votes

        # Update the Firestore document
        post_ref.update({"poll_votes": poll_votes})

        return {"message": "Vote removed successfully", "post_id": post_id, "poll_votes": poll_votes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove vote: {str(e)}")