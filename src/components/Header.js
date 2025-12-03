"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm fixed w-full top-0 z-50">
      {/* Brand Name */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white font-bold text-xl p-1 rounded-md w-8 h-8 flex items-center justify-center">
          i
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          invoice<span className="text-blue-600">SORC</span>
        </span>
      </div>

      {/* Right Side: Auth Buttons */}
      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden md:block">
              {session.user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}