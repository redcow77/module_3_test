import { render, screen } from '@testing-library/react';
import Sidebar from '@/components/layout/Sidebar';

describe('Sidebar Component', () => {
  test('renders sidebar navigation', () => {
    const { container } = render(<Sidebar />);
    const sidebar = container.querySelector('aside');
    expect(sidebar).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    render(<Sidebar />);
    const dashboardLink = screen.getByRole('link', { name: '대시보드' });
    const logsLink = screen.getByRole('link', { name: '로그 모니터링' });
    const analyticsLink = screen.getByRole('link', { name: '로그 분석' });
    const usersLink = screen.getByRole('link', { name: '사용자 관리' });
    const settingsLink = screen.getByRole('link', { name: '설정' });

    expect(dashboardLink).toBeInTheDocument();
    expect(logsLink).toBeInTheDocument();
    expect(analyticsLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    render(<Sidebar />);
    const dashboardLink = screen.getByRole('link', { name: '대시보드' });
    const logsLink = screen.getByRole('link', { name: '로그 모니터링' });
    const analyticsLink = screen.getByRole('link', { name: '로그 분석' });
    const usersLink = screen.getByRole('link', { name: '사용자 관리' });
    const settingsLink = screen.getByRole('link', { name: '설정' });

    expect(dashboardLink).toHaveAttribute('href', '/');
    expect(logsLink).toHaveAttribute('href', '/logs');
    expect(analyticsLink).toHaveAttribute('href', '/analytics');
    expect(usersLink).toHaveAttribute('href', '/users');
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });

  test('applies correct CSS classes to sidebar', () => {
    const { container } = render(<Sidebar />);
    const sidebar = container.querySelector('aside');
    expect(sidebar).toHaveClass('w-64', 'bg-white', 'border-r', 'border-gray-200', 'min-h-screen');
  });
});
