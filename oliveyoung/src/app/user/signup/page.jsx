// signup/page.jsx
'use client';

import { useState } from 'react';
import RegistrationForm from '../components/Register';
import AlreadySignedUp from '../components/AlreadySignedUp'; // 새로 만든 컴포넌트 임포트
// SignUpHeader와 SignUpFooter도 필요하다면 임포트하여 사용하세요.
// import SignUpHeader from '../components/SignUpHeader';
// import SignUpFooter from '../components/SignUpFooter';

export default function SignUpPage() {
  const [userName, setUserName] = useState('');
  // const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(null); // API 결과: 회원이면 true, 아니면 false

  const maskName = (userName) => {
    if (userName.length < 2) return userName;
    if (userName.length === 2) return userName[0] + '*';
    return userName[0] + '*'.repeat(userName.length - 2) + userName[name.length - 1];
  };

  const formatPhoneNumber = (number) => {
    if (number.length < 4) return number;
    if (number.length < 8) return `${number.slice(0, 3)}-${number.slice(3)}`;
    return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsDuplicate(null);

    try {
      const response = await fetch('/user/checkduplicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, phone }),
      });

      if (!response.ok) {
        throw new Error('서버 오류 발생');
      }

      const result = await response.json(); // 한 번만 파싱

      const isDuplicate = result.data?.isDuplicate;

      setIsDuplicate(isDuplicate);

      if (isDuplicate) {
        setUserName(maskName(userName)); // 이름 마스킹 예: 박준서 → 박*서
      }
    } catch (err) {
      console.error(err);
      setError('회원 여부 확인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* <SignUpHeader /> // 헤더 컴포넌트가 있다면 여기에 배치 */}

      <div className="max-w-4xl w-full mx-auto py-10 px-4 md:px-8">
        <h1 className="text-center text-4xl md:text-5xl font-cj mb-6 mt-8">회원가입</h1>{' '}
        {/* 폰트 크기 조정 */}
        {/* 1단계 진행 바 (이미지 참고하여 스텝 표시) */}
        <div className="flex justify-center items-center my-10">
          <div className="flex flex-col items-center mx-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              1
            </div>
            <p className="mt-2 text-sm text-orange-500 font-semibold">회원가입 여부</p>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 mx-2"></div>
          <div className="flex flex-col items-center mx-4 text-gray-500">
            <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
              2
            </div>
            <p className="mt-2 text-sm">회원정보 입력</p>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 mx-2"></div>
          <div className="flex flex-col items-center mx-4 text-gray-500">
            <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
              3
            </div>
            <p className="mt-2 text-sm">가입완료</p>
          </div>
        </div>
        {/* 회원 여부 확인 결과에 따른 조건부 렌더링 */}
        {isDuplicate === true ? (
          <AlreadySignedUp userName={name} /> // 이미 회원이면 AlreadySignedUp 컴포넌트 렌더링
        ) : isDuplicate === false ? (
          // 가입 가능한 사용자일 경우 다음 단계로 이동하는 UI
          <RegistrationForm />
        ) : (
          <>
            <p className="text-center mb-11 text-gray-600">
              통합 아이디로 CJ ONE 브랜드 혜택도 받고! 포인트도 쌓고!
            </p>

            <section className="mb-8 border p-4 rounded bg-gray-50">
              {' '}
              {/* 배경색 추가 */}
              <h2 className="text-xl font-semibold mb-2">회원가입 여부 안내</h2>
              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                {' '}
                {/* 리스트 스타일 추가 */}
                <li>
                  기존 회원가입 정보와 일치하는 정보를 입력해야 회원가입 여부를 정확하게 확인할 수
                  있습니다.
                </li>
                <li>
                  올리브영, CJ더마켓, CJ온스타일, CJ문화재단 등에서는 전자상거래에 의거하여 만 14세
                  미만의 어린이/학생의 회원가입을 제한합니다.
                </li>
                <li>
                  외국인 회원가입 시에는 국내에서 발급된 외국인 등록증/신분증 정보를 입력해주세요.
                </li>
              </ul>
            </section>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="이름을 입력해주세요."
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required // 필수 입력 필드
              />

              {/* <input
                type="text"
                placeholder="법정생년월일 6자리를 입력해주세요. (예: 900101)"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                value={birth}
                onChange={(e) =>
                  setBirth(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
                } // 숫자만, 6자리 제한
                required
              />*/}
              <input
                type="text"
                placeholder="휴대전화번호 10~11자리를 입력해주세요. ('-' 제외, 예: 01012345678)"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                value={formatPhoneNumber(phone)} // 표시할 값은 하이픈 추가된 형식
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                  setPhone(onlyNumbers);
                }}
                required
              />

              <button
                type="submit"
                disabled={loading || !userName || !phone} // 모든 필드가 채워져야 버튼 활성화
                className="w-full bg-orange-500 text-white p-3 rounded-md font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? '확인 중...' : '가입여부 확인'}
              </button>
            </form>

            {/* API 호출 결과 메시지 (에러만 표시, isDuplicate는 UI로 처리) */}
            {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
          </>
        )}
        {/* 자주 묻는 질문, 1:1 상담, 마이페이지 정보 (이미지에 맞춰 하단에 배치) */}
        {isDuplicate === null && ( // 이 부분은 초기 상태일 때만 보이도록 (선택 사항)
          <div className="grid md:grid-cols-3 gap-6 mt-12 mb-16 text-center">
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
              <span className="text-4xl text-gray-600 mb-2">🤔</span>
              <h3 className="font-semibold text-lg mb-1">자주 묻는 질문</h3>
              <p className="text-sm text-gray-500">CJ ONE 이란? 자주 묻는 질문을 확인하세요.</p>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
              <span className="text-4xl text-gray-600 mb-2">💬</span>
              <h3 className="font-semibold text-lg mb-1">1:1 상담</h3>
              <p className="text-sm text-gray-500">궁금한 점은 1:1 상담을 이용해주세요.</p>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
              <span className="text-4xl text-gray-600 mb-2">💻</span>
              <h3 className="font-semibold text-lg mb-1">마이페이지</h3>
              <p className="text-sm text-gray-500">회원정보 확인/수정, 포인트 내역 등</p>
            </div>
          </div>
        )}
      </div>

      {/* <SignUpFooter /> // 푸터 컴포넌트가 있다면 여기에 배치 */}
    </div>
  );
}
