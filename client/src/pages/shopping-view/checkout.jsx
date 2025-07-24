import { useDispatch, useSelector } from 'react-redux';
import img from '../../assets/account.jpg';
import Address from "../../Component/shopping-view/address";
import UserCartItemsContent from '../../Component/shopping-view/cart-items-content';
import { Button } from '../../Component/ui/button';
import React, { useState, useEffect } from 'react';
import { createNewOrder } from '../../Store/shop/product-slice/order-slice/order-slice';
import { toast } from 'sonner';

function ShoppingCheckout() {
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector(state => state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectAddress] = useState(null)
  const dispatch = useDispatch()
  const [isPaymentStart, setIsPaymentStart] = useState(false)

  console.log(currentSelectedAddress, "cartItems")

  function handleInitiatePaypalPayment() {

    if (cartItems.length === 0) {
    toast.error('Your cart is empty Please add items to proceed');
    return; // 🛑 Prevent continuing to order creation
  }

   if (currentSelectedAddress === null) {
    toast.error('Please select an address to proceed');
    return; // 🛑 Prevent continuing to order creation
  }
    const orderData = {
      userId: user?.id,
      cartId:cartItems?._id,

      cartItems: cartItems.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
    addressId: currentSelectedAddress?._id,
    address: currentSelectedAddress?.address,
    city: currentSelectedAddress?.city,
    pincode: currentSelectedAddress?.pincode, // ✅ FIXED
    phone: currentSelectedAddress?.phone,     // ✅ ADDED
    notes: currentSelectedAddress?.notes,
  },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      // totalAmount: 'total',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    }

    console.log(orderData);
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "tushar");
      if (data?.payload?.success) {
        setIsPaymentStart(true)
      } else {
        setIsPaymentStart(false)
      }
    })
  }
  // if(approvalURL){
  //   window.location.href=approvalURL
  // }

  useEffect(() => {
    if (isPaymentStart && approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL, isPaymentStart]);



  const totalCartAmount =
    cartItems?.length > 0
      ? cartItems.reduce(
        (sum, item) =>
          sum +
          (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
        0
      )
      : 0;


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-[250px] w-full overflow-hidden shadow-md">
        <img
          src={img}
          alt="Product"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl font-semibold">Checkout</h1>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-6 pb-10">
        {/* Address Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Address</h2>
          <Address 
          selectedId={currentSelectedAddress}
          setCurrentSelectAddress={setCurrentSelectAddress} />
        </div>

        {/* Cart Items Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Cart</h2>

          {cartItems?.length > 0 ? (
            <>
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <UserCartItemsContent
                    key={item._id || item.productId}
                    cartItem={item}
                  />
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-700">
                  <span>Total</span>
                
                  <span className="font-bold">${totalCartAmount.toFixed(2)}</span>


                </div>
              </div>
              <div className='mt-4 w-full' >
                <Button onClick={handleInitiatePaypalPayment}
                  className="w-full">{
                    isPaymentStart ? 'Processing  Paypal payment': 'Checkout with paypal'
                  }</Button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">No items in cart.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
