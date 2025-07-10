
// src/app/product/skintoner/product1/components/product-page/ProductTabs.jsx
"use client";

import React, { useState } from "react";
import ProductDescription from "./ProductDescription";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("상품설명");

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
          리뷰 (3,833)
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
            <p className="text-gray-600">리뷰 섹션입니다.</p>
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
