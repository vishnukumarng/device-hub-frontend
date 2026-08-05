import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import BottomNavigation from "../components/layout/BottomNavigation";
import MainContainer from "../components/layout/MainContainer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto">
        <MainContainer>
          <Outlet />
        </MainContainer>
      </main>

      <BottomNavigation />
    </div>
  );
}
