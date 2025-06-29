export default function ReviewStats({ skinType, skinConcern, texture }) {
  return (
    <div className="w-[1020px] h-[176px] grid grid-cols-3 gap-4 mb-10">
      {Object.entries(skinType).map(([label, value], i) => (
        <div key={i}>
          <div className="font-semibold">피부타입</div>
          <div className="flex justify-between">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
        </div>
      ))}

      {Object.entries(skinConcern).map(([label, value], i) => (
        <div key={i}>
          <div className="font-semibold">피부고민</div>
          <div className="flex justify-between">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
        </div>
      ))}

      {Object.entries(texture).map(([label, value], i) => (
        <div key={i}>
          <div className="font-semibold">제형도</div>
          <div className="flex justify-between">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
