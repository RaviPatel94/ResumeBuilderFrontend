"use client"
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/templates");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 pt-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700">Professional Resume Builder</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Resume
            <span className="block text-[#10B981] mt-2">Effortlessly</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Choose from professional templates and start customizing instantly. 
            Showcase your projects, experience, and education with style and confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#0F9A6B] active:bg-[#0D8A5C] transition shadow-lg hover:shadow-xl cursor-pointer"
            >
              Get Started Free
            </button>
            <button
              onClick={() => router.push("/templates")}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition cursor-pointer"
            >
              View Templates
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Templates</h3>
              <p className="text-sm text-gray-600">Choose from classic, modern, and creative designs</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Customization</h3>
              <p className="text-sm text-gray-600">Edit content and styling with a simple interface</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Export as PDF</h3>
              <p className="text-sm text-gray-600">Download your resume ready for job applications</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-24 mb-8 text-center">
          <p className="text-sm text-gray-500">
            Trusted by professionals worldwide
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
            </div>
            <span className="text-sm font-medium text-gray-600 ml-2">Join 1000+ users</span>
          </div>
        </div>
      </div>
    </>
  );
}