"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { logoutUser } from '@/store/userSlice';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, email } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  return (
    <nav className="w-full absolute top-0 z-[100] bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-black">ResumeBuilder</div>
      <div className="flex space-x-6 items-center">
        <Link href="/" className="text-black hover:text-[#10B981] transition">Home</Link>
        <Link href="/templates" className="text-black hover:text-[#10B981] transition">Templates</Link>
        
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#0F9A6B] transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
