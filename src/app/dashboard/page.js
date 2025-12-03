'use client';
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">logged in</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 transition"
      >
        Log out
      </button>
    </div>
  );
}



