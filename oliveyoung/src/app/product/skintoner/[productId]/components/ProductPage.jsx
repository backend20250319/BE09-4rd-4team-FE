"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPurchase from "./ProductPurchase";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import ViewedWithProducts from "./ViewedWithProducts";
import { FaFacebookF, FaLink } from "react-icons/fa";
import { IoChevronForwardOutline } from "react-icons/io5";

function ProductPage({ productId }) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setLoading(false);
        setError("❌ 상품 ID가 제공되지 않았습니다.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiUrl = `http://localhost:8080/api/products/${productId}`;
        console.log(`✅ 상품 상세 요청: ${apiUrl}`);

        const response = await axios.get(apiUrl);
        setProductData(response.data);

        console.log("✅ 불러온 상품 데이터:", response.data);
      } catch (err) {
        console.error(err);
        if (err.response) {
          setError(
            `상품 로드 실패: ${err.response.status} - ${
              err.response.data.message || "알 수 없는 오류"
            }`
          );
        } else {
          setError("상품 정보를 불러오는 중 네트워크 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // ✅ 안전 파싱: thumbnailImages
  const thumbnailPaths =
    typeof productData?.thumbnailImages === "string"
      ? productData.thumbnailImages.split(",").map((s) => s.trim())
      : Array.isArray(productData?.thumbnailImages)
      ? productData.thumbnailImages
      : [];

  // ✅ 안전 파싱: descriptionImages
  const descriptionImages =
    typeof productData?.descriptionImages === "string"
      ? productData.descriptionImages.split(",").map((s) => s.trim())
      : Array.isArray(productData?.descriptionImages)
      ? productData.descriptionImages
      : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>📦 상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>❌ 상품 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto font-sans bg-white">
      {/* 👉 BreadCrumb */}
      <div className="flex items-center px-4 py-3 pb-2 mb-6 text-sm text-gray-400 border-b md:px-0">
        <span>홈</span>
        <span className="mx-1">&gt;</span>
        <span>{productData.categoryName || "카테고리"}</span>
        <span className="mx-1">&gt;</span>
        <span>스킨/토너</span>
        <span className="mx-1">&gt;</span>
        <span className="text-black">{productData.productName}</span>
      </div>

      {/* 👉 상단 상품 이미지 + 정보 */}
      <div className="flex flex-col gap-12 p-4 md:flex-row md:p-0">
        <ProductImage
          productData={productData}
          thumbnailPaths={thumbnailPaths}
        />
        <div className="p-4 md:w-1/2 lg:w-3/5 md:p-0">
          <ProductInfo productData={productData} />
          <ProductPurchase productData={productData} />
        </div>
      </div>

      {/* 👉 고객 리뷰 + SNS 공유 */}
      <div className="flex items-center justify-between px-4 py-4 mt-4 border-t border-gray-200 md:px-0">
        <div className="flex items-center">
          <span className="mr-2 text-lg font-bold">고객 리뷰</span>
          <div className="flex items-center">
            <span className="mr-1 text-2xl text-[#f27370]">★★★★☆</span>
            <span className="mr-1 font-bold">4.8</span>
            <span className="text-gray-500">(3,833건)</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            <FaFacebookF className="mr-1 text-blue-600" /> URL
          </button>
          <button className="flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            <FaLink className="mr-1" /> URL
          </button>
        </div>
      </div>

      {/* 👉 증정품 안내, 매장찾기 */}
      <div className="px-4 mt-6 md:px-0">
        <div className="p-4 mb-6 bg-gray-50">
          <p className="mb-2 font-semibold">증정품 안내</p>
          <p className="text-sm text-gray-700">
            [일반배송] 오늘드림, 픽업 주문 시 정품 제공
          </p>
          <p className="text-sm text-gray-700">
            전 회원 올리브영 전 상품 70,000원 이상 구매 시, 증정품 1개 선착순 증정
          </p>
        </div>
        <div className="flex justify-start mb-6 space-x-5">
          <a
            href="#"
            className="flex items-center justify-center flex-1 px-6 py-3 font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            구매 가능 수령 매장 찾기
            <IoChevronForwardOutline className="ml-2" />
          </a>
          <button className="flex items-center justify-center flex-1 px-6 py-3 font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            <span
              className="inline-block w-12 h-8 mr-2 bg-center bg-cover rounded-full"
              style={{
                backgroundImage: `url('https://image.oliveyoung.co.kr/uploads/images/onlBrandMgmt/2021/4/7996462662502374809.jpg')`,
              }}
              role="img"
              aria-label={`${productData.brandName} Logo`}
            ></span>
            {productData.brandName} 브랜드관
            <IoChevronForwardOutline className="ml-2" />
          </button>
        </div>
      </div>

      {/* 👉 하단 연관상품 + Tabs + 최근 본 상품 */}
      <RelatedProducts />
      <ProductTabs descriptionImages={descriptionImages} />
      <ViewedWithProducts />
    </div>
  );
}

export default ProductPage;