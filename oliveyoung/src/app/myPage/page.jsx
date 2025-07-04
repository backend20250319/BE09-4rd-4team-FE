'use client';

import { orderTableData } from "./order/data/orderTableData";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 날짜 계산 함수
const getPeriod = (months) => {
  const end = dayjs();
  const start = end.subtract(months, "month");
  return {
    startYear: start.year(),
    startMonth: start.format("MM"),
    startDay: start.format("DD"),
    endYear: end.year(),
    endMonth: end.format("MM"),
    endDay: end.format("DD"),
  };
};

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function MyPageHome() {

  const defaultPeriod = getPeriod(1);

  const [periodState, setPeriodState] = useState(() => ({
    startYear: defaultPeriod.startYear,
    startMonth: defaultPeriod.startMonth,
    startDay: defaultPeriod.startDay,
    endYear: defaultPeriod.endYear,
    endMonth: defaultPeriod.endMonth,
    endDay: defaultPeriod.endDay,
  }));

  const startDate = dayjs(`${periodState.startYear}-${periodState.startMonth}-${periodState.startDay}`);
  const endDate = dayjs(`${periodState.endYear}-${periodState.endMonth}-${periodState.endDay}`);

  // 기간 내 주문만 필터링
  const filteredOrders = orderTableData.filter(order => {
    const orderDate = dayjs(order.createdAt);
    return orderDate.isSameOrAfter(startDate) && orderDate.isSameOrBefore(endDate);
  });

  // status 별 카운트
  const statusList = ["주문접수", "결제완료", "배송준비중", "배송중", "배송완료"];
  const statusCounts = statusList.reduce((acc, status) => {
    acc[status] = filteredOrders.filter(order => order.status === status).length;
    return acc;
  }, {});

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 1000);
  };

  return (
    <div>
      {/* user info 박스 */}
      <div className="float-left w-[850px] px-[29px]">
        <div className="relative h-[51px] pt-2 pl-[30px] bg-[#eb6d9a]">
          <div className="relative float-left w-[34px] h-[34px] rounded-full overflow-hidden">
            <span className="absolute top-0 left-0 block overflow-hidden w-[34px] h-[34px] bg-no-repeat bg-[url('/images/mypage/order/bg_grd_01.png')]"></span>
            <Image width={34} height={34} src='/images/mypage/order/my_picture_base.jpg' alt="my_picture_base.jpg"/>
          </div>
          <p className="float-left ml-[10px] text-[18px] leading-[34px] font-bold text-white tracking-[-1px]">
            PINK OLIVE
            <strong className="inline-block ml-[3px]">박*준</strong>
            님 반갑습니다.
          </p>
          <ul className="absolute top-1/2 right-[30px] -mt-[10px]">
            <li className="inline-block pr-[15px] text-[13px] text-white font-bold bg-[url('/images/mypage/order/ico_arrow7x10_2.png')] bg-no-repeat bg-[length:5px_10px] bg-[position:100%_50%] cursor-pointer">올리브 멤버스 라운지</li>
            <li className="inline-block pr-[15px] ml-[30px] text-[13px] text-white font-bold bg-[url('/images/mypage/order/ico_arrow7x10_2.png')] bg-no-repeat bg-[length:5px_10px] bg-[position:100%_50%] cursor-pointer">나의 프로필</li>
          </ul>
        </div>
        <div className="py-[19px] border border-t-0 border-[#cccccc]">
          <ul className="flex">
            <li className="float-left w-1/3 text-center">
              <span className="text-[13px] font-bold text-[#555]" >CJ ONE 포인트</span>
              <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
                {(1500).toLocaleString()}
                <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">P</em>
              </p>
            </li>
            <li className="float-left w-1/3 text-center">
              <span className="text-[13px] font-bold text-[#555]" >쿠폰</span>
              <Link href="/mypage/coupon" onClick={e => handleMenuClick(e, href)} className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
                3
                <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">개</em>
              </Link>
            </li>
            <li className="float-left w-1/3 text-center">
              <span className="text-[13px] font-bold text-[#555]" >예치금</span>
              <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
                0
                <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">원</em>
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* 주문 배송 조회 */}
      <div className="float-left w-[850px] px-[29px] pb-[40px]">
        <div className="overflow-hidden mt-[35px] relative w-full">
          <h2 className="text-[#333333] text-[20px] leading-[30px] font-bold">주문/배송 조회
            <em className="inline-block ml-[5px] font-bold text-[12px] leading-[18px] not-italic">(최근 1개월)</em>
          </h2>
          <Link href="/mypage/order" className="absolute top-[5px] right-[0px] font-normal pr-[15px] text-[#666] text-[14px] leading-[20px] align-top cursor-pointer bg-[url('/images/mypage/home/ico_arrow7x10.png')] bg-no-repeat bg-[position:100%_50%]">더보기</Link>
        </div>
        <ul className="overflow-hidden w-full mt-[10px] rounded-[10px] bg-[#f5f5f5]">
          {statusList.map((status, idx) => {
            const count = statusCounts[status] || 0;
            return (
              <li
                key={status}
                className={
                  "float-left relative w-1/5 h-[117px]" +
                  (idx !== 0 ? " bg-[url('/images/mypage/order/ico_arrow11x21.png')] bg-no-repeat bg-[position:0%_50%]" : "")
                }
              >
                <em
                  className={
                    "block absolute left-0 w-full text-center align-top top-[25px] not-italic text-[40px] leading-[50px] font-medium " +
                    (count !== 0 ? "text-[#9bce26]" : "text-[#888888]")
                  }
                >
                  {count}
                </em>
                <span className="block absolute left-0 w-full text-center align-top top-[70px] text-[#666666] text-[16px] leading-[22px]">
                  {status}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="pt-[25px] pb-[7px] mt-[15px] overflow-hidden relative w-full border-b border-[#666]">
          <h2 className="float-left text-[#333] text-[20px] leading-[30px] font-bold">좋아요</h2>
          <p className="absolute right-[0px] bottom-[10px] pr-[15px] text-[#666] font-normal text-[14px] leading-[20px] align-top cursor-pointer bg-[url('/images/mypage/home/ico_arrow7x10.png')] bg-no-repeat bg-[position:100%_50%]">더보기</p>
        </div>
        <div>
          <ul className="border-b border-[#ddd]">
            <li className="w-full px-[15px] pt-[200px] pb-[80px] bg-[url('/images/mypage/order/ico_nodata104x104.png')] bg-no-repeat bg-[center_80px] text-[#888] text-[16px] text-center leading-[20px]">좋아요 상품이 없습니다</li>
          </ul>
        </div>

        <div className="overflow-hidden relative w-full flex flex-row gap-[20px]">
          <div className="w-[380px]">
            <div className="pt-[25px] overflow-hidden w-full pb-[7px] border-b border-[#666] flex items-center justify-between">
              <h2 className="text-[#333] text-[20px] leading-[30px] font-bold">1 : 1 문의내역</h2>
              <p className="text-[#666] pr-[15px] font-normal text-[14px] leading-[20px] align-top cursor-pointer bg-[url('/images/mypage/home/ico_arrow7x10.png')] bg-no-repeat bg-[position:100%_50%]">더보기</p>
            </div>
            <div className="w-full mx-auto">
              <ul>
                <li className="pt-[80px] pb-[80px] border-b border-[#e6e6e6] text-[#888] text-[16px] text-center leading-[20px]">최근 1개월간 문의하신 내용이 없습니다.</li>
              </ul>
            </div>
          </div>
          <div className="w-[380px]">
            <div className="pt-[25px] pb-[7px] border-b border-[#666] flex items-center justify-between">
              <h2 className="text-[#333] text-[20px] leading-[30px] font-bold">상품Q&A내역</h2>
              <p className="text-[#666] pr-[15px] font-normal text-[14px] leading-[20px] align-top cursor-pointer bg-[url('/images/mypage/home/ico_arrow7x10.png')] bg-no-repeat bg-[position:100%_50%]">더보기</p>
            </div>
            <div className="w-full mx-auto">
              <ul>
                <li className="pt-[80px] pb-[80px] border-b border-[#e6e6e6] text-[#888] text-[16px] text-center leading-[20px]">최근 1개월간 문의하신 내용이 없습니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}