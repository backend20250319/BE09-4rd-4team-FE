'use client';

import userTableData from "./data/userTableData";
import { useState, useEffect } from "react";

export default function Order() {

  const user = userTableData.find(u => u.id === 1);
  const [name, setName] = useState("");

  const phoneOptions = [
    "선택", "010", "011", "016", "017", "018", "019", "02", "031", "032", "033", "041", "042", "043", "044",
    "051", "052", "053", "054", "055", "061", "062", "063", "064", "070", "080", "0130", "0303", "0502",
    "0503", "0504", "0505", "0506", "0507"
  ];

  useEffect(() => {
    if (user) setName(user.name);
  }, [user])

  return(
    <div className="overflow-hidden w-full min-w-[1020px]">
      <div className="w-[1020px] h-full mx-auto">

          <div className="overflow-hidden h-[140px] rounded-[5px]">
            {/* title box */}
            <div className="absolute w-full h-[140px] left-1/2 -translate-x-1/2 bg-[url('/images/order/cart/bg_order_top.png')] bg-no-repeat bg-center bg-[#ffeeda]" />
            <h1 className="float-left pt-[37px] pb-0 pr-0 text-[40px] text-black leading-[40px] relative font-bold">
              주문/결제
            </h1>
            <ul className="float-right relative">
              <li className="text-[#8b8176] float-left h-[120px] px-[30px] pl-[20px] leading-[120px] text-center text-[24px] whitespace-nowrap bg-[url('/images/order/cart/bg_step.png')] bg-[position:100%_50%] bg-no-repeat">
                <span className="text-[#8b8176] inline-block mr-[5px] text-[20px] align-top tracking-[-0.02em] font-medium">01</span>장바구니
              </li>
              <li className="float-left h-[120px] px-[30px] pl-[20px] leading-[120px] text-center text-[24px] text-[#000] whitespace-nowrap bg-[url('/images/order/cart/bg_step_on.png')] bg-[position:100%_50%] bg-no-repeat">
                <span className="inline-block mr-[5px] text-[20px] text-[#333] align-top tracking-[-0.02em] font-medium">02</span>주문/결제
              </li>
              <li className="float-left h-[120px] px-[30px] pl-[20px] leading-[120px] text-center text-[24px] text-[#8b8176] whitespace-nowrap">
                <span className="inline-block mr-[5px] text-[20px] text-[#8b8176] align-top tracking-[-0.02em] font-medium">03</span>주문완료
              </li>
            </ul>
          <div className="absolute block w-[1020px] h-[20px] mt-[110px] bg-[url('/images/order/cart/bg_line.gif')] bg-no-repeat bg-[length:auto] bg-[position:50%_10px] bg-white" />
        </div>

        <form>
          <div className="flex items-center w-full max-w-[1020px] mx-auto mt-[40px] mb-[12px]">
            <h2 className="text-[#333] text-[20px] font-medium flex-1">배송지정보</h2>
            <span className="text-[12px] text-[#888] whitespace-nowrap leading-[20px] flex items-center">
              <input id="setBaseDiv" type="checkbox" checked={true} readOnly className="w-[12px] h-[12px] mr-[5px] align-middle cursor-pointer"/>
              <label htmlFor="setBaseDiv"  className="text-[#333] text-[12px] cursor-pointer">기본 배송지 설정</label>
            </span>
          </div>


          <table className="w-full ">
            <tbody className="text-[#666] text-[14px] leading-[20px] tracking-[-0.04em] [word-spacing:-1px]">
              {/* 배송지 선택 */}
              <tr>
                <th className="border-t-[2px] border-t-[#d6d6d6] bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">배송지선택</th>
                <td className="border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#e6e6e6] pl-[36px] pr-[20px] py-[15px] text-[14px] text-[#222] leading-[28px]">
                  <span className="inline-block leading-[20px] text-[12px] text-[#222] whitespace-nowrap">
                    <input type="radio" id="divpExist1" className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle text-[#888]" checked={true} readOnly />
                    <label htmlFor="divpExist1" className="text-[#333] cursor-pointer">기존 배송지</label>
                  </span>
                  <span className="inline-block leading-[20px] ml-[20px] text-[12px] text-[#222] whitespace-nowrap">
                    <input type="radio" id="divpExist2" className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle text-[#888]" checked={false} readOnly />
                    <label htmlFor="divpExist2" className="text-[#333] cursor-pointer">신규 배송지</label>
                  </span>
                  <div>
                    <select className="w-[200px] bg-white h-[28px] pr-[5px] text-[12px] border border-[#d0d0d0] rounded-[5px] leading-[18px] text-[#333]">
                      <option>플레이데이터</option>
                    </select>
                  </div>
                </td>
              </tr>

              {/* 베송지명 */}
              <tr className="table-row">
                <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">배송지명</th>
                <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">플레이데이터</td>
              </tr>

              {/* 받는분 */}
              <tr className="table-row">
                <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">받는분</th>
                <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                  <input className="w-[200px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] rounded-[5px]" value={name} onChange={e => setName(e.target.value)} />
                  <span className="inline-block leading-[20px] ml-[20px] text-[12px] whitespace-nowrap relative">
                    <input type="checkbox" id="copyToDivp" className="w-[12px] h-[12px] mt-[-2px] mr-[5px] align-middle" />
                    <label htmlFor="copyToDivp" className="text-[#333] cursor-pointer">주문자정보와 동일</label>
                  </span>
                </td>  
              </tr>

              {/* 연락처1 */}
              <tr className="table-row">
                <th className="pt-[15px] px-[20px] pb-[5px] border-b border-b-[#e6e6e6] bg-[#f4f4f4] text-left text-[#222]">연락처1</th>
                <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                  <select className="w-[90px] bg-white h-[28px] pl-[5px] text-[12px] border border-[#d0d0d0] rounded-[5px] leading-[18px] text-[#333]">
                    {phoneOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select> - 
                  <input type="text" className="ml-[1px] w-[90px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[-0.04em] rounded-[5px]" />
                  -
                  <input type="text" className="ml-[1px] w-[90px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[-0.04em] rounded-[5px]" />
                  <span className="mt-[5px] text-[14px] text-[#222] leading-[28px]">
                    <p className="w-[18px] h-[18px] bg-[url('/images/order/order/icon_01.png')] bg-no-repeat mr-[5px] mb-[3px] inline-block align-middle" />
                    <p className="text-[#777] text-[12px] font-medium inline-block leading-[20px] ml-[20px] whitespace-nowrap relative text-center cursor-pointer">
                      안심번호 서비스 안내
                    </p>
                    <p className=""></p>
                  </span>
                </td>
              </tr>

              {/* 연락처2 */}
              <tr className="table-row">
                <th className="pt-[15px] px-[20px] pb-[5px] border-b border-b-[#e6e6e6] bg-[#f4f4f4] text-left text-[#222]">연락처1</th>
                <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                  <select className="w-[90px] bg-white h-[28px] pl-[5px] text-[12px] border border-[#d0d0d0] rounded-[5px] leading-[18px] text-[#333]">
                    {phoneOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select> - 
                  <input type="text" className="ml-[1px] w-[90px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[-0.04em] rounded-[5px]" />
                  -
                  <input type="text" className="ml-[1px] w-[90px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[-0.04em] rounded-[5px]" />
                </td>
              </tr>



              {/* 주소 */}


            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}