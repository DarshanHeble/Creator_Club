from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from uuid import uuid4  # Import uuid for generating unique IDs
from app.models.post import Post, PostType  # Import Post and PostType models
from app.firebase import db  # Import Firestore database instance

router = APIRouter()

class CreatePostRequest(BaseModel):
    user_id: str
    content: str
    post_type: Optional[PostType] = PostType.post  # Default to "post"
    poll_question: Optional[str] = None
    poll_options: Optional[List[str]] = None
    media_url: Optional[str] = None  # URL for the media file
    post_id: Optional[str] = None  # Optional post_id

@router.post("/posts")
async def create_post(payload: CreatePostRequest):
    """
    Create a new post. By default, the post type is "post". If "poll" is provided, poll-specific fields are validated.

    Args:
        payload (CreatePostRequest): The post data provided in the request body.

    Returns:
        dict: Success message with the post ID.
    """
    try:
        # Generate post_id if not provided
        if not payload.post_id:
            payload.post_id = str(uuid4())

        # Validate poll-specific fields if the post type is "poll"
        if payload.post_type == PostType.poll:
            if not payload.poll_question:
                raise HTTPException(status_code=400, detail="poll_question is required for poll posts")
            if not payload.poll_options or len(payload.poll_options) < 2:
                raise HTTPException(status_code=400, detail="poll_options must have at least two options for poll posts")

        # Create initial poll_votes if it's a poll
        poll_votes = {option: 0 for option in payload.poll_options} if payload.post_type == PostType.poll else {}

        # Build the Post object
        post = Post(
            post_id=payload.post_id,
            user_id=payload.user_id,
            content=payload.content,
            post_type=payload.post_type,
            media_url=payload.media_url,
            poll_question=payload.poll_question,
            poll_options=payload.poll_options,
            poll_votes=poll_votes,
            likes=0,
        )

        # Save to Firestore
        posts_ref = db.collection("posts")
        posts_ref.document(payload.post_id).set(post.dict())

        return {"message": "Post created successfully", "post_id": post.post_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create post: {str(e)}")