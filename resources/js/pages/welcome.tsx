import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface Props {
    user_role?: string;
    data?: {
        stats?: Record<string, number>;
        store?: {
            store_name: string;
            location: string;
        };
        featured_stores?: Array<{
            id: number;
            store_name: string;
            location: string;
        }>;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export default function Welcome({ user_role, data = {} }: Props) {
    const isAuthenticated = !!user_role;

    return (
        <>
            <Head title="👓 OptiVision - Complete Optical Store Ecosystem" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {isAuthenticated ? (
                    <AppShell>
                        <AuthenticatedDashboard userRole={user_role} data={data} />
                    </AppShell>
                ) : (
                    <GuestWelcome />
                )}
            </div>
        </>
    );
}

function GuestWelcome() {
    return (
        <div className="relative">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl">👓</span>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                OptiVision
                            </h1>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🔬 Complete Optical Store 
                            <span className="block text-blue-600">Ecosystem Platform</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Connect optik stores, refraksi optisi professionals, and customers in one comprehensive platform. 
                            From AI-powered face analysis to prescription management and product ordering.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-lg px-8 py-4" asChild>
                                <Link href="/register">🚀 Start Your Journey</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                                <Link href="/catalog">🛍️ Browse Products</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Roles Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            👥 Four Distinct User Roles
                        </h2>
                        <p className="text-lg text-gray-600">Choose your role and unlock specialized features</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Super Admin */}
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                            <div className="text-center">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-semibold text-red-800 mb-3">Super Admin</h3>
                                <ul className="text-sm text-red-700 space-y-2 text-left">
                                    <li>✓ Manage all users & stores</li>
                                    <li>✓ Full CRUD operations</li>
                                    <li>✓ System analytics</li>
                                    <li>✓ Complete oversight</li>
                                </ul>
                            </div>
                        </div>

                        {/* Optik Store */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🏪</div>
                                <h3 className="text-xl font-semibold text-blue-800 mb-3">Optik Store</h3>
                                <ul className="text-sm text-blue-700 space-y-2 text-left">
                                    <li>✓ Store profile management</li>
                                    <li>✓ Product catalog upload</li>
                                    <li>✓ Order processing</li>
                                    <li>✓ Customer interactions</li>
                                </ul>
                            </div>
                        </div>

                        {/* Refraksi Optisi */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                            <div className="text-center">
                                <div className="text-4xl mb-4">👨‍⚕️</div>
                                <h3 className="text-xl font-semibold text-green-800 mb-3">Refraksi Optisi</h3>
                                <ul className="text-sm text-green-700 space-y-2 text-left">
                                    <li>✓ Home visit appointments</li>
                                    <li>✓ Eye examination</li>
                                    <li>✓ Prescription management</li>
                                    <li>✓ Professional services</li>
                                </ul>
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                            <div className="text-center">
                                <div className="text-4xl mb-4">👤</div>
                                <h3 className="text-xl font-semibold text-purple-800 mb-3">Customer</h3>
                                <ul className="text-sm text-purple-700 space-y-2 text-left">
                                    <li>✓ AI face shape analysis</li>
                                    <li>✓ Frame recommendations</li>
                                    <li>✓ Online ordering</li>
                                    <li>✓ Home eye checkups</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🌟 Revolutionary Features
                        </h2>
                        <p className="text-lg text-gray-600">Advanced technology meets optical care</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                            <div className="text-5xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Face Analysis</h3>
                            <p className="text-gray-600">
                                Advanced facial recognition technology analyzes your face shape and 
                                provides personalized frame recommendations using your device camera.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                            <div className="text-5xl mb-4">🏠</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Home Eye Exams</h3>
                            <p className="text-gray-600">
                                Book professional refraksi optisi services at your home. 
                                Get comprehensive eye examinations without leaving your comfort zone.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                            <div className="text-5xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Prescriptions</h3>
                            <p className="text-gray-600">
                                Complete lens prescription management with SPH, CYL, AXIS, ADD, 
                                and PD values stored securely for easy ordering.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to Transform Your Optical Experience?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of satisfied customers, stores, and professionals
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                            <Link href="/register">👓 Join as Customer</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600" asChild>
                            <Link href="/register">🏪 Register Your Store</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <span className="text-2xl">👓</span>
                            <span className="text-xl font-semibold">OptiVision</span>
                        </div>
                        <p className="text-gray-400">
                            Complete optical store ecosystem platform - Connecting vision care professionals and customers
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function AuthenticatedDashboard({ userRole, data }: { userRole: string; data: Props['data'] }) {
    const roleConfig = {
        super_admin: {
            title: "⚡ Super Admin Dashboard",
            color: "red"
        },
        optik_store: {
            title: "🏪 Store Management",
            color: "blue"
        },
        refraksi_optisi: {
            title: "👨‍⚕️ RO Professional Dashboard",
            color: "green"
        },
        customer: {
            title: "👤 Customer Portal",
            color: "purple"
        }
    };

    const config = roleConfig[userRole as keyof typeof roleConfig] || { title: "Dashboard", color: "gray" };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h1>
                <p className="text-gray-600">
                    Welcome back! Here's what's happening in your optical ecosystem.
                </p>
            </div>

            {/* Stats Cards */}
            {data?.stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(data.stats).map(([key, value]) => (
                        <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="text-2xl font-bold text-gray-900">{value as number}</div>
                            <div className="text-sm text-gray-600 capitalize">
                                {key.replace(/_/g, ' ')}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Role-specific content */}
            {userRole === 'customer' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Features</h3>
                        <div className="space-y-3">
                            <Button className="w-full" asChild>
                                <Link href="/face-analysis">📸 Analyze Face Shape</Link>
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/catalog">🛍️ Browse Catalog</Link>
                            </Button>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🏠 Services</h3>
                        <div className="space-y-3">
                            <Button className="w-full" asChild>
                                <Link href="/book-appointment">📅 Book Eye Exam</Link>
                            </Button>
                            <Button variant="outline" className="w-full">
                                📋 View Prescriptions
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {userRole === 'optik_store' && data?.store && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        🏪 {data?.store?.store_name}
                    </h3>
                    <p className="text-gray-600 mb-4">{data?.store?.location}</p>
                    <div className="flex space-x-4">
                        <Button>📦 Manage Products</Button>
                        <Button variant="outline">📋 View Orders</Button>
                        <Button variant="outline">⚙️ Store Settings</Button>
                    </div>
                </div>
            )}

            {userRole === 'refraksi_optisi' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">👨‍⚕️ Professional Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button className="w-full">📅 View Appointments</Button>
                        <Button variant="outline" className="w-full">📋 Manage Prescriptions</Button>
                        <Button variant="outline" className="w-full">⚙️ Profile Settings</Button>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" size="sm">📊 Analytics</Button>
                    <Button variant="outline" size="sm">💬 Support</Button>
                    <Button variant="outline" size="sm">🔧 Settings</Button>
                    <Button variant="outline" size="sm">❓ Help</Button>
                </div>
            </div>
        </div>
    );
}