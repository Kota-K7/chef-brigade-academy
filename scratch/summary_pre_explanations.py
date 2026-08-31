import os
import json
import glob

workspace_dir = os.path.abspath(r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy")

# Load grammar_reference.json
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")
with open(ref_path, "r", encoding="utf-8") as f:
    ref_data = json.load(f)
ref_map = {item["id"]: item for item in ref_data}

# Scan files
history_files = sorted(glob.glob(os.path.join(workspace_dir, "rpg", "history", "chapter_*.json")))
story_files = sorted(glob.glob(os.path.join(workspace_dir, "rpg", "story", "chapter_career_*.json")))
all_files = [("History", f) for f in history_files] + [("Story", f) for f in story_files]

table_rows = []
warnings = []

for category, file_path in all_files:
    filename = os.path.basename(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    chapter_title = data.get("chapterTitle", "不明")
    episodes = data.get("episodes", [])
    
    for ep_idx, ep in enumerate(episodes):
        ep_title = ep.get("episodeTitle", "不明")
        sequence = ep.get("sequence", [])
        
        for i, step in enumerate(sequence):
            if step.get("type") == "tutorial":
                tutorial_title = step.get("title", "事前解説")
                
                # Find corresponding battle
                battle_step = None
                for j in range(i + 1, len(sequence)):
                    next_step = sequence[j]
                    if next_step.get("type") == "fixedBattle":
                        battle_step = next_step
                        break
                    elif next_step.get("type") in ["tutorial", "reward"]:
                        break
                
                tags_str = "なし"
                if battle_step:
                    criteria = battle_step.get("criteria", [])
                    if criteria:
                        tags_str = ", ".join([f"`{c.get('tag')}`({c.get('count')})" for c in criteria])
                
                pages = step.get("pages", [])
                if not pages:
                    # Direct text type
                    table_rows.append({
                        "file_ep": f"{filename}<br>{ep_title}",
                        "tut_title": tutorial_title,
                        "page_title": "直接記述 (ページなし)",
                        "ref_id": "N/A",
                        "indices": "N/A",
                        "actual_title": "直接テキスト記述あり",
                        "battle_tags": tags_str,
                        "status": "OK"
                    })
                else:
                    for p_idx, page in enumerate(pages):
                        page_title = page.get("title", f"ページ {p_idx+1}")
                        
                        if page.get("type") == "custom":
                            table_rows.append({
                                "file_ep": f"{filename}<br>{ep_title}" if p_idx == 0 else "",
                                "tut_title": tutorial_title if p_idx == 0 else "",
                                "page_title": page_title,
                                "ref_id": "custom",
                                "indices": "N/A",
                                "actual_title": "カスタムデータテーブル",
                                "battle_tags": tags_str if p_idx == 0 else "",
                                "status": "OK"
                            })
                        else:
                            ref_id = page.get("referenceTopicId", "")
                            sec_indices = page.get("sectionIndices", [])
                            
                            actual_titles = []
                            status = "OK"
                            
                            if ref_id in ref_map:
                                ref_item = ref_map[ref_id]
                                sections = ref_item.get("sections", [])
                                for s_idx in sec_indices:
                                    if 0 <= s_idx < len(sections):
                                        actual_titles.append(sections[s_idx].get("title", "無題"))
                                    else:
                                        actual_titles.append(f"⚠️ Index {s_idx} 範囲外 (全 {len(sections)} セクション)")
                                        status = "ERROR (Index)"
                                        warnings.append(f"{filename} - {ep_title}: ページ「{page_title}」のインデックス {s_idx} が範囲外です。")
                            else:
                                actual_titles.append(f"⚠️ `{ref_id}` 存在せず")
                                status = "ERROR (Ref ID)"
                                warnings.append(f"{filename} - {ep_title}: 参照トピックID `{ref_id}` が存在しません。")
                            
                            actual_title_str = ", ".join(actual_titles)
                            
                            # Simple semantic check for mismatch
                            title_lower = page_title.lower()
                            actual_lower = actual_title_str.lower()
                            
                            # Check for "être" mismatch
                            if ("être" in title_lower or "etre" in title_lower or "存在動詞" in title_lower) and "être" not in actual_lower and "etre" not in actual_lower:
                                status = "WARNING (être mismatch)"
                                warnings.append(f"{filename} - {ep_title}: ページ「{page_title}」に 'être' が指定されていますが、実際の内容は「{actual_title_str}」です。")
                            # Check for "aller" or "venir" mismatch
                            elif ("aller" in title_lower or "venir" in title_lower) and "aller" not in actual_lower and "venir" not in actual_lower:
                                status = "WARNING (aller/venir mismatch)"
                                warnings.append(f"{filename} - {ep_title}: ページ「{page_title}」に 'aller/venir' が指定されていますが、実際の内容は「{actual_title_str}」です。")
                            # Check for "複数" mismatch
                            elif "複数" in title_lower and "複数" not in actual_lower and "pluriel" not in actual_lower and "plural" not in actual_lower:
                                status = "WARNING (plural mismatch)"
                                warnings.append(f"{filename} - {ep_title}: ページ「{page_title}」に '複数形' が指定されていますが、実際の内容は「{actual_title_str}」です。")
                            
                            table_rows.append({
                                "file_ep": f"{filename}<br>{ep_title}" if p_idx == 0 else "",
                                "tut_title": tutorial_title if p_idx == 0 else "",
                                "page_title": page_title,
                                "ref_id": ref_id,
                                "indices": str(sec_indices),
                                "actual_title": actual_title_str,
                                "battle_tags": tags_str if p_idx == 0 else "",
                                "status": status
                            })

# Generate markdown summary
md = []
md.append("# 📊 事前解説・文法リファレンス 整合性整合レポート")
md.append("")
md.append("各チャプターの「事前解説スライドの指定（JSON）」と「文法リファレンスの実際の内容（grammar_reference.json）」の紐付けを抽出し、整合性をチェックした結果です。")
md.append("")

if warnings:
    md.append("## ⚠️ 検出された不整合・警告一覧")
    md.append("")
    for w in warnings:
        md.append(f"- {w}")
    md.append("")
else:
    md.append("##  不整合は検出されませんでした")
    md.append("すべての事前解説スライドと文法リファレンスの紐付けは正常です。")
    md.append("")

md.append("## 📋 事前解説マッピング一覧表")
md.append("")
md.append("| ファイル / エピソード | 事前解説タイトル | スライドの指定タイトル | 参照Topic ID | 参照S-Idx | 実際の内容セクションタイトル | 直後の戦闘指定タグ | 状態 |")
md.append("|---|---|---|---|---|---|---|---|")

for row in table_rows:
    md.append(f"| {row['file_ep']} | {row['tut_title']} | {row['page_title']} | `{row['ref_id']}` | `{row['indices']}` | {row['actual_title']} | {row['battle_tags']} | **{row['status']}** |")

summary_path = r"C:\Users\kotya\.gemini\antigravity-ide\brain\5ad0167c-a4b9-4a4b-9ea5-9028bcbdfab8\pre_explanations_audit.md"
with open(summary_path, "w", encoding="utf-8") as f:
    f.write("\n".join(md))

print(f"SUCCESS: Summary generated at {summary_path}")
