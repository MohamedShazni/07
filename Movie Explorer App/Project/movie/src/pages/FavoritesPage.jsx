import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Rating, 
  IconButton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../contexts/FavoritesContext';
import { getImageUrl } from '../services/api'; // Import the image URL helper

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleViewDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>My Favorite Movies</Typography>
      
      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            You haven't added any favorite movies yet.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/')}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)' }
              }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    movie.poster_path
                      ? getImageUrl(movie.poster_path, "w500")
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
                  alt={movie.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap title={movie.title}>
                    {movie.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating 
                      value={movie.vote_average / 2} 
                      precision={0.5} 
                      readOnly 
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2">
                      {movie.vote_average?.toFixed(1) || "?"}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {movie.release_date?.substring(0, 4) || "Unknown Year"}
                  </Typography>
                  {movie.overview && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {movie.overview}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button 
                    size="small" 
                    onClick={() => handleViewDetails(movie.id)}
                  >
                    View Details
                  </Button>
                  <IconButton 
                    color="error" 
                    onClick={() => removeFavorite(movie.id)}
                    size="small"
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;