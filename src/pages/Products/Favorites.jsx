import { useSelector } from "react-redux"
import { selectFavoriteProducts } from "../../redux/features/favorites/favoriteSlice"
import Product from "./Product"

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProducts)
  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg  font-bold ml-[3rem] mt-[3rem]">
        Favorites Products
      </h1>
      <div className="flex flex-wrap">
        {favorites.map((product) => (
            <Product key={product._id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default Favorites
