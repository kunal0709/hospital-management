export const clearAllStorage = () => {
  try {
    localStorage.removeItem("patients");
    localStorage.removeItem("appointments");
    localStorage.removeItem("doctors");
    localStorage.removeItem("medicines");
    localStorage.removeItem("bills");
    localStorage.removeItem("purchaseHistory");
    console.log("✓ All localStorage cleared successfully");
    window.location.reload();
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};

export const logStorageData = () => {
  console.log("=== Current Storage Data ===");
  console.log("Patients:", JSON.parse(localStorage.getItem("patients")) || []);
  console.log("Appointments:", JSON.parse(localStorage.getItem("appointments")) || []);
  console.log("Doctors:", JSON.parse(localStorage.getItem("doctors")) || []);
  console.log("Medicines:", JSON.parse(localStorage.getItem("medicines")) || []);
  console.log("Bills:", JSON.parse(localStorage.getItem("bills")) || []);
  console.log("Purchase History:", JSON.parse(localStorage.getItem("purchaseHistory")) || []);
};

if (typeof window !== "undefined") {
  window.clearAllStorage = clearAllStorage;
  window.logStorageData = logStorageData;
  console.log("🛠️ Use window.clearAllStorage() to clear all data");
  console.log("📊 Use window.logStorageData() to see current storage");
}