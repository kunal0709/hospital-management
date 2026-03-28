// export const initialState={
//   patients: JSON.parse(localStorage.getItem("patients")) || [],
//   appointments: JSON.parse(localStorage.getItem("appointments")) || [],
//   doctors: JSON.parse(localStorage.getItem("doctors")) || [],
//   medicines: JSON.parse(localStorage.getItem("medicines")) || [],
//   bills: JSON.parse(localStorage.getItem("bills")) || [],
//   purchaseHistory: JSON.parse(localStorage.getItem("purchaseHistory")) || [],
// }


// initialState.js

export const initialState = {
  patients: JSON.parse(localStorage.getItem("patients")) || [],
  appointments: JSON.parse(localStorage.getItem("appointments")) || [],
  
  // Yahan humne dummy doctors daal diye hain taaki dropdown khali na dikhe
  doctors: JSON.parse(localStorage.getItem("doctors"))?.length > 0 
    ? JSON.parse(localStorage.getItem("doctors")) 
    : [
        { id: 101, name: "Aman Sharma", startTime: "09:00", endTime: "17:00" },
        { id: 102, name: "Priya Verma", startTime: "10:00", endTime: "18:00" },
        { id: 103, name: "Vikram Rathore", startTime: "12:00", endTime: "20:00" }
      ],

  medicines: JSON.parse(localStorage.getItem("medicines")) || [],
  bills: JSON.parse(localStorage.getItem("bills")) || [],
  purchaseHistory: JSON.parse(localStorage.getItem("purchaseHistory")) || [],
};