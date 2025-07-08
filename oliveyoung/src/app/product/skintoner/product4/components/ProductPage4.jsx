"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaFacebookF, FaLink } from "react-icons/fa";
import { IoChevronForwardOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { FaRegHeart, FaGift } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

// 상품설명 탭 클릭 시 보여줄 이미지 컴포넌트
const ProductDescription = () => {
  const descriptionImages = [
    "/images/product/detailpage23.jpg",
    "/images/product/detailpage29.jpg",
    "/images/product/detailpage30.jpg",
    "/images/product/detailpage31.jpg",
    "/images/product/detailpage32.gif",
    "/images/product/detailpage33.jpg",
    "/images/product/detailpage34.gif",
    "/images/product/detailpage35.jpg",
    "/images/product/detailpage36.jpg",
  ];

  // 상품 설명이 확장되었는지 여부를 관리하는 상태
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  // 처음에 보여줄 이미지 개수 설정
  const initialImageCount = 2; // 이미지에서 처음에 2개 정도만 보이는 것 같아 2로 설정했습니다. 필요에 따라 조절하세요.

  // "더보기" 또는 "접기" 버튼 클릭 시 상태를 토글하는 함수
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // 현재 보여줄 이미지 배열을 결정
  const visibleImages = isDescriptionExpanded
    ? descriptionImages // 확장되었으면 모든 이미지
    : descriptionImages.slice(0, initialImageCount); // 아니면 initialImageCount 만큼만

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {visibleImages.map((imagePath, index) => (
        <div
          key={index}
          // 각 이미지를 감싸는 div 추가
          className={`w-full max-w-[800px] ${
            !isDescriptionExpanded && index === 1
              ? "overflow-hidden"
              : "h-auto mb-2"
            // 확장되지 않았고 두 번째 이미지(index === 1)일 경우: overflow-hidden과 고정 높이 적용
            // 그 외의 경우: h-auto 및 mb-2 (기존 스타일)
          }`}
        >
          <img
            src={imagePath}
            alt={`상품 상세 설명 ${index + 1}`}
            // 이미지는 항상 w-full로 부모 div에 맞춰집니다.
            className="object-contain w-full h-auto"
          />
        </div>
      ))}

      {/* "상품설명 더보기" 버튼 (초기 이미지 개수보다 많고, 아직 확장되지 않았을 때만 표시) */}
      {descriptionImages.length > initialImageCount &&
        !isDescriptionExpanded && (
          <button
            className="px-4 py-2 mt-4 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            onClick={toggleDescription}
          >
            상품설명 더보기{" "}
            <IoChevronForwardOutline className="inline-block ml-1 align-middle" />
          </button>
        )}

      {/* "상품설명 접기" 버튼 및 안내 문구 (확장되었을 때만 표시) */}
      {isDescriptionExpanded && (
        <div className="flex flex-col items-center">
          <div className="px-6 py-3 mt-6 mb-6 text-xs text-black bg-gray-100 border rounded">
            본 상품 정보(상품 상세, 상품 설명 등)의 내용은 해당 협력사가 직접
            등록한 것입니다.
          </div>
          <button
            className="px-4 py-2 text-sm text-black border border-black rounded hover:bg-blue-50"
            onClick={toggleDescription}
          >
            상품설명 접기{" "}
            <IoChevronForwardOutline className="inline-block ml-1 text-black align-middle transform rotate-180" />{" "}
            {/* 접기 아이콘은 반대 방향 */}
          </button>
        </div>
      )}

      {/* 이미지 아래에 추가할 텍스트가 있다면 여기에 작성합니다.
          모든 이미지가 보이거나, 처음부터 initialImageCount보다 적은 이미지가 있을 때만 이 텍스트를 표시합니다. */}
      {/* {(!isDescriptionExpanded && descriptionImages.length <= initialImageCount) || isDescriptionExpanded ? (
        <>
          <p className="mt-8 text-xl font-bold">피부와 헤리티지 기반 더모 코스메틱 No.1 닥터지</p>
          <p className="mt-2 text-base text-center text-gray-700">
            피부와 헤리티지 기반의 기술력을 담아 <br/>누구나 건강한 피부를 가질 수 있도록 제품을 개발합니다.
          </p>
        </>
      ) : null} */}
    </div>
  );
};

function ProductPage4() {
  const thumbnailPaths = [
    "/images/product/thumbnail14.jpg",
    "/images/product/thumbnail15.jpg",
    "/images/product/thumbnail16.jpg",
  ];

  const [mainImage, setMainImage] = useState(
    thumbnailPaths && thumbnailPaths.length > 0
      ? thumbnailPaths[0]
      : "/images/product/skintoner38.jpg"
  );
  const handleThumbnailClick = (imagePath) => {
    setMainImage(imagePath);
  };

  const [isBrandLiked, setIsBrandLiked] = useState(false);
  const handleBrandLikeToggle = () => {
    setIsBrandLiked(!isBrandLiked);
  };

  const products = [
    {
      id: 10,
      img: "/images/product/skintoner6.jpg",
      name: "[대용량 기획] 아누아 어성초 77 수딩 토너 350ml 기획 (+350ml 리필팩)",
      originalPrice: "49,000원",
      discountedPrice: "27,500",
      badge: ["쿠폰", "오늘드림"],
      filterValue: "popular",
      brand: "아누아",
    },
    {
      id: 11,
      img: "/images/product/skintoner7.jpg",
      name: "[피지쓱싹] 브링그린 티트리시카수딩토너 500mL 기획/단품",
      originalPrice: "27,000원",
      discountedPrice: "18,000",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
      filterValue: "new",
      brand: "브링그린",
    },
    {
      id: 12,
      img: "/images/product/skintoner8.jpg",
      name: "[6월올영픽/쿨링토너] 빌리프 아쿠아 밤 프로즌 토너 드롭드롭드롭 기획(토너300ml+50ml+겔패드 140매)",
      originalPrice: "32,000원",
      discountedPrice: "23,400",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
      filterValue: "sold",
      brand: "빌리프",
    },
    {
      id: 13,
      img: "/images/product/skintoner9.jpg",
      name: "[쿨링진정] 아비브 어성초 카밍 토너 스킨부스터 더블 기획 (200ml+200ml)",
      originalPrice: "39,000원",
      discountedPrice: "27,300",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "lowPrice",
      brand: "아비브",
    },
    {
      id: 14,
      img: "/images/product/skintoner10.jpg",
      name: "[단독기획] 아누아 어성초 77 수딩 토너 250ml 기획 (+로션 100ml)",
      originalPrice: "25,000원",
      discountedPrice: "19,900",
      badge: ["세일", "오늘드림"],
      filterValue: "discount",
      brand: "아누아",
    },
    {
      id: 15,
      img: "/images/product/skincare11.jpg",
      name: "[1+1+파우치] 라운드랩 1025 독도토너 300ml 1+1기획 (+누누씨파우치)",
      originalPrice: "29,800원",
      discountedPrice: "25,700",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "popular",
      brand: "파운드랩",
    },
    {
      id: 16,
      img: "/images/product/skintoner12.jpg",
      name: "[1등토너] 라운드랩 1025 독도 토너 200ml 기획 (+50ml)",
      originalPrice: "15,000원",
      discountedPrice: "13,500",
      badge: ["세일", "오늘드림"],
      filterValue: "new",
      brand: "라운드랩",
    },
    {
      id: 17,
      img: "/images/product/skintoner13.jpg",
      name: "라로슈포제 똘러리앙 울트라 로션 400ML (대용량)",
      originalPrice: "49,000원",
      discountedPrice: "41,650",
      badge: ["쿠폰", "오늘드림"],
      filterValue: "sold",
      brand: "라로슈포제",
    },
    {
      id: 18,
      img: "/images/product/skintoner14.jpg",
      name: "디오디너리 글리코릭 애시드 7% 엑스폴리에이팅 토너 240ml",
      originalPrice: "22,000원",
      discountedPrice: "16,300",
      badge: ["오늘드림"],
      filterValue: "lowPrice",
      brand: "디오디너치",
    },
    {
      id: 19,
      img: "/images/product/skintoner15.jpg",
      name: "[수분생기] 라운드랩 자작나무 수분 토너 1+1 기획 (300ml+300ml)",
      originalPrice: "28,500원",
      discountedPrice: "24,000",
      badge: ["오늘드림"],
      filterValue: "discount",
      brand: "라운드랩",
    },
    {
      id: 20,
      img: "/images/product/skintoner16.jpg",
      name: "[수분진정/화해1위] 에스네이처 아쿠아 오아시스 토너 300ml 기획 (+젤크림 30ml)",
      originalPrice: "24,000원",
      discountedPrice: "18,900",
      badge: ["세일", "오늘드림"],
      filterValue: "popular",
      brand: "에스네이처",
    },
    {
      id: 21,
      img: "/images/product/skincare17.jpg",
      name: "폴라초이스 스킨퍼펙팅 바하 리퀴드 118ml 기획 (+바하 리퀴드 30ml)",
      originalPrice: "35,000원",
      discountedPrice: "28,000",
      badge: ["쿠폰", "오늘드림"],
      filterValue: "new",
      brand: "폴라초이스",
    },
  ];

  const carouselRef = useRef(null);
  const itemsPerPage = 3; // 한 페이지에 표시할 상품 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스 (0부터 시작)
  const [pageWidth, setPageWidth] = useState(0); // 한 페이지의 정확한 너비
  // 새로 추가: 활성화된 탭 상태
  const [activeTab, setActiveTab] = useState("상품설명"); // 기본값 '상품설명'

  // Tailwind의 space-x-4는 기본적으로 16px (1rem) 입니다.
  const gapWidth = 16;

  // 캐러셀 너비 계산 (컴포넌트 마운트 시 및 리사이즈 시)
  useEffect(() => {
    const calculatePageWidth = () => {
      if (carouselRef.current && carouselRef.current.children.length > 0) {
        // 첫 번째 상품 카드 요소의 실제 너비를 가져옵니다. (offsetWidth는 padding 포함)
        const firstItem = carouselRef.current.children[0];
        const itemWidth = firstItem.offsetWidth;

        // 한 페이지의 너비는 3개 상품의 너비와 그 사이 2개의 간격을 더한 값입니다.
        const calculatedPageWidth =
          itemWidth * itemsPerPage + gapWidth * (itemsPerPage - 1);

        setPageWidth(calculatedPageWidth);

        // Debugging: 실제 계산된 itemWidth와 calculatedPageWidth를 콘솔에 출력하여 확인
        console.log("Item Width:", itemWidth);
        console.log("Calculated Page Width:", calculatedPageWidth);
        console.log("Container Scroll Width:", carouselRef.current.scrollWidth);
        console.log("Container Client Width:", carouselRef.current.clientWidth);
      }
    };

    calculatePageWidth(); // 초기 계산
    window.addEventListener("resize", calculatePageWidth); // 리사이즈 시 다시 계산

    return () => {
      window.removeEventListener("resize", calculatePageWidth); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [itemsPerPage, products.length]);

  const handleNextPage = () => {
    if (carouselRef.current && pageWidth > 0) {
      const totalPages = Math.ceil(products.length / itemsPerPage);
      const nextPage = (currentPage + 1) % totalPages;
      setCurrentPage(nextPage);

      const targetScrollLeft = nextPage * pageWidth;
      carouselRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handlePrevPage = () => {
    if (carouselRef.current && pageWidth > 0) {
      const totalPages = Math.ceil(products.length / itemsPerPage);
      const prevPage = (currentPage - 1 + totalPages) % totalPages;
      setCurrentPage(prevPage);

      const targetScrollLeft = prevPage * pageWidth;
      carouselRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto font-sans bg-white">
      {/* 상단 경로 (Breadcrumbs) - 구분선 추가됨 */}
      <div className="flex items-center px-4 py-3 pb-2 mb-6 text-sm text-gray-400 border-b md:px-0">
        <span>홈</span>
        <span className="mx-1">&gt;</span>
        <span>스킨케어</span>
        <span className="mx-1">&gt;</span>
        <span>스킨/토너</span>
        <span className="mx-1">&gt;</span>
        <span className="text-black ">
          [흔적미백] 넘버즈인 5번 글루타치온씨 비타수액 에센셜 토너 200ml
        </span>
      </div>
      {/* 메인 상품 콘텐츠 */}
      <div className="flex flex-col gap-12 p-4 md:flex-row md:p-0">
        {/* 왼쪽 섹션: 상품 메인 이미지 및 썸네일 */}
        <div className="flex flex-col lg:w-3/5">
          <div className="relative w-full max-w-[500px] h-[500px] mb-8">
            {/* 상품 메인 이미지: mainImage 상태에 따라 이미지 경로 변경 */}
            <img
              src={mainImage}
              alt="[흔적미백] 넘버즈인 5번 글루타치온씨 비타수액 에센셜 토너 200ml"
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
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {" "}
                    {/* 기본 링크 동작 방지 */}
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
          <p className="mb-1 text-sm text-black">넘버즈인 &gt;</p>
          <h1 className="mb-2 text-2xl font-semibold">
            [흔적미백] 넘버즈인 5번 글루타치온씨 비타수액 에센셜 토너 200ml
          </h1>

          {/* 가격 정보 */}
          <div className="mb-2">
            <div className="flex items-baseline space-x-2">
              <span className="mr-1 text-lg text-gray-400 line-through">
                24,000원
              </span>
              {/* 원래 가격 */}
              <span className="text-2xl font-bold text-[#e02020]">
                18,000원
                <span className="ml-3 text-sm font-normal text-gray-700">
                  혜택 정보
                  <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 align-middle cursor-pointer" />
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
            <span className="px-2 py-0.5 bg-[#f374b7] text-white text-xs rounded-[9px]">
              오늘드림
            </span>
          </div>

          <p className="text-sm text-gray-600">
            <IoEyeOutline className="inline-block ml-1 font-bold text-base text-[#f27370] align-middle cursor-pointer" />{" "}
            {/* 눈 모양 아이콘으로 변경 */}
            <span className="font-extrabold text-[#f27370]">23</span>
            <span className="text-[#f27370]">명이 보고있어요</span>
          </p>

          {/* 배송 정보 */}
          <div className="py-4">
            {/* 테두리 제거 */}
            <span className="mb-2 text-lg font-semibold">배송정보</span>
            <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
            <ul className="text-sm text-gray-700">
              <li className="flex mt-2 mb-2">
                {" "}
                {/* li에 flex를 주고, 내부 요소들을 가로로 정렬 */}
                <span className="font-semibold text-gray-700 w-25">
                  일반배송
                </span>
                <span className="mx-2 text-gray-300">|</span>{" "}
                {/* 세로 구분선 */}
                <div className="flex flex-col flex-1">
                  {" "}
                  {/* 나머지 공간을 차지하고, 내부 콘텐츠는 세로로 정렬 */}
                  <span>2,500원 (20,000원 이상 무료배송)</span>
                  <span className="text-gray-700 ">
                    올리브영 배송: 평균 4일 이내 배송
                  </span>
                </div>
              </li>
              <li className="flex items-center mb-2">
                <span className="font-semibold text-gray-700 w-25">
                  오늘드림
                </span>
                <span className="mx-2 text-gray-300">|</span>{" "}
                {/* 세로 구분선 추가 */}
                <div className="flex items-center flex-1">
                  2,500원 또는 5,000원
                  <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
                </div>
              </li>
              {/* 픽업 정보 아래 구분선 추가 */}
              <li className="flex items-center pb-3 border-b border-gray-200">
                <span className="mr-6 font-semibold text-gray-700 w-25">
                  픽업
                </span>
                <span className="mx-2 text-gray-300">|</span>{" "}
                {/* 세로 구분선 추가 */}
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
            <span className="text-lg font-bold text-[#e02020]">
              상품금액 합계
            </span>
            {/* 폰트 굵기 제거 */}
            <span className="text-xl font-bold text-red-500">18,000원</span>
            {/* 색상 강조 */}
          </div>

          {/* 오늘드림 체크박스 */}
          <div className="flex items-center mb-4 text-sm">
            <input
              type="checkbox"
              id="todayDream"
              className="w-4 h-4 mr-2 accent-[#f27370]"
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
            {/* 선물 상자 아이콘 추가 */}
            <button className="flex items-center justify-center border bg-[#f27370] border-gray-300 rounded-sm w-14 hover:bg-gray-50">
              <FaGift className="w-6 h-6 text-white" />{" "}
              {/* FaGift 아이콘 사용 */}
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
      <div className="flex items-center justify-between px-4 py-4 mt-4 border-t border-gray-200 md:px-0">
        {/* 테두리 유지, 패딩 조정 */}
        <div className="flex items-center">
          <span className="mr-2 text-lg font-bold">고객 리뷰</span>
          <div className="flex items-center">
            {/* 별점 - 시각적 표현을 위한 간소화 */}
            <span className="mr-1 text-2xl text-[#f27370]">★★★★☆</span>
            <span className="mr-1 font-bold">4.8</span>
            <span className="text-gray-500">(1,576건)</span>
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
      <div className="px-4 mt-6 md:px-0">
        {/* 정품 인증/공지 */}
        <div className="p-4 mb-6 bg-gray-50">
          <p className="mb-2 font-semibold">증정품 안내</p>
          <p className="text-sm text-gray-700">
            [일반배송]오늘드림, 픽업 주문시 정품제공
          </p>
          <p className="text-sm text-gray-700">
            전 회원 올리브영 전 상품 70,000원 이상 구매 시, 증정품 1개 선착순
            증정
          </p>
        </div>

        {/* 매장 찾기 버튼 및 닥터지 브랜드관 버튼 */}
        <div className="flex justify-start mb-6 space-x-5">
          {/* 구매 가능 수령매장 찾기 버튼 (기존) */}
          <a
            href="javascript:;"
            title="구매 가능 올영매장 찾기"
            className="flex items-center justify-center flex-1 px-6 py-3 font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
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
          </a>

          {/* 닥터지 브랜드관 버튼 (수정) */}
          <button
            className="flex items-center justify-center flex-1 px-6 py-3 font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            // 원래는 data-attr 등 추가 속성 필요할 수 있음
          >
            <span
              className="inline-block w-20 h-8 mr-2 bg-center bg-cover rounded-full"
              style={{
                backgroundImage:
                  "url('https://image.oliveyoung.co.kr/uploads/images/onlBrandMgmt/2025/2/4872412323201890441.jpg')",
              }}
              role="img"
              aria-label="Dr.G Logo"
            ></span>
            넘버즈인 브랜드관
            <IoChevronForwardOutline className="ml-2" />
          </button>
        </div>
      </div>

      {/* "이런 스킨/토너 상품은 어때요?" 섹션 시작 */}
      {/* 이 div에 px-4를 추가하여 캐러셀 전체에 좌우 패딩을 적용합니다. */}
      <div className="relative px-4 mt-12 md:px-0">
        {/* 이 div에서는 이제 px-4를 제거합니다. */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">이런 스킨/토너 상품은 어때요?</h2>
          <a
            href="#"
            className="flex items-center text-sm text-gray-600 hover:underline"
          >
            더보기 <IoChevronForwardOutline className="ml-1 text-base" />
          </a>
        </div>

        {/* 상품 캐러셀/목록 */}
        <div className="relative">
          <div className="flex items-center">
            {/* 왼쪽 화살표 */}
            <button
              onClick={handlePrevPage}
              className="absolute z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md -left-10 focus:outline-none"
            >
              <IoChevronForwardOutline className="w-5 h-5 text-gray-600 transform rotate-180" />
            </button>

            {/* 상품 카드 목록 (가로 스크롤) */}
            <div
              ref={carouselRef}
              className="flex w-full space-x-4 overflow-x-hidden scroll-smooth snap-x snap-mandatory"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  // border border-gray-100 및 shadow-sm 제거
                  className="flex flex-none p-2 mb-6 bg-white snap-start"
                  style={{
                    width: `calc((100% - ${
                      gapWidth * (itemsPerPage - 1)
                    }px) / ${itemsPerPage})`,
                  }}
                >
                  <div className="flex-shrink-0 w-24 h-24 mr-3">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="object-contain w-full h-full rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <p className="mb-1 text-sm font-semibold line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-baseline mb-1">
                      <span className="mr-1 text-xs text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                      <span className="text-base font-bold text-red-500">
                        {product.discountedPrice}원
                      </span>
                    </div>
                    <div className="flex flex-wrap">
                      {product.badge.map((badgeText, badgeIdx) => {
                        let bgColorClass = "";
                        switch (badgeText) {
                          case "세일":
                            bgColorClass = "bg-[#f65c60]";
                            break;
                          case "쿠폰":
                            bgColorClass = "bg-[#9bce26]";
                            break;
                          case "증정":
                            bgColorClass = "bg-[#6fcff7]";
                            break;
                          case "오늘드림":
                            bgColorClass = "bg-[#f374b7]";
                            break;
                          default:
                            bgColorClass = "bg-gray-500";
                        }
                        return (
                          <span
                            key={badgeIdx}
                            className={`px-1.5 py-0.5 text-white text-xs rounded-sm mr-1 mb-1 ${bgColorClass}`}
                          >
                            {badgeText}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 오른쪽 화살표 */}
            <button
              onClick={handleNextPage}
              className="absolute z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md -right-10 focus:outline-none"
            >
              <IoChevronForwardOutline className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 하단 내비게이션 (탭 메뉴) */}
      <div className="flex justify-around text-lg font-semibold text-gray-700 border border-gray-200">
        <button
          className={`${
            activeTab === "상품설명"
              ? "bg-gray-100 border-b-2 border-black" // 활성화된 탭 배경 및 하단 강조
              : "hover:bg-gray-50" // 비활성화 탭 호버 효과
          } flex-1 py-2 text-center`}
          onClick={() => setActiveTab("상품설명")}
        >
          상품설명
        </button>
        <button
          className={`${
            activeTab === "구매정보"
              ? "bg-gray-100 border-b-2 border-black" // <-- border-blue-500을 border-black으로 변경
              : "hover:bg-gray-50"
          } flex-1 py-2 text-center border-l border-gray-200`}
          onClick={() => setActiveTab("구매정보")}
        >
          구매정보
        </button>
        <button
          className={`${
            activeTab === "리뷰"
              ? "bg-gray-100 border-b-2 border-black"
              : "hover:bg-gray-50"
          } flex-1 py-2 text-center border-l border-gray-200`}
          onClick={() => setActiveTab("리뷰")}
        >
          리뷰 (1,576)
        </button>
        <button
          className={`${
            activeTab === "Q&A"
              ? "bg-gray-100 border-b-2 border-black"
              : "hover:bg-gray-50"
          } flex-1 py-2 text-center border-l border-gray-200`} // 좌측 구분선 추가
          onClick={() => setActiveTab("Q&A")}
        >
          Q&A (49)
        </button>
      </div>

      {/* 탭 내용 표시 영역 */}
      <div className="mt-8">
        {activeTab === "상품설명" && <ProductDescription />}
        {activeTab === "구매정보" && (
          <div className="p-4 text-center">
            <p className="text-gray-600">구매 정보 섹션입니다.</p>
          </div>
        )}
        {activeTab === "리뷰" && (
          <div className="p-4 text-center">
            <p className="text-gray-600">리뷰 섹션입니다.</p>
          </div>
        )}
        {activeTab === "Q&A" && (
          <div className="p-4 text-center">
            <p className="text-gray-600">Q&A 섹션입니다.</p>
          </div>
        )}
      </div>

      {/* 다른 고객이 함께 본 상품 섹션 시작 */}
      {/* 캐러셀 전체에 좌우 패딩을 적용합니다. */}
      {/* 상단 구분선과 상단 패딩 추가 */}
      <div className="relative px-4 pt-8 mt-12 border-t border-gray-200 md:px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">다른 고객이 함께 본 상품</h2>
          <a
            href="#"
            className="flex items-center text-sm text-gray-600 hover:underline"
          >
            더보기 <IoChevronForwardOutline className="ml-1 text-base" />
          </a>
        </div>

        {/* 상품 캐러셀/목록 */}
        <div className="relative">
          <div className="flex items-center">
            {/* 왼쪽 화살표 */}
            <button
              onClick={handlePrevPage}
              className="absolute z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md -left-10 focus:outline-none"
            >
              <IoChevronForwardOutline className="w-5 h-5 text-gray-600 transform rotate-180" />
            </button>

            {/* 상품 카드 목록 (가로 스크롤) */}
            <div
              ref={carouselRef}
              className="flex w-full space-x-4 overflow-x-hidden scroll-smooth snap-x snap-mandatory"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  // border border-gray-100 및 shadow-sm 제거
                  className="flex flex-none p-2 mb-6 bg-white snap-start"
                  style={{
                    width: `calc((100% - ${
                      gapWidth * (itemsPerPage - 1)
                    }px) / ${itemsPerPage})`,
                  }}
                >
                  <div className="flex-shrink-0 w-24 h-24 mr-3">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="object-contain w-full h-full rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <p className="mb-1 text-sm font-semibold line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-baseline mb-1">
                      <span className="mr-1 text-xs text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                      <span className="text-base font-bold text-red-500">
                        {product.discountedPrice}원
                      </span>
                    </div>
                    <div className="flex flex-wrap">
                      {product.badge.map((badgeText, badgeIdx) => {
                        let bgColorClass = "";
                        switch (badgeText) {
                          case "세일":
                            bgColorClass = "bg-[#f65c60]";
                            break;
                          case "쿠폰":
                            bgColorClass = "bg-[#9bce26]";
                            break;
                          case "증정":
                            bgColorClass = "bg-[#6fcff7]";
                            break;
                          case "오늘드림":
                            bgColorClass = "bg-[#f374b7]";
                            break;
                          default:
                            bgColorClass = "bg-gray-500";
                        }
                        return (
                          <span
                            key={badgeIdx}
                            className={`px-1.5 py-0.5 text-white text-xs rounded-sm mr-1 mb-1 ${bgColorClass}`}
                          >
                            {badgeText}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 오른쪽 화살표 */}
            <button
              onClick={handleNextPage}
              className="absolute z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md -right-10 focus:outline-none"
            >
              <IoChevronForwardOutline className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* "다른 고객이 함께 본 상품" 섹션 끝 */}
    </div>
  );
}

export default ProductPage4;
