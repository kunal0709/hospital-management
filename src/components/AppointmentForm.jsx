






import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_APPOINTMENT } from "../Redux/Constants";
import { CiClock2 } from "react-icons/ci";
import "../stylesheets/AppointmentForm.css";
  import { CiCircleAlert } from "react-icons/ci";
export default function AppointmentForm() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const doctors = useSelector((state) => state.doctors);
  const appointments = useSelector((state) => state.appointments);

  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });

  const [error, setError] = useState("");

  const handlePatientChange = (e) => {
    const patientId = Number(e.target.value);
    const patient = patients.find((p) => p.id === patientId);
    setForm({ ...form, patientId, patientName: patient ? patient.name : "" });
  };

  const handleDoctorChange = (e) => {
    const doctorId = Number(e.target.value);
    const doctor = doctors.find((d) => d.id === doctorId);
    setForm({ ...form, doctorId, doctorName: doctor ? doctor.name : "" });
    setError("");
  };

  const isSlotBooked = () => {
    return appointments.some(
      (apt) => apt.doctorId === form.doctorId && apt.date === form.date && apt.time === form.time
    );
  };

  const isDoctorAvailable = () => {
    const doctor = doctors.find((d) => d.id === form.doctorId);
    if (!doctor) return false;
    // HTML time input "HH:mm" format mein hota hai, comparison sahi kaam karega
    return form.time >= doctor.startTime && form.time <= doctor.endTime;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientId || !form.doctorId || !form.date || !form.time) {
      setError("Please fill all required fields including Date");
      return;
    }
    if (!isDoctorAvailable()) {
      const doctor = doctors.find((d) => d.id === form.doctorId);
      setError(`Doctor is only available between ${doctor.startTime} and ${doctor.endTime}`);
      return;
    }
    if (isSlotBooked()) {
      setError(`This time slot is already taken for Dr. ${form.doctorName}`);
      return;
    }

    dispatch({ type: ADD_APPOINTMENT, payload: { id: Date.now(), ...form } });
    setForm({ patientId: "", patientName: "", doctorId: "", doctorName: "", date: "", time: "", reason: "" });
    setError("");
    alert("Appointment booked successfully!");
  };

  return (
    <div className="form-container">
      <form className="appointment-card" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Schedule Visit</h2>
          <p>Book a slot with our specialized medical team</p>
        </div>

        {error && (
          <div className="error-badge">
            <span><CiCircleAlert /></span> {error}
          </div>
        )}

        <div className="form-grid">
          {/* Patient Selection */}
          <div className="input-group">
            <label>Select Patient</label>
            <select value={form.patientId} onChange={handlePatientChange} required>
              <option value="">-- Choose Patient --</option>
              {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          {/* Doctor Selection */}
          <div className="input-group">
            <label>Select Doctor</label>
            <select value={form.doctorId} onChange={handleDoctorChange} required>
              <option value="">-- Choose Doctor --</option>
              {doctors.map((d) => <option key={d.id} value={d.id}>Dr. {d.name}</option>)}
            </select>
            {form.doctorId && (
              <small className="shift-info">
             <CiClock2 />Available: {doctors.find(d => d.id === form.doctorId)?.startTime} - {doctors.find(d => d.id === form.doctorId)?.endTime}
              </small>
            )}
          </div>

          {/* Date Picker */}
          <div className="input-group">
            <label>Appointment Date</label>
            <input 
              type="date" 
              value={form.date} 
              onChange={(e) => setForm({ ...form, date: e.target.value })} 
              required 
            />
          </div>

          {/* Time Picker */}
          <div className="input-group">
            <label>Preferred Time</label>
            <input 
              type="time" 
              value={form.time} 
              onChange={(e) => setForm({ ...form, time: e.target.value })} 
              required 
            />
          </div>

          {/* Reason */}
          <div className="input-group full-width">
            <label>Reason for Visit</label>
            <textarea 
              placeholder="Briefly describe the symptoms or reason..." 
              value={form.reason} 
              onChange={(e) => setForm({ ...form, reason: e.target.value })} 
              rows="3" 
              required 
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}