<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFaceAnalysisRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isCustomer();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'face_shape' => 'required|string|in:round,square,oval,heart,oblong',
            'confidence_score' => 'required|numeric|min:0|max:1',
            'image_path' => 'nullable|string',
            'analysis_data' => 'nullable|array',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'face_shape.required' => 'Face shape analysis result is required.',
            'face_shape.in' => 'Invalid face shape detected.',
            'confidence_score.required' => 'Analysis confidence score is required.',
            'confidence_score.numeric' => 'Confidence score must be a number.',
            'confidence_score.min' => 'Confidence score must be at least 0.',
            'confidence_score.max' => 'Confidence score cannot exceed 1.',
        ];
    }
}