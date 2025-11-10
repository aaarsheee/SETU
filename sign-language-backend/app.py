from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app) 

# Load the pre-trained model
MODEL_PATH = os.path.join("model.p")

# MODEL_PATH = os.path.join("..", "Sign-Language-to-Text-and-Speech", "model.p")
with open(MODEL_PATH, "rb") as f:
    model_data = pickle.load(f)

if isinstance(model_data, dict):
    model = model_data.get("model", model_data)
else:
    model = model_data

# Label mapping (same as original)
labels_dict = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M',
    13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y',
    25: 'Z', 26: '0', 27: '1', 28: '2', 29: '3', 30: '4', 31: '5', 32: '6', 33: '7', 34: '8', 35: '9',
    36: ' ',
    37: '.'
}

EXPECTED_FEATURES = 42  # Original model expects 42 features

@app.route("/status")
def status():
    return jsonify({"status": "Server is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if "landmarks" not in data:
            return jsonify({"error": "No landmarks provided"}), 400

        landmarks = data["landmarks"]

        if len(landmarks) < EXPECTED_FEATURES:
            # Pad missing values
            landmarks.extend([0] * (EXPECTED_FEATURES - len(landmarks)))
        elif len(landmarks) > EXPECTED_FEATURES:
            landmarks = landmarks[:EXPECTED_FEATURES]

        # Convert to numpy array
        landmarks_array = np.array(landmarks).reshape(1, -1)

        # Predict
        prediction_index = int(model.predict(landmarks_array)[0])
        predicted_letter = labels_dict.get(prediction_index, "?")

        return jsonify({"prediction": predicted_letter})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
