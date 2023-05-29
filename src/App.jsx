import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieFilter = moviesList.filter((movie) =>
      movie.Title.toLowerCase().includes(search.toLowerCase())
    );
    console.log(movieFilter);

    const movieData =
      movieFilter.length > 0
        ? movieFilter
        : await fetch(
            `http://www.omdbapi.com/?apikey=fa823b06&s=${search}`
          ).then((data) => data.json());

    if (movieData.Error) {
      setMoviesList([]);
      if (movieData.Error === "Incorrect IMDb ID.") {
        setErrorMessage("Type something to search for movies.");
      } else {
        setErrorMessage(movieData.Error);
      }
    } else if (movieData.Search) {
      setErrorMessage("");
      setMoviesList(movieData.Search);
    } else {
      setMoviesList(movieData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" value="Search Movie" />
      </form>
      {errorMessage && <span className="error">{errorMessage}</span>}
      {moviesList.length > 0 &&
        moviesList.map((movie) => (
          <div key={movie.imdbID} className="card">
            <h3>{movie.Title}</h3>
            <p>
              {movie.Year} {movie.Type}
            </p>
          </div>
        ))}
    </>
  );
}

export default App;
