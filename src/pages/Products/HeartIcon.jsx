import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    addFavorite,
    removeFavorite,
    setFavorites,
} from '../../redux/features/favorites/favoriteSlice'
import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from '../../utils/localStorage'

export default function HeartIcon({product}) {
    const dispatch =useDispatch()
    const favorites =useSelector(state => state.favorites) || []
    const isFavorites=  favorites.some(p=>p._id === product._id)
    useEffect(()=>{
        const favoritesFromLocalStorage =getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage));

    },[dispatch])
    const toggleFavorites =()=>{
        if(isFavorites){
            dispatch(removeFavorite(product))
            //remove the product from the localStorage
            removeFavoriteFromLocalStorage(product._id)
        }
        else{
            dispatch(addFavorite(product))
            //add the product to localstorage as well
            addFavoriteToLocalStorage(product)
        }
    }
  return (
    <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
      {
        isFavorites ? (<FaHeart className="text-red-500"/>):(
            <FaRegHeart className="text-white"/>
        )
      }
    </div>
  )
}
