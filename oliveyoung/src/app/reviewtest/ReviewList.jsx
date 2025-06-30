import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </>
  );
}
