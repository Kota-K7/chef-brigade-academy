# -*- coding: utf-8 -*-
"""
Chef Brigade Academy - Wiktionary Data Importer & Categorizer
===========================================================
This script parses Wiktionary JSONL dumps (from Kaikki.org) and merges words
into the academy database, categorizing them into 'Professional' (is_professional: true)
or 'General' (is_professional: false) based on linguistic categories, and tagging 
them by CEFR levels.

How to use:
1. Download the French Wiktionary JSON dump (raw-wikitext or parsed JSONL) from Kaikki.org:
   e.g., French vocabulary dictionary from: https://kaikki.org/dictionary/French/index.html
2. Save the downloaded jsonl file locally.
3. Run this script pointing to the JSONL path:
   python scratch/import_wiktionary.py /path/to/kaikki.org-french.jsonl
"""

import os
import json
import sys

ALL_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

# Culinary matching keywords for automatic professional categorization
CULINARY_KEYWORDS = {
    'cuisine', 'cooking', 'gastronomie', 'gastronomy', 'alimentation', 'food',
    'ingrédient', 'ingredient', 'légume', 'vegetable', 'viande', 'meat',
    'poisson', 'fish', 'ustensile', 'utensil', 'boisson', 'drink', 'plat',
    'cooking techniques', 'baking', 'pâtisserie', 'sauce', 'chef'
}

def load_existing_vocab(level):
    filepath = os.path.join(os.path.dirname(__file__), '..', 'data', f'vocabulary_{level}.json')
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_vocab(level, data):
    filepath = os.path.join(os.path.dirname(__file__), '..', 'data', f'vocabulary_{level}.json')
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated vocabulary_{level}.json with {len(data)} total items.")

def is_culinary(entry):
    """
    Scans Wiktionary entry categories, glosses, and tags for culinary topics.
    """
    # Scan categories
    categories = entry.get('categories', [])
    for cat in categories:
        cat_lower = cat.lower()
        if any(keyword in cat_lower for keyword in CULINARY_KEYWORDS):
            return True
            
    # Scan senses (definitions)
    senses = entry.get('senses', [])
    for sense in senses:
        glosses = sense.get('glosses', [])
        for gloss in glosses:
            gloss_lower = gloss.lower()
            if any(keyword in gloss_lower for keyword in CULINARY_KEYWORDS):
                return True
        
        # Scan topic tags inside senses
        topics = sense.get('topics', [])
        for topic in topics:
            topic_lower = topic.lower()
            if any(keyword in topic_lower for keyword in CULINARY_KEYWORDS):
                return True
                
    return False

def update_meta_json():
    """
    Aggregates statistics from all files and updates meta.json.
    """
    vocab_count = 0
    grammar_count = 0
    cuisine_count = 0
    all_vocab_items = []
    
    # Sum counts from all A1-C2 files
    for level in ALL_LEVELS:
        # Vocabulary
        vocab_path = os.path.join(os.path.dirname(__file__), '..', 'data', f'vocabulary_{level}.json')
        if os.path.exists(vocab_path):
            try:
                with open(vocab_path, 'r', encoding='utf-8') as f:
                    items = json.load(f)
                    vocab_count += len(items)
                    all_vocab_items.extend(items)
            except Exception:
                pass
                
        # Grammar
        grammar_path = os.path.join(os.path.dirname(__file__), '..', 'data', f'grammar_{level}.json')
        if os.path.exists(grammar_path):
            try:
                with open(grammar_path, 'r', encoding='utf-8') as f:
                    grammar_count += len(json.load(f))
            except Exception:
                pass
                
        # Cuisine
        cuisine_path = os.path.join(os.path.dirname(__file__), '..', 'data', f'cuisine_{level}.json')
        if os.path.exists(cuisine_path):
            try:
                with open(cuisine_path, 'r', encoding='utf-8') as f:
                    cuisine_count += len(json.load(f))
            except Exception:
                pass

    # Pick a random featured vocabulary
    import random
    featured = random.choice(all_vocab_items) if all_vocab_items else None
    
    meta_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'meta.json')
    meta_data = {
        "counts": {
            "vocabulary": vocab_count,
            "grammar": grammar_count,
            "cuisine": cuisine_count
        },
        "featured": featured
    }
    
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(meta_data, f, indent=2, ensure_ascii=False)
    print("Successfully updated meta.json statistics.")

def parse_wiktionary_dump(jsonl_path):
    if not os.path.exists(jsonl_path):
        print(f"Error: File {jsonl_path} does not exist.")
        return

    print("Parsing Wiktionary dump and classifying vocabularies (A1-C2)...")
    
    vocab_decks = {lvl: load_existing_vocab(lvl) for lvl in ALL_LEVELS}
    existing_ids = {lvl: set(item['id'] for item in vocab_decks[lvl]) for lvl in ALL_LEVELS}

    imported_count = 0
    
    with open(jsonl_path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                entry = json.loads(line.strip())
            except Exception:
                continue
                
            # Filter French words
            if entry.get('lang') != 'French':
                continue
                
            word = entry.get('word')
            if not word or len(word) < 2:
                continue
                
            # Extract French definition (first gloss)
            senses = entry.get('senses', [])
            if not senses:
                continue
                
            glosses = senses[0].get('glosses', [])
            if not glosses:
                continue
            definition_fr = glosses[0]
            
            # Extract English translation
            translations = entry.get('translations', [])
            english_trans = ""
            japanese_trans = ""
            
            for trans in translations:
                if trans.get('code') == 'en' and not english_trans:
                    english_trans = trans.get('word')
                elif trans.get('code') == 'ja' and not japanese_trans:
                    japanese_trans = trans.get('word')
            
            if not english_trans:
                english_trans = entry.get('english_rough_translation', 'Translation not found')
                
            # Skip if translations are missing entirely
            if not english_trans and not japanese_trans:
                continue

            # Determine professional vs general
            professional = is_culinary(entry)
            
            # Level heuristic (mock CEFR classifier: maps across A1 to C2 based on length/rarity)
            length = len(word)
            if length <= 5:
                level = 'A1'
            elif length <= 8:
                level = 'A2'
            elif length <= 10:
                level = 'B1'
            elif length <= 12:
                level = 'B2'
            elif length <= 14:
                level = 'C1'
            else:
                level = 'C2'
                
            # Build CBA vocab schema
            vocab_id = f"vocab_imported_{word.replace(' ', '_').lower()}"
            
            # Avoid duplicate imports
            if any(vocab_id in existing_ids[lvl] for lvl in ALL_LEVELS):
                continue
                
            tags = [entry.get('pos', 'noun')]
            if professional:
                tags.append('culinary')
            else:
                tags.append('general')
                
            # Add context dummy
            context_fr = f"Exemple avec le mot '{word}'."
            context_en = f"Example sentence using the word '{word}'."
            context_ja = f"'{word}'を使った例文。"

            new_vocab_item = {
                "id": vocab_id,
                "category": "Cuisine" if professional else "General",
                "level": level,
                "tags": tags,
                "french": word,
                "english": english_trans,
                "definition_fr": definition_fr,
                "japanese": japanese_trans or english_trans, 
                "context_fr": context_fr,
                "context_en": context_en,
                "context_ja": context_ja,
                "is_professional": professional
            }
            
            vocab_decks[level].append(new_vocab_item)
            existing_ids[level].add(vocab_id)
            imported_count += 1
            
            # Hard limit to prevent overflowing
            if imported_count >= 2000:
                print("Reached maximum import threshold (2000 words).")
                break
                
    # Save updated decks
    for lvl in ALL_LEVELS:
        save_vocab(lvl, vocab_decks[lvl])
        
    # Recalculate stats in meta.json
    update_meta_json()
        
    print(f"Successfully processed and imported {imported_count} words from Wiktionary across CEFR A1-C2.")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python scratch/import_wiktionary.py <path_to_kaikki_jsonl>")
        sys.exit(1)
        
    parse_wiktionary_dump(sys.argv[1])
