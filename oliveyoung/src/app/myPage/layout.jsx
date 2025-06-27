'use client';

import React from 'react';
import MyPageNavBar from './components/NavBar';

const MyPageLayout = ({ children }) => {
  return (
    <div className="max-w-[1020px] mx-auto flex mt-7">
      {/* 왼쪽 고정 Nav */}
      <MyPageNavBar />

      {/* 오른쪽 본문 */}
      <div className="flex-1 ml-10">
        {children}
      </div>
    </div>
  );
};

export default MyPageLayout;
