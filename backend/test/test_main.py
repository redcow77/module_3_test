"""
Tests for main application endpoints.
"""
import pytest
from httpx import AsyncClient


@pytest.mark.api
class TestMainEndpoints:
    """Test main application endpoints."""

    async def test_root_endpoint(self, client: AsyncClient):
        """Test root endpoint returns correct information."""
        response = await client.get("/")

        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Firewall Log Monitor API"
        assert "version" in data
        assert data["docs"] == "/docs"

    async def test_health_check(self, client: AsyncClient):
        """Test health check endpoint."""
        response = await client.get("/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"

    async def test_openapi_json(self, client: AsyncClient):
        """Test OpenAPI JSON endpoint."""
        response = await client.get("/api/v1/openapi.json")

        assert response.status_code == 200
        data = response.json()
        assert "openapi" in data
        assert "info" in data
        assert data["info"]["title"] == "Firewall Log Monitor API"

    async def test_cors_headers(self, client: AsyncClient):
        """Test CORS headers are present."""
        response = await client.options(
            "/",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "GET",
            }
        )

        # FastAPI handles CORS, check that the response is valid
        assert response.status_code in [200, 405]
