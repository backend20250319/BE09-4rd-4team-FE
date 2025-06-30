'use client';

import cartTableData from "./data/cartTableData"
import Image from "next/image";
import Link from "next/link";

export default function Cart() {

  const itemCount = cartTableData.length;

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 1000);
  };

  return(
    <div className="overflow-hidden w-full min-w-[1020px]">
      <div className="w-[1020px] h-full mx-auto">

        <div className="overflow-hidden h-[140px] rounded-[5px]">
          {/* title box */}
          <div className="absolute w-full h-[140px] left-1/2 -translate-x-1/2 bg-[url('/images/order/cart/bg_order_top.png')] bg-no-repeat bg-center bg-[#ffeeda]" />
          <h1 className="float-left pt-[37px] pb-0 pr-0 text-[40px] text-black leading-[40px] relative font-bold">
            장바구니 
            {itemCount > 0 && (
              <span className="inline-block ml-[10px] w-[36px] h-[36px] leading-[36px] text-[16px] text-white bg-[#ff2828] rounded-full text-center align-[10px]">
                {itemCount}
              </span>
            )}
          </h1>
          <ul className="float-right relative">
            <li className="text-[#000] float-left h-[120px] px-[30px] pl-[20px] leading-[120px] text-center text-[24px] whitespace-nowrap bg-[url('/images/order/cart/bg_step_on.png')] bg-[position:100%_50%] bg-no-repeat">
              <span className="text-[#333] inline-block mr-[5px] text-[20px] align-top tracking-[-0.02em] font-medium">01</span>장바구니
            </li>
            <li className="float-left h-[120px] px-[30px] pl-[20px] leading-[120px] text-center text-[24px] text-[#8b8176] whitespace-nowrap bg-[url('/images/order/cart/bg_step.png')] bg-[position:100%_50%] bg-no-repeat">
              <span className="inline-block mr-[5px] text-[20px] text-[#8b8176] align-top tracking-[-0.02em] font-medium">02</span>주문/결제
            </li>
            <li className="float-left h-[120px] px-[30px] pl-[20px] leading-[120px] text-center text-[24px] text-[#8b8176] whitespace-nowrap">
              <span className="inline-block mr-[5px] text-[20px] text-[#8b8176] align-top tracking-[-0.02em] font-medium">03</span>주문완료
            </li>
          </ul>
          <div className="absolute block w-[1020px] h-[20px] mt-[110px] bg-[url('/images/order/cart/bg_line.gif')] bg-no-repeat bg-[length:auto] bg-[position:50%_10px] bg-white" />
        </div>

        {/* membership box */}
        <div className="overflow-hidden h-[103px] pt-[9px] pb-[25px] border-b border-[#e6e6e6]">
          <p className="float-left w-[338px] pt-[6px] px-[30px] text-[20px] text-[#222] leading-[28px]">
            박*준님의 멤버십 등급은 
            <span className="text-[#eb6d9a] font-medium"> PINK OLIVE</span>입니다
          </p>
          <ul className="float-left overflow-hidden ml-[50px]">
            <li className="w-[120px] float-left h-[68px] text-center text-[#222] flex flex-col items-center justify-center">
              <Image width={42} height={42} className="inline-block text-[12px]" src='/images/order/cart/icon_rating_pink_on.svg' alt="icon_rating_pink_on.svg" />
              <span className="inline-block text-[12px] pr-[13px] font-bold mt-1 bg-[url('/images/order/cart/ico_arrow6x11.png')] bg-no-repeat bg-[position:100%_4px] cursor-pointer">등급혜택</span>
            </li>
            <li className="pt-[10px] border-l border-[#e6e6e6] text-[#333] text-[14px] float-left w-[170px] h-[68px] text-center cursor-pointer">
              <strong className="block mb-[8px]" >
                <span className="font-bold tracking-[-0.02em]">CJ ONE </span>포인트
              </strong>
              <span className="block text-[12px]">
                <span className="mr-[2px] text-[18px] text-[#f27370] align-[-1px] tracking-[-0.02em] font-medium">{(1500).toLocaleString()}</span>P
              </span>
            </li>
            <li className="pt-[10px] border-l border-[#e6e6e6] text-[#333] text-[14px] float-left w-[170px] h-[68px] text-center cursor-pointer">
              <Link href="/order/coupon" onClick={e => handleMenuClick(e, href)}>
                <strong className="block mb-[8px]" >할인쿠폰</strong>
                <span className="block text-[12px]">
                  <span className="mr-[2px] text-[18px] text-[#f27370] align-[-1px] tracking-[-0.02em] font-medium">3</span>개
                </span>
              </Link>
            </li>
            <li className="pt-[10px] border-l border-[#e6e6e6] text-[#333] text-[14px] float-left w-[170px] h-[68px] text-center cursor-pointer">
              <strong className="block mb-[8px]" >예치금</strong>
              <span className="block text-[12px]">
                <span className="mr-[2px] text-[18px] text-[#f27370] align-[-1px] tracking-[-0.02em] font-medium">0</span>원
              </span>
            </li>
          </ul>
        </div>

        {/* 일반 배송 탭 */}
        <ul className="overflow-hidden w-[1020px] mx-auto mt-[30px] pb-[5px]">
          <li className="relative float-left w-1/2">
            <div className="absolute bottom-[-5px] left-1/2 w-[12px] h-[5px] -ml-[6px] bg-[url('/images/order/cart/bg_tab_arrow.png')] bg-no-repeat"/>
            <button type="button" className="text-white bg-[#555] w-full h-[50px] text-[18px] font-medium leading-[24px]">
              일반 배송 ({itemCount})
            </button>
          </li>
          <li className="relative float-left w-1/2">
            <button className="w-full h-[50px] bg-[#f6f6f6] text-[#666] text-[18px] leading-[24px] font-normal text-center cursor-pointer">오늘 드림 & 픽업 (0)</button>
          </li>
        </ul>

        <h2 className="w-[1020px] mx-auto mt-[40px] mb-[12px] text-[#333] text-[20px] font-normal">
          {itemCount > 0 ? '올리브영 배송상품' : null}
        </h2>

        <table className="w-full">
          <colgroup>
            <col className="w-[40px]"/>
            <col className=""/>
            <col className="w-[110px]"/>
            <col className="w-[100px]"/>
            <col className="w-[110px]"/>
            <col className="w-[120px]"/>
            <col className="w-[150px]"/>
          </colgroup>
          <thead>
            <tr className="text-[#666] text-[14px] leading-[20px] tracking-[-0.04em]">
              <th scope="col" className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">
                <input type="checkbox" className="w-[12px] h-[12px] mx-auto bg-[url('/images/')] bg-[position:0_-20px] bg-transparent cursor-pointer"/>
              </th>
              <th scope="col" className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">상품정보</th>
              <th scope="col" className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">판매가</th>
              <th scope="col" className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">수량</th>
              <th scope="col" className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">구매가</th>
              <th scope="col" className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">선택</th>
              <th scope="col" className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">배송정보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="border-b border-b-[#e6e6e6] text-center">
                <div className="table-row">
                  <div className="w-[40px] table-cell align-middle">
                    <input type="checkbox" className = "w-[12px] h-[12px] mx-auto bg-transparent align-middle cursor-pointer"></input>
                  </div>
                  <div className="w-[390px] table-cell align-middle">
                    <Link href="" className="table-cell relative h-[145ox] pt-[30px] pr-[30px] pb-[30px] pl-[125px] text-left align-midddle cursor-pointer">
                      <Image width={85} height={85} src="/images/order/coupon/sampleProduct2.jpg" alt="토리든 세럼"/>
                    </Link>
                    <Link href="" className="inline-block mb-[5px] text-[#666]">
                      <span className="block mb-[4px] text-[#777] text-bold"></span>
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}