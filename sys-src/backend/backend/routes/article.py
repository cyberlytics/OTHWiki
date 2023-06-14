from dataclasses import asdict
from fastapi import APIRouter,Response,status, Request
from bson.objectid import ObjectId
import json
from datetime import datetime
from typing import Dict

from backend.models.article import Article,UpdateArticle
from backend.routes.category import db_categories,get_category_by_id
from backend.database import conn
from backend import config


router_article = APIRouter()

#create direct reference to the table in use
db_articles = conn[config.DB_NAME].articles

def append_article_to_category(article_id:str, article_name:str ,cat_id:str, update:bool = False):
    """Append the article_id with the article name to the corresponding category object

    Args:
        article_id (str): Id of the new article
        article_name (str): Name of the new article
        cat_id (str): Id of the category object
        update (bool, optional): If an article got updated, maybe only the name changed. Defaults to False.
    """
    #if update is true, remove article with specified id first, then add the new one again
    if update:
        db_categories.update_one({'_id':ObjectId(cat_id)}, 
        {"$pull":{'artikel':{'artikel_id':article_id}}})

    obj = {
        'artikel_name': article_name,
        'artikel_id'  : article_id
    }
    db_categories.update_one({'_id':ObjectId(cat_id)}, {"$addToSet":{'artikel':obj}})

def get_article_by_id(article_id:str):
    try:
        return db_articles.find_one({'_id':ObjectId(article_id)})
    except:
        return None

@router_article.post('/articles', tags=["Artikel"])
async def create_new_article(body: Article):
    """Create an Artikel in the DB.

    Args:
        body (Category): Artikel-Object. Will be parsed by pydantic
    """
    #check if provided kategorie exists
    parent_kategorie = get_category_by_id(body.kategorie)
    if parent_kategorie is None:
        body['kategorie'] = None 

    #insert artikel
    obj = db_articles.insert_one(asdict(body))
    
    #append to category after we got the id
    if parent_kategorie is not None:
        append_article_to_category(article_id = str(obj.inserted_id),
                                article_name = body.artikel_name,
                                cat_id = body.kategorie)
    
    return f'{obj.inserted_id}'


@router_article.post('/articles/update', tags=["Artikel"])
async def update_article(body: UpdateArticle):
    """Update an Artikle"""
    #get old article object 
    obj = get_article_by_id(body.artikel_id)
    if obj == None:
        #response.status_code = status.HTTP_400_BAD_REQUEST
        return "No article found to be updated"
    old_data = {
        'artikel_name':obj['artikel_name'],
        'artikel_text':obj['artikel_text'],
        'artikel_version': obj['current_version']    
    }
    #tags are optional field for the update. If none were provided, take the old ones
    if body.tags is None:
        body.tags = obj['tags']
    update_object ={
        'artikel_name':body.artikel_name,
        'artikel_text':body.artikel_text,
        'current_version': obj['current_version'] +1,
        'created': datetime.utcnow(),
        'tags':body.tags
    }
    #update
    db_articles.update_one({"_id": ObjectId(body.artikel_id)},{"$set":update_object})
    db_articles.update_one({"_id": ObjectId(body.artikel_id)},{"$addToSet":{'old_versions':old_data }})
    
    #update_artikelname in category
    append_article_to_category(article_id=str(obj['_id']), article_name=body.artikel_name,
                                cat_id = obj['kategorie'] , update = True)

    return "Article updated successfully"


@router_article.delete('/articles/{article_id}', tags=["Artikel"])
async def delete_article(article_id: str):
    """Deletes an article from DB

    Args:
        article_id (srt): id of the artikel
    """
    try:
        obj = get_article_by_id(article_id)
        cateory = obj['kategorie']
        db_categories.update_one(
            {'_id':ObjectId(cateory)},
            {"$pull":{'artikel':{'artikel_id':article_id}}}
        )    
        _ = db_articles.delete_one({"_id" : ObjectId(article_id)})
    finally:
        return f"Article with id {article_id} was deleted"

@router_article.get('/articles/{article_id}', tags=["Artikel"])
async def get_article_by_id_route(article_id: str, response:Response):
    """Return an article by its id

    Args:
        article_id (str): ID of the article
    """
    try:
        obj = db_articles.find_one({"_id" : ObjectId(article_id)})
        obj['_id'] = str(obj['_id'])
        return obj
    except:
        #if no object was found, return with a 400 
        response.status_code = status.HTTP_400_BAD_REQUEST
        return "No Object found"


