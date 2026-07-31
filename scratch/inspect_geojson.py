import urllib.request
import json

url = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson"

try:
    print("Fetching GeoJSON...")
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode('utf-8'))
        
    print(f"Total features: {len(data['features'])}")
    for i, feature in enumerate(data['features']):
        props = feature['properties']
        print(f"[{i}] Code: {props.get('code')}, Nom: {props.get('nom')}, Type: {feature['geometry']['type']}")
        
except Exception as e:
    print("Error:", e)
