// 예: src/app/layout.jsx
import Header from '../../components/Header'; // 절대/상대경로로 조정
import Footer from '../../components/Footer';
import '../../styles/globals.css'; // tailwind 등 공통 스타일

export default function Layout({ children }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}