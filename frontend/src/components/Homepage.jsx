import React, { useState } from "react";
import LoginPrompt from "./extracomponents/LoginPrompt";
import HomepageDashboard from "./extracomponents/HomepageDashboard";

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticationSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <LoginPrompt onSuccess={handleAuthenticationSuccess} />
      ) : (
        <HomepageDashboard />
      )}
    </div>
  );
};

export default Homepage;
