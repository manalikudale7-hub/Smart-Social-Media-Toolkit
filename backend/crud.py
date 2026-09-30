from database import SessionLocal
from models import Hashtag

def save_hashtag(text, result, user_id):
    db = SessionLocal()

    new_data = Hashtag(
        text=text,
        result=result,
        user_id=user_id
    )

    db.add(new_data)
    db.commit()
    db.close()