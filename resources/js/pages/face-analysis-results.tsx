import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface FaceAnalysis {
    id: number;
    face_shape: string;
    confidence_score: number;
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    brand: string;
    optik_store: {
        store_name: string;
        location: string;
    };
}

interface Props {
    analysis: FaceAnalysis;
    recommendations: string[];
    recommended_products: Product[];
    [key: string]: unknown;
}

export default function FaceAnalysisResults({ analysis, recommendations, recommended_products }: Props) {
    const faceShapeEmoji = {
        round: '⭕',
        square: '⬜',
        oval: '🥚',
        heart: '💖',
        oblong: '📏',
    }[analysis.face_shape] || '😊';

    const faceShapeDescription = {
        round: 'Round faces have soft, curved lines with similar width and height. The jawline is rounded and the forehead is wide.',
        square: 'Square faces have strong, angular jawlines with similar width at the forehead, cheeks, and jaw.',
        oval: 'Oval faces are longer than wide with gently rounded corners. This is considered the most balanced face shape.',
        heart: 'Heart faces are wider at the forehead and temples, narrowing down to a pointed chin.',
        oblong: 'Oblong faces are longer than wide with a straight cheek line and minimal curves.',
    }[analysis.face_shape] || '';

    const frameAdvice = {
        round: 'Choose angular and geometric frames to add structure and definition to your soft features.',
        square: 'Opt for round or oval frames to soften your strong angular features.',
        oval: 'Lucky you! Almost any frame style will complement your balanced features.',
        heart: 'Select frames that are wider at the bottom to balance your narrower chin.',
        oblong: 'Choose frames with more width than height to create the illusion of a shorter face.',
    }[analysis.face_shape] || '';

    const confidencePercentage = Math.round(analysis.confidence_score * 100);

    return (
        <>
            <Head title={`🤖 Face Analysis Results - ${analysis.face_shape.charAt(0).toUpperCase() + analysis.face_shape.slice(1)} Face`} />
            
            <AppShell>
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Results Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-8">
                        <div className="text-center">
                            <div className="text-8xl mb-4">{faceShapeEmoji}</div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Your Face Shape: <span className="capitalize text-blue-600">{analysis.face_shape}</span>
                            </h1>
                            <div className="flex items-center justify-center space-x-4 mb-4">
                                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    {confidencePercentage}% Confidence
                                </div>
                                <div className="text-sm text-gray-600">
                                    Analyzed on {new Date(analysis.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                                {faceShapeDescription}
                            </p>
                        </div>
                    </div>

                    {/* Frame Recommendations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                💡 Recommended Frame Styles
                            </h3>
                            <p className="text-gray-600 mb-4">{frameAdvice}</p>
                            <div className="space-y-3">
                                {recommendations.map((style, index) => (
                                    <div key={index} className="flex items-center bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                                        <span className="text-blue-600 mr-3">✓</span>
                                        <span className="capitalize font-medium text-blue-800">
                                            {style.replace('_', ' ')} Frames
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                📊 Analysis Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Face Shape</span>
                                    <span className="font-semibold capitalize">{analysis.face_shape}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Confidence Score</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-500 h-2 rounded-full" 
                                                style={{ width: `${confidencePercentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-semibold">{confidencePercentage}%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Analysis Method</span>
                                    <span className="font-semibold">AI Camera Detection</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Date Analyzed</span>
                                    <span className="font-semibold">
                                        {new Date(analysis.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    {recommended_products.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    🛍️ Perfect Matches for You
                                </h3>
                                <Button variant="outline" asChild>
                                    <Link href="/catalog">View All Products</Link>
                                </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommended_products.map((product) => (
                                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                            <span className="text-5xl">👓</span>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                                            {product.brand && (
                                                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                                            )}
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xl font-bold text-green-600">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                    Perfect Match
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mb-3">
                                                🏪 {product.optik_store.store_name}
                                                <br />
                                                📍 {product.optik_store.location}
                                            </div>
                                            <Button size="sm" className="w-full">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Next Steps */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">
                            🎯 What's Next?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-3xl mb-2">🛍️</div>
                                <h4 className="font-semibold text-green-700 mb-2">Shop Recommended Products</h4>
                                <p className="text-sm text-green-600 mb-3">
                                    Browse our curated selection of frames perfect for your face shape
                                </p>
                                <Button size="sm" asChild>
                                    <Link href="/catalog">Start Shopping</Link>
                                </Button>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-3xl mb-2">📅</div>
                                <h4 className="font-semibold text-green-700 mb-2">Get Professional Advice</h4>
                                <p className="text-sm text-green-600 mb-3">
                                    Book a home consultation with our certified optometrists
                                </p>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href="/book-appointment">Book Appointment</Link>
                                </Button>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-3xl mb-2">🔄</div>
                                <h4 className="font-semibold text-green-700 mb-2">Try Again</h4>
                                <p className="text-sm text-green-600 mb-3">
                                    Want to analyze your face shape again with better lighting?
                                </p>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href="/face-analysis">New Analysis</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                        <Button size="lg" asChild>
                            <Link href="/catalog">🛍️ Browse All Products</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/dashboard">← Back to Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </AppShell>
        </>
    );
}