


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_BILL } from "../Redux/Constants";
import "../stylesheets/BillList.css";
import { CiFolderOn } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function BillList() {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    dispatch({ type: DELETE_BILL, payload: id });
    setDeleteConfirm(null);
  };

  const handlePrint = (bill) => {
    const printWindow = window.open("", "", "height=700,width=900");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${bill.patientName}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; }
            .print-card { border: 2px solid #f1f5f9; padding: 40px; border-radius: 20px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #6366f1; padding-bottom: 20px; }
            .hospital-name { color: #6366f1; font-size: 24px; font-weight: 800; }
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 40px 0; }
            table { width: 100%; border-collapse: collapse; }
            th { text-align: left; background: #f8fafc; padding: 15px; font-size: 12px; text-transform: uppercase; color: #64748b; }
            td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .total-row { margin-top: 30px; padding-top: 20px; border-top: 2px solid #1e293b; text-align: right; }
            .grand-total { font-size: 22px; font-weight: 800; color: #6366f1; }
            .footer { text-align: center; margin-top: 60px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="print-card">
            <div class="header">
              <div class="hospital-name">LIFECARE MEDICAL</div>
              <div style="text-align: right"><strong>INVOICE</strong><br>#${bill.id.toString().slice(-6)}</div>
            </div>
            <div class="details">
              <div>
                <small style="color: #64748b">BILLED TO:</small><br>
                <strong>${bill.patientName}</strong><br>
                Patient ID: P-${bill.patientId || 'NA'}
              </div>
              <div style="text-align: right">
                <small style="color: #64748b">CONSULTANT:</small><br>
                <strong>Dr. ${bill.doctorName}</strong><br>
                Date: ${bill.date}
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Service Description</th>
                  <th style="text-align: right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Medical Consultation Fee</td>
                  <td style="text-align: right">₹${bill.doctorFee}</td>
                </tr>
                ${bill.medicines.map(m => `
                  <tr>
                    <td>${m.name} (Pharmacy)</td>
                    <td style="text-align: right">₹${m.price}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total-row">
              <span style="color: #64748b">Amount Payable:</span><br>
              <span class="grand-total">₹${bill.totalAmount}</span>
            </div>
            <div class="footer">
              Thank you for choosing Lifecare. Get well soon!<br>
              This is a digital receipt and doesn't require a physical signature.
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const totalRevenue = bills.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="billing-page">
      <div className="billing-header-main">
        <div className="header-titles">
          <h2>Billing History</h2>
          <p>You have generated <b>{bills.length}</b> invoices this month.</p>
        </div>
        <div className="stats-mini">
          <div className="revenue-label">TOTAL REVENUE</div>
          <span className="revenue-amt">₹{totalRevenue.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {bills.length === 0 ? (
        <div className="no-bills-container">
          <div className="empty-state-icon"><CiFolderOn /></div>
          <h3>No Billing Records</h3>
          <p>Complete an appointment and generate a bill to see records here.</p>
        </div>
      ) : (
        <div className="bills-grid-v2">
          {bills.map((bill) => (
            <div key={bill.id} className="invoice-card-v2">
              <div className="invoice-top">
                <span className="inv-badge">COMPLETED</span>
                <span className="inv-id">REF: #{bill.id.toString().slice(-6)}</span>
              </div>

              <div className="invoice-main">
                <div className="inv-row">
                  <label>PATIENT NAME</label>
                  <p>{bill.patientName}</p>
                </div>
                <div className="inv-row text-right">
                  <label>ISSUED ON</label>
                  <p>{bill.date}</p>
                </div>
              </div>

              <div className="inv-details-box">
                <div className="inv-line">
                  <span>Consultation (Dr. {bill.doctorName.split(' ')[0]})</span>
                  <span className="price-bold">₹{bill.doctorFee}</span>
                </div>
                {bill.medicines?.length > 0 && (
                  <div className="inv-line">
                    <span>Pharmacy Charges</span>
                    <span className="price-bold">₹{bill.medicines.reduce((s, m) => s + m.price, 0)}</span>
                  </div>
                )}
                <div className="inv-total-line">
                  <span className="total-text">Total Paid</span>
                  <span className="total-val">₹{bill.totalAmount}</span>
                </div>
              </div>

              <div className="invoice-footer-v2">
                {deleteConfirm === bill.id ? (
                  <div className="confirm-delete-ui">
                    <span className="warn-text">Confirm Delete?</span>
                    <button className="yes-btn" onClick={() => handleDelete(bill.id)}>Confirm</button>
                    <button className="no-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <button className="print-action-btn" onClick={() => handlePrint(bill)}>
                      View & Print Receipt
                    </button>
                    <button className="delete-action-btn-v2" onClick={() => setDeleteConfirm(bill.id)}>
                      <span className="trash-icon"><MdDelete /></span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}