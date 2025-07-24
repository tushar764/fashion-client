import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "../../Store/shop/product-slice/order-slice/order-slice";
import { CardTitle, CardHeader, Card } from "../../Component/ui/all";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    const orderId = sessionStorage.getItem("currentOrderId");

    if (paymentId && payerId && orderId) {
      dispatch(
        capturePayment({
          paymentId,
          payerId,
          orderId: JSON.parse(orderId),
        })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        } else {
          window.location.href = "/shop/payment-failed";
        }
      });
    } else {
      window.location.href = "/shop/payment-failed";
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment. Please wait...</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
