import React, { useState } from "react";
import "../styles/TaskPage.css";

const JobSearch = () => {
  const [platform, setPlatform] = useState("LinkedIn"); // Default to LinkedIn
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [icebreakerMessage, setIcebreakerMessage] = useState(""); // For the generated icebreaker message

  const handleSearch = () => {
    // Dummy data for job listings
    const dummyData = [
      { title: "Software Engineer", company: "Google", location: "Mountain View" },
      { title: "Data Analyst", company: "Amazon", location: "Seattle" },
    ];
    
    // Filter data based on job title and location
    const filteredData = dummyData.filter(
      (item) =>
        item.title.toLowerCase().includes(jobTitle.toLowerCase()) &&
        item.location.toLowerCase().includes(location.toLowerCase())
    );
    
    // Set the filtered data
    setData(filteredData);

    // Generate the icebreaker message
    if (filteredData.length > 0) {
      setIcebreakerMessage(generateIcebreaker(filteredData[0]));
    } else {
      setIcebreakerMessage("No job listing found with the provided details.");
    }
  };

  // Function to generate the icebreaker message
  const generateIcebreaker = (job) => {
    if (platform === "LinkedIn") {
      return `Hi! I noticed the position of ${job.title} at ${job.company} in ${job.location}. I'd love to learn more about the role and how I might contribute.`;
    } else if (platform === "Indeed") {
      return `Hello! I saw the ${job.title} opening at ${job.company} in ${job.location} on Indeed. I'm excited to connect and discuss how I can be a great fit for this role.`;
    } else {
      return `Hi! I'm interested in the ${job.title} position at ${job.company} located in ${job.location}. Looking forward to learning more!`;
    }
  };

  // Function to copy the icebreaker message to clipboard
  const handleCopyToClipboard = () => {
    if (icebreakerMessage) {
      navigator.clipboard.writeText(icebreakerMessage)
        .then(() => alert("Icebreaker message copied to clipboard!"))
        .catch((err) => alert("Failed to copy message: " + err));
    }
  };

  return (
    <div className="task-container">
      <h2>Job Search</h2>
      
      {/* Dropdown for platform selection */}
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Indeed">Indeed</option>
      </select>

      {/* Job Title Input */}
      <input
        type="text"
        placeholder="Enter job title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      {/* Location Input */}
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Search Button */}
      <button onClick={handleSearch}>Search Jobs</button>

      {/* Display Job Listings */}
      {data.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.company}</td>
                  <td>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Display Icebreaker Message */}
          <div className="icebreaker-message">
            <h3>Icebreaker Message:</h3>
            <p>{icebreakerMessage}</p>
          </div>

          {/* Button to Copy Icebreaker Message */}
          {icebreakerMessage && (
            <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
          )}
        </div>
      )}

      {/* If no results found, show a message */}
      {data.length === 0 && icebreakerMessage && <p>{icebreakerMessage}</p>}
    </div>
  );
};

export default JobSearch;