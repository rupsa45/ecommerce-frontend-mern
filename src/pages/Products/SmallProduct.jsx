import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"


const SmallProduct = ({product}) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
         className="h-auto rounded"
        />
        <HeartIcon product={product}/>
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className=" felx justify-between items-center">
             <div>{product.name}</div>
              <span className="bg-pink-100 text-[#7091F5]
              text-xs font-medium mr-2 px-2.5 py-0.5 
              rounded-full dark:bg-[#98E4FF]
               dark:text-[#7091F5]">₹{product.price}</span>
            </h2>
        </Link>
      </div>
    </div>
  )
}

export default SmallProduct
