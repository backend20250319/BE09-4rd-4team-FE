'use client';

import React, { useState } from "react";

// 예시 브랜드 리스트 (실제로는 DB/API로 받아와야 함)
const brands = [
  "구달", "그레이멜린", "글로오아시스", "나인위시스", "넘버즈인",
  "녹스", "뉴라덤", "닐스야드 레머디스", "다슈", "닥터디퍼런트",
  "닥터멜락신", "닥터브로너스", "닥터자르트", "닥터지", "닥터하스킨",
];

function BrandFilter() {
  const [activeTab, setActiveTab] = useState("전체");
  const [checked, setChecked] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // 처음엔 10개만, 더보기 누르면 전체 표시
  const shownBrands = showAll ? brands : brands.slice(0, 10);

  const handleCheck = (brand) => {
    setChecked((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="px-6 pt-6 pb-3 bg-white rounded-md shadow">
      {/* --- 상단 경로 --- */}
      <div className="flex items-center mb-3 text-sm text-gray-400">
        <span>홈</span>
        <span className="mx-1">&gt;</span>
        <span>스킨케어</span>
        <span className="mx-1">&gt;</span>
        <span className="font-semibold text-black">스킨/토너</span>
      </div>

      {/* --- 타이틀 --- */}
      <div className="mb-5 text-4xl font-black">스킨/토너</div>

      {/* --- 탭 --- */}
      <div className="flex mb-6 border-b-2 border-[#d8e49e]">
        <button
          className={`px-8 py-2 font-semibold text-lg border-b-4 ${
            activeTab === "전체"
              ? "border-lime-500 text-lime-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("전체")}
        >
          전체
        </button>
        <button
          className={`px-8 py-2 font-semibold text-lg border-b-4 ${
            activeTab === "스킨/토너"
              ? "border-lime-500 text-lime-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("스킨/토너")}
        >
          스킨/토너
        </button>
      </div>

      {/* --- 브랜드 리스트 --- */}
      <div className="border-t border-[#d8e49e] pt-4 pb-1 flex">
        {/* 왼쪽 브랜드 카운트 */}
        <div className="w-[150px] flex flex-col items-start">
          <div className="mb-2 text-2xl font-black">브랜드</div>
          <div className="mb-1 text-base font-bold text-lime-500">
            Total {brands.length}
          </div>
        </div>
        {/* 브랜드 체크박스 */}
        <div className="flex flex-wrap flex-1 gap-y-4">
          {shownBrands.map((brand, idx) => (
            <label key={brand} className="flex items-center w-1/6 gap-2 text-lg font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={checked.includes(brand)}
                onChange={() => handleCheck(brand)}
                className="w-5 h-5 accent-lime-500"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* --- 하단 버튼/초기화 --- */}
      <div className="flex items-center justify-between pt-2 mt-2 border-t">
        <button
          onClick={() => setShowAll((v) => !v)}
          className="px-6 py-1 text-lg border rounded bg-gray-50 hover:bg-gray-100"
        >
          {showAll ? "접기" : "더보기 ▼"}
        </button>
        <button
          onClick={() => setChecked([])}
          className="ml-auto text-base text-gray-400 hover:text-black"
        >
          선택 초기화
        </button>
      </div>
    </div>
  );
}

export default BrandFilter;