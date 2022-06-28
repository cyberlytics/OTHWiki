# OTH-Wiki

## Konzept

OTH-Wiki ist ein Informationsportal von Studenten für Studenten.  
Eine detaillierte Beschreibung findet sich im Ordner `konzept`

## Architektur

Bei dieser Anwendung handelt es sich um eine containerisierte Kombination aus Frontend und Backend+Datenbank.
Eine detaillierte Beschreibung findet sich im Ordner `architektur`

## Requirements

Starten der Anwendung mittels Docker:
* Installation von Docker
* Installation von Docker-Compose

Starten der einzelnen Teilkomponenten:
* **Frontend**: Angular + Dependencies (siehe `frontend/README.md`)
* **Backend**: Python + Dependencies (siehe `backend/README.md`)


## Starten der Anwendung

Die einzelnen Teile der Anwendung können seperat gestartet werden (siehe jeweiliges Readme in den entsprechenden Ordnern), oder auch über Docker-Compose.

Dazu reicht folgender Befehl (innerhalb dieses Repos):
```bash
docker-compose up [-d --build][--flags]
```
Über den Befehl `docker ps` kann nun geprüft werden, ob alle 3 Teilkomponenten (mongodb, frontend, backend) laufen.

Wenn die Anwendung ohne `-d` Flag gestartet wurde, kann diese über die Tastenkombination CTRL+C gestoppt werden. Alternativ kann folgender Befehl genutzt werden:
```bash
docker-compose stop
```


