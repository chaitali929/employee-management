import React, { useState } from "react";
import "../styles/TaskPage.css";
import * as XLSX from "xlsx"; // Import the xlsx library

const FindPerson = () => {
  const [name, setName] = useState(""); // State for the name input
  const [jobTitle, setJobTitle] = useState(""); // State for the job title input
  const [data, setData] = useState([]);
  const [noResults, setNoResults] = useState(false); // To handle "no results" message visibility

  const handleSearch = () => {
    // Dummy data for employees
    const dummyData = [
      { name: "John Doe", age: 30, location: "New York", company: "TechCorp", jobTitle: "Engineer", email: "john.doe@techcorp.com", phone: "123-456-7890" },
      { name: "Jane Smith", age: 25, location: "California", company: "Innovate Inc.", jobTitle: "Designer", email: "jane.smith@innovate.com", phone: "987-654-3210" },
      { name: "Emily Johnson", age: 28, location: "Boston", company: "TechCorp", jobTitle: "Engineer", email: "emily.johnson@techcorp.com", phone: "555-555-5555" },
      { name: "Michael Brown", age: 35, location: "Chicago", company: "Innovate Inc.", jobTitle: "Manager", email: "michael.brown@innovate.com", phone: "333-333-3333" },
    ];

    // Filter data by name and job title (case-insensitive)
    const filteredData = dummyData.filter(
      (item) =>
        item.name.toLowerCase().includes(name.toLowerCase()) &&
        item.jobTitle.toLowerCase().includes(jobTitle.toLowerCase())
    );

    // If there are no results, set the noResults state to true, otherwise false
    setNoResults(filteredData.length === 0);
    setData(filteredData); // Set the filtered data
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a workbook and add a worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");

    // Export the file as an Excel file
    XLSX.writeFile(wb, "employees_data.xlsx");
  };

  return (
    <div className="task-container">
      <h2>Find a Person</h2>

      {/* Name Input for searching */}
      <input
        type="text"
        placeholder="Enter person's name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Job Title Input for searching */}
      <input
        type="text"
        placeholder="Enter job title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {/* Display filtered data in table format */}
      {data.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Location</th>
                <th>Company</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.location}</td>
                  <td>{item.company}</td>
                  <td>{item.jobTitle}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Export to Excel button */}
          <button onClick={exportToExcel} style={{ marginTop: "20px" }}>
            Export to Excel
          </button>
        </div>
      )}

      {/* Display message if no results are found after search */}
      {noResults && <p>No employee found with that name and job title</p>}
    </div>
  );
};

export default FindPerson;