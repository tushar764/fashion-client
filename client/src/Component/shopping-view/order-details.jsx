import { Label } from "../ui/all";
import { DialogContent } from "../../Component/ui/checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "../ui/checkbox";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {

  const { user } = useSelector(state => state.auth)
  console.log("Address Info:", orderDetails?.addressInfo);
  return (
    <DialogContent
      className="sm:max-w-[700px] w-[95vw] p-6 max-h-[90vh] overflow-y-auto"
    >
      <div className="grid gap-5 text-sm">
        {/* Order Info */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          {/* payment method */}
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
                className={`py-1 px-3 ${orderDetails?.orderStatus === 'confirmed'
                    ? 'bg-green-500 text-white'
                    : 'bg-black text-white'
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
            {
              orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                orderDetails?.cartItems.map(item =>
                  <li className="flex items-center justify-between">
                    <span>Title:{item.title}</span>
                    <span>Quantity:{item.quantity}</span>
                    <span> Price :${item?.price}</span>
                  </li>
                )
                : null
            }


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



      </div>
    </DialogContent>
  );

}
export default ShoppingOrderDetailsView;