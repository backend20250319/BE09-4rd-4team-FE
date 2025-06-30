import { useState } from "react";

export default function ReviewIrritationSection() {
  const [irritation, setIrritation] = useState("");

  const options = ["자극없이 순해요", "보통이에요", "자극이 느껴져요"];

  return (
    <div>
      <p className="mb-2 font-medium">피부에 닿는 자극의 정도가 어때요?</p>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="radio"
              name="irritation"
              checked={irritation === opt}
              onChange={() => setIrritation(opt)}
              className="hidden"
            />
            {/* 커스텀 라디오 */}
            <span
              className={`relative w-8 h-8 flex items-center justify-center rounded-full
                border-2 ${irritation === opt ? "bg-[#0CC7B8] border-[#0CC7B8]" : "bg-white border-gray-400"}
              `}
            >
              {irritation === opt && (
                <svg
                  className="absolute w-5 h-5 text-white pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span
              className={`text-sm font-semibold ${
                irritation === opt ? "text-[#0CC7B8]" : "text-gray-700"
              }`}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
