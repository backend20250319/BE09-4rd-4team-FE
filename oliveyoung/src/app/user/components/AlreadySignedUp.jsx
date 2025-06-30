// components/AlreadySignedUp.jsx
'use client'

import { useRouter } from 'next/navigation'
import React from 'react';
import Image from 'next/image'; // Next.js Image 컴포넌트 사용을 위해 임포트

export default function AlreadySignedUp({ userName }) { // userName을 props로 받아 사용

    const router = useRouter()

  return (   
    <>
    <div className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-lg shadow-sm bg-white mb-10">
      {/* 둥근 이미지 (웃는 얼굴) */}
      <div className="relative w-24 h-24 mb-4">
        {/* 실제 이미지 경로로 변경해주세요. 임시로 플레이스홀더 사용 */}
        <Image
          src="/images/happy-face.png" // 실제 이미지 경로로 변경 (public 폴더 아래에 happy-face.png 파일이 있다고 가정)
          alt="Happy Face"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <p className="text-xl font-bold text-gray-800 text-center mb-3">
        <span className="text-orange-500">{userName}님!</span> 이미 CJ ONE 회원으로 등록되어 있습니다
      </p>
      <p className="text-sm text-gray-600 text-center mb-6">
        회원 아이디(<span className="font-semibold text-gray-700">cjone****</span>)로 로그인 하시거나, 아이디 찾기를 진행해주세요.
      </p>

      <div className="flex space-x-3">
        <button
          type="button"
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
        >
          아이디 찾기
        </button>
        <button
          type="button"
          className="px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 focus:outl ine-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
          onClick={() => router.push('/user/login')}
        >
          로그인
        </button>
      </div>
    </div>

    <div className="flex flex-col md:flex-row mt-16 mb-16 px-4 md:px-0 bg-[#f8f8f8]"> {/* 좌우 여백 및 간격 조정 */}
    
        {/* 자주찾는 질문 섹션 */}
        <div className="flex-1 p-6 flex items-center justify-between ">
            <div className="flex-col"> 
                <h3 className="text-xl font-bold text-gray-800 mb-2">자주찾는 질문</h3>
                <p className="text-sm text-gray-600 mb-1">CJ ONE에 대한 궁금하신 사항을 확인하세요.</p>
                <p className="text-sm text-gray-600">질문에 빠르고 정확한 답변을 제공합니다.</p>
            </div>
    
        {/* 큰 아이콘 (채팅 버블 모양) */}
            <div
                className="w-[62px] h-[62px] bg-no-repeat"
                style={{
                    backgroundImage: "url('https://www.cjone.com/cjmweb/images/common/bg_banner_cs.png')",
                    backgroundPosition: "-62px -62px",
                    backgroundSize: "auto",
                }}
            ></div>
        </div>

        {/* 가운데: 짧은 세로선 */}
        <div className="self-center w-[1px] h-[90px] bg-gray-300"></div>

          {/* 1:1 상담 섹션 */}
          <div className="flex-1 p-6 flex items-center border-l-0 justify-between">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-2">1:1 상담</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 평일 : 다음 날 답변 완료</li>
                <li>• 토요일 공휴일 : 휴일 이후 답변 완료</li>
              </ul>
            </div>
            {/* 큰 아이콘 (모니터 모양) */}
            <div
                className="w-[62px] h-[62px] bg-no-repeat"
                style={{
                  backgroundImage: "url('https://www.cjone.com/cjmweb/images/common/bg_banner_cs.png')",
                  backgroundPosition: "0px 0px",  // 예시 좌표 (실제 픽셀 맞게 수정 필요)
                  backgroundSize: "auto",
                }}
            ></div>
          </div>
        {/* --- 새로 추가되는 부분 끝 --- */}

      </div> {/* 이 닫는 태그는 SignUpPage 컴포넌트의 메인 컨테이너 div를 닫는 태그입니다. */}


    </>
  );
}