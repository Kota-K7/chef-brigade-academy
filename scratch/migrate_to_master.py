import json
import os

levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
data_dir = 'data'

def load_json(filepath):
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def migrate():
    print("Starting master database migration...")
    
    for lvl in levels:
        vocab_file = os.path.join(data_dir, f'vocabulary_{lvl}.json')
        grammar_file = os.path.join(data_dir, f'grammar_{lvl}.json')
        cuisine_file = os.path.join(data_dir, f'cuisine_{lvl}.json')
        
        vocabs = load_json(vocab_file)
        grammars = load_json(grammar_file)
        cuisines = load_json(cuisine_file)
        
        knowledge_list = []
        
        # 1. Start with Vocabularies as base entities
        for v in vocabs:
            kb_item = {
                "id": v.get("id"),
                "category": v.get("category", "Vocabulary"),
                "level": lvl,
                "tags": v.get("tags", []),
                "french": v.get("french"),
                "english": v.get("english"),
                "japanese": v.get("japanese"),
                "definition_fr": v.get("definition_fr"),
                "is_professional": v.get("is_professional", True)
            }
            
            # If the vocabulary has custom context_fr, keep it as an example
            if v.get("context_fr"):
                kb_item["examples"] = [{
                    "fr": v.get("context_fr"),
                    "en": v.get("context_en", ""),
                    "ja": v.get("context_ja", "")
                }]
                
            knowledge_list.append(kb_item)
            
        # 2. Integrate Grammar topics
        for g in grammars:
            # Check if there is an existing vocab entity with similar topic or tag
            matched = False
            for kb in knowledge_list:
                # Simple heuristical match
                if kb.get("french") and kb.get("french").lower() in g.get("topic", "").lower():
                    kb["grammar"] = {
                        "topic": g.get("topic"),
                        "explanation_ja": g.get("explanation_ja", ""),
                        "explanation_en": g.get("explanation_en", "")
                    }
                    if "examples" not in kb:
                        kb["examples"] = []
                    kb["examples"].extend(g.get("examples", []))
                    matched = True
                    break
            
            # If no match, save as an independent Grammar entity
            if not matched:
                kb_item = {
                    "id": g.get("id", f"kb_gram_{g.get('topic', '').lower().replace(' ', '_')[:20]}"),
                    "category": "Grammar",
                    "level": lvl,
                    "tags": ["grammar"],
                    "grammar": {
                        "topic": g.get("topic"),
                        "explanation_ja": g.get("explanation_ja", ""),
                        "explanation_en": g.get("explanation_en", "")
                    },
                    "examples": g.get("examples", [])
                }
                knowledge_list.append(kb_item)

        # 3. Integrate Cuisine Theory topics
        for c in cuisines:
            # Check if there is an existing vocab/grammar entity to attach to
            matched = False
            for kb in knowledge_list:
                if kb.get("french") and kb["french"].lower() in c.get("topic", "").lower():
                    kb["cuisine"] = {
                        "topic": c.get("topic"),
                        "content_fr": c.get("content_fr", ""),
                        "content_en": c.get("content_en", ""),
                        "content_ja": c.get("content_ja", "")
                    }
                    matched = True
                    break
            
            if not matched:
                kb_item = {
                    "id": c.get("id", f"kb_cuis_{c.get('topic', '').lower().replace(' ', '_')[:20]}"),
                    "category": "Theory",
                    "level": lvl,
                    "tags": c.get("tags", ["cuisine-theory"]),
                    "cuisine": {
                        "topic": c.get("topic"),
                        "content_fr": c.get("content_fr", ""),
                        "content_en": c.get("content_en", ""),
                        "content_ja": c.get("content_ja", "")
                    }
                }
                knowledge_list.append(kb_item)

        # Write the consolidated knowledge file
        out_file = os.path.join(data_dir, f'knowledge_{lvl}.json')
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(knowledge_list, f, indent=2, ensure_ascii=False)
            
        print(f"Created {out_file} with {len(knowledge_list)} master entities.")

    print("Migration finished successfully.")

if __name__ == "__main__":
    migrate()
