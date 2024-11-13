// App.js

import { Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage"; // Assuming you have a dashboard page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
