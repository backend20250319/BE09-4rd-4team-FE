// src/app/layout.jsx
import Header from '../components/Header'; // 헤더 임포트
import Footer from '../components/Footer/Footer'; // 푸터 임포트
import Menu from '../app/menu/Menu';
import '../styles/globals.css'; // 글로벌 CSS 임포트

export default function Layout({ children }) {
  return (
    <html lang="ko">
      <head />
      <body>
        {/* 공통 레이아웃 구성: Header, Main Content (children), Footer */}
        <Header />
        <Menu />
        <main>{children}</main> {/* 각 페이지의 내용이 여기에 들어감 */}
        <Footer />
      </body>
    </html>
  );
}