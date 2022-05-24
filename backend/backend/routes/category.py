from fastapi import APIRouter

from ..models.category import Category
from ..database import conn

router_category = APIRouter()

@router_category.get('/categories/{name}')
async def find_all_categories(name: str):
    x = conn.local.categories.find_one({"kategorie" : name})
    print(name)
    print (x)
    return x

