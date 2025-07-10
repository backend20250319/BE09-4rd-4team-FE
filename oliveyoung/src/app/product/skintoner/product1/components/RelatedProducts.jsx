"use client";

import React, { useRef, useState, useEffect } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { getImageUrl } from "@/utils/image";

const RelatedProducts = () => {
  const carouselRef = useRef(null);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const gapWidth = 16;

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

  useEffect(() => {
    const calculatePageWidth = () => {
      if (carouselRef.current && carouselRef.current.children.length > 0) {
        const firstItem = carouselRef.current.children[0];
        const itemWidth = firstItem.offsetWidth;
        const calculatedPageWidth =
          itemWidth * itemsPerPage + gapWidth * (itemsPerPage - 1);
        setPageWidth(calculatedPageWidth);
      }
    };

    calculatePageWidth();
    window.addEventListener("resize", calculatePageWidth);

    return () => {
      window.removeEventListener("resize", calculatePageWidth);
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

      <div className="relative">
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            className="absolute z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md -left-10 focus:outline-none"
          >
            <IoChevronForwardOutline className="w-5 h-5 text-gray-600 transform rotate-180" />
          </button>

          <div
            ref={carouselRef}
            className="flex w-full space-x-4 overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-none p-2 mb-6 bg-white snap-start"
                style={{
                  width: `calc((100% - ${gapWidth * (itemsPerPage - 1)}px) / ${itemsPerPage})`,
                }}
              >
                <div className="flex-shrink-0 w-24 h-24 mr-3">
                  <img
                    src={getImageUrl(product.img)}
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

          <button
            onClick={handleNextPage}
            className="absolute z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md -right-10 focus:outline-none"
          >
            <IoChevronForwardOutline className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;