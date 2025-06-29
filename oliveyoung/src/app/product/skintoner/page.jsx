import BrandFilter from "./components/BrandFilter";
import BannerCarousel from "./components/SkinTonerBanner";
import ProductCarousel from "./components/SkinTonerProduct";

export default function Page() {
  return (

    <div className="flex-row w-[1020px] mx-auto">
      <BrandFilter />
      <BannerCarousel />
      <ProductCarousel />
    </div>
  );
}