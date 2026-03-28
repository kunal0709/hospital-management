// import { useState } from "react";
// import "../stylesheets/Sidebar.css";

// export default function Sidebar({ setActiveModule }) {

//   const [activeBtn, setActiveBtn] = useState("patients");

//   const handleClick = (module) => {
//     setActiveBtn(module);
//     setActiveModule(module);
//   };

//   return (
//     <div className="sidebar">

//       <button
//         className={activeBtn === "patients" ? "active" : ""}
//         onClick={() => handleClick("patients")}
//       >
//         Patients
//       </button>

//       <button
//         className={activeBtn === "appointments" ? "active" : ""}
//         onClick={() => handleClick("appointments")}
//       >
//         Appointments
//       </button>

//       <button
//         className={activeBtn === "doctors" ? "active" : ""}
//         onClick={() => handleClick("doctors")}
//       >
//         Doctors
//       </button>

//       <button
//         className={activeBtn === "inventory" ? "active" : ""}
//         onClick={() => handleClick("inventory")}
//       >
//         Inventory
//       </button>

//       <button
//         className={activeBtn === "medicine-shop" ? "active" : ""}
//         onClick={() => handleClick("medicine-shop")}
//       >
//         Buy Medicine
//       </button>

//       <button
//         className={activeBtn === "purchase-history" ? "active" : ""}
//         onClick={() => handleClick("purchase-history")}
//       >
//         Purchase History
//       </button>

//     </div>
//   );
// }








import { useState } from "react";
import "../stylesheets/Sidebar.css";

export default function Sidebar({ setActiveModule }) {
  const [activeBtn, setActiveBtn] = useState("patients");

  const menuItems = [
    { id: "patients", label: "Patients", icon: "👥" },
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "doctors", label: "Doctors", icon: "👨‍⚕️" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "medicine-shop", label: "Buy Medicine", icon: "🛒" },
    { id: "purchase-history", label: "History", icon: "📜" },
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
            <span className="nav-icon">{item.icon}</span>
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