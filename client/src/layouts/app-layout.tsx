import React from "react";
import { Nav, Footer } from "@/layouts";
import { Outlet } from "react-router-dom";
export const AppLayout = () => {
  return (
    <main className="h-screen w-screen flex flex-col justify-between overflow-hidden">
      <Nav />
      <div className="h-full w-full overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};
