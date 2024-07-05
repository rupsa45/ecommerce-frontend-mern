import { toast } from "react-toastify";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import { clearCart } from "../../redux/features/cart/cartSlice";
import {  useCreateOrderMutation } from "../../redux/api/OderSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from '../../components/Loader'

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] =  useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      };

      const res = await createOrder(orderData).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="w-[80%] mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-right">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 text-right">{item.qty}</td>
                    <td className="p-2 text-right">₹{item.price}</td>
                    <td className="p-2 text-right">₹{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-gray-800">
            <ul className="text-lg ">
              <li>
                <span className="font-semibold mb-4">Items:</span>
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> $
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> $
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> $
                {cart.totalPrice}
              </li>
            </ul>
            {error && <Message variant="danger">{error.data.message}</Message>}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address} {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode} {cart.shippingAddress.country}{" "}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={placeOrderHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={cart.cartItems ===0}
          >
            Place Order
          </button>
          {
            isLoading  && <Loader/>
          }
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
