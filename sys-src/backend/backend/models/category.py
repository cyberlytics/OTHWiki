from __future__ import annotations
from typing import List, Optional
from typing import ForwardRef
from pydantic import BaseModel, Field
from pydantic.dataclasses import dataclass



@dataclass
class Category():
    kategorie: str
    parent_kategorie: Optional[str] = None
    subkategorien: Optional[List[str]] = Field(default_factory=list)
    artikel: Optional[List[str]] = Field(default_factory=list)


Category.__pydantic_model__.update_forward_refs()