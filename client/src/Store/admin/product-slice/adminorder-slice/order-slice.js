import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  '/order/getAllOrdersForAdmin',
  async () => {
    const response = await axios.get(`https://fashion-website-backend.vercel.app/api/admin/orders/get/`);
    return response.data;
  }
);

export const getOrdersDetailsForAdmin = createAsyncThunk(
  '/order/getOrdersDetailsForAdmin',
  async ({ id }) => {
    const response = await axios.get(`https://fashion-website-backend.vercel.app/api/admin/orders/details/${id}`);
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  '/order/updateOrderStatus',
  async ({ id, orderStatus }) => {
    const response = await axios.put(`https://fashion-website-backend.vercel.app/api/admin/orders/update/${id}`, {
      orderStatus,
    });
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      .addCase(getOrdersDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrdersDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
