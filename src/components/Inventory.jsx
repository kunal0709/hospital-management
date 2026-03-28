// import React from 'react'
// import "../stylesheets/Inventory.css"

// export default function Inventory() {
//   return (
//     <div className="inventory-placeholder">
//       <h2>Inventory Management</h2>
//       <p>Welcome to Hospital Management System</p>
//     </div>
//   )
// }





import React, { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import "../stylesheets/Inventory.css";
import { FiAlertCircle } from "react-icons/fi";
import { FiStopCircle } from "react-icons/fi";
export default function Inventory() {
  // Dummy data for visualization
  const [stock] = useState([
    { id: 1, name: "Paracetamol 500mg", category: "Analgesic", quantity: 450, unit: "Tablets", status: "In Stock" },
    { id: 2, name: "Amoxicillin", category: "Antibiotic", quantity: 12, unit: "Vials", status: "Low Stock" },
    { id: 3, name: "Insulin Glargine", category: "Diabetes", quantity: 0, unit: "Pens", status: "Out of Stock" },
    { id: 4, name: "Vitamin C", category: "Supplements", quantity: 800, unit: "Capsules", status: "In Stock" },
  ]);

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h2>Pharmacy Inventory</h2>
          <p>Monitor and manage medical supplies and stock levels</p>
        </div>
        <button className="add-stock-btn">+ Add New Item</button>
      </div>

      {/* Quick Stats */}
      <div className="stock-stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-content">
            <label>Total Items</label>
            <h3>1,240</h3>
          </div>
        </div>
        <div className="stat-card warning">
          <span className="stat-icon"><FiAlertCircle /></span>
          <div className="stat-content">
            <label>Low Stock</label>
            <h3>12 Items</h3>
          </div>
        </div>
        <div className="stat-card danger">
          <span className="stat-icon"><FiStopCircle /></span>
          <div className="stat-content">
            <label>Out of Stock</label>
            <h3>3 Items</h3>
          </div>
        </div>
      </div>

      <div className="inventory-table-container">
        <div className="table-filters">
          <input type="text" placeholder="Search medicines..." className="search-input" />
          <select className="category-select">
            <option>All Categories</option>
            <option>Antibiotics</option>
            <option>Analgesics</option>
          </select>
        </div>

        <table className="modern-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="item-name-cell">
                    <strong>{item.name}</strong>
                    <span>UID: MED-{item.id}024</span>
                  </div>
                </td>
                <td><span className="cat-tag">{item.category}</span></td>
                <td>{item.quantity} {item.unit}</td>
                <td>
                  <span className={`status-pill ${item.status.toLowerCase().replace(" ", "-")}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="edit-mini"><FaPencilAlt /></button>
                    <button className="restock-btn">Restock</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}