"use client";

<<<<<<< HEAD
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Camera, RefreshCcw, AlertTriangle, Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
=======
import { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Camera, RefreshCcw, AlertTriangle, Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

const SCAN_INTERVAL = 2000; // 2 seconds
const SCAN_TIMEOUT = 10000; // 10 seconds

<<<<<<< HEAD
export default function CameraCaptureDialog({
  isOpen,
  onOpenChange,
  onCapture,
  identifyVehicle,
}) {
=======
export default function CameraCaptureDialog({ isOpen, onOpenChange, onCapture, identifyVehicle }) {
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  const { toast } = useToast();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
<<<<<<< HEAD
  const [mode, setMode] = useState("loading"); // loading, scanning, capture, preview, error
=======
  const [mode, setMode] = useState('loading'); // loading, scanning, capture, preview, error
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const captureFrame = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
<<<<<<< HEAD
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.8);
    }
    return null;
  }, []);

=======
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.8);
    }
    return null;
  }, []);
  
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  useEffect(() => {
    let stream;
    let localScanInterval;
    let localScanTimeout;

    const getCameraAndScan = async () => {
      // 1. Reset state for new session
<<<<<<< HEAD
      setMode("loading");
=======
      setMode('loading');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      setHasCameraPermission(null);
      setCapturedImage(null);
      setIsScanning(false);

      // 2. Request camera permission
      try {
<<<<<<< HEAD
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
=======
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
<<<<<<< HEAD
        setMode("scanning");
=======
        setMode('scanning');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

        // 3. Start auto-scanning
        localScanTimeout = setTimeout(() => {
          clearInterval(localScanInterval);
<<<<<<< HEAD
          setMode("capture");
=======
          setMode('capture');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
          toast({
            title: "Auto-scan timed out",
            description: "Please capture a photo manually.",
          });
        }, SCAN_TIMEOUT);

        localScanInterval = setInterval(async () => {
<<<<<<< HEAD
          if (document.hidden) return;
=======
          if (document.hidden) return; 
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

          const frame = captureFrame();
          if (frame) {
            try {
              const result = await identifyVehicle({ photoDataUri: frame });
              if (result && result.make !== "Unknown") {
                onCapture(frame);
              }
            } catch (error) {
              console.log("Frame identification failed, trying next one.");
            }
          }
        }, SCAN_INTERVAL);
        scanIntervalRef.current = localScanInterval;
        scanTimeoutRef.current = localScanTimeout;
<<<<<<< HEAD
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        setMode("error");
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description:
            "Please enable camera permissions in your browser settings.",
=======

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setMode('error');
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        });
      }
    };

    const cleanup = () => {
      if (stream) {
<<<<<<< HEAD
        stream.getTracks().forEach((track) => track.stop());
=======
        stream.getTracks().forEach(track => track.stop());
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      scanIntervalRef.current = null;
      scanTimeoutRef.current = null;
    };

    if (isOpen) {
      getCameraAndScan();
    } else {
      cleanup();
    }

    return cleanup;
  }, [isOpen, onCapture, identifyVehicle, toast, captureFrame]);

<<<<<<< HEAD
=======

>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  const handleManualCapture = () => {
    const image = captureFrame();
    if (image) {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      setCapturedImage(image);
<<<<<<< HEAD
      setMode("preview");
=======
      setMode('preview');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };
<<<<<<< HEAD

  const handleRetake = () => {
    setCapturedImage(null);
    setMode("capture");
  };

  const getDialogDescription = () => {
    switch (mode) {
      case "scanning":
        return "Scanning for a vehicle automatically. Please hold steady.";
      case "capture":
        return "Couldn't detect a vehicle automatically. Please center your vehicle and capture a photo.";
      case "preview":
        return "Does this photo look good? If so, confirm it for identification.";
      case "error":
        return "Camera permission is required for vehicle identification.";
      default:
        return "Initializing camera...";
    }
  };
=======
  
  const handleRetake = () => {
    setCapturedImage(null);
    setMode('capture');
  };

  const getDialogDescription = () => {
      switch(mode) {
          case 'scanning':
              return "Scanning for a vehicle automatically. Please hold steady.";
          case 'capture':
              return "Couldn't detect a vehicle automatically. Please center your vehicle and capture a photo.";
          case 'preview':
              return "Does this photo look good? If so, confirm it for identification.";
          case 'error':
              return "Camera permission is required for vehicle identification.";
          default:
              return "Initializing camera...";
      }
  }
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Identify Vehicle</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
<<<<<<< HEAD
          {mode === "loading" && <Skeleton className="h-full w-full" />}

          <video
            ref={videoRef}
            className={`w-full h-full object-cover ${
              capturedImage || mode === "error" || mode === "loading"
                ? "hidden"
                : ""
            }`}
            autoPlay
            muted
            playsInline
          />
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured vehicle"
              className="w-full h-full object-cover"
            />
          )}

          {mode === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access in your browser settings to use
                  this feature.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
        <DialogFooter>
          {mode === "scanning" && (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 animate-spin" />
              Scanning...
            </Button>
          )}
          {mode === "capture" && (
            <Button
              onClick={handleManualCapture}
              disabled={hasCameraPermission !== true}
              className="w-full"
            >
              <Camera className="mr-2" /> Capture Photo
            </Button>
          )}
          {mode === "preview" && (
            <div className="w-full flex gap-2">
              <Button
                variant="outline"
                onClick={handleRetake}
                className="w-full"
              >
=======
            {mode === 'loading' && <Skeleton className="h-full w-full" />}
            
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${capturedImage || mode === 'error' || mode === 'loading' ? 'hidden' : ''}`}
              autoPlay
              muted
              playsInline
            />
            {capturedImage && (
                <img src={capturedImage} alt="Captured vehicle" className="w-full h-full object-cover" />
            )}

            {mode === 'error' && (
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
          {mode === 'scanning' && (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 animate-spin" />
                Scanning...
              </Button>
          )}
          {mode === 'capture' && (
             <Button onClick={handleManualCapture} disabled={hasCameraPermission !== true} className="w-full">
                <Camera className="mr-2" /> Capture Photo
            </Button>
          )}
          {mode === 'preview' && (
             <div className="w-full flex gap-2">
              <Button variant="outline" onClick={handleRetake} className="w-full">
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
                <RefreshCcw className="mr-2" /> Retake
              </Button>
              <Button onClick={handleConfirm} className="w-full">
                Confirm Photo
              </Button>
            </div>
          )}
        </DialogFooter>
<<<<<<< HEAD
        <canvas ref={canvasRef} className="hidden" />
=======
         <canvas ref={canvasRef} className="hidden" />
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      </DialogContent>
    </Dialog>
  );
}
