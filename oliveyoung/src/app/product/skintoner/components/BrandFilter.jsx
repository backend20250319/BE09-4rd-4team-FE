"use client";

import React, { useState } from "react";

// 예시 브랜드 리스트 (실제로는 DB/API로 받아와야 함)
const brands = [
  "구달",
  "그레이멜린",
  "글로오아시스",
  "나인위시스",
  "넘버즈인",
  "녹스",
  "뉴라덤",
  "닐스야드 레머디스",
  "다슈",
  "닥터디퍼런트",
  "닥터멜락신",
  "닥터브로너스",
  "닥터자르트",
  "닥터지",
  "닥터하스킨",
  "담바",
  "달팡",
  "더랩바이블랑두",
  "더마인",
  "더마펌",
  "더말로지카",
  "더바디샵",
  "더샘",
  "더페이스샵",
  "더후",
  "떼루파머",
  "미마크3",
  "디오디너리",
  "디퍼",
  "딕셔니스트",
  "라끄베르",
  "라네즈",
  "라로슈포제",
  "라벨라뷰티",
  "라운드랩",
  "랩시리즈",
  "레이저사이티",
  "로벡틴",
  "리얼베리어",
  "리엔케이",
  "리우젤",
  "리쥬란",
  "마녀공장",
  "마리엔메이",
  "마몽드",
  "맥",
  "메디큐브",
  "메디필",
  "메이크프렘",
  "몰바니",
  "미구하라",
  "믹순",
  "바버501",
  "바비브라운",
  "바이오마마",
  "바이오던스",
  "바이오힐 보",
  "반코르",
  "브리올옴옴",
  "브링그린",
  "보이앤앤에이뷰티",
  "비레디",
  "비마이셀프",
  "비오템",
  "비오템 옴옴",
  "비욘드",
  "비플레인",
  "빌리프",
  "생블랑쉬",
  "설화수",
  "성분에디터",
  "센텔리안24",
  "셀라맥스",
  "셀렌저",
  "셀퓨전씨",
  "스쿳해마쉬",
  "스킨1004",
  "스킨푸드",
  "스튜디오17",
  "슬로스피",
  "사가고",
  "식물나라",
  "싸이닉",
  "아누아",
  "아떼",
  "아벤느",
  "아비브",
  "아이디얼포맨",
  "아이소이",
  "아이오페",
  "아임폼",
  "아크네스",
  "아크웰",
  "애즈이즈투비",
  "어나더페이스",
  "에뛰드",
  "에르쯔틴",
  "에센허브",
  "에스네이처",
  "에스테덤",
  "에스트라",
  "에스티로더",
  "엠도씨",
  "엠블럼릴리스",
  "연작",
  "오브제",
  "올리고더미",
  "우노",
  "온스트라움",
  "원씽",
  "웰라쥬",
  "유리아쥬",
  "유세린",
  "이니스프리",
  "이즈앤트리",
  "인터미션",
  "잇츠스킨",
  "제나벨",
  "제로이드",
  "조선녀",
  "지디엘",
  "차앤박",
  "컴포트존",
  "케어놀로지",
  "케어존",
  "코스알엑스",
  "코스톡",
  "큐어",
  "크리니크",
  "클랩랩파노드",
  "키엘",
  "테라로직",
  "토니모리",
  "토리든",
  "톤28",
  "트러블레스",
  "티엘스",
  "파타온",
  "파파레서피",
  "포레스트",
  "포엘리에",
  "폴라초이스",
  "폴리",
  "프랭클리",
  "프리메라",
  "플라스킨",
  "플로디카",
  "플리프",
  "피지오겔",
  "피죤",
  "피토메르",
  "필리",
  "하다라보",
  "하루하루원더",
  "한율",
];

const TAB_LIST = ["전체", "스킨/토너", "", "", "", ""];

export default function BrandFilter() {
  const [activeTab, setActiveTab] = useState("전체");
  const [checked, setChecked] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // 처음엔 18개만, 더보기 누르면 전체 표시
  const shownBrands = showAll ? brands : brands.slice(0, 15);

  const handleCheck = (brand) => {
    setChecked((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="px-6 pt-6 pb-3 mt-8 bg-white border border-[#e2e2e2] shadow">
      {/* --- 상단 경로 --- */}
      <div className="flex items-center mb-3 text-sm text-gray-400">
        <span>홈</span>
        <span className="mx-1">&gt;</span>
        <span>스킨케어</span>
        <span className="mx-1">&gt;</span>
        <span className="font-semibold text-black">스킨/토너</span>
      </div>
      {/* --- 경로 아래 구분선 --- */}
      <div className="border-b border-[#e2e2e2] mb-4" />
      {/* --- 큰 타이틀 --- */}
      <div className="mb-5 text-4xl font-black">스킨/토너</div>
      {/* --- 1행 6열 탭 --- */}
      <div className="mb-6">
        <div className="grid grid-cols-6 overflow-hidden rounded">
          {TAB_LIST.map((tab, idx) =>
            tab ? (
              <button
                key={tab}
                className={`
                  h-[60px] flex items-center justify-center w-full text-lg font-bold
                  border-b
                  ${
                    activeTab === tab
                      ? "text-lime-600 border-[#b6d84a] border-2 border-b-4 bg-white"
                      : "text-gray-700 border border-[#e2e2e2] bg-white"
                  }
                  ${idx === 0 ? "rounded-tl rounded-bl" : ""}
                `}
                // (버튼 부분만 예시, 전체 코드도 아래에 첨부)

                style={{
                  borderLeft:
                    idx === 0
                      ? activeTab === tab
                        ? "1px solid #b6d84a"
                        : "1px solid #e2e2e2"
                      : activeTab === tab
                      ? "1px solid #b6d84a"
                      : "1px solid #e2e2e2",
                  borderRight:
                    activeTab === tab
                      ? "1px solid #b6d84a"
                      : "1px solid #e2e2e2",
                  borderTop:
                    activeTab === tab
                      ? "1px solid #b6d84a"
                      : "1px solid #e2e2e2",
                  borderBottom:
                    activeTab === tab
                      ? "3px solid #b6d84a"
                      : "1px solid #e2e2e2",
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ) : (
              <div
                key={idx}
                className="bg-white border border-[#e2e2e2] h-[60px]"
              />
            )
          )}
        </div>
      </div>
      {/* --- 브랜드 리스트 --- */}
      <div className="border-t-2 border-[#d8e49e] pt-4 pb-1 flex bg-white">
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
            <label
              key={brand}
              className="flex items-center w-1/5 gap-2 cursor-pointer font-lightmedium"
            >
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
          {showAll ? "접기 ▲" : "더보기 ▼"}
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
