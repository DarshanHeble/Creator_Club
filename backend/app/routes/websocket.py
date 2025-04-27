from fastapi import APIRouter, WebSocket
from fastapi.websockets import WebSocketDisconnect
import asyncio

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
            # Send a heartbeat message every 5 seconds
            await websocket.send_json({"status": "connected"})
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        # Handle client disconnection gracefully
        pass