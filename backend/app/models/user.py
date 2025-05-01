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
    - id: Unique identifier for the user
    - walletAddress: User's wallet address for blockchain transactions
    - role: User's role in the platform — either 'fan' or 'creator' (mandatory)
    - userName: User's display name (optional)
    - email: User's email address for notifications and authentication (optional)
    - password: User's password (optional)
    - favoriteCreators: List of creator IDs the fan follows (optional)
    - websiteURL: Creator's personal or professional website (optional)
    """

    id: str = None
    walletAddress: str
    userName: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    role: UserRole
    favoriteCreators: Optional[List[str]] = None
    websiteURL: Optional[str] = None
