#TODO: Richtige Schemas bauen

def articleEntity(item) -> dict:
   return{
       "id":str(item["_id"]),
       "artikel_id":str(item["artikel_id"]),
       "artikel_name": item["artikel_name"],
       "artikel_text": item["artikel_text"],
       "created": item["created"],
       "tags": item["tags"],
       "current_versions": item["current_versions"],
       "old_versions": item["old_versions"],
   }

def articlesEntity(entity) -> list:
    return [articleEntity(item) for item in entity]
