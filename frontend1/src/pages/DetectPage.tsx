import React, { useEffect, useRef, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { motion } from "framer-motion";
import { Camera as CameraIcon, CameraOff, Settings, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const BACKEND_URL = "https://setu-sign-backend.onrender.com/predict";

type HandLandmark = { x: number; y: number; z?: number };
interface HandsResults {
  multiHandLandmarks?: HandLandmark[][];
}

const HAND_CONNECTIONS: number[][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17], [17, 5]
];

const fingerColors = {
  thumb: "#FF4500",
  index: "#00FFFF",
  middle: "#FFFF00",
  ring: "#FF00FF",
  pinky: "#00FF00",
  palm: "#00FF00"
};

const DetectPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handsRef = useRef<Hands | null>(null);
  const animationRef = useRef<number | null>(null);

  const [isDetecting, setIsDetecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState<string>("");

  // Cleanup on unmount
  useEffect(() => {
    return () => stopDetection();
  }, []);

  const onResults = async (results: HandsResults) => {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) return;

    const hand = results.multiHandLandmarks[0];

    // Prepare landmarks for backend
    const xVals = hand.map((lm) => lm.x);
    const yVals = hand.map((lm) => lm.y);
    const landmarks: number[] = [];
    for (let i = 0; i < hand.length; i++) {
      landmarks.push(hand[i].x - Math.min(...xVals));
      landmarks.push(hand[i].y - Math.min(...yVals));
    }
    while (landmarks.length < 42) landmarks.push(0);
    if (landmarks.length > 42) landmarks.length = 42;

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ landmarks }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.prediction) setPredictedLetter(String(data.prediction).toUpperCase());
    } catch (err) {
      console.error("Prediction failed", err);
    }

    // Draw landmarks
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);

      HAND_CONNECTIONS.forEach(([start, end]) => {
        const lmStart = hand[start];
        const lmEnd = hand[end];
        ctx.beginPath();
        ctx.moveTo(lmStart.x * canvas.width, lmStart.y * canvas.height);
        ctx.lineTo(lmEnd.x * canvas.width, lmEnd.y * canvas.height);
        let color = "#00FF00";
        if ([0,1,2,3,4].includes(start)) color = fingerColors.thumb;
        else if ([5,6,7,8].includes(start)) color = fingerColors.index;
        else if ([9,10,11,12].includes(start)) color = fingerColors.middle;
        else if ([13,14,15,16].includes(start)) color = fingerColors.ring;
        else if ([17,18,19,20].includes(start)) color = fingerColors.pinky;
        ctx.strokeStyle = color;
        ctx.stroke();
      });

      hand.forEach((lm, idx) => {
        ctx.beginPath();
        ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 5, 0, 2 * Math.PI);
        let color = "#FF0000";
        if ([0,1,2,3,4].includes(idx)) color = fingerColors.thumb;
        else if ([5,6,7,8].includes(idx)) color = fingerColors.index;
        else if ([9,10,11,12].includes(idx)) color = fingerColors.middle;
        else if ([13,14,15,16].includes(idx)) color = fingerColors.ring;
        else if ([17,18,19,20].includes(idx)) color = fingerColors.pinky;
        ctx.fillStyle = color;
        ctx.fill();
      });

      ctx.restore();
    }
  };

  const startDetection = async () => {
    if (!videoRef.current) return;
    setIsLoading(true);
    setPredictedLetter("");

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
    hands.onResults(onResults);
    handsRef.current = hands;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsDetecting(true); // <-- move here for Render
        await videoRef.current.play();
      }
      setIsLoading(false);

      const loop = async () => {
        if (!handsRef.current || !videoRef.current) return;
        await handsRef.current.send({ image: videoRef.current });
        animationRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (err) {
      console.error("Camera start failed", err);
      alert("Cannot access camera. Make sure your site is HTTPS and permissions are granted.");
      setIsLoading(false);
    }
  };

  const stopDetection = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks() || [];
    tracks.forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    handsRef.current?.close();
    handsRef.current = null;
    animationRef.current = null;
    setIsDetecting(false);
    setPredictedLetter("");
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sign <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Detection</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2">
            <Card className="gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Camera Feed</CardTitle>
                <div className="flex items-center space-x-4">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Badge variant={isDetecting ? "default" : "secondary"}>{isDetecting ? "Live" : "Idle"}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-xl overflow-hidden relative">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover [transform:scaleX(-1)]" />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
                    {!isDetecting && !isLoading && (
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <CameraIcon className="w-16 h-16 text-muted-foreground mx-auto" />
                      </div>
                    )}
                    {isLoading && (
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    {isDetecting && predictedLetter && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute bottom-4 left-4 right-4 bg-black/80 text-white rounded-xl p-4 text-center text-3xl font-bold">
                        {predictedLetter}
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-center mt-6 space-x-4">
                    {!isDetecting ? (
                      <Button onClick={startDetection} size="lg" className="btn-hero" disabled={isLoading}>
                        <CameraIcon className="w-5 h-5 mr-2" /> {isLoading ? "Starting..." : "Start Detection"}
                      </Button>
                    ) : (
                      <Button onClick={stopDetection} size="lg" variant="destructive">
                        <CameraOff className="w-5 h-5 mr-2" /> Stop Detection
                      </Button>
                    )}
                    <Button variant="outline" size="lg">
                      <Settings className="w-5 h-5 mr-2" /> Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Detection</CardTitle>
              </CardHeader>
              <CardContent>
                {predictedLetter ? (
                  <div className="text-center text-5xl font-extrabold text-primary">{predictedLetter}</div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="text-5xl mb-2">👋</div>
                    <p>Start detection to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
