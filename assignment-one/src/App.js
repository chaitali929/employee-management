import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import SocialMediaScraping from "./pages/SocialMediaScraping";
import FindPerson from "./pages/FindPerson";
import JobSearch from "./pages/JobSearch";
import DataEnrichment from "./pages/DataEnrichment";
import DatabaseSearch from "./pages/DatabaseSearch";
import TaskCreation from "./pages/TaskCreation";
import "./styles/App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderPage = () => {
    switch (selectedTab) {
      case 0:
        return <SocialMediaScraping />;
      case 1:
        return <FindPerson />;
      case 2:
        return <JobSearch />;
      case 3:
        return <DataEnrichment />;
      case 4:
        return <DatabaseSearch />;
      case 5:
        return <TaskCreation />;
      default:
        return <SocialMediaScraping />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <Tabs
        tabs={[
          "Social Media Scraping",
          "Find a Person",
          "Job Search",
          "Data Enrichment",
          "Database Search",
          "Task Creation",
        ]}
        onSelect={setSelectedTab}
      />
      <div className="page-container">{renderPage()}</div>
    </div>
  );
}

export default App;