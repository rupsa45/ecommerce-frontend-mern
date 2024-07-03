import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider {...settings} className="w-[56rem] sm:w-[40rem] sm:block">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[25rem]"
                />
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex-1 mr-4">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-lg font-semibold text-green-500">₹{price}</p>
                    <p className="mt-2 text-gray-700">{description.substring(0, 170)}...</p>
                  </div>
                  <div className="flex flex-col justify-between flex-none w-full sm:w-96 mt-4 sm:mt-0">
                    <div className="flex justify-between">
                      <div className="mb-4 mr-4">
                        <h1 className="flex items-center text-lg mb-2">
                          <FaStore className="mr-2 text-blue-500" /> Brand: {brand}
                        </h1>
                        <h1 className="flex items-center text-lg mb-2">
                          <FaClock className="mr-2 text-blue-500" /> Added: {moment(createdAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center text-lg mb-2">
                          <FaStar className="mr-2 text-blue-500" /> Reviews: {numReviews}
                        </h1>
                      </div>
                      <div className="mb-4">
                        <h1 className="flex items-center text-lg mb-2">
                          <FaStar className="mr-2 text-yellow-500" /> Rating: {Math.round(rating)}
                        </h1>
                        <h1 className="flex items-center text-lg mb-2">
                          <FaShoppingCart className="mr-2" /> Quantity: {quantity}
                        </h1>
                        <h1 className="flex items-center text-lg">
                          <FaBox className="mr-2 " /> In Stock: {countInStock}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
