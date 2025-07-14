"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ReviewProductHeader from "./ReviewProductHeader";
import ReviewRatingSection from "./ReviewRatingSection";
import ReviewSkinTypeSection from "./ReviewSkinTypeSection";
import ReviewCleansingSection from "./ReviewCleansingSection";
import ReviewIrritationSection from "./ReviewIrritationSection";
import ReviewPointNotice from "./ReviewPointNotice";
import ReviewTextInput from "./ReviewTextInput";
import ReviewWriteButtons from "./ReviewWriteButton";

const dashedLineStyle = {
  border: "none",
  borderBottom: "1px dashed #D1D5DB",
  borderImage:
    "repeating-linear-gradient(to right, #D1D5DB 0, #D1D5DB 4px, transparent 4px, transparent 8px) 1",
};

export default function ReviewWriteLayout({ orderItemId, onClose }) {
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [skinType, setSkinType] = useState("");
  const [skinConcern, setSkinConcern] = useState("");
  const [texture, setTexture] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:8080/api/orders", {
          headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        });
        // flatten orders
        const orders = res.data;
        const flatItems = Array.isArray(orders)
          ? orders.flatMap((order) =>
              order.orderItems.map((item) => ({
                ...item,
                orderId: order.orderId,
                createdAt: order.createdAt,
                status: order.status,
              }))
            )
          : [];
        const found = flatItems.find(
          (item) => String(item.orderItemId) === String(orderItemId)
        );
        if (found) setProduct(found);
        else alert("상품 정보를 찾을 수 없습니다.");
      } catch (err) {
        alert("상품 정보를 불러오는 중 오류 발생");
      }
    };
    if (orderItemId) fetchProduct();
  }, [orderItemId]);

  // 리뷰 등록
  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    if (!product) return;
    const payload = {
      content,
      rating,
      skinType,
      skinConcern, // 세정력 (클렌징 만족도)
      texture,     // 자극도
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/api/products/${product.productId}/reviews`,
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
      alert("서버 오류");
    }
  };

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        상품 정보를 불러오는 중입니다...
      </div>
    );
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
          <ul className="list-disc list-outside space-y-2">
            <li>
              게시된 리뷰의 권리와 책임은 게시당사자에게 있으며, 올리브영은
              이용자가 작성한 리뷰 등을 이용하여 서비스 운영 등에 활용할 수
              있습니다. 이 때 리뷰는 모두 공개를 원칙으로 하며, 공개의 방법은
              올리브영의 서비스 정책에 따라 변경될 수 있습니다.
            </li>
            <li>
              작성된 리뷰에 매월 1일~말일 기준으로 받은 ‘도움이 돼요’ 수 X5P가
              익월 10일 지급됩니다. (ID 기준 월 최대 2,000P)
              <br />
              (단, 포인트 지급 후 ‘도움이 돼요’ 취소 시 지급도 지급일에 차감)
            </li>
            <li>
              결제기준 상품 구매금액이 2,000원 미만인 경우에는 리뷰 등록 보상
              포인트를 지급하지 않습니다.
            </li>
            <li>
              리뷰 삭제는 작성 후 3일 이내에만 가능합니다. (마이페이지 &gt; 리뷰
              &gt; 나의리뷰)
            </li>
            <li>
              <span className="font-semibold">
                [식품 등의 표시·광고에 대한 법률]
              </span>
              을 준수하고 아래와 같은 표현은 리뷰를 지양하고 있으며, 아래의
              기준에 해당하는 리뷰는 별도의 안내 없이 블라인드 처리됩니다.
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  의약품의 효능을 지니거나 질병치료 효과를 준시라거나 암시하는
                  표현
                </li>
                <li>일반식품을 건강기능식품으로 오인하게 하는 표현</li>
                <li>사실과 다르거나, 과학적으로 근거 없는 추정적인 표현</li>
              </ul>
            </li>
            <li>
              체험단, 마케팅 대행사 또는 외부 플랫폼 등을 통해 상품을 구매하고
              리뷰 작성 or 구매대금의 전부 또는 일부를 할인받는 등 경제적
              이해관계가 존재할 경우 반드시 게시물의 제목 또는 첫 부분에서
              경제적 이해관계를 공개해야 하며, 이를 공개하지 않거나 사실로
              확인되지나 합리적으로 의심시 별도의 안내 없이 블라인드 처리됩니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
