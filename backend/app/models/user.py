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
    - role: User's role in the platform — either 'fan' or 'creator' (mandatory)
    - favorite_creators: List of creator IDs the fan follows (only for fans)
    - website: Creator's personal or professional website (only for creators)
    - email: User's email address for notifications and authentication (optional)
    """

    id: Optional[str] = None  # Unique identifier (randomly generated in backend)
    wallet_address: Optional[str] = None  # User's wallet address (optional)
    username: str  # Mandatory display name for the user
    role: UserRole  # Mandatory role — fan or creator
    favorite_creators: Optional[List[str]] = None  # List of favorite creators (for fans)
    website: Optional[str] = None  # Creator's website (for creators)
    email: Optional[str] = None  # Email address (optional)
