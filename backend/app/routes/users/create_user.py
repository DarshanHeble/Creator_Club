from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.firebase import db

router = APIRouter()


@router.post("/create", response_model=User)
async def create_user(user: User):
    """
    Create a new user. Optional fields can be omitted from the request.

    Args:
        user (User): The user data provided in the request body. Required fields are:
                    - id
                    - role ('fan' or 'creator')
                    All other fields (userName, email, password, etc.) are optional
                    and can be omitted from the request.

    Returns:
        User: The newly created user object, containing only non-None fields

    Raises:
        HTTPException: If a user with the same ID already exists (409)
                        or if a database error occurs (500)
    """
    try:
        # Check if user already exists
        user_ref = db.collection("users").document(user.id)
        if user_ref.get().exists:
            raise HTTPException(
                status_code=409, detail=f"User with id {user.id} already exists"
            )

        user_dict = user.model_dump(by_alias=True)

        # Save the user document to Firestore, excluding fields with None values
        user_ref.set({k: v for k, v in user_dict.items() if v is not None})

        # Return the created user as a response
        return User(**user_dict)

    except HTTPException:
        raise  # Re-raise HTTP exceptions as is
    except Exception as e:
        # Handle any unexpected errors during user creation
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
