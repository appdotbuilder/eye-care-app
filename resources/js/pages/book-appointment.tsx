import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface RO {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

interface Props {
    available_ros: RO[];
    [key: string]: unknown;
}

interface AppointmentForm {
    appointment_date: string;
    customer_address: string;
    notes: string;
    ro_id?: number;
    [key: string]: string | number | undefined;
}

export default function BookAppointment({ available_ros }: Props) {
    const { data, setData, post, processing, errors } = useForm<AppointmentForm>({
        appointment_date: '',
        customer_address: '',
        notes: '',
        ro_id: undefined,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('book-appointment.store'), {
            onSuccess: () => {
                // Form will redirect on success
            }
        });
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1); // Tomorrow
    const minDateTime = minDate.toISOString().slice(0, 16);

    return (
        <>
            <Head title="📅 Book Eye Examination Appointment" />
            
            <AppShell>
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            📅 Book Eye Examination Appointment
                        </h1>
                        <p className="text-gray-600">
                            Schedule a home visit with a certified Refraksi Optisi (RO) professional for comprehensive eye examination.
                        </p>
                    </div>

                    {/* Service Information */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-4">🏠 Home Eye Examination Service</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-green-700 mb-2">What's Included:</h4>
                                <ul className="space-y-1 text-sm text-green-700">
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Complete eye examination
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Vision testing (SPH, CYL, AXIS)
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Pupillary distance (PD) measurement
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Digital prescription record
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Professional consultation
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-green-700 mb-2">Service Details:</h4>
                                <ul className="space-y-1 text-sm text-green-700">
                                    <li>⏱️ Duration: 30-45 minutes</li>
                                    <li>💰 Service fee: $50-80 (varies by RO)</li>
                                    <li>🕐 Available: 9 AM - 6 PM</li>
                                    <li>📱 Instant digital results</li>
                                    <li>🔄 Follow-up support included</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">📋 Appointment Details</h3>
                        
                        {/* Date and Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📅 Preferred Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                min={minDateTime}
                                value={data.appointment_date}
                                onChange={(e) => setData('appointment_date', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.appointment_date && (
                                <p className="mt-1 text-sm text-red-600">{errors.appointment_date}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Please select a date at least 24 hours in advance
                            </p>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🏠 Your Address *
                            </label>
                            <textarea
                                rows={3}
                                value={data.customer_address}
                                onChange={(e) => setData('customer_address', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Please provide your complete address including landmarks for easy location..."
                                required
                            />
                            {errors.customer_address && (
                                <p className="mt-1 text-sm text-red-600">{errors.customer_address}</p>
                            )}
                        </div>

                        {/* RO Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                👨‍⚕️ Preferred Refraksi Optisi (Optional)
                            </label>
                            <select
                                value={data.ro_id || ''}
                                onChange={(e) => setData('ro_id', e.target.value ? parseInt(e.target.value) : undefined)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Auto-assign best available RO</option>
                                {available_ros.map((ro) => (
                                    <option key={ro.id} value={ro.id}>
                                        {ro.name} {ro.phone && `- ${ro.phone}`}
                                    </option>
                                ))}
                            </select>
                            {errors.ro_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.ro_id}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Leave blank to automatically assign the best available professional in your area
                            </p>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📝 Additional Notes (Optional)
                            </label>
                            <textarea
                                rows={4}
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Any specific requirements, health conditions, or preferences we should know about..."
                            />
                            {errors.notes && (
                                <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">📋 Terms & Conditions</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Appointments can be cancelled up to 2 hours before scheduled time</li>
                                <li>• Service fee is payable directly to the RO professional</li>
                                <li>• Prescription data will be digitally stored in your account</li>
                                <li>• Follow-up consultation is included within 7 days</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="flex space-x-4">
                            <Button 
                                type="submit" 
                                size="lg"
                                className="flex-1"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Booking...
                                    </>
                                ) : (
                                    '📅 Book Appointment'
                                )}
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="lg"
                                onClick={() => window.history.back()}
                            >
                                ← Back
                            </Button>
                        </div>
                    </form>

                    {/* FAQ */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">❓ Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-800">How long does the examination take?</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Typically 30-45 minutes, including consultation and all measurements.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">What equipment will the RO bring?</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    All necessary portable equipment including trial lens sets, PD ruler, and testing charts.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Can I reschedule my appointment?</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Yes, you can reschedule up to 2 hours before your appointment through your dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}