from fastapi import APIRouter

#from backend.backend.models.category import Category

from ..models.article import Article
from ..database import conn
from ..schemas.article import articleEntity, articlesEntity

import json

router_article = APIRouter()

@router_article.get('/articles')
async def find_all_articles():
    #TODO: in Objekt paresen
    #return {'ar' : 'ar'}
    x = conn.local.articles.find()
    for y in x:
        print(y)
    return {'ar' : 'a'}
    #return conn.local.articles.find()

@router_article.get('/articles/{id}/{version}')
async def get_article_by_version_and_id(id: str, version: int):
    #x = conn.local.articles.find_one({"artikel_id" : id, "current_versions" : version}, {'_id' : 0})
    x = conn.local.articles.find_one({"artikel_id" : id, "current_versions" : version})
    res = articleEntity(x)
    print(res)
    return res

#Möglichkeit Kategorie hinzufügen
@router_article.post('/articles/')
async def get_article_by_version_and_id(payload: Article):
    print(payload)
    x = conn.local.articles.insert_one(dict(payload))
    return dict(payload)
