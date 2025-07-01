'use client';

import Image from 'next/image';
import React from 'react';
import TabNav from '../components/TabNav';

export default function GetDeliveryInfoPage() {
  return (
    <div className="float-left w-[850px] px-[29px]">
      {/* 유저 info 박스 */}
      <div className="relative h-[51px] pt-2 pl-[30px] bg-[#eb6d9a]">
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
          BABY OLIVE
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
            <span className="text-[13px] font-bold text-[#555]">CJ ONE 포인트</span>
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
      </div>

      {/* 배송지 내용 */}
      <div>
        <h2 className="text-xl font-bold mt-6 mb-4">배송지/환불계좌</h2>
      </div>

      <TabNav />

      <p className="text-sm text-gray-600 mt-[30px]">
        배송지는 최대 <span className="text-[#9bce26] font-bold">20개</span>까지 등록 가능합니다.
      </p>

      {/* 테이블 헤더 */}
      <div className="flex text-[13px] font-bold border-b border-b-[rgb(230, 230, 230)] border-t-[1.6px] border-t-[rgb(230,230,230)] bg-[rgb(250,250,250)] py-2 mt-[10px]">
        <div className="w-1/5">배송지명</div>
        <div className="w-1/5">받는사람</div>
        <div className="w-2/5">주소</div>
        <div className="w-1/5">연락처</div>
        <div className="w-[60px] text-center">관리</div>
      </div>

      {/* 배송지 리스트 한 개 예시 */}
      <div className="py-4 text-[13px] border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-1/5">집</div>
          <div className="w-1/5">박*준</div>
          <div className="w-2/5">
            (01822) 서울 밥먹구 산책로 잘가길 9
            <br />
            지번: 서울 밥먹구 후식동 99
          </div>
          <div className="w-1/5">010-****-0944</div>
          <div className="w-[60px] text-center">
            <button className="border px-2 py-1 text-[12px] rounded">수정</button>
          </div>
        </div>
        <div className="text-[12px] text-gray-500 mt-1 ml-[40%]">
          공동현관 출입방법: 자유출입 가능
        </div>
      </div>

      {/* 배송지 등록 버튼 */}
      <div className="text-center mt-6">
        <button className="w-[150px] h-[50px] px-6 py-2 bg-[#9bce26] text-white font-bold rounded-[5px] text-[18px]">
          배송지 등록
        </button>
      </div>
    </div>
  );
}
