// src/app/layout.jsx
'use client';
import Header from '../components/Header'; // 헤더 임포트
import Footer from '../components/Footer'; // 푸터 임포트
import Menu from '../app/menu/Menu';
import '../styles/globals.css'; // 글로벌 CSS 임포트
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {

  const pathName = usePathname();

   const hideHeaderInSignUp = pathName.startsWith('/user/signup');
   const hideFooterInSignUp = pathName.startsWith('/user/signup');
   const hideMenuInSignUp = pathName.startsWith('/user/signup');

  return (
    <html lang="ko">
      <head />
      <body>
        {/* 공통 레이아웃 구성: Header, Main Content (children), Footer */}
        {!hideHeaderInSignUp && <Header />}
        {!hideMenuInSignUp && <Menu />}
        <main>{children}</main> {/* 각 페이지의 내용이 여기에 들어감 */}
        {!hideFooterInSignUp && <Footer />}
      </body>
    </html>
  );
}