from fastapi import APIRouter, HTTPException
from typing import List
from app.models.post import Post

router = APIRouter()

# Mock database
posts_db = {}

@router.get("/posts/{user_id}", response_model=List[Post])
async def get_user_posts(user_id: str):
    user_posts = [post for post in posts_db.values() if post["user_id"] == user_id]
    if not user_posts:
        raise HTTPException(status_code=404, detail="No posts found for this user")
    return user_posts