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
import Home from "./Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./components/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/orders/Shipping.jsx";
import PlaceOrder from "./pages/orders/PlaceOrder.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from "./pages/orders/Order.jsx";
import UserOrder from "./pages/user/UserOrder.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route index={true} path="/" element={<Home />} />
              <Route path="/favorite" element={<Favorites />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/user-orders" element={<UserOrder />} />


              <Route path="" element={<ProtectedAuthRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/order/:id" element={<Order />} />
              </Route>

              <Route path="/admin" element={<AdminRoute />}>
                <Route path="userlist" element={<UserList />} />
                <Route path="categorylist" element={<CategoryList />} />
                <Route path="productlist" element={<ProductList />} />
                <Route path="allproductslist" element={<AllProducts />} />
                <Route path="orderlist" element={<OrderList />} />
                <Route path="dashboard" element={<AdminDashboard/>}/>
                <Route
                  path="productlist/:pageNumber"
                  element={<ProductList />}
                />
                <Route path="product/update/:id" element={<ProductUpdate />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
