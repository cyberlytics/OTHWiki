
def category_entity(item) -> dict:
    return{
       "id":str(item["_id"]),
        "kategorie":item["kategorie"],
        "subkategorien": item["subkategorien"]
    }

def categories_entity(entity) -> list:
    return [category_entity(item) for item in entity]
