'use client';

import React, { useRef, useState } from 'react';
import { Camera, X, RotateCcw } from 'lucide-react';

interface CameraComponentProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export default function CameraComponent({ onCapture, onClose }: CameraComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(imageData);
        stopCamera();
      }
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    setTimeout(startCamera, 100);
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Take Photo</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas
            ref={canvasRef}
            className="hidden"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={switchCamera}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button
            onClick={capturePhoto}
            className="p-4 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
          >
            <Camera className="w-8 h-8 text-white" />
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          Position your crop, soil, or plant in the frame and tap the camera button
        </p>
      </div>
    </div>
  );
}
