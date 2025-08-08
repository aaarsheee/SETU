import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, CameraOff, RotateCcw, Settings, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";

interface DetectionHistoryItem {
  gesture: string;
  confidence: number;
  timestamp: Date;
}

const BACKEND_URL = "http://localhost:8000/predict"; // Change if your backend runs elsewhere

const DetectPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<any>(null);

  const [isDetecting, setIsDetecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<{ gesture: string; confidence: number } | null>(null);
  const [detectionHistory, setDetectionHistory] = useState<DetectionHistoryItem[]>([]);
  const [language] = useState<"ASL" | "NSL">("ASL");

  // Store last 30 frames landmarks for sequence prediction
  const landmarkSequence = useRef<number[][][]>([]);

  // Initialize MediaPipe Hands
  const hands = useRef(
    new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    })
  );

  hands.current.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
  });

  hands.current.onResults((results: any) => {
    const canvasCtx = canvasRef.current?.getContext("2d");
    if (!canvasCtx || !canvasRef.current || !videoRef.current) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      for (const landmarks of results.multiHandLandmarks) {
        // Draw connections
        for (const connection of HAND_CONNECTIONS) {
          const start = landmarks[connection[0]];
          const end = landmarks[connection[1]];
          canvasCtx.beginPath();
          canvasCtx.moveTo(start.x * canvasRef.current.width, start.y * canvasRef.current.height);
          canvasCtx.lineTo(end.x * canvasRef.current.width, end.y * canvasRef.current.height);
          canvasCtx.strokeStyle = "#00FF00";
          canvasCtx.lineWidth = 2;
          canvasCtx.stroke();
        }
        // Draw landmarks
        for (const landmark of landmarks) {
          canvasCtx.beginPath();
          canvasCtx.arc(landmark.x * canvasRef.current.width, landmark.y * canvasRef.current.height, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = "#FF0000";
          canvasCtx.fill();
        }
        // Add landmarks to sequence buffer
        const landmarksFlat = landmarks.map((lm) => [lm.x, lm.y, lm.z]);
        landmarkSequence.current.push(landmarksFlat);
        if (landmarkSequence.current.length > 30) {
          landmarkSequence.current.shift();
        }
      }
    } else {
      landmarkSequence.current = []; // Clear if no hand detected
    }

    canvasCtx.restore();
  });

  const startDetection = () => {
    if (!videoRef.current) return;
    setIsLoading(true);
    setError(null);

    cameraRef.current = new cam.Camera(videoRef.current, {
      onFrame: async () => {
        await hands.current.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    cameraRef.current.start();
    setIsDetecting(true);
    setIsLoading(false);
  };

  const stopDetection = () => {
    cameraRef.current?.stop();
    setIsDetecting(false);
    setDetectionResult(null);
    landmarkSequence.current = [];
  };

  // Poll backend every second with last 30 frames of landmarks
  useEffect(() => {
    if (!isDetecting) return;

    const interval = setInterval(async () => {
      if (landmarkSequence.current.length < 30) return;

      // Flatten landmarks: [30 frames][21 points][3 coords] => flatten to 30*21*3 = 1890 floats
      const flattenedSequence = landmarkSequence.current.flat(2);

      try {
        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sequence: flattenedSequence }),
        });
        const data = await response.json();
        if (data.prediction) {
          setDetectionResult({
            gesture: data.prediction,
            confidence: data.confidence ?? 1,
          });

          // Update detection history
          setDetectionHistory((prev) => {
            const lastItem = prev[0];
            if (
              lastItem &&
              lastItem.gesture === data.prediction &&
              Date.now() - lastItem.timestamp.getTime() < 2000
            ) {
              return prev;
            }
            return [{ gesture: data.prediction, confidence: data.confidence ?? 1, timestamp: new Date() }, ...prev.slice(0, 9)];
          });
        }
      } catch {
        setError("Prediction failed");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isDetecting]);

  const clearHistory = () => setDetectionHistory([]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sign{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Detection
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered real-time sign language detection using your camera.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2">
            <Card className="gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Camera Feed</CardTitle>
                <div className="flex items-center space-x-4">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Badge variant={isDetecting ? "default" : "secondary"}>{language}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ display: isDetecting ? "block" : "none" }}
                      width={640}
                      height={480}
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ display: isDetecting ? "block" : "none" }}
                      width={640}
                      height={480}
                    />
                    {!isDetecting && (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        {isLoading ? (
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p>Accessing camera...</p>
                          </div>
                        ) : error ? (
                          <div className="text-center text-red-400">
                            <p>{error}</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Click start to begin detection</p>
                          </div>
                        )}
                      </div>
                    )}
                    {isDetecting && detectionResult && detectionResult.gesture && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute bottom-4 left-4 right-4 bg-black/80 text-white rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-2xl font-bold mb-1">{detectionResult.gesture}</div>
                            <div className="text-sm opacity-80">Confidence: {(detectionResult.confidence * 100).toFixed(1)}%</div>
                          </div>
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold">{detectionResult.gesture.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex justify-center mt-6 space-x-4">
                    {!isDetecting ? (
                      <Button onClick={startDetection} size="lg" className="btn-hero" disabled={isLoading}>
                        <Camera className="w-5 h-5 mr-2" />
                        {isLoading ? "Initializing..." : "Start Detection"}
                      </Button>
                    ) : (
                      <Button onClick={stopDetection} size="lg" variant="destructive">
                        <CameraOff className="w-5 h-5 mr-2" />
                        Stop Detection
                      </Button>
                    )}
                    <Button variant="outline" size="lg">
                      <Settings className="w-5 h-5 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-6">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Current Detection</CardTitle>
              </CardHeader>
              <CardContent>
                {detectionResult && detectionResult.gesture ? (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{detectionResult.gesture}</div>
                    <div className="text-sm text-muted-foreground mb-3">{(detectionResult.confidence * 100).toFixed(1)}% confidence</div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">👋</div>
                    <p>Start detection to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Detection History</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearHistory} className="p-2">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {detectionHistory.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {detectionHistory.map((item, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium">{item.gesture}</div>
                          <div className="text-xs text-muted-foreground">{item.timestamp.toLocaleTimeString()}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {(item.confidence * 100).toFixed(1)}%
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <div className="text-2xl mb-2">📝</div>
                    <p className="text-sm">No detections yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Detection Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Ensure good lighting for better detection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Keep your hands clearly visible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Sign at a comfortable pace</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Position yourself within the camera frame</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
