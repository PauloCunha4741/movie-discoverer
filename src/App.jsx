import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [search, setSearch] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieFilter = moviesList.filter((movie) =>
      movie.Title.toLowerCase().includes(search.toLowerCase())
    );

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
      <div className="search-container">
        <div className="search-box">
          <h1>Movie Search</h1>
          <form onSubmit={handleSubmit} className="search-area">
            <input
              type="text"
              value={search}
              id="movie"
              placeholder="Enter the movie or series name..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" value="Search Movie" id="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            {errorMessage && <span className="error">{errorMessage}</span>}
          </form>
        </div>
        <p>
          Foto de{" "}
          <a href="https://unsplash.com/@somethingmagical?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            something magical
          </a>{" "}
          na{" "}
          <a href="https://unsplash.com/pt-br/fotografias/SdjA-_Xzuxg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
      </div>
      <div className="info-container">
        <div id="result">
          {moviesList.length > 0 &&
            moviesList.map((movie) => (
              <div key={movie.imdbID} className="card">
                <div>
                  <h3>{movie.Title}</h3>
                  <p>
                    {movie.Year} {movie.Type}
                  </p>
                </div>
                <img src={movie.Poster} alt="movie image" className="movie-poster"/>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
