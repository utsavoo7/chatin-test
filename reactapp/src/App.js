import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamPage from "./components/TeamPage";
import Login from "./components/Login";
import { createContext, useState } from "react";
import "./App.css";
import { Alert, Snackbar } from "@mui/material";

export const AppContext = createContext(null);

function App() {
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const value = {
    showAlert,
    setShowAlert,
  };
  return (
    <>
      <AppContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/league" element={<TeamPage />} />
            <Route path="*" element={<div>404 Not Found!</div>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
      {showAlert.show && (
        <Snackbar
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          open={showAlert.show}
        >
          <Alert
            autoHideDuration={6000}
            onClose={() => {
              setShowAlert({
                show: false,
                message: "",
                type: "info",
              });
            }}
            severity={showAlert.type}
          >
            {showAlert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default App;
