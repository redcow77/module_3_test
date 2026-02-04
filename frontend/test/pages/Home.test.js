import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  test('renders main heading', () => {
    render(<Home />);
    const heading = screen.getByText('방화벽 로그 모니터링 시스템');
    expect(heading).toBeInTheDocument();
  });

  test('renders setup complete message', () => {
    render(<Home />);
    const message = screen.getByText('프로젝트 설정 완료');
    expect(message).toBeInTheDocument();
  });

  test('applies correct layout styles', () => {
    const { container } = render(<Home />);
    const mainDiv = container.querySelector('.min-h-screen');
    expect(mainDiv).toHaveClass('flex', 'items-center', 'justify-center');
  });

  test('heading has correct text styles', () => {
    render(<Home />);
    const heading = screen.getByText('방화벽 로그 모니터링 시스템');
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-gray-900', 'mb-4');
  });

  test('message has correct text styles', () => {
    render(<Home />);
    const message = screen.getByText('프로젝트 설정 완료');
    expect(message).toHaveClass('text-gray-600');
  });
});
