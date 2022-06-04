from dataclasses import asdict


def categoryEntity(item) -> dict:
    return{
       "id":str(item["_id"]),
        "kategorie":item["kategorie"],
        "kategorie_id" : item["kategorie_id"],
        "subkategorien": item["subkategorien"],
        "artikel": item["artikel"],
    }

def categoriesEntity(entity) -> list:
    return [asdict(item) for item in entity]
