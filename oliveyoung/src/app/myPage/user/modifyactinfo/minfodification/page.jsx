'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserModificationPage() {
  const [userInfo, setUserInfo] = useState({
    name: '박창준', // TODO: JWT 기반 사용자 정보 API 호출 후 값 채울 예정
    gender: '남자', // TODO: 성별
    birthDate: '1990-01-01', // TODO: 생년월일
    email: 'hong@test.com', // TODO: 이메일
    phone: '010-1234-5678', // TODO: 휴대전화
    smsAgree: true, // TODO: SMS 수신 여부
  });

  const router = useRouter();

  // ✅ TODO: JWT 이용해서 사용자 정보 불러오는 API 예시 (추후 활성화)
  /*
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // 또는 쿠키 기반 인증 사용시 제거

    fetch('/api/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo({
          name: data.name,
          gender: data.gender,
          birthDate: data.birthDate,
          email: data.email,
          phone: data.phone,
          smsAgree: data.smsAgree,
        });
      })
      .catch((error) => {
        console.error('사용자 정보 불러오기 실패:', error);
      });
  }, []);
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ TODO: JWT 이용해서 수정된 사용자 정보 저장하는 API 호출 예시 (추후 활성화)
    /*
    const token = localStorage.getItem('accessToken');

    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      if (res.ok) {
        alert('정보가 성공적으로 저장되었습니다.');
        router.push('/mypage/user/modifyactinfo'); // 저장 후 이동할 페이지 경로
      } else {
        alert('정보 저장 실패');
      }
    } catch (error) {
      console.error('정보 저장 중 에러:', error);
      alert('서버 오류');
    }
    */

    // ✅ 현재 단계에서는 임시 Alert만
    alert('수정된 정보 저장 (추후 API 연동)');
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">회원정보 수정</h1>
      <p className="text-center text-gray-500 mb-6">회원님의 소중한 정보를 안전하게 관리하세요.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본정보 */}
        <section>
          <h2 className="text-xl font-bold border-b pb-2 mb-4">기본 정보</h2>

          {/* 이름 */}
          <div>
            <label className="font-semibold">이름</label>
            <input
              type="text"
              value={userInfo.name}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="font-semibold block mt-4">성별</label>
            <div className="flex space-x-4">
              <label>
                <input type="radio" name="gender" checked={userInfo.gender === '남자'} readOnly />
                남자
              </label>
              <label>
                <input type="radio" name="gender" checked={userInfo.gender === '여자'} readOnly />
                여자
              </label>
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <label className="font-semibold block mt-4">생년월일</label>
            <input
              type="text"
              value={userInfo.birthDate}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="font-semibold block mt-4">이메일</label>
            <input
              type="email"
              value={userInfo.email}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* 휴대전화 */}
          <div>
            <label className="font-semibold block mt-4">휴대전화</label>
            <input
              type="text"
              value={userInfo.phone}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* SMS 수신 여부 */}
          <div className="mt-4">
            <label className="font-semibold block">SMS 수신</label>
            <div className="flex space-x-4">
              <label>
                <input type="radio" name="sms" checked={userInfo.smsAgree === true} readOnly />
                수신 동의
              </label>
              <label>
                <input type="radio" name="sms" checked={userInfo.smsAgree === false} readOnly />
                수신 거부
              </label>
            </div>
          </div>
        </section>

        {/* 선택정보 */}
        <section>
          <h2 className="text-xl font-bold border-b pb-2 mb-4">선택 정보</h2>
          {/* TODO: 마케팅 수신동의 / 선호 카테고리 선택 - 추후 API 연동 */}
          <p className="text-gray-500">선택 정보 영역 (추후 구현)</p>
        </section>

        {/* 정보수정 동의 */}
        <section>
          <h2 className="text-xl font-bold border-b pb-2 mb-4">정보수정 동의</h2>
          {/* TODO: 동의 항목 영역 */}
          <p className="text-gray-500">정보수정 동의 체크 영역 (추후 구현)</p>
        </section>

        {/* 버튼 */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-400 rounded text-gray-700"
          >
            취소
          </button>
          <button type="submit" className="px-6 py-2 bg-black text-white rounded font-bold">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
