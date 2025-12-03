"use client";
import { useState } from 'react';
import dynamic from "next/dynamic";
import { InvoicePDF } from '@/components/InvoicePDF';
import Header from '@/components/Header';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { signIn, signOut, useSession } from "next-auth/react";

export default function PageHome() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      
      {/* Main Content Placeholder */}
      <main className="pt-30 px-8">
        <div className="max-w-5xl mx-auto text-center mt-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Make it easy for clients to pay you.
          </h1>
          <p className="text-gray-500 pt-4">Create professional invoices in seconds.</p>
          <button onClick={() => signIn("google")} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 mt-4 rounded-full text-sm font-semibold transition-all shadow-md shadow-purple-200">Get Started</button>
        </div>
      </main>
    </div>
  );
}