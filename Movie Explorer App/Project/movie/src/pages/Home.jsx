import MovieCard from '../components/MovieCard';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Rating,
  Skeleton,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../services/api';

function Home({ trendingMovies, isLoading }) {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const renderSkeletons = () => {
    return Array(12).fill().map((_, idx) => (
      <Grid item xs={6} sm={4} md={3} lg={2} key={`skeleton-${idx}`}>
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
    return trendingMovies.map((movie) => (
      <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
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
            image={getImageUrl(movie.poster_path, 'w342')}
            alt={movie.title}
            sx={{ height: 250, objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/342x513?text=No+Image';
            }}
          />
          <CardContent>
            <Typography variant="body1" component="div" noWrap>
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Trending Movies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover the most popular movies right now
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {isLoading ? renderSkeletons() : renderMovies()}
      </Grid>

      {!isLoading && trendingMovies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No trending movies found
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Home;