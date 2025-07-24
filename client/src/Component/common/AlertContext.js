import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type = "success") => {
    setAlert({ msg, type });

    toast[type](msg, {
      autoClose: 3000, // ✅ Now stays for 5 seconds
      toastId: msg, // ✅ Prevents replacing previous toasts
      onClose: () => setAlert(null), // ✅ Clear state when toast closes
    });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {/* ✅ Correct placement of ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // ✅ Now stays for 5 seconds
        hideProgressBar={false}
        newestOnTop={true} // ✅ New toasts appear on top
        closeOnClick={true} // ✅ Allows clicking to close
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </AlertContext.Provider>
  );
};
