import React from 'react'

const GetStarsRating = (rating) => {
    const rate= rating.rating
    const roundedRating = Math.round(rate * 2) / 2; 
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 !== 0 ? "half" : "";
    const emptyStars = 5 - fullStars - (halfStar === "half" ? 1 : 0);

    const fullStarStr = fullStars > 0 ? "★".repeat(fullStars) : "";
    const halfStarStr = halfStar === "half" ? "✬" : "";
    const emptyStarStr = emptyStars > 0 ? "☆".repeat(emptyStars) : "";
 
  return (
    <div>{fullStarStr}{halfStarStr}{emptyStarStr}</div>
  )
}

export default GetStarsRating