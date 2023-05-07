import { useState } from "react";
import "./styles2.css";
import Multiselect from "multiselect-react-dropdown";

var data = require("./data.json");

const ratingOptions = [
  "1 ★☆☆☆☆☆☆☆☆☆",
  "2 ★★☆☆☆☆☆☆☆☆",
  "3 ★★★☆☆☆☆☆☆☆",
  "4 ★★★★☆☆☆☆☆☆",
  "5 ★★★★★☆☆☆☆☆",
  "6 ★★★★★★☆☆☆☆",
  "7 ★★★★★★★☆☆☆",
  "8 ★★★★★★★★☆☆",
  "9 ★★★★★★★★★☆",
  "10 ★★★★★★★★★★",
];

const genreOptions = ["Action", "Thriller", "Drama", "Comedy"];

export default function App() {
  const [value, setValue] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);

  const onSearchChange = (event) => {
    console.log(event.target.value, "SEARCHED VALUE");
    console.log(selectedGenre, "SELECTED GENRE");
    console.log(selectedRating, "SELECTED RATING");
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  const updateRating = (e) => {
    let strLen = e.length;
    if (strLen < 1) {
      setSelectedRating([]);
      return;
    }
    let ratnum = e[0].split(" ")[0];
    let ratNumArray = [];
    ratNumArray.push(ratnum);
    setSelectedRating(ratNumArray);
  };

  const updateGenre = (e) => {
    e.length > 0 ? setSelectedGenre(e) : setSelectedGenre([]);
  };

  function getStarRating(rating) {
    const roundedRating = Math.round(rating * 2) / 2; // round to nearest 0.5
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 !== 0 ? "half" : "";
    const emptyStars = 5 - fullStars - (halfStar === "half" ? 1 : 0);

    const fullStarStr = fullStars > 0 ? "★".repeat(fullStars) : "";
    const halfStarStr = halfStar === "half" ? "✬" : "";
    const emptyStarStr = emptyStars > 0 ? "☆".repeat(emptyStars) : "";

    return `${fullStarStr}${halfStarStr}${emptyStarStr}`;
  }

  return (
    <div className="App">
      <h1>Search Movies</h1>

      <div className="search-container">
        <div className="filter">
          <div className="multiselect-container">
            <div className="search-inner">
              <input type="text" value={value} onChange={onSearchChange} />
              <button onClick={() => onSearch(value)}> Search </button>
            </div>
            <div className="dropdownSearch">
              {data.movies
                .filter((movie) => {
                  const searchTerm = value.toLowerCase();
                  const title = movie.title.toLowerCase();
                  const cat = movie.category.toLowerCase();
                  const category = movie.category;
                  const rating = movie.rating;

                  return (
                    searchTerm &&
                    (title.includes(searchTerm) || cat.includes(searchTerm)) &&
                    (selectedGenre.length === 0 ||
                      selectedGenre.includes(category)) &&
                    (selectedRating.length === 0 ||
                      (rating >= parseFloat(selectedRating) &&
                        rating < parseFloat(selectedRating) + 1))
                  );
                })
                .slice(0, 10)
                .map((movie) => (
                  <div
                    onClick={() => onSearch(movie.title)}
                    className="searchDropdown-row"
                    key={movie.movieId}
                  >
                    <div className="movie-info">
                      <span className="movie-title">{movie.title}</span>
                      <span className="movie-category">{movie.category}</span>
                    </div>
                    <span className="movie-rating">
                      {getStarRating(movie.rating)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="multiselect-container">
            <Multiselect
              style={{ width: "200px" }}
              isObject={false}
              options={ratingOptions}
              showCheckbox
              placeholder={"Select Rating     ↓"}
              onRemove={(e) => {
                updateRating(e);
              }}
              onSelect={(e) => {
                updateRating(e);
              }}
            />
          </div>
          <div className="multiselect-container">
            <Multiselect
              isObject={false}
              options={genreOptions}
              showCheckbox
              placeholder={"Select Genre      ↓"}
              onRemove={(e) => {
                updateGenre(e);
              }}
              onSelect={(e) => {
                updateGenre(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
