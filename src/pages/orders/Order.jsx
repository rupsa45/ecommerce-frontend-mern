
import { PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import {
    useDeliverOrderMutation,
    useGetOrderDetailsQuery,
    useGetPaypalClientIdQuery,
    usePayOrderMutation
}  from '../../redux/api/OderSlice'
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"


export default function Order() {
    const { id : orderId } = useParams()
    const { data : order,refetch,error,isLoading} =useGetOrderDetailsQuery(orderId);
    const [deliverOrder,{isLoading:loadingDeliver}]=useDeliverOrderMutation()
    const [payOrder,{isLoading:loadingPay}]=usePayOrderMutation()
    const { userInfo } =useSelector((state)=> state.auth);
    const [{isPending},paypayDispatch] = usePayPalScriptReducer()
    const {
        data: paypal,
        isLoading:loadingPayPal,
        error : errorPayPal
    }= useGetPaypalClientIdQuery()
    useEffect(()=>{
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
          const loadingPayPalScript = async()=>{
            paypayDispatch({
                type:"resetOptions",
                value: {
                    "client-id":paypal.clientId,
                    "currency": "USD"
                }
            })
            paypayDispatch({type:"setLoadingStatus",value:'pending'})
          }
          if(order && !order.isPaid){
            if(!window.paypal){
                loadingPayPalScript()
            }
          }
        }
    },[errorPayPal,loadingPayPal,order,paypal,paypayDispatch])

  const onApprove =(data,action)=>{
    return action.order.capture().then(async (details)=>{
        try {
            await payOrder({orderId,details})
            refetch()
            toast.success("order is pain")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    })
  }
    const createOrder =(data,actions)=>{
        return actions.order.create({
            purchase_units:[{amount: {value: order.totalPrice}}]
        }).then((orderId)=>{
            return orderId
        })
    }

    const onError=(error)=>{
        toast.error(error?.data?.message || error.message)
    }

    const deliverHandler = async()=>{
        await deliverOrder(orderId)
        refetch()
    }
  return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error.data.message || error.toString()}</Message>
    ) : (
        <div className=" flex flex-col ml-[10rem] md:flex-row">
            <div className="md:w-2/3 pr-4">
                <div className="border gray-300 mt-5 pb-4 mb-5">
                    {order.orderItems.length === 0 ? (
                        <Message>Order is empty</Message>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-[80%]">
                                <thead className="border-b-2">
                                    <tr>
                                        <th className="p-2">Image</th>
                                        <th className="p-2">Product</th>
                                        <th className="p-2 text-center">Quantity</th>
                                        <th className="p-2">Unit Price</th>
                                        <th className="p-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((item) => (
                                        <tr key={item.product}>
                                            <td className="p-2">
                                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover"/>
                                            </td>
                                            <td className="p-2">{item.name}</td>
                                            <td className="p-2 text-center">{item.qty}</td>
                                            <td className="p-2">₹{item.price}</td>
                                            <td className="p-2">₹{item.qty * item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <div className="md:w-1/3.5  font-mono">
                <div className="mt-5 border-gray-300 pb-4 mb-4">
                    <h2 className="text-xl font-bold mb-2 text-white">
                        Shipping
                    </h2>
                    <p className="mb-4 mt-4">
                        <strong className="text-white" > Order:</strong>{" "}{order._id}
                    </p>
                    <p className="mb-4 mt-4">
                        <strong className="text-white" > Name:</strong>{" "}{order.user.username}
                    </p>
                    <p className="mb-4 mt-4">
                        <strong className="text-white" > Email:</strong>{" "}{order.user.email}
                    </p>
                    <p className="mb-4">
                        <strong className="text-white">Shipping Address:</strong>
                        {" "}{order.shippingAddress.address}
                        {" "}{order.shippingAddress.city}
                        {" "}{order.shippingAddress.postalCode}
                        {" "}{order.shippingAddress.country}
                    </p>
                    <p className="mb-4">
                        <strong className="text-white">Payment Method:</strong>
                        {" "}{order.paymentMethod}
                    </p>
                    {
                        order.isPaid ?(
                            <Message variant='success'>
                                Paid on {order.paidAt.substring(0, 10)}
                            </Message>
                        ):(
                            <Message variant='danger'>Not paid</Message>
                        )
                    }
                </div>
                <h2 className="text-xl font-bold mb-2 mt-[1rem] text-white">
                    order Summary
                </h2>
                <div className="flex justify-between mb-2">
                    <span>Items</span>
                    <span>{order.itemsPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Shipping Price</span>
                    <span>{order.shippingPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Tax</span>
                    <span>{order.taxPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Total</span>
                    <span>{order.totalPrice}</span>
                </div>
                {!order.isPaid && (
                    <div className="text-center">
                        {
                            loadingPay && <Loader/>
                        }
                        { isPending ?  <Loader/> : <div>
                            <div>
                                <PayPalButtons 
                                    createOrder={createOrder} 
                                    onApprove={onApprove}
                                    onError={onError}
                                ></PayPalButtons>
                            </div>
                        </div>  }

                    </div>
                )}  
                 {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <div>
                        <button
                        type="button"
                        className="bg-blue-500 text-white w-full py-2 "
                        onClick={deliverHandler}
                        >
                        Mark As Delivered
                        </button>
                    </div>
                    )} 
            </div>
        </div>
    );
}
