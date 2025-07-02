'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ModifyPasswordPage() {
  const router = useRouter();

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newPwdCheck, setNewPwdCheck] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 새 비밀번호 두 개 일치 확인
    if (newPwd !== newPwdCheck) {
      alert('새 비밀번호와 새 비밀번호 확인의 입력값이 같지 않습니다.');
      return;
    }

    // 현재 비밀번호와 새 비밀번호가 동일한지 체크
    if (currentPwd === newPwd && currentPwd === newPwdCheck) {
      alert('현재 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.');
      return;
    }

    // 임시 하드코딩: 현재 비밀번호가 "1234"일 때만 통과
    if (currentPwd !== '1234') {
      alert('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 백엔드 구현 후 아래 fetch 복구 예정
    /*
    const token = localStorage.getItem('accessToken');

    try {
      // 현재 비밀번호 검증 API 호출
      const verifyRes = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: currentPwd }),
      });

      if (!verifyRes.ok) {
        alert('현재 비밀번호가 틀립니다.');
        return;
      }

      // 비밀번호 변경 API 호출
      const changeRes = await fetch('/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: newPwd,
        }),
      });

      if (changeRes.ok) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        router.push('/mypage/user/modifyactinfo');
      } else {
        alert('비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 중 오류:', error);
      alert('서버 오류');
    }
    */

    // ✅ 현재 단계에서는 임시 성공 처리
    alert('비밀번호가 성공적으로 변경되었습니다. (임시 하드코딩 버전)');
    router.push('/mypage/user/modifyactinfo');
  };

  return (
    <div className="max-w-[600px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">비밀번호 변경</h1>
      <p className="text-center text-gray-500 mb-6">
        고객님의 소중한 정보를 보호하기 위해 새로운 비밀번호로 변경 후 서비스를 이용해 주세요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 현재 비밀번호 */}
        <div>
          <label className="block font-semibold mb-1">현재 비밀번호</label>
          <input
            type="password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 새 비밀번호 */}
        <div>
          <label className="block font-semibold mb-1">새 비밀번호</label>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="새 비밀번호를 입력해주세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div>
          <label className="block font-semibold mb-1">새 비밀번호 확인</label>
          <input
            type="password"
            value={newPwdCheck}
            onChange={(e) => setNewPwdCheck(e.target.value)}
            placeholder="새 비밀번호를 재입력해주세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 유의사항 */}
        <div className="bg-gray-50 p-4 text-sm text-gray-600 leading-relaxed">
          <p className="font-bold mb-2">비밀번호 변경 시 유의사항</p>
          <ul className="list-disc list-inside space-y-1">
            <li>영문자, 숫자, 특수문자를 모두 조합하여 8~12자로 입력해주세요.</li>
            <li>사용 가능한 특수 문자는 {'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'} 입니다.</li>
            <li>아이디와 4자리 이상 동일한 비밀번호는 사용 불가합니다.</li>
            <li>연속된 문자/숫자 사용 금지.</li>
            <li>생년월일 등 개인정보 관련 숫자 사용 금지.</li>
          </ul>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-400 rounded text-gray-700"
          >
            나중에
          </button>
          <button type="submit" className="px-6 py-2 bg-black text-white rounded font-bold">
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  );
}
