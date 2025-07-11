"use client";

import React, { useState, useEffect } from "react";
import ProductDescription from "./ProductDescription";
import ReviewDetailPage from "@/app/reviewtest/ReviewDetailPage";
import axios from "axios";

const ProductTabs = ({ productId }) => {
  const [activeTab, setActiveTab] = useState("상품설명");
  const [reviews, setReviews] = useState([]);
  const [reviewsFetched, setReviewsFetched] = useState(false); // 이미 패칭했는지 체크

  // 리뷰탭 진입할 때만 데이터 패칭 (중복 요청 방지)
  useEffect(() => {
    if (activeTab === "리뷰" && !reviewsFetched && productId) {
      axios
        .get(`http://localhost:8080/api/products/${productId}/reviews`)
        .then((res) => {
          const data = res.data;

          if (Array.isArray(data.data)) setReviews(data.data);
          else setReviews([]);
          setReviewsFetched(true);
        })
        .catch(() => setReviews([]));
    }
  }, [activeTab, reviewsFetched, productId]);

  const totalReviews = reviews.length;

  return (
    <div>
      <div className="flex justify-around text-lg font-semibold text-gray-700 border border-gray-200">
        <button
          className={`${
            activeTab === "상품설명"
              ? "bg-gray-100 border-b-2 border-black"
              : "hover:bg-gray-50"
          } flex-1 py-2 text-center`}
          onClick={() => setActiveTab("상품설명")}
        >
          상품설명
        </button>
        <button
          className={`${
            activeTab === "구매정보"
              ? "bg-gray-100 border-b-2 border-black"
              : "hover:bg-gray-50"
          } flex-1 py-2 text-center border-l border-gray-200`}
          onClick={() => setActiveTab("구매정보")}
        >
          구매정보
        </button>
        <button
          className={`${
            activeTab === "리뷰"
              ? "bg-gray-100 border-b-2 border-black"
              : "hover:bg-gray-50"
          } flex-1 py-2 text-center border-l border-gray-200`}
          onClick={() => setActiveTab("리뷰")}
        >
          리뷰 ({totalReviews.toLocaleString()})
        </button>
        <button
          className={`${
            activeTab === "Q&A"
              ? "bg-gray-100 border-b-2 border-black"
              : "hover:bg-gray-50"
          } flex-1 py-2 text-center border-l border-gray-200`}
          onClick={() => setActiveTab("Q&A")}
        >
          Q&A (38)
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "상품설명" && <ProductDescription />}
        {activeTab === "구매정보" && (
          <div className="p-4 text-center">
            <p className="text-gray-600">구매 정보 섹션입니다.</p>
          </div>
        )}
        {activeTab === "리뷰" && (
          <div className="p-4 text-center">
            {/* 리뷰 배열을 ReviewDetailPage에 props로 넘겨줄 수도 있음 */}
            <ReviewDetailPage reviews={reviews} />
          </div>
        )}
        {activeTab === "Q&A" && (
          <div className="p-4 text-center">
            <p className="text-gray-600">Q&A 섹션입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
