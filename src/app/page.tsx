
import SearchForm from '@/components/SearchForm';
import { ShieldCheck, FileText, Lock } from 'lucide-react';

export const runtime = 'edge';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Australian Vehicle History Checks
            <span className="block text-blue-600 mt-2">Instantly.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
            Don't risk buying a lemon. Get a comprehensive PPSR report including finance, stolen status, and write-off history.
          </p>

          <SearchForm />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Official PPSR Data</h3>
              <p className="text-gray-500">
                Direct access to the Personal Property Securities Register and NEVDIS data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Report</h3>
              <p className="text-gray-500">
                Check for finance owing, stolen status, write-off history, and registration details.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Instant</h3>
              <p className="text-gray-500">
                Reports are generated instantly and delivered securely to your device.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
