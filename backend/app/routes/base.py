from fastapi import APIRouter

# Create a router instance for basic HTTP endpoints
router = APIRouter()


@router.get("/")
async def root() -> dict:
    """
    Root endpoint that serves as a health check and API information point.

    Returns:
        dict: A simple message indicating the API is running and its purpose
    """
    return {"message": "Welcome to Creator Club API", "status": "running"}
