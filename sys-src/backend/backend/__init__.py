from pkgutil import ImpImporter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import ForwardRef
from pydantic import BaseModel


#from .routes.article import router_article
#from .routes.category import router_category
from backend.routes import article as article_routes
from backend.routes import category as category_routes

from backend.models.category import Category
#from .models.category import Category

from backend import config
from backend import database

app = FastAPI()

app.include_router(category_routes.router_category)
app.include_router(article_routes.router_article)

app.add_middleware(
    CORSMiddleware,
    allow_origins = config.CORS_ORIGINS,
    #allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return f"OTH-Wiki, Version: {config.VERSION}"
