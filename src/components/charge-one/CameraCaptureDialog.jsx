"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Camera, RefreshCcw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export default function CameraCaptureDialog({ isOpen, onOpenChange, onCapture }) {
  const { toast } = useToast();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCameraPermission = useCallback(async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings to use this feature.',
      });
    } finally {
        setIsLoading(false);
    }
  }, [toast]);
  
  // Cleanup stream when component unmounts or dialog closes
  const cleanupStream = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null); // Reset on open
      getCameraPermission();
    } else {
      cleanupStream();
    }

    return () => {
      cleanupStream();
    };
  }, [isOpen, getCameraPermission, cleanupStream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUri = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUri);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };
  
  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Identify Vehicle</DialogTitle>
          <DialogDescription>
            Center your vehicle in the frame and capture a photo.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
          {isLoading && <Skeleton className="h-full w-full" />}
          
          <video
            ref={videoRef}
            className={`w-full h-full object-cover ${capturedImage || isLoading ? 'hidden' : 'block'}`}
            autoPlay
            muted
            playsInline
          />
          
          {capturedImage && (
            <img src={capturedImage} alt="Captured vehicle" className="w-full h-full object-cover" />
          )}

          {!isLoading && hasCameraPermission === false && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access in your browser settings to use this feature.
                    </AlertDescription>
                </Alert>
            </div>
          )}

        </div>
        <DialogFooter>
          {capturedImage ? (
            <div className="w-full flex gap-2">
              <Button variant="outline" onClick={handleRetake} className="w-full">
                <RefreshCcw className="mr-2" /> Retake
              </Button>
              <Button onClick={handleConfirm} className="w-full">
                Confirm Photo
              </Button>
            </div>
          ) : (
            <Button onClick={handleCapture} disabled={hasCameraPermission !== true || isLoading} className="w-full">
              <Camera className="mr-2" /> {isLoading ? "Starting Camera..." : "Capture Photo"}
            </Button>
          )}
        </DialogFooter>
         <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
