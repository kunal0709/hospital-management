// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { ADD_DOCTOR } from "../Redux/Constants";
// import "../stylesheets/DoctorForm.css";

// export default function DoctorForm() {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({
//     name: "",
//     specialty: "",
//     phone: "",
//     email: "",
//     startTime: "09:00",
//     endTime: "17:00",
//     fee: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (form.startTime >= form.endTime) {
//       alert("End time must be after start time");
//       return;
//     }

//     dispatch({
//       type: ADD_DOCTOR,
//       payload: { id: Date.now(), ...form },
//     });
//     setForm({
//       name: "",
//       specialty: "",
//       phone: "",
//       email: "",
//       startTime: "09:00",
//       endTime: "17:00",
//       fee: "",
//     });
//     alert("Doctor added successfully!");
//   };

//   return (
//     <form className="doctor-form" onSubmit={handleSubmit}>
//       <h2>Add Doctor</h2>

//       <div className="form-group">
//         <label>Doctor Name</label>
//         <input
//           type="text"
//           placeholder="Doctor Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Specialty</label>
//         <select
//           value={form.specialty}
//           onChange={(e) => setForm({ ...form, specialty: e.target.value })}
//           required
//         >
//           <option value="">Select Specialty</option>
//           <option value="Cardiology">Cardiology</option>
//           <option value="Dermatology">Dermatology</option>
//           <option value="Neurology">Neurology</option>
//           <option value="Orthopedics">Orthopedics</option>
//           <option value="Pediatrics">Pediatrics</option>
//           <option value="General">General</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Phone</label>
//         <input
//           type="tel"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Working Hours Start</label>
//         <input
//           type="time"
//           value={form.startTime}
//           onChange={(e) => setForm({ ...form, startTime: e.target.value })}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Working Hours End</label>
//         <input
//           type="time"
//           value={form.endTime}
//           onChange={(e) => setForm({ ...form, endTime: e.target.value })}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Consultation Fee (₹)</label>
//         <input
//           type="number"
//           placeholder="Consultation Fee"
//           value={form.fee}
//           onChange={(e) => setForm({ ...form, fee: Number(e.target.value) })}
//           required
//           min="0"
//         />
//       </div>

//       <button type="submit">Add Doctor</button>
//     </form>
//   );
// }









import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_DOCTOR } from "../Redux/Constants";
import "../stylesheets/DoctorForm.css";
import { FaUserDoctor } from "react-icons/fa6";

export default function DoctorForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    startTime: "09:00",
    endTime: "17:00",
    fee: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.startTime >= form.endTime) {
      alert("End time must be after start time");
      return;
    }

    dispatch({
      type: ADD_DOCTOR,
      payload: { id: Date.now(), ...form },
    });

    setForm({
      name: "", specialty: "", phone: "", email: "",
      startTime: "09:00", endTime: "17:00", fee: "",
    });
    alert("Doctor profile created successfully!");
  };

  return (
    <div className="doctor-form-container">
      <form className="modern-doctor-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="icon-circle"><FaUserDoctor /></div>
          <h2>Register New Doctor</h2>
          <p>Create a professional profile for the medical staff</p>
        </div>

        <div className="form-grid">
          {/* Full Name */}
          <div className="form-group full-width">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. Ramesh Kumar"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Specialty */}
          <div className="form-group">
            <label>Specialty</label>
            <select
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              required
            >
              <option value="">Select Specialty</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="General">General Physician</option>
            </select>
          </div>

          {/* Consultation Fee */}
          <div className="form-group">
            <label>Consultation Fee (₹)</label>
            <input
              type="number"
              placeholder="500"
              value={form.fee}
              onChange={(e) => setForm({ ...form, fee: Number(e.target.value) })}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="doctor@hospital.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Start Time */}
          <div className="form-group">
            <label>Shift Start</label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              required
            />
          </div>

          {/* End Time */}
          <div className="form-group">
            <label>Shift End</label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Create Doctor Profile
        </button>
      </form>
    </div>
  );
}