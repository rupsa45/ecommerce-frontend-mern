import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      // Check if the product is not already in favorites
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      // Remove the product with the matching ID
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      // Set the favorites from action payload (e.g., from localStorage)
      return action.payload;
    }
  }
});

export const { addFavorite, removeFavorite, setFavorites } = favoriteSlice.actions;

// Selector to get all favorite products
export const selectFavoriteProducts = (state) => state.favorites;

export default favoriteSlice.reducer;
