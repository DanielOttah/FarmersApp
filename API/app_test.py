import pytest
from flask import json
import app
from farmers import Farmers
from products import Food


@pytest.fixture
def client():
    app.app.config['TESTING'] = True
    client = app.app.test_client()

    yield client


def test_root(client):
    rv = client.get('/')
    assert(rv.status_code == 200)
    assert(app.helloWorld() == "Welcome to Farmers' Alley App... Enjoy!")


def test_farmers(client):
    rv = client.get('/farmers')
    assert(rv.status_code == 200)


def test_food(client):
    rv = client.get('/food')
    assert(rv.status_code == 200)
