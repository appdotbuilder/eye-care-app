<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OpticalStoreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FaceAnalysisController;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', [App\Http\Controllers\OpticalStoreController::class, 'index'])->name('home');

// Public routes
Route::get('/catalog', [ProductController::class, 'index'])->name('catalog');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [OpticalStoreController::class, 'index'])->name('dashboard');
    
    // Products
    Route::resource('products', ProductController::class)->only(['index', 'show']);
    
    // Appointments
    Route::resource('appointments', AppointmentController::class)->only(['create', 'store']);
    Route::get('/book-appointment', [AppointmentController::class, 'create'])->name('book-appointment');
    Route::post('/book-appointment', [AppointmentController::class, 'store'])->name('book-appointment.store');
    
    // Face Analysis
    Route::resource('face-analysis', FaceAnalysisController::class)->only(['create', 'store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
