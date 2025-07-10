"use client";

import { useState, useEffect } from "react";
import { FaExclamation } from "react-icons/fa";
import axios from "axios";
import ReviewTabs from "../pages/guide/ReviewTabs"; // 경로는 프로젝트에 맞게 수정
import MyPageLayout from "@/app/mypage/layout";
import UserInfoBox from "@/app/mypage/user/components/UserInfoBox";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userName'); // 로그인 후 저장되어 있어야 함

        if (!token || !userId) {
          console.error("토큰 또는 사용자 ID가 없습니다.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setReviews(response.data);
      } catch (error) {
        console.error("리뷰를 불러오는 중 오류 발생:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <MyPageLayout>
      <div className="px-3">
        <UserInfoBox />
      </div>
      <div className="max-w-4xl mx-auto">
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
                  key={review.reviewId}
                  className="border p-4 mb-3 rounded shadow-sm bg-white flex justify-between"
                >
                  {/* 좌측: 상품 정보 */}
                  <div className="flex gap-4 w-1/2">
                    <img
                      src={review.productImageUrl}
                      alt={review.productTitle}
                      className="w-[80px] h-[80px] object-cover rounded"
                    />
                    <div className="text-sm">
                      <div className="text-gray-500 mb-1">
                        상품번호 | {review.productId}
                      </div>
                      <div className="font-semibold">{review.brand}</div>
                      <div>{review.productTitle}</div>
                    </div>
                  </div>

                  {/* 우측: 리뷰 내용 */}
                  <div className="w-1/2 pl-6 text-sm border-l border-gray-100">
                    <div className="text-gray-700">{review.content}</div>
                    <div className="text-gray-400 mt-2 text-xs">
                      작성일자 |{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MyPageLayout>
  );
}
