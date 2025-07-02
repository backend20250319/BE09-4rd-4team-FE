'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ModifyActDetailedPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken'); // 니가 저장한 토큰 키 이름에 맞게 수정!

    try {
      const res = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      // if (res.ok) { 이거로 바꾸기
      if (password == '1234') {
        // 비밀번호 맞음 → 페이지 이동
        router.push('/mypage/user/modifyactinfo/minfodication');
      } else if (res.status === 401) {
        // 비번 틀림
        alert('비밀번호가 옳지 않습니다.');
      } else {
        alert('비밀번호를 입력해주세요.');
      }
    } catch (error) {
      console.error('API 호출 실패:', error);
      alert('네트워크 오류');
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="max-w-[700px] mx-auto px-4 py-12">
      {/* 페이지 제목 */}
      <h1 className="text-3xl font-bold text-center mb-2">회원정보 수정</h1>
      <p className="text-center text-gray-500 mb-6">회원님의 소중한 정보를 안전하게 관리하세요.</p>

      {/* 본문 박스 */}
      <div className="bg-gray-50 border-t border-t-black p-8 text-center">
        {/* 이미지 */}
        <div
          className="w-[89px] h-[89px] bg-no-repeat bg-center bg-cover rounded-full mx-auto"
          style={{
            backgroundImage: `url('https://www.cjone.com/cjmweb/images/common/ico_regi_complete.png')`,
            backgroundPosition: '-301px -205px',
            backgroundSize: 'auto',
          }}
        ></div>

        {/* 안내 문구 */}
        <h2 className="text-xl font-bold mb-2">
          회원정보를 수정하시려면 비밀번호를 입력하셔야 합니다.
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          회원님의 개인정보 보호를 위한 본인 확인 절차이오니, CJ ONE 회원 로그인 시 사용하시는
          비밀번호를 입력해주세요.
        </p>

        {/* 비밀번호 입력 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <div className="flex justify-center space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-400 rounded text-gray-700"
            >
              취소
            </button>
            <button type="submit" className="px-6 py-2 bg-black text-white rounded font-bold">
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
