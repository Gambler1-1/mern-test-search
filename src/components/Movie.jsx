import React from 'react'
import GetStarsRating from "./GetStarsRating";


const Movie = (movie) => {
    const mov = movie.movie
  return (
          <div className="searchDropdown-row" key={mov.movieId}>
               <div className="movie-info">
                 <span className="movie-title">{mov.title}</span>
                 <span className="movie-category">{mov.category}</span>
               </div>
               <span className="movie-rating">
                 <GetStarsRating  rating={mov.rating}/>
               </span>
             </div> 
        
  )
}

export default Movie