"use client";

import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // useRouter는 이 컴포넌트에서 사용되지 않으므로 제거하거나 주석 처리
import axios from "axios"; // 👈 Axios 임포트 추가

// TAB_LIST는 현재 하드코딩된 상태이므로 그대로 둡니다.
const TAB_LIST = ["전체", "스킨/토너", "", "", "", ""];

export default function BrandFilter() {
  const [activeTab, setActiveTab] = useState("전체");
  const [checked, setChecked] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // 1. brands state 추가 (API로부터 받아올 브랜드 목록)
  const [brands, setBrands] = useState([]);
  // 2. 로딩 상태 추가 (데이터를 불러오는 중인지 표시)
  const [loadingBrands, setLoadingBrands] = useState(true);
  // 3. 에러 상태 추가 (API 호출 실패 시)
  const [errorBrands, setErrorBrands] = useState(null);

  // 4. useEffect 훅을 사용하여 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchBrands = async () => {
      setLoadingBrands(true); // 데이터 로딩 시작
      setErrorBrands(null);   // 이전 에러 메시지 초기화

      try {
        // 백엔드 API 엔드포인트: Postman에서 확인하신 정확한 URL을 사용한다.
        const response = await axios.get('http://localhost:8080/api/brands');
        
        const data = response.data; // Axios는 응답 데이터를 response.data에 바로 넣어준다.

        // 프론트엔드에서 체크박스에 표시할 brandName 필드만 추출하여 state에 저장한다.
        setBrands(data.map(brandDto => brandDto.brandName));

      } catch (error) {
        console.error("브랜드 목록을 가져오는 중 오류 발생:", error);
        // Axios 에러 객체를 활용한 상세 에러 처리
        if (error.response) {
            // 서버 응답이 있는 경우 (예: 4xx, 5xx 에러)
            setErrorBrands(`브랜드 목록을 가져오는 데 실패했습니다: ${error.response.status} - ${error.response.statusText}`);
            console.error("오류 응답 데이터:", error.response.data);
        } else if (error.request) {
            // 요청은 전송되었지만 응답을 받지 못한 경우 (예: 네트워크 문제)
            setErrorBrands("네트워크 오류: 서버에 연결할 수 없습니다.");
        } else {
            // 요청을 설정하는 중에 발생한 오류
            setErrorBrands(`요청 오류: ${error.message}`);
        }
      } finally {
        setLoadingBrands(false); // 로딩 완료
      }
    };

    fetchBrands(); // 함수 호출
  }, []); // 빈 의존성 배열: 컴포넌트가 처음 마운트될 때 한 번만 실행


  // 처음엔 18개만, 더보기 누르면 전체 표시 (API로 받아온 brands를 사용)
  const shownBrands = showAll ? brands : brands.slice(0, 15);

  const handleCheck = (brand) => {
    setChecked((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  if (loadingBrands) {
    return (
      <div className="px-6 pt-6 pb-3 mt-8 bg-white border border-[#e2e2e2] shadow">
        <div className="text-center text-gray-500">브랜드 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (errorBrands) {
    return (
      <div className="px-6 pt-6 pb-3 mt-8 bg-white border border-[#e2e2e2] shadow">
        <div className="text-center text-red-500">{errorBrands}</div> {/* errorBrands는 이미 문자열이므로 .message 제거 */}
      </div>
    );
  }

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
      <div className="mb-5 text-4xl font-semibold">스킨/토너</div>
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
          <div className="mb-2 text-2xl font-semibold">브랜드</div>
          <div className="mb-1 text-base font-bold text-lime-500">
            Total {brands.length} {/* API로 받아온 brands.length 사용 */}
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