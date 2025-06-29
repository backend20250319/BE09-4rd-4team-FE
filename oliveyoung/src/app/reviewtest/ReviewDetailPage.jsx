"use client";

import { useState } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewStats from "./ReviewStats";
import ReviewList from "./ReviewList";

// 🔧 나중에 백엔드 연동 시 API 호출로 대체할 부분
const dummyData = {
  rating: 4.8,
  totalReviews: 6802,
  ratingsDistribution: [85, 11, 3, 1, 0],
  skinType: {
    "건성에 좋아요": 19,
    "지성에 좋아요": 23,
  },
  skinConcern: {
    "보습에 좋아요": 18,
    "수분공급에 좋아요": 16,
  },
  texture: {
    "자극없이 순해요": 78,
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
    <div className="max-w-[1020px] mx-auto  py-10 text-sm text-gray-800 ">
      {/* 첫 줄 */}
      <hr className="border-t-2 border-gray-800 " />
      {/* 상단 요약 */}
      <ReviewSummary data={data} />

      {/* 구분선 */}
      <hr className="border-t border-gray-200 mb-10" />

      {/* 피부타입 / 고민 / 제형도 */}
      <ReviewStats
        skinType={data.skinType}
        skinConcern={data.skinConcern}
        texture={data.texture}
      />

      {/* 구분선 */}
      <hr className="border-t border-gray-200" />

      {/* 리뷰 목록 */}
      <ReviewList reviews={data.reviews} />

      {/* 마지막 줄 */}
      <hr className="border-t border-gray-300" />
    </div>
  );
}
