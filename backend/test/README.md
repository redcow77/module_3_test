# Backend Test Suite

이 디렉토리는 방화벽 로그 모니터링 시스템 백엔드의 테스트 코드를 포함합니다.

## 테스트 프레임워크

- **pytest**: Python 테스트 프레임워크
- **pytest-asyncio**: 비동기 테스트 지원
- **pytest-cov**: 코드 커버리지 측정
- **httpx**: 비동기 HTTP 클라이언트 (FastAPI 테스트용)

## 디렉토리 구조

```
test/
├── conftest.py           # 공통 fixtures 및 설정
├── test_main.py          # 메인 애플리케이션 엔드포인트 테스트
├── api/                  # API 엔드포인트 테스트
│   └── v1/
│       └── test_endpoints.py
├── core/                 # 핵심 모듈 테스트
│   ├── test_config.py    # 설정 테스트
│   └── test_database.py  # 데이터베이스 테스트
└── unit/                 # 단위 테스트 (추가 예정)
```

## 테스트 실행 방법

### 가상환경 활성화
```bash
# Linux/Mac
source venv/bin/activate

# Windows
. venv/Scripts/activate
```

### 기본 테스트 실행
```bash
pytest                    # 모든 테스트 실행
pytest -v                 # verbose 모드
pytest -vv                # 더 자세한 출력
pytest --tb=short         # 짧은 traceback
```

### 커버리지와 함께 실행
```bash
pytest --cov              # 커버리지 리포트
pytest --cov --cov-report=html  # HTML 리포트 생성
```

### 특정 테스트 실행
```bash
pytest test/test_main.py           # 특정 파일
pytest -k "test_health"            # 이름으로 필터링
pytest test/core/                  # 특정 디렉토리
```

### 마커로 필터링
```bash
pytest -m unit            # unit 테스트만
pytest -m api             # API 테스트만
pytest -m integration     # integration 테스트만
```

### Watch 모드 (개발 중)
```bash
pytest-watch              # 파일 변경 감지 시 자동 실행
```

## 테스트 작성 가이드

### 1. 비동기 테스트

FastAPI는 비동기 프레임워크이므로 대부분의 테스트는 비동기로 작성합니다:

```python
import pytest
from httpx import AsyncClient


@pytest.mark.api
async def test_endpoint(client: AsyncClient):
    response = await client.get("/api/v1/endpoint")
    assert response.status_code == 200
```

### 2. Fixtures 사용

`conftest.py`에 정의된 fixtures를 활용합니다:

```python
async def test_with_db(test_db_session):
    # test_db_session fixture 사용
    result = await test_db_session.execute(query)
    assert result is not None
```

### 3. 테스트 클래스 구성

관련된 테스트는 클래스로 그룹화합니다:

```python
@pytest.mark.unit
class TestMyFeature:
    """Test my feature."""

    def test_case_1(self):
        assert True

    async def test_case_2(self, client):
        response = await client.get("/")
        assert response.status_code == 200
```

### 4. 마커 사용

테스트에 적절한 마커를 추가합니다:

```python
@pytest.mark.unit          # 단위 테스트
@pytest.mark.integration   # 통합 테스트
@pytest.mark.api           # API 테스트
```

### 5. 테스트 명명 규칙

- 테스트 파일: `test_*.py`
- 테스트 클래스: `Test*`
- 테스트 함수: `test_*`

예시:
```python
# test_users.py
class TestUserAPI:
    async def test_create_user(self, client):
        ...

    async def test_get_user(self, client):
        ...
```

## Fixtures

### conftest.py에 정의된 주요 fixtures:

#### `client`
- FastAPI 테스트 클라이언트
- 자동으로 테스트 데이터베이스 사용
- 비동기 HTTP 요청 가능

```python
async def test_endpoint(client: AsyncClient):
    response = await client.get("/api/v1/endpoint")
    assert response.status_code == 200
```

#### `test_db_session`
- 테스트 데이터베이스 세션
- 메모리 내 SQLite 사용
- 각 테스트 후 자동 롤백

```python
async def test_database(test_db_session):
    # 데이터베이스 작업
    result = await test_db_session.execute(query)
```

#### `test_db_engine`
- 테스트 데이터베이스 엔진
- 테스트 시작 시 테이블 생성
- 테스트 종료 시 테이블 삭제

## 모킹 (Mocking)

외부 의존성은 pytest-mock 또는 unittest.mock을 사용하여 모킹합니다:

```python
from unittest.mock import patch, AsyncMock


async def test_external_api(client):
    with patch('app.services.external_service.call_api') as mock:
        mock.return_value = {"data": "test"}
        response = await client.get("/api/v1/endpoint")
        assert response.status_code == 200
```

## 커버리지 목표

- Statements: 80% 이상
- Critical paths: 100%
- API endpoints: 95% 이상
- Core modules: 90% 이상

## 주의사항

1. **테스트 격리**: 각 테스트는 독립적이어야 합니다
2. **비동기 처리**: async/await를 올바르게 사용합니다
3. **데이터베이스**: 테스트용 메모리 DB 사용으로 빠른 실행
4. **Fixtures**: 공통 설정은 fixtures로 재사용합니다
5. **명확한 assertions**: 무엇을 테스트하는지 명확하게 작성합니다

## 디버깅

### 상세한 출력
```bash
pytest -vv -s             # print 문 출력
pytest --pdb              # 실패 시 디버거 실행
pytest --lf               # 마지막 실패한 테스트만 실행
```

### 로깅
```bash
pytest --log-cli-level=DEBUG  # 로그 레벨 설정
```

## CI/CD 통합

GitHub Actions나 다른 CI 시스템에서 사용:

```yaml
- name: Run tests
  run: |
    pytest --cov --cov-report=xml
```

## 참고 자료

- [pytest Documentation](https://docs.pytest.org/)
- [pytest-asyncio](https://pytest-asyncio.readthedocs.io/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [httpx Documentation](https://www.python-httpx.org/)
