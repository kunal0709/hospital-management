// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { DELETE_PATIENT } from '../Redux/Constants'
// import '../stylesheets/PatientList.css'

// export default function PatientList() {
//   const dispatch = useDispatch()
//   const patients = useSelector((state) => state.patients)

//   const handleDelete = (id) => {
//     dispatch({ type: DELETE_PATIENT, payload: id })
//   }

//   return (
//     <div className="patient-list">
//       <h2>Patients List</h2>
//       {patients.length === 0 ? (
//         <p>No patients added yet</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.map((patient) => (
//               <tr key={patient.id}>
//                 <td>{patient.id}</td>
//                 <td>{patient.name}</td>
//                 <td>{patient.age}</td>
//                 <td>{patient.gender}</td>
//                 <td>
//                   <button 
//                     className="delete-btn"
//                     onClick={() => handleDelete(patient.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }







import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_PATIENT } from '../Redux/Constants'
import '../stylesheets/PatientList.css'
import { CiFolderOn } from "react-icons/ci";  

export default function PatientList() {
  const dispatch = useDispatch()
  const patients = useSelector((state) => state.patients)

  const handleDelete = (id) => {
    if (window.confirm("Discharge this patient and remove record?")) {
      dispatch({ type: DELETE_PATIENT, payload: id })
    }
  }

  return (
    <div className="patient-list-container">
      <div className="list-header">
        <div className="header-info">
          <h2>Patient Registry</h2>
          <p>Showing {patients.length} admitted patients</p>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-img"><CiFolderOn /></div>
          <p>No active patient records found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="medical-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Full Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Admission Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="id-cell">#{patient.id.toString().slice(-5)}</td>
                  <td>
                    <div className="patient-name-box">
                      <span className="name-text">{patient.name}</span>
                    </div>
                  </td>
                  <td><span className="age-tag">{patient.age} Yrs</span></td>
                  <td>
                    <span className={`gender-label ${patient.gender.toLowerCase()}`}>
                      {patient.gender === 'Male' ? '♂' : '♀'} {patient.gender}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill active">Admitted</span>
                  </td>
                  <td className="text-right">
                    <button 
                      className="discharge-btn"
                      onClick={() => handleDelete(patient.id)}
                      title="Discharge Patient"
                    >
                      Discharge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}