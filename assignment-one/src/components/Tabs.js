import React, { useState } from "react";
import "../styles/Tabs.css";

const Tabs = ({ tabs, onSelect }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onSelect(index);
  };

  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab ${activeTab === index ? "active" : ""}`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;