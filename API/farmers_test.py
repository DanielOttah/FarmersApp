import pytest
from flask import json
import app
from farmers import Farmers, buildDict
from products import Food

dictnry = (101, 'Jane', 'Calgary', '777-999-888', -125, 144)


@pytest.fixture
def client():
    app.app.config['TESTING'] = True
    client = app.app.test_client()

    yield client


def test_build_dict(client):
    assert(buildDict(dictnry).json() == {'name': 'Jane',
                                         'address': 'Calgary',
                                         'contact': '777-999-888',
                                         'latitude': 144,
                                         'longitude': -125})
