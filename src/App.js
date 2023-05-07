import { useState } from "react";
import "./styles.css";
import Multiselect from "multiselect-react-dropdown";
import SearchFilter from "./components/SearchFilter"

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
  const movies = data.movies;
  const [value, setValue] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);

  const onSearchChange = (event) => {
    console.log(event.target.value, "SEARCHED VALUE");
    console.log(selectedGenre, "SELECTED GENRE");
    console.log(selectedRating, "SELECTED RATING");
    setValue(event.target.value);
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
  console.log(selectedGenre,"CURRENTLY SELECTED GENRE")
    if(e.length < 1  ){
      setSelectedGenre([]);
      return;
    }
    setSelectedGenre(e)
  };

  return (
  <>
    <div className="App">
      <h1>Search Movies</h1>
        <div className="filter">
          <div className="multiselect-container">
            <div className="search-inner">
              <input type="text" placeholder="Search for Movies" value={value} onChange={onSearchChange} />
            </div>
            <div className="dropdownSearch">
              <SearchFilter movies={movies} value={value} selectedGenre={selectedGenre} selectedRating={selectedRating}  />
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
    </>
  );
}
