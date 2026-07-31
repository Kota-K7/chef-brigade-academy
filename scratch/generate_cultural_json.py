import json

input_path = "data/regions_cultural.json"
output_path = "data/regions_cultural.json"

cultural_mapping = {
    "reg_normandie": {"name_ja": "ノルマンディー地方", "name_en": "Normandy", "code": "N"},
    "reg_bourgogne": {"name_ja": "ブルゴーニュ地方", "name_en": "Burgundy", "code": "B"},
    "reg_provence": {"name_ja": "プロヴァンス地方", "name_en": "Provence", "code": "P"},
    "reg_alsace": {"name_ja": "アルザス地方", "name_en": "Alsace", "code": "A"},
    "reg_bretagne": {"name_ja": "ブルターニュ地方", "name_en": "Brittany", "code": "BR"},
    "reg_ile_de_france": {"name_ja": "イル・ド・フランス地方", "name_en": "Île-de-France", "code": "IF"},
    "reg_aquitaine": {"name_ja": "アキテーヌ（南西地方）", "name_en": "Aquitaine / Southwest", "code": "AQ"},
    "reg_rhone_alpes": {"name_ja": "ローヌ・アルプ（リヨン地方）", "name_en": "Rhône-Alpes / Lyonnais", "code": "RA"},
    "reg_loire": {"name_ja": "ロワール地方", "name_en": "Loire Valley", "code": "LO"},
    "reg_champagne": {"name_ja": "シャンパーニュ地方", "name_en": "Champagne", "code": "CH"},
    "reg_languedoc": {"name_ja": "ラングドック地方", "name_en": "Languedoc / South", "code": "LA"},
    "reg_corse": {"name_ja": "コルシカ島", "name_en": "Corsica", "code": "CO"},
    "reg_hauts_de_france": {"name_ja": "オー・ド・フランス地方（北フランス）", "name_en": "Northern France / Flanders", "code": "HF"}
}

try:
    with open(input_path, "r", encoding="utf-8") as f:
        regions = json.load(f)
        
    output_regions = []
    for reg in regions:
        reg_id = reg.get("region_id")
        mapping = cultural_mapping.get(reg_id, {"name_ja": reg.get("french_name"), "name_en": reg.get("french_name"), "code": ""})
        
        # Add localized names
        output_regions.append({
            "region_id": reg_id,
            "code": mapping["code"],
            "french_name": reg.get("french_name"),
            "japanese_name": mapping["name_ja"],
            "english_name": mapping["name_en"],
            "geometry": reg.get("geometry"),
            "label_x": reg.get("label_x"),
            "label_y": reg.get("label_y"),
            "bounds": reg.get("bounds")
        })
        
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_regions, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully migrated {len(output_regions)} cultural regions to {output_path}")
    
except Exception as e:
    print("Error:", e)
