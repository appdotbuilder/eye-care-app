<?php

namespace App\Http\Controllers;

use App\Models\OptikStore;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class OpticalStoreController extends Controller
{
    /**
     * Display the main optical store dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        $data = [];

        // Get data based on user role
        if ($user) {
            switch ($user->role) {
                case 'super_admin':
                    $data = [
                        'stats' => [
                            'total_stores' => OptikStore::count(),
                            'total_products' => Product::count(),
                            'total_customers' => User::where('role', 'customer')->count(),
                            'total_ros' => User::where('role', 'refraksi_optisi')->count(),
                        ],
                        'recent_stores' => OptikStore::with('user')->latest()->take(5)->get(),
                        'recent_products' => Product::with('optikStore')->latest()->take(5)->get(),
                    ];
                    break;

                case 'optik_store':
                    $store = $user->optikStore;
                    if ($store) {
                        $data = [
                            'store' => $store,
                            'stats' => [
                                'total_products' => $store->products()->count(),
                                'active_products' => $store->products()->where('status', 'active')->count(),
                                'total_orders' => $store->orders()->count(),
                                'pending_orders' => $store->orders()->where('status', 'pending')->count(),
                            ],
                            'recent_products' => $store->products()->latest()->take(5)->get(),
                            'recent_orders' => $store->orders()->with('customer')->latest()->take(5)->get(),
                        ];
                    }
                    break;

                case 'refraksi_optisi':
                    $data = [
                        'stats' => [
                            'total_appointments' => $user->roAppointments()->count(),
                            'pending_appointments' => $user->roAppointments()->where('status', 'pending')->count(),
                            'completed_appointments' => $user->roAppointments()->where('status', 'completed')->count(),
                            'total_prescriptions' => $user->roPrescriptions()->count(),
                        ],
                        'upcoming_appointments' => $user->roAppointments()->with('customer')
                            ->where('appointment_date', '>=', now())
                            ->orderBy('appointment_date')
                            ->take(5)->get(),
                        'recent_prescriptions' => $user->roPrescriptions()->with('customer')
                            ->latest()->take(5)->get(),
                    ];
                    break;

                case 'customer':
                    $data = [
                        'stats' => [
                            'total_orders' => $user->orders()->count(),
                            'pending_orders' => $user->orders()->where('status', 'pending')->count(),
                            'total_appointments' => $user->appointments()->count(),
                            'total_prescriptions' => $user->prescriptions()->count(),
                        ],
                        'recent_orders' => $user->orders()->with(['optikStore', 'orderItems.product'])
                            ->latest()->take(3)->get(),
                        'upcoming_appointments' => $user->appointments()->with('ro')
                            ->where('appointment_date', '>=', now())
                            ->orderBy('appointment_date')
                            ->take(3)->get(),
                        'latest_prescription' => $user->prescriptions()->with('ro')->latest()->first(),
                        'face_analysis' => $user->faceAnalyses()->latest()->first(),
                    ];
                    break;
            }
        } else {
            // Guest user - show public data
            $data = [
                'featured_stores' => OptikStore::with(['user', 'products' => function($query) {
                    $query->where('status', 'active')->take(3);
                }])->take(6)->get(),
                'featured_products' => Product::with('optikStore')
                    ->where('status', 'active')->inRandomOrder()->take(8)->get(),
                'stats' => [
                    'total_stores' => OptikStore::count(),
                    'total_products' => Product::where('status', 'active')->count(),
                ],
            ];
        }

        return Inertia::render('welcome', [
            'user_role' => $user?->role,
            'data' => $data,
        ]);
    }
}