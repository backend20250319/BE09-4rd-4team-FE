'use client';

import React from "react";

function ProductCarousel() {
  const products = [
    {
      img: "/images/skincare1.jpg",
      name: "[대용량150ml] 웰라쥬 리얼 히알루로닉 블루 100 앰플 75ml 1+1 기획",
      originalPrice: "46,000원",
      discountedPrice: "29,900",
      badge: ["세일", "증정", "오늘드림"],
    },
    {
      img: "/images/skincare2.jpg",
      name: "[1+1/모공 수분천재크림] 에스네이처 아쿠아 스쿠알란 수분크림 60ml 더블기획(60ml+60ml)",
      originalPrice: "43,000원",
      discountedPrice: "21,150",
      badge: ["세일", "쿠폰", "오늘드림"],
    },
    {
      img: "/images/skincare3.jpg",
      name: "[6월 올영픽/1+1+증정] 메디힐 마데카소사이드 흔적 리페어 세럼 40+40+10mL",
      originalPrice: "36,900원",
      discountedPrice: "22,500",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
    },
    {
      img: "/images/skincare4.jpg",
      name: "에스트라 아토베리어365 크림 80ml 기획 (+하이드로 에센스25ml+세라-히알 앰플7ml)",
      originalPrice: "33,000원",
      discountedPrice: "29,700",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare5.jpg",
      name: "[뷰티디바이스 1위] 메디큐브 부스터프로/부스터프로 미니 기획세트 라인업",
      originalPrice: "99,000원",
      discountedPrice: "98,500",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare6.jpg",
      name: "[6월올영픽/이영지Pick/수분진정] 닥터지 레드 블레미쉬 클리어 수딩 크림 70ml 기획 3종",
      originalPrice: "38,000원",
      discountedPrice: "26,700",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
    },
    {
      img: "/images/skincare7.jpg",
      name: "[6월 올영픽/1등세럼] 브링그린 징크테카 트러블세럼 50ml+25리필(+징크테카 S.O.S 스팟 젤)",
      originalPrice: "56,100원",
      discountedPrice: "28,900",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
    },
    {
      img: "/images/skincare8.jpg",
      name: "[6월올영픽] 토리든 다이브인 히알루론산 수딩 크림 100ml 더블 한정 기획 (+토너 100ml)",
      originalPrice: "42,000원",
      discountedPrice: "28,100",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
    },
    {
      img: "/images/skincare9.jpg",
      name: "[6월 올영픽] 에스트라 아토베리어365 하이드로 수딩크림 100ml 대용량 기획 (+수딩크림 30ml+세라-히알 속수분 앰플3ml)",
      originalPrice: "47,000원",
      discountedPrice: "42,300",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare10.jpg",
      name: "[구매인증 이벤트/흔적미백]메디큐브 PDRN 핑크 펩타이드 앰플 30ml 리필기획(본품 30ML+리필 50ML)",
      originalPrice: "46,000원",
      discountedPrice: "25,900",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare11.jpg",
      name: "[1+1+스티커] 라운드랩 소나무 진정 시카 앰플 30ml 더블 기획 (+누누씨스티커모음)",
      originalPrice: "43,000원",
      discountedPrice: "21,400",
      badge: ["세일", "쿠폰", "오늘드림"],
    },
    {
      img: "/images/skincare12.jpg",
      name: "[NO.1 미스트세럼] 달바 퍼스트 스프레이 세럼 100ml 2개 기획",
      originalPrice: "59,800원",
      discountedPrice: "35,200",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare13.jpg",
      name: "라로슈포제 시카플라스트 멀티 리페어 크림 B5 100ml 기획 (+멜라B3 세럼 3ml증정)",
      originalPrice: "50,000원",
      discountedPrice: "40,000",
      badge: ["쿠폰", "오늘드림"],
    },
    {
      img: "/images/skincare14.jpg",
      name: "[6월 올영픽/단독기획]바이오더마 하이드라비오 토너 500ml 기획/단품",
      originalPrice: "38,000원",
      discountedPrice: "27,500",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare15.jpg",
      name: "[6월 올영픽/단독기획] 토리든 다이브인 저분자 히알루론산 세럼 50ml 리필기획(+리필팩 50ml)",
      originalPrice: "36,000원",
      discountedPrice: "24,100",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
    },
    {
      img: "/images/skincare16.jpg",
      name: "아누아 피디알엔 히알루론산 캡슐 100 세럼 30mL 기획 (+30mL 리필팩)",
      originalPrice: "58,500원",
      discountedPrice: "29,500",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare17.jpg",
      name: "[6월 올영픽] 온그리디언츠 스킨 베리어 카밍 로션 기획(220ml+80ml)",
      originalPrice: "42,000원",
      discountedPrice: "39,900",
      badge: ["오늘드림"],
    },
    {
      img: "/images/skincare18.jpg",
      name: "[1+1+1] 차앤박 프로폴리스 에너지 액티브 앰플 30ml 트리플 기획",
      originalPrice: "74,000원",
      discountedPrice: "39,900",
      badge: ["세일", "쿠폰", "오늘드림"],
    },
    {
      img: "/images/skincare19.jpg",
      name: "[대용량/트러블1등] 파티온 노스카나인 트러블 세럼 50ml 리필 기획(+리필40ml+크림10ml)",
      originalPrice: "54,000원",
      discountedPrice: "33,900",
      badge: ["세일", "오늘드림"],
    },
    {
      img: "/images/skincare20.jpg",
      name: "구달 청귤 비타C 잡티케어 세럼 50ml+31ml 기획",
      originalPrice: "43,000원",
      discountedPrice: "25,400",
      badge: ["세일", "쿠폰", "오늘드림"],
    },
  ];

  return (
    <div className="container py-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center">
        스킨케어에서 많이 본 상품이에요
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center transition-shadow bg-white rounded-lg cursor-pointer"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto mb-3 rounded-md"
            />
            <p className="text-lg font-bold text-center text-red-500">
              {product.price}
            </p>
            {/* 상품명 2줄로 제한하고 말줄임 처리 */}
            <p className="mb-2 text-lg font-semibold text-center line-clamp-2">
              {product.name}
            </p>
            {/* 상품 상세 설명 */}
            {product.description && (
              <>
                <strong className="w-[215px] text-center text-sm text-[#777] mt-[10px] cursor-pointer">
                  {product.description}
                </strong>
              </>
            )}
            {/* 가격 정보 */}
            <div className="w-[215px] flex flex-col mt-[5px] items-center text-left">
              <p className="text-sm line-through font-semibold text-[#a9a9a9]">
                {product.originalPrice}
              </p>
              <p className="text-xl text-[#e02020] font-bold">
                {product.discountedPrice}원
              </p>
            </div>
            {/* 배지 (1+1, 쿠폰, 증정, 오늘드림) */}
            <div className="w-[215px] flex flex-row justify-center mt-[5px]">
              {product.badge.map((badge, badgeIdx) => {
                let badgeWidth = "auto";
                if (badge === "세일") badgeWidth = "35px";
                if (badge === "쿠폰") badgeWidth = "35px";
                if (badge === "증정") badgeWidth = "35px";
                if (badge === "오늘드림") badgeWidth = "55px";

                return (
                  <div
                    key={badgeIdx}
                    className={`h-[20px] rounded-[9px] text-[#fff] text-xs justify-center leading-[7px] flex items-center 
                    ${
                      badge === "세일"
                        ? "bg-[#f65c60]"
                        : badge === "쿠폰"
                        ? "bg-[#9bce26]"
                        : badge === "증정"
                        ? "bg-[#6fcff7]"
                        : badge === "오늘드림"
                        ? "bg-[#f374b7]"
                        : ""
                    }`}
                    style={{ width: badgeWidth }}
                  >
                    {badge}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;