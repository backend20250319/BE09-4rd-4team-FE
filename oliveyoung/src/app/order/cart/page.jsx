'use client';

import cartTableData from "./data/cartTableData"
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect } from "react";
import axios from 'axios';

export default function Cart() {

  // 상품 상태 관리
  const [products, setProducts] = useState(cartTableData);

  // 각 상품별 수량, 커스텀 모드, 커스텀 수량 상태 관리
  const [quantityStates, setQuantityStates] = useState(
    cartTableData.reduce((acc, product) => {
      acc[product.id] = {
        selectedQuantity: product.quantity.toString(),
        customQuantity: "",
        isCustomMode: false,
      };
      return acc;
    }, {})
  );

  // 수량 변경 핸들러
  const handleQuantityChange = (productId, value) => {
    setQuantityStates((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        selectedQuantity: value,
        isCustomMode: value === "10+",
        customQuantity: value === "10+" ? "" : "",
      },
    }));
    if (value !== "10+") {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, quantity: parseInt(value) } : p
        )
      );
    }
  };

  // 커스텀 수량 입력 핸들러
  const handleCustomQuantityChange = (productId, value) => {
    setQuantityStates((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        customQuantity: value,
      },
    }));
  };

  // 커스텀 수량 확정 핸들러
  const handleConfirmCustomQuantity = (productId) => {
    const quantity = parseInt(quantityStates[productId].customQuantity);
    if (quantity >= 1) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, quantity: quantity } : p
        )
      );
      setQuantityStates((prev) => ({
        ...prev,
        [productId]: {
          selectedQuantity: quantity.toString(),
          customQuantity: quantity > 10 ? quantity.toString() : "",
          isCustomMode: quantity > 10,
        },
      }));
      if (quantity <= 10) {
        setQuantityStates((prev) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            isCustomMode: false,
            customQuantity: "",
            selectedQuantity: quantity.toString(),
          },
        }));
      }
    }
  };

  // 총합 계산
  const totalPrice = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  // 아이템 개수
  const itemCount = products.length;

  // 메뉴 클릭 핸들러
  const handleMenuClick = (e, href) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 1000);
  };

  const [checkedIds, setCheckedIds] = useState([]);

  const handleAllCheck = (e) => {
    if (e.target.checked) {
      setCheckedIds(products.map((p) => p.id));
    } else {
      setCheckedIds([]);
    }
  };

  const handleRowCheck = (productId) => (e) => {
    if (e.target.checked) {
      setCheckedIds((prev) => [...prev, productId]);
    } else {
      setCheckedIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const allChecked = products.length > 0 && checkedIds.length === products.length;

  // 선택된 상품만 합산
  const selectedProducts = products.filter((p) => checkedIds.includes(p.id));
  const selectedTotalPrice = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  // user 정보 가져오기
  const [userInfo, setUserInfo] = useState({
    userName: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/mypage/info', {
          headers: {  
            Authorization: `Bearer ${token}`,
          },
        });

        const { userName } = res.data.data;
        setUserInfo({ userName });

        // 2. 장바구니 정보 가져오기
        const cartRes = await axios.get(`http://localhost:8080/api/carts/items?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(cartRes.data);

      } catch (e) {
        console.error('유저 정보 가져오기 실패:', e);
      }
    };

    fetchUserInfo();
  }, []);

  // 이름 마스킹 함수
  const maskUserName = (name) => {
    if (!name || name.length < 2) return name;

    if (name.length === 2) {
      return name[0] + '*';
    }

    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
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
            {maskUserName(userInfo.userName)}님의 멤버십 등급은 
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
                <span className="mr-[2px] text-[18px] text-[#f27370] align-[-1px] tracking-[-0.02em] font-medium">0</span>P
              </span>
            </li>
            <li className="pt-[10px] border-l border-[#e6e6e6] text-[#333] text-[14px] float-left w-[170px] h-[68px] text-center cursor-pointer">
              <Link href="/mypage/coupon" onClick={e => handleMenuClick(e, href)}>
                <strong className="block mb-[8px]" >할인쿠폰</strong>
                <span className="block text-[12px]">
                  <span className="mr-[2px] text-[18px] text-[#f27370] align-[-1px] tracking-[-0.02em] font-medium">0</span>개
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
                <input type="checkbox" className="w-[12px] h-[12px] mx-auto bg-[url('/images/')] bg-[position:0_-20px] bg-transparent cursor-pointer"
                checked={allChecked} onChange={handleAllCheck}/>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border-b border-b-[#e6e6e6] text-center">
                  <input type="checkbox" className="w-3 h-3 cursor-pointer"
                    checked={checkedIds.includes(product.id)}
                    onChange={handleRowCheck(product.id)}/>
                </td>
                {/* 상품정보 */}
                <td className="border-b border-b-[#e6e6e6]">
                  <div className="flex items-center w-[390px]">
                    <div className="h-[145px] pt-[30px] pr-[20px] pb-[30px] pl-[20px]">
                      <Link href="">
                        <Image width={85} height={85} src={product.image} alt={product.brand} />
                      </Link>
                    </div>
                    <div className="flex-1 pr-[30px]">
                      <Link href="" className="block">
                        <span className="block mb-1 text-[#777] font-bold text-[14px]">{product.brand}</span>
                        <p className="text-sm leading-[18px] text-black">{product.name}</p>
                      </Link>
                      <p className="pb-[5px]"></p>
                      <p className="flex-1 w-[60px] h-[18px] bg-[#f374b7] text-white rounded-[9px] leading-[17px] text-[12px] text-center">오늘드림</p>
                    </div>
                  </div>
                </td>
                {/* 판매가 */}
                <td className="border-b border-b-[#e6e6e6] text-center">
                  <span className="text-[14px] text-[#222] font-medium">
                    <span className="tracking-[-0.02em]">{product.price.toLocaleString()}</span>원
                  </span>
                </td>
                {/* 수량 */}
                <td className="border-b border-b-[#e6e6e6] text-center">
                  <div className="w-[60px] space-y-2 mx-auto">
                    {!quantityStates[product.id].isCustomMode ? (
                      <select
                        className="w-full h-[28px] pl-[10px] border rounded-[5px] border-[#ccc] text-[12px] bg-[#fff]"
                        value={quantityStates[product.id].selectedQuantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                        <option value="10+">10+</option>
                      </select>
                    ) : (
                      <div className="w-[60px]">
                        <input
                          type="text"
                          min="1"
                          value={quantityStates[product.id].customQuantity}
                          onChange={(e) => handleCustomQuantityChange(product.id, e.target.value)}
                          className="w-full h-[28px] px-[5px] border rounded-[5px] border-[#ccc] text-[#222] tracking-[0.5px] text-[12px] bg-[#fff] text-center focus:border-[#9bce26] focus:outline-none"
                        />
                        <button
                          onClick={() => handleConfirmCustomQuantity(product.id)}
                          disabled={!quantityStates[product.id].customQuantity || quantityStates[product.id].customQuantity < 1}
                          className="w-full h-[28px] mt-[5px] border border-[#aaa] text-[#666] bg-white text-[12px] rounded-[5px] leading-[28px] text-center font-bold"
                        >변경</button>
                      </div>
                    )}
                  </div>
                </td>
                {/* 구매가 */}
                <td className="border-b border-b-[#e6e6e6] text-center">
                  <span className="text-[14px] text-[#e02020] font-medium">
                    <span className="tracking-[-0.02em]">{(product.price * product.quantity).toLocaleString()}</span>원
                  </span>
                </td>
                {/* 선택 */}
                <td className="border-b border-b-[#e6e6e6] text-center">
                  <button className="w-[109px] h-[28px] px-[5px] mb-[5px] border border-[#9bce26] rounded-[5px] leading-[28px] text-[12px] text-[#9bce26] bg-white font-bold">바로구매</button>
                  <button className="w-[109px] h-[28px] px-[5px] mb-[5px] border border-[#aaa] rounded-[5px] leading-[28px] text-[12px] text-[#666] bg-white font-bold">쇼핑찜</button>
                  <button className="w-[109px] h-[28px] mb-[5px] border border-[#aaa] rounded-[5px] leading-[28px] text-[12px] text-[#666] bg-white font-bold">삭제</button>
                </td>
                {/* 배송정보 */}
                <td className="border-b border-b-[#e6e6e6] text-center">
                  <p className="text-[#666] text-[12px] text-center">
                    <strong className="text-[#333] text-[14px]">{product.delivery}
                      <span className="block text-[#666] text-[12px] font-medium">{product.deliveryNote}</span>
                    </strong>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 올리브영 배송상품 */}
        <div className="mt-[10px] flex justify-between items-start">
          <div className="float-left w-[300px]">
            <button type="button" className="px-[15px] border border-[#aaa] text-[#666] bg-white h-[28px] text-[12px] leading-[28px] rounded-[5px] text-center">
              <span className="inline-block min-w-[40px] font-bold">선택상품 삭제</span>
            </button>
            <button type="button" className="px-[15px] ml-[2px] border border-[#aaa] text-[#666] bg-white h-[28px] text-[12px] leading-[28px] rounded-[5px] text-center">
              <span className="inline-block min-w-[40px] font-bold">품절상품 삭제</span>
            </button>
          </div>

          <div className="font-bold text-[#666] float-right w-[700px] mt-[5px] leading-[18px] text-right tracking-[-0.04em] text-[14px]">
            총 판매가
            <span className="mr-[1px] text-[16px] font-medium">{selectedTotalPrice.toLocaleString()}</span>원
            <span className="inline-block mx-[5px] w-[10px] h-[10px] bg-[url('/images/order/cart/ico_sign_cal.png')] bg-[position:0_50%] bg-no-repeat text-left"></span>
            총 할인금액
            <span className="mr-[1px] text-[16px] font-medium">0</span>원
            <span className="inline-block mx-[5px] w-[10px] h-[10px] bg-[url('/images/order/cart/ico_sign_cal.png')] bg-[position:-20px_50%] bg-no-repeat text-left"></span>
            배송비
            <span className="mr-[1px] text-[16px] font-medium">0</span>원
            <span className="inline-block mx-[5px] w-[10px] h-[10px] bg-[url('/images/order/cart/ico_sign_cal.png')] bg-[position:-40px_50%] bg-no-repeat text-left"></span>
            <span className="text-[14px] text-[#f27370]">
              총 결제금액
              <span className="ml-[9px] text-[16px] font-medium">{selectedTotalPrice.toLocaleString()}</span>원
            </span>
          </div>
        </div>

        <div className="mt-[60px] border-t-[2px] border-t-[#9bce26] border-b border-b-[#e6e6e6]">
          <div className="relative overflow-hidden w-full h-[110px] text-medium">
            <p className="border-l border-l-[#efefef] float-left w-[340px] h-[110px] pt-[30px] text-center text-[16px] text-[#666] border-r border-r-[#efefef] font-bold">
              총 판매가
              <span className="text-[#333] block mt-[10px] text-center text-[16px] font-bold leading-[20px]">
                <span className="text-[24px] mr-[2px] align-[-2px] tracking-[-0.02em] font-medium">{selectedTotalPrice.toLocaleString()}</span>원
              </span>
            </p>
            <span className="top-1/2 left-[340px] absolute mt-[-15px] ml-[-15px] w-[30px] h-[30px] bg-[url('/images/order/cart/ico_sign_cal2.png')] bg-[position:0_0] bg-no-repeat"></span>
            <p className="float-left w-[340px] h-[110px] pt-[30px] text-center text-[16px] text-[#666] border-r border-r-[#efefef]">
              총 할인금액
              <span className="text-[#f27370] block mt-[10px] text-center text-[16px] font-bold leading-[20px]">
                <span className="text-[24px] mr-[2px] align-[-2px] tracking-[-0.02em] font-medium">0</span>원
              </span>
            </p>
            <span className="top-1/2 left-[680px] absolute mt-[-15px] ml-[-15px] w-[30px] h-[30px] bg-[url('/images/order/cart/ico_sign_cal2.png')] bg-[position:-30_0] bg-no-repeat"></span>
            <p className="border-l border-l-[#efefef] float-left w-[340px] h-[110px] pt-[30px] text-center text-[16px] text-[#666] border-r border-r-[#efefef] font-bold">
              배송비
              <span className="text-[#333] block mt-[10px] text-center text-[16px] font-bold leading-[20px]">
                <span className="text-[24px] mr-[2px] align-[-2px] tracking-[-0.02em] font-medium">0</span>원
              </span>
            </p>
          </div>
          <div className="text-[#333] h-[80px] pt-[30px] px-[30px] text-right bg-[#f6f6f6] border-t-[2px] border-t-[#d6d6d6] text-[22px] font-bold relative leading-[20px]">
            <span className="absolute top-1/2 left-[30px] h-[30px] -mt-[11px] text-[#888] text-[14px]">
              <span className="inline-block w-[22px] h-[22px] mr-[7px] mb-[2px] bg-[url('/images/order/cart/ico_arrow_01.gif')] bg-no-repeat align-middle"></span>
              배송비는 쿠폰할인금액에 따라 변경될 수 있습니다.
            </span>
            총 결제예상금액
            <span className="text-[#ff2828] text-[16px]">
              <span className="ml-[10px] text-[26px] mr-[2px] align-[-2px] tracking-[-0.02em] font-medium">{selectedTotalPrice.toLocaleString()}</span>원
            </span>
          </div>
        </div>

        <div className="mt-[30px] text-center ">
          <button type="button" onClick={() => window.location.href = '/order/order'} className="w-[180px] text-[16px] h-[50px] bg-white border border-[#f27370] pt-[11px] pb-[9px] leading-[28px] text-[#f27370] rounded-[5px] text-center font-bold">
            선택주문 {selectedProducts.length > 0 && `(${selectedProducts.length})`}</button>
          <button type="button" onClick={() => window.location.href = '/order/order'} className="w-[180px] ml-[7px] text-[16px] h-[50px] bg-[#f27370] pt-[11px] pb-[9px] leading-[30px] text-white rounded-[5px] text-center font-bold">전체주문</button>
        </div>

        <div className="mt-[30px] py-[20px] border-t border-t-[#ccc]">
          <p className="text-[12px] text-[#888] text-center font-bold">장바구니 상품은 90일동안, 판매종료 된 상품은 10일동안 보관됩니다.</p>
        </div>
      </div>
    </div>
  );
}