import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/OderSlice";

export default function UserOrder() {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className=" w-[80%] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.message}
        </Message>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] mb-5"
                />
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2">{order.totalPrice}</td>
                <td className="py-2">
                  {order.isPaid ? (
                    <p className="text-green-500 font-bold">Paid</p>
                  ) : (
                    <p className="text-red-500 font-bold">Not Paid</p>
                  )}
                </td>
                <td className="py-2">
                  {order.isDelivered ? (
                    <p className="text-green-500 font-bold">Delivered</p>
                  ) : (
                    <p className="text-red-500 font-bold">Not Delivered</p>
                    
                  )}
                </td>
                <td className="px-2 py-2">
                    <Link to={`/order/${order._id}`}>
                        <button className="bg-[#3FA2F6] text-black font-bold py-2 px-3 rounded">
                            View Details
                        </button>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
