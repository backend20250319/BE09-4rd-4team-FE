"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReviewProductHeader from "./ReviewProductHeader";
import ReviewRatingSection from "./ReviewRatingSection";
import ReviewSkinTypeSection from "./ReviewSkinTypeSection";
import ReviewCleansingSection from "./ReviewCleansingSection";
import ReviewIrritationSection from "./ReviewIrritationSection";
import ReviewPointNotice from "./ReviewPointNotice";
import ReviewTipImages from "./ReviewTipImages";
import ReviewTextInput from "./ReviewTextInput";
import ReviewWriteButtons from "./ReviewWriteButton";

const dashedLineStyle = {
  border: "none",
  borderBottom: "1px dashed #D1D5DB",
  borderImage:
    "repeating-linear-gradient(to right, #D1D5DB 0, #D1D5DB 4px, transparent 4px, transparent 8px) 1",
};

export default function ReviewWriteLayout({ productId, onClose }) {
  const [product, setProduct] = useState(null);

  const [rating, setRating] = useState(0);
  const [skinType, setSkinType] = useState("");
  const [skinConcern, setSkinConcern] = useState("");
  const [texture, setTexture] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // images 상태 추가 (누락 시 에러 방지)

  // 상품 정보 불러오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${productId}`);
        const result = res.data;
        if (result.success) {
          setProduct(result.data);
        } else {
          alert("상품 정보를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("상품 조회 오류:", err);
        alert("상품 정보를 불러오는 중 오류 발생");
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // 리뷰 등록
  const handleSubmit = async () => {
    const token = localStorage.getItem("jwtToken");

    const payload = {
      content,
      rating,
      skinType,
      skinConcern,
      texture
    };

    try {
      const res = await axios.post(
        `http://localhost:8080/api/products/${productId}/reviews`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const result = res.data;

      if (result.success) {
        alert("리뷰 등록 성공!");
        onClose();
      } else {
        alert("등록 실패: " + (result.message || "에러 발생"));
      }
    } catch (err) {
      console.error("리뷰 등록 오류:", err);
      alert("서버 오류");
    }
  };

  if (!product) {
    return <div className="p-10 text-center text-gray-500">상품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-[480px] bg-white py-[40px] px-[0px]">
        <h2 className="text-[25px] font-bold mb-6 -mt-10">리뷰 작성</h2>
        <hr className="my-6" />
        <ReviewProductHeader data={product} />
        <ReviewRatingSection value={rating} onChange={setRating} />
        <hr style={dashedLineStyle} className="my-6" />
        <ReviewSkinTypeSection value={skinType} onChange={setSkinType} />
        <hr style={dashedLineStyle} className="my-6" />
        <ReviewCleansingSection value={skinConcern} onChange={setSkinConcern} />
        <hr style={dashedLineStyle} className="my-6" />
        <ReviewIrritationSection value={texture} onChange={setTexture} />
        <ReviewPointNotice />
        <ReviewTipImages value={images} onChange={setImages} />
        <br className="my-6" />
        <div className="-mx-5">
          <ReviewTextInput value={content} onChange={setContent} />
        </div>
        <br className="my-6" />
        <div className="mx-4">
          <ReviewWriteButtons onClose={onClose} onSubmit={handleSubmit} />
        </div>

        {/* 안내 문구 */}
        <div
          className="w-[560px] h-auto -mx-10 mt-10 bg-gray-100 rounded text-sm text-gray-700 leading-relaxed break-words"
          style={{ padding: "18px 40px" }}
        >
          <ul className="list-disc list-outside space-y-4">
            <li>게시된 리뷰의 권리와 책임은 작성자에게 있습니다.</li>
            <li>도움이 돼요 수 X5P 포인트 지급 (월 최대 2,000P)</li>
            <li>2,000원 미만 상품은 리뷰 포인트 미지급</li>
            <li>리뷰는 작성 후 3일 이내 삭제 가능</li>
            <li><strong>표현 제한:</strong> 허위, 과장, 오해 유발 금지</li>
            <li>경제적 이해관계는 반드시 명시해야 합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
