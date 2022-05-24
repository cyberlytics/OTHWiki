# generated by datamodel-codegen:
#   filename:  article.json
#   timestamp: 2022-05-24T18:25:55+00:00

from __future__ import annotations

from typing import List

from pydantic import BaseModel


class OldVersion(BaseModel):
    name: str
    text: str
    version: int


class Article(BaseModel):
    artikel_id: str
    artikel_name: str
    artikel_text: str
    created: str
    tags: List[str]
    current_versions: int
    old_versions: List[OldVersion]