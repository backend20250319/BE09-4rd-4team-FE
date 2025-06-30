export default function ReviewProductHeader({ data }) {
  // 📌 [나중에 백엔드에서 넘겨받은 product 데이터 사용]
  const { image, brand, title } = data;

  return (
    <div className="flex items-center gap-4 border-b pb-4">
      <img src={image} alt={title} className="w-[60px] h-[60px] object-cover rounded" />
      <div>
        <p className="font-semibold">{brand}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
}
