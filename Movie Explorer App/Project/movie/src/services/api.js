// TMDb API configuration
const API_KEY = '2907b70200e78dbb487e86db3c1852ac'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Image sizes for posters, backdrops, and profiles
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original'
  }
};

// Fetch data from TMDb API
const fetchFromTMDb = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch from TMDb:', error);
    throw error;
  }
};

// Get trending movies
export const fetchTrendingMovies = (timeWindow = 'day') => {
  return fetchFromTMDb(`/trending/movie/${timeWindow}`);
};

// Search movies by title
export const searchMovies = (query, page = 1) => {
  return fetchFromTMDb('/search/movie', { query, page });
};

// Get movie details by ID
export const fetchMovieDetails = (movieId) => {
  return fetchFromTMDb(`/movie/${movieId}`);
};

// Get movie credits (cast & crew)
export const fetchMovieCredits = (movieId) => {
  return fetchFromTMDb(`/movie/${movieId}/credits`);
};

// Get movie videos (trailers, teasers, etc.)
export const fetchMovieVideos = (movieId) => {
  return fetchFromTMDb(`/movie/${movieId}/videos`);
};

// Get movie recommendations
export const fetchMovieRecommendations = (movieId, page = 1) => {
  return fetchFromTMDb(`/movie/${movieId}/recommendations`, { page });
};

// Build complete image URL
export const getImageUrl = (path, size = 'original') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${size}${path}`;
};

// Get genre name from ID
export const getGenreName = async (genreId) => {
  const genresData = await fetchFromTMDb('/genre/movie/list');
  const genre = genresData.genres.find(g => g.id === genreId);
  return genre ? genre.name : 'Unknown';
};

// Get all movie genres
export const fetchAllGenres = () => {
  return fetchFromTMDb('/genre/movie/list');
};