import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogDescription
} from "../ui/checkbox";
import { Button } from "../ui/button";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/all";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { setProductDetails } from "../../Store/shop/product-slice/index2";
import StarRatingComponent from '../../Component/common/star-rating';
import {
  addReview,
  getReviews
} from "../../Store/shop/product-slice/review-slice/review-slice";
import {
  addToCart,
  fetchCartItems
} from "../../Store/shop/product-slice/cart-slice/cart-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    const getCartItems = cartItems || [];
    const currentCartItem = getCartItems.find((item) => {
      const id = item.productId || item.product?._id;
      return id === getCurrentProductId;
    });

    const currentQuantity = currentCartItem?.quantity || 0;

    if (currentQuantity + 1 > getTotalStock) {
      toast.error(`Only ${getTotalStock} items in stock. You already have ${currentQuantity} in cart.`);
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews({ id: productDetails?._id }));
        toast.success("Review added successfully");
      } else {
        toast.error(data?.error?.message || "Something went wrong");
      }
    });
  };

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews({ id: productDetails._id }));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
      : 0;

  if (!productDetails) return null;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid lg:grid-cols-2 grid-cols-1 gap-8 sm:p-6 max-h-[90vh] overflow-y-auto max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg max-h-[400px]">
          <img
            src={productDetails?.image}
            alt={productDetails?.title || "Product Image"}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="grid gap-6">
          <DialogTitle className="text-3xl font-extrabold">{productDetails?.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{productDetails?.description}</DialogDescription>

          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted">${productDetails?.salePrice}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">{averageReview.toFixed(2)}</span>
          </div>

          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full mt-5 mb-5"
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
              >
                Add Cart
              </Button>
            )}
          </div>

          <Separator />

          <div className="max-h-[200px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, i) => (
                  <div className="flex gap-4" key={i}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>{reviewItem?.userName?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">{reviewItem?.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Reviews</p>
              )}
            </div>
          </div>

          <div className="mt-10 flex-col gap-2">
            <Label>Write a review</Label>
            <div className="flex">
              <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
            </div>
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(event) => setReviewMsg(event.target.value)}
              placeholder="Write a review"
            />
            <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
