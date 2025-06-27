import ReviewProductHeader from "./ReviewProductHeader";
import ReviewRatingSection from "./ReviewRatingSection";
import ReviewSkinTypeSection from "./ReviewSkinTypeSection";
import ReviewCleansingSection from "./ReviewCleansingSection";
import ReviewIrritationSection from "./ReviewIrritationSection";
import ReviewPointNotice from "./ReviewPointNotice";
import ReviewTipImages from "./ReviewTipImages";
import ReviewTextInput from "./ReviewTextInput";
import ReviewWriteButtons from "./ReviewWriteButton";

const dashedLineStyle = {
  border: "none",
  borderBottom: "1px dashed #D1D5DB",
  borderImage:
    "repeating-linear-gradient(to right, #D1D5DB 0, #D1D5DB 4px, transparent 4px, transparent 8px) 1",
};

const dummyData = {
  image: "/images/product1.jpg",
  brand: "바이오더마",
  title: "바이오더마 센시비오 H2O 850ml (클렌징워터)",
};


export default function ReviewWriteLayout() {
  return (
    <div className="w-[480px] bg-white py-[40px] px-[0px]">
      <h2 className="text-[25px] font-bold mb-6 -mt-10">리뷰 작성</h2>
      <hr className="my-6" />
      <ReviewProductHeader data={dummyData} />
      <h2 className="mb-6"></h2>
      <ReviewRatingSection />
      <hr style={dashedLineStyle} className="my-6" />
      <ReviewSkinTypeSection />
      <hr style={dashedLineStyle} className="my-6" />
      <ReviewCleansingSection />
      <hr style={dashedLineStyle} className="my-6" />
      <ReviewIrritationSection />
      <h2 className="mb-6"></h2>
      <ReviewPointNotice />
      <h2 className="mb-6"></h2>
      <ReviewTipImages />
      <br className="my-6" />
      <ReviewTextInput />
      <br className="my-6" />
      <ReviewWriteButtons />
      {/* 안내 문구 박스 */}
      <div
        className="w-[560px] h-auto -mx-5 mt-10 bg-gray-100 rounded text-sm text-gray-700 leading-relaxed break-words"
        style={{ padding: "18px 40px" }}
      >
        <ul className="list-disc list-outside space-y-4">
          <li>
            게시된 리뷰의 권리와 책임은 게시당사자에게 있으며, 올리브영은
            이용자가 작성한 리뷰 등을 이용하여 서비스 운영 등에 활용할 수
            있습니다. 이 때 리뷰는 모두 공개를 원칙으로 하되, 공개의 방법은
            올리브영의 서비스 정책에 따라 변경될 수 있습니다.
          </li>
          <li>
            작성된 리뷰에 매월 1일~말일 기준으로 받은 “도움이 돼요“ 수 X5P가
            익월 10일 지급됩니다. (ID 기준 월 최대 2,000P) (단, 포인트 지급 후
            “도움이 돼요” 취소 시 그 다음 지급일에서 차감)
          </li>
          <li>
            결제기준 상품 구매금액이 2,000원 미만인 경우에는 리뷰 등록 보상
            포인트를 지급하지 않습니다.
          </li>
          <li>
            리뷰 삭제는 작성 후 3일안에 가능합니다.{" "}
            {"(마이페이지 > 리뷰 > 나의리뷰)"}
          </li>
          <li>
            <p className="font-semibold mb-2">
              [식품 등의 표시·광고에 대한 법률] 관련 표현 제한
            </p>
            <div className="ml-5 space-y-1 text-gray-700">
              <p>
                - 의약품의 효능을 지니거나 질병치료 효과를 증대시킨다는 표현
              </p>
              <p>- 일반식품을 건강기능식품으로 오인하게끔 하는 표현</p>
              <p>- 사실과 다르거나, 과학적 근거없는 추상적인 표현</p>
            </div>
          </li>
          <li>
            체험단, 마케팅 대행사 또는 외부 플랫폼 통하여 상품을 구매하고 리뷰
            작성 후 구매대금의 전부 또는 일부를 환급받는 등 경제적 이해관계가
            존재할 경우 반드시 게시물의 제목 또는 첫 부분에서 경제적 이해관계를
            공개하여야 하며, 이를 공개하지 않는 리뷰로 확인되거나 합리적으로
            의심 내지 판단될 경우, 별도의 안내 없이 블라인드 처리됩니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
