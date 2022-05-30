from __future__ import annotations
from typing import List, Optional
from pydantic import BaseModel

#TODO: Liste bei Category muss List[Category] sein?

#class SubkategorienItem(BaseModel):
#    kategorie: str
#    subkategorien: Optional[List[str]] = None
#    artikel: Optional[List[str]] = None


class Category(BaseModel):
    kategorie: str
    subkategorien: Optional[List[Category]] = None
    artikel: Optional[List[str]] = None
