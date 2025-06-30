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
  reviews: [   // <-- 여기에 내용을 추가하면 자동으로 추가가 된다.
    {
      id: 1,
      user: "김하나",
      date: "2025.06.29",
      skinType: "지성",
      concern: "모공",
      texture: "순해요",
      content: "피부가 확실히 좋아졌어요.",
      images: ["/images/sample1.jpg"],
    },
    {
      id: 2,
      user: "박둘",
      date: "2025.06.27",
      skinType: "건성",
      concern: "보습",
      texture: "자극 없어요",
      content: "촉촉해서 만족해요.",
      images: ["/images/sample1.jpg"],
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
