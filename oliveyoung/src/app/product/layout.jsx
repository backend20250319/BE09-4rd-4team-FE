// 예: src/app/layout.jsx
import '../../styles/globals.css'; // tailwind 등 공통 스타일

export default function Layout({ children }) {
  return (
      <body>
        <main>{children}</main>
      </body>
  );
}