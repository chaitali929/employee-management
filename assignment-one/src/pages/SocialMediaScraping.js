import React, { useState } from "react";
import "../styles/TaskPage.css";
import * as XLSX from "xlsx";

const SocialMediaScraping = () => {
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("Twitter"); // Default to Twitter
  const [data, setData] = useState([]);
  const [scrapingType, setScrapingType] = useState(""); // Either "homepage" or "post"

  // Function to detect link type (homepage or post)
  const detectLinkType = (link) => {
    // Regex patterns for detecting post URLs
    const postRegex = /(?:https?:\/\/)?(?:www\.)?(twitter\.com|facebook\.com|instagram\.com)\/[^/]+\/status\/\d+/;
    
    // Check if the link matches a post pattern
    if (postRegex.test(link)) {
      return "post";
    } else {
      return "homepage";
    }
  };

  const handleScrape = () => {
    // Detect the link type (homepage or post)
    const linkType = detectLinkType(link);
    setScrapingType(linkType);

    // Dummy data for simulation
    const dummyData = [
      { username: "user1", postContent: "This is a post!", likes: 100, followers: 500 },
      { username: "user2", postContent: "Another post here!", likes: 150, followers: 600 },
    ];

    setData(dummyData);
  };

  const handleExport = () => {
    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Scraped Data");

    // Export the workbook to Excel
    XLSX.writeFile(wb, "scraped_data.xlsx");
  };

  return (
    <div className="task-container">
      <h2>Social Media Scraping</h2>
      
      {/* Dropdown for platform selection */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="Twitter">Twitter</option>
        <option value="Facebook">Facebook</option>
        <option value="Instagram">Instagram</option>
      </select>
      
      <input
        type="text"
        placeholder={`Enter ${platform} profile link`}
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      
      <button onClick={handleScrape}>Scrape Data</button>
      
      {/* Show different scraping options based on the link type */}
      {scrapingType && (
        <div>
          <h3>Scraping Type: {scrapingType === "post" ? "Post" : "Homepage"}</h3>
          {scrapingType === "post" ? (
            <p>You can scrape data related to the specific post, such as likes, shares, and comments.</p>
          ) : (
            <p>You can scrape data related to the user's profile, such as username, followers, and posts.</p>
          )}
        </div>
      )}

      {/* Display scraped data in a table */}
      {data.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Post Content</th>
                <th>Likes</th>
                <th>Followers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.postContent}</td>
                  <td>{item.likes}</td>
                  <td>{item.followers}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Button to export the scraped data to Excel */}
          <button onClick={handleExport} className="export-btn">Export to Excel</button>
        </div>
      )}
    </div>
  );
};

export default SocialMediaScraping;