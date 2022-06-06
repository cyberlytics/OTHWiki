from __future__ import annotations
from typing import List, Optional
from pydantic.dataclasses import dataclass
from pydantic import BaseModel, Field
from datetime import datetime

@dataclass
class OldVersion():
    artikel_name: str
    artikel_text: str
    artikel_version: int

@dataclass
class Article():
    artikel_name: str
    artikel_text: str
    kategorie: str
    current_version: Optional[int] = 1
    created: Optional[datetime] = datetime.utcnow()
    tags: Optional[List[str]] = Field(default_factory=list)
    old_versions: Optional[List[OldVersion]] = Field(default_factory=list)


@dataclass
class UpdateArticle():
    artikel_id:str
    artikel_name: str
    artikel_text: str
    tags: Optional[List[str]] = None

Article.__pydantic_model__.update_forward_refs()
