import React, { useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

export default function BatchImageSender() {
  const [log, setLog] = useState<string[]>([]);

  const sendLocalImageToApi = async (imagePath: string) => {
    try {
      const response = await fetch(imagePath);
      if (!response.ok) {
        setLog((prev) => [...prev, `Failed to load ${imagePath}`]);
        return;
      }
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob, "hand.jpg");

      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setLog((prev) => [...prev, `API error for ${imagePath}`]);
        return;
      }

      const data = await res.json();
      setLog((prev) => [
        ...prev,
        `${imagePath} → Prediction: ${data.prediction || "No prediction"}`,
      ]);
    } catch (error) {
      setLog((prev) => [...prev, `Error sending ${imagePath}: ${error}`]);
    }
  };

  const sendAllAlphabetImages = async () => {
    for (const letter of letters) {
      for (let i = 1; i <= 70; i++) {
        const path = `/asl_dataset/${letter}/${i}.jpg`;
        await sendLocalImageToApi(path);
      }
    }
  };

  const sendAllDigitImages = async () => {
    for (const digit of digits) {
      for (let i = 1; i <= 70; i++) {
        const path = `/asl_dataset/${digit}/${i}.jpg`;
        await sendLocalImageToApi(path);
      }
    }
  };

  return (
    <div>
      <h2>Send ASL Images to Backend</h2>
      <button onClick={sendAllAlphabetImages}>Send All Alphabets</button>
      <button onClick={sendAllDigitImages} style={{ marginLeft: 10 }}>
        Send All Digits
      </button>
      <div style={{ maxHeight: 300, overflowY: "auto", marginTop: 10 }}>
        {log.map((entry, idx) => (
          <div key={idx} style={{ fontSize: 12 }}>
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}
