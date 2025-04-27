from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Creator, Subscription
from app.schemas import SubscriptionCreate, SubscriptionResponse

router = APIRouter()

@router.post("/subscribe", response_model=SubscriptionResponse)
def subscribe_to_creator(subscription: SubscriptionCreate, db: Session = Depends(get_db)):
    # Check if the fan exists
    fan = db.query(User).filter(User.id == subscription.fan_id).first()
    if not fan:
        raise HTTPException(status_code=404, detail="Fan not found")

    # Check if the creator exists
    creator = db.query(Creator).filter(Creator.id == subscription.creator_id).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    # Check if the subscription already exists
    existing_subscription = db.query(Subscription).filter(
        Subscription.fan_id == subscription.fan_id,
        Subscription.creator_id == subscription.creator_id
    ).first()
    if existing_subscription:
        raise HTTPException(status_code=400, detail="Already subscribed to this creator")

    # Create a new subscription
    new_subscription = Subscription(
        fan_id=subscription.fan_id,
        creator_id=subscription.creator_id
    )
    db.add(new_subscription)
    db.commit()
    db.refresh(new_subscription)

    return new_subscription