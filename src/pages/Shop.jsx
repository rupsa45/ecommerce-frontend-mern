import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import { useGetCategoriesQuery } from "../redux/api/categoryApiSlice";
import ProductsCard from "./Products/ProductsCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useGetCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!filteredProductQuery.isLoading && filteredProductQuery.data) {
      const filteredProducts = filteredProductQuery.data.filter((product) => {
        return (
          product.price.toString().includes(priceFilter) ||
          product.price === parseInt(priceFilter, 10)
        );
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [
    checked,
    radio,
    filteredProductQuery.data,
    filteredProductQuery.isLoading,
    dispatch,
    priceFilter,
  ]);

  const handleBrandClick = (brand) => {
    if (filteredProductQuery.data) {
      const productsByBrand = filteredProductQuery.data.filter(
        (product) => product.brand === brand
      );
      dispatch(setProducts(productsByBrand));
    }
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...new Set(
      filteredProductQuery.data?.map((product) => product.brand).filter(Boolean)
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  if (categoriesQuery.isLoading || filteredProductQuery.isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-[4rem]">
      <div className="flex flex-row">
        <div className="bg-gray-800 p-3 mt-1 mb-2">
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
            <span>Filter By Category</span>
          </h2>
          <div className="p-5 w-[15rem]">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
                <div className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    id={`checkbox-${c._id}`}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
                     focus:ring-blue-500 dark:focus:ring-blue-600
                     dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="pink-checkbox"
                    className="ml-2 text-gray-300 font-serif "
                  >
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
            Filter by Brands
          </h2>
          <div className="p-5">
            {uniqueBrands.map((brand) => (
              <>
                <div className="flex items-center mr-4 mb-5">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300
                             focus:ring-blue-500 dark:focus:ring-blue-600
                              dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                               dark:border-gray-600"
                  />
                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-gray-300 font-serif"
                  >
                    {brand}
                  </label>
                </div>
              </>
            ))}
          </div>
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
            Filer by Price
          </h2>

          <div className="p-5 w-[15rem]">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 bg-gray-800 placeholder-blue-400 border border-blue-400
              rounded-lg focus:outline-none focus:ring "
            />
          </div>
          <div className="p-5 pt-0">
            <button  
                className="w-full border my-4 border-black rounded-sm"
                onClick={() => window.location.reload()}
            >Reset</button>
          </div>
        </div>
        <div className="p-3">
            <h2 className="h4 text-center mb-2">
                {
                    products?.length
                }{" "}Products
            </h2>
            <div className="flex flex-wrap">
                {products.length ===0 ?(
                    <Loader/>
                ):(
                    products?.map((p)=>(
                        <div className="p-3" key={p._id}>
                            <ProductsCard p={p} key={p._id} />
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
