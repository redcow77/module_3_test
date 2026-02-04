import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';

describe('Header Component', () => {
  test('renders header with title', () => {
    render(<Header />);
    const title = screen.getByText('방화벽 로그 모니터링');
    expect(title).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);
    const dashboardLink = screen.getByRole('link', { name: '대시보드' });
    const logsLink = screen.getByRole('link', { name: '로그' });
    const settingsLink = screen.getByRole('link', { name: '설정' });

    expect(dashboardLink).toBeInTheDocument();
    expect(logsLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    render(<Header />);
    const dashboardLink = screen.getByRole('link', { name: '대시보드' });
    const logsLink = screen.getByRole('link', { name: '로그' });
    const settingsLink = screen.getByRole('link', { name: '설정' });

    expect(dashboardLink).toHaveAttribute('href', '/');
    expect(logsLink).toHaveAttribute('href', '/logs');
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-white', 'border-b', 'border-gray-200');
  });
});
