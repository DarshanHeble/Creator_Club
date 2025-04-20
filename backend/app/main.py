from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.websockets import WebSocketDisconnect
import asyncio

# Initialize FastAPI app
app = FastAPI()

frontend_url = "http://localhost:5173"

# CORS configuration (update the allowed origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/ws/connection-status")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Send a heartbeat message every few seconds
            await websocket.send_json({"status": "connected"})
            await asyncio.sleep(5)  # Send status every 5 seconds
    except WebSocketDisconnect:
        pass


@app.get("/")
async def root():
    return {"message": "Creator Club Backend is Running Successfully"}
