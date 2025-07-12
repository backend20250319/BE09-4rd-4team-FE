'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchModal from '../app/menu/SearchModal';
import StoreModal from '../app/menu/StoreModal';
import { useAuth } from '@/contexts/AuthContext';
import '../styles/header.css';
import axios from 'axios';

function Header(props) {
  const router = useRouter();
  const { isLoggedIn, userName, logout } = useAuth();
  const [storeHover, setStoreHover] = useState(false);
  const [searchClick, setSearchClick] = useState(false);

  // 이름 가운데 글자 마스킹
  const maskUserName = (name) => {
    if (!name) return '';
    if (name.length === 2) {
      return name[0] + '*';
    }
    if (name.length >= 3) {
      return name[0] + '*' + name[name.length - 1];
    }
    return name;
  };

  const chart = [
    { searchWord: '기획', prev: 'keep' },
    { searchWord: '샴푸', prev: 'up' },
    { searchWord: '선크림', prev: 'up' },
    { searchWord: '페리페라', prev: 'up' },
    { searchWord: 'PERFUME', prev: 'new' },
    { searchWord: '쿨링', prev: 'up' },
    { searchWord: '파우더', prev: 'down' },
    { searchWord: '토너', prev: 'up' },
    { searchWord: '톤업선크림', prev: 'keep' },
    { searchWord: '섀도우', prev: 'up' },
  ];

  const handleLocationMouseOver = (e) => {
    e.stopPropagation();
  };

  const handleLocationMouseOut = () => {};

  const handleStoreMouseOver = (e) => {
    e.stopPropagation();
    setStoreHover(true);
  };

  const handleStoreMouseOut = () => {
    setStoreHover(false);
  };

  const handleRecentClick = () => {};

  const [itemCount, setItemCount] = useState(0);
  const { accessToken } = useAuth();
  const [userInfo, setUserInfo] = useState({ userName: '' });

  useEffect(() => {
    if (!accessToken) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/mypage/info', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { userName } = res.data.data;
        setUserInfo({ userName });

        const cartRes = await axios.get('http://localhost:8080/api/carts/items', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const cartItems = Array.isArray(cartRes.data) ? cartRes.data : [];
        setItemCount(cartItems.length);
      } catch (e) {
        console.error('유저 정보 가져오기 실패:', e);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  return (
    <div className="flex flex-row justify-center">
      <div className="">
        <ul className="py-[1px] h-[30px] flex flex-row justify-end items-center text-[#333333]">
          {isLoggedIn ? (
            <>
              <li className="text-xs font-bold">PINKOLIVE{maskUserName(userName)}</li>
              <li className="text-xs hover:cursor-pointer border-r px-[10px]" onClick={logout}>
                로그아웃
              </li>
              <li
                className="text-xs hover:cursor-pointer border-r px-[10px]"
                onClick={() => router.push('/mypage')}
              >
                마이페이지
              </li>
              <li
                className="text-xs hover:cursor-pointer border-r px-[10px]"
                onClick={() => router.push('/order/cart')}
              >
                장바구니
                <span className="text-xs text-[#f27370] font-bold hover:cursor-pointer">({itemCount})</span>
              </li>
            </>
          ) : (
            <>
              <li
                className="text-xs hover:cursor-pointer border-r px-[10px]"
                onClick={() => router.push('/user/signup')}
              >
                회원가입
              </li>
              <li
                className="text-xs hover:cursor-pointer border-r px-[10px]"
                onClick={() => router.push('/user/login')}
              >
                로그인
              </li>
              <li
                className="text-xs hover:cursor-pointer border-r px-[10px]"
                onClick={() => router.push('/order/cart')}
              >
                장바구니
              </li>
            </>
          )}
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">주문배송</li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">고객센터</li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">올영매장</li>
          <li className="text-xs hover:cursor-pointer px-[10px]">Global</li>
        </ul>
        <div className="w-[1020px] h-[90px] flex flex-row justify-between items-center">
          <img
            className="w-[246px] h-[40px] hover:cursor-pointer"
            src="/images/product/logo.png"
            alt="logo"
            onClick={() => router.push('/')}
          />
          <div className="relative">
            <input
              className="w-[340px] h-[38px] px-[14px] rounded-3xl border border-[#82DC28] outline-none custom-placeholder text-sm"
              type="text"
              placeholder="상품, 브랜드, 성분 검색"
              onFocus={() => setSearchClick(true)}
            />
            <div className="absolute right-[15px] top-0 bottom-0 flex items-center hover:cursor-pointer">
              <img className="w-[20px]" src="/images/product/search.svg" alt="search" />
            </div>
            <SearchModal searchClick={searchClick} chart={chart} setSearchClick={setSearchClick} />
          </div>
          <ul className="flex flex-row text-sm">
            <li className="text-[#] flex flex-row items-center gap-1 hover:cursor-pointer hover:underline hover:underline-offset-[5px] decoration-2 decoration-black relative border-r px-[15px]">
              <p onMouseOver={handleLocationMouseOver} onMouseOut={handleLocationMouseOut}>
                오늘드림
              </p>
              <img src="/images/product/dreamIcon.png" alt="delivery" className="w-[22px]" />
            </li>
            <li className="flex flex-row gap-1 items-center hover:cursor-pointer hover:underline hover:underline-offset-[5px] decoration-2 relative border-r px-[15px]">
              <p onMouseOver={handleStoreMouseOver} onMouseOut={handleStoreMouseOut}>
                올영매장찾기
              </p>
              <div className="w-[7px] h-[4px] bg-arrow-hover"></div>
              <StoreModal storeHover={storeHover} />
            </li>
            <li
              className="flex flex-row gap-1 items-center hover:cursor-pointer px-[15px] relative"
              onClick={handleRecentClick}
            >
              최근 본 상품<div className="w-[7px] h-[4px] bg-arrow-active"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
