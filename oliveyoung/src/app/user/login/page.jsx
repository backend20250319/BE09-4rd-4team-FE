'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const LoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

 try {
    // TODO: 나중에 아래 주석 풀고 실제 axios 호출할 것
    // const response = await axios.post('http://localhost:8080/api/v1/user-service/auth/login', { userId, password });

    // ---- 임시 더미 성공 처리 ----
    if (userId === 'test' && password === '1234') {
      router.push('/');
    } else {
      alert('아이디 혹은 비밀번호를 잘못 입력하셨습니다.');
    }
  } catch (err) {
    console.error('로그인 실패', err);
    alert('아이디 혹은 비밀번호를 잘못 입력하셨습니다.');
  }
};

  return (
    <div className="max-w-md mx-auto mt-12 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="CJ ONE 통합회원 아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
        />

        <input
          type="password"
          placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">아이디 저장</label>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          로그인
        </button>
      </form>

      <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-600">
        <a href="#" className="hover:underline">아이디 찾기</a>
        <span>|</span>
        <a href="#" className="hover:underline">비밀번호 찾기</a>
      </div>
      
      <div className="flex justify-between items-center mt-8 p-4">
        {/* 왼쪽: 로고 + 설명 */}
        <div >
          <img
            src="https://static.oliveyoung.co.kr/pc-static-root/image/login/ico_cjone_230828.png"
            alt="CJ ONE 로고 이미지"
            className="mr-4 w-40 "
          />
          <p className="text-sm text-gray-600 leading-relaxed ">
          CJ ONE 통합회원으로 가입하고<br />올리브영에서 편안한 쇼핑하세요
          </p>
        </div>

        {/* 오른쪽: 회원가입 버튼 */}
        <button
          type="button"
          className="border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-100 min-w-[116px] text-center mt-16" 
          onClick={() => router.push('/user/signup')}
        >
          회원가입
        </button>
      </div>

    </div>

    
  );
};

export default LoginPage;
