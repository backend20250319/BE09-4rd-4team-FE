// 예: src/app/layout.jsx
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