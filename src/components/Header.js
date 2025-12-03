"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-8 shadow-sm fixed w-full top-0 z-50">
      {/* Brand Name */}
      <div className="flex items-center gap-2">
        {/* Purple Icon Box */}
        <div className="bg-purple-600 text-white font-bold text-xl p-1 rounded-lg w-8 h-8 flex items-center justify-center shadow-md shadow-purple-200">
          i
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          Invoice<span className="text-purple-600">SORC</span>
        </span>
      </div>

      {/* Right Side: Auth Buttons */}
      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden md:block font-medium">
              {session.user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-md shadow-purple-200"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}