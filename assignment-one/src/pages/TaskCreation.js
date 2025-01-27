import React, { useState } from "react";
import "../styles/TaskCreation.css";

const TaskCreation = () => {
  const [selectedScenario, setSelectedScenario] = useState(""); // Selected task
  const [inputs, setInputs] = useState({}); // Dynamic inputs
  const [outputOptions, setOutputOptions] = useState([]); // Selected output options

  // Scenarios and their input fields
  const scenarios = {
    "Social Media Scraping": ["Social Media Links"],
    "Find a Person": ["Person's Name"],
    "Job Search": ["Job Title", "Company Name"],
    "Data Enrichment": ["Data Input (e.g., Email)"],
    "Database Search": ["Query"],
  };

  // Output options for all scenarios
  const availableOutputs = ["Email", "Phone Number", "Job Title", "Location"];

  // Handle task scenario selection
  const handleScenarioChange = (scenario) => {
    setSelectedScenario(scenario);
    setInputs({}); // Reset inputs for new scenario
    setOutputOptions([]); // Reset output options
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Handle output option selection
  const toggleOutputOption = (option) => {
    setOutputOptions((prev) =>
      prev.includes(option) ? prev.filter((opt) => opt !== option) : [...prev, option]
    );
  };

  const handleStartTask = async () => {
    console.log("Selected Scenario:", selectedScenario);
    console.log("Inputs:", inputs);
    console.log("Output Options:", outputOptions);
  
    // Send data to backend for scraping and Excel generation
    try {
      const response = await fetch("http://localhost:5000/start-scraping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenario: selectedScenario,
          inputs: inputs,
          outputOptions: outputOptions,
        }),
      });
  
      // Handle the response (download Excel file)
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "scraped_data.xlsx";
        link.click();
      } else {
        alert("Error: Unable to start the scraping task");
      }
    } catch (error) {
      console.error("Error during scraping:", error);
      alert("Error: Unable to start the scraping task");
    }
  };

  return (
    <div className="task-creation-container">
      <h1>Task Creation Interface</h1>
      <div className="form-section">
        {/* Task Scenario Dropdown */}
        <label>Select Task Scenario:</label>
        <select
          value={selectedScenario}
          onChange={(e) => handleScenarioChange(e.target.value)}
        >
          <option value="" disabled>Select a Scenario</option>
          {Object.keys(scenarios).map((scenario, index) => (
            <option key={index} value={scenario}>
              {scenario}
            </option>
          ))}
        </select>

        {/* Dynamic Input Fields */}
        {selectedScenario && (
          <>
            <h3>Input Fields</h3>
            {scenarios[selectedScenario].map((field, index) => (
              <div key={index} className="input-field">
                <label>{field}:</label>
                <input
                  type="text"
                  placeholder={`Enter ${field}`}
                  value={inputs[field] || ""}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
              </div>
            ))}
          </>
        )}

        {/* Output Options */}
        {selectedScenario && (
          <>
            <h3>Output Options</h3>
            <div className="output-options">
              {availableOutputs.map((option, index) => (
                <label key={index} className="checkbox">
                  <input
                    type="checkbox"
                    checked={outputOptions.includes(option)}
                    onChange={() => toggleOutputOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Start Task Button */}
        {selectedScenario && (
          <button className="start-task-btn" onClick={handleStartTask}>
            Start Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCreation;