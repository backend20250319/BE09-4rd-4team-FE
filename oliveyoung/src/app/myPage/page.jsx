'use client';

import { orderTableData } from "./order/data/orderTableData";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserInfoBox from "./user/components/UserInfoBox";

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
      <UserInfoBox />

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