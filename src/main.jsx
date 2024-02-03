import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";
import { createContext } from "react";
export const Context = createContext({ IsAuthenticated: false });
const AppWrapper = () => {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider
      value={{
        IsAuthenticated,
        setIsAuthenticated,
        loading,
        setloading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
