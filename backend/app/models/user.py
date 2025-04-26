from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    """
    Represents a user in the Creator Club platform.

    This model defines the structure of user data stored in Firestore.
    All fields except 'id' are optional to allow partial updates.
    """

    id: str  # Unique identifier for the user
    username: Optional[str] = None  # User's chosen display name
    email: Optional[str] = (
        None  # User's email address for notifications and authentication
    )
