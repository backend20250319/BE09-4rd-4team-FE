"use client";


export default function ReviewWriteButtons({ onClose, onSubmit }) {
  return (
    <div className="flex justify-end gap-4 mt-5 px-11">
      <button
        className="w-[170px] h-[50px] px-5 py-2 border border-[#999999] rounded text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        닫기
      </button>
      <button
        className="w-[170px] h-[50px] px-5 py-2 bg-[#999999] text-white rounded hover:bg-gray-800"
        onClick={onSubmit}
      >
        리뷰 등록하기
      </button>
    </div>
  );
}
