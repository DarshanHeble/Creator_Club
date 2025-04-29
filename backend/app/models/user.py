from typing import List, Optional
from pydantic import BaseModel
from enum import Enum


class UserRole(str, Enum):
    fan = "fan"
    creator = "creator"


class User(BaseModel):
    """
    Represents a user in the Creator Club platform.

    This model defines the structure of user data stored in Firestore.

    Fields:
    - id: Unique identifier for the user (generated randomly in the backend)
    - wallet_address: User's wallet address for blockchain transactions (optional)
    - username: User's display name (mandatory)
    - email: User's email address for notifications and authentication (optional)
    - role: User's role in the platform — either 'fan' or 'creator' (mandatory)
    - favorite_creators: List of creator IDs the fan follows (only for fans)
    - website: Creator's personal or professional website (only for creators)
    """

    id: str = None
    wallet_address: Optional[str] = None
    username: str
    email: Optional[str] = None
    password: Optional[str] = None
    role: UserRole
    favorite_creators: Optional[List[str]] = None
    website_url: Optional[str] = None
