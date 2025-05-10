from fastapi import APIRouter, HTTPException, UploadFile, Form
from typing import Optional, List

router = APIRouter()

@router.post("/posts")
async def create_post(
    user_id: str = Form(...),
    content: str = Form(...),
    poll_question: Optional[str] = Form(None),
    poll_options: Optional[List[str]] = Form(None),
    media: Optional[UploadFile] = None,
):
    # Your logic for creating a post
    return {"message": "Post created successfully"}