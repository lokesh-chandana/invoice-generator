"use client";
import { useState } from 'react';
import dynamic from "next/dynamic";
import { InvoicePDF } from '@/components/InvoicePDF';
import Header from '@/components/Header';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Dynamic import for PDF Viewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full text-gray-400">
        Loading Preview...
      </div>
    ),
  }
);

export default function PageHome() {
  const [data, setData] = useState({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().slice(0, 10),
    myName: 'TechSorc Inc.',
    myEmail: 'billing@techsorc.in',
    clientName: 'Client Company',
    clientAddress: '123 Business Road, NY',
    items: [
      { description: 'Web Development Services', qty: 1, rate: 1200 },
      { description: 'Server Maintenance', qty: 1, rate: 300 },
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData((prev) => ({ ...prev, items: newItems }));
  };

  const handleDownload = async () => {
    try {
      // 1. Ask API if user is allowed
      const response = await fetch('/api/check-limit', { method: 'POST' });
      const result = await response.json();

      if (response.status === 401) {
        alert("Please Sign In to download invoices!");
        return;
      }

      if (!result.allowed) {
        alert(result.message); // Show "Upgrade" popup
        return;
      }

      // 2. If allowed, generate and download
      const blob = await pdf(<InvoicePDF data={data} />).toBlob();
      saveAs(blob, `Invoice-${data.invoiceNumber}.pdf`);
      
      alert(`Success! You have used ${result.newCount}/10 invoices.`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />

      {/* Main Content Area (Split Screen) */}
      <main className="flex-grow flex pt-16 h-screen">
        
        {/* LEFT SIDE: Editor */}
        <div className="w-1/2 h-full overflow-y-auto border-r border-gray-200 bg-white shadow-sm z-10">
          <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
              <span className="text-blue-600">#</span> Invoice Details
            </h2>

            <div className="space-y-6">
              {/* Top Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-gray-500 font-bold mb-2">Invoice #</label>
                  <input type="text" name="invoiceNumber" value={data.invoiceNumber} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-gray-500 font-bold mb-2">Date</label>
                  <input type="date" name="date" value={data.date} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                </div>
              </div>

              {/* People Details */}
              <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-gray-500 font-bold mb-2">From (You)</label>
                  <input type="text" name="myName" placeholder="Your Company" value={data.myName} onChange={handleChange} className="w-full mb-2 bg-white border border-gray-300 text-gray-900 text-sm rounded block p-2" />
                  <input type="email" name="myEmail" placeholder="Your Email" value={data.myEmail} onChange={handleChange} className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded block p-2" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-gray-500 font-bold mb-2">To (Client)</label>
                  <input type="text" name="clientName" placeholder="Client Name" value={data.clientName} onChange={handleChange} className="w-full mb-2 bg-white border border-gray-300 text-gray-900 text-sm rounded block p-2" />
                  <input type="text" name="clientAddress" placeholder="Client Address" value={data.clientAddress} onChange={handleChange} className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded block p-2" />
                </div>
              </div>

              {/* Items Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs uppercase tracking-wide text-gray-500 font-bold">Line Items</label>
                  <button 
                    onClick={() => setData(prev => ({...prev, items: [...prev.items, { description: '', qty: 1, rate: 0 }] }))}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase"
                  >
                    + Add Item
                  </button>
                </div>
                
                <div className="space-y-3">
                  {data.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-center group">
                      <div className="flex-grow">
                        <input 
                          type="text" 
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                        />
                      </div>
                      <div className="w-20">
                        <input 
                          type="number" 
                          placeholder="Qty"
                          value={item.qty}
                          onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))}
                          className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center" 
                        />
                      </div>
                      <div className="w-24">
                        <input 
                          type="number" 
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                          className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-right" 
                        />
                      </div>
                      <button 
                         onClick={() => {
                           const newItems = data.items.filter((_, i) => i !== index);
                           setData(prev => ({...prev, items: newItems}));
                         }}
                         className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                         title="Remove Item"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="h-20"></div> {/* Spacer for scrolling */}
          </div>
        </div>

        {/* RIGHT SIDE: Preview */}
        <div className="w-1/2 h-full bg-gray-800 p-8 flex flex-col items-center justify-center relative">
           {/* Floating Action Bar */}
           <div className="absolute top-6 right-6 z-20 bg-white p-2 rounded-lg shadow-xl flex gap-3">
             <button 
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-6 rounded-md shadow-sm transition-all flex items-center gap-2"
              >
                <span>Download PDF</span>
              </button>
           </div>

           {/* PDF Canvas */}
           <div className="w-full max-w-[600px] aspect-[1/1.414] bg-white shadow-2xl rounded-sm overflow-hidden">
              <PDFViewer className="w-full h-full border-none" showToolbar={false}>
                <InvoicePDF data={data} />
              </PDFViewer>
           </div>
        </div>

      </main>
    </div>
  );
}