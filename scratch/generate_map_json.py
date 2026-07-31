import urllib.request
import json
import math
import sys

# Ensure UTF-8 output for console
try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    pass

url = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson"

# Mapping from INSEE code to our project region_id and official names
region_mapping = {
    "11": {"id": "reg_ile_de_france", "name_ja": "イル・ド・フランス地域圏", "name_en": "Île-de-France"},
    "24": {"id": "reg_loire", "name_ja": "サントル・ヴァル・ド・ロワール地域圏", "name_en": "Centre-Val de Loire"},
    "27": {"id": "reg_bourgogne", "name_ja": "ブルゴーニュ＝フランシュ＝コンテ地域圏", "name_en": "Bourgogne-Franche-Comté"},
    "28": {"id": "reg_normandie", "name_ja": "ノルマンディー地域圏", "name_en": "Normandy"},
    "32": {"id": "reg_hauts_de_france", "name_ja": "オー・ド・フランス地域圏", "name_en": "Hauts-de-France"},
    "44": {"id": "reg_grand_est", "name_ja": "グラン・テスト地域圏", "name_en": "Grand Est"},
    "52": {"id": "reg_pays_de_la_loire", "name_ja": "ペイ・ド・ラ・ロワール地域圏", "name_en": "Pays de la Loire"},
    "53": {"id": "reg_bretagne", "name_ja": "ブルターニュ地域圏", "name_en": "Brittany"},
    "75": {"id": "reg_aquitaine", "name_ja": "ヌーヴェル＝アキテーヌ地域圏", "name_en": "Nouvelle-Aquitaine"},
    "76": {"id": "reg_occitanie", "name_ja": "オクシタニー地域圏", "name_en": "Occitanie"},
    "84": {"id": "reg_rhone_alpes", "name_ja": "オーヴェルニュ＝ローヌ＝アルプ地域圏", "name_en": "Auvergne-Rhône-Alpes"},
    "93": {"id": "reg_provence", "name_ja": "プロヴァンス＝アルプ＝コート・ダジュール地域圏", "name_en": "Provence-Alpes-Côte d'Azur"},
    "94": {"id": "reg_corse", "name_ja": "コルシカ地方（コルス）", "name_en": "Corsica"}
}

def project(lon, lat):
    # Simplified web mercator / equirectangular with latitude compensation
    # Average latitude of France is ~46.5 degrees
    mean_lat_rad = 46.5 * math.pi / 180.0
    x = lon * math.cos(mean_lat_rad)
    y = -lat  # Negative because SVG Y axis points downwards
    return x, y

def process_coordinates(coords, type_geom, bounds_proj):
    # Project coords and return paths
    # bounds_proj tracks the bounding box to scale later
    paths = []
    
    if type_geom == "Polygon":
        rings = coords
        paths.append(rings)
    elif type_geom == "MultiPolygon":
        for polygon in coords:
            rings = polygon
            paths.append(rings)
            
    projected_paths = []
    for rings in paths:
        projected_rings = []
        for i, ring in enumerate(rings):
            # Only processing the outer ring (index 0) for boundary lines to avoid complex inner holes
            # inside a simple interactive map, or you can keep them. Let's keep all rings but only
            # use outer ring (index 0) for calculating label centroids.
            proj_ring = []
            for pt in ring:
                px, py = project(pt[0], pt[1])
                proj_ring.append((px, py))
                # Update global bounds
                bounds_proj['min_x'] = min(bounds_proj['min_x'], px)
                bounds_proj['max_x'] = max(bounds_proj['max_x'], px)
                bounds_proj['min_y'] = min(bounds_proj['min_y'], py)
                bounds_proj['max_y'] = max(bounds_proj['max_y'], py)
            projected_rings.append(proj_ring)
        projected_paths.append(projected_rings)
        
    return projected_paths

def main():
    print("Downloading France regions GeoJSON...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        geojson = json.loads(response.read().decode('utf-8'))
        
    print("Processing geometries...")
    bounds_proj = {
        'min_x': float('inf'), 'max_x': float('-inf'),
        'min_y': float('inf'), 'max_y': float('-inf')
    }
    
    regions_raw_data = []
    
    for feature in geojson['features']:
        props = feature['properties']
        code = props.get('code')
        nom = props.get('nom')
        geom = feature['geometry']
        
        if code not in region_mapping:
            print(f"Skipping unknown region: {nom} ({code})")
            continue
            
        mapping = region_mapping[code]
        
        # Process and project coords
        proj_paths = process_coordinates(geom['coordinates'], geom['type'], bounds_proj)
        
        regions_raw_data.append({
            "region_id": mapping["id"],
            "code": code,
            "french_name": nom,
            "japanese_name": mapping["name_ja"],
            "english_name": mapping["name_en"],
            "proj_paths": proj_paths
        })

    # Now we scale the projected coords to fit 1000x1000 viewBox with padding
    min_x, max_x = bounds_proj['min_x'], bounds_proj['max_x']
    min_y, max_y = bounds_proj['min_y'], bounds_proj['max_y']
    
    width_proj = max_x - min_x
    height_proj = max_y - min_y
    
    # 50px padding on a 1000px canvas (available area is 900x900)
    canvas_size = 1000
    padding = 50
    available_size = canvas_size - (padding * 2)
    
    # Scale factor
    scale = min(available_size / width_proj, available_size / height_proj)
    
    # Offsets to center the map
    offset_x = padding + (available_size - width_proj * scale) / 2
    offset_y = padding + (available_size - height_proj * scale) / 2
    
    output_regions = []
    
    for rdata in regions_raw_data:
        svg_paths = []
        all_x_svg = []
        all_y_svg = []
        
        for polygon_rings in rdata["proj_paths"]:
            for ring_idx, ring in enumerate(polygon_rings):
                svg_points = []
                for pt in ring:
                    svg_x = round((pt[0] - min_x) * scale + offset_x, 2)
                    svg_y = round((pt[1] - min_y) * scale + offset_y, 2)
                    svg_points.append(f"{svg_x},{svg_y}")
                    
                    # Only collect outer ring points for centroid calculations
                    if ring_idx == 0:
                        all_x_svg.append(svg_x)
                        all_y_svg.append(svg_y)
                        
                path_str = "M" + " L".join(svg_points) + " Z"
                svg_paths.append(path_str)
                
        # Combined path for the region
        combined_path = " ".join(svg_paths)
        
        # Calculate simple centroid/label position
        # For Corse and Bretagne, simple average works fine, but we can fine-tune if needed
        label_x = round(sum(all_x_svg) / len(all_x_svg), 2) if all_x_svg else 500
        label_y = round(sum(all_y_svg) / len(all_y_svg), 2) if all_y_svg else 500
        
        # Bounds in SVG space
        min_x_svg = round(min(all_x_svg), 2) if all_x_svg else 0
        max_x_svg = round(max(all_x_svg), 2) if all_x_svg else 1000
        min_y_svg = round(min(all_y_svg), 2) if all_y_svg else 0
        max_y_svg = round(max(all_y_svg), 2) if all_y_svg else 1000
        
        # Custom adjustments for label positions to avoid overlapping or placing outside complex regions
        # e.g., Île-de-France is small, Normandy, etc.
        if rdata["region_id"] == "reg_corse":
            # Corse label sits nicely a bit to the left of centroid
            label_x -= 10
        elif rdata["region_id"] == "reg_provence":
            label_y -= 10
            
        output_regions.append({
            "region_id": rdata["region_id"],
            "code": rdata["code"],
            "french_name": rdata["french_name"],
            "japanese_name": rdata["japanese_name"],
            "english_name": rdata["english_name"],
            "geometry": combined_path,
            "label_x": label_x,
            "label_y": label_y,
            "bounds": [min_x_svg, min_y_svg, max_x_svg, max_y_svg]
        })
        
        print(f"Generated {rdata['french_name']} ({rdata['region_id']}) path. Centroid: ({label_x}, {label_y})")

    # Write output JSON
    output_path = "data/regions_administrative.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_regions, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully wrote {len(output_regions)} regions to {output_path}")

if __name__ == "__main__":
    main()
