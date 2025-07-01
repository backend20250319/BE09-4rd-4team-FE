"use client";

import Image from "next/image";
import TabNav from "../components/TabNav";

export default function GetRfdActListPage() {
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
      </div>

      {/* 배송지 내용 */}
      <div>
        <h2 className="text-xl h-[30px] font-bold mt-[30px] mb-[7px]">
          배송지/환불계좌
        </h2>
      </div>

      <TabNav />

      {/* 환불계좌 테이블 */}
      <div className="mt-8 border-t border-[#999]">
        <table className="w-full border-collapse text-center text-[13px] text-[#333]">
          <thead className="h-[39px] text-[13px] font-bold border-b border-b-[rgb(230, 230, 230)] border-t-[2px] border-t-[rgb(214,214,214)] bg-[rgb(250,250,250)] py-2 mt-[10px]">
            <tr className="text-[14px] text-[#666666]">
              <th className="w-[15%]">은행</th>
              <th className="w-[65%]">계좌번호</th>
              <th className="w-[20%]">관리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="3"
                className="
                    text-center
                    text-[16px]
                    text-[#888]
                    leading-[20px]
                    border-t
                    border-[#e6e6e6]
                    px-[15px]
                    pt-[200px]
                    pb-[80px]
                    bg-no-repeat
                    bg-[position:center_80px]
                    bg-[url('https://static.oliveyoung.co.kr/pc-static-root/image/comm/ico_nodata104x104.png')]"
              >
                등록된 계좌 정보가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>

        {/* 하단 버튼 */}
        <div className="mt-6 text-center">
          <button className="px-8 py-2 bg-[#9bce26] text-white font-bold text-[15px] rounded cursor-pointer hover:bg-[#89b823] transition">
            환불계좌 등록
          </button>
        </div>

        {/* 안내 문구 */}
        <ul className="mt-4 text-[12px] text-[#666] leading-[20px] list-disc list-inside">
          <li>
            계좌를 변경하시려면 기존 계좌를 삭제한 후 새로 등록해 주시기
            바랍니다.
          </li>
          <li>
            결제취소에 대해 현금으로 환불 받아야 하는 경우 등록하신 계좌로
            환불되오니 정확히 기입해 주시기 바랍니다.
          </li>
          <li>본인 명의 계좌만 등록 가능합니다.</li>
          <li>
            환불 처리를 위해 계좌정보를 수집하며, 관련 법령에 따라 5년간
            보관합니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
