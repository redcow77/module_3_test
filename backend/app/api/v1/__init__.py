from fastapi import APIRouter

api_router = APIRouter()

# Import and include routers here (will be added in Phase 3)
# from app.api.v1.endpoints import logs, users, settings
# api_router.include_router(logs.router, prefix="/logs", tags=["logs"])
# api_router.include_router(users.router, prefix="/users", tags=["users"])
# api_router.include_router(settings.router, prefix="/settings", tags=["settings"])

@api_router.get("/")
async def api_root():
    return {"message": "API v1 endpoints"}
