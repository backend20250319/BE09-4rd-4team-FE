"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_DATA = {
  스킨케어: ["스킨케어", "마스크팩", "클렌징", "선케어"],
  "메이크업/세일": ["파운데이션", "립스틱", "블러셔"],
  뷰티소품: ["퍼프", "브러쉬", "거울"],
  "더모 코스메틱": ["민감성", "약산성 클렌저"],
  맨즈케어: ["면도기", "올인원"],
  "향수/디퓨저": ["여성향수", "남성향수"],
  헤어케어: ["샴푸", "트리트먼트"],
  바디케어: ["바디워시", "바디로션"],
  건강식품: ["비타민", "홍삼"],
  푸드: ["간편식", "영양식"],
  "구강/건강용품": ["칫솔", "마우스워시"],
  위생용품: ["손소독제", "티슈"],
  "라이프/케이팝": ["굿즈", "홈데코"],
  AWARDS: [],
};

export default function Menu() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("스킨케어");
  const router = useRouter();

  const toggleCategory = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const handleSubCategoryClick = (sub) => {
    if (sub === "스킨케어") {
      router.push("/product");
      setIsCategoryOpen(false);
    }
  };

  return (
    <div className="relative z-50">
      {/* 상단 메뉴 바 */}
      <div className="h-[47px] flex justify-center border-t border-b-2 border-t-[#dddddd] border-b-black bg-white">
        <div className="w-[1020px] flex items-center">
          {/* 카테고리 버튼 */}
          <button
            onClick={toggleCategory}
            className="w-[170px] h-[47px] border-l border-r border-[#dddddd] flex items-center gap-3 pl-[27px] font-bold text-[15px]"
          >
            <img src="/images/categoryIcon.png" alt="menu" />
            카테고리
          </button>

          {/* 상단 메뉴 리스트 */}
          <ul className="pl-[30px] flex flex-row gap-11 font-bold">
            {[
              "오특",
              "랭킹",
              "헬스+",
              "LUXE EDIT",
              "기획전",
              "세일",
              "기프트카드",
              "멤버십/쿠폰",
              "이벤트",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      {isCategoryOpen && (
        <div className="absolute top-[47px] left-0 w-full bg-white z-50">
          <div className="w-[1020px] mx-auto flex h-[450px] shadow border-b border-[#ddd]">
            {/* 왼쪽 대분류 */}
            <ul className="w-[170px] h-full bg-black/80 text-white text-sm font-semibold py-3 px-4 space-y-0">
              {Object.keys(CATEGORY_DATA).map((category, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(category)}
                  className={`py-2 px-2 cursor-pointer ${
                    activeCategory === category
                      ? "bg-black text-white font-bold"
                      : ""
                  }`}
                >
                  {category === "AWARDS" ? (
                    <div className="flex items-center gap-1">
                      AWARDS <span className="text-sm">🏆</span>
                    </div>
                  ) : (
                    category
                  )}
                </li>
              ))}
            </ul>

            {/* 오른쪽 소분류 (대분류 제목 제거됨) */}
            <ul className="w-[850px] p-6 text-sm text-black space-y-2">
              {(CATEGORY_DATA[activeCategory] || []).map((sub, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleSubCategoryClick(sub)}
                    className={`text-left ${
                      sub === "스킨케어"
                        ? "hover:text-[#f27370] hover:underline cursor-pointer"
                        : "text-gray-600 cursor-default"
                    }`}
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
