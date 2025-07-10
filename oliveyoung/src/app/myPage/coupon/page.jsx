'use client';

import Image from 'next/image';
import Link from 'next/link';
import { couponTableData } from './data/couponTableData';

export default function Coupon() {
  const handleMenuClick = (e, href) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 1000);
  };

  return (
    <div>
      {/* user info 박스 */}
      <div className="overflow-hidden w-full min-w-[1020px]">
        <div className="float-left w-[850px] px-[29px]">
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
                <span className="text-[13px] font-bold text-[#555]">CJ ONE 포인트</span>
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
                  onClick={(e) => handleMenuClick(e, href)}
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
      </div>

      {/* 쿠폰 */}
      <div className="float-left w-[850px] min-h-[640px] px-[29px] pb-[40px] bg-[#fff]">
        <div className="pt-[25px] overflow-hidden relative w-full pb-[7px]">
          <h2 className="float-left text-[#333] text-[20px] leading-[30px] font-bold">쿠폰</h2>
        </div>
        <ul className="overflow-hidden w-full h-[80px] py-[20px] bg-white rounded-[5px] border border-[#696969]">
          <li className="overflow-hidden float-left w-1/2 px-[20px]">
            <p className="float-left text-[#3e3e3e] text-[14px] leading-[20px]">
              쿠폰존에서 다운받을 수 있는
              <br />
              쿠폰을 한눈에 확인하세요.
            </p>
            <Link
              href="/order/coupon"
              onClick={(e) => handleMenuClick(e, href)}
              className="float-right w-[130px] h-[30px] mt-[5px] pt-[6px] pl-[13px] rounded-[4px] bg-[#ebebeb] bg-[url('/images/mypage/coupon/arrow_12_21_02.png')] bg-no-repeat bg-[length:7px_11px] bg-[position:113px_50%] text-[#202020] text-left text-[14px] leading-[20px]"
            >
              쿠폰 존 바로가기
            </Link>
          </li>
          <li className="overflow-hidden float-left w-1/2 px-[20px] border-l border-[#d6d6d6]">
            <p className="float-left text-[#3e3e3e] text-[14px] leading-[20px]">
              보유하고 계시는
              <br />
              쿠폰번호를 등록하세요.
            </p>
            <Link
              href=""
              className="float-right w-[130px] h-[30px] mt-[5px] pt-[6px] pl-[13px] rounded-[4px] bg-[#ebebeb] bg-[url('/images/mypage/coupon/arrow_12_21_02.png')] bg-no-repeat bg-[length:7px_11px] bg-[position:113px_50%] text-[#202020] text-left text-[14px] leading-[20px]"
            >
              쿠폰 등록하기
            </Link>
          </li>
        </ul>

        <div className="block">
          <div className="overflow-hidden relative w-full">
            <button
              type="button"
              className="float-right w-auto my-[18px] mb-[6px] pr-[19px] bg-[url('/images/mypage/coupon/ico_coupon14x14.png')] bg-no-repeat bg-[position:99%_50%] text-[#888] text-[12px] leading-[18px] text-center font-medium cursor-pointer"
            >
              쿠폰안내
            </button>
          </div>
        </div>

        <table className="table-fixed w-full border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#e6e6e6]">
          <colgroup>
            <col className="w-1/4" />
            <col className="w-[45%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr>
              <th className="pt-[11px] pb-[10px] bg-[#fafafa] text-[#666] text-[14px] leading-[18px]">
                혜택
              </th>
              <th className="pt-[11px] pb-[10px] bg-[#fafafa] text-[#666] text-[14px] leading-[18px]">
                쿠폰명
              </th>
              <th className="pt-[11px] pb-[10px] bg-[#fafafa] text-[#666] text-[14px] leading-[18px]">
                쿠폰사용조건
              </th>
              <th className="pt-[11px] pb-[10px] bg-[#fafafa] text-[#666] text-[14px] leading-[18px]">
                사용기간
              </th>
            </tr>
          </thead>
          <tbody>
            {couponTableData.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-[5px] py-[30px] text-[#333] text-center border-t border-t-[#e6e6e6] text-[14px] leading-[18px]">
                  <span
                    className="inline-block w-[104px] h-[55px] pr-[18px] pt-[17px] text-[#222] leading-[22px] align-top indent-0 text-[18px] font-bold"
                    style={{
                      backgroundImage: `url('${coupon.bgImage}')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '0 0',
                      backgroundSize: '104px auto',
                    }}
                  >
                    {coupon.amount}
                    <em className="inline-block text-[17px] not-italic align-[1px]">
                      {coupon.unit}
                    </em>
                  </span>
                  <br />
                </td>
                <td className="pl-[20px] text-left px-[5px] py-[30px] text-[#333] text-[14px] leading-[18px] border-t border-t-[#e6e6e6]">
                  {coupon.name}
                </td>
                <td className="px-[5px] py-[30px] text-[#888] text-center border-t border-t-[#e6e6e6] text-[14px] leading-[18px]">
                  <span>{coupon.minOrder}</span>원 이상
                </td>
                <td className="px-[5px] py-[30px] text-[#888] text-center border-t border-t-[#e6e6e6] text-[14px] leading-[18px]">
                  {coupon.period.split('~')[0].trim()} <br />~{coupon.period.split('~')[1].trim()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-[15px]">
          <h2 className="hidden pt-[25px] text-[#333] text-[14px] leading-[18px]">이용안내</h2>
          <ul className="w-full">
            <li className="mt-[6px] pl-[8px] bg-[url('/images/mypage/coupon/bar_2x2.gif')] bg-no-repeat bg-[position:0_7px] text-[#888] text-[12px] leading-[18px]">
              발급받으신 CJ ONE 쿠폰을 올리브영몰(온라인)에서 사용하시는 경우 다운로드 후 주문/결제
              시 적용하실 수 있습니다.
            </li>
            <li className="mt-[6px] pl-[8px] bg-[url('/images/mypage/coupon/bar_2x2.gif')] bg-no-repeat bg-[position:0_7px] text-[#888] text-[12px] leading-[18px]">
              사용 기간이 만료되거나 사용한 쿠폰은 보유 목록에서 자동으로 삭제됩니다.
            </li>
            <li className="mt-[6px] pl-[8px] bg-[url('/images/mypage/coupon/bar_2x2.gif')] bg-no-repeat bg-[position:0_7px] text-[#888] text-[12px] leading-[18px]">
              주문/취소 시 이용기간이 남아 있는 쿠폰인 경우 재발급됩니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
