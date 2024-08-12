import React, { useState, useEffect } from "react";
import Homepage from "../Homepage";

const correctUserID = "anshuadmin12345"; // Replace with your actual user ID

const LoginPrompt = ({ onSuccess }) => {
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    // Check session storage on component mount
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (sessionToken) {
      setShowPrompt(false); // Hide prompt if session token exists
      onSuccess();
    }
  }, [showPrompt, setShowPrompt]);

  const handleLogin = () => {
    const userID = prompt("Enter User ID:");
    if (userID === correctUserID) {
      sessionStorage.setItem("sessionToken", "valid"); // Save session token
      setShowPrompt(false);
    } else {
      alert("Incorrect User ID. Please try again.");
    }
  };

  const handleClose = () => {
    sessionStorage.removeItem("sessionToken"); // Clear session token

    // Redirect to a blank page as an alternative to closing the tab
    window.location.href = "about:blank";
  };

  if (showPrompt) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
            Bank Management System
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your User ID to access the system. Ensure you have the
            correct credentials to proceed.
          </p>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit User ID
          </button>
          <button
            onClick={handleClose}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg mt-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return <Homepage />;
};

export default LoginPrompt;
