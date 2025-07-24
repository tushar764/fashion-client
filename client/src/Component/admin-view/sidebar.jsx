import { Fragment } from "react";
import { BarChartBig } from "lucide-react"; // ✅ Fixed
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "../../config/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"; 
function MenuItems({setOpen}) {
  const navigate=useNavigate()
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          
          className="flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2  text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}



function AdminSidebar({open,setOpen}) {
    const navigate=useNavigate()
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className='border-b'>
              <SheetTitle className="flex gap-2 mt-5 mb-4">
                <BarChartBig/>
                <h1 className="text-lg font-bold">Admin Panel</h1>
                </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>

      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div  onClick ={()=>navigate('/admin/dashboard')}
        className="flex cursor-pointer items-center gap-2">
          <BarChartBig className="h-6 w-6" /> {/* Icon */}
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
