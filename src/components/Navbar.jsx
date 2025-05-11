import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import SearchBar from "./SearchBar";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const { themeColor } = useContext(ThemeContext);
  const location = useLocation();
  const showSearchBar =
    location.pathname === "/" || location.pathname === "/recipes";

  return (
    <nav className={`navbar navbar-dark bg-${themeColor}`}>
      <div className="container">
        <div className="d-flex align-items-center">
          <span className="navbar-brand">Recipe Notebook</span>
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <NavLink to="/recipes" className="nav-link mx-2 text-white">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link mx-2 text-white">
                Create
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center gap-3">
          {showSearchBar && <SearchBar />}
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
