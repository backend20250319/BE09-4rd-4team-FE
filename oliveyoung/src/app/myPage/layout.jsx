import React from "react";
import MyPageNavBar from "../myPage/MyPageNavBar";

export default function LayoutMyPage({ children }) {
  return (
    <div className="flex">
      {/* 왼쪽 고정 NavBar */}
      <MyPageNavBar />

      {/* 오른쪽 페이지 바디 영역 */}
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
}

