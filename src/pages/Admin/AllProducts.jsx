import { Link } from "react-router-dom"
import moment from "moment"
import { useAllProductsQuery } from "../../redux/api/productApiSlice"
import AdminMenu from "./AdminMenu"
import Loader from "../../components/Loader"

const AllProducts = () => {
    const {data:products,isLoading,isError} =useAllProductsQuery()
    if(isLoading){
        return <Loader/>
    }
    if(isError){
        return <h1>Something went wrong</h1>
    }
    return (
        <div className="mx-[9rem]">
          <div className="flex sm:flex-col flex-row">
            <div className="p-3">
              <div className="ml-[2rem] text-xl font-bold h-12">
                All Products ({products.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 ">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/admin/products/update/${product._id}`}
                    className="block mb-4 overflow-hidden bg-slate-800 shadow-md rounded-lg"
                  >
                    <div className="flex">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[10rem] object-cover rounded-l-lg"
                      />
                      <div className="p-4 flex flex-col justify-around w-full">
                        <div className="flex justify-between">
                          <h5 className="text-xl font-semibold mb-2">
                            {product?.name}
                          </h5>
                          <p className="text-gray-400 text-xs">
                            {moment(product.createdAt).format("MMMM Do YYYY")}
                          </p>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                          {product?.description?.substring(0, 160)}...
                        </p>
                        <div className="flex justify-between items-center">
                          <Link
                            to={`/admin/product/update/${product._id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium 
                                           text-center text-white bg-[#615EFC] rounded-lg
                                            hover:bg-[#5C2FC2] focus:ring-4 focus:outline-none
                                             focus:ring-[#7469B6] dark:bg-[#615EFC] dark:hover:bg-[#5C2FC2]
                                              dark:focus:ring-[#7469B6]"
                          >
                            Update Product
                            <svg
                              className="w-3.5 h-3.5 ml-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                          </Link>
                          <p className="text-lg font-semibold">$ {product?.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:w-1/4 p-3 mt-2">
              <AdminMenu />
            </div>
          </div>
        </div>
      );
      
}

export default AllProducts
