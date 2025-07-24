import { Label } from "../ui/all";
import { DialogContent } from "../../Component/ui/checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CommonForm from "../../Component/common/form";
import { useState } from "react";
import { Badge } from "../ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, updateOrderStatus } from "../../Store/admin/product-slice/adminorder-slice/order-slice";
import { Toaster,toast } from 'sonner';


function AdminOrderDetailsView({ orderDetails }) {
  const initialFormData = { status: "" };
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()


  function handleUpdateStatus(event) {
    event.preventDefault();
    // Handle update logic here
    console.log(formData)
    const { status } = formData;
    dispatch(updateOrderStatus
      ({ id: orderDetails?._id, orderStatus: status })).then(data => {

        if (data?.payload?.success) {
          // dispatch(getOrdersDetailsForAdmin(orderDetails?._id))
          dispatch(getOrdersDetailsForAdmin({ id: orderDetails._id }));
          dispatch(getAllOrdersForAdmin())
          setFormData(initialFormData);
        toast(data?.payload?.message);
        }
      })
  }

  return (
        <>
        <Toaster position="top-right" />
    <DialogContent className="sm:max-w-[700px] w-[95vw] p-6 max-h-[90vh] overflow-y-auto">
      <div className="grid gap-5 text-sm">
        {/* Order Info */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500 text-white"
                    : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-black text-white"
                  }`}
              >
                {orderDetails?.orderStatus}
              </Badge>

            </Label>
          </div>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="grid gap-2">
          <p className="font-semibold">Order Details</p>
          <ul className="grid gap-2">
            {orderDetails?.cartItems &&
              orderDetails.cartItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>Title: {item.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                </li>
              ))}
          </ul>
        </div>

        <Separator />

        {/* Shipping Info */}
        <div className="grid gap-2">
          <p className="font-bold">Shipping Info</p>
          <div className="grid gap-0.5 text-muted-foreground text-sm">
            <span>{user.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
            <span>Phone: {orderDetails?.addressInfo?.phone}</span>
            <span>Notes: {orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>

        <Separator />

        {/* Update Order Status */}
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              ComponentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
        
      </div>
    </DialogContent>
        </>
  );
}

export default AdminOrderDetailsView;
