import { useState } from "react";
import ReviewWriteMain from "../write/ReviewWriteMain";

export default function ReviewItem({ data }) {
  const [showModal, setShowModal] = useState(false);

  if (!data) return null;

  const {
    image,
    orderType,
    orderDate,
    brand,
    title,
    subTitle,
    place,
    dueDate,
  } = data;

  return (
    <>
      <div className="grid grid-cols-[1fr_150px_120px] gap-4 border-b py-4 items-center">
        {/* 상품 정보 */}
        <div className="flex gap-4 items-start">
          <img
            src={image}
            alt={brand}
            className="w-[80px] h-[80px] object-cover rounded"
          />
          <div className="text-sm text-gray-700">
            <div className="text-xs text-gray-500">
              {orderType} {orderDate} {place && `| ${place}`}
            </div>
            <div className="font-semibold mt-1">{brand}</div>
            <div className="text-gray-600 text-sm">{title}</div>
            {subTitle && (
              <div className="text-xs text-gray-500 mt-1">{subTitle}</div>
            )}
          </div>
        </div>

        {/* 작성기한 */}
        <div className="text-sm text-gray-600 text-center">~{dueDate}</div>

        {/* 리뷰 작성 버튼 */}
        <div className="flex justify-end mr-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-[12px]"
          >
            리뷰 작성
          </button>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-[560px] w-full max-h-[80vh] overflow-y-auto overflow-x-hidden relative">
            {/* 우측 상단 X 닫기 버튼 */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-11 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              ❌
            </button>

            {/* 리뷰 작성 폼 */}
            <ReviewWriteMain onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
