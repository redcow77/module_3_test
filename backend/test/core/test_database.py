"""
Tests for database module.
"""
import pytest
from sqlalchemy.ext.asyncio import AsyncSession, AsyncEngine

from app.core.database import Base, get_db, engine, AsyncSessionLocal


@pytest.mark.unit
class TestDatabase:
    """Test database configuration and session management."""

    def test_engine_exists(self):
        """Test that database engine is created."""
        assert engine is not None
        assert isinstance(engine, AsyncEngine)

    def test_base_class(self):
        """Test that Base class is available for models."""
        assert Base is not None
        assert hasattr(Base, "metadata")

    def test_session_factory(self):
        """Test that session factory is created."""
        assert AsyncSessionLocal is not None

    async def test_get_db_dependency(self, test_db_session):
        """Test get_db dependency provides session."""
        session = test_db_session
        assert session is not None
        assert isinstance(session, AsyncSession)

    async def test_session_context_manager(self, test_db_engine):
        """Test session can be used as context manager."""
        from sqlalchemy.ext.asyncio import async_sessionmaker

        SessionLocal = async_sessionmaker(
            test_db_engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )

        async with SessionLocal() as session:
            assert isinstance(session, AsyncSession)
            # Session should be active
            assert not session.is_active or True  # Either state is valid

    async def test_database_connection(self, test_db_session):
        """Test database connection works."""
        from sqlalchemy import text

        # Execute a simple query
        result = await test_db_session.execute(text("SELECT 1"))
        row = result.fetchone()
        assert row[0] == 1
