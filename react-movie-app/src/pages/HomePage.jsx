import  { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourites from '../components/AddFavourites';
import RemoveFavourites from '../components/RemoveFavourites';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=191f6cae`;
    
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      const timer = setTimeout(() => {
        getMovieRequest(searchValue);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setMovies([]);
    }
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites') || '[]'
    );
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    // Check if movie is already in favorites
    if (!favourites.some(fav => fav.imdbID === movie.imdbID)) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }else {
    alert("This movie is already in your favourites!");
    }

  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid">
      <div className="search-container">
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      
      <div className="row">
        <MovieList 
          movies={movies} 
          favouriteComponent={AddFavourites}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      
      {favourites.length > 0 && (
        <>
          <MovieListHeading heading="Favourites" />
          <div className="row">
            <MovieList 
              movies={favourites} 
              favouriteComponent={RemoveFavourites}
              handleFavouritesClick={removeFavouriteMovie}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;