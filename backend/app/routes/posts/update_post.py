from fastapi import APIRouter, HTTPException
from app.models.post import Post

router = APIRouter()

# Mock database
posts_db = {}

@router.put("/posts/{post_id}", response_model=Post)
async def update_post(post_id: str, updated_post: Post):
    if post_id not in posts_db:
        raise HTTPException(status_code=404, detail="Post not found")
    posts_db[post_id].update(updated_post.dict())
    return posts_db[post_id]