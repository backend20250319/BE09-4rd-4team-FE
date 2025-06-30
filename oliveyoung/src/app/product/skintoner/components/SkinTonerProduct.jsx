"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js의 useRouter

function SkinTonerProduct() {
  const router = useRouter();

  const products = [
    {
      id: 1,
      img: "/images/skintoner1.jpg",
      name: "[단독기획/속건조해결] 파티온 포도당 하이드로 에센스토너 300ml 더블 기획(2개입)",
      originalPrice: "32,000원",
      discountedPrice: "21,700",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner2.jpg",
      name: "[6월올영픽] 토리든 다이브인 히알루론산 수딩 크림 100ml 더블 한정 기획 (+토너 100ml)",
      originalPrice: "42,000원",
      discountedPrice: "28,100",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner3.jpg",
      name: "[6월 올영픽/1+1+증정] 메디힐 마데카소사이드 흔적 리페어 세럼 40+40+10mL",
      originalPrice: "36,900원",
      discountedPrice: "22,500",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner4.jpg",
      name: "[6월올영픽]바이오더마 하이드라비오 토너 500ml 기획/단품",
      originalPrice: "38,000원",
      discountedPrice: "27,500",
      badge: ["세일", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner5.jpg",
      name: "[2배용량/미스트펌프증정] 라네즈 크림스킨 170ml 기획 (+170ml 리필+미스트펌프 증정)",
      originalPrice: "33,000원",
      discountedPrice: "26,400",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skintoner6.jpg",
      name: "[대용량 기획] 아누아 어성초 77 수딩 토너 350ml 기획 (+350ml 리필팩)",
      originalPrice: "49,000원",
      discountedPrice: "27,500",
      badge: ["쿠폰", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner7.jpg",
      name: "[피지쓱싹] 브링그린 티트리시카수딩토너 500mL 기획/단품",
      originalPrice: "27,000원",
      discountedPrice: "18,000",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner8.jpg",
      name: "[6월올영픽/쿨링토너] 빌리프 아쿠아 밤 프로즌 토너 드롭드롭드롭 기획(토너300ml+50ml+겔패드 140매)",
      originalPrice: "32,000원",
      discountedPrice: "23,400",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner9.jpg",
      name: "[쿨링진정] 아비브 어성초 카밍 토너 스킨부스터 더블 기획 (200ml+200ml)",
      originalPrice: "39,000원",
      discountedPrice: "27,300",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner10.jpg",
      name: "[단독기획] 아누아 어성초 77 수딩 토너 250ml 기획 (+로션 100ml)",
      originalPrice: "25,000원",
      discountedPrice: "19,900",
      badge: ["세일", "오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skincare11.jpg",
      name: "[1+1+파우치] 라운드랩 1025 독도토너 300ml 1+1기획 (+누누씨파우치)",
      originalPrice: "29,800원",
      discountedPrice: "25,700",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner12.jpg",
      name: "[1등토너] 라운드랩 1025 독도 토너 200ml 기획 (+50ml)",
      originalPrice: "15,000원",
      discountedPrice: "13,500",
      badge: ["세일", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner13.jpg",
      name: "라로슈포제 똘러리앙 울트라 로션 400ML (대용량)",
      originalPrice: "49,000원",
      discountedPrice: "41,650",
      badge: ["쿠폰", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner14.jpg",
      name: "디오디너리 글리코릭 애시드 7% 엑스폴리에이팅 토너 240ml",
      originalPrice: "22,000원",
      discountedPrice: "16,300",
      badge: ["오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner15.jpg",
      name: "[수분생기] 라운드랩 자작나무 수분 토너 1+1 기획 (300ml+300ml)",
      originalPrice: "28,500원",
      discountedPrice: "24,000",
      badge: ["오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skintoner16.jpg",
      name: "[수분진정/화해1위] 에스네이처 아쿠아 오아시스 토너 300ml 기획 (+젤크림 30ml)",
      originalPrice: "24,000원",
      discountedPrice: "18,900",
      badge: ["세일", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skincare17.jpg",
      name: "폴라초이스 스킨퍼펙팅 바하 리퀴드 118ml 기획 (+바하 리퀴드 30ml)",
      originalPrice: "35,000원",
      discountedPrice: "28,000",
      badge: ["쿠폰", "오늘드림"],
      filterValue: "new",
    },
    {
      id: 3,
      img: "/images/skintoner18.jpg",
      name: "[수딩진정] 넘버즈인 1번 진정 맑게담은 청초토너 300ml 기획 (+1번 패드 10매 증정)",
      originalPrice: "26,000원",
      discountedPrice: "16,980",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner19.jpg",
      name: "[속보습] 더랩바이블랑두 저분자 히알루론산 딥 토너 200ml + 50ml 기획",
      originalPrice: "23,000원",
      discountedPrice: "15,990",
      badge: ["세일", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner20.jpg",
      name: "[NEW] 브링그린 티트리시카수딩토너 500ml (+화장솜 60매증정)",
      originalPrice: "27,000원",
      discountedPrice: "18,000",
      badge: ["세일", "쿠폰", "증정", "오늘드림"],
      filterValue: "discount",
    },
    {
      id: 1,
      img: "/images/skintoner21.jpg",
      name: "[증량] 닥터지 레드 블레미쉬 클리어 수딩 토너 500ml",
      originalPrice: "39,000원",
      discountedPrice: "29,900",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner22.jpg",
      name: "[1+1/모공케어] 유세린 더머토클린 클래리파잉 토너 더블기획 (200ml+200ml)",
      originalPrice: "28,000원",
      discountedPrice: "26,600",
      badge: ["세일", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner23.jpg",
      name: "[증정기획] 헤브블루 살몬 PDRN 센텔라 토너 200ml 기획 (+연어 크림 20ml)",
      originalPrice: "41,900원",
      discountedPrice: "26,800",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner24.jpg",
      name: "메이크프렘 인테카 진정 토너 200ml 기획(+리필 100ml+크림 31ml)",
      originalPrice: "26,000원",
      discountedPrice: "20,800",
      badge: ["세일", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner25.jpg",
      name: "[흔적미백]메디큐브 PDRN 핑크 시카 수딩 토너 250ml",
      originalPrice: "26,500원",
      discountedPrice: "15,000",
      badge: ["세일", "오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skintoner26.jpg",
      name: "[수분모공토너] 성분에디터 그린토마토 모공토너 350ml 기획 (+100ML)",
      originalPrice: "21,000원",
      discountedPrice: "17,960",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner27.jpg",
      name: "[NEW] 헤이네이처 어성초 스킨 토너 150ml 기획 (+어성초 마스크 2매)",
      originalPrice: "25,000원",
      discountedPrice: "22,500",
      badge: ["세일", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner28.jpg",
      name: "[100억돌파/500ml대용량] 비욘드 엔젤아쿠아 수분 진정 토너 500ml (비건)",
      originalPrice: "19,000원",
      discountedPrice: "10,360",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner29.jpg",
      name: "[대용량] 마녀공장 비피다 바이옴 앰플 토너 400ml+100ml 기획",
      originalPrice: "25,000원",
      discountedPrice: "16,630",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner30.jpg",
      name: "[1+1] 유세린 더모퓨리파이어 토너 더블 기획 (200ml+200ml)",
      originalPrice: "26,000원",
      discountedPrice: "24,700",
      badge: ["세일", "오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skintoner31.jpg",
      name: "메이크프렘 인테카 진정 토너 200ml 기획(+리필 100ml+크림 31ml)",
      originalPrice: "26,000원",
      discountedPrice: "20,800",
      badge: ["세일", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner32.jpg",
      name: "[온라인용]브링그린 티트리시카수딩토너&크림세트_NEW",
      originalPrice: "34,000원",
      discountedPrice: "20,500",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner33.jpg",
      name: "[업그레이드/슬로우에이징] 달바 비타 토닝 세럼 토너 180ml",
      originalPrice: "29,900원",
      discountedPrice: "20,900",
      badge: ["세일", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner34.jpg",
      name: "[민감진정] 라운드랩 소나무 진정 시카 토너 250ml",
      originalPrice: "23,000원",
      discountedPrice: "19,900",
      badge: ["세일", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner35.jpg",
      name: "디오디너리 글리코릭 애시드 7% 엑스폴리에이팅 토너 100ml",
      originalPrice: "14,900원",
      discountedPrice: "10,900",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skintoner36.jpg",
      name: "[첫수분토너] 웰라쥬 리얼 히알루로닉 100 토너 300ml 기획 (+화장솜 60매)",
      originalPrice: "32,000원",
      discountedPrice: "28,000",
      badge: ["증정", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner37.jpg",
      name: "에스트라 에이시카365 수분토너 pH4.5 200ml",
      originalPrice: "33,000원",
      discountedPrice: "28,000",
      badge: ["오늘드림"],
      filterValue: "new",
    },
    {
      id: 4,
      img: "/images/skintoner38.jpg",
      name: "[흔적미백] 넘버즈인 5번 글루타치온씨 비타수액 에센셜 토너 200ml",
      originalPrice: "24,000원",
      discountedPrice: "18,000",
      badge: ["세일", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner39.jpg",
      name: "[피지쓱싹] 브링그린 티트리시카수딩토너 250mL",
      originalPrice: "15,000원",
      discountedPrice: "13,500",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner40.jpg",
      name: "파티온 노스카나인 트러블 클리어 토너 200ml",
      originalPrice: "23,000원",
      discountedPrice: "18,400",
      badge: ["세일", "오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skintoner41.jpg",
      name: "[케로피콜라보/500ml대용량]비욘드 엔젤아쿠아 수분진정 빅토너 500ml 기획 (스마트톡 증정)",
      originalPrice: "19,000원",
      discountedPrice: "10,360",
      badge: ["세일", "쿠폰", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner42.jpg",
      name: "이즈앤트리 초저분자 히아루론산 토너 300ml",
      originalPrice: "21,000원",
      discountedPrice: "13,900",
      badge: ["세일", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner43.jpg",
      name: "[매끈결] 아비브 부활초 파하 토너 스킨부스터 200ml 기획 (+30ml)",
      originalPrice: "23,000원",
      discountedPrice: "16,100",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner44.jpg",
      name: "[1등토너] 라운드랩 1025 독도 토너 500ml 기획 (+100ml)",
      originalPrice: "30,000원",
      discountedPrice: "27,000",
      badge: ["세일", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner45.jpg",
      name: "[속보습]닥터지 더모이스처 배리어 D 리퀴드 토너 200ml 기획 (+100ml)",
      originalPrice: "31,000원",
      discountedPrice: "24,800",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner46.jpg",
      name: "[단독기획]에뛰드 순정 약산성 5.5 진정 토너 700ml 대용량 기획(350ml+리필350ml)",
      originalPrice: "27,000원",
      discountedPrice: "24,300",
      badge: ["쿠폰", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner47.jpg",
      name: "[속보습] 더랩바이블랑두 올리고 히알루론산 딥 토너 500ml 대용량 기획 (+100ml)",
      originalPrice: "42,000원",
      discountedPrice: "37,000",
      badge: ["오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner48.jpg",
      name: "[단독 리필기획] 구달 어성초 히알루론 수딩 토너 350ml 리필 기획 (+350ml 리필)",
      originalPrice: "32,000원",
      discountedPrice: "24,000",
      badge: ["세일", "오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner49.jpg",
      name: "[모공개선/탄력광채] 넘버즈인 3번 결광가득 에센스 토너 300ml 대용량 기획",
      originalPrice: "36,000원",
      discountedPrice: "32,000",
      badge: ["오늘드림"],
      filterValue: "discount",
    },
    {
      id: 2,
      img: "/images/skintoner50.jpg",
      name: "닥터지 에이클리어 밸런싱 토너 200ml 기획 (+화장솜)",
      originalPrice: "27,000원",
      discountedPrice: "18,900",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner51.jpg",
      name: "[진정보습] 닥터지 레드 블레미쉬 클리어 모이스처 토너 증정 기획 (토너 300ml+크림30ml)",
      originalPrice: "32,000원",
      discountedPrice: "25,600",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "new",
    },
    {
      img: "/images/skintoner52.jpg",
      name: "[슬로에이징/영양탄력] 닥터지 블랙 스네일 토너 150ml",
      originalPrice: "18,000원",
      discountedPrice: "15,600",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "sold",
    },
    {
      img: "/images/skintoner53.jpg",
      name: "[각질7층보습] 넘버즈인 4번 메이크업 찰떡 미네랄 토너 200ml 기획 (+50ml 증정)",
      originalPrice: "28,000원",
      discountedPrice: "24,000",
      badge: ["오늘드림"],
      filterValue: "lowPrice",
    },
    {
      img: "/images/skintoner54.jpg",
      name: "[흔적미백] 넘버즈인 5번 글루타치온씨 비타수액 에센셜 토너 200ml 리필 기획(+200ml 리필)",
      originalPrice: "42,000원",
      discountedPrice: "36,000",
      badge: ["오늘드림"],
      filterValue: "discount",
    },
    {
      img: "/images/skintoner55.jpg",
      name: "[증정 기획] 닥터지 레드 블레미쉬 포 맨 멀티 수딩 토너 200ml 보습 기획세트 (+올인원크림 30ml)",
      originalPrice: "31,000원",
      discountedPrice: "24,800",
      badge: ["세일", "증정", "오늘드림"],
      filterValue: "popular",
    },
    {
      img: "/images/skintoner56.jpg",
      name: "[NEW] 닥터지 레드 블레미쉬 클리어 수딩 토너 300ml+300ml 듀오기획",
      originalPrice: "52,000원",
      discountedPrice: "46,000",
      badge: ["증정", "오늘드림"],
      filterValue: "new",
    },
  ];

  // --- 필터 & 정렬 옵션 ---
  const FILTERS = [
    { label: "인기순", value: "popular" },
    { label: "신상품순", value: "new" },
    { label: "판매순", value: "sold" },
    { label: "낮은 가격순", value: "lowPrice" },
    { label: "할인율순", value: "discount" },
  ];
  const [activeFilter, setActiveFilter] = useState("popular");

  // 필터 적용
  const filteredProducts = products.filter(
    (product) => product.filterValue === activeFilter
  );

  // --- 상품 개수 옵션 ---
  const PER_PAGE_OPTIONS = [24, 36, 48];
  const [itemsPerPage, setItemsPerPage] = useState(PER_PAGE_OPTIONS[0]);

  // --- 페이지네이션 ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const [page, setPage] = useState(1);

  // 현재 페이지 상품만 보여주기
  const pagedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 페이지 이동 시 항상 맨 위로 스크롤
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page, itemsPerPage]);

  // --- 상품 카드 클릭시 이동 함수 ---
  const handleCardClick = (id) => {
    // product1, product2 ...로 이동
    router.push(`/product/skintoner/product${id}`);
  };

  return (
    <div className="container py-6 mx-auto">
      {/* --- 상단 상품수/필터/뷰개수 --- */}
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="w-full text-2xl font-semibold text-center md:text-2xl">
          <span>스킨/토너 카테고리에 </span>
          <span className="text-[#ff8882] font-bold">{products.length}</span>
          <span> 개의 상품이 등록되어 있습니다.</span>
        </div>
      </div>
      <hr className="border-t-4 border-[#e6e6e6] my-4" />
      <div className="flex flex-row items-center justify-between px-2 pb-4">
        {/* 필터 버튼 */}
        <div className="flex gap-0">
          {FILTERS.map((f, idx) => (
            <React.Fragment key={f.value}>
              <button
                className={`text-lg px-2 py-1 transition 
                ${activeFilter === f.value
                  ? "text-black font-bold underline underline-offset-[8px]"
                  : "text-[#888] hover:text-black"}`}
                onClick={() => {
                  setActiveFilter(f.value);
                  setPage(1);
                }}
              >
                {f.label}
              </button>
              {idx < FILTERS.length - 1 && (
                <span className="h-7 border-l border-[#e6e6e6] mx-2"></span>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* 보기개수 버튼 */}
        <div className="flex items-center gap-2 border-l border-[#e6e6e6] pl-8">
          <span className="mr-1 text-xl font-bold">VIEW</span>
          {PER_PAGE_OPTIONS.map((num) => (
            <button
              key={num}
              className={`text-lg font-bold px-1 underline-offset-4 transition
                ${itemsPerPage === num
                  ? "text-black underline"
                  : "text-[#aaa] hover:text-black"}`}
              onClick={() => {
                setItemsPerPage(num);
                setPage(1);
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* --- 상품 그리드 --- */}
      <div className="grid grid-cols-4 gap-6">
        {pagedProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div
              className="flex flex-col items-center transition bg-white rounded-lg cursor-pointer"
              onClick={() => handleCardClick(product.id)} // 클릭 시 라우팅
            >
              {/* 상품 이미지 */}
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-auto mb-3 rounded-md"
              />
              {/* 상품명 2줄로 제한 */}
              <p className="mb-2 text-lg font-semibold text-center line-clamp-2">
                {product.name}
              </p>
              {/* 가격 정보 */}
              <div className="w-[215px] flex flex-col items-center mt-[5px] text-center">
                <p className="text-sm line-through font-semibold text-[#a9a9a9]">
                  {product.originalPrice}
                </p>
                <p className="text-xl text-[#e02020] font-bold">
                  {product.discountedPrice}원
                </p>
              </div>
              {/* 배지 */}
              <div className="w-[215px] flex flex-row justify-center mt-[5px] flex-wrap gap-1">
                {product.badge.map((badge, badgeIdx) => {
                  let badgeWidth = "auto";
                  if (badge === "세일") badgeWidth = "40px";
                  if (badge === "쿠폰") badgeWidth = "40px";
                  if (badge === "증정") badgeWidth = "40px";
                  if (badge === "오늘드림") badgeWidth = "60px";
                  return (
                    <div
                      key={badgeIdx}
                      className={`h-[20px] rounded-[9px] text-[#fff] text-xs justify-center leading-[7px] flex items-center 
                        ${badge === "세일"
                          ? "bg-[#f65c60]"
                          : badge === "쿠폰"
                          ? "bg-[#9bce26]"
                          : badge === "증정"
                          ? "bg-[#6fcff7]"
                          : badge === "오늘드림"
                          ? "bg-[#f374b7]"
                          : ""}`}
                      style={{ width: badgeWidth }}
                    >
                      {badge}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4, 8, 12... 번째 줄 끝마다 구분선 */}
            {(index + 1) % 4 === 0 && (
              <div className="col-span-4">
                <hr className="border-t border-[#e6e6e6] my-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* --- 페이지네이션 --- */}
      <div className="flex justify-center mt-8 space-x-2 select-none">
        {Array.from({ length: Math.min(10, totalPages) }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-8 h-8 text-xl border rounded font-bold transition 
                ${pageNum === page
                  ? "border-black text-black bg-white"
                  : "border-[#e1e1e1] text-[#888] bg-white"}`}
              style={{ minWidth: "40px", minHeight: "40px" }}
            >
              {pageNum}
            </button>
          );
        })}
        {/* 오른쪽 화살표(비활성화, 페이지 많으면 활용 가능) */}
        <button
          disabled
          className="w-8 h-8 text-xl border rounded border-[#e1e1e1] text-[#aaa] bg-white flex items-center justify-center"
          style={{ minWidth: "40px", minHeight: "40px" }}
        >
          <span>&raquo;</span>
        </button>
      </div>
    </div>
  );
}

export default SkinTonerProduct;