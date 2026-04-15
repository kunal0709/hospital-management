






import { useState } from "react";
import "../stylesheets/sidebar.css";

export default function Sidebar({ setActiveModule }) {
  const [activeBtn, setActiveBtn] = useState("patients");

  const menuItems = [
    { id: "patients", label: "Patients", icon: "https://img.icons8.com/arcade/64/illness.png" },
    { id: "appointments", label: "Appointments", icon: "https://img.icons8.com/color/48/tear-off-calendar--v1.png" },
    { id: "doctors", label: "Doctors", icon: "https://img.icons8.com/color/48/doctor-female.png"  },
    { id: "inventory", label: "Inventory", icon: "https://img.icons8.com/fluency/48/sell-stock.png" },
    { id: "medicine-shop", label: "Buy Medicine", icon: "https://img.icons8.com/color/48/pills.png" },
    { id: "purchase-history", label: "History", icon: "https://img.icons8.com/color/48/activity-history.png" },
  ];

  const handleClick = (module) => {
    setActiveBtn(module);
    setActiveModule(module);
  };

  return (
    <aside className="modern-sidebar">
      <div className="sidebar-brand">
        <div className="brand-dot"></div>
        <span>Main Menu</span>
      </div>

      <nav className="nav-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeBtn === item.id ? "active" : ""}`}
            onClick={() => handleClick(item.id)}
          >
            <span className="nav-icon"><img className="scale-60" src={item.icon} alt="" /></span>
            <span className="nav-label">{item.label}</span>
            {activeBtn === item.id && <div className="active-pill"></div>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 MediCore</p>
      </div>
    </aside>
  );
}