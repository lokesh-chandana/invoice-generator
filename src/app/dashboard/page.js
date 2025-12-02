// https://invoiceninja.com/ Inspired from this website
"use client";
import { useState } from 'react';
import dynamic from "next/dynamic";
import { InvoicePDF } from '@/components/InvoicePDF';

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading PDF...</p>,
  }
);

export default function Dashboard() {
  // 1. STATE: This holds all your invoice data
  const [data, setData] = useState({
    invoiceNumber: '001',
    date: new Date().toISOString().slice(0, 10),
    myName: 'My Freelance Biz',
    myEmail: 'me@example.com',
    clientName: 'Client Co',
    clientAddress: '123 Business Rd',
    items: [
      { description: 'Website Design', qty: 1, rate: 500 },
      { description: 'Hosting (1 Year)', qty: 1, rate: 100 },
    ]
  });

  // Helper to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to update specific items in the array
  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData((prev) => ({ ...prev, items: newItems }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* LEFT SIDE: The Form */}
      <div className="w-1/2 p-8 overflow-y-auto border-r border-gray-300 bg-white">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Invoice</h1>
        
        <div className="space-y-4">
          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Invoice #</label>
              <input type="text" name="invoiceNumber" value={data.invoiceNumber} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" name="date" value={data.date} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
          </div>

          <hr className="my-4"/>

          {/* Your Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input type="text" name="myName" value={data.myName} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          {/* Client Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input type="text" name="clientName" value={data.clientName} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <hr className="my-4"/>
          
          {/* Items List */}
          <h3 className="font-bold">Items</h3>
          {data.items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-end">
              <div className="flex-grow">
                <input 
                  type="text" 
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="w-full p-2 border rounded" 
                />
              </div>
              <div className="w-16">
                <input 
                  type="number" 
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))}
                  className="w-full p-2 border rounded text-center" 
                />
              </div>
              <div className="w-20">
                <input 
                  type="number" 
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                  className="w-full p-2 border rounded text-right" 
                />
              </div>
            </div>
          ))}
          <button 
            onClick={() => setData(prev => ({...prev, items: [...prev.items, { description: '', qty: 1, rate: 0 }] }))}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: The Preview */}
      <div className="w-1/2 bg-gray-500 h-full p-4">
        <PDFViewer className="w-full h-full rounded shadow-lg">
          <InvoicePDF data={data} />
        </PDFViewer>
      </div>
    </div>
  );
}