from dataclasses import asdict
from fastapi import APIRouter
import pymongo

from ..schemas.category import categoriesEntity, categoryEntity
from ..models.category import Category
from ..database import conn

router_category = APIRouter()

@router_category.get('/categories/{name}', tags=["Kategorien"])
async def find_category_by_name(name: str):
    #TODO: In Object Parsen
    x = conn.local.categories.find_one({"kategorie" : name}, {"_id": 0})
    return x

@router_category.get('/categories/', response_model=list[Category], tags=["Kategorien"])
async def find_all_categories():
    x = conn.local.categories.find()

    #list constructor frist dicts nicht list(x)
    lst = []
    for y in x:
        lst.append(y)
    return lst

@router_category.delete('/categories/{id}', tags=["Kategorien"])
async def delete_category(id: int):
    x = conn.local.categories.delete_one({"kategorie_id" : id})
    return {"delted articles" : x.deleted_count, "raw_Result" : x.raw_result}


@router_category.post('/categories/', tags=["Kategorien"])
async def create_category(body: Category):
    print(body)
    print(asdict(body))
    x = conn.local.categories.insert_one(asdict(body))
    return asdict(body)

@router_category.put('/categories/{id}', tags=["Kategorien"])
async def add_subcategory(id : int, subcat: int):
    x = conn.local.categories.find_one({"kategorie_id" : id}, {"_id" : 0})
    print(x)
    print("old", x["subkategorien"])
    newsub = []
    if(x["subkategorien"] is not None):
        newsub = x["subkategorien"]
        newsub.append(subcat)
    else:
        newsub = [subcat]
    x = conn.local.categories.update_one(
    {"kategorie_id" : id},
    {"$set" : {"subkategorien" : newsub}}
    )
    return x.raw_result



