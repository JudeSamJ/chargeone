"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Camera, RefreshCcw, AlertTriangle, Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const SCAN_INTERVAL = 2000; // 2 seconds
const SCAN_TIMEOUT = 10000; // 10 seconds

export default function CameraCaptureDialog({ isOpen, onOpenChange, onCapture, identifyVehicle }) {
  const { toast } = useToast();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [mode, setMode] = useState('loading'); // loading, scanning, capture, preview
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const cleanup = useCallback(() => {
    // Stop camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    // Clear intervals and timeouts
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanIntervalRef.current = null;
    scanTimeoutRef.current = null;
    setIsScanning(false);
  }, []);
  
  const getCameraPermission = useCallback(async () => {
    setMode('loading');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMode('scanning'); // Move to scanning mode after getting permission
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setMode('error');
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
    }
  }, [toast]);
  
  const captureFrame = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      // Set canvas size to match video to avoid distorted images
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.8); // Get a compressed JPEG
    }
    return null;
  }, []);

  // Effect to handle the entire lifecycle of the dialog
  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null); // Reset on open
      getCameraPermission();
    } else {
      cleanup(); // Cleanup when dialog closes
    }
    return cleanup; // Ensure cleanup on unmount
  }, [isOpen, getCameraPermission, cleanup]);


  // Effect to manage the live scanning process
  useEffect(() => {
    if (mode === 'scanning' && !isScanning && identifyVehicle) {
      // Start scanning timeout
      scanTimeoutRef.current = setTimeout(() => {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        setMode('capture'); // Switch to manual capture mode on timeout
        toast({
            title: "Auto-scan timed out",
            description: "Please capture a photo manually.",
        });
      }, SCAN_TIMEOUT);

      // Start scanning interval
      scanIntervalRef.current = setInterval(async () => {
        if (isScanning || document.hidden) return; // Don't scan if already processing or tab is hidden

        const frame = captureFrame();
        if (frame) {
          setIsScanning(true);
          try {
            const result = await identifyVehicle({ photoDataUri: frame });
            if (result && result.make !== "Unknown") {
              onCapture(frame); // Pass the successful frame back
              // The parent component will close the dialog, triggering cleanup.
            }
          } catch (error) {
            // Ignore errors for single frames, let it try again
            console.log("Frame identification failed, trying next one.");
          } finally {
            setIsScanning(false);
          }
        }
      }, SCAN_INTERVAL);
    }

    // Cleanup scanning logic if mode changes
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    };
  }, [mode, isScanning, identifyVehicle, captureFrame, onCapture, toast]);


  const handleManualCapture = () => {
    const image = captureFrame();
    if (image) {
        setCapturedImage(image);
        setMode('preview');
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };
  
  const handleRetake = () => {
    setCapturedImage(null);
    setMode('capture');
  };

  const renderContent = () => {
    switch (mode) {
      case 'loading':
        return <Skeleton className="h-full w-full" />;
      case 'error':
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature.
                    </AlertDescription>
                </Alert>
            </div>
        );
      case 'scanning':
      case 'capture':
        return (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
        );
      case 'preview':
         return (
            <img src={capturedImage} alt="Captured vehicle" className="w-full h-full object-cover" />
         );
      default:
        return null;
    }
  }
  
  const getDialogDescription = () => {
      switch(mode) {
          case 'scanning':
              return "Scanning for a vehicle automatically. Please hold steady.";
          case 'capture':
              return "Couldn't detect a vehicle automatically. Please center your vehicle in the frame and capture a photo.";
          case 'preview':
              return "Does this photo look good? If so, confirm it for identification.";
          default:
              return "Initializing camera...";
      }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Identify Vehicle</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
          {renderContent()}
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
                <RefreshCcw className="mr-2" /> Retake
              </Button>
              <Button onClick={handleConfirm} className="w-full">
                Confirm Photo
              </Button>
            </div>
          )}
        </DialogFooter>
         <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
