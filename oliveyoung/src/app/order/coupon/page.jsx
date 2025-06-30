import { couponListData } from "./data/couponListData";
import Image from "next/image";

export default function Coupon() {

  return (
    <div className="overflow-hidden w-full min-w-[1020px]">
      <div className="w-full h-[100px] bg-[url('/images/order/coupon/bg_coupon_top_191024.png')] bg-no-repeat bg-[position:50%_0] bg-[#e4f1fc]">
        <h1 className="w-[1020px] mx-auto pt-[30px] text-[40px] text-black leading-[40px] relative font-bold">
          올리브 멤버스 라운지 <span className="inline-block ml-[15px] text-[#333] text-[18px] font-medium">쇼핑하는 재미! 올리브영만의 더 특별한 혜택</span>
        </h1>
      </div>

      <div>
        <ul className="overflow-hidden w-[1020px] mt-[30px] mx-auto pb-[5px]">
          <li className="relative float-left w-1/2">
            <button type="button" className="w-full h-[50px] bg-[#f6f6f6] text-[#666] text-[18px] leading-[16px] font-medium text-center cursor-pointer">올리브 멤버스</button>
          </li>
          <li className="relative float-left w-1/2">
            <div className="absolute bottom-[-5px] left-1/2 w-[12px] h-[5px] -ml-[6px] bg-[url('/images/order/cart/bg_tab_arrow.png')] bg-no-repeat"/>
            <button type="button" className="w-full h-[50px] bg-[#555] text-[#fff] text-[18px] leading-[16px] font-medium text-center cursor-pointer">쿠폰/혜택</button>
          </li>
        </ul>

        <div className="block">
          <div className="w-[1020px] mx-auto h-[281px] pt-[50px] bg-[url('/images/order/coupon/bg_mem_info.png')] bg-no-repeat">
            <div className="relative w-[80px] h-[80px] mx-auto">
              <span className="absolute block overflow-hidden w-[80px] h-[80px]" />
              <Image width={80} height={80} src="/images/mypage/order/my_picture_base.jpg" alt="프로필 이미지" />
            </div>
            <p className="pt-[25px] text-[28px] text-black leading-[40px] text-center tracking-[-1px]">
              <em className="font-bold not-italic">박*준</em>님의 등급은
              <strong><span className="text-[#eb6d9a]"> PINK OLIVE</span></strong> 입니다
            </p>
          </div>
        </div>

        <div className="block w-[1020px] h-[100px] mt-[-1px] mx-auto bg-[url('/images/order/coupon/bg_coupon_enroll.png')] bg-no-repeat cursor-pointer">
          <span className="inline-block align-middle text-[#6ab9d5] text-[24px] leading-[30px] ml-[86px] pt-[44px] pl-[40px] bg-[url('/images/order/coupon/ico_plus30x30.png')] bg-no-repeat bg-[position:0_42px] font-bold">
            쿠폰 등록 <em className="inline-block align-middle text-[#888] text-[16px] not-italic ml-[20px] font-bold">발급 받으신 번호를 등록해주세요</em>
          </span>
        </div>

        <div className="relative w-[1020px] mx-auto">
          <h2 className="w-[1020px] mx-auto pt-[48px] pr-0 pb-[14px] pl-[50px] text-black text-[24px] font-bold bg-[url('/images/order/coupon/ico_member.png')] bg-no-repeat leading-[30px] bg-[position:0_42px]">올리브 멤버스 쿠폰</h2>
          <span className="absolute bottom-[20px] right-0 pr-[15px] text-[16px] text-[#888] font-bold bg-[url('/images/order/coupon/ico_arrow8x14.png')] bg-no-repeat bg-[position:100%_2px] cursor-pointer">쿠폰안내</span>
        </div>
        <ul className="overflow-hidden w-[1020px] mx-auto pt-[40px] border-t border-t-[#ddd]">
          {couponListData.map((coupon) => (
            <li
              key={coupon.id}
              className="float-left w-1/2 pb-[33px] text-center min-h-[262px]"
            >
              <div
                className="relative w-[325px] h-[172px] mx-auto pr-[55px] bg-no-repeat"
                style={{ backgroundImage: `url('${coupon.bgImage}')` }}
              >
                <div className="table-cell w-[270px] h-[172px] align-middle">
                  <span className="text-[15px] font-bold block text-[#292929]">
                    {coupon.title}
                  </span>
                  <span className="mt-[13px] text-[65px] leading-[48px] font-medium tracking-[-3.5px] block text-[#292929]">
                    <em className="text-[50px] align-[5px] font-bold not-italic">
                      {coupon.value}
                    </em>
                  </span>
                  <span className="mt-[13px] text-[13px] text-[#888] leading-[1.4] block">
                    {coupon.minOrder}
                  </span>
                  {/* 오늘드림 뱃지 */}
                  {coupon.todayDream && (
                    <span className="absolute top-[15px] left-[-36px] w-[72px] h-[72px] rounded-[36px] bg-[url('/images/order/coupon/txt_today.png')] bg-no-repeat bg-[length:42px_auto] bg-[position:50%_50%] bg-[#ff8bbc] text-transparent text-center">
                      <strong>오늘드림</strong>
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className={
                  coupon.buttonStyle === "issued"
                    ? "bg-[#bbb] w-[182px] h-[40px] mt-[11px] rounded-[5px] text-center text-[#fff]"
                    : "w-[182px] h-[40px] mt-[11px] border border-[#999] rounded-[5px]"
                }
                disabled={coupon.issued}
              >
                <span
                  className={
                    coupon.buttonStyle === "issued"
                      ? "pr-[20px] text-[14px] font-bold tracking-[-0.56px]"
                      : "pr-[20px] text-[14px] font-bold text-[#292929] tracking-[-0.56px] bg-[url('/images/order/coupon/icon_dw.png')] bg-no-repeat bg-[position:100%_50%]"
                  }
                >
                  {coupon.buttonText}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}