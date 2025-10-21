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
      <div className="">
        <Navbar />
        <div className="h-screen flex flex-col items-center justify-center bg-white text-black px-6">
          <h1 className="text-5xl font-bold mb-4">Build Your Resume Effortlessly</h1>
          <p className="text-gray-600 mb-6 text-center max-w-xl">
            Choose a template and start customizing instantly. Showcase your projects, experience, and education in style.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 cursor-pointer rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#0F9A6B] transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
