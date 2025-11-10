import React, { useState, useRef, useEffect } from "react";

export default function SignLanguageRecognizer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedLetter, setDetectedLetter] = useState<string>("");

  useEffect(() => {
    async function setupCamera() {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      }
    }
    setupCamera();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndSendFrame();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const captureAndSendFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) sendFrameToApi(blob);
    }, "image/jpeg");
  };

  const sendFrameToApi = async (imageBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", imageBlob, "frame.jpg");
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.prediction) setDetectedLetter(data.prediction);
      else setDetectedLetter("No hand detected");
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <h2>Sign Language Recognizer</h2>
      <video
        ref={videoRef}
        style={{ width: 320, height: 240, border: "1px solid black" }}
        autoPlay
        playsInline
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <h3>Detected Letter: {detectedLetter}</h3>
    </div>
  );
}
