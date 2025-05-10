from fastapi import APIRouter, HTTPException
from app.models.user import User, UserRole
from app.firebase import db
from pydantic import BaseModel


class RoleUpdate(BaseModel):
    """
    Schema for role update requests.
    """

    role: UserRole


router = APIRouter()


@router.put("/{user_id}/role", response_model=User)
async def update_user_role(user_id: str, role_update: RoleUpdate):
    """
    Update a user's role between fan and creator.

    Args:
        user_id (str): The ID of the user to update
        role_update (RoleUpdate): The new role for the user

    Returns:
        User: The updated user object

    Raises:
        HTTPException:  If the user doesn't exist (404)
                        If there's a database error (500)
    """
    try:
        # Verify user exists
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()
        if not user_doc.exists:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )

        # Update the role
        user_ref.update({"role": role_update.role})

        # Get and return updated user data
        updated_doc = user_ref.get()
        updated_user = User(**updated_doc.to_dict())
        return updated_user

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to update user role: {str(e)}"
        )
