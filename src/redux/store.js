import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apislice";
import authReducer from './features/auth/authSlice'
import favoritesReducers from "./features/favorites/favoriteSlice";
import {getFavoritesFromLocalStorage} from '../utils/localStorage'
import cartSliceReducer from "./features/cart/cartSlice";
import shopSliceReducer from "./features/shop/shopSlice";

const initialFavorites=getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        favorites:favoritesReducers,
        cart:cartSliceReducer,
        shop:shopSliceReducer
    },
    preloadedState:{
        favorites:initialFavorites
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})
setupListeners(store.dispatch);
export default store;