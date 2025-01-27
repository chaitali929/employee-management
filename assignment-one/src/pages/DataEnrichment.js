import React, { useState } from "react";
import "../styles/TaskPage.css";
import * as XLSX from "xlsx"; // Importing the xlsx library
import { saveAs } from "file-saver"; // Importing the file-saver library

const DataEnrichment = () => {
  const [queryName, setQueryName] = useState(""); // Name of the person
  const [queryCompany, setQueryCompany] = useState(""); // Company name
  const [data, setData] = useState([]);

  const handleEnrich = () => {
    // Dummy data for enrichment based on name and company
    const dummyData = [
      { name: "John Doe", company: "Google", email: "john.doe@google.com", phone: "+1234567890", title: "Software Engineer" },
      { name: "Jane Smith", company: "Amazon", email: "jane.smith@amazon.com", phone: "+0987654321", title: "Data Analyst" },
    ];

    // Filter the data based on the input name and company
    const enrichedData = dummyData.filter(
      (item) =>
        item.name.toLowerCase().includes(queryName.toLowerCase()) &&
        item.company.toLowerCase().includes(queryCompany.toLowerCase())
    );

    // If found, display the enriched data, else display a message
    if (enrichedData.length > 0) {
      setData(enrichedData);
    } else {
      setData([{ name: "No person found", company: "", email: "", phone: "", title: "" }]);
    }
  };

  const exportToExcel = () => {
    // Prepare data for Excel export
    const exportData = data.map((item) => ({
      Name: item.name,
      Company: item.company,
      Email: item.email,
      Phone: item.phone,
      Title: item.title,
    }));

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enriched Data");

    // Export the file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Save the file with a name
    saveAs(file, "enriched_data.xlsx");
  };

  return (
    <div className="task-container">
      <h2>Data Enrichment</h2>
      <input
        type="text"
        placeholder="Enter person's name"
        value={queryName}
        onChange={(e) => setQueryName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter company name"
        value={queryCompany}
        onChange={(e) => setQueryCompany(e.target.value)}
      />
      <button onClick={handleEnrich}>Enrich Data</button>

      {/* Display enriched data in table format */}
      {data.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Export Button */}
          <button onClick={exportToExcel} className="export-btn">
            Export to Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default DataEnrichment;