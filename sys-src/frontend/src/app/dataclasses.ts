//Datamodels:

  //Objektaufbau der Artikel 
  export interface Article{
    _id?: string;
    artikel_name: string;
    artikel_text: string;
    kategorie: string;
    current_version: number;
    created?: Date;
    tags: Array<string>;
    old_versions?: Array<OldVersions>;
  }
  //Objektaufbau der Alten Versionen von Artikel
  export interface OldVersions{
    article_name: string;
    article_text: string;
    article_version: number;
  }
  //Objektaufbau der Artikel welche als Update Empfangen werden
  export interface updateArticle{
    artikel_id: string;
    artikel_name: string;
    artikel_text: string;
    tags: Array<string>;
  }
  //Objektaufbau der Kategorien für die Sidebar
  export interface NavItems {
    _id: string;
    kategorie: string;
    subkategorien: Array<NavItems>;
    artikel: Array<Article>;
  }
