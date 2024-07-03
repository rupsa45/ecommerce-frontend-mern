import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductsCard = ({p}) => {
  const dispatch = useDispatch();
  const addToCartHandler=()=>{
    dispatch(addToCart(p));
    toast.success("Item added successfully")
  }

  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100
           text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full
           dark:bg-blue-900 dark:text-blue-300">
            {p?.brand}
          </span>
          <img 
            className="cursor-pointer w-full"
            src={p.image}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
          <HeartIcon product={p}/>
        </Link>
      </section>
      <div className="p-5">
        <div className="flex justify-between">
            <p className=" font-semibold text-blue-500">
                {p.name}
            </p>
            <p className=" font-serif text-[#B6FFFA]">
                ₹{
                    p?.price
                }
            </p>
        </div>
        <p className="mb-3 font-normal text-gray-500">
            {p?.description?.substring(0,60)}....
        </p>
        <section className="flex justify-between items-center">
            <Link
                to={`/product/${p._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium
                text-center text-white bg-[#6B48FF] rounded-lg
                hover:bg-[#8F71FF] focus:ring-4 focus:outline-none focus:ring-[#8F71FF]
                dark:bg-[#6B48FF] dark:hover:bg-[#6B48FF] dark:focus:ring-[#6B48FF]"
            >
                Read More
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
            <button
                className="p-2 rounded-full"
                onClick={() => addToCartHandler(p, 1)}
            >
                <AiOutlineShoppingCart size={25} />
            </button>
        </section>
      </div>
    </div>
  );
};

export default ProductsCard;
