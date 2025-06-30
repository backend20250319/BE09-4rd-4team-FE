// ReviewDetailPage.jsx
"use client";

import { useState } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewStats from "./ReviewStats";
import ReviewList from "./ReviewList";

const dummyData = {
  rating: 4.8,
  totalReviews: 6802,
  ratingsDistribution: [85, 11, 3, 1, 0],
  skinType: {
    "건성에 좋아요": 18,
    "복합성에 좋아요": 59,
    "지성에 좋아요": 23,
  },
  skinConcern: {
    "보습에 좋아요": 18,
    "진정에 좋아요": 81,
    "주름/미백에 좋아요": 16,
  },
  texture: {
    "자극없이 순해요": 78,
    보통이에요: 22,
    "자극이 느껴져요": 1,
  },
  reviews: [
    {
      id: 1,
      user: "seoeo",
      date: "2025.06.25",
      skinType: "복합성",
      concern: "건성에 좋아요",
      texture: "자극없이 순해요",
      content:
        "진정에 엄청 좋고 제품도 산뜻하게 흡수되는데 돌토너에 알콜이 있었는데도 썼었는데 이것도 너무 진정이네요",
      images: ["/image/review1.jpg", "/image/review2.jpg"],
    },
  ],
};

export default function ReviewDetailPage() {
  const [data] = useState(dummyData);

  return (
    <div className="max-w-[1020px] mx-auto py-10 text-sm text-gray-800">
      <hr className="border-t-2 border-gray-800" />
      <ReviewSummary data={data} />
      <hr className="border-t border-gray-200 mb-10" />
      <ReviewStats
        skinType={data.skinType}
        skinConcern={data.skinConcern}
        texture={data.texture}
      />
      <hr className="border-t border-gray-200" />
      <ReviewList reviews={data.reviews} />
      <hr className="border-t border-gray-300" />
    </div>
  );
}
