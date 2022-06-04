import backend
from backend import config

from fastapi import FastAPI
from fastapi.testclient import TestClient

client = TestClient(backend.app)

def test_base_path():
    """GET('/') should return a simple string"""
    response = client.get('/')
    assert response.status_code == 200
    assert response.json() == f"OTH-Wiki, Version: {config.VERSION}"

