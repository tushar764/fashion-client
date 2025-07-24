import React from "react";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar,setOpenSidebar]=useState(false)
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet /> {/* ✅ Now it works! */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
