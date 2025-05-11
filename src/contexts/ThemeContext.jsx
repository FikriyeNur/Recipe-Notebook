import { createContext, useReducer } from "react";
import themeReducer from "../reducers/themeReducer";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    themeColor: "dark",
    backgroundColor: "light",
  });

  const changeThemeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeBackgroundColor = (color) => {
    dispatch({ type: "CHANGE_BACKGROUND_COLOR", payload: color });
  };

  return (
    <ThemeContext.Provider
      value={{ ...state, changeThemeColor, changeBackgroundColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
