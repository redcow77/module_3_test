import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              대시보드
            </Link>
          </li>
          <li>
            <Link href="/logs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              로그 모니터링
            </Link>
          </li>
          <li>
            <Link href="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              로그 분석
            </Link>
          </li>
          <li>
            <Link href="/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              사용자 관리
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              설정
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
