import './globals.css';

export const metadata = {
  title: 'Firewall Log Monitor',
  description: 'Firewall log monitoring admin panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
