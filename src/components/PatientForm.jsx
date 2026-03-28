// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addPatient } from "../Redux/actions";
// import "../stylesheets/PatientForm.css";

// export default function PatientForm() {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({ name: "", age: "", gender: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault(); // default actions 
//     dispatch(addPatient({ id: Date.now(), ...form }));
//     setForm({ name: "", age: "", gender: "" });
//   };

//   return (
//     <form className="patient-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         required
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={form.age}
//         onChange={(e) => setForm({ ...form, age: e.target.value })}
//         required
//       />
//       <select
//         value={form.gender}
//         onChange={(e) => setForm({ ...form, gender: e.target.value })}
//         required
//       >
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>
//       <button type="submit">Add Patient</button>
//     </form>
//   );
// }







import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../Redux/actions";
import "../stylesheets/PatientForm.css";

export default function PatientForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", age: "", gender: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPatient({ id: Date.now(), ...form }));
    setForm({ name: "", age: "", gender: "" });
  };

  return (
    <div className="patient-registration-wrapper">
      <div className="registration-header">
        <h3>New Patient Admission</h3>
        <span>Quick Entry Mode</span>
      </div>
      
      <form className="modern-patient-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="input-icon"></span>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="input-group age-input">
          <span className="input-icon"></span>
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <span className="input-icon"></span>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="reg-submit-btn">
          Register Patient
        </button>
      </form>
    </div>
  );
}