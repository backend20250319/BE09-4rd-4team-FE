"use client"; // 이 컴포넌트가 클라이언트 사이드에서 렌더링됨을 명시

import React, { useState } from "react"; // useState 훅 임포트
import { FaFacebookF, FaLink } from "react-icons/fa"; // 소셜 공유 아이콘 (페이스북, 링크)
import { IoChevronForwardOutline } from "react-icons/io5"; // 오른쪽 화살표 아이콘
import { GoQuestion } from "react-icons/go"; // 물음표 아이콘
import { FaRegHeart,FaGift } from "react-icons/fa"; // 하트 (찜하기) 아이콘
import { IoEyeOutline } from "react-icons/io5"; // 눈 모양 아이콘 추가 (이전 요청에서 추가됨)
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci"; // 수량 조절 아이콘 추가 (이전 요청에서 추가됨)



function ProductPage1() {
  // 썸네일 이미지 경로를 정의합니다.
  // 이 배열의 순서와 아래 map 함수의 index가 일치하도록 관리해야 합니다.
  // 이 경로들은 public 폴더 내의 이미지 파일들을 가리켜야 합니다.
  const thumbnailPaths = [
    "/images/thumbnail1.jpg", // 여기에 실제 다운로드한 첫 번째 썸네일 이미지 경로를 넣어주세요.
    "/images/thumbnail2.jpg", // 여기에 실제 다운로드한 두 번째 썸네일 이미지 경로를 넣어주세요.
    "/images/thumbnail3.jpg", // 여기에 실제 다운로드한 세 번째 썸네일 이미지 경로를 넣어주세요.
    "/images/thumbnail4.jpg", // 여기에 실제 다운로드한 네 번째 썸네일 이미지 경로를 넣어주세요.
  ];

  // 메인 이미지 상태를 관리하는 useState 훅
  // 초기값은 thumbnailPaths 배열의 첫 번째 이미지로 설정
  const [mainImage, setMainImage] = useState(thumbnailPaths && thumbnailPaths.length > 0 ? thumbnailPaths[0] : "/images/skintoner21.jpg");
  // 썸네일 클릭 핸들러
  const handleThumbnailClick = (imagePath) => {
    setMainImage(imagePath); // 클릭된 썸네일의 경로를 메인 이미지 상태로 설정
  };

  return (
    <div className="relative max-w-6xl mx-auto font-sans bg-white">
      {/* 상단 경로 (Breadcrumbs) - 구분선 추가됨 */}
      <div className="flex items-center px-4 py-3 pb-2 mb-8 text-sm text-gray-400 border-b md:px-0">
        <span>홈</span>
        <span className="mx-1">&gt;</span>
        <span>스킨케어</span>
        <span className="mx-1">&gt;</span>
        <span>스킨/토너</span>
        <span className="mx-1">&gt;</span>
        <span className="text-black ">
          닥터지 레드 블레미쉬 클리어 수딩 토너
        </span>
      </div>
      {/* 메인 상품 콘텐츠 */}
      <div className="flex flex-col gap-12 p-4 md:flex-row md:p-0">
        {/* 왼쪽 섹션: 상품 메인 이미지 및 썸네일 */}
        <div className="flex flex-col lg:w-3/5">
          <div className="relative w-full max-w-[500px] h-[500px] mb-6">
            {/* 상품 메인 이미지: mainImage 상태에 따라 이미지 경로 변경 */}
            <img
              src={mainImage}
              alt="닥터지 레드 블레미쉬 클리어 수딩 토너"
              className="object-contain w-full h-full rounded-md"
            />
          </div>
          {/* 썸네일 목록 */}
          <ul className="flex justify-center space-x-2">
            {thumbnailPaths.map(
              (
                imagePath,
                index // 이미지 경로 배열을 사용하여 렌더링
              ) => (
                <li
                  key={imagePath}
                  className={`w-[80px] h-[80px] cursor-pointer ${
                    mainImage === imagePath // 현재 메인 이미지와 일치하는 썸네일에 활성화 스타일 적용
                      ? "border-2 border-black"
                      : "border border-gray-300"
                  } hover:border-black`}
                  onClick={() => handleThumbnailClick(imagePath)} // 클릭 시 핸들러 호출
                >
                  <a href="#" onClick={(e) => e.preventDefault()}> {/* 기본 링크 동작 방지 */}
                    <img
                      src={imagePath} // 정의된 썸네일 이미지 경로 사용
                      alt={`썸네일 이미지 ${index + 1}`} // 접근성을 위한 대체 텍스트
                      className="object-contain w-full h-full"
                    />
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* 오른쪽 섹션: 상품 상세 정보 */}
        <div className="p-4 md:w-1/2 lg:w-3/5 md:p-0">
          <p className="mb-1 text-sm text-black">닥터지 &gt;</p>
          <h1 className="mb-2 text-2xl font-semibold">
            [증량] 닥터지 레드 블레미쉬 클리어 수딩 토너 500ml
          </h1>

          {/* 가격 정보 */}
          <div className="mb-2">
            <div className="flex items-baseline space-x-2">
              <span className="mr-1 text-lg text-gray-400 line-through">39,000원</span>
              {/* 원래 가격 */}
              <span className="text-2xl font-bold text-[#e02020]">
                29,900원
                <span className="ml-3 text-sm font-normal text-gray-700">
                  혜택 정보
                  <GoQuestion className="inline-block ml-1 text-base text-gray-500 align-middle cursor-pointer" />
                </span>
              </span>
              {/* 할인 가격 및 혜택정보 */}
            </div>
          </div>

          {/* 상품 뱃지 (세일, 증정, 오늘드림) */}
          <div className="flex items-center mb-2">
            <span className="px-2 py-0.5 bg-[#f65c60] text-white text-xs rounded-[9px]">
              세일
            </span>
            <span className="px-2 py-0.5 bg-[#6fcff7] text-white text-xs rounded-[9px]">
              증정
            </span>
            <span className="px-2 py-0.5 bg-[#f374b7] text-white text-xs rounded-[9px]">
              오늘드림
            </span>
          </div>

          <p className="text-sm text-gray-600">
            <IoEyeOutline className="inline-block ml-1 font-bold text-base text-[#f27370] align-middle cursor-pointer" /> {/* 눈 모양 아이콘으로 변경 */}
            <span className="font-extrabold text-[#f27370]">16</span>
            <span className="text-[#f27370]">명이 보고있어요</span>
          </p>

          {/* 배송 정보 */}
          <div className="py-4">
            {/* 테두리 제거 */}
            <span className="mb-2 text-lg font-semibold">배송정보</span>
            <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
            <ul className="text-sm text-gray-700">
              <li className="flex mt-2 mb-2"> {/* li에 flex를 주고, 내부 요소들을 가로로 정렬 */}
                <span className="font-semibold text-gray-700 w-25">일반배송</span>
                <span className="mx-2 text-gray-300">|</span> {/* 세로 구분선 */}
                <div className="flex flex-col flex-1"> {/* 나머지 공간을 차지하고, 내부 콘텐츠는 세로로 정렬 */}
                  <span>2,500원 (20,000원 이상 무료배송)</span>
                  <span className="text-gray-700 ">
                    올리브영 배송: 평균 4일 이내 배송
                  </span>
                </div>
              </li>
              <li className="flex items-center mb-2">
                <span className="font-semibold text-gray-700 w-25">오늘드림</span>
                <span className="mx-2 text-gray-300">|</span> {/* 세로 구분선 추가 */}
                <div className="flex items-center flex-1">
                  2,500원 또는 5,000원
                  <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
                </div>
              </li>
              {/* 픽업 정보 아래 구분선 추가 */}
              <li className="flex items-center pb-3 border-b border-gray-200">
                <span className="mr-6 font-semibold text-gray-700 w-25">픽업</span>
                <span className="mx-2 text-gray-300">|</span> {/* 세로 구분선 추가 */}
                <div className="flex items-center flex-1">
                  배송비 조건 없음
                  <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
                </div>
              </li>
            </ul>
          </div>

          {/* 결제 혜택 */}
          <div className="mb-2 border-b ">
            {/* 테두리 제거 */}
            <p className="mb-2 text-lg font-semibold">결제혜택</p>
            <ul className="text-sm text-gray-700">
              <li className="flex items-center mb-1">
                <span>
                  THE CJ 카드 추가 10%할인
                  <GoQuestion className="inline-block ml-1 text-base text-gray-500 align-middle cursor-pointer" />
                </span>
              </li>
              <li className="flex items-center mb-4">
                <span>
                  CJ ONE 포인트 최대 1% 적립 예상
                  <GoQuestion className="inline-block ml-1 text-base text-gray-500 align-middle cursor-pointer" />
                </span>
              </li>
            </ul>
          </div>

          {/* 구매 수량 선택 */}
          <div className="flex items-center justify-between py-4 mb-4 border-b border-gray-200">
            <span className="text-lg font-semibold">구매수량</span>
            <div className="flex items-center border border-gray-300 rounded-sm">
              {/* 테두리 및 둥근 모서리 조정 */}
              <button className="flex items-center justify-center w-8 h-8 text-lg text-gray-600 rounded-l-sm hover:bg-gray-100">
                <CiCircleMinus className="w-5 h-5" /> {/* 아이콘 변경 */}
              </button>
              {/* 버튼 크기, 폰트 조정 */}
              <input
                type="text"
                value="1"
                readOnly
                className="w-12 h-8 text-sm text-center border-l border-r border-gray-300" // 입력 필드 크기, 폰트 조정
              />
              <button className="flex items-center justify-center w-8 h-8 text-lg text-gray-600 rounded-r-sm hover:bg-gray-100">
                <CiCirclePlus className="w-5 h-5" /> {/* 아이콘 변경 */}
              </button>
              {/* 버튼 크기, 폰트 조정 */}
            </div>
          </div>

          {/* 총 상품 금액 */}
          <div className="flex items-center justify-between py-4 mb-6 border-b-2 border-[#e02020]">
            {/* 배경색 제거, 패딩 조정 */}
            <span className="text-lg font-bold text-[#e02020]">상품금액 합계</span>
            {/* 폰트 굵기 제거 */}
            <span className="text-xl font-bold text-red-500">
              29,900원
            </span>
            {/* 색상 강조 */}
          </div>

          {/* 오늘드림 체크박스 */}
          <div className="flex items-center mb-4 text-sm">
            <input
              type="checkbox"
              id="todayDream"
              className="w-4 h-4 mr-2 accent-lime-600"
            />
            {/* 체크박스 크기 조정 */}
            <label htmlFor="todayDream">
              오늘드림으로 받아 보시겠어요?
              <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-600 align-middle cursor-pointer" />
            </label>
          </div>

          {/* 액션 버튼 (장바구니, 바로구매, 찜하기) */}
          <div className="flex mb-8 space-x-2">
            <button className="flex-1 py-3 text-lg border border-[#f27370] text-[#f27370] hover:bg-white">
              {/* 테두리, 색상, 폰트, 둥근 모서리 조정 */}
              장바구니
            </button>
            <button className="flex-1 py-3 text-lg text-white bg-[#f27370] hover:bg-[#f27370]">
              {/* 배경, 폰트, 둥근 모서리 조정 */}
              바로구매
            </button>
            {/* 선물 상자 아이콘 버튼 추가 */}
            <button className="flex items-center justify-center border bg-[#f27370] border-gray-300 rounded-sm w-14 hover:bg-gray-50">
              <FaGift className="w-6 h-6 text-white" /> {/* FaGift 아이콘 사용 */}
            </button>
            <button className="flex items-center justify-center border border-gray-300 w-14 h-14 hover:bg-white">
              {/* 크기, 테두리, 둥근 모서리 조정 */}
              <FaRegHeart className="w-6 h-6 text-gray-600" />
              {/* 하트 아이콘 추가 */}
            </button>
          </div>
        </div>
      </div>
      {/* 고객 리뷰 섹션 */}
      <div className="flex items-center justify-between px-4 py-4 mt-8 border-t border-gray-200 md:px-0">
        {/* 테두리 유지, 패딩 조정 */}
        <div className="flex items-center">
          <span className="mr-2 text-lg font-bold">고객리뷰</span>
          <div className="flex items-center">
            {/* 별점 - 시각적 표현을 위한 간소화 */}
            <span className="mr-1 text-2xl text-yellow-400">★★★★☆</span>
            <span className="mr-1 font-bold">4.8</span>
            <span className="text-gray-500">(3,833건)</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            <FaFacebookF className="mr-1 text-blue-600" /> URL
          </button>
          <button className="flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            <FaLink className="mr-1" /> URL
          </button>
        </div>
      </div>
      {/* 추가 정보 섹션 */}
      <div className="px-4 mt-8 md:px-0">
        {/* 정품 인증/공지 */}
        <div className="p-4 mb-6 bg-gray-50">
          {/* 둥근 모서리 제거 */}
          <p className="mb-2 font-semibold">총정품 안내</p>
          <p className="text-sm text-gray-700">
            \[일반배송]오늘드림, 픽업 주문시 정품제공
          </p>
          <p className="text-sm text-gray-700">
            자세히보기: 스킨케어 상품 10,000원 이상 구매시 정품1개 선착순 증정
          </p>
        </div>

        {/* 매장 찾기 버튼 */}
        <div className="flex justify-start mb-6">
          {/* 정중앙에서 왼쪽 정렬로 변경 */}
          <button className="flex items-center justify-center px-6 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            {/* 폭 조정 제거 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            구매 가능 수령매장 찾기
            <IoChevronForwardOutline className="ml-2" />
          </button>
        </div>

        {/* Dr.G 브랜드 링크 */}
        <div className="flex items-center justify-between py-4 mb-6 border-t border-b border-gray-200">
          <div className="flex items-center">
            {/* Dr.G 로고 이미지: 여기에 다운받은 이미지 경로를 넣어주세요 */}
            <img
              src="/path/to/your/drg_logo.png"
              alt="Dr.G Logo"
              className="h-8 mr-2"
            />
            {/* 이 부분을 실제 이미지 경로로 변경해주세요 (예: /images/drg_logo.png) */}
            <span className="text-lg font-bold">Dr.G</span>
          </div>
          <a
            href="#"
            className="flex items-center text-blue-600 hover:underline"
          >
            닥터지 브랜드관 <IoChevronForwardOutline className="ml-1" />
          </a>
        </div>

        {/* 프로모션 배너: 여기에 다운받은 이미지 경로를 넣어주세요 */}
        <div className="mb-8">
          <img
            src="/path/to/your/promotion_banner.jpg" // 이 부분을 실제 이미지 경로로 변경해주세요 (예: /images/promotion_banner.jpg)
            alt="메디힐 1등* 세럼 최다 구성 40ml 2입 + 여행용 10ml 추가 증정"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
      {/* 하단 내비게이션 (탭 메뉴) */}
      <div className="flex justify-around py-4 text-lg font-semibold text-gray-700 border-t border-gray-200">
        <button className="pb-2 border-b-2 border-black">상품설명</button>
        <button className="pb-2 hover:border-b-2 hover:border-gray-300">
          구매정보
        </button>
        <button className="pb-2 hover:border-b-2 hover:border-gray-300">
          리뷰 (3,833)
        </button>
        <button className="pb-2 hover:border-b-2 hover:border-gray-300">
          Q&A (38)
        </button>
      </div>
    </div>
  );
}

export default ProductPage1;