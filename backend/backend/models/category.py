from __future__ import annotations
from typing import List, Optional
from typing import ForwardRef
from pydantic import BaseModel

#TODO: Liste bei Category muss List[Category] sein?

#class SubkategorienItem(BaseModel):
#    kategorie: str
#    subkategorien: Optional[List[str]] = None
#    artikel: Optional[List[str]] = None
from pydantic.dataclasses import dataclass



@dataclass
class Category():
    kategorie: str
    kategorie_id : int
    subkategorien: Optional[List[str]] = None
    artikel: Optional[List[str]] = None

print("category")
Category.__pydantic_model__.update_forward_refs()