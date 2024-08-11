'use client';
import { useState, useCallback, useRef, useEffect } from 'react';

const useLocalStream = () => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startVideo = useCallback(async (): Promise<MediaStream | null> => {
    if (localStreamRef.current) {
      console.log("Using existing local stream");
      setLocalStream(localStreamRef.current);
      return localStreamRef.current;
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices.length === 0) {
        throw new Error("No camera devices found or accessible.");
      }

      let selectedDeviceId = videoDevices[0].deviceId;
      let virtualDeviceId = videoDevices.find(device => device.label.toLowerCase().includes('virtual'))?.deviceId;

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined },
          audio: true
        });
        console.log("Using main camera:", selectedDeviceId);
      } catch (error) {
        console.error("Main camera in use, switching to virtual camera:", error);
        if (virtualDeviceId) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: virtualDeviceId } },
            audio: true
          });
          console.log("Using virtual camera:", virtualDeviceId);
        } else {
          throw new Error("No accessible camera available.");
        }
      }

      localStreamRef.current = stream;
      setLocalStream(stream);
      setError(null);
      return stream;
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Error accessing media devices.";
      setError(errorMessage);
      console.error("Error accessing media devices:", errorMessage);
      return null;
    }
  }, []);

  const stopVideo = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopVideo(); // Clean up the stream when the hook is unmounted
    };
  }, [stopVideo]);

  return { localStream, startVideo, stopVideo, error };
};

export default useLocalStream;
