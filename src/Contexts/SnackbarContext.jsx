import { useState, createContext } from "react";
import SnackBar from "../components/Snackbar";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(false);
  const [text, setText] = useState("");

  const showSnackbar = (text) => {
    setText(text);
    setSnackbar(true);
    setTimeout(() => {
      setSnackbar(false);
    }, 5000);
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, setSnackbar }}>
      {children}
      <SnackBar isOpen={snackbar}>{text}</SnackBar>
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider };
