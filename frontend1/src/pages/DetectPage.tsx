import React, { useEffect, useRef, useState } from "react";
import * as mpHands from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { motion } from "framer-motion";
import { Camera as CameraIcon, CameraOff, Settings, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const BACKEND_URL = "https://setu-sign-backend.onrender.com/predict";

const DetectPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handsRef = useRef<mpHands.Hands | null>(null);
  const cameraRef = useRef<any>(null);

  const [isDetecting, setIsDetecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState<string>("");

  useEffect(() => {
    return () => {
      // cleanup on unmount
      stopDetection();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResults = async (results: mpHands.Results) => {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) return;

    const hand = results.multiHandLandmarks[0];
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

    // optional: draw simple landmarks overlay
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.0)";
      hand.forEach((lm) => {
        ctx.beginPath();
        ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#10b981"; // green
        ctx.fill();
      });
    }
  };

  const startDetection = async () => {
    if (!videoRef.current) return;
    setIsLoading(true);
    setPredictedLetter("");

    const hands = new mpHands.Hands({
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

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (!handsRef.current) return;
        await handsRef.current.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    cameraRef.current = camera;
    try {
      await camera.start();
      setIsDetecting(true);
    } catch (err) {
      console.error("Camera start failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopDetection = () => {
    try {
      cameraRef.current?.stop();
    } catch {}
    try {
      handsRef.current?.close();
    } catch {}
    cameraRef.current = null;
    handsRef.current = null;
    setIsDetecting(false);
    setPredictedLetter("");
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sign <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Detection</span>
          </h1>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">AI-powered real-time sign language detection using your camera.</p> */}
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
                  <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
                    {!isDetecting && (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 absolute inset-0">
                        {isLoading ? (
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p>Initializing camera...</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <CameraIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            {/* <p className="text-muted-foreground">Click start to begin detection</p> */}
                          </div>
                        )}
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
