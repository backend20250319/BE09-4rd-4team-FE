// ReviewList.js
export default function ReviewList({ type }) {
  // type: "general" | "monthly"에 따라 다르게 보여주도록 데이터 분기 가능
  const generalReviews = [
    { id: 1, userName: "김철수", content: "일반 리뷰 예시 1", rating: 5, date: "2025-06-20" },
    { id: 2, userName: "이영희", content: "일반 리뷰 예시 2", rating: 4, date: "2025-06-18" },
  ];

  const monthlyReviews = [
    { id: 3, userName: "박민수", content: "한달 사용 리뷰 예시 1", rating: 4, date: "2025-06-10" },
  ];

  const reviews = type === "general" ? generalReviews : monthlyReviews;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="border border-gray-300 rounded-md p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <p className="mb-2">{review.content}</p>
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 fill-current ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09L5.454 11 1 7.091l6.061-.527L10 1l2.939 5.564 6.061.527L14.545 11l1.332 7.09z" />
                  </svg>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
