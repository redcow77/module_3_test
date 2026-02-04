import { render, screen } from '@testing-library/react';
import MainLayout from '@/components/layout/MainLayout';

describe('MainLayout Component', () => {
  test('renders children content', () => {
    render(
      <MainLayout>
        <div data-testid="test-content">Test Content</div>
      </MainLayout>
    );

    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  test('renders Header component', () => {
    render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>
    );

    const header = screen.getByText('방화벽 로그 모니터링');
    expect(header).toBeInTheDocument();
  });

  test('renders Sidebar component', () => {
    render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>
    );

    const sidebarLink = screen.getByRole('link', { name: '로그 모니터링' });
    expect(sidebarLink).toBeInTheDocument();
  });

  test('applies correct layout structure', () => {
    const { container } = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>
    );

    const mainContainer = container.querySelector('.min-h-screen.bg-gray-50');
    expect(mainContainer).toBeInTheDocument();

    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).toBeInTheDocument();

    const mainElement = container.querySelector('main');
    expect(mainElement).toHaveClass('flex-1', 'p-6');
  });
});
