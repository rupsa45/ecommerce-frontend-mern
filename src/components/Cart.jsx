import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="flex justify-around items-start flex-wrap mx-auto mt-8">
            {cartItems.length === 0 ? (
                <div>
                    Your cart is empty {" 7"}
                    <Link to="/shop" className="font-serif text-red-700">
                        Go To Shop
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col w-[80%]">
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center mb-4 pb-2">
                            <div className="w-[5rem] h-[5rem]">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="flex-1 ml-4">
                                <Link to={`/product/${item._id}`} className="text-blue-500">
                                    {item.name}
                                </Link>
                                <div className="mt-1 text-white">{item.brand}</div>
                                <div className="mt-1 text-white">₹{item.price}</div>
                            </div>
                            <div className="w-24 bg-gray-800">
                                <select 
                                    className="w-full p-1 border rounded text-black bg-gray-800" 
                                    value={item.qty} // Ensuring the selected value matches the current quantity
                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button 
                                    className="text-red-500 mr-[5rem]"
                                    onClick={() => removeFromCartHandler(item._id)}
                                >
                                    <FaTrash className="ml-[1rem] mt-[.5rem]" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 w-[40rem]">
                        <div className="p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">
                                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                            </h2>
                            <div className="text-2xl font-bold">
                                ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                            </div>
                            <button 
                                className="bg-blue-600 mt-4 px-1 py-2 rounded-full text-white text-lg w-full"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
