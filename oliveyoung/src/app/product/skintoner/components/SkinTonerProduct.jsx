"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // 👈 axios 임포트 추가

function SkinTonerProduct() {
  const router = useRouter();

  // <<<<<<<<<<<< 기존 하드코딩된 products 배열을 제거하고 빈 배열로 초기화 >>>>>>>>>>>>>>
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null);   // 에러 상태 추가

  // --- API에서 데이터를 가져오는 useEffect 훅 ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // 데이터 로딩 시작
      setError(null);   // 이전 에러 메시지 초기화

      try {
        // <<<<<<<<<<<< axios를 사용하여 백엔드 API 호출 >>>>>>>>>>>>>>
        const response = await axios.get("http://localhost:8080/api/products"); 
        const data = response.data; // axios는 응답 데이터를 response.data에 바로 넣어줍니다.

        // API에서 받아온 데이터를 프론트엔드에서 사용하는 형식으로 매핑 (기존 하드코딩된 형식과 맞춤)
        const mappedProducts = data.map((item) => ({
          id: item.productId,
          img: item.imageUrl,
          name: item.productName,
          // 가격은 API에서 숫자로 온다고 가정하고, 여기서 통화 형식으로 변환합니다.
          originalPrice: item.originalPrice?.toLocaleString("ko-KR") + "원",
          discountedPrice: item.discountedPrice?.toLocaleString("ko-KR") + "원",
          badge: item.badgeNames || [], // 백엔드의 badgeNames (List<String>)를 사용, 없으면 빈 배열
          filterValue: item.filterValue, // 백엔드의 filterValue 필드 그대로 사용 (가장 중요!)
          brand: item.brandName,
        }));
        setProducts(mappedProducts); // 매핑된 데이터를 products 상태에 저장
      } catch (error) {
        console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        if (error.response) {
            setError(`상품 데이터를 가져오는 데 실패했습니다: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            setError("네트워크 오류: 서버에 연결할 수 없습니다.");
        } else {
            setError(`요청 오류: ${error.message}`);
        }
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchProducts(); // 컴포넌트가 마운트될 때 데이터 가져오기 함수 실행
  }, []); // 빈 의존성 배열: 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // --- 필터 & 정렬 옵션 ---
  // <<<<<<<<<<<< '전체보기' 필터 옵션 추가 및 초기값 'all'로 설정 >>>>>>>>>>>>>>
  const FILTERS = [
    { label: "전체보기", value: "all" }, // <-- 추가
    { label: "인기순", value: "popular" },
    { label: "신상품순", value: "new" },
    { label: "판매순", value: "sold" },
    { label: "낮은 가격순", value: "lowPrice" },
    { label: "할인율순", value: "discount" },
  ];
  const [activeFilter, setActiveFilter] = useState("all"); // <-- 'popular'에서 'all'로 변경

  // <<<<<<<<<<<< 필터링 로직 수정: 'all'일 경우 전체 상품 반환 >>>>>>>>>>>>>>
  const filteredProducts = products.filter((product) => {
    if (activeFilter === "all") {
      return true; // 'all' 필터가 선택되면 모든 상품을 반환
    }
    return product.filterValue === activeFilter; // 그 외에는 filterValue와 activeFilter가 일치하는 상품만 반환
  });

  // --- 상품 개수 옵션 ---
  const PER_PAGE_OPTIONS = [24, 36, 48];
  const [itemsPerPage, setItemsPerPage] = useState(PER_PAGE_OPTIONS[0]);

  // --- 페이지네이션 ---
  // <<<<<<<<<<<< totalPages 계산 시 filteredProducts.length 사용 >>>>>>>>>>>>>>
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const [page, setPage] = useState(1);

  // 현재 페이지 상품만 보여주기
  const pagedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 페이지 이동 시 항상 맨 위로 스크롤
  // <<<<<<<<<<<< 기존의 window.scrollTo() 유지 (behavior: "smooth" 제거) >>>>>>>>>>>>>>
  useEffect(() => { // React.useEffect 대신 useEffect 사용 (상단 임포트와 일관성)
    window.scrollTo(); 
  }, [page, itemsPerPage]);

  // --- 상품 카드 클릭시 이동 함수 ---
  const handleCardClick = (id) => {
    router.push(`/product/skintoner/product${id}`);
  };

  // <<<<<<<<<<<< 로딩 및 에러 메시지 렌더링 추가 (기존 CSS 형태 유지) >>>>>>>>>>>>>>
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
          {/* <<<<<<<<<<<< filteredProducts.length 사용 >>>>>>>>>>>>>> */}
          <span className="text-[#ff8882] font-bold">{filteredProducts.length}</span>{" "}
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
                  setPage(1);
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
                setPage(1);
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* --- 상품 그리드 --- */}
      {/* filteredProducts가 아닌 pagedProducts를 맵핑해야 합니다. */}
      <div className="grid grid-cols-4 gap-6">
        {pagedProducts.map((product, index) => (
          <React.Fragment key={product.id}> {/* key는 고유한 product.id를 사용 */}
            <div
              className="flex flex-col items-center transition bg-white rounded-lg cursor-pointer"
              onClick={() => handleCardClick(product.id)}
            >
              {/* 상품 이미지 */}
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-auto mb-4 rounded-md"
              />
              {/* 브랜드명 */}
              <p className="mb-2 text-sm font-semibold text-center text-[#777777]">
                {product.brand}
              </p>
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
                  {product.discountedPrice}
                </p>
              </div>
              {/* 배지 */}
              <div className="w-[215px] flex flex-row justify-center mt-[5px] flex-wrap">
                {Array.isArray(product.badge) &&
                  product.badge.map((badge, badgeIdx) => {
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
      <div className="flex justify-center mt-8 space-x-2 elect-none">
        {Array.from({ length: Math.min(10, totalPages) }).map((_, i) => {
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
        {/* 오른쪽 화살표(비활성화, 페이지 많으면 활용 가능) */}
        <button
          disabled={page === totalPages} // <<<<<<<<<<<< totalPages와 비교하여 활성화/비활성화
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