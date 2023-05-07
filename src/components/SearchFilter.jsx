import React from "react";
import GetStarsRating from "./GetStarsRating";

const SearchFilter = (props) => {
  const { value, movies, selectedGenre, selectedRating } = props;

  const filteredMovies =movies.filter((movie) => {
    const searchTerm = value.toLowerCase();
    const title = movie.title.toLowerCase();
    const category = movie.category;
    const rating = movie.rating;
    return (
      searchTerm &&
      title.includes(searchTerm) &&
      (selectedGenre.length === 0 || selectedGenre.includes(category)) &&
      (selectedRating.length === 0 ||
        (rating >= parseFloat(selectedRating) &&
          rating < parseFloat(selectedRating) + 1))
    );
  });
  return (
    <>
      {filteredMovies.length > 0 && (
        <div> 
          {filteredMovies.slice(0, 10).map((movie) => (
            <div className="searchDropdown-row" key={movie.movieId}>
              <div className="movie-info">
                <span className="movie-title">{movie.title}</span>
                <span className="movie-category">{movie.category}</span>
              </div>
              <span className="movie-rating">
                <GetStarsRating  rating={movie.rating}/>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchFilter;
