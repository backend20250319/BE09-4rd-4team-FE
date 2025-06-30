import RatingStars from "./RatingStars";
import RatingDistribution from "./RatingGraph";

export default function ReviewSummary({ data }) {
  return (
    <div className="w-[1020px] h-[231px] flex items-center gap-6">
      {/* 이모지 영역 */}
      <div className="w-[280px] h-[231px] flex flex-col items-center justify-center">
        <div className="text-[100px] w-[100px] h-[100px] flex items-center justify-center">
          😊
        </div>
        <div className="text-md font-semibold mt-2 text-center w-full">
          최고
        </div>
      </div>

      {/* 점수 영역 (왼쪽에 세로 구분선 추가) */}
      <div className="w-[361px] h-[231px] flex flex-col items-center justify-center text-center border-l border-gray-300 pl-6">
        <div className="text-gray-500 mb-[30px]">
          총 {data.totalReviews.toLocaleString()}건
        </div>
        <div className="flex items-end gap-2">
          <div
            className="font-bold"
            style={{
              width: "64px",
              height: "54px",
              fontSize: "48px",
              lineHeight: "54px",
            }}
          >
            {data.rating}
          </div>
          <div
            style={{
              width: "29px",
              height: "32px",
              fontSize: "24px",
              lineHeight: "32px",
            }}
          >
            점
          </div>
        </div>

        <RatingStars rating={data.rating} />
      </div>

      {/* 그래프 영역 */}
      <div className="pt-[38px]">
        <RatingDistribution ratingsDistribution={data.ratingsDistribution} />
      </div>
    </div>
  );
}
