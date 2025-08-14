import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ movies, favouriteComponent, handleFavouritesClick }) => {
  const navigate = useNavigate();
  const FavoriteComponent = favouriteComponent;

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          handleClick={() => navigate(`/movie/${movie.imdbID}`)}
          favoriteComponent={<FavoriteComponent />}
          onFavoriteClick={() => handleFavouritesClick(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;