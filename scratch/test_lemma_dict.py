import json
import re
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "rpg", "questions_db.json"), "r", encoding="utf-8") as f:
    questions = json.load(f)

# Verb and adjective lemma detection logic
# Map common irregular forms and past participles
known_verb_forms = {
    # être
    "suis": "être", "es": "être", "est": "être", "sommes": "être", "êtes": "être", "sont": "être",
    "été": "être", "étais": "être", "était": "être", "étions": "être", "étiez": "être", "étaient": "être",
    "serai": "être", "seras": "être", "sera": "être", "serons": "être", "serez": "être", "seront": "être",
    "sois": "être", "soit": "être", "soyons": "être", "soyez": "être", "soient": "être",
    "serais": "être", "serait": "être", "serions": "être", "seriez": "être", "seraient": "être",
    # avoir
    "ai": "avoir", "as": "avoir", "a": "avoir", "avons": "avoir", "avez": "avoir", "ont": "avoir",
    "eu": "avoir", "avais": "avoir", "avait": "avoir", "avions": "avoir", "aviez": "avoir", "avaient": "avoir",
    "aurai": "avoir", "auras": "avoir", "aura": "avoir", "aurons": "avoir", "aurez": "avoir", "auront": "avoir",
    "aie": "avoir", "ait": "avoir", "ayons": "avoir", "ayez": "avoir", "aient": "avoir",
    "aurais": "avoir", "aurait": "avoir", "aurions": "avoir", "auriez": "avoir", "auraient": "avoir",
    # aller
    "vais": "aller", "vas": "aller", "va": "aller", "allons": "aller", "allez": "aller", "vont": "aller",
    "allé": "aller", "allée": "aller", "allés": "aller", "allées": "aller", "irai": "aller", "iras": "aller", "ira": "aller", "irons": "aller", "irez": "aller", "iront": "aller",
    "aille": "aller", "ailles": "aller", "aillent": "aller", "allais": "aller", "allait": "aller",
    # venir
    "viens": "venir", "vient": "venir", "venons": "venir", "venez": "venir", "viennent": "venir",
    "venu": "venir", "venue": "venir", "venus": "venir", "venues": "venir", "viendrai": "venir", "venais": "venir",
    # faire
    "fais": "faire", "fait": "faire", "faisons": "faire", "faites": "faire", "font": "faire",
    "fasse": "faire", "fasses": "faire", "fassions": "faire", "fassiez": "faire", "fassent": "faire",
    "ferai": "faire", "feras": "faire", "fera": "faire", "ferons": "faire", "ferez": "faire", "feront": "faire",
    "faisais": "faire", "faisait": "faire", "faisions": "faire", "faisiez": "faire", "faisaient": "faire",
    # prendre
    "prends": "prendre", "prend": "prendre", "prenons": "prendre", "prenez": "prendre", "prennent": "prendre", "pris": "prendre", "prise": "prendre", "prenais": "prendre", "prendrai": "prendre",
    # vouloir
    "veux": "vouloir", "veut": "vouloir", "voulons": "vouloir", "voulez": "vouloir", "veulent": "vouloir", "voulu": "vouloir", "voudrais": "vouloir", "veuille": "vouloir",
    # pouvoir
    "peux": "pouvoir", "peut": "pouvoir", "pouvons": "pouvoir", "pouvez": "pouvoir", "peuvent": "pouvoir", "pu": "pouvoir", "pourrai": "pouvoir", "puisse": "pouvoir",
    # devoir
    "dois": "devoir", "doit": "devoir", "devons": "devoir", "devez": "devoir", "doivent": "devoir", "dû": "devoir", "devrais": "devoir", "devrait": "devoir",
    # savoir
    "sais": "savoir", "sait": "savoir", "savons": "savoir", "savez": "savoir", "savent": "savoir", "su": "savoir", "sache": "savoir", "saurai": "savoir",
    # voir
    "vois": "voir", "voit": "voir", "voyons": "voir", "voyez": "voir", "voient": "voir", "vu": "voir", "verrai": "voir",
    # mettre
    "mets": "mettre", "met": "mettre", "mettons": "mettre", "mettez": "mettre", "mettent": "mettre", "mis": "mettre", "mise": "mettre",
    # partir
    "pars": "partir", "part": "partir", "partons": "partir", "partez": "partir", "partent": "partir", "parti": "partir", "partie": "partir", "partis": "partir", "parties": "partir",
    # sortir
    "sors": "sortir", "sort": "sortir", "sortons": "sortir", "sortez": "sortir", "sortent": "sortir", "sorti": "sortir", "sortie": "sortir",
    # finir
    "finis": "finir", "finit": "finir", "finissons": "finir", "finissez": "finir", "finissent": "finir", "fini": "finir", "finie": "finir",
    # choisir
    "choisis": "choisir", "choisit": "choisir", "choisissons": "choisir", "choisissez": "choisir", "choisissent": "choisir", "choisi": "choisir",
    # réussir
    "réussis": "réussir", "réussit": "réussir", "réussi": "réussir",
    # manger
    "mange": "manger", "manges": "manger", "mangeons": "manger", "mangez": "manger", "mangent": "manger", "mangé": "manger",
    # aimer
    "aime": "aimer", "aimes": "aimer", "aimons": "aimer", "aimez": "aimer", "aiment": "aimer", "aimé": "aimer",
    # parler
    "parle": "parler", "parles": "parler", "parlons": "parler", "parlez": "parler", "parlent": "parler", "parlé": "parler",
    # cuire
    "cuis": "cuire", "cuit": "cuire", "cuisons": "cuire", "cuisez": "cuire", "cuisent": "cuire", "cuit": "cuire", "cuite": "cuire", "cuits": "cuire", "cuites": "cuire",
    # couper
    "coupe": "couper", "coupes": "couper", "coupons": "couper", "coupez": "couper", "coupent": "couper", "coupé": "couper",
    # préparer
    "prépare": "préparer", "prépares": "préparer", "préparons": "préparer", "préparez": "préparer", "préparent": "préparer", "préparé": "préparer", "préparée": "préparer",
    # goûter
    "goûte": "goûter", "goûtes": "goûter", "goûtons": "goûter", "goûtez": "goûter", "goûtent": "goûter", "goûté": "goûter",
    # laisser
    "laisse": "laisser", "laisses": "laisser", "laissons": "laisser", "laissez": "laisser", "laissent": "laisser", "laissé": "laisser",
    # ajouter
    "ajoute": "ajouter", "ajoutes": "ajouter", "ajoutons": "ajouter", "ajoutez": "ajouter", "ajoutent": "ajouter", "ajouté": "ajouter",
    # nettoyer
    "nettoie": "nettoyer", "nettoies": "nettoyer", "nettoyons": "nettoyer", "nettoyez": "nettoyer", "nettoient": "nettoyer", "nettoyé": "nettoyer",
    # dresser
    "dresse": "dresser", "dresses": "dresser", "dressons": "dresser", "dressez": "dresser", "dressent": "dresser", "dressé": "dresser",
    # servir
    "sers": "servir", "sert": "servir", "servons": "servir", "servez": "servir", "servent": "servir", "servi": "servir", "servie": "servir",
    # boire
    "bois": "boire", "boit": "boire", "buvons": "boire", "buvez": "boire", "boivent": "boire", "bu": "boire",
    # écrire
    "écris": "écrire", "écrit": "écrire", "écrivons": "écrire", "écrivez": "écrire", "écrivent": "écrire", "écrit": "écrire",
    # lire
    "lis": "lire", "lit": "lire", "lisons": "lire", "lisez": "lire", "lisent": "lire", "lu": "lire",
    # arriver
    "arrive": "arriver", "arrives": "arriver", "arrivons": "arriver", "arrivez": "arriver", "arrivent": "arriver", "arrivé": "arriver", "arrivée": "arriver", "arrivés": "arriver", "arrivées": "arriver",
    # entrer
    "entre": "entrer", "entres": "entrer", "entrons": "entrer", "entrez": "entrer", "entrent": "entrer", "entré": "entrer", "entrée": "entrer", "entrés": "entrer", "entrées": "entrer",
    # monter
    "monte": "monter", "montes": "monter", "montons": "monter", "montez": "monter", "montent": "monter", "monté": "monter",
    # descendre
    "descends": "descendre", "descend": "descendre", "descendons": "descendre", "descendez": "descendre", "descendent": "descendre", "descendu": "descendre",
    # rester
    "reste": "rester", "restes": "rester", "restons": "rester", "restez": "rester", "restent": "rester", "resté": "rester",
    # tomber
    "tombe": "tomber", "tombes": "tomber", "tombons": "tomber", "tombez": "tomber", "tombent": "tomber", "tombé": "tomber",
    # naître
    "nais": "naître", "naît": "naître", "naissons": "naître", "naissez": "naître", "naissent": "naître", "né": "naître", "née": "naître",
    # mourir
    "meurs": "mourir", "meurt": "mourir", "mourons": "mourir", "mourez": "mourir", "meurent": "mourir", "mort": "mourir", "morte": "mourir",
}

known_adjective_forms = {
    # bon
    "bon": "bon", "bonne": "bon", "bons": "bon", "bonnes": "bon", "meilleur": "bon", "meilleure": "bon", "meilleurs": "bon", "meilleures": "bon",
    # mauvais
    "mauvais": "mauvais", "mauvaise": "mauvais", "mauvaises": "mauvais", "pire": "mauvais", "pires": "mauvais",
    # bien
    "bien": "bien", "mieux": "bien",
    # grand
    "grand": "grand", "grande": "grand", "grands": "grand", "grandes": "grand",
    # petit
    "petit": "petit", "petite": "petit", "petits": "petit", "petites": "petit", "moindre": "petit", "moindres": "petit",
    # chaud
    "chaud": "chaud", "chaude": "chaud", "chauds": "chaud", "chaudes": "chaud",
    # froid
    "froid": "froid", "froide": "froid", "froids": "froid", "froides": "froid",
    # frais
    "frais": "frais", "fraîche": "frais", "fraiches": "frais", "fraîches": "frais",
    # sec
    "sec": "sec", "sèche": "sec", "secs": "sec", "sèches": "sec",
    # blanc
    "blanc": "blanc", "blanche": "blanc", "blancs": "blanc", "blanches": "blanc",
    # noir
    "noir": "noir", "noire": "noir", "noirs": "noir", "noires": "noir",
    # rouge
    "rouge": "rouge", "rouges": "rouge",
    # vert
    "vert": "vert", "verte": "vert", "verts": "vert", "vertes": "vert",
    # beau
    "beau": "beau", "bel": "beau", "belle": "beau", "beaux": "beau", "belles": "beau",
    # nouveau
    "nouveau": "nouveau", "nouvel": "nouveau", "nouvelle": "nouveau", "nouveaux": "nouveau", "nouvelles": "nouveau",
    # vieux
    "vieux": "vieux", "vieil": "vieux", "vieille": "vieux", "vieilles": "vieux",
    # délicieux
    "délicieux": "délicieux", "délicieuse": "délicieux", "délicieuses": "délicieux",
    # parfait
    "parfait": "parfait", "parfaite": "parfait", "parfaits": "parfait", "parfaites": "parfait",
    # salé
    "salé": "salé", "salée": "salé", "salés": "salé", "salées": "salé",
    # sucré
    "sucré": "sucré", "sucrée": "sucré", "sucrés": "sucré", "sucrées": "sucré",
    # épicé
    "épicé": "épicé", "épicée": "épicé", "épicés": "épicé", "épicées": "épicé",
    # lourd
    "lourd": "lourd", "lourde": "lourd", "lourds": "lourd", "lourdes": "lourd",
    # léger
    "léger": "léger", "légère": "léger", "légers": "léger", "légères": "léger",
    # cher
    "cher": "cher", "chère": "cher", "chers": "cher", "chères": "cher",
    # puissant
    "puissant": "puissant", "puissante": "puissant", "puissants": "puissant", "puissantes": "puissant",
    # courageux
    "courageux": "courageux", "courageuse": "courageux", "courageuses": "courageux",
    # juste
    "juste": "juste", "justes": "juste",
    # brave
    "brave": "brave", "braves": "brave",
    # difficile
    "difficile": "difficile", "difficiles": "difficile",
    # facile
    "facile": "facile", "faciles": "facile",
    # court
    "court": "court", "courte": "court", "courts": "court", "courtes": "court",
    # long
    "long": "long", "longue": "long", "longs": "long", "longues": "long",
    # raffiné
    "raffiné": "raffiné", "raffinée": "raffiné", "raffinés": "raffiné", "raffinées": "raffiné",
    # français
    "français": "français", "française": "français", "françaises": "français",
    # italien
    "italien": "italien", "italienne": "italien", "italiens": "italien", "italiennes": "italien",
    # espagnol
    "espagnol": "espagnol", "espagnole": "espagnol", "espagnols": "espagnol", "espagnoles": "espagnol",
}

print(f"Known verb forms: {len(known_verb_forms)}, known adjective forms: {len(known_adjective_forms)}")
