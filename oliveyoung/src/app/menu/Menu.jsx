import React from 'react';

function Menu(props) {
  return (
  <div className="h-[47px] flex flex-row justify-center border-t border-b-2 border-t-[#dddddd] border-b-black">
      <div className="w-[1020px] flex flex-row items-center">
        <button className="w-[170px] h-[47px] border-l border-r border-[#dddddd] flex flex-row justify-start items-center gap-3 pl-[27px] font-bold text-[15px]">
          <img src="/images/product/categoryIcon.png" alt="menu" />
          카테고리
        </button>
        <ul className="pl-[30px] flex flex-row gap-11 font-bold">
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            오특
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            랭킹
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            헬스+
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            LUXE EDIT
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            기획전
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            세일
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            기프트카드
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            멤버십/쿠폰
          </li>
          <li className="hover:text-[#f27370] hover:underline hover:underline-offset-[5px] decoration-2 cursor-pointer whitespace-nowrap">
            이벤트
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;