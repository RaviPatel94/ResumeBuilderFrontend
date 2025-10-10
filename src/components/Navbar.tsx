// components/Navbar.tsx
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-black">ResumeBuilder</div>
      <div className="flex space-x-6">
        <Link href="/" className="text-black hover:text-[#10B981] transition">Home</Link>
        <Link href="/templates" className="text-black hover:text-[#10B981] transition">Templates</Link>
      </div>
    </nav>
  );
}
