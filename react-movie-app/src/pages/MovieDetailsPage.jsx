import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RemoveFavourites from '../components/RemoveFavourites';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const url = `https://www.omdbapi.com/?i=${id}&apikey=191f6cae`;
      const response = await fetch(url);
      const responseJson = await response.json();
      
      if (responseJson) {
        setMovie(responseJson);
      }
    };

    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        Back to Movies
      </button>
      
      <div className="movie-detail-container">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/images/IMG_3733.jpeg'}
          alt={movie.Title}
          className="movie-detail-poster"
        />
        
        <div className="movie-detail-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Rated:</strong> {movie.Rated}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;