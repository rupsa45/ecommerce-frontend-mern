import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetMyOrdersQuery } from "../../redux/api/OderSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <table className="w-[70%] mx-auto">
          <AdminMenu />
          <thead className="w-full border">
            <tr className="mb-[5rem]">
              <th className="text-left pl-1">ITEMS</th>
              <th className="text-left pl-1">ID</th>
              <th className="text-left pl-1">USER</th>
              <th className="text-left pl-1">DATA</th>
              <th className="text-left pl-1">TOtal</th>
              <th className="text-left pl-1">PAID</th>
              <th className="text-left pl-1">DELIVER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>
                <td>{order.user ? order.user.username : "N/A"}</td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td>$ {order.totalPrice}</td>
                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className=" text-center text-green-400 ">
                      Completed
                    </p>
                  ) : (
                    <p className=" text-center text-red-400 ">
                      Pending
                    </p>
                  )}
                </td>
                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className=" text-center text-green-400 ">
                      Completed
                    </p>
                  ) : (
                    <p className=" text-center text-red-400 ">
                      Pending
                    </p>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className=" font-bold">More..</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
