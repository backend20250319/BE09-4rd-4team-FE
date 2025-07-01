"use client";

import CustomerSupportSection from "./main/CustomerSupportSection";
import MainBanner from "./main/MainBanner";
import ProductCarouselSlider from "./main/ProductCarouselSlider";
import ProductRecommendationSection from "./main/RecommendationSection";
import { products } from "./main/product"; // ← 더미데이터 import

// 변환 함수: RecommendationSection에 맞는 포맷으로 바꿔줌
const convertProduct = (p) => ({
  image: p.img,
  title: p.name,
  originalPrice: p.originalPrice,
  discountPrice: p.discountedPrice,
  labels: p.badge,
});

export default function Home() {
  const converted = products.map(convertProduct);
  const leftProducts = converted.slice(0, 4); // 원하는 만큼 보여줘도 OK
  const rightProducts = converted.slice(4, 8);

  return (
    <div className="container mx-auto px-4">
      <MainBanner />
      <ProductRecommendationSection
        leftTitle="요즘 주목 받는 상품"
        rightTitle="고객님을 위한 추천 상품"
        leftProducts={converted.slice(0, 10)} // 10개 이상이면 슬라이딩 가능
        rightProducts={converted.slice(10, 20)}
      />
      <ProductCarouselSlider title="이 상품 어때요?" products={converted} />
      <CustomerSupportSection />
    </div>
  );
}
