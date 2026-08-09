import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";

import AppRouter from "./routes/AppRouter";

import { AppProvider } from "./context/AppContext";
import { restoreThunk } from "./store/auth/authThunk";

export default function App() {
  const dispatch = useDispatch();

  const initializing = useSelector((state) => state.auth.initializing);

  useEffect(() => {
    dispatch(restoreThunk());
  }, [dispatch]);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }

  return (
    <AppProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      <Toaster theme="dark" closeButton />
    </AppProvider>
  );
}
