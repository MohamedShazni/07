import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the app starts
  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
        // Reset corrupted data
        localStorage.removeItem('movieFavorites');
        setFavorites([]);
      }
    }
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some(movie => Number(movie.id) === Number(movieId));
  };

  // Add a movie to favorites with all necessary data
  const addFavorite = (movie) => {
    if (!isFavorite(movie.id)) {
      // Ensure we keep all essential properties for display
      const movieToSave = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview || "",
        genre_ids: movie.genre_ids || [],
        genres: movie.genres || []
      };
      
      setFavorites(prevFavorites => [...prevFavorites, movieToSave]);
    }
  };

  // Remove a movie from favorites
  const removeFavorite = (movieId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(movie => Number(movie.id) !== Number(movieId))
    );
  };

  // Toggle favorite status
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        isFavorite, 
        addFavorite, 
        removeFavorite, 
        toggleFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext };