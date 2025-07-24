import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null
};

export const createNewOrder = createAsyncThunk(
  '/order/createNewOrder',
  async (orderData) => {
    const response = await axios.post('https://fashion-website-backend.vercel.app/api/shop/order/create', orderData);
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  '/order/capturePayment',
  async ({ paymentId, payerId, orderId }) => {
    const orderData = { paymentId, payerId, orderId };
    const response = await axios.post('https://fashion-website-backend.vercel.app/api/shop/order/capture', orderData);
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  '/order/getAllOrdersByUserId',
  async ({ userId }) => {
    const response = await axios.get(`https://fashion-website-backend.vercel.app/api/shop/order/list/${userId}`);
    return response.data;
  }
);

export const getOrdersDetails = createAsyncThunk(
  '/order/getOrdersDetails',
  async ({ id }) => {
    const response = await axios.get(`https://fashion-website-backend.vercel.app/api/shop/order/details/${id}`);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: 'shoppingOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvedURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId));
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })

      // Get Orders by User
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      // Get Order Details
      .addCase(getOrdersDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrdersDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  }
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
