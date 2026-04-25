

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_MEDICINE, ADD_PURCHASE_HISTORY } from "../Redux/Constants";
import "../stylesheets/MedicineShop.css";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

export default function MedicineShop() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);
  const patients = useSelector((state) => state.patients);
  
  const [selectedPatient, setSelectedPatient] = useState("");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) && med.quantity > 0
  );

  const handleAddToCart = (medicine) => {
    const existingItem = cart.find((item) => item.id === medicine.id);
    if (existingItem) {
      if (existingItem.quantity < medicine.quantity) {
        setCart(cart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else { alert("Insufficient stock!"); }
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (medicineId, newQuantity) => {
    const medicine = medicines.find((m) => m.id === medicineId);
    if (newQuantity > medicine.quantity) { alert("Stock limit reached!"); return; }
    if (newQuantity <= 0) { setCart(cart.filter((item) => item.id !== medicineId)); return; }
    setCart(cart.map((item) => item.id === medicineId ? { ...item, quantity: newQuantity } : item));
  };

  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!selectedPatient) return alert("Select a patient first!");
    const patient = patients.find((p) => p.id.toString() === selectedPatient);

    const purchase = {
      id: Date.now(),
      patientId: selectedPatient,
      patientName: patient.name,
      medicines: cart.map(item => ({ ...item, subtotal: item.price * item.quantity })),
      totalAmount: calculateTotal(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
    };

    cart.forEach((item) => {
      const medicine = medicines.find((m) => m.id === item.id);
      dispatch({ type: UPDATE_MEDICINE, payload: { ...medicine, quantity: medicine.quantity - item.quantity } });
    });

    dispatch({ type: ADD_PURCHASE_HISTORY, payload: purchase });
    setCart([]); setSelectedPatient(""); setSearchTerm("");
    alert("Order Processed Successfully! ✅");
  };

  return (
    <div className="pos-wrapper">
      <div className="pos-main">
        {/* Left Side: Inventory */}
        <section className="inventory-section">
          <div className="section-header">
            <div className="title-area">
              <h1>Pharmacy POS</h1>
              <p>{filteredMedicines.length} Medicines Available</p>
            </div>
            <div className="search-wrapper">
              <span className="search-icon"><CiSearch /></span>
              <input
                type="text"
                placeholder="Search by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="products-grid">
            {filteredMedicines.map((medicine) => (
              <div key={medicine.id} className="pos-card">
                <div className="stock-label">Stock: {medicine.quantity}</div>
                <div className="card-body">
                  <span className="brand">{medicine.manufacturer}</span>
                  <h3>{medicine.name}</h3>
                  <div className="price-tag">₹{medicine.price}</div>
                </div>
                <button 
                  className="add-btn" 
                  onClick={() => handleAddToCart(medicine)}
                >
                  + Add to Billing
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Side: Billing Cart */}
        <aside className="billing-sidebar">
          <div className="cart-header">
            <h2>Order Summary</h2>
            <div className="patient-picker">
              <label>Assign to Patient</label>
              <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
                <option value="">Choose Patient...</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div className="cart-list">
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <div className="cart-icon"><CiShoppingCart /> </div>
                <p>No items added yet</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-row">
                  <div className="item-main">
                    <h4>{item.name}</h4>
                    <span>₹{item.price} / unit</span>
                  </div>
                  <div className="qty-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <input type="text" readOnly value={item.quantity} />
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="row-total">₹{item.price * item.quantity}</div>
                </div>
              ))
            )}
          </div>

          <div className="billing-footer">
            <div className="total-row">
              <span>Grand Total</span>
              <span className="amount">₹{calculateTotal()}</span>
            </div>
            <button 
              className="checkout-btn" 
              disabled={!selectedPatient || cart.length === 0}
              onClick={handleCheckout}
            >
              Complete Sale
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}