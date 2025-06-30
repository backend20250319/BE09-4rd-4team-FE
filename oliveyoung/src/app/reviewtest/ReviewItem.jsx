export default function ReviewItem({ review }) {
  return (
    <div className="border-t pt-6 mt-6 w-[1020px] h-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">{review.user}</div>
        <div className="text-gray-400">{review.date}</div>
      </div>
      <div className="mb-2">
        <span className="text-pink-500 mr-2">★ ★ ★ ★ ★</span>
        <span className="text-gray-600">
          | 피부타입: {review.skinType} | 피부고민: {review.concern} | 자극도:{" "}
          {review.texture}
        </span>
      </div>
      <p className="mb-4">{review.content}</p>
      <div className="flex gap-4">
        {review.images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`리뷰 이미지 ${idx + 1}`}
            className="w-32 h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
