import { TableHeader, Table, TableCell, TableRow, TableHead, TableBody } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/all";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog } from "../../Component/ui/checkbox"

import AdminOrderDetailsView from "./order-details";

import { Badge } from "../ui/checkbox";
import { useState, useEffect } from "react";

import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, resetOrderDetails } from "../../Store/admin/product-slice/adminorder-slice/order-slice";
function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector(state => state.adminOrder)

  function handleFetchOrderDetails(getId) {
dispatch(getOrdersDetailsForAdmin({ id: getId }))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);
  console.log(orderDetails, "orderDetails")

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true)
  }, [orderDetails])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          All orders this is admin view
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Order Id
              </TableHead>
              <TableHead>
                Order Date
              </TableHead>
              <TableHead>
                Order Status
              </TableHead>
              <TableHead>
                Order Price
              </TableHead>
              <TableHead className="sr-only">
                Details
              </TableHead>
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

                    <Badge className={`py-1 px-3 
                      
                      
                      
                      ${  orderItem?.orderStatus === "confirmed"
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
                      onOpenChange={() => {
                        setOpenDetailsDialog(false)
                        dispatch(resetOrderDetails())
                      }}
                    >
                      <Button
                        onClick={() =>
                          handleFetchOrderDetails(orderItem._id)
                        }
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView;
