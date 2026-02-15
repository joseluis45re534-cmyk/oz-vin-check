
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Loader2, Lock, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

function ReportContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const success = searchParams.get('success');
    const router = useRouter();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock Unlock State based on URL for demo
    const isUnlocked = success === 'true';

    useEffect(() => {
        // Simulate fetching report data
        setTimeout(() => {
            setData({
                make: 'TOYOTA',
                model: 'COROLLA',
                year: 2022,
                vin: 'VMOCK...' + id.slice(0, 5),
                is_locked: !isUnlocked,
                // Mock full data if unlocked
                finance_status: isUnlocked ? 'Clear' : 'LOCKED',
                stolen_status: isUnlocked ? 'Clear' : 'LOCKED',
                written_off_status: isUnlocked ? 'Clear' : 'LOCKED',
            });
            setLoading(false);
        }, 1000);
    }, [id, isUnlocked]);

    const handleBuy = async () => {
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reportId: id }),
            });
            const data = await res.json() as any;
            if (data.url) window.location.href = data.url;
            else alert('Failed to start checkout');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Checkout failed. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-8 py-6 text-white flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Vehicle Report</h1>
                        <p className="text-blue-100 text-sm">Report ID: {id}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${isUnlocked ? 'bg-green-500 text-white' : 'bg-blue-500/30'}`}>
                        {isUnlocked ? 'Full Report' : 'Preview Mode'}
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 space-y-8">
                    {/* Vehicle Identity */}
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                            <span className="font-bold text-xl">{data.year.toString().slice(-2)}</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{data.year} {data.make} {data.model}</h2>
                            <p className="text-gray-500">VIN: {data.vin}</p>
                        </div>
                    </div>

                    {/* PPSR Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Finance */}
                        <div className="relative group">
                            {!isUnlocked && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-4">
                                    <Lock className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="font-bold text-gray-900">Finance Status Hidden</span>
                                    <p className="text-sm text-gray-500 mb-3">Check if money is owing on this car.</p>
                                    <button onClick={handleBuy} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition">
                                        Unlock Full Report - $25
                                    </button>
                                </div>
                            )}
                            <div className={`bg-gray-50 p-6 rounded-xl border border-gray-200 ${!isUnlocked ? 'blur-sm select-none' : ''}`}>
                                <div className="flex items-center space-x-2 text-green-600 mb-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="font-bold">Finance: {data.finance_status}</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {isUnlocked ? 'No active finance interests found.' : 'Finance check details hidden.'}
                                </p>
                            </div>
                        </div>

                        {/* Written Off */}
                        <div className="relative group">
                            {!isUnlocked && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-4">
                                    <Lock className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="font-bold text-gray-900">Damage History Hidden</span>
                                    <p className="text-sm text-gray-500 mb-3">See if it's been written-off or repaired.</p>
                                    <button onClick={handleBuy} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition">
                                        Unlock Full Report - $25
                                    </button>
                                </div>
                            )}
                            <div className={`bg-gray-50 p-6 rounded-xl border border-gray-200 ${!isUnlocked ? 'blur-sm select-none' : ''}`}>
                                <div className="flex items-center space-x-2 text-green-600 mb-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="font-bold">WOVR: {data.written_off_status}</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {isUnlocked ? 'Vehicle has not been written-off.' : 'Write-off history details hidden.'}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Action Bar */}
                {!isUnlocked && (
                    <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-between items-center">
                        <p className="text-gray-500 text-sm">Full PPSR Certificate included.</p>
                        <button onClick={handleBuy} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 hover:scale-105 transition-all transform">
                            Unlock Full Report Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ReportPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportContent />
        </Suspense>
    );
}
