from dataclasses import asdict
from fastapi import APIRouter

from ..schemas.category import categoriesEntity, categoryEntity
from ..models.category import Category
from ..database import conn

router_category = APIRouter()

@router_category.get('/categories/{name}')
async def find_category_by_name(name: str):
    #TODO: In Object Parsen
    x = categoryEntity(conn.local.categories.find_one({"kategorie" : name}))
    return x

@router_category.get('/categories/')
async def find_all_categories():
    #TODO: In Object Parsen
    x = conn.local.categories.find()
    res = categoriesEntity(x)
    print(res)
    print(type(res))
    return res

@router_category.delete('/categories/{id}')
async def delete_category(id: int):

    #x = conn.local.categoreis.find_one({"kategorie_id" : id})
    #if(x == None){
    #}
    x = conn.local.categories.delete_one({"kategorie_id" : id})
    return {"delted articles" : x.deleted_count, "raw_Result" : x.raw_result}


@router_category.post('/categories/')
async def create_category(body: Category):
    print(body)
    print(asdict(body))
    #y = dict(body)
    x = conn.local.categories.insert_one(asdict(body))
    return asdict(body)

@router_category.put('/categories/{id}')
async def add_subcategory(HeaderCat : int, body: Category):
    print("cat", HeaderCat)
    print("body", body)
    return {}



