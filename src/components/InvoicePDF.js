"use client";
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles (CSS for PDF)
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 5, paddingTop: 5 },
  description: { width: '50%' },
  qty: { width: '15%', textAlign: 'center' },
  rate: { width: '15%', textAlign: 'right' },
  amount: { width: '20%', textAlign: 'right' },
  total: { marginTop: 20, textAlign: 'right', fontSize: 18, fontWeight: 'bold' },
});

// This is the actual PDF Document component
export const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>INVOICE</Text>
          <Text>Invoice #: {data.invoiceNumber}</Text>
          <Text>Date: {data.date}</Text>
        </View>
      </View>

      {/* Addresses */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ width: '50%' }}>
          <Text style={{ fontWeight: 'bold' }}>From:</Text>
          <Text>{data.myName}</Text>
          <Text>{data.myEmail}</Text>
        </View>
        <View style={{ width: '50%' }}>
          <Text style={{ fontWeight: 'bold' }}>To:</Text>
          <Text>{data.clientName}</Text>
          <Text>{data.clientAddress}</Text>
        </View>
      </View>

      {/* Table Header */}
      <View style={[styles.row, { borderBottomWidth: 2, borderBottomColor: '#000', fontWeight: 'bold' }]}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.rate}>Rate</Text>
        <Text style={styles.amount}>Amount</Text>
      </View>

      {/* Table Rows (Looping through items) */}
      {data.items.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.qty}>{item.qty}</Text>
          <Text style={styles.rate}>${item.rate}</Text>
          <Text style={styles.amount}>${(item.qty * item.rate).toFixed(2)}</Text>
        </View>
      ))}

      {/* Total */}
      <Text style={styles.total}>
        Total: ${data.items.reduce((sum, item) => sum + (item.qty * item.rate), 0).toFixed(2)}
      </Text>
    </Page>
  </Document>
);