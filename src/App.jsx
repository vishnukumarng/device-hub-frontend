import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster theme="dark" closeButton />
    </AppProvider>
  );
}
