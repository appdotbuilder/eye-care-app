<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
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
            'appointment_date' => 'required|date|after:now',
            'customer_address' => 'required|string|max:1000',
            'notes' => 'nullable|string|max:1000',
            'ro_id' => 'nullable|exists:users,id',
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
            'appointment_date.required' => 'Please select an appointment date and time.',
            'appointment_date.after' => 'Appointment date must be in the future.',
            'customer_address.required' => 'Your address is required for home visit.',
            'customer_address.max' => 'Address cannot exceed 1000 characters.',
            'ro_id.exists' => 'Selected Refraksi Optisi is not available.',
        ];
    }
}