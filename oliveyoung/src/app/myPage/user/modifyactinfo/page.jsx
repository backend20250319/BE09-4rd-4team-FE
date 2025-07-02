'use client';

import UserInfoBox from '../components/UserInfoBox';

export default function ModifyAccountInfo() {
  return (
    <div className="float-left w-[850px] px-[29px]">
      {/* 유저 info 박스 */}
      <UserInfoBox />

      <div className="border-b-[0.8px] border-b-black">
        <h2 className="text-xl h-[30px] font-bold mt-[30px] mb-[7px]">회원정보 수정</h2>
      </div>

      <h3 className="h-[18px] mt-[30px] font-bold text-[16px]">기본정보 수정</h3>

      <div className="flex items-center mt-[11px]">
        <p className="text-[13px] text-[#555555] flex-grow leading-[20px] tracking-[-0.04em]">
          "회원 정보 및 비밀번호는 CJ ONE 사이트를 통해 수정 가능합니다."
          <br />
          "(카카오 간편회원은 CJ ONE에서 통합회원 전환하여 비밀번호 설정/수정 가능)""
        </p>
        <ul className="flex space-x-2 ml-4">
          <li>
            <a
              href="/mypage/user/modifyactinfo/modifyactdetailed"
              className="block
                        w-[152.6px]
                        h-[37.6px]
                        relative
                        text-[14px]
                        leading-[36px]
                        tracking-[-0.04em]
                        text-[#666]
                        pl-[15px]
                        pr-[56px]
                        border
                        border-[#888]
                        rounded-[5px]"
            >
              {/* 링크 안에 내용 넣어야 함 */}
              회원정보 수정
            </a>
          </li>
          <li>
            <a
              href="/mypage/user/modifyactinfo/modifypwd"
              className="block
                        w-[152.6px]
                        h-[37.6px]
                        relative
                        text-[14px]
                        leading-[36px]
                        tracking-[-0.04em]
                        text-[#666]
                        pl-[15px]
                        pr-[56px]
                        border
                        border-[#888]
                        rounded-[5px]"
            >
              비밀번호 수정
            </a>
          </li>
        </ul>
      </div>

      <div>
        <p className="font-bold text-2xl">
          밑에 이용약관 어쩌구 만들어야 하는데 일단 프론트에서 보여주기만 하는 거니까
          <br />백 먼저 어느 정도 구현한 다음에 할게요
        </p>
      </div>

      <div className="mt-[30px] flex justify-center">
        <a
          href="#"
          className="text-center w-[150px] h-[50px] px-[30px] py-[10px] bg-black text-[16px] text-white font-bold rounded leading-[32px]"
          onClick={() => alert('저장되었습니다.')}
        >
          저장
        </a>
      </div>
    </div>
  );
}
