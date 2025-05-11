import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

function ThemeSelector() {
  const themeColors = ["dark", "warning", "info", "success", "primary"];
  const { changeThemeColor, backgroundColor, changeBackgroundColor } =
    useContext(ThemeContext);

  const isDarkMode = backgroundColor === "dark";
  const toggleTheme = () => {
    const newColor = isDarkMode ? "light" : "dark";
    changeBackgroundColor(newColor);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <button
        className={`btn btn btn-outline-light`}
        onClick={toggleTheme}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <BsSunFill /> : <BsMoonStarsFill />}
      </button>
      <div className="dropdown">
        <button
          className="btn btn-outline-light dropdown-toggle"
          type="button"
          id="themeDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Theme
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="themeDropdown"
        >
          {themeColors.map((color) => (
            <li key={color}>
              <button
                type="button"
                className={`dropdown-item text-${color}`}
                onClick={() => changeThemeColor(color)}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ThemeSelector;
