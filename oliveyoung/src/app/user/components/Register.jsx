import React, { useState } from 'react';

const RegistrationForm = () => {
  // 폼 데이터를 담을 상태 (state)
  const [formData, setFormData] = useState({
    userName: '', // 이름
    userId: '', // 아이디
    password: '', // 비밀번호
    passwordCheck: '', // 비밀번호 확인
    // birthYear: '', // 생년 (연도)
    // birthMonth: '', // 생월 (월)
    // birthDay: '', // 생일 (일)
    phonePart1: '010', // 휴대폰 번호 앞자리 (기본값 010)
    phonePart2: '', // 휴대폰 번호 중간자리
    phonePart3: '', // 휴대폰 번호 뒷자리
    emailLocal: '', // 이메일 로컬 부분 (예: user)
    emailDomain: '', // 이메일 도메인 부분 (예: example.com)
    receiveMarketingEmail: false, // 마케팅 이메일 수신 동의 여부
    receiveMarketingSMS: false, // 마케팅 SMS 수신 동의 여부
  });

  // 유효성 검사 오류를 담을 상태 (state)
  const [errors, setErrors] = useState({});

  // 입력 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // 체크박스는 checked 값, 그 외는 value 값 사용
    }));
  };

  // 기본적인 클라이언트 측 유효성 검사
  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = '이름을 입력해주세요.';
    if (!formData.userId.trim()) newErrors.userId = '아이디를 입력해주세요.';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';
    if (formData.password.length < 8) newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    if (formData.password !== formData.passwordCheck)
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    // if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) newErrors.birthDate = '생년월일을 선택해주세요.';
    if (!formData.phonePart2.trim() || !formData.phonePart3.trim())
      newErrors.phone = '휴대폰 번호를 입력해주세요.';
    if (!formData.emailLocal.trim() || !formData.emailDomain.trim())
      newErrors.email = '이메일을 입력해주세요.';

    setErrors(newErrors); // 새로운 오류 객체로 상태 업데이트
    return Object.keys(newErrors).length === 0; // 오류가 없으면 true 반환
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지

    if (validateForm()) {
      // 유효성 검사 통과 시
      // 데이터베이스 저장을 위해 휴대폰 번호와 이메일 주소를 합침
      const fullPhoneNumber = `${formData.phonePart1}${formData.phonePart2}${formData.phonePart3}`;
      const fullEmail = `${formData.emailLocal}@${formData.emailDomain}`;

      const dataToSend = {
        userName: formData.userName,
        userId: formData.userId,
        password: formData.password, // 비밀번호는 백엔드에서 해싱될 예정
        // birthDate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`, // YYYY-MM-DD 형식
        phoneNumber: fullPhoneNumber,
        email: fullEmail,
        receiveMarketingEmail: formData.receiveMarketingEmail,
        receiveMarketingSMS: formData.receiveMarketingSMS,
      };

      console.log('제출할 데이터:', dataToSend);

      // --- 중요: 이 부분에서 백엔드 API 호출이 이루어집니다 ---
      try {
        // 예시 API 호출 (실제 API 엔드포인트로 교체 필요)
        const response = await fetch('/api/register', {
          method: 'POST', // POST 요청
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
          },
          body: JSON.stringify(dataToSend), // JavaScript 객체를 JSON 문자열로 변환하여 전송
        });

        if (response.ok) {
          // 응답이 성공적일 경우 (HTTP 상태 코드 200-299)
          const result = await response.json(); // 응답 본문을 JSON으로 파싱
          console.log('회원가입 성공:', result);
          alert('회원가입이 완료되었습니다!');
          // 성공 메시지를 보여주거나 다른 페이지로 리다이렉트
        } else {
          // 응답이 실패했을 경우
          const errorData = await response.json(); // 오류 데이터를 JSON으로 파싱
          console.error('회원가입 실패:', errorData);
          alert(`회원가입 실패: ${errorData.message || '알 수 없는 오류'}`);
          // 백엔드에서 받은 특정 오류 메시지 표시
        }
      } catch (error) {
        // 네트워크 오류 발생 시
        console.error('회원가입 중 네트워크 오류:', error);
        alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      console.log('폼 유효성 검사 실패:', errors);
      alert('입력된 정보를 확인해주세요.');
    }
  };

  // // 연도 옵션 생성을 위한 헬퍼 함수
  // const getYears = () => {
  //     const currentYear = new Date().getFullYear(); // 현재 연도
  //     const years = [];
  //     for (let i = currentYear; i >= currentYear - 100; i--) { // 지난 100년간의 연도
  //         years.push(i);
  //     }
  //     return years;
  // };

  // // 월/일 옵션 생성을 위한 헬퍼 함수
  // const getNumbers = (start, end) => {
  //     const numbers = [];
  //     for (let i = start; i <= end; i++) {
  //         numbers.push(String(i).padStart(2, '0')); // 한 자리 숫자는 앞에 0을 붙여 두 자리로 만듦 (예: 1 -> 01)
  //     }
  //     return numbers;
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* 헤더 / 내비게이션 (스크린샷 참고) */}
      <div className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://www.cjone.com/cjmweb/images/common/logo_cjone.png"
            alt="CJ ONE 로고"
            className="h-6"
          />
          <span className="text-gray-600">TRUE LIFESTYLE MEMBERSHIP</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">건강한 아름다움을 꿈꾸게 하는 브랜드</span>
          <img
            src="https://www.cjone.com/cjmweb/images/common/logo_oliveyoung.png"
            alt="올리브영 로고"
            className="h-6"
          />
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl my-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">회원가입</h1>

        {/* 진행 단계 (스크린샷 참고) */}

        <p className="text-sm text-gray-600 mb-6 text-center">
          라이프스타일 멤버십 CJ ONE! 영화, 쇼핑, 외식 등 다양한 서비스를 즐겁게 카드로 즐기세요~
        </p>

        <form onSubmit={handleSubmit}>
          {/* 기본 정보 섹션 */}
          <div className="mb-8 border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              기본정보
              <span className="text-red-500 text-xs ml-2">*</span>
              <span className="text-sm text-gray-500 ml-auto">
                <span className="text-red-500 text-xs">*</span>
                표시는 필수 입력 항목입니다.
              </span>
            </h2>

            {/* 이름 입력 필드 */}
            <div className="grid grid-cols-3 gap-4 mb-4 items-center">
              <label htmlFor="userName" className="text-gray-700 font-medium flex items-center">
                <span className="text-red-500 text-xs mr-1">*</span> 이름
              </label>
              <div className="col-span-2">
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="이름을 입력해주세요."
                />
                {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
              </div>
            </div>

            {/* 아이디 입력 필드 */}
            <div className="grid grid-cols-3 gap-4 mb-4 items-center">
              <label htmlFor="userId" className="text-gray-700 font-medium flex items-center">
                <span className="text-red-500 text-xs mr-1">*</span> 아이디
              </label>
              <div className="col-span-2 flex space-x-2">
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.id}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="아이디를 입력해주세요."
                />
                <button
                  type="button"
                  className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap hover:bg-gray-800 transition-colors"
                >
                  중복확인
                </button>
              </div>
              {errors.userId && (
                <p className="text-red-500 text-xs col-start-2 col-span-2 mt-1">{errors.userId}</p>
              )}
              <div className="col-start-2 col-span-2 text-sm text-gray-600 mt-1">
                <p>
                  CJ ONE 아이디는 6~12자 이내 영문 소문자, 숫자 조합으로 입력해주세요. (특수문자 및
                  공백 제외)
                </p>
                <p>
                  CJ ONE 통합 아이디로 가입하시면 CJ ONE 홈페이지, 앱, 제휴 브랜드에서 편리하게
                  이용하실 수 있습니다.
                </p>
              </div>
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="grid grid-cols-3 gap-4 mb-4 items-center">
              <label htmlFor="password" className="text-gray-700 font-medium flex items-center">
                <span className="text-red-500 text-xs mr-1">*</span> 비밀번호
              </label>
              <div className="col-span-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="비밀번호를 입력해주세요."
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <div className="text-sm text-gray-600 mt-1">
                  <p>
                    영문 대문자, 영문 소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 10~16자를
                    입력해주세요.
                  </p>
                  <p>
                    생년월일, 전화번호 등 개인정보와 관련된 숫자, 동일 숫자 3자리 이상 반복, 동일
                    문자 4자리 이상 반복은 사용 불가능합니다.
                  </p>
                  <p>아이디와 동일한 비밀번호는 사용 불가능합니다.</p>
                  <p>이전 사용 비밀번호와 동일한 비밀번호는 사용 불가능합니다.</p>
                  <p>비밀번호는 6개월마다 1회씩 변경을 권장합니다.</p>
                </div>
              </div>
            </div>

            {/* 비밀번호 확인 입력 필드 */}
            <div className="grid grid-cols-3 gap-4 mb-4 items-center">
              <label
                htmlFor="passwordCheck"
                className="text-gray-700 font-medium flex items-center"
              >
                <span className="text-red-500 text-xs mr-1">*</span> 비밀번호 확인
              </label>
              <div className="col-span-2">
                <input
                  type="password"
                  id="passwordCheck"
                  name="passwordCheck"
                  value={formData.passwordCheck}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                />
                {errors.passwordCheck && (
                  <p className="text-red-500 text-xs mt-1">{errors.passwordCheck}</p>
                )}
              </div>
            </div>

            {/* 생년월일 선택 필드 
                        <div className="grid grid-cols-3 gap-4 mb-4 items-center">
                            <label className="text-gray-700 font-medium flex items-center">
                                <span className="text-red-500 text-xs mr-1">*</span> 생년월일
                            </label>
                            <div className="col-span-2 flex space-x-2">
                                <select
                                    name="birthYear"
                                    value={formData.birthYear}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    <option value="">년</option>
                                    {getYears().map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <select
                                    name="birthMonth"
                                    value={formData.birthMonth}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    <option value="">월</option>
                                    {getNumbers(1, 12).map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select
                                    name="birthDay"
                                    value={formData.birthDay}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    <option value="">일</option>
                                    {getNumbers(1, 31).map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.birthDate && <p className="text-red-500 text-xs col-start-2 col-span-2 mt-1">{errors.birthDate}</p>}
                            <div className="col-start-2 col-span-2 text-sm text-gray-600 mt-1">
                                <p>만 14세 미만의 어린이는 법정대리인 동의가 필요합니다.</p>
                            </div>
                        </div> */}

            {/* 휴대폰 번호 입력 필드 */}
            <div className="grid grid-cols-3 gap-4 mb-4 items-center">
              <label className="text-gray-700 font-medium flex items-center">
                <span className="text-red-500 text-xs mr-1">*</span> 휴대폰번호
              </label>
              <div className="col-span-2 flex space-x-2">
                <select
                  name="phonePart1"
                  value={formData.phonePart1}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
                <span className="self-center">-</span>
                <input
                  type="text"
                  name="phonePart2"
                  value={formData.phonePart2}
                  onChange={handleChange}
                  maxLength="4"
                  className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <span className="self-center">-</span>
                <input
                  type="text"
                  name="phonePart3"
                  value={formData.phonePart3}
                  onChange={handleChange}
                  maxLength="4"
                  className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs col-start-2 col-span-2 mt-1">{errors.phone}</p>
              )}
              <div className="col-start-2 col-span-2 text-sm text-gray-600 mt-1">
                <p>CJ ONE 포인트 사용, 이벤트 참여 및 경품 배송 등에 활용됩니다.</p>
              </div>
            </div>

            {/* 이메일 입력 필드 */}
            <div className="grid grid-cols-3 gap-4 mb-4 items-center">
              <label className="text-gray-700 font-medium flex items-center">
                <span className="text-red-500 text-xs mr-1">*</span> 이메일
              </label>
              <div className="col-span-2 flex space-x-2 items-center">
                <input
                  type="text"
                  name="emailLocal"
                  value={formData.emailLocal}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <span className="self-center">@</span>
                <input
                  type="text"
                  name="emailDomain"
                  value={formData.emailDomain}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <select
                  name="emailDomainSelect"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, emailDomain: e.target.value }))
                  }
                  className="border border-gray-300 p-2 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <option value="">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="nate.com">nate.com</option>
                  <option value="hotmail.com">hotmail.com</option>
                </select>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs col-start-2 col-span-2 mt-1">{errors.email}</p>
              )}
              <div className="col-start-2 col-span-2 text-sm text-gray-600 mt-1">
                <p>비밀번호 찾기, 본인확인 시에 사용됩니다. (이메일로만 재확인 가능합니다.)</p>
              </div>
            </div>
          </div>

          {/* 선택 정보 섹션 */}
          <div className="mb-8 border-t pt-6"></div>

          {/* 제출 버튼 */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="button"
              onClick={() => window.history.back()} // 기본적인 뒤로가기 기능
              className="bg-gray-300 text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-400 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
            >
              가입
            </button>
          </div>
        </form>

        {/* 이용 안내 / 푸터 링크 */}
        <div className="mt-12 text-gray-600 text-sm border-t pt-6">
          <h3 className="font-bold mb-2">이용안내</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              CJ ONE 회원이 되시면 CJ ONE 웹사이트에서 풍부한 정보와 서비스를 이용하실 수 있습니다.
            </li>
            <li>
              개인정보 수집 및 활용 동의에 자세한 내용은{' '}
              <a href="#" className="text-blue-600 hover:underline">
                개인정보처리방침
              </a>
              을 확인하실 수 있습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
