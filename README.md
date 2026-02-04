# 방화벽 로그 모니터링 시스템

Firewall Log Monitoring Web Admin - 프로젝트 초기 설정 완료 ✅

## Quick Start

### Frontend (Next.js)
```bash
cd frontend
npm run dev
```
🌐 http://localhost:3000

### Backend (FastAPI)
```bash
cd backend
venv\Scripts\python.exe -m uvicorn app.main:app --reload
```
🌐 http://localhost:8000
📚 http://localhost:8000/docs

## Tech Stack

### Frontend
- **Framework:** Next.js 15.5.11 (App Router)
- **UI:** React 19.0.0 + Tailwind CSS 3.4+
- **Language:** JavaScript

### Backend
- **Framework:** FastAPI 0.128.0
- **Database:** SQLite + SQLAlchemy 2.0.46 (Async)
- **Language:** Python 3.14.2

## Project Status

✅ **Phase 1 Complete** - Project Setup
- Frontend initialized with Next.js + Tailwind CSS
- Backend initialized with FastAPI + SQLite
- Layout components created
- API client utility ready
- Database auto-creation configured

⏳ **Phase 2 Next** - Database Models & API Endpoints

## Key Features (Planned)

1. 실시간 방화벽 로그 모니터링
2. 로그 검색 및 필터링
3. 통계 대시보드
4. 사용자 관리
5. 알림 설정

## API Endpoints (Available)

- `GET /` - API 정보
- `GET /health` - 헬스 체크
- `GET /api/v1` - API v1 루트
- `GET /docs` - API 문서 (Swagger)
- `GET /redoc` - API 문서 (ReDoc)

## Documentation

- `CLAUDE.md` - 프로젝트 가이드 및 Claude Code 지침
- `test_setup.md` - 설정 검증 가이드
- `IMPLEMENTATION_COMPLETE.md` - 구현 완료 상세 문서

## Development Commands

### Frontend
```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

### Backend
```bash
# 개발 서버 (자동 리로드)
venv\Scripts\python.exe -m uvicorn app.main:app --reload

# 프로덕션 서버
venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Directory Structure

```
Module_3/
├── frontend/          # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/      # 페이지 및 레이아웃
│   │   ├── components/  # 재사용 컴포넌트
│   │   └── lib/      # 유틸리티 (API 클라이언트 등)
│   └── ...
└── backend/          # FastAPI 백엔드
    ├── app/
    │   ├── main.py   # FastAPI 앱
    │   ├── core/     # 설정 및 DB
    │   ├── api/      # API 라우트
    │   ├── models/   # DB 모델 (TBD)
    │   └── schemas/  # Pydantic 스키마
    └── database/     # SQLite DB
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
API_V1_STR=/api/v1
PROJECT_NAME=Firewall Log Monitor API
DATABASE_URL=sqlite+aiosqlite:///./database/firewall_logs.db
SECRET_KEY=change-this-to-a-secure-random-string-in-production
```

## Notes

- Backend은 시작 시 자동으로 database/firewall_logs.db 생성
- Frontend는 Next.js config의 rewrites로 API 프록시 구성
- CORS는 localhost:3000, localhost:8000 허용
- 모든 설정 파일 및 기본 구조 완성

---

**Last Updated:** 2026-02-04
**Status:** ✅ Ready for Development
