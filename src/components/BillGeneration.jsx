




import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_APPOINTMENT, ADD_BILL } from "../Redux/Constants";
import "../stylesheets/BillGeneration.css";

export default function BillGeneration({ appointment, onClose }) {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);
  const doctors = useSelector((state) => state.doctors);
  const patients = useSelector((state) => state.patients);
  
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const doctor = doctors.find((d) => d.id === appointment.doctorId);
  const patient = patients.find((p) => p.id === appointment.patientId);

  const handleMedicineSelect = (medicineId) => {
    setSelectedMedicines(prev => 
      prev.includes(medicineId) 
        ? prev.filter(id => id !== medicineId) 
        : [...prev, medicineId]
    );
  };

  const calculateMedTotal = () => {
    return selectedMedicines.reduce((sum, medId) => {
      const med = medicines.find((m) => m.id === medId);
      return sum + (med?.price || 0);
    }, 0);
  };

  const calculateTotal = () => (doctor?.fee || 0) + calculateMedTotal();

  const handleGenerateBill = () => {
    const billData = {
      id: Date.now(),
      appointmentId: appointment.id,
      patientName: patient?.name,
      doctorName: doctor?.name,
      totalAmount: calculateTotal(),
      date: new Date().toLocaleDateString("en-IN"),
    };

    dispatch({ type: ADD_BILL, payload: billData });
    dispatch({ type: UPDATE_APPOINTMENT, payload: { ...appointment, visited: true } });
    
    alert("Invoice generated and marked as Visited!");
    onClose();
  };

  return (
    <div className="bill-overlay">
      <div className="bill-modal-v2">
        <div className="bill-card-header">
          <div>
            <h2>Final Invoice</h2>
            <p>ID: #INV-{Date.now().toString().slice(-5)}</p>
          </div>
          <button className="close-icon-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="bill-body">
          <div className="user-details-row">
            <div className="user-box">
              <label>PATIENT</label>
              <p>{patient?.name}</p>
            </div>
            <div className="user-box">
              <label>CONSULTANT</label>
              <p>Dr. {doctor?.name}</p>
            </div>
          </div>

          <div className="invoice-section">
            <h3 className="section-title">Consultation Services</h3>
            <div className="invoice-item">
              <span>Standard Consultation Fee</span>
              <span className="price-tag">₹{doctor?.fee}</span>
            </div>
          </div>

          <div className="invoice-section">
            <h3 className="section-title">Prescribed Medicines</h3>
            <div className="meds-selection-grid">
              {medicines.map((med) => (
                <div 
                  key={med.id} 
                  className={`med-chip ${selectedMedicines.includes(med.id) ? 'active' : ''}`}
                  onClick={() => handleMedicineSelect(med.id)}
                >
                  <span className="med-name">{med.name}</span>
                  <span className="med-price">+₹{med.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bill-summary-card">
            <div className="summary-line">
              <span>Subtotal (Fees)</span>
              <span>₹{doctor?.fee}</span>
            </div>
            <div className="summary-line">
              <span>Pharmacy Charges</span>
              <span>₹{calculateMedTotal()}</span>
            </div>
            <div className="summary-line grand-total">
              <span>Total Payable</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
        </div>

        <div className="bill-footer">
          <button className="secondary-btn" onClick={onClose}>Discard</button>
          <button className="primary-btn-grad" onClick={handleGenerateBill}>
            Complete & Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}









