"use client";
import { useEffect, useState } from "react";
import { FaExclamation } from "react-icons/fa";
import ReviewItem from "./ReviewItem";

const ITEMS_PER_PAGE = 10;

export default function ReviewList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 실제 장바구니 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/order-service/carts"); // 실제 API 주소 사용
        if (!res.ok) throw new Error("장바구니 조회 실패");
        const result = await res.json();
        setData(result); // result가 배열이면 이렇게
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <div>로딩 중...</div>;
  
  // 상품이 없는 경우 아이콘+메시지
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 border-b">
        <div className="w-[100px] h-[100px] flex items-center justify-center border-2 border-gray-300 rounded-full mb-4">
          <FaExclamation className="text-3xl text-gray-300" />
        </div>
        <p className="text-sm">장바구니에 담긴 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* 카테고리 헤더 */}
      <div className="grid grid-cols-[1fr_150px_120px] gap-4 px-1 py-3 border-y border-gray-300 text-sm text-gray-700 font-semibold bg-gray-50">
        <div className="text-center">상품</div>
        <div className="text-center">작성기간</div>
        <div className="text-center">리뷰작성</div>
      </div>

      {/* 리스트 아이템 */}
      <div className="space-y-0">
        {currentItems.map((item) => (
          <ReviewItem key={item.id} data={item} />
        ))}
      </div>

      {/* 페이징 버튼 */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 border rounded text-sm transition ${
              currentPage === page
                ? "bg-black text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
