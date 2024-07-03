import ProductCarousel from "../pages/Products/ProductCarousel"
import SmallProduct from "../pages/Products/SmallProduct"
import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import Loader from "./Loader"

const Header = () => {
    const {data:products,isLoading,error}=useGetTopProductsQuery()
    if(isLoading){
        return <Loader/>
    }
    if(error){
        return <h1>Something went wrong</h1>
    }
  return (
    <>
        <div className="flex justify-around">
            <div className="xl:block lg:hidden  md:hidden sm:hidden">
                <div className="grid grid-cols-2">
                    {
                        products.map((product)=>{
                            return <SmallProduct
                              key={product._id} 
                              product={product} 
                              />
                        })
                    }
                </div>
            </div>
            <ProductCarousel/>
        </div> 
    </>
  )
}

export default Header
