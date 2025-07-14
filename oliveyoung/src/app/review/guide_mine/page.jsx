"use client";

import { useState, useEffect } from "react";
import { FaExclamation } from "react-icons/fa";
import axios from "axios";
import ReviewTabs from "../pages/guide/ReviewTabs";
import MyPageLayout from "@/app/mypage/layout";
import UserInfoBox from "@/app/mypage/user/components/UserInfoBox";
import { getImageUrl } from "@/utils/image";

// content만 수정할 수 있는 모달
function ReviewEditModal({ review, onClose, onSave }) {
  const [content, setContent] = useState(review.content);

  return (
    <div className="bg-white p-8 rounded-xl w-[400px] shadow-lg flex flex-col">
      <h3 className="text-lg font-bold mb-4">리뷰 수정</h3>
      <textarea
        className="w-full border rounded p-2 mb-4 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <button className="px-4 py-1 border rounded text-sm" onClick={onClose}>
          취소
        </button>
        <button
          className="px-4 py-1 border bg-black text-white rounded text-sm"
          onClick={() => onSave(content)}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  // 리뷰 목록 새로고침
  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const userNo = localStorage.getItem("userNo");
      if (!token || !userNo) {
        console.error("토큰 또는 사용자 번호(userNo)가 없습니다.");
        return;
      }
      const response = await axios.get(
        `http://localhost:8080/api/users/${userNo}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setReviews(response.data.data || []);
    } catch (error) {
      console.error(
        "리뷰를 불러오는 중 오류 발생:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 삭제
  const handleDelete = async (reviewId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReviews();
    } catch (error) {
      alert("삭제 실패: " + (error.response?.data?.message || error.message));
    }
  };

  // 수정 저장 (모든 필드 PUT으로 전달)
  const handleUpdate = async (reviewId, newContent) => {
    try {
      const token = localStorage.getItem("accessToken");
      // editingReview 객체의 나머지 값들을 모두 포함하여 PUT 요청
      await axios.put(
        `http://localhost:8080/api/reviews/${reviewId}`,
        {
          ...editingReview, // 기존 리뷰 전체 필드
          content: newContent, // content는 새 값으로 덮어쓰기
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchReviews();
      setEditingReview(null);
    } catch (error) {
      alert("수정 실패: " + (error.response?.data?.message || error.message));
    }
  };

  // 수정 폼 닫기
  const handleClose = () => setEditingReview(null);

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
              {reviews.map((review) => {
                const fullImageUrl = getImageUrl(
                  review.productImageUrl || review.imageUrl
                );
                const brand = review.brand || review.brandName;
                const productTitle = review.productTitle || review.productName;

                return (
                  <div
                    key={review.reviewId}
                    className="border p-4 mb-3 rounded shadow-sm bg-white flex justify-between"
                  >
                    {/* 좌측: 상품 정보 */}
                    <div className="flex gap-4 w-1/2">
                      <img
                        src={fullImageUrl}
                        alt={productTitle}
                        className="w-[80px] h-[80px] object-cover rounded"
                        onError={(e) => (e.currentTarget.src = getImageUrl())}
                      />
                      <div className="text-sm">
                        <div className="text-gray-500 mb-1">
                          상품번호 | {review.productId}
                        </div>
                        <div className="font-semibold">{brand}</div>
                        <div>{productTitle}</div>
                      </div>
                    </div>
                    {/* 우측: 리뷰 내용 + 버튼 */}
                    <div className="w-1/2 pl-6 text-sm border-l border-gray-100 flex flex-col justify-between">
                      <div>
                        <div className="text-gray-700">{review.content}</div>
                        <div className="text-gray-400 mt-2 text-xs">
                          작성일자 |{" "}
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100"
                          onClick={() => setEditingReview(review)}
                        >
                          수정
                        </button>
                        <button
                          className="px-3 py-1 border border-red-400 text-red-500 rounded text-xs hover:bg-red-50"
                          onClick={() => handleDelete(review.reviewId)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* 수정 모달 */}
              {editingReview && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                  <ReviewEditModal
                    review={editingReview}
                    onClose={handleClose}
                    onSave={(newContent) =>
                      handleUpdate(editingReview.reviewId, newContent)
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MyPageLayout>
  );
}
