// /products/[productId]/reviews.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewSummary from "./ReviewSummary";
import ReviewStats from "./ReviewStats";
import ReviewList from "./ReviewList";

export default function ReviewDetailPage() {
  const { productId } = useParams(); // 상품 ID 가져오기
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${productId}/reviews`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("리뷰 데이터 요청 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (!data) return <div className="text-center py-10">리뷰가 없습니다</div>;

  return (
    <div className="max-w-[1020px] mx-auto py-10 text-sm text-gray-800">
      <hr className="border-t-2 border-gray-800" />
      <ReviewSummary data={data} />
      <hr className="border-t border-gray-200 mb-10" />
      <ReviewStats
        skinType={data.skinType}
        skinConcern={data.skinConcern}
        texture={data.texture}
      />
      <hr className="border-t border-gray-200" />
      <ReviewList reviews={data.reviews} />
      <hr className="border-t border-gray-300" />
    </div>
  );
}
