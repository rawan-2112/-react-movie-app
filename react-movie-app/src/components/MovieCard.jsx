const MovieCard = ({ movie, handleClick, favoriteComponent, onFavoriteClick }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/images/IMG_3733.jpeg'}
        alt={movie.Title}
        className="movie-poster"
        onClick={handleClick}
      />
      <div className="movie-info">
        <h3 className="movie-title" onClick={handleClick}>{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
        <div 
          className="favorite-button" 
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
        >
          {favoriteComponent}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;