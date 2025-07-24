import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AlertContext } from "./Component/common/AlertContext";
import Alert from "./Component/common/Alert";

import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthLayout from "./Component/auth/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminLayout from "./Component/admin-view/layout";
import ShoppingLayout from "./Component/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import CheckAuth from "./Component/common/check-auth";
import UnauthPage from "./pages/unauth-page/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./Store/auth-slice/auth-slice";
import { Skeleton } from "./Component/ui/skeleton";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";


function App() {
  const { alert } = useContext(AlertContext);

  // const isAuthenticated = false;
  // const user = null;
  // const {user,isAuthenticated}= useSelector(state=>state.auth)
  const { user, isAuthenticated,isLoading} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  
  if(isLoading) return <Skeleton className="w-[800] bg-black h-[600px] " />


  console.log(isLoading,user);


  return (
    <>
      <ToastContainer />
      <Alert alert={alert} /> {/* ✅ Integrated Alert Component */}
      {/* <h1>Header component</h1> */}

      <Routes>
        {/* <Route path="/" element={<AuthLayout />} /> */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />


        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route index element={<AuthLogin />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />

          <Route path="home" element={<ShoppingHome />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </>
  );
}

export default App;
