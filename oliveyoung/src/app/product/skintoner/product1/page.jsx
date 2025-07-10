// src/app/product/skintoner/product1/page.jsx

import ProductPage from "./components/ProductPage";

export default function Product1Page() {
  // 백엔드 API가 /api/products/skintoner/product1 형태를 원하므로,
  // 여기에 "product1"이라는 문자열 식별자를 정의합니다.
  const productIdentifier = "product1"; 

  return (
    <div className="w-full max-w-[1020px] mx-auto">
      <ProductPage productId={productIdentifier} />
    </div>
  );
}
