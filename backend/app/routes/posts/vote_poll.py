from fastapi import APIRouter, HTTPException
from app.firebase import db  # Import Firestore database instance

router = APIRouter()

@router.post("/posts/{post_id}/vote")
async def vote_poll(post_id: str, option: str):
    """
    Submit a vote for a specific poll option.

    Args:
        post_id (str): The ID of the post containing the poll.
        option (str): The poll option to vote for.

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

        # Increment the vote count for the selected option
        poll_votes = post_data.get("poll_votes", {})
        poll_votes[option] = poll_votes.get(option, 0) + 1

        # Update the Firestore document
        post_ref.update({"poll_votes": poll_votes})

        return {"message": "Vote submitted successfully", "post_id": post_id, "poll_votes": poll_votes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit vote: {str(e)}")