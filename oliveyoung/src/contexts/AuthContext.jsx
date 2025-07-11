'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  // 앱 시작 시 localStorage 값으로 초기화
  const [hydrated, setHydrated] = useState(false);

  // 1️⃣ CSR 환경 여부 플래그
  useEffect(() => {
    setHydrated(true);
  }, []);

  // 2️⃣ localStorage는 CSR 이후에 접근
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const name = localStorage.getItem('userName');
      setIsLoggedIn(!!token);
      setAccessToken(token || '');
      setUserName(name || '');
    }
  }, []);

  const login = (accessToken, refreshToken, userName) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userName', userName);
    setAccessToken(accessToken);
    setIsLoggedIn(true);
    setUserName(userName);
  };

  const logout = () => {
    setIsLoggingOut(true); // 로딩 시작

    setTimeout(() => {
      // 토큰 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userName');

      // 상태 업데이트
      setIsLoggedIn(false);
      setUserName('');
      setAccessToken('');

      setIsLoggingOut(false); // 로딩 끝

      router.push('/');
    }, 500);
  };

  const logoutSilently = () => {
    setIsLoggingOut(true); // 로딩 시작

    setTimeout(() => {
      // 토큰 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userName');

      // 상태 업데이트
      setIsLoggedIn(false);
      setUserName('');
      setAccessToken('');

      setIsLoggingOut(false); // 로딩 끝
    }, 500);
  };

  if (!hydrated) return null; // SSR에서는 아무 것도 렌더링하지 않음

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        accessToken,
        setIsLoggedIn,
        setUserName,
        login,
        logout,
        logoutSilently,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
