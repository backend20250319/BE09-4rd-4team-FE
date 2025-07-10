"use client";

import React from "react";
import { GoQuestion } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";

const ProductInfo = ({ productData }) => {
  return (
    <>
      <p className="mb-1 text-sm text-black">{productData.brandName} &gt;</p>
      <h1 className="mb-2 text-2xl font-semibold">{productData.productName}</h1>

      <div className="mb-2">
        <div className="flex items-baseline space-x-2">
          {productData.originalPrice && (
            <span className="mr-1 text-lg text-gray-400 line-through">
              {productData.originalPrice.toLocaleString()}원
            </span>
          )}
          <span className="text-2xl font-bold text-[#e02020]">
            {productData.discountedPrice.toLocaleString()}원
            <span className="ml-3 text-sm font-normal text-gray-700">
              혜택 정보
              <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 align-middle cursor-pointer" />
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center mb-2">
        {productData.badgeNames &&
          productData.badgeNames.map((badgeText, index) => {
            let bgColorClass = "";
            switch (badgeText) {
              case "세일":
                bgColorClass = "bg-[#f65c60]";
                break;
              case "쿠폰":
                bgColorClass = "bg-[#9bce26]";
                break;
              case "증정":
                bgColorClass = "bg-[#6fcff7]";
                break;
              case "오늘드림":
                bgColorClass = "bg-[#f374b7]";
                break;
              default:
                bgColorClass = "bg-gray-500";
            }
            return (
              <span
                key={index}
                className={`px-2 py-0.5 text-white text-xs rounded-[9px] mr-1 ${bgColorClass}`}
              >
                {badgeText}
              </span>
            );
          })}
      </div>

      <p className="text-sm text-gray-600">
        {productData.viewCount && (
          <>
            <IoEyeOutline className="inline-block ml-1 font-bold text-base text-[#f27370] align-middle cursor-pointer" />{" "}
            <span className="font-extrabold text-[#f27370]">
              {productData.viewCount.toLocaleString()}
            </span>
            <span className="text-[#f27370]">명이 보고있어요</span>
          </>
        )}
      </p>
    </>
  );
};

export default ProductInfo;