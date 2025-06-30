export default function ReviewStats({ skinType, skinConcern, texture }) {
  const renderBar = (label, value, total) => {
    const percentage = ((value / total) * 100).toFixed(1);
    const barWidth = percentage > 0 ? percentage : 0.5;

    return (
      <div
        key={label}
        className="mb-4 flex items-center justify-between w-full"
      >
        {/* 텍스트 라벨 */}
        <div className="text-sm text-[#555] w-[130px]">{label}</div>

        {/* 그래프 바 */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-full h-[8px] bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-[#00C8B5] rounded"
              style={{ width: `${barWidth}%` }}
            />
          </div>

          {/* 퍼센트 텍스트 */}
          <div className="text-sm text-[#333] min-w-[40px] text-right">
            {percentage}%
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (data) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    return (
      <div className="w-[320px]">
        {Object.entries(data).map(([label, value]) =>
          renderBar(label, value, total)
        )}
      </div>
    );
  };

  return (
    <div className="max-w-[1020px] mx-auto flex gap-6 px-4 justify-center">
      {[
        { title: "피부타입", data: skinType },
        { title: "피부고민", data: skinConcern },
        { title: "자극도", data: texture },
      ].map(({ title, data }) => (
        <div key={title} className="w-[320px] flex flex-col items-start">
          <div className="w-[104px] h-[36px] rounded-full bg-white text-[#00C8B5] text-center leading-[36px] font-semibold text-[16px] mb-4 border border-[#00C8B5]">
            {title}
          </div>
          {renderSection(data)}
        </div>
      ))}
    </div>
  );
}
