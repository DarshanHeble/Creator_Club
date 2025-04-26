from fastapi import APIRouter, WebSocket
from fastapi.websockets import WebSocketDisconnect
import asyncio

# Create a router instance for WebSocket endpoints
router = APIRouter()


@router.websocket("/ws/connection-status")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint to maintain real-time connection status with clients
    Sends periodic heartbeat messages to confirm connection is alive
    """
    await websocket.accept()

    try:
        while True:
            # Send a heartbeat message every 5 seconds to keep the connection alive
            # and allow clients to detect if the connection is still active
            await websocket.send_json({"status": "connected"})
            # Pause execution for 5 seconds before sending the next heartbeat
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        # Handle client disconnection gracefully
        # This occurs when the client closes the connection or loses connectivity
        pass
