import backend
from backend import config
from tests import category_examples

import pytest
import pymongo
from fastapi import FastAPI
from fastapi.testclient import TestClient



client = TestClient(backend.app)
##############################################
#----------------SETUP------------------------
##############################################
def setup_module(module):
    """Clear the test_table and change the used db table of the backend to this test_table
    This is needed, so that tests don't interfere with other data"""
    print('Clear Table test_table')
    backend.database.conn['test_table'].articles.drop()
    backend.database.conn['test_table'].categories.drop()

    print("Setting the DB Table to 'test_table'")
    backend.article_routes.db_articles = backend.database.conn['test_table'].articles
    backend.category_routes.db_categories= backend.database.conn['test_table'].categories

##############################################
#----------------BASIC TESTS------------------
##############################################
def test_db_connection():
    """First step is to check if a database connection could be established"""
    try:
        backend.database.conn.server_info()
    except pymongo.errors.ServerSelectionTimeoutError:
        #if the server_info() method throws a Timeout Exception -> Test Failed
        assert False, f'App started without DB Connection'

def test_base_path():
    """GET('/') should return a simple string"""
    response = client.get('/')
    assert response.status_code == 200
    assert response.json() == f"OTH-Wiki, Version: {config.VERSION}"

##############################################
#--------------CATEGORY ROUTES----------------
##############################################
def test_category_route_empty():
    """No category is existing, thus an empyt object should be returned"""
    response = client.get('/categories/')
    assert response.status_code == 200
    assert response.json() == []

def test_insert_category1():
    """Test that a category was created successfully and is available in DB"""
    #create category
    response = client.post('/categories/', json = category_examples.category1)
    assert response.status_code ==200
    
    #check that it's available
    response = client.get('/categories/')
    assert response.status_code == 200
    assert len(response.json()) == 1
    #check if optional fields were added 
    #assert response.json() == [category_examples.category1_after_insert]

##############################################
#--------------ARTICLE ROUTES-----------------
##############################################
def test_insert_article():
    """Test that an articel was created successfully"""
    pass

##############################################
#----------------TEARDOWN---------------------
##############################################
def teardown_module(module):
    """Remove collection if some test failed. 
    (Best Case: all objects are removed by the test of the DELETE routes)
    If the DB connection fails, this method will also fail"""
    backend.database.conn['test_table'].articles.drop()
    backend.database.conn['test_table'].categories.drop()