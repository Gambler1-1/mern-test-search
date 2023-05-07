import React from "react";
import Movie from "./Movie";

const SearchFilter = (props) => {
  const { value, movies, selectedGenre, selectedRating, searchClicked } = props;
  console.log(selectedGenre, "GENRE");
  console.log(selectedGenre.length, "GENRE Length");
  console.log(movies, "MOVIES");

  const filteredMovies = movies.filter((movie) => {
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

  if (searchClicked) {
    let filteredMovies = movies;
  
    if (selectedGenre.length > 0) {
      filteredMovies = filteredMovies.filter(movie => selectedGenre.includes(movie.category));
    }
  
    if (selectedRating.length > 0) {
      const minRating = parseFloat(selectedRating);
      const maxRating = minRating + 1;
  
      filteredMovies = filteredMovies.filter(movie => {
        const rating = parseFloat(movie.rating);
        return rating >= minRating && rating < maxRating;
      });
    }
  
    if (selectedGenre.length > 0 && selectedRating.length > 0) {
      const minRating = parseFloat(selectedRating);
    const maxRating = minRating + 1;
      filteredMovies = filteredMovies.filter(movie => {
        const category = movie.category;
        const rating = parseFloat(movie.rating);
        return selectedGenre.includes(category) && rating >= minRating && rating < maxRating;
      });
    }
  
    if (filteredMovies.length === 0 && (!value || value === "")) {
      return <div>No movies found.</div>;
    }
  
    return (
      <div>
        {filteredMovies.map(movie => (
          <Movie movie={movie} key={movie.id} />
        ))}
      </div>
    );
  }

  return (
    <>
      {filteredMovies.length > 0 && (
        <div>
          {filteredMovies.map((movie) => (
            <Movie movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchFilter;
