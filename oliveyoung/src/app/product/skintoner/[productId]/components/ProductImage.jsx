"use client";

import React, { useState, useEffect } from "react";
import { getImageUrl } from "@/utils/image";

const ProductImage = ({ productData, fixedThumbnailPaths = [] }) => {
  // ✅ 메인 이미지 경로 결정 (fallback 제거)
  const initialMainImage = productData.imageUrl
    ? getImageUrl(productData.imageUrl)
    : fixedThumbnailPaths.length > 0
    ? getImageUrl(fixedThumbnailPaths[0])
    : null;

  const [mainImage, setMainImage] = useState(initialMainImage);

  // ✅ 썸네일 리스트 결정 (메인 + 서브 이미지)
  const thumbnailPaths =
    Array.isArray(productData.subImageUrls) && productData.subImageUrls.length > 0
      ? [productData.imageUrl, ...productData.subImageUrls]
      : fixedThumbnailPaths;

  const handleThumbnailClick = (imagePath) => {
    setMainImage(getImageUrl(imagePath));
  };

  useEffect(() => {
    setMainImage(initialMainImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  return (
    <div className="flex flex-col lg:w-3/5">
      <div className="relative w-full max-w-[500px] h-[500px] mb-8">
        {mainImage ? (
          <img
            src={mainImage}
            alt={productData.productName}
            className="object-contain w-full h-full rounded-md"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <span className="text-sm text-gray-500">이미지가 없습니다.</span>
          </div>
        )}
      </div>

      {thumbnailPaths.length > 0 && (
        <ul className="flex justify-center space-x-2">
          {thumbnailPaths.map((imagePath, index) => (
            <li
              key={index}
              className={`w-[80px] h-[80px] cursor-pointer ${
                mainImage === getImageUrl(imagePath)
                  ? "border-2 border-black"
                  : "border border-gray-300"
              } hover:border-black`}
              onClick={() => handleThumbnailClick(imagePath)}
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img
                  src={getImageUrl(imagePath)}
                  alt={`썸네일 이미지 ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductImage;