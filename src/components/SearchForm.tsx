
'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { validateVIN, validatePlate } from '@/lib/validation';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Determine if input is VIN or Plate
        const isVin = input.length > 8; // Crude heuristic, but effective for now
        let validation;

        if (isVin) {
            validation = validateVIN(input);
        } else {
            validation = validatePlate(input);
        }

        if (!validation.isValid) {
            setError(validation.error || 'Invalid input');
            setLoading(false);
            return;
        }

        // Identify if it's a VIN or Plate for the API
        try {
            const response = await fetch('/api/check-vin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vin: isVin ? input : undefined, plate: isVin ? undefined : input }),
            });

            const data = await response.json() as any;

            if (data.success && data.reportId) {
                // Redirect to the report page
                router.push(`/report/${data.reportId}`);
            } else {
                setError(data.error || 'Failed to fetch report');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Enter VIN or Registration Plate"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 shadow-sm transition-colors pr-12 uppercase"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
            </form>
            {error && (
                <p className="mt-3 text-red-500 text-sm font-medium text-center animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
            <p className="mt-4 text-center text-sm text-gray-500">
                Checks PPSR, Stolen Status, Written-off & Finance
            </p>
        </div>
    );
}
