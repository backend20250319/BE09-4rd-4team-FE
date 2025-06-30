import RatingStars from "./RatingStars";
import RatingDistribution from "./RatingGraph";

// 평점에 따른 이모지 반환
const getEmoji = (rating) => {
  if (rating >= 4.5) return "😊";
  if (rating >= 3.5) return "😐";
  return "😞";
};

// 평점에 따른 텍스트 반환
const getText = (rating) => {
  if (rating >= 4.5) return "최고";
  if (rating >= 3.5) return "보통이에요";
  return "별로예요";
};

export default function ReviewSummary({ data }) {
  return (
    <div className="w-[1020px] h-[231px] flex items-center gap-6">
      {/* 이모지 영역 */}
      <div className="w-[280px] h-[231px] flex flex-col items-center justify-center">
        <div className="text-[100px] w-[100px] h-[100px] flex items-center justify-center">
          {getEmoji(data.rating)}
        </div>
        <div className="text-md font-semibold mt-2 text-center w-full">
          {getText(data.rating)}
        </div>
      </div>

      {/* 점수 영역 */}
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
