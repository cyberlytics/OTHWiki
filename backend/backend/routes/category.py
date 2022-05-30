from fastapi import APIRouter

from ..models.category import Category
from ..database import conn

router_category = APIRouter()

@router_category.get('/categories/{name}')
async def find_all_categories(name: str):
    #TODO: In Object Parsen
    x = conn.local.categories.find_one({"kategorie" : name} , {'_id' : 0})
    print(name)
    print(type(x))
    print (x)
    return x


