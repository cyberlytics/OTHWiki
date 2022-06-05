import backend
from backend import config
from tests import examples

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
    response = client.get('/categories')
    assert response.status_code == 200
    assert response.json() == []


def test_insert_and_delete_category():
    """Test that a category was created successfully and is available in DB"""
    #create category
    response = client.post('/categories', json = examples.category)
    assert response.status_code ==200
    
    #check that it's available
    response = client.get('/categories')
    assert response.status_code == 200
    assert len(response.json()) == 1 
    assert response.json()[0]['kategorie'] == examples.category['kategorie']

    #try to find it by ID
    obj_id = response.json()[0]['_id']
    response = client.get(f'/categories/{obj_id}')
    assert response.status_code == 200
    assert response.json()['kategorie'] == examples.category['kategorie']

    #delete cat
    response = client.delete(f'/categories/{obj_id}')
    assert response.status_code == 200
    assert response.json() == f"Category with id {obj_id} was deleted"

    #check that no cat is left 
    response = client.get('/categories')
    assert response.status_code == 200
    assert response.json() == []

    #check that id was also deleted 
    response = client.get(f'/categories/{obj_id}')
    assert response.status_code == 400
    assert response.json() == "No Object found"


def test_insert_category_list():
    """Insert multiple categories on a flat hierarchy"""
    #insert multiple categories
    id_list = []
    for kategorie in examples.category_list:
        response = client.post('/categories', json = {"kategorie": kategorie})
        assert response.status_code == 200
        assert response.json().startswith("Category was created successfully with ID ")
        id_list.append(response.json().replace("Category was created successfully with ID ",""))
    #check if all are saved in DB
    response = client.get('/categories')
    assert response.status_code == 200
    #len should be the length of the inserted list + 1 from the test before
    assert len(response.json()) ==  len(examples.category_list)

    #delete all categories
    for kat_id in id_list:
        response = client.delete(f'/categories/{kat_id}')
        assert response.status_code == 200
        assert response.json() == f"Category with id {kat_id} was deleted"

    #check that no cat is left 
    response = client.get('/categories')
    assert response.status_code == 200
    assert response.json() == []


def test_insert_nested_categories():
    """Insert Nested Categories"""
    #the id_list is used for setting the next parent (and deleting every categorie after the test)
    #The parent of the first cat is non existent, thus we can use a random string and also test how it handles the corrupt data
    id_list = ['randomStringForFirstInsert']
    for kategorie in examples.category_list:
        response = client.post('/categories', json = {"kategorie": kategorie,
                                            'parent_kategorie':id_list[-1]})
        
        assert response.status_code == 200
        assert response.json().startswith("Category was created successfully with ID ")
        id_list.append(response.json().replace("Category was created successfully with ID ",""))

    #len should be only 1, because the other categories are nested inside them
    response = client.get('/categories')
    assert response.status_code == 200
    assert len(response.json()) == 1 
    
    #check the tree structure
    assert response.json()[0]['kategorie'] == examples.category_list[0]
    assert response.json()[0]['subkategorien'][0]['kategorie'] == examples.category_list[1]
    assert response.json()[0]['subkategorien'][0]['subkategorien'][0]['kategorie'] == examples.category_list[2]
    #...
    assert response.json()[0]['subkategorien'][0]['subkategorien'][0]['subkategorien'][0]['subkategorien'][0]['kategorie'] == examples.category_list[4]

    #delete category from the middle 
    response = client.delete(f'/categories/{id_list[3]}')
    assert response.status_code == 200
    assert response.json() == f"Category with id {id_list[3]} was deleted"

    #check that the last element moved upwards
    #which means that one ['subkategorien'][0] is gone :D
    response = client.get('/categories')
    assert response.status_code == 200
    assert len(response.json()) == 1 
    assert response.json()[0]['subkategorien'][0]['subkategorien'][0]['subkategorien'][0]['kategorie'] == examples.category_list[4]

    #delete all other categories
    for kat_id in id_list:
        response = client.delete(f'/categories/{kat_id}')
    #check that no cat is left 
    response = client.get('/categories')
    assert response.status_code == 200
    assert response.json() == []

##############################################
#--------------ARTICLE ROUTES-----------------
##############################################
def test_insert_and_delete_article():
    """Test that an articel was created successfully"""
    #create a category that will hold the articles
    response = client.post('/categories', json = examples.category)
    assert response.status_code ==200
    assert response.json().startswith("Category was created successfully with ID ")
    category_id = response.json().replace("Category was created successfully with ID ","")

    article_data = examples.article
    article_data['category'] = category_id

    #TODO


##############################################
#----------------TEARDOWN---------------------
##############################################
def teardown_module(module):
    """Remove collection if some test failed. 
    (Best Case: all objects are removed by the test of the DELETE routes)
    If the DB connection fails, this method will also fail"""
    backend.database.conn['test_table'].articles.drop()
    backend.database.conn['test_table'].categories.drop()