# backend1/src/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np
import os

# ------------------------
# Folder setup
# ------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "ai", "model", "asl_model.h5")

# ------------------------
# Load ASL model
# ------------------------
model = load_model(MODEL_PATH)
print("Model loaded successfully!")

# ------------------------
# FastAPI app
# ------------------------
app = FastAPI(title="ASL Prediction API")

# ------------------------
# Allow CORS for your frontend
# ------------------------
origins = [
    "http://localhost:5173"  # React frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Request body schema
# ------------------------
class Landmarks(BaseModel):
    landmarks: list  # list of 63 numbers (21 points x 3 coordinates)

# ------------------------
# Test endpoint
# ------------------------
@app.get("/")
async def root():
    return {"message": "ASL backend is running!"}

# ------------------------
# Prediction endpoint
# ------------------------
@app.post("/predict")
async def predict(data: Landmarks):
    try:
        # Convert to numpy array
        landmarks_array = np.array(data.landmarks).reshape(1, -1)
        
        # Make prediction
        pred = model.predict(landmarks_array)
        predicted_class = int(np.argmax(pred, axis=1)[0])
        
        return {"prediction": predicted_class}
    except Exception as e:
        return {"error": str(e)}
