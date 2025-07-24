import React from "react";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet
import ShoppingHeader from "./header"; // ✅ Ensure correct path

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
