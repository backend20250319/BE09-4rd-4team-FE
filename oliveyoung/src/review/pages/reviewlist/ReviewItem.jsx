export default function ReviewItem({ data }) {
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
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-[12px]">
          리뷰 작성
        </button>
      </div>
    </div>
  );
}
