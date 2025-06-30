'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 이미지 절대경로로 바로 지정
const categories = [
  { img: '/images/category1.jpg', name: '진정솔루션' },
  { img: '/images/category2.jpg', name: '슬로우에이징' },
  { img: '/images/category3.jpg', name: '클린뷰티' },
  { img: '/images/category4.jpg', name: '크림' },
  { img: '/images/category5.jpg', name: '에센스' },
  { img: '/images/category6.jpg', name: '토너' },
];

// 👉 커스텀 왼쪽 화살표
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div 
      className="absolute left-[-35px] top-[50%] transform -translate-y-1/2 z-50 cursor-pointer"
      onClick={onClick}
    >
      ᐸ
    </div>
  );
}

// 👉 커스텀 오른쪽 화살표
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div 
      className="absolute right-[-30px] top-[50%] transform -translate-y-1/2 z-50 cursor-pointer"
      onClick={onClick}
    >
      ᐳ
    </div>
  );
}

function CategoryCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center py-5 cursor-pointer">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden flex justify-center items-center">
              <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
            </div>
            <p className="mt-2 text-sm font-medium text-[#333] text-center">{item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategoryCarousel;