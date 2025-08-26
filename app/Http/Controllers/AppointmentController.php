<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use App\Http\Requests\StoreAppointmentRequest;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Show the form for creating a new appointment.
     */
    public function create()
    {
        $availableROs = User::where('role', 'refraksi_optisi')->get();
        
        return Inertia::render('book-appointment', [
            'available_ros' => $availableROs,
        ]);
    }

    /**
     * Store a newly created appointment.
     */
    public function store(StoreAppointmentRequest $request)
    {
        $appointment = Appointment::create([
            'customer_id' => auth()->id(),
            'ro_id' => $request->validated()['ro_id'],
            'appointment_date' => $request->validated()['appointment_date'],
            'customer_address' => $request->validated()['customer_address'],
            'notes' => $request->validated()['notes'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Appointment booked successfully!');
    }
}