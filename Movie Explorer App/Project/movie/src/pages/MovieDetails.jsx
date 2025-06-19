import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  IconButton,
  Skeleton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Link,
  Paper,
} from "@mui/material";
import {
  ArrowBack,
  PlayArrow,
  MovieOutlined,
  AccessTime,
  CalendarToday,
  Language,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useFavorites } from "../contexts/FavoritesContext"; // Import the favorites context
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchMovieRecommendations,
  getImageUrl,
} from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use our favorites context
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [movieData, creditsData, videosData, recommendationsData] =
          await Promise.all([
            fetchMovieDetails(id),
            fetchMovieCredits(id),
            fetchMovieVideos(id),
            fetchMovieRecommendations(id),
          ]);

        setMovie(movieData);
        setCredits(creditsData);

        // Filter for trailers
        const trailers = videosData.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideos(trailers);

        setRecommendations(recommendationsData.results.slice(0, 6));
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatMoney = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrailerUrl = () => {
    const trailer =
      videos.find((video) => video.type === "Trailer") || videos[0];
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  };

  const handleRecommendationClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Skeleton variant="text" width={200} sx={{ ml: 2 }} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" width="60%" />
            <Box sx={{ mt: 2 }}>
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="text"
                  width={100}
                  sx={{ mr: 1, display: "inline-block" }}
                />
              ))}
            </Box>

            <Divider sx={{ my: 4 }} />
            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <Grid container spacing={2}>
              {[...Array(4)].map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ ml: 2 }}>
            Error
          </Typography>
        </Box>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">{error}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ ml: 2 }}>
            Movie Not Found
          </Typography>
        </Box>
      </Container>
    );
  }

  // The movie data is loaded, now we need to extract the cast
  const cast = credits?.cast || [];
  const crew = credits?.crew || [];
  const director = crew.find((person) => person.job === "Director");
  const trailerUrl = getTrailerUrl();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", mb: 4, alignItems: "center" }}>
        <IconButton onClick={handleBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 2, flexGrow: 1 }}>
          Movie Details
        </Typography>
        {/* Add favorite button */}
        <IconButton 
          onClick={() => toggleFavorite(movie)} 
          color={isFavorite(movie.id) ? "error" : "default"}
          size="large"
        >
          {isFavorite(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        {/* Movie Poster */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              image={
                movie.poster_path
                  ? getImageUrl(movie.poster_path, "w500")
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={movie.title}
              sx={{ width: "100%" }}
            />
          </Card>
        </Grid>

        {/* Movie Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.title}{" "}
            {movie.release_date && (
              <Typography
                component="span"
                variant="h5"
                color="text.secondary"
              >
                ({movie.release_date.substring(0, 4)})
              </Typography>
            )}
          </Typography>

          {/* Rating and Release Date */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              sx={{ mr: 1 }}
            />
            <Typography variant="body2">
              {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
            </Typography>
          </Box>

          {/* Genres */}
          <Box sx={{ mb: 2 }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          {/* Quick facts */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <CalendarToday fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Release Date: {movie.release_date}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccessTime fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Runtime: {formatRuntime(movie.runtime)}
              </Typography>
            </Box>
            {director && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <MovieOutlined fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Director: {director.name}
                </Typography>
              </Box>
            )}
            {movie.homepage && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Language fontSize="small" sx={{ mr: 1 }} />
                <Link
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Website
                </Link>
              </Box>
            )}
          </Box>

          {/* Overview */}
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview || "No overview available."}
          </Typography>

          {/* Trailer */}
          {trailerUrl && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrow />}
              sx={{ mb: 3 }}
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Trailer
            </Button>
          )}

          {/* Additional Info */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2">Budget</Typography>
              <Typography variant="body1">
                {formatMoney(movie.budget)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2">Revenue</Typography>
              <Typography variant="body1">
                {formatMoney(movie.revenue)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle2">Original Language</Typography>
              <Typography variant="body1">
                {movie.original_language?.toUpperCase() || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          {/* Cast Section */}
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>

          {cast.length > 0 ? (
            <Grid container spacing={2}>
              {cast.slice(0, 8).map((person) => (
                <Grid item xs={6} sm={4} md={3} key={person.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      image={
                        person.profile_path
                          ? getImageUrl(person.profile_path, "w185")
                          : "https://via.placeholder.com/185x278?text=No+Image"
                      }
                      alt={person.name}
                      sx={{ height: 200, objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        noWrap
                        title={person.name}
                      >
                        {person.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        title={person.character}
                      >
                        {person.character}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No cast information available.
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            You might also like
          </Typography>
          <Grid container spacing={2}>
            {recommendations.map((rec) => (
              <Grid item xs={6} sm={4} md={2} key={rec.id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                  onClick={() => handleRecommendationClick(rec.id)}
                >
                  <CardMedia
                    component="img"
                    image={
                      rec.poster_path
                        ? getImageUrl(rec.poster_path, "w185")
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={rec.title}
                    sx={{ height: 250, objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 1 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      title={rec.title}
                    >
                      {rec.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Rating
                        value={rec.vote_average / 2}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" fontSize="small">
                        {rec.vote_average.toFixed(1)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default MovieDetails;