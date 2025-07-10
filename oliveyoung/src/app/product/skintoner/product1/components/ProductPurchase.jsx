"use client";

import React from "react";
import { GoQuestion } from "react-icons/go";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaRegHeart, FaGift } from "react-icons/fa";

const ProductPurchase = ({ productData }) => {
  return (
    <>
      <div className="py-4">
        <span className="mb-2 text-lg font-semibold">배송정보</span>
        <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
        <ul className="text-sm text-gray-700">
          <li className="flex mt-2 mb-2">
            <span className="font-semibold text-gray-700 w-25">일반배송</span>
            <span className="mx-2 text-gray-300">|</span>
            <div className="flex flex-col flex-1">
              <span>2,500원 (20,000원 이상 무료배송)</span>
              <span className="text-gray-700 ">
                올리브영 배송: 평균 4일 이내 배송
              </span>
            </div>
          </li>
          <li className="flex items-center mb-2">
            <span className="font-semibold text-gray-700 w-25">오늘드림</span>
            <span className="mx-2 text-gray-300">|</span>
            <div className="flex items-center flex-1">
              2,500원 또는 5,000원
              <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-500 cursor-pointer" />
            </div>
          </li>
          <li className="flex items-center pb-3 border-b border-gray-200">
            <span className="mr-6 font-semibold text-gray-700 w-25">픽업</span>
            <span className="mx-2 text-gray-300">|</span>
            <div className="flex items-center flex-1">
              배송비 조건 없음
              <GoQuestion className="inline-block ml-1 text-base text-gray-500 cursor-pointer" />
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-2 border-b ">
        <p className="mb-2 text-lg font-semibold">결제혜택</p>
        <ul className="text-sm text-gray-700">
          <li className="flex items-center mb-1">
            <span>
              THE CJ 카드 추가 10%할인
              <GoQuestion className="inline-block ml-1 text-base text-gray-500 align-middle cursor-pointer" />
            </span>
          </li>
          <li className="flex items-center mb-4">
            <span>
              CJ ONE 포인트 최대 1% 적립 예상
              <GoQuestion className="inline-block ml-1 text-base text-gray-500 align-middle cursor-pointer" />
            </span>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between py-4 mb-4 border-b border-gray-200">
        <span className="text-lg font-semibold">구매수량</span>
        <div className="flex items-center border border-gray-300 rounded-sm">
          <button className="flex items-center justify-center w-8 h-8 text-lg text-gray-600 rounded-l-sm hover:bg-gray-100">
            <CiCircleMinus className="w-5 h-5" />
          </button>
          <input
            type="text"
            value="1"
            readOnly
            className="w-12 h-8 text-sm text-center border-l border-r border-gray-300"
          />
          <button className="flex items-center justify-center w-8 h-8 text-lg text-gray-600 rounded-r-sm hover:bg-gray-100">
            <CiCirclePlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 mb-6 border-b-2 border-[#e02020]">
        <span className="text-lg font-bold text-[#e02020]">상품금액 합계</span>
        <span className="text-xl font-bold text-red-500">
          {productData.discountedPrice.toLocaleString()}원
        </span>
      </div>

      <div className="flex items-center mb-4 text-sm">
        <input
          type="checkbox"
          id="todayDream"
          className="w-4 h-4 mr-2 accent-[#f27370]"
        />
        <label htmlFor="todayDream">
          오늘드림으로 받아 보시겠어요?
          <GoQuestion className="inline-block mb-1 ml-1 text-base text-gray-600 align-middle cursor-pointer" />
        </label>
      </div>

      <div className="flex mb-8 space-x-2">
        <button className="flex-1 py-3 text-lg border border-[#f27370] text-[#f27370] hover:bg-white">
          장바구니
        </button>
        <button className="flex-1 py-3 text-lg text-white bg-[#f27370] hover:bg-[#f27370]">
          바로구매
        </button>
        <button className="flex items-center justify-center border bg-[#f27370] border-gray-300 rounded-sm w-14 hover:bg-gray-50">
          <FaGift className="w-6 h-6 text-white" />
        </button>
        <button className="flex items-center justify-center border border-gray-300 w-14 h-14 hover:bg-white">
          <FaRegHeart className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </>
  );
};

export default ProductPurchase;