import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox  from './components/SearchBox';
import AddFavorite from './components/AddToFavorites';
import RemoveFavorites from './components/RemoveFavorites';
// day la phan chinh
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=batman&apikey=a5422eb7`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
	};


  const addFavoriteMovie = (movies) => {
    const newFavoriteList = [...favorites, movies];
    setFavorites(newFavoriteList);
  };

  const removeFavoriteMovie = (movies) => {
		const newFavoriteList = favorites.filter(
			(favorite) => favorite.imdbID !== movies.imdbID
		);

		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		);

		if (movieFavorites) {
			setFavorites(movieFavorites);
		}
	}, []);


  return (
    <div className='container-fluid movieapp'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="HoangChoiceMovies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
       </div>
      <div className='row'>
        <MovieList movies={movies} favoriteComponent ={AddFavorite} handleFavoritesClick = {addFavoriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favorites}
					handleFavouritesClick={removeFavoriteMovie}
					favouriteComponent={RemoveFavorites}
				/>
			</div>
    </div>
  );

};

export default App;
