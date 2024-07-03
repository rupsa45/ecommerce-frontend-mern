import { Link,useParams } from "react-router-dom"
import { useGetProductsQuery } from "./redux/api/productApiSlice"
import Loader from "./components/Loader"
import Header from "./components/Header"
import Message from "./components/Message"
import Product from "./pages/Products/Product"

const Home = () => {
    const{keyword} =useParams()
    const {data,isLoading,isError} = useGetProductsQuery({keyword})
    console.log(data);
  return (
    <>
      {
        !keyword ? <Header/> : null
      }
      {
        isLoading? (<Loader/>) :isError ? ( <Message variant="danger"> {isError.data} </Message>) : 
        (
          <>
            <div className="flex justify-between items-center">
              <h1 className="ml-[20rem] mt-[5rem] text-[3rem]">
                Special Products
              </h1>
              <Link to="/" className="bg-blue-600 text-white font-bold 
                rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">
                Shop
              </Link>
            </div>
            <div>
              <div className="flex justify-center flex-wrap mt-[2rem]">
                {data.products.map((product) => (
                    <div key={product._id}>
                      <Product product={product}/>
                    </div>
                  ))}
                </div>
            </div>
          </>
        )

      }
    </>
  )
}

export default Home
