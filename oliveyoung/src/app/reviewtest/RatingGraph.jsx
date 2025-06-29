export default function RatingDistribution({ ratingsDistribution }) {
  return (
    <div className="flex gap-1 ml-auto">
      {ratingsDistribution.map((percent, idx) => (
        <div
          key={idx}
          className="w-[56px] h-[155px] flex flex-col items-center justify-between pt-[38px]"
        >
          {/* 퍼센트 텍스트 (상단) */}
          <div className="text-xs">{percent}%</div>

          {/* 그래프 바 */}
          <div className="w-[8px] h-[85px] bg-gray-100 relative flex items-end rounded">
            <div
              className="bg-red-400 w-full rounded"
              style={{ height: `${percent}%` }}
            />
          </div>

          {/* 점수 텍스트 (하단) */}
          <div className="text-xs mt-1">{5 - idx}점</div>
        </div>
      ))}
    </div>
  );
}
