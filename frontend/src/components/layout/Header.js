import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            방화벽 로그 모니터링
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">대시보드</Link></li>
              <li><Link href="/logs" className="text-gray-600 hover:text-gray-900">로그</Link></li>
              <li><Link href="/settings" className="text-gray-600 hover:text-gray-900">설정</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
