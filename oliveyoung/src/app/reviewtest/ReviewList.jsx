// components/ReviewList.jsx

import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews }) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}
