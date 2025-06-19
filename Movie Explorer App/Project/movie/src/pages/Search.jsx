import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Rating,
  TextField,
  InputAdornment,
  Button,
  Pagination,
  Skeleton,
  CircularProgress,
  Chip
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { searchMovies, getImageUrl } from '../services/api';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        setTotalPages(0);
        setTotalResults(0);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const data = await searchMovies(searchQuery, page);
        
        setResults(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDb API limits to 500 pages
        setTotalResults(data.total_results);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Failed to search movies. Please try again later.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
    // Update URL when search query changes
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}&page=${page}`, { replace: true });
    }
  }, [searchQuery, page, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputQuery);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const renderSkeletons = () => {
    return Array(8).fill().map((_, idx) => (
      <Grid item xs={6} sm={4} md={3} key={`skeleton-${idx}`}>
        <Card sx={{ height: '100%' }}>
          <Skeleton variant="rectangular" height={250} />
          <CardContent>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  const renderMovies = () => {
    return results.map((movie) => (
      <Grid item xs={6} sm={4} md={3} key={movie.id}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.03)'
            }
          }}
          onClick={() => handleMovieClick(movie.id)}
        >
          <CardMedia
            component="img"
            image={
              movie.poster_path 
                ? getImageUrl(movie.poster_path, 'w342') 
                : 'https://via.placeholder.com/342x513?text=No+Image'
            }
            alt={movie.title}
            sx={{ height: 250, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="body1" component="div" noWrap title={movie.title}>
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.release_date 
                ? new Date(movie.release_date).getFullYear() 
                : 'N/A'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Rating
                name={`rating-${movie.id}`}
                value={movie.vote_average / 2}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Search Form */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for movies..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: isLoading ? (
                  <InputAdornment position="end">
                    <CircularProgress color="inherit" size={20} />
                  </InputAdornment>
                ) : null
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              type="submit" 
              variant="contained"
              fullWidth
              sx={{ height: '100%' }}
              disabled={isLoading || !inputQuery.trim()}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results Header */}
      {searchQuery && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Search Results for "{searchQuery}"
          </Typography>
          {totalResults > 0 && (
            <Typography variant="body1" color="text.secondary">
              Found {totalResults} movies
            </Typography>
          )}
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && searchQuery && results.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6">
            No movies found for "{searchQuery}"
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Try using different keywords or check your spelling
          </Typography>
        </Box>
      )}

      {/* Results Grid */}
      <Grid container spacing={3}>
        {isLoading ? renderSkeletons() : renderMovies()}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
}

export default Search;