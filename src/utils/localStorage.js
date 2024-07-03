

// Add a product to the favorites in localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();

    if (!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

// Remove a product from the favorites in localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter((p) => p._id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

// Get the list of favorite products from localStorage
export const getFavoritesFromLocalStorage = () => {
    try {
        const favoritesJSON = localStorage.getItem("favorites");
        return favoritesJSON ? JSON.parse(favoritesJSON) : [];
    } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
        return [];
    }
};
