import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/auth-slice'; 
import adminProductsSlice from './admin/product-slice';
import adminOrderSlice from './admin/product-slice/adminorder-slice/order-slice';
import shopProductsSlice from "./shop/product-slice/index2";
import shoppingCartSlice from "./shop/product-slice/cart-slice/cart-slice"; 

import shopAddressSlice from './shop/product-slice/address-slice/address-slice';

import shopOrderSlice from './shop/product-slice/order-slice/order-slice';
import shopSearchSlice from './shop/product-slice/search-slice/search-slice';
import shopReviewSlice from './shop/product-slice/review-slice/review-slice';
import commonFeatureSlice from './common-slice/common-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,

    shopProducts: shopProductsSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
   
  },
});

export default store;
