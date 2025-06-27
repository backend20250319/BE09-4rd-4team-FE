import { useState } from "react";
import ReviewItem from "./ReviewItem";

// 📌 실제로는 더 많은 데이터가 있어야 페이징이 유의미해요
const dummyData = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  image: "resources/images/product1.jpg",
  orderType: i % 2 === 0 ? "주문일자" : "구매일자",
  orderDate: "2025.06.06",
  brand: `브랜드${i + 1}`,
  title: `[제목${i + 1}] 상품 상세 설명 예시`,
  subTitle: i % 3 === 0 ? "옵션 | 예시 옵션명" : undefined,
  place: i % 4 === 0 ? "매장" : undefined,
  dueDate: "2025.09.05",
}));

const ITEMS_PER_PAGE = 20;

export default function ReviewList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = dummyData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
