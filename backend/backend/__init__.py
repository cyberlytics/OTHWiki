from pkgutil import ImpImporter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.article import router_article
from .routes.category import router_category
from .models.category import Category

from typing import ForwardRef
from pydantic import BaseModel

from backend import config

app = FastAPI()

app.include_router(router_category)
app.include_router(router_article)

origins = ['https://localhost:300']
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return f"OTH-Wiki, Version: {config.VERSION}"
