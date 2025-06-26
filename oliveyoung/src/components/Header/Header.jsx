import '../../styles/header.css';

import React, { useState } from 'react';

import SearchModal from '../SearchModal';
import StoreModal from '../StoreModal';
import dream from '../../resources/images/dreamIcon.png';
import logo from '../../resources/images/logo.png';
import search from '../../resources/images/search.svg';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();
  const [storeHover, setStoreHover] = useState(false);
  const [searchClick, setSearchClick] = useState(false);


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
    // setLocationHover(true);
  };

  const handleLocationMouseOut = () => {
    // setLocationHover(false);
  };

  const handleStoreMouseOver = (e) => {
    e.stopPropagation();
    setStoreHover(true);
  };

  const handleStoreMouseOut = () => {
    setStoreHover(false);
  };

  const handleRecentClick = () => {
    // setLocationHover(false);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="">
        <ul className="py-[1px] h-[30px] flex flex-row justify-end items-center text-[#333333]">
          <li className="text-xs font-bold">BABYOLIVE박*준</li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">로그아웃</li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">마이페이지</li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">
            장바구니
            <span className="text-xs text-[#f27370] font-bold hover:cursor-pointer">(0)</span>
          </li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">주문배송</li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">고객센터</li>
          <li className="text-xs hover:cursor-pointer border-r px-[10px]">올영매장</li>
          <li className="text-xs hover:cursor-pointer px-[10px]">Global</li>
        </ul>
        <div className="w-[1020px] h-[90px] flex flex-row justify-between items-center">
          <img
            className="w-[246px] h-[40px] hover:cursor-pointer"
            src={logo}
            alt="logo"
            onClick={() => navigate('/')}
          />
          <div className="relative">
            <input
              className="w-[340px] h-[38px] px-[14px] rounded-3xl border border-[#82DC28] outline-none custom-placeholder text-sm"
              type="text"
              placeholder="상품, 브랜드, 성분 검색"
              onFocus={() => setSearchClick(true)}
            />
            <div className="absolute right-[15px] top-0 bottom-0 flex items-center hover:cursor-pointer">
              <img className="w-[20px]" src={search} alt="search" />
            </div>
            <SearchModal searchClick={searchClick} chart={chart} setSearchClick={setSearchClick} />
          </div>
          <ul className="flex flex-row text-sm">
            <li className="text-[#] flex flex-row items-center gap-1 hover:cursor-pointer hover:underline hover:underline-offset-[5px] decoration-2 decoration-black relative border-r px-[15px]">
              <p onMouseOver={handleLocationMouseOver} onMouseOut={handleLocationMouseOut}>
                오늘드림
              </p>{' '}
              <img src={dream} alt="delivery" className="w-[22px]" />
              {/* <LocationModal locationHover={locationHover} /> */}
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
              {/* {recentClick && <Recent recent={recent} setRecentClick={setRecentClick} recentClick={recentClick} />} */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
