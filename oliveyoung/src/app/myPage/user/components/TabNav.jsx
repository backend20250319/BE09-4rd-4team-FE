'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabNav() {
  const pathname = usePathname();

  const isDeliveryPage = pathname.includes('/mypage/user/getdeliveryinfo');
  const isRefundPage = pathname.includes('/mypage/user/getrfdactlist');

  return (
    <ul className="flex text-center w-full h-[51.6px] text-[18px] leading-[20px] text-[#666] tracking-[-0.04em] list-none overflow-hidden">
      <li
        className={`flex items-center justify-center w-1/2 border-b-[2px] ${
          isDeliveryPage
            ? 'border-t-[2px] border-r-[2px] border-l-0 border-t-[#9bce26] border-r-[#9bce26] bg-white font-bold'
            : 'border-b-[#9bce26] border-b-[2px] bg-[#f6f6f6]'
        } text-center`}
      >
        <Link href="/mypage/user/getdeliveryinfo">배송지</Link>
      </li>
      <li
        className={`flex items-center justify-center w-1/2 border-b-[2px] ${
          isRefundPage
            ? 'border-t-[2px] border-r-[2px] border-l-0 border-t-[#9bce26] border-l-[#9bce26] bg-white font-bold'
            : 'border-b-[#9bce26] border-b-[2px] bg-[#f6f6f6]'
        } text-center`}
      >
        <Link href="/mypage/user/getrefundaccountinfo">환불계좌</Link>
      </li>
    </ul>
  );
}
