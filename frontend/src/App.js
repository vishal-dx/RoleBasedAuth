import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/admin" 
        element={
          <PrivateRoute roleRequired="admin"><AdminPage />
            </PrivateRoute>
          }
        />
        <Route path="/user" 
        element={
        <PrivateRoute roleRequired="user"><UserPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
