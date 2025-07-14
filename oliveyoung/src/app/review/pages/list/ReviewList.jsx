import { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamation } from "react-icons/fa";
import ReviewItem from "./ReviewItem";

const ITEMS_PER_PAGE = 10;

export default function ReviewList() {
  const [items, setItems] = useState([]); // orderItems만 펼쳐서 저장
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 API 연결
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:8080/api/orders", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // res.data는 orders 배열!
        // orders 배열 안에 orderItems 배열을 "펼쳐서" 한 배열로 만들어줌
        const flatOrderItems = res.data.flatMap((order) =>
          order.orderItems.map((orderItem) => ({
            ...orderItem,
            orderId: order.orderId,
            createdAt: order.createdAt,
            status: order.status,
          }))
        );
        setItems(flatOrderItems);
      } catch (error) {
        console.error(error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 페이지네이션
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <div>로딩 중...</div>;

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 border-b">
        <div className="w-[100px] h-[100px] flex items-center justify-center border-2 border-gray-300 rounded-full mb-4">
          <FaExclamation className="text-3xl text-gray-300" />
        </div>
        <p className="text-sm">주문하신 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-[1fr_150px_120px] gap-4 px-1 py-3 border-y border-gray-300 text-sm text-gray-700 font-semibold bg-gray-50">
        <div className="text-center">상품</div>
        <div className="text-center">작성기간</div>
        <div className="text-center">리뷰작성</div>
      </div>
      <div className="space-y-0">
        {currentItems.map((item) => (
          <ReviewItem key={item.orderItemId} data={item} />
        ))}
      </div>
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
