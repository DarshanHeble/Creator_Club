from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    """
    Root endpoint to verify backend server status
    Returns a simple message indicating the server is running
    """
    return {"message": "Creator Club Backend is Running Successfully"}