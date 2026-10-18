# Redfox sin verden

Nettsiden til Redfox, den røde reven. Ligger på GitHub Pages: https://asarayja.github.io/redfox/

## Hva ligger hvor

| Fil / mappe | Hva |
| --- | --- |
| `index.html`, `assets/` | Selve siden |
| `data/site.json` | Alt innholdet: tekster, album, sanger, bilder (det admin-panelet endrer) |
| `Redfox/` | Lydfilene til albumene som fantes fra før |
| `musikk/<album-id>/` | Nye lydfiler som lastes opp i admin, én mappe per album |
| `bilder/` | Bilder. Nye opplastinger havner i `bilder/uploads/`. `deling.jpg` vises når siden deles |
| `admin/` | Admin-panelet |
| `gammel-side/` | Den gamle siden, **bare lokalt** – skal ikke lastes opp (den hadde passordene i koden) |

## Admin-panelet

Gå til https://asarayja.github.io/redfox/admin/. Det finnes ikke noe passord i koden lenger.
Første gang limer du inn en GitHub-nøkkel (token). Instruksjoner står på skjermen. Nøkkelen lagres bare i den nettleseren.

- **Musikk:** Lag album, dra inn lydfiler (MP3 er best, maks 40 MB per fil), endre navn og rekkefølge. Lengden på sangen måles automatisk.
  Albumer uten eget cover får et fargerikt cover med albumnavnet.
- **Om Redfox** og **Fursona:** Tekster, fakta, farger og bilder.
- Trykk **Publiser** (eller Ctrl+S). Siden oppdateres etter ca. ett minutt.
- Sletter du en sang som er lastet opp i admin, slettes lydfilen også når du publiserer.
  Lydfilene i `Redfox/` (de gamle albumene) slettes aldri automatisk.

Skal Redfox selv kunne bruke admin, må GitHub-kontoen til Redfox legges til som *collaborator* på repoet. Så lager Redfox sin egen nøkkel.
