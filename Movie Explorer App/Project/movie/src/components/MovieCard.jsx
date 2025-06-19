import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  CardActions,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useFavorites } from "../contexts/FavoritesContext";

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

  return (
    <Card sx={{ maxWidth: 250, m: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="350"
        image={movie.poster || "https://via.placeholder.com/250x350?text=No+Image"}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {movie.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}>
          <IconButton onClick={handleFavoriteClick} color="error">
            {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
