import { useEffect,useState } from "react"
import {
    savePaymentMethod,
    saveShippingAddress
} from '../../redux/features/cart/cartSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "../../components/ProgressSteps";


const Shipping = () => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart
    const [paymentMethod,setPaymentMethod] = useState('PayPal');
    const [address,setaddress] = useState(shippingAddress.address || '')
    const [city,setcity] = useState(shippingAddress.city || '')
    const [postalCode,setpostalCode] = useState(shippingAddress.postalCode || '')
    const [country,setcountry] = useState(shippingAddress.country || '')


    const dispatch = useDispatch()
    const navigate = useNavigate()

    //payment
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[navigate,shippingAddress])
    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <div className="container mx-auto mt-10">
        <ProgressSteps step1 step2 />
      <div className="mx-[10rem] flex justify-around items-center flex-wrap">
        <form  onSubmit= {submitHandler}  className="w-[40rem]">
            <h1 className="text-2xl font-semibold mb-4">
                Shipping Address
            </h1>
            <div className="mb-4">
                <label className="block text-wjite mb-2 font-serif">
                    Address
                </label>
                <input 
                 type="text"
                 className="w-full border p-2 rounded bg-gray-800"
                 placeholder="Enter address"
                 value={address}
                 required
                 onChange={(e)=>setaddress(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-wjite mb-2 font-serif">
                    City
                </label>
                <input 
                 type="text"
                 className="w-full border p-2 rounded bg-gray-800"
                 placeholder="Enter city"
                 value={city}
                 required
                 onChange={(e)=>setcity(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-wjite mb-2 font-serif">
                    Postal Code
                </label>
                <input 
                 type="text"
                 className="w-full border p-2 rounded bg-gray-800"
                 placeholder="Enter postalCode"
                 value={postalCode}
                 required
                 onChange={(e)=>setpostalCode(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-wjite mb-2 font-serif">
                    Country
                </label>
                <input 
                 type="text"
                 className="w-full border p-2 rounded bg-gray-800"
                 placeholder="Enter country"
                 value={country}
                 required
                 onChange={(e)=>setcountry(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label  className="block text-gray-400">
                    Select Method
                </label>
                <div className="mt-2">
                    <label className="inline-flex items-center">
                        <input 
                            type="radio"
                            className="form-radio text-blue-500"
                            name ="paymentMethod"
                            value="Paypal"
                            checked={paymentMethod === "Paypal"}
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                        />
                        <span className="ml-2">
                            Paypal or Credit Card
                        </span>
                    </label>
                </div>
            </div>
            <button 
                className="bg-indigo-500 py-2 px-4 rounded-full text-lg w-full text-white font-serif"
                type="submit"
            >
                Continue
            </button>
        </form>
      </div>
    </div>
  )
}

export default Shipping
