<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\FaceAnalysis
 *
 * @property int $id
 * @property int $customer_id
 * @property string $face_shape
 * @property array|null $analysis_data
 * @property array|null $recommended_frames
 * @property string|null $image_path
 * @property float|null $confidence_score
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $customer
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis query()
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereFaceShape($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereAnalysisData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereRecommendedFrames($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereConfidenceScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaceAnalysis whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class FaceAnalysis extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'face_shape',
        'analysis_data',
        'recommended_frames',
        'image_path',
        'confidence_score',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'analysis_data' => 'array',
        'recommended_frames' => 'array',
        'confidence_score' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the customer that owns the face analysis.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Get frame recommendations based on face shape.
     */
    public function getFrameRecommendations(): array
    {
        $recommendations = [
            'round' => ['square', 'rectangular', 'angular'],
            'square' => ['round', 'oval', 'aviator'],
            'oval' => ['any', 'square', 'round', 'cat-eye'],
            'heart' => ['aviator', 'round', 'oval'],
            'oblong' => ['oversized', 'square', 'cat-eye'],
        ];

        return $recommendations[$this->face_shape] ?? ['any'];
    }
}