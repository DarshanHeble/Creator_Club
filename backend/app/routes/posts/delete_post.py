from fastapi import APIRouter, HTTPException

router = APIRouter()

# Mock database
posts_db = {}

@router.delete("/posts/{post_id}")
async def delete_post(post_id: str):
    if post_id not in posts_db:
        raise HTTPException(status_code=404, detail="Post not found")
    del posts_db[post_id]
    return {"message": "Post deleted successfully"}