from fastapi import APIRouter

from ..models.article import Article
from ..database import conn

router_article = APIRouter()

@router_article.get('/articles')
async def find_all_articles():
    #return {'ar' : 'ar'}
    x = conn.local.articles.find()
    for y in x:
        print(y)
    return {'ar' : 'a'}
    #return conn.local.articles.find()


#@router_article.post('/articles')
#async def create_article(article):
