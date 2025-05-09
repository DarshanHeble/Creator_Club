from pydantic import BaseModel
from typing import Optional
from enum import Enum


class QuestDifficulty(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"


class QuestAction(str, Enum):
    like = "like"  # User is required to like a post or content
    comment = "comment"  # User is required to leave a comment on a post or content
    watch = "watch"  # User is required to watch a video or view content
    subscribe = (
        "subscribe"  # User is required to subscribe to a creator's channel(Youtube)
    )
    follow = "follow"  # User is required to follow a creator on a specific platform
    join = "join"  # User is required to join a group, server, or community(Discord)
    vote = "vote"  # User is required to participate in a poll or vote on content
    # share = "share"  # User is required to share a post on their social platform
    # submit_content = "submit_content"  # User is required to submit their own content (e.g., photo, video, text)
    # purchase = "purchase"  # User is required to buy a product or service
    # attend_event = "attend_event"  # User is required to attend a virtual or physical event
    # daily_check_in = "daily_check_in"  # User is required to check in daily for rewards
    # solve_puzzle = "solve_puzzle"  # User is required to solve a puzzle or complete a task


class Quest(BaseModel):
    id: str = None
    creatorId: str = None
    creatorName: str = None
    title: str = None
    description: str = None
    rewards: int = None
    questAction: QuestAction
    difficulty: QuestDifficulty
    link: Optional[str] = None  # URL associated with the quest
