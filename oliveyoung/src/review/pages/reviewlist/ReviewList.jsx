import ReviewItem from "./ReviewItem";

const dummyData = [
  {
    id: 1,
    image: "resources/images/product1.jpg", // 이미지 URL
    orderType: "주문일자",
    orderDate: "2025.06.06",
    brand: "마녀공장",
    title: "[블랙헤드OUT/4년연속1위] 마녀공장 퓨어 클렌징오일...",
    dueDate: "2025.09.05",
  },
  {
    id: 2,
    image: "resources/images/product1.jpg",
    orderType: "주문일자",
    orderDate: "2025.06.06",
    brand: "센카",
    title: "[하루특가][대용량 한정기획] 센카 퍼펙트 휩 페이셜...",
    dueDate: "2025.09.05",
  },
  {
    id: 3,
    image: "resources/images/product1.jpg",
    orderType: "구매일자",
    orderDate: "2025.05.28",
    brand: "필리밀리",
    title: "필리밀리 촉촉퍼프(3P)",
    subTitle: "옵션 | 촉촉퍼프(3P)_NEW",
    place: "매장",
    dueDate: "2025.08.26",
  },
];
export default function ReviewList() {
  return (
    <div className="mt-6">
      {/* 카테고리 헤더 */}
      <div className="grid grid-cols-[1fr_150px_120px] gap-4 px-1 py-3 border-y border-gray-300 text-sm text-gray-700 font-semibold bg-gray-50">
        <div className="text-center">상품</div>
        <div className="text-center">작성기간</div>
        <div className="text-center">리뷰작성</div>
      </div>

      {/* 리스트 아이템 */}
      <div className="space-y-0">
        {dummyData.map((item) => (
          <ReviewItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
