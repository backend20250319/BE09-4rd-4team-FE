'use client';

import Image from 'next/image';
import React from 'react';
import TabNav from '../components/TabNav';
import UserInfoBox from '../components/UserInfoBox';

export default function GetDeliveryInfoPage() {
  return (
    <div className="float-left w-[850px] px-[29px]">
      {/* 유저 info 박스 */}
      {/* <div className="relative h-[51px] pt-2 pl-[30px] bg-[#eb6d9a]">
        <div className="relative float-left w-[34px] h-[34px] rounded-full overflow-hidden">
          <span className="absolute top-0 left-0 block overflow-hidden w-[34px] h-[34px] bg-no-repeat bg-[url('/images/mypage/order/bg_grd_01.png')]"></span>
          <Image
            width={34}
            height={34}
            src="/images/mypage/order/my_picture_base.jpg"
            alt="my_picture_base.jpg"
          />
        </div>
        <p className="float-left ml-[10px] text-[18px] leading-[34px] font-bold text-white tracking-[-1px]">
          PINK OLIVE
          <strong className="inline-block ml-[3px]">박*준</strong>님 반갑습니다.
        </p>
        <ul className="absolute top-1/2 right-[30px] -mt-[10px]">
          <li className="inline-block pr-[15px] text-[13px] text-white font-bold bg-[url('/images/mypage/order/ico_arrow7x10_2.png')] bg-no-repeat bg-[length:5px_10px] bg-[position:100%_50%] cursor-pointer">
            올리브 멤버스 라운지
          </li>
          <li className="inline-block pr-[15px] ml-[30px] text-[13px] text-white font-bold bg-[url('/images/mypage/order/ico_arrow7x10_2.png')] bg-no-repeat bg-[length:5px_10px] bg-[position:100%_50%] cursor-pointer">
            나의 프로필
          </li>
        </ul>
      </div>

      <div className="py-[19px] border border-t-0 border-[#cccccc]">
        <ul className="flex">
          <li className="float-left w-1/3 text-center">
            <span className="text-[13px] font-bold text-[#555]">
              CJ ONE 포인트
            </span>
            <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
              1,500
              <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">
                P
              </em>
            </p>
          </li>
          <li className="float-left w-1/3 text-center">
            <span className="text-[13px] font-bold text-[#555]">쿠폰</span>
            <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
              5
              <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">
                개
              </em>
            </p>
          </li>
          <li className="float-left w-1/3 text-center">
            <span className="text-[13px] font-bold text-[#555]">예치금</span>
            <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
              0
              <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">
                원
              </em>
            </p>
          </li>
        </ul>
      </div> */}

      <UserInfoBox />

      {/* 배송지 내용 */}
      <div>
        <h2 className="text-xl h-[30px] font-bold mt-[30px] mb-[7px]">배송지/환불계좌</h2>
      </div>

      <TabNav />

      <p
        className="text-sm text-gray-600 mt-[30px] pl-[10px]"
        style={{
          backgroundImage:
            "url('https://static.oliveyoung.co.kr/pc-static-root/image/comm/bar_4x4.gif')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 7px',
        }}
      >
        배송지는 최대 <span className="text-[#9bce26] font-bold">20개</span>까지 등록 가능합니다.
      </p>

      {/* 테이블 헤더 */}
      <table className="w-full table-fixed mt-[10px]">
        <thead className="h-[39px] text-[13px] font-bold border-b border-b-[rgb(230, 230, 230)] border-t-[2px] border-t-[rgb(214,214,214)] bg-[rgb(250,250,250)] py-2 mt-[10px]">
          <tr className="text-[14px] text-[#666666]">
            <th className="w-[10%]">배송지명</th>
            <th className="w-[10%]">받는사람</th>
            <th className="w-[40%]">주소</th>
            <th className="w-[20%]">연락처</th>
            <th className="w-[20%]">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[232px] text-[14px] border-b border-gray-200">
            {/* 배송지명 */}
            <td className="w-[10%] px-[5px] py-[30px] text-center">집</td>

            {/* 받는사람 */}
            <td className="w-[10%] px-[5px] py-[30px] text-center">박*서</td>

            {/* 주소 / 배송지 정보 */}
            <td className="w-[40%] pl-[20px] pr-[5px] py-[30px] text-center">
              <div className="flex items-center gap-2 mb-1">
                {/* 기본 배송지 플래그 */}
                <strong className="text-white bg-[#9bce26] text-[11px] px-2 py-1 rounded">
                  기본 배송지
                </strong>

                {/* 오늘드림 플래그 */}
                <span className="text-[#f27370] text-[11px] flex items-center">
                  <i className="icon_delivery mr-1" /> 오늘드림
                </span>
              </div>

              {/* 주소 */}
              <p>
                (01822)
                <br />
                <span className="font-semibold">도로명 :</span> 서울 밥먹구 산책로 잘가길 9
              </p>
              <p className="text-gray-500 text-[12px] mt-1">
                <span className="font-semibold">지번 :</span> 서울 밥먹구 후식동동 91
              </p>

              {/* 출입방법 */}
              <div className="mt-2 bg-gray-100 p-2 rounded text-[12px]">
                <strong>공동현관 출입방법</strong>
                <p className="mt-1 text-gray-700">자유출입가능</p>
              </div>
            </td>

            {/* 연락처 */}
            <td className="w-[20%] px-[5px] py-[30px] text-center">010-****-0944</td>

            {/* 관리 */}
            <td className="w-[20%] py-2 text-center">
              <button className="border px-2 py-1 text-[12px] rounded">수정</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 배송지 등록 버튼 */}
      <div className="text-center mt-6">
        <button className="w-[150px] h-[50px] px-6 py-2 bg-[#9bce26] text-white font-bold rounded-[5px] text-[18px]">
          배송지 등록
        </button>
      </div>
    </div>
  );
}
