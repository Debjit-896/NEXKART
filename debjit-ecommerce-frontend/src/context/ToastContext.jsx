import React, { createContext, useContext, useState, useCallback } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = (title, message) => addToast('success', title, message);
  const error = (title, message) => addToast('error', title, message);
  const info = (title, message) => addToast('info', title, message);
  const warning = (title, message) => addToast('warning', title, message);

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50">
        <Stack spacing={2}>
          {toasts.map((toast) => (
            <Alert 
              key={toast.id} 
              severity={toast.type} 
              onClose={() => removeToast(toast.id)}
            >
              {toast.title && <strong>{toast.title}</strong>}
              {toast.title && toast.message && ': '}
              {toast.message}
            </Alert>
          ))}
        </Stack>
      </div>
    </ToastContext.Provider>
  );
};
