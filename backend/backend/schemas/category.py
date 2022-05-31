def categoryEntity(item) -> dict:
    return{
       "id":str(item["_id"]),
        "kategorie":item["kategorie"],
        "kategorie_id" : item["kategorie_id"],
        "subkategorien": item["subkategorien"]
    }

def categoriesEntity(entity) -> list:
    return [categoryEntity(item) for item in entity]
