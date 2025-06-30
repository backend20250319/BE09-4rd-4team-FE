import React from "react";

export default function AccountDelete() {
    const router = useRouter()

    const handleWithdrawal = async () => {
      const confirmed = window.confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')
    
      if (!confirmed) return
    
      try {
        const response = await fetch('/api/member/withdraw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason: 'user_request' }), // 필요 시 탈퇴 사유도 같이 보내기
        })
      
        if (response.ok) {
          alert('회원 탈퇴가 완료되었습니다.')
          router.push('/goodbye') // 탈퇴 완료 페이지로 이동
        } else {
          const errorData = await response.json()
          alert('탈퇴 실패: ' + (errorData.message || '알 수 없는 오류'))
        }
      } catch (error) {
        alert('서버 오류: ' + error.message)
      }
    }

    return (
        
        <>
            {/* user info 박스 */}
            <div className="float-left w-[850px] px-[29px]">
              <div className="relative h-[51px] pt-2 pl-[30px] bg-[#eb6d9a]">
                <div className="relative float-left w-[34px] h-[34px] rounded-full overflow-hidden">
                  <span className="absolute top-0 left-0 block overflow-hidden w-[34px] h-[34px] bg-no-repeat bg-[url('/images/mypage/order/bg_grd_01.png')]"></span>
                  <Image width={34} height={34} src='/images/mypage/order/my_picture_base.jpg' alt="my_picture_base.jpg"/>
                </div>
                <p className="float-left ml-[10px] text-[18px] leading-[34px] font-bold text-white tracking-[-1px]">
                  BABY OLIVE
                  <strong className="inline-block ml-[3px]">박*준</strong>
                  님 반갑습니다.
                </p>
                <ul className="absolute top-1/2 right-[30px] -mt-[10px]">
                  <li className="inline-block pr-[15px] text-[13px] text-white font-bold bg-[url('/images/mypage/order/ico_arrow7x10_2.png')] bg-no-repeat bg-[length:5px_10px] bg-[position:100%_50%] cursor-pointer">올리브 멤버스 라운지</li>
                  <li className="inline-block pr-[15px] ml-[30px] text-[13px] text-white font-bold bg-[url('/images/mypage/order/ico_arrow7x10_2.png')] bg-no-repeat bg-[length:5px_10px] bg-[position:100%_50%] cursor-pointer">나의 프로필</li>
                </ul>
              </div>
              <div className="py-[19px] border border-t-0 border-[#cccccc]">
                <ul className="flex">
                  <li className="float-left w-1/3 text-center">
                    <span className="text-[13px] font-bold text-[#555]" >CJ ONE 포인트</span>
                    <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
                      1,500
                      <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">P</em>
                    </p>
                  </li>
                  <li className="float-left w-1/3 text-center">
                    <span className="text-[13px] font-bold text-[#555]" >쿠폰</span>
                    <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
                      5
                      <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">개</em>
                    </p>
                  </li>
                  <li className="float-left w-1/3 text-center">
                    <span className="text-[13px] font-bold text-[#555]" >예치금</span>
                    <p className="inline-block pl-[15px] text-[18px] text-[#f27370] tracking-[-1.16px] font-medium cursor-pointer">
                      0
                      <em className="inline-block pl-[5px] text-[13px] font-bold text-[#555555] not-italic">원</em>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* 회원탈퇴 */}
            <div className="float-left w-[850px] px-[29px]">
                <h2 className="text-2xl font-bold mb-4">회원탈퇴</h2>
                <p className="font-semibold text-gray-700 mb-2">회원 탈퇴(이용약관 동의 철회) 시 아래 내용을 확인해주세요.</p>

                <div className="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 space-y-2 mb-8">
                  <p>• 올리브영 이용약관 동의 철회 시 올리브영 회원 개인정보 및 고객님께서 보유하셨던 쿠폰은 모두 삭제되며, 쿠폰 정보는 재가입 시 복원이 불가능합니다.</p>
                  <p>• 올리브영 이용약관 동의 철회 시에는 올리브영 서비스(WCARE 서비스 포함)만 이용할 수 없게 되며, CJ ONE 웹사이트를 포함한 다른 CJ ONE 제휴 브랜드의 웹사이트 서비스는 이용하실 수 있습니다.</p>
                  <p>• 올리브영 이용약관 동의를 철회한 후에라도 해당 약관에 다시 동의하시면 서비스를 이용할 수 있습니다.</p>
                  <p>• 진행 중인 전자상거래 이용내역(결제/배송/교환/반품 중인 상태)이 있거나 고객 상담 및 이용하신 서비스가 완료되지 않은 경우 서비스 철회 하실 수 없습니다.</p>
                  <p>• 올리브영 이용약관 동의 철회 시 고객님께서 보유하셨던 올리브영 현대카드 리워드는 모두 소멸되며, 재동의 시에도 복원은 불가합니다.</p>
                  <p>• 올리브영 현대카드를 보유하고 계신 고객님의 경우에도 올리브영 이용약관 동의 철회 시 올리브영 현대카드 리워드 신규 발급은 중단되며, 재동의 시에는 올리브영 현대카드를 재발급 받아야 정상적인 서비스를 제공받을 수 있습니다. (재발급 시 연회비 별도 청구)</p>
                </div>

                <p className="text-center font-semibold mb-6">
                  올리브영 회원 탈퇴(이용약관 동의 철회)를 하시겠습니까?
                </p>

                <div className="text-center">
                  <button
                    onClick={handleWithdrawal}
                    className="px-8 py-4 bg-green-500 text-white rounded-md text-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
                  >
                    회원 탈퇴
                  </button>
                </div>
            </div>
        </>
    );
}