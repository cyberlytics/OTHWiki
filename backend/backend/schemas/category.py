def categoryEntity(item) -> dict:
    return{
       "id":str(item["_id"]),
        "kategorie":item["kategorie"],
        "subkategorien": item["subkategorien"]
    }

def categoriesEntity(entity) -> list:
    return [categoryEntity(item) for item in entity]
