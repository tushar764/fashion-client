import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  addressList: [],
};

// POST /add
export const addNewAddress = createAsyncThunk(
  '/address/addNewAddress',
  async (formData) => {
    const response = await axios.post(
      'https://fashion-website-backend.vercel.app/api/shop/address/add',
      formData
    );
    return response.data;
  }
);

// GET /get/:userId
export const fetchAllAddress = createAsyncThunk(
  '/address/fetchAllAddress',
  async (userId) => {
    const response = await axios.get(
      `https://fashion-website-backend.vercel.app/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

// PUT /update/:userId/:addressId
export const editAddress = createAsyncThunk(
  '/address/editAddress',
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `https://fashion-website-backend.vercel.app/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

// DELETE /delete/:userId/:addressId
export const deleteAddress = createAsyncThunk(
  '/address/deleteAddress',
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `https://fashion-website-backend.vercel.app/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          state.addressList.push(action.payload.data);
        }
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
