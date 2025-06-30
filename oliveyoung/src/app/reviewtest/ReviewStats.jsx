export default function ReviewStats({ skinType, skinConcern, texture }) {
  const renderBar = (label, value, total) => {
    const percentage = ((value / total) * 100).toFixed(1);
    const barWidth = percentage > 0 ? percentage : 0.5;

    return (
      <div key={label} className="mb-4 flex items-center gap-4">
        {/* 왼쪽 라벨 */}
        <span className="w-[110px] text-sm text-[#777777]">{label}</span>

        {/* 오른쪽: 그래프 + 퍼센트 */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-[100px] h-[8px] bg-gray-200 rounded">
            <div
              className="h-full bg-[#00C8B5] rounded"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
      </div>
    );
  };

  const renderSection = (data) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);

    return (
      <div className="w-[340px]">
        <div className="flex flex-col">
          {Object.entries(data).map(([label, value]) =>
            renderBar(label, value, total)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-6 px-4 justify-center">
      {[
        { title: "피부 타입", data: skinType },
        { title: "피부 고민", data: skinConcern },
        { title: "자극도", data: texture },
      ].map(({ title, data }) => (
        <div key={title}>
          {/* ✅ 라운드 제목 박스 */}
          <div className="w-[104px] h-[36px] rounded-full bg-white text-[#00C8B5] text-center leading-[36px] font-semibold text-[16px] mb-4 border border-[#00C8B5] ">
            {title}
          </div>

          {/* ✅ 그래프 목록 */}
          {renderSection(data)}
        </div>
      ))}
    </div>
  );
}
