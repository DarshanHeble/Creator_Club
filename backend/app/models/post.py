from pydantic import BaseModel
from typing import Optional, List

class Post(BaseModel):
    id: str
    content: str
    media_url: Optional[str] = None
    poll_question: Optional[str] = None
    poll_options: Optional[List[str]] = None
    likes: int = 0
    user_id: str  # ID of the user who created the post