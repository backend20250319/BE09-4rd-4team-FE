// src/app/product/skintoner/product1/components/ProductPage1.jsx

"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState, useEffect } from "react";
import { FaFacebookF, FaLink } from "react-icons/fa";
import { IoChevronForwardOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { FaRegHeart, FaGift } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import axios from "axios"; // axios 임포트

// ProductDescription 컴포넌트 (변경 없음)
const ProductDescription = () => {
  const descriptionImages = [
    "/images/product/detailpage1.jpg",
    "/images/product/detailpage2.jpg",
    "/images/product/detailpage3.jpg",
    "/images/product/detailpage4.jpg",
    "/images/product/detailpage5.jpg",
    "/images/product/detailpage13.jpg",
    "/images/product/detailpage6.gif",
    "/images/product/detailpage14.jpg",
    "/images/product/detailpage7.jpg",
    "/images/product/detailpage8.jpg",
    "/images/product/detailpage9.gif",
    "/images/product/detailpage10.jpg",
    "/images/product/detailpage11.jpg",
    "/images/product/detailpage12.jpg",
  ];

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const initialImageCount = 2;

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const visibleImages = isDescriptionExpanded
    ? descriptionImages
    : descriptionImages.slice(0, initialImageCount);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {visibleImages.map((imagePath, index) => (
        <img
          key={index}
          src={imagePath}
          alt={`상품 상세 설명 ${index + 1}`}
          className="w-full max-w-[800px] h-auto object-contain mb-2"
        />
      ))}

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

      {isDescriptionExpanded && (
        <div className="flex flex-col items-center mt-6">
          <div className="px-6 py-3 mb-6 text-xs text-black bg-gray-100 border rounded">
            본 상품 정보(상품 상세, 상품 설명 등)의 내용은 해당 협력사가 직접
            등록한 것입니다.
          </div>
          <button
            className="px-4 py-2 text-sm text-black border border-black rounded hover:bg-blue-50"
            onClick={toggleDescription}
          >
            상품설명 접기{" "}
            <IoChevronForwardOutline className="inline-block ml-1 text-black align-middle transform rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

// ProductPage1 컴포넌트 시작
function ProductPage1({ productId }) {
  // productId를 props로 받습니다.
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mainImage, setMainImage] = useState("");
  const handleThumbnailClick = (imagePath) => {
    setMainImage(imagePath);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setLoading(false);
        setError("상품 ID가 제공되지 않았습니다.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiUrl = `http://localhost:8080/api/products/skintoner/${productId}`;
        console.log(
          `Fetching product details for ID: ${productId} from ${apiUrl}`
        );

        const response = await axios.get(apiUrl);
        const data = response.data;

        setProductData(data);
        setMainImage(data.imageUrl);
      } catch (err) {
        console.error(`상품 상세 정보 로드 실패 (ID: ${productId}):`, err);
        if (err.response) {
          setError(
            `상품 정보를 불러오는 데 실패했습니다: ${err.response.status} - ${
              err.response.data.message || "알 수 없는 서버 오류"
            }`
          );
        } else if (err.request) {
          setError(
            "상품 정보를 불러오는 데 실패했습니다: 서버로부터 응답을 받지 못했습니다."
          );
        } else {
          setError(
            "상품 정보를 불러오는 데 실패했습니다: 요청을 보내는 중 오류가 발생했습니다."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // productId가 변경될 때마다 useEffect 재실행

  // 로딩, 에러, 데이터 없음 상태 처리
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>상품 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 상품 이미지 썸네일 경로 생성: 백엔드 DTO에 subImageUrls 필드가 있다면 사용
  const thumbnailPaths =
    productData.subImageUrls &&
    Array.isArray(productData.subImageUrls) &&
    productData.subImageUrls.length > 0
      ? [productData.imageUrl, ...productData.subImageUrls]
      : [productData.imageUrl];

  // 캐러셀 더미 데이터 (변경 없음)
  const productsCarousel = [
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

  // ... (캐러셀 관련 useRef, useState, useEffect 등 기존 로직 유지) ...
  // 캐러셀 로직은 이 답변에서 크게 변경하지 않습니다.

  return (
    <div className="relative max-w-6xl mx-auto font-sans bg-white">
      {/* 상단 경로 (Breadcrumbs) - productData 활용 */}
      <div className="flex items-center px-4 py-3 pb-2 mb-6 text-sm text-gray-400 border-b md:px-0">
        <span>홈</span>
        <span className="mx-1">&gt;</span>
        <span>{productData.categoryName || "카테고리"}</span>
        <span className="mx-1">&gt;</span>
        <span>스킨/토너</span>
        <span className="mx-1">&gt;</span>
        <span className="text-black ">{productData.productName}</span>
      </div>

      {/* 메인 상품 콘텐츠 */}
      <div className="flex flex-col gap-12 p-4 md:flex-row md:p-0">
        {/* 왼쪽 섹션: 상품 메인 이미지 및 썸네일 */}
        <div className="flex flex-col lg:w-3/5">
          <div className="relative w-full max-w-[500px] h-[500px] mb-8">
            <img
              src={mainImage}
              alt={productData.productName}
              className="object-contain w-full h-full rounded-md"
            />
          </div>
          {/* 썸네일 목록 - thumbnailPaths 사용 */}
          <ul className="flex justify-center space-x-2">
            {thumbnailPaths.map((imagePath, index) => (
              <li
                key={imagePath}
                className={`w-[80px] h-[80px] cursor-pointer ${
                  mainImage === imagePath
                    ? "border-2 border-black"
                    : "border border-gray-300"
                } hover:border-black`}
                onClick={() => handleThumbnailClick(imagePath)}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <img
                    src={imagePath}
                    alt={`썸네일 이미지 ${index + 1}`}
                    className="object-contain w-full h-full"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽 섹션: 상품 상세 정보 - productData 활용 */}
        <div className="p-4 md:w-1/2 lg:w-3/5 md:p-0">
          <p className="mb-1 text-sm text-black">
            {productData.brandName} &gt;
          </p>
          <h1 className="mb-2 text-2xl font-semibold">
            {productData.productName}
          </h1>

          {/* 가격 정보 */}
          <div className="mb-2">
            <div className="flex items-baseline space-x-2">
              {productData.originalPrice && (
                <span className="mr-1 text-lg text-gray-400 line-through">
                  {productData.originalPrice.toLocaleString()}원
                </span>
              )}
              <span className="text-2xl font-bold text-[#e02020]">
                {productData.discountedPrice.toLocaleString()}원
                <span className="ml-3 text-sm font-normal text-gray-700">
                  혜택 정보
                  <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 align-middle cursor-pointer" />
                </span>
              </span>
            </div>
            {productData.discountRate && (
              <span className="text-xl font-bold text-[#e02020] ml-2">
                {productData.discountRate}%
              </span>
            )}
          </div>

          {/* 상품 뱃지 */}
          <div className="flex items-center mb-2">
            {productData.badgeNames &&
              productData.badgeNames.map((badgeText, index) => {
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
                    key={index}
                    className={`px-2 py-0.5 text-white text-xs rounded-[9px] mr-1 ${bgColorClass}`}
                  >
                    {badgeText}
                  </span>
                );
              })}
          </div>
          {/* 뷰 카운트 */}
          <p className="text-sm text-gray-600">
            {productData.viewCount && (
              <>
                <IoEyeOutline className="inline-block ml-1 font-bold text-base text-[#f27370] align-middle cursor-pointer" />{" "}
                <span className="font-extrabold text-[#f27370]">
                  {productData.viewCount.toLocaleString()}
                </span>
                <span className="text-[#f27370]">명이 보고있어요</span>
              </>
            )}
          </p>

          {/* 배송 정보 (기존 유지) */}
          <div className="py-4">
            <span className="mb-2 text-lg font-semibold">배송정보</span>
            <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
            <ul className="text-sm text-gray-700">
              <li className="flex mt-2 mb-2">
                <span className="font-semibold text-gray-700 w-25">
                  일반배송
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <div className="flex flex-col flex-1">
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
                <span className="mx-2 text-gray-300">|</span>
                <div className="flex items-center flex-1">
                  2,500원 또는 5,000원
                  <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
                </div>
              </li>
              <li className="flex items-center pb-3 border-b border-gray-200">
                <span className="mr-6 font-semibold text-gray-700 w-25">
                  픽업
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <div className="flex items-center flex-1">
                  배송비 조건 없음
                  <GoQuestion className="inline-block ml-1 text-base text-gray-500 cursor-pointer" />
                </div>
              </li>
            </ul>
          </div>
          {/* 결제 혜택 (기존 유지) */}
          <div className="mb-2 border-b ">
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
          {/* 구매 수량 선택 (기존 유지) */}
          <div className="flex items-center justify-between py-4 mb-4 border-b border-gray-200">
            <span className="text-lg font-semibold">구매수량</span>
            <div className="flex items-center border border-gray-300 rounded-sm">
              <button className="flex items-center justify-center w-8 h-8 text-lg text-gray-600 rounded-l-sm hover:bg-gray-100">
                <CiCircleMinus className="w-5 h-5" />
              </button>
              <input
                type="text"
                value="1"
                readOnly
                className="w-12 h-8 text-sm text-center border-l border-r border-gray-300"
              />
              <button className="flex items-center justify-center w-8 h-8 text-lg text-gray-600 rounded-r-sm hover:bg-gray-100">
                <CiCirclePlus className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* 총 상품 금액 (productData 활용) */}
          <div className="flex items-center justify-between py-4 mb-6 border-b-2 border-[#e02020]">
            <span className="text-lg font-bold text-[#e02020]">
              상품금액 합계
            </span>
            <span className="text-xl font-bold text-red-500">
              {productData.discountedPrice.toLocaleString()}원
            </span>
          </div>
          {/* 오늘드림 체크박스 (기존 유지) */}
          <div className="flex items-center mb-4 text-sm">
            <input
              type="checkbox"
              id="todayDream"
              className="w-4 h-4 mr-2 accent-[#f27370]"
            />
            <label htmlFor="todayDream">
              오늘드림으로 받아 보시겠어요?
              <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-600 align-middle cursor-pointer" />
            </label>
          </div>
          {/* 액션 버튼 (장바구니, 바로구매, 찜하기 - 기존 유지) */}
          <div className="flex mb-8 space-x-2">
            <button className="flex-1 py-3 text-lg border border-[#f27370] text-[#f27370] hover:bg-white">
              장바구니
            </button>
            <button className="flex-1 py-3 text-lg text-white bg-[#f27370] hover:bg-[#f27370]">
              바로구매
            </button>
            <button className="flex items-center justify-center border bg-[#f27370] border-gray-300 rounded-sm w-14 hover:bg-gray-50">
              <FaGift className="w-6 h-6 text-white" />
            </button>
            <button className="flex items-center justify-center border border-gray-300 w-14 h-14 hover:bg-white">
              <FaRegHeart className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* 고객 리뷰 섹션 - productData 활용 */}
      <div className="flex items-center justify-between px-4 py-4 mt-4 border-t border-gray-200 md:px-0">
        <div className="flex items-center">
          <span className="mr-2 text-lg font-bold">고객 리뷰</span>
          <div className="flex items-center">
            {productData.averageRating && (
              <>
                <span className="mr-1 text-2xl text-[#f27370]">
                  {"⭐".repeat(Math.floor(productData.averageRating))}
                  {productData.averageRating % 1 !== 0 &&
                  productData.averageRating % 1 >= 0.5
                    ? "★"
                    : ""}
                </span>
                <span className="mr-1 font-bold">
                  {productData.averageRating}
                </span>
                <span className="text-gray-500">
                  (
                  {productData.reviewCount
                    ? productData.reviewCount.toLocaleString()
                    : 0}
                  건)
                </span>
              </>
            )}
          </div>
        </div>
        {/* URL 공유 버튼 (기존 유지) */}
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
        {/* 증정품 안내 (기존 유지) */}
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
        {/* 매장 찾기 버튼 및 브랜드관 버튼 (productData.brandName 활용) */}
        <div className="flex justify-start mb-6 space-x-5">
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
          <button className="flex items-center justify-center flex-1 px-6 py-3 font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            <span
              className="inline-block w-12 h-8 mr-2 bg-center bg-cover rounded-full"
              style={{
                backgroundImage: `url('https://image.oliveyoung.co.kr/uploads/images/onlBrandMgmt/2021/4/7996462662502374809.jpg')`,
              }}
              role="img"
              aria-label="Dr.G Logo"
            ></span>
            {productData.brandName} 브랜드관
            <IoChevronForwardOutline className="ml-2" />
          </button>
        </div>
      </div>
      <div className="relative px-4 mt-12 md:px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">이런 스킨/토너 상품은 어때요?</h2>
          <a
            href="#"
            className="flex items-center text-sm text-gray-600 hover:underline"
          >
            더보기 <IoChevronForwardOutline className="ml-1 text-base" />
          </a>
        </div>
        {/* 캐러셀 로직 및 HTML (기존 유지) */}
        {/* ... */}
      </div>
    </div>
  );
}

export default ProductPage1;
