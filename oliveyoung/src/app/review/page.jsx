"use client"; // 훅 사용하는 하위 컴포넌트가 있으면 필요

import ReviewWriteSection from "./pages/guide/ReviewWriteSection";

export default function Main() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <ReviewWriteSection />
    </div>
  );
}
