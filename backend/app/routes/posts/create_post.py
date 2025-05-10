from fastapi import APIRouter, HTTPException, UploadFile, Form
from typing import List, Optional
# import cloudinary.uploader  # Ensure Cloudinary Python SDK is installed

router = APIRouter()

@router.post("/posts")
async def create_post(
    post_content: str = Form(...),
    poll_question: Optional[str] = Form(None),
    poll_options: Optional[List[str]] = Form(None),
    media: Optional[UploadFile] = None,
):
    """
    Endpoint to create a new post with optional poll and media attachment.

    Args:
        post_content (str): The main content of the post.
        poll_question (Optional[str]): The question for the poll (if any).
        poll_options (Optional[List[str]]): The options for the poll (if any).
        media (Optional[UploadFile]): The media file to be uploaded (if any).

    Returns:
        dict: A success message and the created post data.
    """
    try:
        # Initialize media URL
        media_url = None

        # Handle media upload to Cloudinary
        if media:
            try:
                upload_result = cloudinary.uploader.upload(
                    media.file,  # Pass the file object
                    folder="posts",  # Specify the folder in Cloudinary
                    resource_type="auto"  # Automatically detect file type (image/video)
                )
                media_url = upload_result.get("secure_url")  # Get the secure URL of the uploaded file
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to upload media: {str(e)}")

        # Construct the post data
        post_data = {
            "post_content": post_content,
            "poll_question": poll_question,
            "poll_options": poll_options,
            "media_url": media_url,
            "likes": 0,  # Initialize likes to 0
        }

        # Save the post data to the database (replace with actual DB logic)
        print("Post Created:", post_data)

        # Return a success response
        return {"message": "Post created successfully", "data": post_data}

    except Exception as e:
        # Handle any unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")