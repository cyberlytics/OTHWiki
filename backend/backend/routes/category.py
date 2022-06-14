import pymongo
from dataclasses import asdict
from fastapi import APIRouter, Response,status
from bson.objectid import ObjectId

from backend.models.category import Category
from backend.database import conn
from backend import config

router_category = APIRouter()
#create direct reference to the table in use
db_categories = conn[config.DB_NAME].categories

def get_category_by_id(obj_id:str):
    try:
        return db_categories.find_one({'_id':ObjectId(obj_id)})
    except:
        return None

def get_cateory_by_name(name:str): 
    return db_categories.find_one({'kategorie':name})

@router_category.get('/categories', tags=["Kategorien"])
async def find_all_categories():
    """Get all Kategories from DB and created a nested dict from them"""
    all_kat = list(db_categories.find())
    kategories_tree = []
    
    #convert all objectIds to str, to avoid any TypeConflicts
    for kat in all_kat:
        kat['_id'] = str(kat['_id'])
    #add all categories that have None as parent
    for kat in all_kat:
        if kat['parent_kategorie'] is None:
            kategories_tree.append(get_obj_with_childs(kat,all_kat))
    return kategories_tree

def get_obj_with_childs(obj:dict,all_kats:list):
    """Recursive function that creates a nested dict, where all subkategories are included

    Args:
        obj (dict): Category object
        all_kats (list): List with all Categories that were exctracted from the DB

    Returns:
        dict: nested dict with all subkategories
    """
    output = {
        '_id':obj['_id'],
        'kategorie':obj['kategorie'],
        'subkategorien':[],
        'artikel':obj['artikel']
    }
    for child in obj['subkategorien']:
        for kat in all_kats:
            if child == kat['_id']:
                output['subkategorien'].append(get_obj_with_childs(kat,all_kats)) 
    return output  

@router_category.post('/categories', tags=["Kategorien"])
async def create_category(body: Category):
    """Create a Category in the DB.
    If a parent_id war provided, check if it exists and update parent obj if needed

    Args:
        body (Category): Category-Object. Will be parsed by pydantic
    """
    #If the referenced parent doesn't exist, set parent to None
    parent_kat = body.parent_kategorie  
    parent = get_category_by_id(parent_kat)
    if parent is None:
        body.parent_kategorie = None

    #Insert object in db
    obj = db_categories.insert_one(asdict(body))
    
    #update parent if exists
    #we need to do this after the insert, so that we have the id of the child category
    if parent is not None:
        db_categories.update_one({'_id':ObjectId(parent_kat)}, {"$addToSet":{'subkategorien':str(obj.inserted_id)}})
    return f'Category was created successfully with ID {obj.inserted_id}'


@router_category.get('/categories/{name_or_id}', tags=["Kategorien"])
async def find_category_by_name(name_or_id: str,response:Response):
    """Search for a category by name or by id 

    Args:
        name_or_id (str): Id or Name of the category
    """
    #if parameter can be parsed as an bson.ObjectId, then search by id
    try:
        _ = ObjectId(name_or_id)
        kat = get_category_by_id(name_or_id) 
    #otherwise search by name
    except:
        kat = get_cateory_by_name(name_or_id)
    if kat is not None:
        #bson.ObjectId needs to be converted to str, otherwise this will result in a TypeError
        kat['_id']=str(kat['_id'])
        return kat
    #if no object was found, return with a 400 
    response.status_code = status.HTTP_400_BAD_REQUEST
    return "No Object found"


@router_category.delete('/categories/{obj_id}', tags=["Kategorien"])
async def delete_category(obj_id: str):
    """Delete a category by id. All child categories will be moved upwards

    Args:
        id (int): Id of the category to delete
    """
    try:
        #get object and add children to parent 
        obj = get_category_by_id(obj_id)
        parent = obj['parent_kategorie']
        children = obj['subkategorien']
        #add childs to parent object
        db_categories.update_one(
            {'_id':ObjectId(parent)},
            {"$addToSet":{'subkategorien':{"$each":children}}}
        )
        #remove old cat object from parent 
        #this is a seperate query to the db,because this is required since both query change the same object
        db_categories.update_one(
            {'_id':ObjectId(parent)},
            {"$pull":{'subkategorien':obj_id}}
        )

        #delete it 
        _ = db_categories.delete_one({"_id" : ObjectId(obj_id)})
    finally:
        return f"Category with id {obj_id} was deleted"




