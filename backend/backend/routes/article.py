from dataclasses import asdict
from fastapi import APIRouter

#from backend.backend.models.category import Category

from ..models.article import Article
from ..database import conn
from ..schemas.article import articleEntity, articlesEntity

from backend import config

import json

router_article = APIRouter()

#create direct reference to the table in use
db_articles = conn[config.DB_NAME].articles

@router_article.get('/articles', response_model=list[Article], tags=["Artikel"])
async def find_all_articles():
    #TODO: in Objekt paresen
    #return {'ar' : 'ar'}
    x = db_articles.find()

    lst = []
    for y in x:
        lst.append(y)
    return lst

@router_article.get('/articles/{id}/{version}', tags=["Artikel"])
async def get_article_by_version_and_id(id: str, version: int):
    x = db_articles.find_one({"artikel_id" : id, "current_versions" : version})
    print(articleEntity(x))
    return articleEntity(x)

@router_article.post('/articles/', tags=["Artikel"])
async def create_new_article(payload: Article):
    print(payload)
    x = db_articles.insert_one(asdict(payload))
    return asdict(payload)

@router_article.delete('/article/{id}', tags=["Artikel"])
async def delete_article(id : str):
    x = db_articles.delete_one({"artikel_id" : id})
    return {"delted articles" : x.deleted_count, "raw_Result" : x.raw_result}
