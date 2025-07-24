import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  reviews: [],
};

export const getReviews = createAsyncThunk(
  'search/getReviews',
  async ({ id }) => {
    const response = await axios.get(`https://fashion-website-backend.vercel.app/api/shop/review/${id}`);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  'search/addReview',
  async (formdata) => {
    const response = await axios.post(`https://fashion-website-backend.vercel.app/api/shop/review/add`, formdata);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
