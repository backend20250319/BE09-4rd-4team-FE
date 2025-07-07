'use client';

import cartTableData from "../cart/data/cartTableData"
import userTableData from "./data/userTableData";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Order() {

  const user = userTableData.find(u => u.id === 1);
  const [name, setName] = useState(user.name);
  const [phonePart1, setPhonePart1] = useState(user.phone.split('-')[0]);
  const [phonePart2, setPhonePart2] = useState(user.phone.split('-')[1]);
  const [phonePart3, setPhonePart3] = useState(user.phone.split('-')[2]);
  const [isCopyChecked, setIsCopyChecked] = useState(false);

  const handleCopyToDivp = (e) => {
    const checked = e.target.checked;
    setIsCopyChecked(checked);

    if (checked) {
      setName(user.name);
      setPhonePart1(user.phone.split('-')[0]);
      setPhonePart2(user.phone.split('-')[1]);
      setPhonePart3(user.phone.split('-')[2]);
    }
  };

  const phoneOptions = [
    "선택", "010", "011", "016", "017", "018", "019", "02", "031", "032", "033", "041", "042", "043", "044",
    "051", "052", "053", "054", "055", "061", "062", "063", "064", "070", "080", "0130", "0303", "0502",
    "0503", "0504", "0505", "0506", "0507"
  ];

  const cardOptions = [
    "카드를 선택해주세요", "KB카드", "하나(외한)카드", "삼성카드", "신한카드", "롯데카드", "BC카드", "현대카드", "NH카드",
    "우리카드", "카카오뱅크", "씨티카드", "광주비자", "전북카드", "신협카드", "수협카드", "제주카드"
  ];

  const payOptions = [
    "일시불", "2개월", "3개월", "4개월", "5개월", "6개월", "7개월", "8개월", "9개월", "10개월", "11개월", "12개월"
  ]

  // 선택된 출입방법을 state로 관리
  const [doorType, setDoorType] = useState("password");

  const [products] = useState(cartTableData);

  const totalPrice = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

  const [jibunAddress, setJibunAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    async function fetchJibun() {
      if (!user.address) return;

      // Step1: 도로명주소 → 좌표 변환
      const res1 = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(user.address)}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );
      const data1 = await res1.json();
      if (!data1.documents || data1.documents.length === 0) return;

       // 도로명주소 우편번호 추출
      if (
        data1.documents[0].road_address &&
        data1.documents[0].road_address.zone_no
      ) {
        setPostalCode(data1.documents[0].road_address.zone_no);
      } else {
        setPostalCode("");
      }

      const { x, y } = data1.documents[0].address;

      // Step2: 좌표 → 지번주소 변환
      const res2 = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );
      const data2 = await res2.json();
      if (
        data2.documents &&
        data2.documents[0] &&
        data2.documents[0].address
      ) {
        setJibunAddress(data2.documents[0].address.address_name);
      }
    }
    fetchJibun();
  }, [user.address]);

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

          {/* 배송지 정보 */}
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
                    <input type="checkbox" id="copyToDivp" checked={isCopyChecked} onChange={handleCopyToDivp}
                      className="w-[12px] h-[12px] mt-[-2px] mr-[5px] align-middle" />
                    <label htmlFor="copyToDivp" className="text-[#333] cursor-pointer">주문자정보와 동일</label>
                  </span>
                </td>  
              </tr>

              {/* 연락처 */}
              <tr className="table-row">
                <th className="pt-[15px] px-[20px] pb-[5px] bg-[#f4f4f4] text-left text-[#222]">연락처1</th>
                <td className="pl-[36px] pt-[15px] pb-[5px] px-[20px] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                  <select value={phonePart1} onChange={e => setPhonePart1(e.target.value)} className="w-[90px] bg-white h-[28px] pl-[5px] text-[12px] border border-[#d0d0d0] rounded-[5px] leading-[18px] text-[#333]">
                    {phoneOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select> - 
                  <input type="text" value={phonePart2} onChange={e => setPhonePart2(e.target.value)}
                    className="ml-[1px] w-[90px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[-0.04em] rounded-[5px]" />
                  -
                  <input type="text" value={phonePart3} onChange={e => setPhonePart3(e.target.value)}
                    className="ml-[1px] w-[90px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[-0.04em] rounded-[5px]" />
                  <span className="mt-[5px] text-[14px] text-[#222] leading-[28px]">
                    <span className="text-[#777] text-[12px] font-normal inline-block leading-[20px] ml-[20px] whitespace-nowrap relative text-center cursor-pointer">
                      <p className="w-[18px] h-[18px] bg-[url('/images/order/order/icon_01.png')] bg-no-repeat mr-[5px] mb-[3px] inline-block align-middle" />
                      안심번호 서비스 안내
                      <p className="w-[4px] h-[5px] bg-[url('/images/order/order/icon_02.png')] bg-no-repeat ml-[5px] mb-[3px] inline-block align-middle" />
                    </span>
                  </span>
                </td>
              </tr>
              <tr className="table-row">
                <th className="pt-[5px] px-[20px] pb-[10px] border-b border-b-[#e6e6e6] bg-[#f4f4f4] text-left text-[#222]">연락처2</th>
                <td className="pl-[36px] pt-[5px] pb-[10px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">
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
              <tr className="table-row">
                <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">주소</th>
                <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">
                  <input type="text" className="w-[90px] bg-[#f8f8f8] text-[#888] h-[28px] px-[10px] text-[12px] leading-[20px] border border-[#d0d0d0] rounded-[5px]" value={postalCode} readOnly />
                  <button type="button" className="w-[100px] border border-[#9bce26] text-[#9bce26] bg-white h-[28px] px-[5px] text-[12px] leading-[28px] rounded-[5px] font-bold ml-[2px]">우편번호 찾기</button>
                  <div className="w-[500px] min-h-[28px] my-[6px] py-[5px] px-[10px] border border-[#ccc] bg-[#f8f8f8] rounded-[5px] text-[12px] leading-[20px]">
                    <p>
                      <span>도로명</span> :
                      <span>{user.address}</span>
                    </p>
                    <p className="text-[#888]">
                      <span className="mr-[-11px] tracking-[11px]">지번</span> :
                      <span>{jibunAddress}</span>
                    </p>
                  </div>
                  <input type="text" className="w-[500px] h-[28px] px-[10px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[0.5px] rounded-[5px]"/>
                </td>
              </tr>
            </tbody>
          </table>

        {/* 배송 요청사항 */}
        <div>
          <div className="relative w-full">
            <h2 className="w-[1020px] mt-[40px] mx-auto mb-[12px] text-[#333] text-[20px] font-medium">배송 요청사항</h2>
            <table className="w-full">
              <colgroup>
                <col className="w-[170px]" />
                <col />
              </colgroup>
              <tbody className="text-[14px]">
                <tr>
                  <th className="border-t-[2px] border-t-[#d6d6d6] bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">배송 메시지</th>
                  <td className="border-t-[2px] border-t-[#d6d6d6] pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">
                    <select className="w-[350px] bg-white h-[28px] pl-[5px] text-[12px] border border-[#d0d0d0] rounded-[5px] leading-[18px] text-[#333] align-top">
                      <option>배송메시지를 선택해주세요.</option>
                      <option>그냥 문 앞에 놓아주시면 돼요.</option>
                      <option>도착 후 전화주시면 직접 받으러 갈게요.</option>
                      <option>벨을 누르지 말아주세요.</option>
                      <option>직접 받을게요. (부재 시 문앞)</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">공동현관 출입방법</th>
                  <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                    <span className="inline-block leading-[20px] text-[12px] whitespace-nowrap relative ">
                      <input type="radio" id="btnDoor1" name="doorType" className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle" checked={doorType === "password"} onChange={() => setDoorType("password")} />
                      <label htmlFor="btnDoor1" className="text-[#333] cursor-pointer">비밀번호</label>
                    </span>
                    <span className="inline-block leading-[20px] ml-[20px] text-[12px] whitespace-nowrap relative ">
                      <input type="radio" id="btnDoor2" name="doorType" className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle" checked={doorType === "guard"} onChange={() => setDoorType("guard")} />
                      <label htmlFor="btnDoor2" className="text-[#333] cursor-pointer">경비실 호출</label>
                    </span>
                    <span className="inline-block leading-[20px] ml-[20px] text-[12px] whitespace-nowrap relative ">
                      <input type="radio" id="btnDoor3" name="doorType" className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle" checked={doorType === "free"} onChange={() => setDoorType("free")} />
                      <label htmlFor="btnDoor3" className="text-[#333] cursor-pointer">자유출입가능</label>
                    </span>
                    <span className="inline-block leading-[20px] ml-[20px] text-[12px] whitespace-nowrap relative ">
                      <input type="radio" id="btnDoor4" name="doorType" className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle" checked={doorType === "etc"} onChange={() => setDoorType("etc")} />
                      <label htmlFor="btnDoor4" className="text-[#333] cursor-pointer">기타사항</label>
                    </span>
                  </td>
                </tr>

                {doorType === "password" && (
                  <tr>
                    <th className="pt-[20px] align-top bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">공동현관 비밀번호</th>
                    <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                      <input type="text" id="doorType" className="w-[500px] h-[28px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[0.5px] align-top" />
                      <p className="mt-[6px] text-[11px] leading-[13px]">
                        상품이 반송되지 않도록 <span className="text-[#ff5753] text-[11px] leading-[13px]">공동현관 정보</span>를 꼭 확인해주세요!
                      </p>
                    </td>
                  </tr>
                )}
                {doorType === "guard" && (
                  <tr>
                    <th className="pt-[20px] align-top bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">경비실 호출 방법</th>
                    <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                      <input type="text" id="doorType" className="w-[500px] h-[28px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[0.5px] align-top" />
                    </td>
                  </tr>
                )}
                {doorType === "etc" && (
                  <tr>
                    <th className="pt-[20px] align-top bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">기타 상세 내용</th>
                    <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px] bg-[url('/images/order/order/ico_star6x5.png')] bg-[position:20px_25px] bg-no-repeat">
                      <input type="text" id="doorType" className="w-[500px] h-[28px] text-[12px] text-[#333] bg-white leading-[20px] border border-[#d0d0d0] tracking-[0.5px] align-top" />
                    </td>
                  </tr>
                )}

                <tr>
                  <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[#222] border-b border-b-[#e6e6e6]">출입정보 저장</th>
                    <td className="pl-[36px] py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">
                      <ul>
                        <li>배송 관련 정보 수정 시, 기존 배송지 정보에 반영됩니다.</li>
                      </ul>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="w-[1020px] mt-[40px] mx-auto mb-[12px] text-[#333] text-[20px] font-medium">올리브영 배송상품</h2>
        <table className="w-full">
          <colgroup>
            <col />
            <col className="w-[110px]" />
            <col className="w-[100px]" />
            <col className="w-[110px]" />
          </colgroup>
          <thead>
            <tr>
              <th className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">상품정보</th>
              <th className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">판매가</th>
              <th className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">수량</th>
              <th className="h-[40px] border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#ccc] bg-[#fafafa]">구매가</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                {/* 상품 정보 */}
                <td className="border-b border-b-[#e6e6e6]">
                  <div className="relative w-[700px] h-[145px] pt-[30px] pr-[30px] pb-[30px] pl-[40px] flex items-center">
                    <div className="h-[85px] w-[85px] mr-[40px]">
                      <Image width={85} height={85} src={product.image} alt={product.brand} />
                    </div>
                    <div className="flex-1">
                      <span className="block mb-1 text-[#777] font-bold text-[14px]">{product.brand}</span>
                      <p className="text-sm leading-[18px] text-black">{product.name}</p>
                      <p className="w-[60px] h-[18px] bg-[#f374b7] text-white rounded-[9px] leading-[17px] text-[12px] text-center mt-2">오늘드림</p>
                    </div>
                  </div>
                </td>

                {/* 판매가 */}
                <td className="border-b border-b-[#e6e6e6] border-l border-l-[#e6e6e6] text-center">
                  <span className="text-[14px] text-[#222] font-medium">
                    <span className="tracking-[-0.02em]">{product.price.toLocaleString()}</span>원
                  </span>
                </td>

                {/* 수량 */}
                <td className="border-b border-b-[#e6e6e6] border-l border-l-[#e6e6e6] text-center">{product.quantity}</td>

                {/* 구매가 */}
                <td className="border-b border-b-[#e6e6e6] border-l border-l-[#e6e6e6] text-center">
                  <span className="text-[14px] text-[#e02020] font-medium">
                    <span className="tracking-[-0.02em]">{(product.price * product.quantity).toLocaleString()}</span>원
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="overflow-hidden w-[1020px]">
          <div className="float-left w-[700px]">
            <h2 className="inline-block w-auto mt-[40px] mx-auto mb-[12px] text-[#333] text-[20px] font-medium">쿠폰할인정보</h2>
            <button type="button" className="relative ml-[10px] -top-[2px] w-[96px] h-[28px] text-[14px] rounded-[4px] text-[#454c53] border border-[0.5px] border-[#b2b8be] inline-block text-center leading-[27px]">보유쿠폰</button>
            <table className="w-full">
              <colgroup>
                <col className="w-[170px]" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <td colSpan={2} className="border-t-[2px] border-t-[#d6d6d6] border-b border-b-[#e6e6e6] p-0 text-[14px] text-[#222] leading-[28px]">
                    <div className="relative w-full py-[15px] px-[20px] bg-[#fcfcfc]">
                      <input type="radio" id="autoDiscount" checked={false} readOnly className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle text-[#888]" />
                      <label htmlFor="autoDiscount" className="mr-[40px] cursor-pointer">최대 할인 추천받기</label>
                      <input type="radio" id="manualDiscount" checked={true} readOnly className="w-[12px] h-[12px] mt-[-2px] mr-[7px] align-middle text-[#888]" />
                      <label htmlFor="autoDiscount" className="mr-[40px] cursor-pointer">혜택 직접 선택하기</label>
                      <p className="text-[#f27370] text-[16px] absolute top-1/2 right-[20px] -mt-[10px] h-[20px] leading-[20px]">
                        <span className="mr-[1px] ml-[3px] tracking-[-0.02em] font-medium">0</span>원
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[14px] text-[#222] border-b border-b-[#e6e6e6]">상품별 할인</th>
                  <td className="border-b border-b-[#e6e6e6] p-0 text-[14px] text-[#222] leading-[28px]">
                    <div className="relative w-full py-[15px] px-[20px]">
                      <select disabled="disabled" className="w-[300px] bg-[#f8f8f8] text-[#888] h-[28px] pl-[5px] text-[12px] mt-[5px] border border-[#d0d0d0] rounded-[5px] leading-[18px] align-top">
                        <option>적용할 수 있는 쿠폰이 없습니다.</option>
                      </select>
                      <p className="mt-[3px] text-[12px] text-[#888] leading-[18px]">즉시할인쿠폰은 상품금액에 자동적용 되어있습니다.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[14px] text-[#222] border-b border-b-[#e6e6e6]">주문별 할인</th>
                  <td className="border-b border-b-[#e6e6e6] p-0 text-[14px] text-[#222] leading-[28px]">
                    <div className="relative w-full py-[15px] px-[20px]">
                      <select className="w-[300px] bg-white h-[28px] pl-[5px] text-[12px] mt-[5px] border border-[#d0d0d0] rounded-[5px] leading-[18px] align-top">
                        <option>적용안함</option>
                        <option>[7월 PINK] 4만원 이상 2천원 할인</option>
                      </select>
                      <p className="text-[#f27370] text-[14px] absolute top-1/2 right-[20px] -mt-[10px] h-[20px] leading-[20px]">
                        <span className="mr-[1px] ml-[3px] tracking-[-0.02em] font-medium">0</span>원
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#f4f4f4] pl-[18px] py-[15px] text-left text-[14px] text-[#222] border-b border-b-[#e6e6e6]">배송비 쿠폰</th>
                  <td className="border-b border-b-[#e6e6e6] p-0 text-[14px] text-[#222] leading-[28px]">
                    <div className="relative w-full py-[15px] px-[20px]">
                      <select disabled="disabled" className="w-[300px] bg-[#f8f8f8] text-[#888] h-[28px] pl-[5px] text-[12px] mt-[5px] border border-[#d0d0d0] rounded-[5px] leading-[18px] align-top">
                        <option>적용할 수 있는 쿠폰이 없습니다.</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="block relative w-full">
              <h2 className="w-[1020px] mt-[40px] mx-auto mb-[12px] text-[#333] text-[20px] font-medium">결제수단 선택</h2>
            </div>
            <ul className="block border-t-[2px] border-t-[#888]">
              <li className="py-[10px] overflow-hidden bg-[#fcfcfc]">
                <span className="float-left w-[175px] px-[20px] leading-[35px] text-[#222]">
                  <input type="radio" id="payMethod1" checked={true} readOnly className="w-[12px] h-[12px] mr-[5px]" />
                  <label htmlFor="payMethod1" className="text-[#333] text-[14px] cursor-pointer">신용카드</label>
                </span>
                <span className="float-left w-[175px] px-[20px] leading-[35px] text-[#222]">
                  <input type="radio" id="payMethod1" className="w-[12px] h-[12px] mr-[5px]" />
                  <label htmlFor="payMethod1" className="text-[#333] text-[14px] cursor-pointer">PAYCO</label>
                </span>
                <span className="float-left w-[175px] px-[20px] leading-[35px] text-[#222]">
                  <input type="radio" id="payMethod1" className="w-[12px] h-[12px] mr-[5px]" />
                  <label htmlFor="payMethod1" className="text-[#333] text-[14px] cursor-pointer">카카오페이</label>
                </span>
                <span className="float-left w-[175px] px-[20px] leading-[35px] text-[#222]">
                  <input type="radio" id="payMethod1" className="w-[12px] h-[12px] mr-[5px]" />
                  <label htmlFor="payMethod1" className="text-[#333] text-[14px] cursor-pointer">네이버페이</label>
                </span>
                <span className="float-left w-[175px] px-[20px] leading-[35px] text-[#222]">
                  <input type="radio" id="payMethod1" className="w-[12px] h-[12px] mr-[5px]" />
                  <label htmlFor="payMethod1" className="text-[#333] text-[14px] cursor-pointer">휴대폰결제</label>
                </span>
                <span className="float-left w-[175px] px-[20px] leading-[35px] text-[#222]">
                  <input type="radio" id="payMethod1" className="w-[12px] h-[12px] mr-[5px]" />
                  <label htmlFor="payMethod1" className="text-[#333] text-[14px] cursor-pointer">계좌이체</label>
                </span>
              </li>
              <li>
                <table className="w-full">
                  <colgroup>
                    <col width={170} />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th className="bg-[#f4f4f4] py-[15px] pl-[18px] text-left text-[14px] text-[#222] border-t border-t-[#e6e6e6] border-b border-b-[#e6e6e6]">카드종류</th>
                      <td className="py-[15px] px-[20px] border-t border-t-[#e6e6e6] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">
                        <select className="w-[200px] bg-white h-[28px] pl-[5px] text-[12px] border border-[#d0d0d0] rounded-[5px] leading-[18px] text-[#333] align-top">
                          {cardOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-[#f4f4f4] py-[15px] pl-[18px] text-left text-[14px] text-[#222]border-b border-b-[#e6e6e6]">할부종류</th>
                      <td className="py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">
                        <select className="w-[200px] bg-white h-[28px] pl-[5px] text-[12px] border border-[#d0d0d0] rounded-[5px] leading-[18px] text-[#333] align-top">
                          {payOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="py-[15px] px-[20px] border-b border-b-[#e6e6e6] text-[14px] text-[#222] leading-[28px]">
                        <ul>
                          <li className="pl-[7px] text-[12px] leading-[18px] bg-[url('/images/mypage/coupon/bar_2x2.gif')] bg-no-repeat bg-[position:0_7px]">
                            <span className="text-[#757d86]">선불카드 상품의 경우 카드사 정책으로 결제완료 후 부분취소가 불가합니다. 취소/반품 시 유의해주세요.</span>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 ml-[210px] overflow-hidden float-right w-[300px]">
            <h2 className="w-[1020px] mt-[40px] mx-auto mb-[12px] text-[20px] text-[#4c4c4c] font-medium">최종 결제정보</h2>
            <ul className="py-[10px] border-[2px] border-[#666] text-[#666] text-[14px] leading-[20px] tracking-[-0.04em]">
              <li className="overflow-hidden px-[20px] leading-[32px] text-[#222]">
                <span className="float-left w-[140px]">총 상품 금액</span>
                <span className="float-right font-bold">
                  <span className="mr-[1px] tracking-[-0.02em] font-medium">{(totalPrice).toLocaleString()}</span>원
                </span>
              </li>
              <li className="overflow-hidden px-[20px] leading-[32px] text-[#222]">
                <span className="float-left w-[140px]">쿠폰할인금액</span>
                <span className="float-right font-bold text-[#f27370]">
                  <span className="mr-[1px] tracking-[-0.02em] font-medium">0</span>원
                </span>
              </li>
              <li className="border-t border-b border-[#e6e6e6] my-[10px] px-[20px] py-[10px] overflow-hidden leading-[32px] text-[#222]">
                <span className="float-left w-[140px]">
                  총 배송비
                  <button type="button" className="mt-[2px] ml-[10px] w-[70px] border border-[#aaa] text-[#666] bg-white text-center font-bold h-[28px] px-[5px] text-[12px] leading-[28px] rounded-[5px]">
                    <span className="text-[12px] text-[#888] inlilne-block min-w-[40px]">상세보기</span>
                  </button>
                </span>
                <span className="float-right font-bold">
                  <span className="mr-[1px] tracking-[-0.02em] font-medium">0</span>원
                </span>
              </li>
              <li className="px-[20px] overflow-hidden leading-[32px] text-[#222]">
                <span className="float-left w-[140px]">CJ ONE 포인트</span>
                <span className="float-right font-bold text-[#f27370]">
                  <span className="mr-[1px] tracking-[-0.02em] font-medium">0</span>원
                </span>
              </li>
              <li className="border-t border-t-[#888] mt-[10px] px-[20px] pt-[20px] pb-[10px] overflow-hidden leading-[32px] text-[#222]">
                <span className="w-[100px] text-[16px] font-bold float-left">최종 결제금액</span>
                <span className="float-right font-bold text-[#ff2828] text-[16px]">
                  <span className="text-[24px] align-[-2px] mr-[2px] tracking-[-0.02em] font-medium">{(totalPrice).toLocaleString()}</span>원
                </span>
              </li>
              <li className="overflow-hidden px-[20px] leading-[32px] text-[#222]">
                <button type="button" className="w-full py-[17px] pt-[17px] pb-[15px] my-[10px] rounded-[5px] text-[18px] text-white bg-[#f27370] leading-[18px] font-bold text-center">
                  결제하기
                </button>
              </li>
            </ul>
            
            <div className="mt-[12px] pr-[10px] pl-[18px]">
              <p>
                <input type="checkbox" id="savePayMethod" className="float-left w-[12px] h-[12px] mt-[3px] align-top" />
                <label htmlFor="savePayMethod" className="text-[#333] block ml-[17px] text-[14px] leading-[20px] cursor-pointer">
                  지금 설정을 다음 주문에도 사용하겠습니다. <br /> (빠른 모드)
                </label>
              </p>
            </div>

            <div className="mt-[20px] border border-[#e6e6e6] bg-[#f6f6f6]">
              <div className="relative w-full p-[20px] text-[14px] text-[#222]">
                <p className="mb-[15px]">주문 상품정보 및 결제대행 서비스 이용약관에 모두 동의하십니까?</p>
                <input type="checkbox" id="agreeAll" className="w-[12px] h-[12px] mr-[5px] align-middle"/> 
                <label htmlFor="agreeAll" className="font-bold cursor-pointer">모두 동의</label>
                <button type="button" className="absolute right-[20px] bottom-[20px] w-[26px] h-[16px] bg-[url('/images/order/order/ico_arrow26x16.png')] bg-no-repeat"/>
						  </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}