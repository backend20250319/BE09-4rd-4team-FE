"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar, FaRegThumbsUp } from "react-icons/fa";

export default function ReviewItem({ review }) {
  const [helpfulCount, setHelpfulCount] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const handleHelpfulClick = () => {
    if (hasClicked) {
      setHelpfulCount((prev) => prev - 1);
    } else {
      setHelpfulCount((prev) => prev + 1);
    }
    setHasClicked(!hasClicked);
  };

  return (
    <div className="flex border-b border-gray-200 py-6 text-sm text-gray-800 w-full">
      {/* 좌측: 사용자 정보 */}
      <div className="w-[200px] flex flex-col items-center text-center text-xs text-gray-500 px-4">
        <div className="w-[60px] h-[60px] bg-gray-200 rounded-full mb-2" />
        <div className="text-black font-bold text-sm">{review.user}</div>
        <div className="mt-1 text-[12px] text-gray-400">복합성 · 미백 · 블랙헤드</div>
      </div>

      {/* 우측: 리뷰 본문 */}
      <div className="flex-1 flex flex-col pr-6">
        {/* 별점 + 날짜 */}
        <div className="flex items-center text-red-500 mb-1 text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="mr-[2px]" />
          ))}
          <span className="text-gray-500 ml-2">{review.date}</span>
        </div>

        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-[#00b2b2] mb-2">
          <span className="text-[#00aa88]">피부타입</span> {review.skinType}
          <span className="text-[#00aa88]">피부고민</span> {review.concern}
          <span className="text-[#00aa88]">자극도</span> {review.texture}
        </div>

        {/* 리뷰 본문 */}
        <div className="text-gray-800 mb-3">{review.content}</div>

        {/* 이미지 */}
        {review.images?.length > 0 && (
          <div className="flex gap-4 mb-3">
            {review.images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-[140px] h-[140px] rounded overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`review-${review.id}-img-${idx}`}
                  layout="fill"
                  objectFit="cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}

        {/* 도움돼요 + 신고 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-auto">
          <span className="font-semibold">이 리뷰가 도움이 돼요!</span>
          <button
            onClick={handleHelpfulClick}
            className={`flex items-center gap-1 px-3 py-1 border rounded-full text-xs transition ${
              hasClicked
                ? "border-[#00b2b2] bg-[#e0f7f5] text-[#00b2b2]"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <FaRegThumbsUp />
            <span>{helpfulCount}</span>
          </button>
          <button className="ml-auto text-xs text-gray-400 underline">
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
}
