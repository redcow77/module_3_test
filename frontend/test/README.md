# Frontend Test Suite

이 디렉토리는 방화벽 로그 모니터링 시스템 프론트엔드의 테스트 코드를 포함합니다.

## 테스트 프레임워크

- **Jest**: JavaScript 테스트 프레임워크
- **React Testing Library**: React 컴포넌트 테스트
- **@testing-library/jest-dom**: Jest DOM matcher 확장

## 디렉토리 구조

```
test/
├── components/       # 컴포넌트 테스트
│   └── layout/      # 레이아웃 컴포넌트 테스트
├── pages/           # 페이지 컴포넌트 테스트
└── lib/             # 유틸리티 및 라이브러리 테스트
```

## 테스트 실행 방법

### 모든 테스트 실행
```bash
npm test
```

### Watch 모드로 실행 (개발 중 사용)
```bash
npm run test:watch
```

### 커버리지 리포트와 함께 실행
```bash
npm run test:coverage
```

## 테스트 작성 가이드

### 1. 컴포넌트 테스트

컴포넌트 테스트는 다음을 검증해야 합니다:
- 컴포넌트가 올바르게 렌더링되는가
- 적절한 텍스트와 요소가 표시되는가
- props가 올바르게 전달되는가
- 이벤트 핸들러가 올바르게 동작하는가

예시:
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  test('renders component with text', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### 2. API 클라이언트 테스트

API 테스트는 fetch를 모킹하여 진행합니다:
```javascript
global.fetch = jest.fn();

test('makes API call', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'test' })
  });

  const result = await api.get('/endpoint');
  expect(result).toEqual({ data: 'test' });
});
```

### 3. 테스트 명명 규칙

- 테스트 파일명: `[ComponentName].test.js`
- describe 블록: 컴포넌트나 함수 이름
- test 블록: "renders...", "handles...", "calls..." 등 동작을 설명

## 커버리지 목표

- Statements: 80% 이상
- Branches: 75% 이상
- Functions: 85% 이상
- Lines: 80% 이상

## 주의사항

1. 테스트는 독립적이어야 합니다 (각 테스트가 서로 영향을 주지 않음)
2. 외부 의존성은 모킹해야 합니다
3. 사용자 관점에서 테스트를 작성합니다
4. 구현 세부사항보다는 동작을 테스트합니다

## 참고 자료

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
