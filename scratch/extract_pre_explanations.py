import os
import sys
import json
import glob

# Ensure standard output encoding is UTF-8 to prevent console printing issues on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Ensure absolute paths
workspace_dir = os.path.abspath(r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy")

# 1. Load grammar_reference.json
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")
with open(ref_path, "r", encoding="utf-8") as f:
    ref_data = json.load(f)

# Reference topic lookup map
ref_map = {item["id"]: item for item in ref_data}

# 2. Find all chapter JSON files
history_files = sorted(glob.glob(os.path.join(workspace_dir, "rpg", "history", "chapter_*.json")))
story_files = sorted(glob.glob(os.path.join(workspace_dir, "rpg", "story", "chapter_career_*.json")))

all_files = [("History (歴史体験RPG)", f) for f in history_files] + [("Story (修業ストーリー)", f) for f in story_files]

report_content = []
report_content.append("# 📖 事前解説および出題指定タグ一覧 (全チャプター点検用)")
report_content.append("このドキュメントは、システムに登録されているすべての事前解説の内容（スライド内のテキストや表）と、それに対応するバトルの出題指定タグの一覧です。漏れや不足がないかの確認に使用してください。")
report_content.append("")

for category, file_path in all_files:
    filename = os.path.basename(file_path)
    
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    chapter_id = data.get("chapterId", "不明")
    chapter_title = data.get("chapterTitle", "不明")
    
    report_content.append(f"## 📁 {category}: {chapter_title} (`{filename}` / ID: `{chapter_id}`)")
    report_content.append("")
    
    episodes = data.get("episodes", [])
    for ep_idx, ep in enumerate(episodes):
        ep_id = ep.get("episodeId", f"ep_{ep_idx}")
        ep_title = ep.get("episodeTitle", "不明")
        
        report_content.append(f"### 🎬 {ep_title} (ID: `{ep_id}`)")
        report_content.append("")
        
        sequence = ep.get("sequence", [])
        
        # Scan sequence for tutorials and corresponding battles
        for i, step in enumerate(sequence):
            if step.get("type") == "tutorial":
                title = step.get("title", "事前解説")
                
                # Look for the subsequent fixedBattle in the same episode
                battle_step = None
                for j in range(i + 1, len(sequence)):
                    next_step = sequence[j]
                    if next_step.get("type") == "fixedBattle":
                        battle_step = next_step
                        break
                    elif next_step.get("type") in ["tutorial", "reward"]:
                        # Break if we hit another tutorial/reward without finding a battle
                        break
                
                # Extract tags and counts
                tags_str = "なし"
                enemy_name = "不明"
                if battle_step:
                    enemy_name = battle_step.get("enemyName", "不明")
                    criteria = battle_step.get("criteria", [])
                    if criteria:
                        tags_str = ", ".join([f"`{c.get('tag')}` ({c.get('count')}問)" for c in criteria])
                
                report_content.append(f"#### 📖 事前解説: {title}")
                report_content.append(f"- **出現箇所 (インデックス):** `sequence[{i}]`  ")
                report_content.append(f"- **対応するバトル敵名:** {enemy_name}  ")
                report_content.append(f"- **バトルの出題指定タグ:** {tags_str}")
                report_content.append("")
                
                # Render learning goals and targets if defined
                if "goal" in step and step["goal"]:
                    report_content.append(f"**学習目標・ゴール:**\n{step['goal']}\n")
                if "targets" in step and step["targets"]:
                    report_content.append("**学習項目:**")
                    for t in step["targets"]:
                        report_content.append(f"- {t}")
                    report_content.append("")
                
                # Render direct explanation text
                if "text" in step and step["text"]:
                    report_content.append("**解説内容 (直接記述):**")
                    for line in step["text"].split("\n"):
                        report_content.append(f"> {line}")
                    report_content.append("")
                
                # Render slides pages
                pages = step.get("pages", [])
                if pages:
                    report_content.append("**📖 解説スライドページ内容:**")
                    report_content.append("")
                    for page_idx, page in enumerate(pages):
                        p_title = page.get("title", f"ページ {page_idx + 1}")
                        report_content.append(f"##### 📄 ページ {page_idx + 1}: {p_title}")
                        
                        if page.get("type") == "custom":
                            # Custom page with raw rows/headers
                            p_text = page.get("text", "")
                            if p_text:
                                report_content.append(f"{p_text}  \n")
                            headers = page.get("headers", [])
                            rows = page.get("rows", [])
                            if headers and rows:
                                table_lines = []
                                table_lines.append("| " + " | ".join(headers) + " |")
                                table_lines.append("| " + " | ".join(["---"] * len(headers)) + " |")
                                for row in rows:
                                    row_str = [str(cell) for cell in row]
                                    table_lines.append("| " + " | ".join(row_str) + " |")
                                report_content.append("\n".join(table_lines))
                                report_content.append("")
                        else:
                            # Referenced page from grammar_reference.json
                            ref_id = page.get("referenceTopicId")
                            sec_indices = page.get("sectionIndices", [])
                            report_content.append(f"*参照トピック: `{ref_id}` (セクション: {sec_indices})*  \n")
                            
                            if ref_id in ref_map:
                                ref_item = ref_map[ref_id]
                                sections = ref_item.get("sections", [])
                                for s_idx in sec_indices:
                                    if 0 <= s_idx < len(sections):
                                        sec = sections[s_idx]
                                        s_title = sec.get("title", "無題セクション")
                                        report_content.append(f"###### {s_title}")
                                        
                                        s_type = sec.get("type")
                                        if s_type == "table":
                                            headers = sec.get("headers", [])
                                            rows = sec.get("rows", [])
                                            if headers and rows:
                                                table_lines = []
                                                table_lines.append("| " + " | ".join(headers) + " |")
                                                table_lines.append("| " + " | ".join(["---"] * len(headers)) + " |")
                                                for row in rows:
                                                    row_str = [str(cell) for cell in row]
                                                    table_lines.append("| " + " | ".join(row_str) + " |")
                                                report_content.append("\n".join(table_lines))
                                                report_content.append("")
                                        elif s_type == "text" or "text" in sec:
                                            report_content.append(f"{sec.get('text', '')}  \n")
                                        
                                        if "bullets" in sec:
                                            for b in sec["bullets"]:
                                                report_content.append(f"- {b}")
                                            report_content.append("")
                            else:
                                report_content.append(f"⚠️ 警告: 参照ID `{ref_id}` が `grammar_reference.json` に見つかりません。")
                        report_content.append("")
                report_content.append("---")
                report_content.append("")
        report_content.append("")

# Output report to brain artifact directory
output_report_path = r"C:\Users\kotya\.gemini\antigravity-ide\brain\5ad0167c-a4b9-4a4b-9ea5-9028bcbdfab8\pre_explanations_content.md"
with open(output_report_path, "w", encoding="utf-8") as f:
    f.write("\n".join(report_content))

print(f"SUCCESS: Report generated successfully at {output_report_path}")
