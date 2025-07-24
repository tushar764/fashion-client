

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "../shopping-view/cart-items-content";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const total = cartItems?.reduce((sum, item) => {
    const price = item.salePrice > 0 ? item.salePrice : item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full p-6 space-y-6">
      {/* Header */}
      <SheetHeader className="space-y-2">
        <SheetTitle className="text-xl font-semibold tracking-tight">
          Your Cart
        </SheetTitle>
        <SheetDescription className="text-sm text-muted-foreground">
          Items you’ve added to your shopping cart. Review and proceed to checkout.
        </SheetDescription>
      </SheetHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto custom-scroll pr-2">
        {cartItems && cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center mt-6">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Total + Checkout */}
      {cartItems && cartItems.length > 0 && (
        <div className="sticky bottom-0 bg-white pt-4 border-t border-border shadow-inner z-10">
          <div className="flex items-center justify-between mb-4 text-base font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full"
          >
            Checkout
          </Button>
        </div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
