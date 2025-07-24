import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// ✅ Fetch feature images
export const getFeatureImages = createAsyncThunk(
  'common/getFeatureImages',
  async () => {
    const response = await axios.get(
      'https://fashion-website-backend.vercel.app/api/common/feature/get'
    );
    return response.data;
  }
);

// ✅ Add a new feature image
export const addFeatureImage = createAsyncThunk(
  'common/addFeatureImage',
  async (image) => {
    const response = await axios.post(
      'https://fashion-website-backend.vercel.app/api/common/feature/add',
      { image }
    );
    return response.data;
  }
);

// ✅ Slice
const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
