<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreFaceAnalysisRequest;
use Inertia\Inertia;

class FaceAnalysisController extends Controller
{
    /**
     * Show the face analysis form.
     */
    public function create()
    {
        return Inertia::render('face-analysis', [
            'previous_analyses' => auth()->user()->faceAnalyses()->latest()->take(5)->get(),
        ]);
    }

    /**
     * Store face analysis result.
     */
    public function store(StoreFaceAnalysisRequest $request)
    {
        // For now, we'll simulate AI analysis
        $faceAnalysis = auth()->user()->faceAnalyses()->create([
            'face_shape' => $request->validated()['face_shape'],
            'confidence_score' => $request->validated()['confidence_score'],
            'image_path' => $request->validated()['image_path'],
            'analysis_data' => [
                'analyzed_at' => now()->toISOString(),
                'method' => 'ai_camera_detection',
            ],
        ]);

        $recommendations = ['round', 'square', 'oval']; // Placeholder recommendations

        return Inertia::render('face-analysis-results', [
            'analysis' => $faceAnalysis,
            'recommendations' => $recommendations,
            'recommended_products' => Product::where('status', 'active')
                ->with('optikStore')
                ->take(6)->get(),
        ]);
    }
}