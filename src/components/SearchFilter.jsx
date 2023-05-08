import React from "react";
import Movie from "./Movie";

const SearchFilter = (props) => {
  const {
    value,
    movies,
    selectedGenre,
    selectedRating,
    searchClicked,
    searched,
  } = props;

  if (searchClicked > 0 || searched > 0) {
    let filteredMovies = [...movies];

    if (value) {
      filteredMovies = movies.filter((movie) => {
        const searchTerm = value.toLowerCase();
        const title = movie.title.toLowerCase();
        return title.includes(searchTerm);
      });
    }

    if (value && selectedGenre.length > 0) {
      filteredMovies = movies.filter((movie) => {
        const searchTerm = value.toLowerCase();
        const title = movie.title.toLowerCase();
        return (
          title.includes(searchTerm) && selectedGenre.includes(movie.category)
        );
      });
    }

    if (value && selectedRating.length > 0) {
      let filteredMovies2 = [];

      for (let i = 0; i < selectedRating.length; i++) {
        let minRating = parseFloat(selectedRating[i]);
        let maxRating = minRating + 1;
        let filteredMovies3 = filteredMovies.filter((movie) => {
          let rating = parseFloat(movie.rating);
          const searchTerm = value.toLowerCase();
          const title = movie.title.toLowerCase();
          return (
            title.includes(searchTerm) &&
            rating >= minRating &&
            rating < maxRating
          );
        });
        filteredMovies2.push(filteredMovies3);

        if (i === selectedRating.length - 1) {
          const mergedArr = [].concat(...filteredMovies2);
          filteredMovies = [...mergedArr];
        }
      }
    }

    if (value && selectedGenre.length > 0 && selectedRating.length > 0) {
      let filteredMovies2 = [];

      for (let i = 0; i < selectedRating.length; i++) {
        let minRating = parseFloat(selectedRating[i]);
        let maxRating = minRating + 1;

        let filteredMovies3 = filteredMovies.filter((movie) => {
          const searchTerm = value.toLowerCase();
          const title = movie.title.toLowerCase();
          let rating = parseFloat(movie.rating);
          let category = movie.category;
          return (
            title.includes(searchTerm) &&
            selectedGenre.includes(category) &&
            rating >= minRating &&
            rating < maxRating
          );
        });
        filteredMovies2.push(filteredMovies3);

        if (i === selectedRating.length - 1) {
          const mergedArr = [].concat(...filteredMovies2);

          filteredMovies = [...mergedArr];
        }
      }
    }

    if (selectedGenre.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        selectedGenre.includes(movie.category)
      );
    }

    if (selectedRating.length > 0) {
      let filteredMovies2 = [];

      for (let i = 0; i < selectedRating.length; i++) {
        let minRating = parseFloat(selectedRating[i]);
        let maxRating = minRating + 1;
        let filteredMovies3 = filteredMovies.filter((movie) => {
          let rating = parseFloat(movie.rating);
          return rating >= minRating && rating < maxRating;
        });
        filteredMovies2.push(filteredMovies3);

        if (i === selectedRating.length - 1) {
          const mergedArr = [].concat(...filteredMovies2);

          filteredMovies = [...mergedArr];
        }
      }
    }

    if (selectedGenre.length > 0 && selectedRating.length > 0) {
      let filteredMovies2 = [];

      for (let i = 0; i < selectedRating.length; i++) {
        let minRating = parseFloat(selectedRating[i]);
        let maxRating = minRating + 1;

        let filteredMovies3 = filteredMovies.filter((movie) => {
          let rating = parseFloat(movie.rating);
          let category = movie.category;
          return (
            selectedGenre.includes(category) &&
            rating >= minRating &&
            rating < maxRating
          );
        });
        filteredMovies2.push(filteredMovies3);

        if (i === selectedRating.length - 1) {
          const mergedArr = [].concat(...filteredMovies2);

          filteredMovies = [...mergedArr];
        }
      }
    }

    if (filteredMovies.length === 0 && (!value || value === "")) {
      return <div>No movies found.</div>;
    }

    return (
      <div>
        {filteredMovies.map((movie) => (
          <Movie movie={movie} key={movie.id} />
        ))}
      </div>
    );
  }
};

export default SearchFilter;
