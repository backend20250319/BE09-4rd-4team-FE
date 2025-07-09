"use client";

import Image from "next/image";
import Link from "next/link";
import ReviewWriteSection from "./pages/guide/ReviewWriteSection";
import MyPageLayout from "../mypage/layout"; // 실제 경로 맞게 조정

export default function Main() {
  const handleMenuClick = (e, href) => {
    e.preventDefault();
    // 라우팅 처리 필요 시 여기에 추가
  };

  return (
    <MyPageLayout>
      {/* 유저 정보 박스 */}
      <div className="float-left w-[850px] px-[29px] mb-6">
        <div className="relative h-[51px] pt-2 pl-[30px] bg-[#eb6d9a]">
          <div className="relative float-left w-[34px] h-[34px] rounded-full overflow-hidden">
            <span className="absolute top-0 left-0 block w-[34px] h-[34px] bg-no-repeat bg-[url('/images/mypage/order/bg_grd_01.png')]" />
            <Image
              width={34}
              height={34}
              src="/images/mypage/order/my_picture_base.jpg"
              alt="my_picture_base.jpg"
            />
          </div>
          <p className="float-left ml-[10px] text-[18px] leading-[34px] font-bold text-white tracking-[-1px]">
            PINK OLIVE
            <strong className="inline-block ml-[3px]">박*준</strong> 님
            반갑습니다.
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
                {(1500).toLocaleString()}
                <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">
                  P
                </em>
              </p>
            </li>
            <li className="float-left w-1/3 text-center">
              <span className="text-[13px] font-bold text-[#555]">쿠폰</span>
              <Link
                href="/mypage/coupon"
                onClick={(e) => handleMenuClick(e, "/mypage/coupon")}
                className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer"
              >
                3
                <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">
                  개
                </em>
              </Link>
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
      </div>
      {/* 리뷰 작성 섹션 */}
      <div className="max-w-4xl mx-auto py-10">
        <ReviewWriteSection />
      </div>
    </MyPageLayout>
  );
}
