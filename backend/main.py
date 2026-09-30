from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
from fastapi.responses import FileResponse
import os
from dotenv import load_dotenv


# ✅ ADD THIS (missing imports)
from database import engine
import models
from crud import save_hashtag

load_dotenv()

# ✅ CREATE TABLE
models.Base.metadata.create_all(bind=engine)

PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👉 API KEY
API_KEY = os.getenv("OPENROUTER_API_KEY")

# 👉 Input model
class InputData(BaseModel):
    text: str
    style: str = "Professional"

# 👉 Home
@app.get("/")
def home():
    return {"message": "Backend running ✅"}

# =========================
# ✅ CAPTION API (UNCHANGED)
# =========================
@app.post("/captions")
def generate_caption(data: InputData):
    try:
        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": f"Generate 10 {data.style} Instagram captions for: {data.text}. Each caption should be on a new line. Do not repeat captions. Do not use quotes."
                }
            ]
        }

        response = requests.post(url, headers=headers, json=payload)
        result = response.json()

        return {
            "result": result["choices"][0]["message"]["content"]
        }

    except Exception as e:
        return {"result": f"❌ Error: {str(e)}"}


# =========================
# 🔥 HASHTAG API (ONLY ADD DB SAVE)
# =========================
@app.post("/hashtags")
def generate_hashtags(data: InputData):
    try:
        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": f"Generate 20 trending hashtags for: {data.text}. Give all hashtags in one line separated by space. No explanation."
                }
            ]
        }

        response = requests.post(url, headers=headers, json=payload)
        result = response.json()

        hashtags = result["choices"][0]["message"]["content"]

        # ✅ ADD THIS (DATABASE SAVE)
        save_hashtag(data.text, hashtags, 1)

        return {
            "result": hashtags
        }

    except Exception as e:
        return {"result": f"❌ Error: {str(e)}"}


# =========================
# 🎬 VIDEO API (UNCHANGED)
# =========================
@app.post("/video")
def generate_video(data: InputData):
    try:
        import requests

        video_type = getattr(data, "type", "short")

        if video_type == "short":
            query = f"{data.text} vertical"
        else:
            query = f"{data.text} landscape"

        ai_url = "https://openrouter.ai/api/v1/chat/completions"

        ai_headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }

        ai_payload = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": f"Generate 1 powerful short motivational line for video about: {data.text}. Max 8 words."
                }
            ]
        }

        ai_res = requests.post(ai_url, headers=ai_headers, json=ai_payload)
        ai_result = ai_res.json()

        caption = ai_result["choices"][0]["message"]["content"]

        url = f"https://api.pexels.com/videos/search?query={query}&per_page=5"

        headers = {
            "Authorization": PEXELS_API_KEY
        }

        response = requests.get(url, headers=headers)
        result = response.json()

        video_files = result["videos"][0]["video_files"]
        best_video = sorted(video_files, key=lambda x: x.get("width", 0), reverse=True)[0]
        video_url = best_video["link"]

        return {
            "video_url": video_url,
            "caption": caption
        }

    except Exception as e:
        return {"result": f"❌ Error: {str(e)}"}