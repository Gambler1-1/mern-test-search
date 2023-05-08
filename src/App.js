import { useState } from "react";
import "./styles.css";
import Multiselect from "multiselect-react-dropdown";
import SearchFilter from "./components/SearchFilter";

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
  const [searchClicked, setSearchClicked] = useState(0);
  const [searched, setSearched] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);

  const handleSearchClick = async () => {
    searchClicked > 0
      ? setSearchClicked(0)
      : setSearchClicked(searchClicked + 1);
  };
  const onSearchChange = (event) => {
    if(event.target.value.length > 0){
      setSearched(searched+1)
      setSearchClicked(0)
    }
    setValue(event.target.value);
  };
  const updateRating = (e) => {
    let strLen = e.length;
    if (strLen < 1) {
      setSelectedRating([]);
      return;
    }
    var ratNumArray=[]
    for(let i=0 ; i<e.length; i++){
      ratNumArray.push(e[i].split(" ")[0])
    }

    setSelectedRating(ratNumArray);

    if (searchClicked > 0) {
      setSearchClicked(searchClicked + 1);
    }
    if (searched > 0) {
      setSearched(searched + 1);
    }
  };

  const updateGenre = (e) => {
    if (e.length < 1) {
      setSelectedGenre([]);
      return;
    }
    setSelectedGenre(e);
    if (searchClicked > 0) {
      setSearchClicked(searchClicked + 1);
    }
    if (searched > 0) {
      setSearched(searched + 1);
    }
  };

  
  return (
    <>
      <div className="App">
        <h1>Search Movies</h1>
        <div className="filter">
          <div className="multiselect-container">
            <div className="search-inner">
              <input
                type="text"
                placeholder="Search for Movies"
                value={value}
                onClick={handleSearchClick}
                onChange={onSearchChange}
              />
            </div>
            <div className="dropdownSearch">
              <SearchFilter
                movies={movies}
                value={value}
                selectedGenre={selectedGenre}
                selectedRating={selectedRating}
                searchClicked={searchClicked}
                searched={searched}
              />
            </div>
          </div>
          <div className="multiselect-container">
            <Multiselect
              isObject={false}
              options={ratingOptions}
              showCheckbox
              placeholder={"Select Rating : Default:All ↓"}
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
              placeholder={"Select Genre : Default:All  ↓"}
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
