"use client";

import { useState } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";

// 🔧 나중에 백엔드 연동 시 API 호출로 대체할 부분
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

export default function ReviewStats({ skinType, skinConcern, texture }) {
  const renderBar = (label, value, total) => {
    const percentage = ((value / total) * 100).toFixed(1);

    return (
      <div key={label} className="mb-3">
        <div className="flex justify-between mb-1">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-100 h-4 rounded">
          <div
            className="h-4 bg-green-500 rounded"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const renderSection = (title, data) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    return (
      <div className="w-[340px]">
        <h3 className="text-base font-semibold mb-4">{title}</h3>
        {Object.entries(data).map(([label, value]) =>
          renderBar(label, value, total)
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-6 px-4 justify-center">
      {renderSection("피부 타입", skinType)}
      {renderSection("피부 고민", skinConcern)}
      {renderSection("자극도", texture)}
    </div>
  );
}
