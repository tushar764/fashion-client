import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
} from "../../Store/shop/product-slice/cart-slice/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shopProducts); // to get totalStock
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    const getProduct = productList.find((p) => p._id === getCartItem.productId);
    const totalStock = getProduct?.totalStock || 0;
    const currentQty = getCartItem.quantity;

    const newQuantity = typeOfAction === "plus" ? currentQty + 1 : currentQty - 1;

    if (newQuantity > totalStock) {
      toast.error(`Only ${totalStock} in stock. You already have ${currentQty}.`);
      return;
    }

    if (newQuantity < 1) return;

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: newQuantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item updated successfully");
      } else {
        toast.error(data?.payload?.message || "Failed to update cart");
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item deleted successfully");
      }
    });
  }

  return (
    <div className="flex items-center gap-4 rounded-md border p-3 shadow-sm">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-semibold leading-none line-clamp-2">
          {cartItem?.title}
        </h3>

        <p className="text-xs text-muted-foreground">
          In Stock:{" "}
          {
            productList.find((p) => p._id === cartItem.productId)
              ?.totalStock ?? "N/A"
          }
        </p>

        <div className="flex items-center gap-2">
          <button
            className="h-8 w-8 rounded-full border border-input bg-white"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4 text-gray-700" />
            <span className="sr-only">Decrease</span>
          </button>

          <span className="text-sm font-medium">{cartItem?.quantity}</span>

          <button
            className="h-8 w-8 rounded-full border border-input bg-white"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4 text-gray-700" />
            <span className="sr-only">Increase</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
