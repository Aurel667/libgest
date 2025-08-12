import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="animate-in fade-in-0 duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
