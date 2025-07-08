"use client";

import React, { useState } from "react";

export default function PasswordChangeSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* 비밀번호 변경 버튼 */}
      <button
        type="button"
        onClick={handleToggle}
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
      >
        변경하기 &gt;
      </button>

      {/* 펼쳐지는 영역 */}
      {isOpen && (
        <div className="mt-4 border border-gray-200 rounded p-4 bg-gray-50">
          {/* 새 비밀번호 입력 */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {/* 안내 문구 */}
            <ul className="text-xs text-gray-600 mt-2 space-y-1 leading-5">
              <li>
                영문자, 숫자, 특수문자를 모두 조합하여 8~12자를 입력해주세요.
              </li>
              <li>{`사용 가능 특수문자: !#%$&()*+,-./:;<=>?@[\\]^_\`{|}~`}</li>
              <li>아이디와 4자 이상 동일한 비밀번호는 사용 불가합니다.</li>
              <li>동일문자를 4번 이상 연속 사용 불가합니다.</li>
              <li>4자리 이상 연속되는 숫자/문자 불가합니다.</li>
              <li>휴대전화번호와 4자 이상 동일한 비밀번호 불가합니다.</li>
            </ul>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="font-semibold block mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 재입력해주세요."
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
