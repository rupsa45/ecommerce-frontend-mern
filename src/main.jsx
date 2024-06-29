import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ProtectedAuthRoute from "./ProtectedRoute/ProtectedAuthRoute.jsx";
import Profile from "./pages/user/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="" element={<ProtectedAuthRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/admin" element={<AdminRoute />}>
              <Route path="userlist" element={<UserList />} />
              <Route path="categorylist" element={<CategoryList />} />
              <Route path="productlist" element={<ProductList/>}/>
              <Route path="allproductslist" element={<AllProducts/>}/>
              <Route path="productlist/:pageNumber" element={<ProductList />} />
              <Route path="product/update/:id" element={<ProductUpdate/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
