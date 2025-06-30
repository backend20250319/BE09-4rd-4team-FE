"use client";

import { useState, useEffect } from "react";
import { FaExclamation } from "react-icons/fa";
import ReviewTabs from "../pages/guide/ReviewTabs"; // 경로는 프로젝트 구조에 맞게

// 3~4개짜리 더미 리뷰 데이터
const dummyData = [
  {
    id: 1,
    image: "resources/images/product1.jpg",
    orderType: "주문일자",
    orderDate: "2025.06.06",
    brand: "브랜드1",
    title: "[제목1] 상품 상세 설명 예시",
    subTitle: "옵션 | 예시 옵션명",
    place: "온라인몰",
    dueDate: "2025.09.05",
    reviewContent: "정말 마음에 들어요! 재구매 의사 있습니다.",
    reviewDate: "2025.06.25",
  },
  {
    id: 2,
    image: "resources/images/product2.jpg",
    orderType: "구매일자",
    orderDate: "2025.06.02",
    brand: "브랜드2",
    title: "[제목2] 상품 상세 설명 예시",
    subTitle: "옵션 | 라지 사이즈",
    place: "매장",
    dueDate: "2025.09.01",
    reviewContent: "배송이 빨라서 만족합니다.",
    reviewDate: "2025.06.27",
  },
  {
    id: 3,
    image: "resources/images/product3.jpg",
    orderType: "구매일자",
    orderDate: "2025.06.01",
    brand: "브랜드3",
    title: "[제목3] 상품 상세 설명 예시",
    subTitle: undefined,
    place: undefined,
    dueDate: "2025.09.01",
    reviewContent: "품질이 괜찮고 포장도 안전했어요.",
    reviewDate: "2025.06.28",
  },
];

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
  console.log("세팅된 리뷰 수:", dummyData.length); // 여기서 3이 찍히면 정상
  setReviews(dummyData);
}, []);


  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="w-[850px] px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">리뷰</h2>

        {/* 탭 */}
        <ReviewTabs />

        {/* 정책 문구 */}
        <div className="mt-6 text-gray-600 text-sm leading-relaxed space-y-2">
          <p className="pl-4 text-indent-[-1rem]">
            • 리뷰 정책 위반으로 블라인드된 리뷰는 상품상세페이지 리뷰목록에
            노출되지 않습니다.
            <br />
            블라인드 리뷰 운영정책을 확인해주세요
          </p>
        </div>

        {/* 누적 리뷰 건수 */}
        <div className="text-left mt-10 text-[16px] font-semibold border-b pb-3">
          누적 리뷰건수{" "}
          <span className="text-red-500 font-bold">{reviews.length}</span> 건
        </div>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-2 bg-gray-50 border-b text-[15px] font-medium text-gray-700 h-[48px] items-center px-5">
          <div>상품</div>
          <div>리뷰</div>
        </div>

        {/* 리뷰 목록 */}
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 border-b">
            <div className="w-[100px] h-[100px] flex items-center justify-center border-2 border-gray-300 rounded-full mb-4">
              <FaExclamation className="text-3xl text-gray-300" />
            </div>
            <p className="text-sm">작성한 리뷰가 없습니다.</p>
          </div>
        ) : (
          <div className="mt-6 px-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border p-4 mb-3 rounded shadow-sm bg-white flex justify-between"
              >
                {/* 좌측: 상품 정보 */}
                <div className="flex gap-4 w-1/2">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-[80px] h-[80px] object-cover rounded"
                  />
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">
                      {review.orderType} | {review.orderDate}
                    </div>
                    <div className="font-semibold">{review.brand}</div>
                    <div>{review.title}</div>
                    {review.subTitle && (
                      <div className="text-gray-500">{review.subTitle}</div>
                    )}
                    {review.place && (
                      <div className="text-gray-500">{review.place}</div>
                    )}
                  </div>
                </div>

                {/* 우측: 리뷰 내용 */}
                <div className="w-1/2 pl-6 text-sm border-l border-gray-100">
                  <div className="text-gray-700">{review.reviewContent}</div>
                  <div className="text-gray-400 mt-2 text-xs">
                    작성일자 | {review.reviewDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
