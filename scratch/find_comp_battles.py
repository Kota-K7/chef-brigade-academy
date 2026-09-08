import json
import os
import glob
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

for folder in ["rpg/history", "rpg/story"]:
    for fpath in glob.glob(os.path.join(workspace, folder, "*.json")):
        fname = os.path.basename(fpath)
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        episodes = data.get("episodes", [])
        for ep_idx, ep in enumerate(episodes):
            ep_title = ep.get("episodeTitle", f"Ep {ep_idx+1}")
            seq = ep.get("sequence", [])
            for s_idx, step in enumerate(seq):
                if step.get("type") == "fixedBattle":
                    crit = step.get("criteria", [])
                    has_comp_sup = any(c.get("tag") in ["#comparative", "#superlative"] for c in crit)
                    if has_comp_sup:
                        # find previous tutorial
                        prev_tut = None
                        for k in range(s_idx - 1, -1, -1):
                            if seq[k].get("type") == "tutorial":
                                prev_tut = seq[k]
                                break
                            elif seq[k].get("type") in ["fixedBattle", "reward"]:
                                break
                        print(f"[{fname} - {ep_title}] Battle '{step.get('enemyName')}' has comp/super: {crit}")
                        if prev_tut:
                            print(f"  Tutorial pages: {prev_tut.get('pages')}")
                        else:
                            print("  No previous tutorial found.")

