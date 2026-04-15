






import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_DOCTOR } from "../Redux/Constants";
import AppointmentList from "./AppointmentList";
import "../stylesheets/DoctorList.css";
import { MdMessage } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
export default function DoctorList() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors);
  const appointments = useSelector((state) => state.appointments);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this doctor?")) {
      dispatch({ type: DELETE_DOCTOR, payload: id });
    }
  };

  const getDoctorAppointmentCount = (doctorId) => {
    return appointments.filter((apt) => apt.doctorId === doctorId).length;
  };

  return (
    <div className="doctor-management-wrapper">
      <div className="list-header-v3">
        <div>
          <h2>Medical Specialists</h2>
          <p>Manage hospital staff and their schedules</p>
        </div>
        <div className="staff-count">
          Total Staff: <strong>{doctors.length}</strong>
        </div>
      </div>

      {doctors.length === 0 ? (
        <div className="empty-state-v3">
          <div className="empty-icon"><FaUserDoctor /></div>
          <p>No medical staff registered in the system yet.</p>
        </div>
      ) : (
        <div className="doctor-cards-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className={`doctor-profile-card ${selectedDoctor?.id === doctor.id ? 'active-card' : ''}`}>
              <div className="card-top">
                <div className="avatar-placeholder">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="doctor-badge">{doctor.specialty}</div>
              </div>

              <div className="card-info">
                <h3>{doctor.name}</h3>
                <p className="doc-email"><MdMessage /> {doctor.email}</p>
                <p className="doc-phone"><IoCallOutline /> {doctor.phone}</p>
              </div>

              <div className="card-stats">
                <div className="stat-item">
                  <label>Shift</label>
                  <span>{doctor.startTime} - {doctor.endTime}</span>
                </div>
                <div className="stat-item">
                  <label>Appointments</label>
                  <span className="count-tag">{getDoctorAppointmentCount(doctor.id)}</span>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="btn-view-schedule"
                  onClick={() => setSelectedDoctor(selectedDoctor?.id === doctor.id ? null : doctor)}
                >
                  {selectedDoctor?.id === doctor.id ? "Close Panel" : "View Schedule"}
                </button>
                <button
                  className="btn-delete-staff"
                  onClick={() => handleDelete(doctor.id)}
                >
               <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <div className="side-panel-appointments">
          <div className="panel-header">
            <h3>Appointments for {selectedDoctor.name}</h3>
            <button onClick={() => setSelectedDoctor(null)}>×</button>
          </div>
          <AppointmentList doctorFilter={selectedDoctor.id} />
        </div>
      )}
    </div>
  );
}