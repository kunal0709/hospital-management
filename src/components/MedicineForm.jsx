// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { ADD_MEDICINE } from "../Redux/Constants";
// import "../stylesheets/MedicineForm.css";

// export default function MedicineForm() {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     manufacturer: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch({
//       type: ADD_MEDICINE,
//       payload: { id: Date.now(), ...form },
//     });
//     setForm({
//       name: "",
//       price: "",
//       quantity: "",
//       manufacturer: "",
//     });
//     alert("Medicine added successfully!");
//   };

//   return (
//     <form className="medicine-form" onSubmit={handleSubmit}>
//       <h2>Add Medicine</h2>

//       <div className="form-group">
//         <label>Medicine Name</label>
//         <input
//           type="text"
//           placeholder="Medicine Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Price (₹)</label>
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
//           required
//           min="0"
//         />
//       </div>

//       <div className="form-group">
//         <label>Quantity</label>
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={form.quantity}
//           onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
//           required
//           min="0"
//         />
//       </div>

//       <div className="form-group">
//         <label>Manufacturer</label>
//         <input
//           type="text"
//           placeholder="Manufacturer"
//           value={form.manufacturer}
//           onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
//           required
//         />
//       </div>

//       <button type="submit">Add Medicine</button>
//     </form>
//   );
// }









import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_MEDICINE } from "../Redux/Constants";
import "../stylesheets/MedicineForm.css";
import { MdMedication } from "react-icons/md";

export default function MedicineForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    manufacturer: "",
    category: "General", // Extra field for better UI
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_MEDICINE,
      payload: { id: Date.now(), ...form },
    });
    setForm({
      name: "",
      price: "",
      quantity: "",
      manufacturer: "",
      category: "General",
    });
    // Hum simple alert ki jagah custom success message bhi dikha sakte hain
    alert("Medicine added to inventory!");
  };

  return (
    <div className="med-form-wrapper">
      <form className="modern-med-form" onSubmit={handleSubmit}>
        <div className="med-form-header">
          <div className="med-icon-box"><MdMedication /></div>
          <h2>Add New Medicine</h2>
          <p>Update pharmacy stock with new supplies</p>
        </div>

        <div className="med-form-grid">
          {/* Medicine Name */}
          <div className="med-group full-row">
            <label>Drug Name</label>
            <input
              type="text"
              placeholder="e.g. Paracetamol 500mg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Manufacturer */}
          <div className="med-group full-row">
            <label>Manufacturer / Brand</label>
            <input
              type="text"
              placeholder="e.g. Sun Pharma / Cipla"
              value={form.manufacturer}
              onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
              required
            />
          </div>

          {/* Price */}
          <div className="med-group">
            <label>Unit Price (₹)</label>
            <div className="input-with-symbol">
              <span className="symbol">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
                min="0"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="med-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              placeholder="0"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
              required
              min="0"
            />
          </div>
        </div>

        <button type="submit" className="med-submit-btn">
          <span>Add to Inventory</span>
          <i className="arrow-icon">→</i>
        </button>
      </form>
    </div>
  );
}