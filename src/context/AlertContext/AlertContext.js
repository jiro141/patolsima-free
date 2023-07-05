import React, { createContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const mostrarAlerta = (mensaje, tipo) => {
        toast[mensaje](tipo, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      };

  return (
    <ToastContext.Provider value={successResponse}>
      {children}
    </ToastContext.Provider>
  );
};
