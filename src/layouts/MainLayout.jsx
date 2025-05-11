import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

function MainLayout() {
  const { backgroundColor } = useContext(ThemeContext);
  return (
    <div className={`main bg-${backgroundColor}`}>
      <Navbar />
      <div className="container mt-3 mb-3">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
