



import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_MEDICINE } from "../Redux/Constants";
import "../stylesheets/MedicineList.css";
import { MdDelete } from "react-icons/md";

export default function MedicineList() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this medicine?")) {
      dispatch({ type: DELETE_MEDICINE, payload: id });
    }
  };

  return (
    <div className="stock-container">
      <div className="stock-header">
        <div>
          <h2>Current Inventory</h2>
          <p>Manage and monitor medical supplies</p>
        </div>
        <div className="stock-count-badge">
          Total Items: <strong>{medicines.length}</strong>
        </div>
      </div>

      {medicines.length === 0 ? (
        <div className="empty-stock">
          <div className="empty-icon">📦</div>
          <h3>Inventory is Empty</h3>
          <p>Please add medicines from the form above.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="modern-med-table">
            <thead>
              <tr>
                <th>Drug Information</th>
                <th>Manufacturer</th>
                <th>Unit Price</th>
                <th>Stock Level</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className={medicine.quantity <= 5 ? "warning-row" : ""}>
                  <td>
                    <div className="med-info-cell">
                      <span className="med-name">{medicine.name}</span>
                      <span className="med-id">ID: #{medicine.id.toString().slice(-4)}</span>
                    </div>
                  </td>
                  <td><span className="manu-tag">{medicine.manufacturer}</span></td>
                  <td className="price-cell">₹{medicine.price}</td>
                  <td>
                    <div className="quantity-group">
                      <span className={`qty-indicator ${medicine.quantity <= 5 ? 'critical' : 'healthy'}`}></span>
                      <span className={`quantity-badge-v2 ${medicine.quantity <= 5 ? 'low' : ''}`}>
                        {medicine.quantity} Units
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="delete-icon-btn"
                      onClick={() => handleDelete(medicine.id)}
                      title="Remove Item"
                    >
                      <MdDelete />

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}