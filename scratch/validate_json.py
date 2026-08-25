import json
import os

target_path = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy\rpg\history\chapter_2.json"
if os.path.exists(target_path):
    try:
        with open(target_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        print("Success: chapter_2.json is valid JSON!")
        print("Number of episodes:", len(data.get("episodes", [])))
        for ep in data.get("episodes", []):
            print(f"- Episode ID: {ep.get('episodeId')}, Title: {ep.get('episodeTitle')}")
    except json.JSONDecodeError as e:
        print("JSON Decode Error in chapter_2.json:")
        print(e)
else:
    print("Target file not found:", target_path)
