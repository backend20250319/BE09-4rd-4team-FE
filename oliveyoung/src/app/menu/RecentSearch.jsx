import React from 'react';

function RecentSearch({ search }) {
  return (
    <div className="w-[100%] py-[9px] flex flex-row justify-between items-center">
      <p className="text-sm text-[#131518]">스킨/토너</p>
      <div>
        <img src="/images/product/delete.svg" alt="delete" /> {/* 절대 경로로 수정 */}
      </div>
    </div>
  );
}
export default RecentSearch;