"""
Tests for configuration module.
"""
import pytest
from app.core.config import Settings, settings


@pytest.mark.unit
class TestSettings:
    """Test application settings."""

    def test_settings_instance(self):
        """Test that settings instance is created correctly."""
        assert settings is not None
        assert isinstance(settings, Settings)

    def test_api_v1_str(self):
        """Test API v1 string configuration."""
        assert settings.API_V1_STR == "/api/v1"

    def test_project_name(self):
        """Test project name configuration."""
        assert settings.PROJECT_NAME == "Firewall Log Monitor API"
        assert len(settings.PROJECT_NAME) > 0

    def test_version(self):
        """Test version configuration."""
        assert settings.VERSION == "1.0.0"
        assert len(settings.VERSION) > 0

    def test_cors_origins(self):
        """Test CORS origins configuration."""
        assert isinstance(settings.BACKEND_CORS_ORIGINS, list)
        assert len(settings.BACKEND_CORS_ORIGINS) > 0
        assert "http://localhost:3000" in settings.BACKEND_CORS_ORIGINS

    def test_database_url(self):
        """Test database URL configuration."""
        assert settings.DATABASE_URL is not None
        assert "sqlite+aiosqlite" in settings.DATABASE_URL

    def test_security_settings(self):
        """Test security settings configuration."""
        assert settings.SECRET_KEY is not None
        assert len(settings.SECRET_KEY) > 0
        assert settings.ALGORITHM == "HS256"
        assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 30

    def test_custom_settings(self):
        """Test creating custom settings instance."""
        custom_settings = Settings(
            PROJECT_NAME="Custom Project",
            VERSION="2.0.0"
        )
        assert custom_settings.PROJECT_NAME == "Custom Project"
        assert custom_settings.VERSION == "2.0.0"
        # Default values should still be present
        assert custom_settings.API_V1_STR == "/api/v1"
