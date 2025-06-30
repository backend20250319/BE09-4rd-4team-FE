export default function RatingStars({ rating }) {
  const ratingFloor = Math.floor(rating);
  const hasHalfStar = rating - ratingFloor >= 0.5;

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < ratingFloor) {
          return (
            <svg
              key={i}
              className="w-[26px] h-[26px] text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87L8.91 8.26z" />
            </svg>
          );
        } else if (i === ratingFloor && hasHalfStar) {
          return (
            <svg
              key={i}
              className="w-[26px] h-[26px] text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <defs>
                <linearGradient id="halfRed">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                fill="url(#halfRed)"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87L8.91 8.26z"
              />
            </svg>
          );
        } else {
          return (
            <svg
              key={i}
              className="w-[26px] h-[26px] text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87L8.91 8.26z" />
            </svg>
          );
        }
      })}
    </div>
  );
}
