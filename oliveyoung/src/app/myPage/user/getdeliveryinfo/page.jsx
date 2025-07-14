'use client';

import React from 'react';
import TabNav from '@/app/mypage/user/components/TabNav';
import { useRouter } from 'next/navigation';
import UserInfoBox from '@/app/mypage/user/components/UserInfoBox';

export default function GetDeliveryInfoPage() {
  const router = useRouter();

  return (
    <div className="float-left w-[850px] px-[29px]">
      {/* 유저 info 박스 */}
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
        <button
          className="w-[150px] h-[50px] px-6 py-2 bg-[#9bce26] text-white font-bold rounded-[5px] text-[18px]"
          onClick={() => router.push('/mypage/user/getdeliveryinfo/deliveryregister')}
        >
          배송지 등록
        </button>
      </div>
    </div>
  );
}
