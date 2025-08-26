import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface Props {
    previous_analyses?: Array<{
        id: number;
        face_shape: string;
        confidence_score: number;
        created_at: string;
    }>;
    [key: string]: unknown;
}

export default function FaceAnalysis({ previous_analyses = [] }: Props) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'user' } 
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please ensure camera permissions are granted.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            const context = canvas.getContext('2d');
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            if (context) {
                context.drawImage(video, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                setCapturedImage(imageData);
                stopCamera();
            }
        }
    };

    const analyzeFace = async () => {
        if (!capturedImage) return;

        setIsAnalyzing(true);
        
        // Simulate AI analysis (in real implementation, this would call an AI service)
        setTimeout(() => {
            const faceShapes = ['round', 'square', 'oval', 'heart', 'oblong'];
            const randomShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
            const confidenceScore = 0.75 + Math.random() * 0.20; // 75-95% confidence

            router.post('/face-analysis', {
                face_shape: randomShape,
                confidence_score: confidenceScore,
                image_path: capturedImage,
            }, {
                onSuccess: () => {
                    setIsAnalyzing(false);
                    setCapturedImage(null);
                },
                onError: () => {
                    setIsAnalyzing(false);
                    alert('Analysis failed. Please try again.');
                }
            });
        }, 3000);
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        startCamera();
    };

    return (
        <>
            <Head title="🤖 AI Face Shape Analysis" />
            
            <AppShell>
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">🤖 AI Face Shape Analysis</h1>
                        <p className="text-gray-600">
                            Use your camera to analyze your face shape and get personalized glasses recommendations.
                        </p>
                    </div>

                    {/* Camera Interface */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-center">
                            {!stream && !capturedImage && (
                                <div className="space-y-4">
                                    <div className="text-6xl mb-4">📸</div>
                                    <h3 className="text-lg font-semibold text-gray-900">Ready to analyze your face?</h3>
                                    <p className="text-gray-600 mb-6">
                                        Position your face in front of the camera for the best results. 
                                        Make sure you have good lighting and look directly at the camera.
                                    </p>
                                    <Button onClick={startCamera} size="lg">
                                        📷 Start Camera
                                    </Button>
                                </div>
                            )}

                            {stream && !capturedImage && (
                                <div className="space-y-4">
                                    <div className="relative inline-block">
                                        <video 
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            className="rounded-lg shadow-lg max-w-md"
                                        />
                                        <div className="absolute inset-0 border-4 border-blue-400 rounded-lg opacity-50"></div>
                                    </div>
                                    <div className="space-x-4">
                                        <Button onClick={captureImage} size="lg">
                                            📸 Capture Photo
                                        </Button>
                                        <Button onClick={stopCamera} variant="outline">
                                            ❌ Stop Camera
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Position your face within the frame and click capture when ready
                                    </p>
                                </div>
                            )}

                            {capturedImage && (
                                <div className="space-y-4">
                                    <div className="relative inline-block">
                                        <img 
                                            src={capturedImage} 
                                            alt="Captured face"
                                            className="rounded-lg shadow-lg max-w-md"
                                        />
                                    </div>
                                    <div className="space-x-4">
                                        {!isAnalyzing ? (
                                            <>
                                                <Button onClick={analyzeFace} size="lg">
                                                    🤖 Analyze Face Shape
                                                </Button>
                                                <Button onClick={retakePhoto} variant="outline">
                                                    🔄 Retake Photo
                                                </Button>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <div className="inline-flex items-center px-6 py-3 text-lg">
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                                                    🧠 Analyzing your face shape...
                                                </div>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    This may take a few seconds
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <canvas ref={canvasRef} className="hidden" />
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Analysis Tips</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Look directly at the camera
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Ensure good lighting
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Keep a neutral expression
                                </li>
                            </ul>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="text-red-500 mr-2">✗</span>
                                    Avoid wearing glasses
                                </li>
                                <li className="flex items-center">
                                    <span className="text-red-500 mr-2">✗</span>
                                    Don't tilt your head
                                </li>
                                <li className="flex items-center">
                                    <span className="text-red-500 mr-2">✗</span>
                                    Avoid shadows on face
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Previous Analyses */}
                    {previous_analyses.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Previous Analyses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {previous_analyses.map((analysis) => (
                                    <div key={analysis.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">
                                                {analysis.face_shape === 'round' && '⭕'}
                                                {analysis.face_shape === 'square' && '⬜'}
                                                {analysis.face_shape === 'oval' && '🥚'}
                                                {analysis.face_shape === 'heart' && '💖'}
                                                {analysis.face_shape === 'oblong' && '📏'}
                                            </div>
                                            <div className="font-semibold text-gray-900 capitalize">
                                                {analysis.face_shape}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {Math.round(analysis.confidence_score * 100)}% confident
                                            </div>
                                            <div className="text-xs text-gray-500 mt-2">
                                                {new Date(analysis.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}