// app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

export default function Hero() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
        <h1 className="text-5xl font-bold mb-4">Build Your Resume Effortlessly</h1>
        <p className="text-gray-600 mb-6 text-center max-w-xl">
          Choose a template and start customizing instantly. Showcase your projects, experience, and education in style.
        </p>
        <button
          onClick={() => router.push("/templates")}
          className="px-6 py-3 cursor-pointer rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#0F9A6B] transition"
        >
          Get Started
        </button>
      </div>
    </>
  );
}
