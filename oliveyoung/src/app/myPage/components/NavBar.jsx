import React from "react";

const MyPageNavBar = () => {
  const menuSections = [
    {
      title: "마이 쇼핑",
      items: [
        "주문/배송 조회",
        "장바구니",
        "쿠폰",
        "리뷰",
      ],
    },
    {
      title: "마이 정보",
      items: [
        "회원정보 수정", 
        "배송지/환불계좌", 
        "회원탈퇴",
      ],
    },
  ];

  return (
    <nav className="w-52 p-4 border-r border-gray-200 text-sm">
      {/* 상단 '마이페이지' 제목 */}

      <div className="mb-10">
        <h2 className="font-bold text-[32px]">마이페이지</h2>
      </div>

      {/* 각 섹션별 메뉴 */}
      {menuSections.map((section) => (
        <section key={section.title} className="mb-6">
          <h3 className="text-base font-semibold mb-2">{section.title}</h3>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li
                key={item}
                className="cursor-pointer text-gray-800 hover:text-[#9bce26] text-[13px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
};

export default MyPageNavBar;
