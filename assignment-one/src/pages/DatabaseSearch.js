import React, { useState } from "react";
import "../styles/TaskPage.css";

const DatabaseSearch = () => {
  const [query, setQuery] = useState(""); // Search query input
  const [jobTitle, setJobTitle] = useState(""); // Filter by job title
  const [companySize, setCompanySize] = useState(""); // Filter by company size
  const [industry, setIndustry] = useState(""); // Filter by industry
  const [data, setData] = useState([]); // Data for records

  const handleSearch = () => {
    // Example dummy data that includes job title, company size, and industry
    const dummyData = [
      { id: 1, name: "Record 1", description: "This is record 1", jobTitle: "Software Engineer", companySize: "Large", industry: "Tech" },
      { id: 2, name: "Record 2", description: "This is record 2", jobTitle: "Data Analyst", companySize: "Medium", industry: "Finance" },
      { id: 3, name: "Record 3", description: "This is record 3", jobTitle: "Product Manager", companySize: "Small", industry: "Tech" },
      { id: 4, name: "Record 4", description: "This is record 4", jobTitle: "UX Designer", companySize: "Large", industry: "Design" },
    ];

    // Filter the data based on the selected filters
    const filteredData = dummyData.filter((item) => {
      return (
        (jobTitle ? item.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) : true) &&
        (companySize ? item.companySize.toLowerCase().includes(companySize.toLowerCase()) : true) &&
        (industry ? item.industry.toLowerCase().includes(industry.toLowerCase()) : true) &&
        (query ? item.name.toLowerCase().includes(query.toLowerCase()) : true)
      );
    });

    setData(filteredData);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Description", "Job Title", "Company Size", "Industry"];
    const rows = data.map((item) => [
      item.id,
      item.name,
      item.description,
      item.jobTitle,
      item.companySize,
      item.industry,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    // Create a download link and trigger it
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "filtered_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="task-container">
      <h2>Database Search</h2>

      {/* Search Query Input */}
      <input
        type="text"
        placeholder="Enter database query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filters */}
      <div className="filters">
        <select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
          <option value="">Select Job Title</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Product Manager">Product Manager</option>
          <option value="UX Designer">UX Designer</option>
        </select>

        <select value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
          <option value="">Select Company Size</option>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>

        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">Select Industry</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* Search Button */}
      <button onClick={handleSearch}>Search Database</button>

      {/* Display filtered results in a table */}
      {data.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Job Title</th>
                <th>Company Size</th>
                <th>Industry</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.jobTitle}</td>
                  <td>{item.companySize}</td>
                  <td>{item.industry}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Export Button */}
          <button onClick={exportToCSV} style={{ marginTop: "20px" }}>
            Export to CSV
          </button>
        </>
      ) : (
        <p>No records found based on your filters.</p>
      )}
    </div>
  );
};

export default DatabaseSearch;
