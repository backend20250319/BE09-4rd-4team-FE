"use client";
import { useState } from "react";
export default function ReviewTabs() {
  const [activeTab, setActiveTab] = useState("write");

  return (
    <div className="w-[785.6px] mx-auto mt-4">
      {/* 탭 영역 */}
      <div className="flex">
        {/* 리뷰 작성 탭 */}
        <button
          className={`w-1/2 h-[50px] text-[18px] font-medium rounded-t-md bg-white ${
            activeTab === "write"
              ? "border-t-2 border-l-2 border-r-2 border-[#9bce26] border-b-0 text-black z-10"
              : "bg-gray-100 border-b-2 border-[#9bce26] border-t-0 border-l-0 border-r-0 text-black"
          }`}
          onClick={() => setActiveTab("write")}
        >
          리뷰 작성
        </button>

        {/* 나의 리뷰 탭 */}
        <button
          className={`w-1/2 h-[50px] text-[18px] font-medium rounded-t-md ${
            activeTab === "mine"
              ? "border-t-2 border-l-2 border-r-2 border-[#9bce26] border-b-0 bg-white text-black z-10"
              : "bg-gray-100 border-b-2 border-[#9bce26] border-t-0 border-l-0 border-r-0 text-black"
          }`}
          onClick={() => setActiveTab("mine")}
        >
          나의 리뷰
        </button>
      </div>
    </div>
  );
}
