//Datamodels:
export interface updateArticle{
    artikel_id: string;
    artikel_name: string;
    artikel_text: string;
    tags: Array<string>;
  }
  
  export interface Article{
    _id: string;
    artikel_name: string;
    artikel_text: string;
    kategorie: string;
    current_version: number;
    created: Date;
    tags: Array<string>;
    old_versions: Array<OldVersions>;
  }
  
  export interface OldVersions{
    article_name: string;
    article_text: string;
    article_version: number;
  }