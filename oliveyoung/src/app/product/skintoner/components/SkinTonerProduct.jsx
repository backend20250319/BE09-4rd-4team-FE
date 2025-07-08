"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function SkinTonerProduct({ selectedBrands }) {
  const router = useRouter();

  const [allProducts, setAllProducts] = useState([]); // 모든 상품 데이터를 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PER_PAGE_OPTIONS = [24, 36, 48];
  const [itemsPerPage, setItemsPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [page, setPage] = useState(1);

  // --- 필터 & 정렬 옵션 ---
  const FILTERS = [
    { label: "전체보기", value: "all" },
    { label: "인기순", value: "popular" },
    { label: "신상품순", value: "new" },
    { label: "판매순", value: "sold" },
    { label: "낮은 가격순", value: "lowPrice" },
    { label: "할인율순", value: "discount" },
  ];
  const [activeFilter, setActiveFilter] = useState("all");

  // --- API에서 데이터를 가져오는 useEffect 훅 ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // ⭐️ 백엔드에서 카테고리별 전체 상품만 가져옵니다. (필터링/정렬은 프론트에서)
        const categoryName = "Skin/Toner"; // 백엔드 Products 엔티티의 categoryName 필드와 일치해야 함
        const apiUrl = `http://localhost:8080/api/products?categoryName=${categoryName}`;
        console.log("Fetching all products for category from:", apiUrl);

        const response = await axios.get(apiUrl);
        const data = response.data; // 이 data는 이미 ProductResponseDTO 리스트입니다.

        // 백엔드에서 전달받은 DTO 객체는 이미 필요한 필드들을 포함하고 있습니다.
        // 프론트에서 사용하는 이름에 맞춰 매핑합니다.
        const mappedProducts = data.map((item) => ({
          id: item.productId,
          imageUrl: item.imageUrl, // 'img' 대신 'imageUrl'로 통일
          productName: item.productName, // 'name' 대신 'productName'으로 통일
          brandName: item.brandName, // 'brand' 대신 'brandName'으로 통일
          originalPrice: item.originalPrice,
          discountedPrice: item.discountedPrice,
          badgeNames: item.badgeNames || [], // 'badge' 대신 'badgeNames'으로 통일
          createdAt: item.createdAt ? new Date(item.createdAt) : null, // ⭐️ Date 객체로 변환하여 정렬에 용이하게
          salesCount: item.salesCount || 0, // ⭐️ 판매량이 없을 경우 0으로 초기화
        }));
        setAllProducts(mappedProducts); // 전체 상품 데이터를 저장
      } catch (error) {
        console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        if (error.response) {
          setError(`상품 데이터를 가져오는 데 실패했습니다: ${error.response.status} - ${error.response.statusText}.`);
        } else if (error.request) {
          setError("네트워크 오류: 서버에 연결할 수 없습니다.");
        } else {
          setError(`요청 오류: ${error.message}`);
        }
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // 빈 의존성 배열: 컴포넌트 마운트 시 한 번만 전체 데이터 로드

  // ⭐️ useMemo를 사용하여 필터링 및 정렬된 상품 목록을 계산
  const filteredAndSortedProducts = useMemo(() => {
    let currentProducts = [...allProducts]; // 원본 allProducts를 복사하여 사용

    // 1. 브랜드 필터링
    if (selectedBrands && selectedBrands.length > 0) {
      currentProducts = currentProducts.filter((product) =>
        selectedBrands.includes(product.brandName) // product.brand -> product.brandName
      );
    }

    // 2. 정렬
    currentProducts.sort((a, b) => {
      switch (activeFilter) {
        case "popular":
          // 인기순 (백엔드에서 'popularCount' 등의 데이터가 와야 함)
          // 현재는 salesCount를 사용하거나, 다른 기준으로 대체할 수 있습니다.
          // 임시로 salesCount를 사용하지만, 실제 인기 기준에 맞게 변경해야 합니다.
          return b.salesCount - a.salesCount; // 판매량 높은 순으로 정렬 (임시 인기순)
        case "new":
          // ⭐️ 신상품순: createdAt을 Date 객체로 변환했으므로 직접 비교 가능
          // 최신 상품이 먼저 오도록 내림차순 정렬
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "sold":
          // ⭐️ 판매순: salesCount 필드를 사용하여 정렬
          // 판매량 높은 순이 먼저 오도록 내림차순 정렬
          return b.salesCount - a.salesCount;
        case "lowPrice":
          // 낮은 가격순
          return a.discountedPrice - b.discountedPrice;
        case "discount":
          // 할인율순 계산: (원가 - 할인가) / 원가
          const discountRateA = (a.originalPrice - a.discountedPrice) / a.originalPrice;
          const discountRateB = (b.originalPrice - b.discountedPrice) / b.originalPrice;
          return discountRateB - discountRateA; // 높은 할인율이 먼저 오도록 내림차순
        default: // "all" 또는 다른 경우
          return 0; // 정렬하지 않음 (기존 순서 유지)
      }
    });

    return currentProducts;
  }, [allProducts, selectedBrands, activeFilter]); // 의존성 배열

  // 총 상품 개수 및 페이지 수 계산 (필터링 및 정렬된 상품 기준)
  const totalElements = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalElements / itemsPerPage);

  // 현재 페이지에 해당하는 상품만 슬라이싱
  const pagedProducts = filteredAndSortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // --- 필터/정렬/페이지당 아이템 개수 변경 시 페이지 리셋 ---
  useEffect(() => {
    setPage(1); // 이 세 가지 상태가 변경되면 항상 1페이지로 돌아감
  }, [selectedBrands, activeFilter, itemsPerPage]);

  // 페이지 이동 시 항상 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]); // 페이지 변경 시에만 스크롤

  // --- 상품 카드 클릭시 이동 함수 ---
  const handleCardClick = (id) => {
    router.push(`/product/skintoner/product${id}`);
  };

  if (loading) {
    return (
      <div className="container py-6 mx-auto">
        <div className="flex items-center justify-between px-2 mb-4">
          <div className="w-full text-2xl font-semibold text-center md:text-2xl">
            <span>상품 정보를 불러오는 중...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6 mx-auto">
        <div className="flex items-center justify-between px-2 mb-4">
          <div className="w-full text-2xl font-semibold text-center text-red-600 md:text-2xl">
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 mx-auto">
      {/* --- 상단 상품수/필터/뷰개수 --- */}
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="w-full text-2xl font-semibold text-center md:text-2xl">
          <span>스킨/토너 카테고리에 </span>
          <span className="text-[#ff8882] font-bold">{totalElements}</span>{" "}
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
                ${
                  activeFilter === f.value
                    ? "text-black font-bold underline underline-offset-[8px]"
                    : "text-[#888] hover:text-black"
                }`}
                onClick={() => {
                  setActiveFilter(f.value);
                }}
              >
                {f.label}
              </button>
              {idx < FILTERS.length - 1 && (
                <span className="h-8 mx-2 border-l border-gray-300"></span>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* 보기개수 버튼 */}
        <div className="flex items-center gap-2 border-l border-[#e6e6e6] pl-8">
          <span className="mr-1 text-xl font-semibold">VIEW</span>
          {PER_PAGE_OPTIONS.map((num) => (
            <button
              key={num}
              className={`text-lg font-semibold px-1 underline-offset-4 transition
                ${
                  itemsPerPage === num
                    ? "text-black underline"
                    : "text-[#aaa] hover:text-black"
                }`}
              onClick={() => {
                setItemsPerPage(num);
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
          <React.Fragment key={product.id}>
            <div
              className="flex flex-col items-center transition bg-white rounded-lg cursor-pointer"
              onClick={() => handleCardClick(product.id)}
            >
              {/* 상품 이미지 */}
              <img
                src={product.imageUrl} // product.img -> product.imageUrl
                alt={product.productName} // product.name -> product.productName
                className="w-full h-auto mb-4 rounded-md"
              />
              {/* 브랜드명 */}
              <p className="mb-2 text-sm font-semibold text-center text-[#777777]">
                {product.brandName} {/* product.brand -> product.brandName */}
              </p>
              {/* 상품명 2줄로 제한 */}
              <p className="mb-2 text-lg font-semibold text-center line-clamp-2">
                {product.productName} {/* product.name -> product.productName */}
              </p>
              {/* 가격 정보 */}
              <div className="w-[215px] flex flex-col items-center mt-[5px] text-center">
                <p className="text-sm line-through font-semibold text-[#a9a9a9]">
                  {product.originalPrice.toLocaleString("ko-KR")}원
                </p>
                <p className="text-xl text-[#e02020] font-bold">
                  {product.discountedPrice.toLocaleString("ko-KR")}원
                </p>
              </div>
              {/* 배지 */}
              <div className="w-[215px] flex flex-row justify-center mt-[5px] flex-wrap">
                {Array.isArray(product.badgeNames) && // product.badge -> product.badgeNames
                  product.badgeNames.map((badge, badgeIdx) => {
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

            {/* 4, 8, 12... 번째 줄 끝마다 구분선 */}
            {(index + 1) % 4 === 0 && (
              <div className="col-span-4 ">
                <hr className="border-t border-[#e6e6e6] my-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* --- 페이지네이션 --- */}
      <div className="flex justify-center mt-8 space-x-2 select-none">
        {/* 이전 페이지 버튼 */}
        <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="w-8 h-8 text-xl border rounded border-[#e1e1e1] text-[#aaa] bg-white flex items-center justify-center"
            style={{ minWidth: "40px", minHeight: "40px" }}
        >
            <span>&laquo;</span>
        </button>

        {/* 페이지 번호들 */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-8 h-8 text-xl border rounded font-bold transition
                ${
                  pageNum === page
                    ? "border-black text-black bg-white"
                    : "border-[#e1e1e1] text-[#888] bg-white"
                }`}
              style={{ minWidth: "40px", minHeight: "40px" }}
            >
              {pageNum}
            </button>
          );
        })}
        {/* 다음 페이지 버튼 */}
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((prev) => prev + 1)}
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