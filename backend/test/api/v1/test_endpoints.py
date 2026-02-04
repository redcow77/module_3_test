"""
Tests for API v1 endpoints.
"""
import pytest
from httpx import AsyncClient


@pytest.mark.api
class TestAPIv1Endpoints:
    """Test API v1 base endpoints."""

    async def test_api_root(self, client: AsyncClient):
        """Test API v1 root endpoint."""
        response = await client.get("/api/v1/")

        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "API v1 endpoints"

    async def test_api_v1_accessible(self, client: AsyncClient):
        """Test that API v1 is accessible."""
        response = await client.get("/api/v1/")

        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"

    async def test_invalid_endpoint(self, client: AsyncClient):
        """Test that invalid endpoints return 404."""
        response = await client.get("/api/v1/nonexistent")

        assert response.status_code == 404

    async def test_api_versioning(self, client: AsyncClient):
        """Test that API is properly versioned."""
        # API v1 should work
        response = await client.get("/api/v1/")
        assert response.status_code == 200

        # Non-versioned API paths should not work (404 or redirect)
        response = await client.get("/api/")
        assert response.status_code == 404
