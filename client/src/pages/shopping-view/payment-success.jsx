import { Card, CardHeader, CardTitle,} from "../../Component/ui/all";
import { Button } from "../../Component/ui/button";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="p-10 max-w-xl mx-auto mt-20 shadow-lg text-center">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl text-green-600">
          Payment Successful 🎉
        </CardTitle>
      </CardHeader>

      <p className="text-gray-600 mt-4">
        Thank you for your purchase. You can view your order details from your account.
      </p>

      <Button className="mt-6" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
