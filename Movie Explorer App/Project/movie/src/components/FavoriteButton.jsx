import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from '../contexts/FavoritesContext';

function FavoriteButton({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClick = () => {
    toggleFavorite(movie);
  };

  return (
    <Tooltip title={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}>
      <IconButton onClick={handleClick} color="error">
        {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
}

export default FavoriteButton;