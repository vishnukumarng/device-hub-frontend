import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import BottomNavigation from "../components/layout/BottomNavigation";
import MainContainer from "../components/layout/MainContainer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors selection:bg-primary/20 selection:text-primary">
      <Header />
      
      <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
        <MainContainer>
          <Outlet />
        </MainContainer>
      </main>

      <BottomNavigation />
    </div>
  );
}

