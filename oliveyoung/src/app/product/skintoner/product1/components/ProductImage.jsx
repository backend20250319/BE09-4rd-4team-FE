
// src/app/product/skintoner/product1/components/product-page/ProductImage.jsx
"use client";

import React, { useState } from "react";
import { getImageUrl } from "@/utils/image";

const ProductImage = ({ productData, fixedThumbnailPaths }) => {
  const [mainImage, setMainImage] = useState(
    productData.imageUrl ||
      (fixedThumbnailPaths.length > 0
        ? getImageUrl(fixedThumbnailPaths[0])
        : getImageUrl("/product/skintoner21.jpg"))
  );

  const handleThumbnailClick = (imagePath) => {
    setMainImage(getImageUrl(imagePath));
  };

  const thumbnailPaths =
    productData.subImageUrls &&
    Array.isArray(productData.subImageUrls) &&
    productData.subImageUrls.length > 0
      ? [productData.imageUrl, ...productData.subImageUrls]
      : fixedThumbnailPaths;

  return (
    <div className="flex flex-col lg:w-3/5">
      <div className="relative w-full max-w-[500px] h-[500px] mb-8">
        <img
          src={mainImage}
          alt={productData.productName}
          className="object-contain w-full h-full rounded-md"
        />
      </div>
      <ul className="flex justify-center space-x-2">
        {thumbnailPaths.map((imagePath, index) => (
          <li
            key={imagePath}
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
    </div>
  );
};

export default ProductImage;
