import { Dialog } from "@radix-ui/react-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/all";
import { Button } from "../ui/button";
import { TableHeader, Table, TableCell, TableRow, TableHead, TableBody } from "../ui/skeleton";
import { useEffect, useState } from "react";
import ShoppingOrderDetailsView from "../shopping-view/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrdersDetails, resetOrderDetails } from "../../Store/shop/product-slice/order-slice/order-slice";
import { Badge } from "../ui/checkbox";


function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);
  const { orderList, orderDetails } = useSelector(state => state.shopOrder);

  // function handleFetchOrderDetails(getId) {
  //   dispatch(getOrdersDetails(getId))
  // }
  function handleFetchOrderDetails(getId) {
  if (getId) {
    dispatch(getOrdersDetails({ id: getId }))
  } else {
    console.warn("❌ Invalid order ID passed to fetch handler:", getId)
  }
}


  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true)
  }, [orderDetails])

  console.log(orderDetails, "orderDetails")
  

  return (

    <Card>
      <CardHeader>
        <CardTitle>
          Order history this is shopping view
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead className="sr-only">Details</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              orderList && orderList.length > 0 &&
              orderList.map(orderItem =>
                <TableRow key={orderItem._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                  <TableCell>

                    <Badge className={`py-1 px-3 ${
                      
                     orderItem?.orderStatus === "confirmed"
                    ? "bg-green-500 text-white"
                    : orderItem?.orderStatus === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-black text-white"}`}>
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog 
                    open={openDetailsDialog}
                    onOpenChange={()=>{
                      setOpenDetailsDialog(false)
                      dispatch(resetOrderDetails())
                    }}
                    >
                      {/* <Button onClick={() => handleFetchOrderDetails
                        (orderItem?._id)}>
                        View Details
                      </Button> */}
                      <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                        View Details
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  );
}

export default ShoppingOrders;
