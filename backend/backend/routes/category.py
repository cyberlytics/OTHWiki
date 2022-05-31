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

