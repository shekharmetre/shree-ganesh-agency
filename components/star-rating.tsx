import React from "react";
import { Star, StarHalf } from "lucide-react";
interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5; // Total number of stars
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating - fullStars >= 0.5; // Whether to show a half star

  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => {
        if (index < fullStars) {
          return <Star fill="yellow" className="text-sm md:text-3xl " key={index} size={20} />;
        } else if (index === fullStars && hasHalfStar) {
          return <StarHalf size={20} className="text-xl md:text-3xl" key={index} />;
        } else {
          return <Star className="text-xl md:text-3xl" key={index} />;
        }
      })}
    </div>
  );
};

export default StarRating;
