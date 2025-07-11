"use client";

import React, { useState, useEffect } from "react";
import ProductDescription from "./ProductDescription";
import ReviewDetailPage from "@/app/reviewtest/ReviewDetailPage";
import axios from "axios";

const ProductTabs = ({ productId, descriptionImages = [] }) => {
  const [activeTab, setActiveTab] = useState("상품설명");
  const [reviews, setReviews] = useState([]);

  // ✅ 상품 ID가 바뀌면 리뷰 다시 가져오기
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8080/api/products/${productId}/reviews`)
        .then((res) => {
          const data = res.data;
          if (Array.isArray(data.data)) setReviews(data.data);
          else setReviews([]);
        })
        .catch(() => setReviews([]));
    }
  }, [productId]);

  const totalReviews = reviews.length;

  return (
    <div>
      {/* 👉 탭 메뉴 */}
      <div className="flex justify-around text-lg font-semibold text-gray-700 border border-gray-200">
        {["상품설명", "구매정보", "리뷰", "Q&A"].map((tab) => (
          <button
            key={tab}
            className={`${
              activeTab === tab ? "bg-gray-100 border-b-2 border-black" : "hover:bg-gray-50"
            } flex-1 py-2 text-center ${tab !== "상품설명" ? "border-l border-gray-200" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === "리뷰" && ` (${totalReviews.toLocaleString()})`}
            {tab === "Q&A" && " (38)"}
          </button>
        ))}
      </div>

      {/* 👉 탭 내용 */}
      <div className="mt-8">
        {activeTab === "상품설명" && (
          <ProductDescription descriptionImages={descriptionImages} />
        )}
        {activeTab === "구매정보" && (
          <div className="p-4 text-center">
            <p className="text-gray-600">구매 정보 섹션입니다.</p>
          </div>
        )}
        {activeTab === "리뷰" && (
          <div className="p-4">
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