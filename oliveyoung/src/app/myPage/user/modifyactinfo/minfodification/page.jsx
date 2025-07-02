"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordChangeSection from "../../components/PasswordChangeSection";

export default function UserModificationPage() {
  const [userInfo, setUserInfo] = useState({
    id: "hong123", // ✅ 아이디 추가
    name: "박창준",
    gender: "남자",
    email: "hong@test.com",
    phone: "010-1234-5678",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ TODO: 추후 API 연동
    alert("수정된 정보 저장 (추후 API 연동)");
  };

  return (
    <div className="max-w-[700px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">회원정보 수정</h1>
      <p className="text-center text-gray-500 mb-6">
        회원님의 소중한 정보를 안전하게 관리하세요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-xl font-bold border-b pb-2 mb-4">기본 정보</h2>

          <table className="w-full border border-gray-300">
            <tbody>
              {/* 아이디 */}
              <tr className="border-b">
                <th className="text-left px-4 py-2 bg-gray-50 w-32">아이디</th>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={userInfo.id}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                  />
                </td>
              </tr>

              {/* 이름 */}
              <tr className="border-b">
                <th className="text-left px-4 py-2 bg-gray-50">이름</th>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={userInfo.name}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                  />
                </td>
              </tr>

              {/* 성별 */}
              <tr className="border-b">
                <th className="text-left px-4 py-2 bg-gray-50">성별</th>
                <td className="px-4 py-2">
                  <div className="flex space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={userInfo.gender === "남자"}
                        readOnly
                      />
                      남자
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={userInfo.gender === "여자"}
                        readOnly
                      />
                      여자
                    </label>
                  </div>
                </td>
              </tr>

              {/* 이메일 */}
              <tr className="border-b">
                <th className="text-left px-4 py-2 bg-gray-50">이메일</th>
                <td className="px-4 py-2">
                  <input
                    type="email"
                    value={userInfo.email}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                  />
                </td>
              </tr>

              {/* 휴대전화 */}
              <tr className="border-b">
                <th className="text-left px-4 py-2 bg-gray-50">휴대전화</th>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={userInfo.phone}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                  />
                </td>
              </tr>

              {/* ✅ 비밀번호 변경 */}
              <tr>
                <th className="text-left px-4 py-2 bg-gray-50">비밀번호</th>
                <td className="px-4 py-2">
                  <PasswordChangeSection />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ✅ 버튼 */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-400 rounded text-gray-700"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded font-bold"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
