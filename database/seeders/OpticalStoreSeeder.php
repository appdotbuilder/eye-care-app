<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\OptikStore;
use App\Models\Product;
use App\Models\Appointment;
use App\Models\Prescription;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\FaceAnalysis;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OpticalStoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@optivision.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'phone' => '+1234567890',
            'address' => '123 Admin Street, Tech City',
        ]);

        // Create Optik Store Users and Stores
        $optikStores = [
            [
                'name' => 'Vision Pro Optical',
                'email' => 'store1@optivision.com',
                'location' => 'Jakarta Pusat',
                'store_name' => 'Vision Pro Optical Jakarta',
                'description' => 'Premium optical store with latest fashion frames and advanced lens technology.',
            ],
            [
                'name' => 'Crystal Clear Optik',
                'email' => 'store2@optivision.com',
                'location' => 'Bandung',
                'store_name' => 'Crystal Clear Optik Bandung',
                'description' => 'Affordable quality eyewear for the whole family.',
            ],
            [
                'name' => 'Modern Eyes Center',
                'email' => 'store3@optivision.com',
                'location' => 'Surabaya',
                'store_name' => 'Modern Eyes Center Surabaya',
                'description' => 'Specialized in designer frames and high-index lenses.',
            ],
        ];

        foreach ($optikStores as $storeData) {
            $user = User::create([
                'name' => $storeData['name'],
                'email' => $storeData['email'],
                'password' => Hash::make('password'),
                'role' => 'optik_store',
                'phone' => '+621234567' . random_int(100, 999),
                'address' => 'Store Address in ' . $storeData['location'],
            ]);

            $store = OptikStore::create([
                'user_id' => $user->id,
                'store_name' => $storeData['store_name'],
                'description' => $storeData['description'],
                'location' => $storeData['location'],
                'license_number' => 'OPT' . random_int(100000, 999999),
                'operating_hours' => [
                    'monday' => '09:00-18:00',
                    'tuesday' => '09:00-18:00',
                    'wednesday' => '09:00-18:00',
                    'thursday' => '09:00-18:00',
                    'friday' => '09:00-18:00',
                    'saturday' => '09:00-16:00',
                    'sunday' => 'closed',
                ],
            ]);

            // Create products for each store
            $this->createProductsForStore($store);
        }

        // Create Refraksi Optisi users
        $roUsers = [
            [
                'name' => 'Dr. Ahmad Refraksi',
                'email' => 'ro1@optivision.com',
                'phone' => '+628123456789',
                'address' => 'Jakarta Area',
            ],
            [
                'name' => 'Dr. Siti Optometri',
                'email' => 'ro2@optivision.com',
                'phone' => '+628234567890',
                'address' => 'Bandung Area',
            ],
            [
                'name' => 'Dr. Budi Visioncare',
                'email' => 'ro3@optivision.com',
                'phone' => '+628345678901',
                'address' => 'Surabaya Area',
            ],
        ];

        foreach ($roUsers as $roData) {
            User::create([
                'name' => $roData['name'],
                'email' => $roData['email'],
                'password' => Hash::make('password'),
                'role' => 'refraksi_optisi',
                'phone' => $roData['phone'],
                'address' => $roData['address'],
            ]);
        }

        // Create Customer users
        $customers = [
            [
                'name' => 'John Customer',
                'email' => 'customer1@optivision.com',
                'phone' => '+628456789012',
                'address' => '123 Customer Street, Jakarta',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'customer2@optivision.com',
                'phone' => '+628567890123',
                'address' => '456 Vision Avenue, Bandung',
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'customer3@optivision.com',
                'phone' => '+628678901234',
                'address' => '789 Eye Care Road, Surabaya',
            ],
        ];

        foreach ($customers as $customerData) {
            $customer = User::create([
                'name' => $customerData['name'],
                'email' => $customerData['email'],
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => $customerData['phone'],
                'address' => $customerData['address'],
            ]);

            // Create sample face analysis
            FaceAnalysis::create([
                'customer_id' => $customer->id,
                'face_shape' => ['round', 'square', 'oval', 'heart', 'oblong'][random_int(0, 4)],
                'confidence_score' => 0.75 + (random_int(0, 20) / 100),
                'analysis_data' => [
                    'analyzed_at' => now()->toISOString(),
                    'method' => 'ai_camera_detection',
                ],
            ]);
        }

        // Create sample appointments
        $this->createSampleAppointments();

        // Create sample prescriptions
        $this->createSamplePrescriptions();
    }

    public function createProductsForStore(OptikStore $store): void
    {
        $glassesProducts = [
            [
                'name' => 'Classic Aviator Frames',
                'description' => 'Timeless aviator style frames with metal construction',
                'type' => 'glasses',
                'price' => 150.00,
                'brand' => 'AeroVision',
                'specifications' => [
                    'frame_shape' => ['aviator', 'round'],
                    'material' => 'metal',
                    'color' => 'gold',
                    'size' => 'medium',
                ],
            ],
            [
                'name' => 'Modern Rectangle Glasses',
                'description' => 'Contemporary rectangular frames perfect for office wear',
                'type' => 'glasses',
                'price' => 120.00,
                'brand' => 'OfficeVision',
                'specifications' => [
                    'frame_shape' => ['rectangular', 'square'],
                    'material' => 'acetate',
                    'color' => 'black',
                    'size' => 'large',
                ],
            ],
            [
                'name' => 'Cat Eye Fashion Frames',
                'description' => 'Stylish cat-eye frames for a bold look',
                'type' => 'glasses',
                'price' => 180.00,
                'brand' => 'FashionOptik',
                'specifications' => [
                    'frame_shape' => ['cat-eye'],
                    'material' => 'acetate',
                    'color' => 'tortoise',
                    'size' => 'medium',
                ],
            ],
        ];

        $lensProducts = [
            [
                'name' => 'High Index Progressive Lenses',
                'description' => 'Ultra-thin progressive lenses with anti-reflective coating',
                'type' => 'lenses',
                'price' => 250.00,
                'brand' => 'TechLens Pro',
                'specifications' => [
                    'index' => 1.67,
                    'type' => 'progressive',
                    'coating' => ['anti-reflective', 'scratch-resistant', 'UV-protection'],
                ],
            ],
            [
                'name' => 'Blue Light Blocking Lenses',
                'description' => 'Computer glasses lenses that filter harmful blue light',
                'type' => 'lenses',
                'price' => 90.00,
                'brand' => 'DigitalShield',
                'specifications' => [
                    'index' => 1.50,
                    'type' => 'single-vision',
                    'coating' => ['blue-light-filter', 'anti-reflective'],
                ],
            ],
        ];

        $allProducts = array_merge($glassesProducts, $lensProducts);

        foreach ($allProducts as $productData) {
            Product::create([
                'optik_store_id' => $store->id,
                'name' => $productData['name'],
                'description' => $productData['description'],
                'type' => $productData['type'],
                'price' => $productData['price'],
                'brand' => $productData['brand'],
                'specifications' => $productData['specifications'],
                'images' => [],
                'stock' => random_int(5, 50),
                'status' => 'active',
            ]);
        }
    }

    public function createSampleAppointments(): void
    {
        $customers = User::where('role', 'customer')->get();
        $ros = User::where('role', 'refraksi_optisi')->get();

        foreach ($customers as $customer) {
            Appointment::create([
                'customer_id' => $customer->id,
                'ro_id' => $ros->random()->id,
                'appointment_date' => now()->addDays(random_int(1, 7))->addHours(random_int(9, 16)),
                'customer_address' => $customer->address,
                'notes' => 'Regular eye examination needed',
                'status' => ['pending', 'confirmed'][random_int(0, 1)],
                'service_fee' => 50.00 + (random_int(0, 30)),
            ]);
        }
    }

    public function createSamplePrescriptions(): void
    {
        $customers = User::where('role', 'customer')->get();
        $ros = User::where('role', 'refraksi_optisi')->get();

        foreach ($customers as $customer) {
            Prescription::create([
                'customer_id' => $customer->id,
                'ro_id' => $ros->random()->id,
                'sph_right' => -2.50 + (random_int(0, 500) / 100),
                'sph_left' => -2.50 + (random_int(0, 500) / 100),
                'cyl_right' => -1.00 + (random_int(0, 200) / 100),
                'cyl_left' => -1.00 + (random_int(0, 200) / 100),
                'axis_right' => random_int(0, 180),
                'axis_left' => random_int(0, 180),
                'add_power' => random_int(0, 300) / 100,
                'pd' => 58.0 + (random_int(0, 80) / 10),
                'notes' => 'Patient shows mild myopia with astigmatism',
                'examination_date' => now()->subDays(random_int(1, 30)),
            ]);
        }
    }
}