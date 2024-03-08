/* eslint-disable no-unused-vars */
import "./App.css"; // Importing CSS for styling
import { Form, Formik } from "formik"; // Import Formik for handling forms
import React, { useState } from "react"; // Import React and useState hook for state management
import { Navigate, Routes, Route } from "react-router-dom"; // Import components for routing
import UserInfo from "./Components/UserInfo"; // Import user info component
import SchoolDetail from "./Components/SchoolDetail"; // Import school detail component
import Contact from "./Components/Contact"; // Import contact component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { studentPath } from "./Paths"; // Import predefined paths for navigation

function App() {
  let navigate = useNavigate(); // Use the useNavigate hook for programmatically navigating
  const [steps, setSteps] = useState(studentPath); // State to keep track of the steps in the form
  const [activeStep, setActiveStep] = React.useState(0); // State to keep track of the current active step

  const next = () => {
    // Function to navigate to the next form step
    let routeTo = steps[activeStep + 1]; // Determine the next route based on the current active step
    setActiveStep(activeStep + 1); // Increment the active step
    navigate(`/form/${routeTo}`); // Navigate to the next step using dynamic routing
  };

  const handleSubmit = async (values, bag) => {
    // Function to handle form submission
    if (activeStep + 1 === steps.length) {
      // Check if it's the last step
      // Submit form
      window.confirm(JSON.stringify(values, null, 2)); // Show a confirmation with the form values
    } else {
      bag.setTouched({}); // Reset touched fields
      next(); // Go to the next form step
    }
  };

  return (
    <div className="App">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          schoolName: "",
          schoolAddress: "",
        }} // Initial form values
        onSubmit={handleSubmit} // Submission handler
      >
        {(
          { values, isValid } // Render prop to access formik state and helpers
        ) => (
          <Form>
            <div className="container">
              <div className="form">
                <Routes>
                  {" "}
                  {/* Use Routes for conditional rendering based on the route */}
                  <Route
                    path="/"
                    element={<Navigate replace to="/form/user-info" />}
                  />{" "}
                  {/* Redirect from root to user info */}
                  <Route path="/form/user-info" element={<UserInfo />} />{" "}
                  {/* User info form step */}
                  <Route
                    path="/form/school-info"
                    element={<SchoolDetail />}
                  />{" "}
                  {/* School info form step */}
                  <Route path="/form/contact" element={<Contact />} />{" "}
                  {/* Contact info form step */}
                </Routes>
                <div>
                  <button type="submit" disabled={!isValid}>
                    {activeStep + 1 === steps.length ? "submit" : "next"}{" "}
                    {/* Button text changes based on the step */}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App; // Export the App component
