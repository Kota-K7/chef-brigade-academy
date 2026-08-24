import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")
qdb_path = os.path.join(workspace_dir, "rpg", "questions_db.json")

def load_json(fp):
    with open(fp, 'r', encoding='utf-8') as f:
        return json.load(f)

def analyze():
    # Load reference IDs
    ref_data = load_json(ref_path)
    ref_ids = {x['id']: x.get('title_ja', x.get('title_en', x['id'])) for x in ref_data}
    
    # Load questions database to check counts
    q_db = load_json(qdb_path)
    tag_counts = {}
    for q in q_db:
        for t in q.get('tags', []):
            tag_counts[t] = tag_counts.get(t, 0) + 1

    chapters = [
        ("第0章", os.path.join(workspace_dir, "rpg", "history", "chapter_0.json")),
        ("第1章", os.path.join(workspace_dir, "rpg", "history", "chapter_1.json")),
        ("第2章", os.path.join(workspace_dir, "rpg", "history", "chapter_2.json")),
    ]
    
    output_lines = []
    
    for ch_name, ch_path in chapters:
        output_lines.append(f"\n# {ch_name}")
        if not os.path.exists(ch_path):
            output_lines.append(f"ファイルが見つかりません: {ch_path}")
            continue
            
        ch_data = load_json(ch_path)
        output_lines.append(f"章タイトル: {ch_data.get('chapterTitle')}")
        output_lines.append(f"概要: {ch_data.get('notes')}")
        
        for ep in ch_data.get('episodes', []):
            output_lines.append(f"\n## {ep.get('episodeTitle')}")
            
            # Find tutorials and battles
            battle_count = 0
            seq = ep.get('sequence', [])
            
            # We track the last tutorial page to show it before the battle
            last_tutorial = None
            
            for step in seq:
                if step.get('type') == 'tutorial':
                    last_tutorial = step
                elif step.get('type') == 'fixedBattle':
                    battle_count += 1
                    enemy = step.get('enemyName', '敵')
                    hp = step.get('enemyHp', 0)
                    output_lines.append(f"### バトル {battle_count}: {enemy} (HP: {hp})")
                    
                    # Criteria tags
                    criteria = step.get('criteria', [])
                    tag_list = []
                    for c in criteria:
                        tag = c.get('tag')
                        count = c.get('count', 1)
                        db_count = tag_counts.get(tag, 0)
                        tag_list.append(f"`{tag}` ({count}問出題 / DB総数: {db_count}問)")
                    output_lines.append("- **出題タグ**: " + ", ".join(tag_list))
                    
                    # Pre-battle study tutorial
                    if last_tutorial:
                        output_lines.append("- **直前の事前解説**:")
                        pages = last_tutorial.get('pages', [])
                        if pages:
                            for idx, page in enumerate(pages):
                                ref_id = page.get('referenceTopicId')
                                title = page.get('title')
                                if ref_id:
                                    exists = ref_id in ref_ids
                                    status = f"✅ 紐付けOK (リファレンス: {ref_ids[ref_id]} [`{ref_id}`])" if exists else f"❌ 不明な参照ID: `{ref_id}`"
                                else:
                                    status = "⚠️ リファレンス紐付けなし (直接テキスト等)"
                                output_lines.append(f"  - ページ {idx+1}: {title} ➔ {status}")
                        else:
                            output_lines.append("  - ページ設定なし")
                        # Clear to avoid re-using same tutorial for multiple battles if not redefined
                        last_tutorial = None
                    else:
                        output_lines.append("- **直前の事前解説**: なし")
                        
    # Write report
    report_path = os.path.join(workspace_dir, "scratch", "history_reference_report.txt")
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(output_lines))
    print(f"Report saved to {report_path}")

if __name__ == "__main__":
    analyze()
