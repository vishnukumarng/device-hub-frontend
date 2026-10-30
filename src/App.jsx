import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";

import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { restoreThunk } from "./store/auth/authThunk";

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster theme={theme} closeButton richColors />;
}

export default function App() {
  const dispatch = useDispatch();

  const initializing = useSelector((state) => state.auth.initializing);

  useEffect(() => {
    dispatch(restoreThunk());
  }, [dispatch]);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <ThemedToaster />
      </AppProvider>
    </ThemeProvider>
  );
}

