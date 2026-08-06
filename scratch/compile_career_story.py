import os
import re
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
src_dir = os.path.join(workspace_dir, "career_story", "chapters")
dest_dir = os.path.join(workspace_dir, "data", "story")

os.makedirs(dest_dir, exist_ok=True)

char_map = {
    "金竹": "kanetake",
    "満": "kanetake",
    "佐伯": "saeki",
    "エロディ": "elodie",
    "ガエル": "gael",
    "ジャン＝ピエール": "jean_pierre",
    "ピエール": "jean_pierre",
    "ジャン": "jean_pierre",
    "主人公": "hero",
    "？？？": None
}

# --- Expanded Questions Pools containing BOTH options/answerIndex AND acceptedAnswers ---

# Episode 1 Pools
ep1_basic_pool = [
    {
        "questionId": "q_career_0_1_1",
        "text": "「おはよう」や「こんにちは」を表す、最も一般的なフランス語の挨拶を入力してください。\n(Entrez la salutation standard du matin en français.)",
        "options": ["Bonjour", "Merci", "S'il vous plaît", "Enchanté"],
        "answerIndex": 0,
        "acceptedAnswers": ["Bonjour", "bonjour"],
        "explanation": "Bonjour は最も一般的な朝・日中の挨拶です。"
    },
    {
        "questionId": "q_career_0_1_2",
        "text": "「ありがとう」を意味するフランス語を入力してください。\n(Entrez le mot pour 'merci'.)",
        "options": ["Bonjour", "Merci", "S'il vous plaît", "Oui"],
        "answerIndex": 1,
        "acceptedAnswers": ["Merci", "merci"],
        "explanation": "Merci はフランス語の「ありがとう」です。"
    },
    {
        "questionId": "q_career_0_1_3",
        "text": "「私は（I）」に対応する、フランス語の主語人称代名詞を入力してください。\n(Entrez le pronom sujet pour 'Je'.)",
        "options": ["Tu", "Il", "Je", "Nous"],
        "answerIndex": 2,
        "acceptedAnswers": ["Je", "je"],
        "explanation": "フランス語の「私は」にあたる主語人称代名詞は Je です。"
    },
    {
        "questionId": "q_career_0_1_4",
        "text": "「私は新人です（Je ___ nouveau.）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme correcte de être: Je ___ nouveau.)",
        "options": ["suis", "es", "est", "sommes"],
        "answerIndex": 0,
        "acceptedAnswers": ["suis", "Suis"],
        "explanation": "主語が Je のとき、être の現在形は suis になります。"
    },
    {
        "questionId": "q_career_0_1_4_b",
        "text": "「君は準備ができている（Tu ___ prêt.）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme de être pour 'Tu'.)",
        "options": ["suis", "es", "est", "êtes"],
        "answerIndex": 1,
        "acceptedAnswers": ["es", "Es"],
        "explanation": "主語が Tu のとき、être の現在形は es になります。"
    },
    {
        "questionId": "q_career_0_1_4_c",
        "text": "「私は包丁を持っています（J'___ un couteau.）」の空欄に入る、動詞 avoir の一人称単数現在形を入力してください。\n(Entrez la forme de avoir pour 'Je'.)",
        "options": ["ai", "as", "a", "avons"],
        "answerIndex": 0,
        "acceptedAnswers": ["ai", "Ai"],
        "explanation": "主語が Je (j') のとき、avoir の現在形は ai になります。"
    },
    {
        "questionId": "q_career_0_1_4_d",
        "text": "「お願いします」を意味する丁寧なフランス語表現を入力してください。\n(Entrez 'please' en français.)",
        "options": ["Bonjour", "Merci", "S'il vous plaît", "Enchanté"],
        "answerIndex": 2,
        "acceptedAnswers": ["S'il vous plaît", "s'il vous plaît", "sil vous plait"],
        "explanation": "S'il vous plaît は「お願いします」を意味する丁寧な表現です。"
    }
]

ep1_applied_pool = [
    {
        "questionId": "q_career_0_1_5",
        "text": "「包丁・ナイフ（couteau）」は男性名詞です。不特定の「1本の包丁」を表す男性単数不定冠詞（___ couteau）を入力してください。\n(Entrez l'article indéfini pour 'couteau'.)",
        "options": ["un", "une", "des", "le"],
        "answerIndex": 0,
        "acceptedAnswers": ["un", "Un"],
        "explanation": "couteau は男性単数名詞なので、不定冠詞は un になります。"
    },
    {
        "questionId": "q_career_0_1_6",
        "text": "「片手鍋（casserole）」は女性名詞です。不特定の「1つの片手鍋」を表す女性単数不定冠詞（___ casserole）を入力してください。\n(Entrez l'article indéfini pour 'casserole'.)",
        "options": ["un", "une", "des", "la"],
        "answerIndex": 1,
        "acceptedAnswers": ["une", "Une"],
        "explanation": "casserole は女性単数名詞なので、不定冠詞は une になります。"
    },
    {
        "questionId": "q_career_0_1_7",
        "text": "「私は包丁を持っていません」の否定文「Je n'ai pas ___ couteau.」の空欄に入る前置詞を入力してください。\n(Entrez la préposition de négation.)",
        "options": ["un", "du", "de", "le"],
        "answerIndex": 2,
        "acceptedAnswers": ["de", "De"],
        "explanation": "否定文 (ne...pas) の直接目的語に付く不定冠詞は de に変化します。"
    },
    {
        "questionId": "q_career_0_1_7_b",
        "text": "「その料理長（chef / 男性名詞）」を表す男性単数定冠詞（___ chef）を入力してください。\n(Entrez l'article défini masculin: ___ chef.)",
        "options": ["le", "la", "les", "un"],
        "answerIndex": 0,
        "acceptedAnswers": ["le", "Le"],
        "explanation": "特定された男性単数名詞には定冠詞 le を使います。"
    },
    {
        "questionId": "q_career_0_1_7_c",
        "text": "「その厨房（cuisine / 女性名詞）」を表す女性単数定冠詞（___ cuisine）を入力してください。\n(Entrez l'article défini féminin: ___ cuisine.)",
        "options": ["le", "la", "les", "une"],
        "answerIndex": 1,
        "acceptedAnswers": ["la", "La"],
        "explanation": "特定された女性単数名詞には定冠詞 la を使います。"
    },
    {
        "questionId": "q_career_0_1_7_d",
        "text": "「私はお皿（assiette / 女性名詞）を持っていません」は「Je n'ai pas ___ assiette.」となります。空欄に入る語句を入力してください。\n(Entrez la préposition de négation devant voyelle.)",
        "options": ["de", "d'", "une", "l'"],
        "answerIndex": 1,
        "acceptedAnswers": ["d'", "d", "D'"],
        "explanation": "否定の de の後ろに母音で始まる名詞が続く場合、エリジオンして d' になります。"
    }
]

ep1_mixed_pool = [
    {
        "questionId": "q_career_0_1_8",
        "text": "「3」を表すフランス語の数字を入力してください。\n(Entrez le nombre '3' en français.)",
        "options": ["deux", "trois", "quatre", "cinq"],
        "answerIndex": 1,
        "acceptedAnswers": ["trois", "Trois"],
        "explanation": "3はフランス語で trois と言います。"
    },
    {
        "questionId": "q_career_0_1_9",
        "text": "「トマト（tomate / 女性名詞）」の複数不定形「いくつかのトマト」を表すフランス語（冠詞＋名詞の複数形）を入力してください。\n(Traduisez: some tomatoes)",
        "options": ["une tomate", "des tomate", "des tomatoes", "des tomates"],
        "answerIndex": 3,
        "acceptedAnswers": ["des tomates", "Des tomates"],
        "explanation": "複数不定冠詞 des と、名詞の末尾に s を付けた tomates を組み合わせます。"
    },
    {
        "questionId": "q_career_0_1_10",
        "text": "「私たちは持っています（Nous ___）」の空欄に入る、動詞 avoir の現在形活用を入力してください。\n(Entrez la forme correcte de avoir: Nous ___)",
        "options": ["avons", "avez", "ont", "sommes"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons", "Avons"],
        "explanation": "主語が Nous のとき、avoir の現在形は avons になります。"
    },
    {
        "questionId": "q_career_0_1_10_b",
        "text": "「彼らは〜です（Ils ___）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme de être pour 'Ils'.)",
        "options": ["sommes", "êtes", "sont", "ont"],
        "answerIndex": 2,
        "acceptedAnswers": ["sont", "Sont"],
        "explanation": "主語が Ils のとき、être の現在形は sont になります。"
    },
    {
        "questionId": "q_career_0_1_10_c",
        "text": "「1」を表すフランス語の数字（男性形）を入力してください。\n(Entrez le chiffre '1' en français.)",
        "options": ["un", "une", "deux", "trois"],
        "answerIndex": 0,
        "acceptedAnswers": ["un", "Un"],
        "explanation": "1はフランス語で un と言います。"
    },
    {
        "questionId": "q_career_0_1_10_d",
        "text": "「10」を表すフランス語の数字を入力してください。\n(Entrez le nombre '10'.)",
        "options": ["cinq", "huit", "neuf", "dix"],
        "answerIndex": 3,
        "acceptedAnswers": ["dix", "Dix"],
        "explanation": "10はフランス語で dix と書きます。"
    }
]

# Episode 2 Pools
ep2_basic_pool = [
    {
        "questionId": "q_career_0_2_1",
        "text": "「1リットルの牛乳」は「un litre ___ lait」と言います。空欄に入る前置詞を入力してください。\n(Entrez la préposition: un litre ___ lait.)",
        "options": ["de", "du", "le", "un"],
        "answerIndex": 0,
        "acceptedAnswers": ["de", "De"],
        "explanation": "分量や計量の単位を名詞と結ぶには前置詞 de を使います。"
    },
    {
        "questionId": "q_career_0_2_2",
        "text": "「200（two hundred）」を意味するフランス語を入力してください。\n(Entrez le nombre '200'.)",
        "options": ["deux cent", "deux cents", "deux centes", "cent deux"],
        "answerIndex": 1,
        "acceptedAnswers": ["deux cents", "deux cent", "Deux cents", "Deux cent"],
        "explanation": "200は deux cents と表現します。"
    },
    {
        "questionId": "q_career_0_2_3",
        "text": "「5」を意味するフランス語の数字を入力してください。\n(Entrez le chiffre '5'.)",
        "options": ["quatre", "cinq", "six", "sept"],
        "answerIndex": 1,
        "acceptedAnswers": ["cinq", "Cinq"],
        "explanation": "5はフランス語で cinq と書きます。"
    },
    {
        "questionId": "q_career_0_2_3_b",
        "text": "「1本の水（bouteille d'eau）」のように、容器を表す言葉を結ぶ前置詞（___ d'eau）を省略形で入力してください。\n(Entrez la préposition élidée.)",
        "options": ["de", "d'", "la", "une"],
        "answerIndex": 1,
        "acceptedAnswers": ["d'", "d", "D'"],
        "explanation": "母音で始まる水（eau）の前では前置詞 de は d' に縮約されます。"
    },
    {
        "questionId": "q_career_0_2_3_c",
        "text": "「7」を意味するフランス語の数字を入力してください。\n(Entrez le chiffre '7'.)",
        "options": ["six", "sept", "huit", "neuf"],
        "answerIndex": 1,
        "acceptedAnswers": ["sept", "Sept"],
        "explanation": "7はフランス語で sept と言います。"
    }
]

ep2_applied_pool = [
    {
        "questionId": "q_career_0_2_4",
        "text": "「15」を意味するフランス語の数字を入力してください。\n(Entrez le nombre '15'.)",
        "options": ["quatorze", "quinze", "seize", "dix-cinq"],
        "answerIndex": 1,
        "acceptedAnswers": ["quinze", "Quinze"],
        "explanation": "15はフランス語で quinze です。"
    },
    {
        "questionId": "q_career_0_2_5",
        "text": "「その包丁（複数形）」を表すフランス語（定冠詞複数＋名詞複数形）を入力してください。couteauの複数形はxがつく例外「couteaux」になります。\n(Traduisez: the knives)",
        "options": ["les couteaus", "les couteau", "les couteaux", "des couteaux"],
        "answerIndex": 2,
        "acceptedAnswers": ["les couteaux", "Les couteaux"],
        "explanation": "定冠詞の複数形 les と、複数形例外の couteaux を使います。"
    },
    {
        "questionId": "q_career_0_2_6",
        "text": "「12」を意味するフランス語の数字を入力してください。\n(Entrez le nombre '12'.)",
        "options": ["onze", "douze", "treize", "dix-deux"],
        "answerIndex": 1,
        "acceptedAnswers": ["douze", "Douze"],
        "explanation": "12はフランス語で douze です。"
    },
    {
        "questionId": "q_career_0_2_6_b",
        "text": "「それらの皿（複数形）」を表すフランス語（定冠詞複数＋名詞複数形）を入力してください。\n(Traduisez: the plates)",
        "options": ["l'assiette", "les assiette", "les assiettes", "des assiettes"],
        "answerIndex": 2,
        "acceptedAnswers": ["les assiettes", "Les assiettes"],
        "explanation": "特定されたお皿の複数形は les assiettes です。"
    },
    {
        "questionId": "q_career_0_2_6_c",
        "text": "「20」を意味するフランス語の数字を入力してください。\n(Entrez le nombre '20'.)",
        "options": ["dix", "vingt", "trente", "deux dix"],
        "answerIndex": 1,
        "acceptedAnswers": ["vingt", "Vingt"],
        "explanation": "20はフランス語で vingt と書きます。"
    }
]

ep2_mixed_pool = [
    {
        "questionId": "q_career_0_2_7",
        "text": "「私はオーブン（four / 男性名詞）を持っていません」は「Je n'ai pas ___ four.」となります。空欄に入る言葉を入力してください。\n(Entrez la préposition de négation.)",
        "options": ["un", "de", "le", "pas"],
        "answerIndex": 1,
        "acceptedAnswers": ["de", "De"],
        "explanation": "否定文では直接目的語の不定冠詞は de に変化します。"
    },
    {
        "questionId": "q_career_0_2_8",
        "text": "「18」を表すフランス語の数字を入力してください（ハイフンを含めてください）。\n(Entrez le nombre '18'.)",
        "options": ["dix huit", "dix-huit", "dix-sept", "dix-neuf"],
        "answerIndex": 1,
        "acceptedAnswers": ["dix-huit", "Dix-huit"],
        "explanation": "18は dix-huit (10 + 8) です。"
    },
    {
        "questionId": "q_career_0_2_9",
        "text": "「彼らは厨房にいます（Ils ___ dans la cuisine.）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme de être pour 'Ils'.)",
        "options": ["suis", "sommes", "sont", "ont"],
        "answerIndex": 2,
        "acceptedAnswers": ["sont", "Sont"],
        "explanation": "主語が Ils のとき、être の現在形は sont です。"
    },
    {
        "questionId": "q_career_0_2_9_b",
        "text": "「私たちは2本のナイフを持っています（Nous ___ deux couteaux.）」の空欄に入る、動詞 avoir の現在形活用を入力してください。\n(Entrez la forme de avoir pour 'Nous'.)",
        "options": ["avons", "avez", "ont", "sommes"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons", "Avons"],
        "explanation": "主語が Nous のとき、avoir の現在形は avons になります。"
    },
    {
        "questionId": "q_career_0_2_9_c",
        "text": "「あなたは〜を持っている（Vous ___）」の空欄に入る、動詞 avoir の二人称複数現在形を入力してください。\n(Entrez la forme de avoir pour 'Vous'.)",
        "options": ["avez", "avons", "ont", "êtes"],
        "answerIndex": 0,
        "acceptedAnswers": ["avez", "Avez"],
        "explanation": "主語が Vous のとき、avoir の現在形は avez になります。"
    }
]

def clean_scene_text_lines(text_lines):
    joined = ""
    for line in text_lines:
        line = line.strip()
        if not line:
            continue
        if joined:
            if joined[-1].isalnum() and line[0].isalnum():
                joined += " " + line
            else:
                joined += line
        else:
            joined = line
    return joined

def parse_dialogue_string(dialog_str):
    steps = []
    subchunks = dialog_str.split("→")
    for sub in subchunks:
        sub = sub.strip()
        if not sub:
            continue
            
        dialogue_match = re.match(r"^([^：:\s]+)\s*[：:][「「“\"](.+?)[」」”\"](.*)$", sub, re.DOTALL)
        if dialogue_match:
            char_name = dialogue_match.group(1).strip()
            char_key = char_map.get(char_name, char_name.lower())
            text = dialogue_match.group(2).strip()
            extra = dialogue_match.group(3).strip()
            
            step = {
                "type": "dialog",
                "character": char_key,
                "text": text,
                "position": "center"
            }
            
            if "└" in extra:
                lp_chunk = extra.split("└")[-1].strip()
                lp_match = re.match(r"^([^\s（(]+(?:（[^）]+）|\([^)]+\))?)(.*)$", lp_chunk, re.DOTALL)
                if lp_match:
                    step["learningPoint"] = {
                        "title": lp_match.group(1).strip(),
                        "text": lp_match.group(2).strip()
                    }
                else:
                    step["learningPoint"] = {
                        "title": lp_chunk,
                        "text": ""
                    }
            steps.append(step)
        else:
            steps.append({
                "type": "dialog",
                "character": None,
                "text": sub,
                "position": "center"
            })
    return steps

def compile_file(filepath, ep_num):
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found")
        return None
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if ep_num == 1:
        if "【第0-2話" in content:
            content = content.split("【第0-2話")[0]
            
    lines = content.split("\n")
    
    scenes = {}
    current_scene = None
    scene_lines = []
    
    goals_map = {}
    ep_goal = "基本コミュニケーションと動詞être/avoirの学習"
    
    idx = 0
    while idx < len(lines):
        line = lines[idx].strip()
        if not line:
            idx += 1
            continue
            
        if line.startswith("#") or line.startswith("【第"):
            idx += 1
            continue
            
        if line.startswith("Scene "):
            if current_scene:
                scenes[current_scene] = clean_scene_text_lines(scene_lines)
            current_scene = line.split("：")[0].strip().split(":")[0].strip()
            scene_lines = []
            idx += 1
            continue
            
        if "今日の目標" in line:
            m = re.search(r"今日の目標：\s*「?([^」]+)」?", line)
            if m:
                ep_goal = m.group(1).strip()
            idx += 1
            continue
            
        is_targets_header = "事前解説" in line or "表示項目" in line
        is_metadata_header = "問題内容" in line or "問題の指定" in line or "応用問題" in line or "混合" in line or "基礎問題" in line or "混合復習" in line
        
        if is_targets_header or is_metadata_header:
            header_name = line
            idx += 1
            content_lines = []
            while idx < len(lines):
                next_line = lines[idx].strip()
                if not next_line:
                    idx += 1
                    continue
                if next_line.startswith("Scene ") or "今日の目標" in next_line or "Part " in next_line or "【第" in next_line:
                    break
                content_lines.append(next_line)
                idx += 1
                
            if is_targets_header:
                part_key = "part1"
                if "②" in header_name or "2" in header_name or "③" in header_name or "3" in header_name:
                    if "③" in header_name or "3" in header_name:
                        part_key = "part3"
                    else:
                        part_key = "part2"
                
                split_targets = []
                for cl in content_lines:
                    if "→" in cl:
                        split_targets.extend([item.strip() for item in cl.split("→") if item.strip()])
                    else:
                        split_targets.append(cl)
                goals_map[part_key] = split_targets
            continue
            
        if current_scene:
            scene_lines.append(line)
        idx += 1
        
    if current_scene:
        scenes[current_scene] = clean_scene_text_lines(scene_lines)
        
    sequence = []
    
    # Define detailed pre-battle reference pages matching the items for Episode 1 & 2
    if ep_num == 1:
        part1_pages = [
            {
                "title": "挨拶・基本コミュニケーション",
                "type": "custom",
                "text": "フランス語の基本の挨拶表現です。声に出して発音してみましょう。",
                "headers": ["フランス語", "意味", "発音"],
                "rows": [
                    ["Bonjour", "おはよう・こんにちは", "ボンジュール"],
                    ["Merci", "ありがとう", "メルシー"],
                    ["S'il vous plaît", "お願いします", "シル・ヴ・プレ"],
                    ["Enchanté", "はじめまして", "アンシャンテ"]
                ]
            },
            {
                "title": "主語人称代名詞 (Les pronoms sujets)",
                "referenceTopicId": "ref_subjects",
                "sectionIndices": [0]
            },
            {
                "title": "動詞 être の現在形活用",
                "type": "custom",
                "text": "英語の be 動詞に相当する、状態や存在を表す最も重要な動詞です。",
                "headers": ["人称", "活用形", "発音", "例文"],
                "rows": [
                    ["je", "suis", "スィ", "Je suis nouveau. (私は新人です)"],
                    ["tu", "es", "エ", "Tu es prêt ? (君は準備できた？)"],
                    ["il / elle", "est", "エ", "Il est chef. (彼は料理長です)"],
                    ["nous", "sommes", "ソム", "Nous sommes prêts. (私たちは準備完了です)"],
                    ["vous", "êtes", "エット", "Vous êtes en retard. (あなたは遅刻です)"],
                    ["ils / elles", "sont", "ソン", "Ils sont dans la cuisine. (彼らは厨房にいます)"]
                ]
            },
            {
                "title": "動詞 avoir の現在形活用",
                "type": "custom",
                "text": "英語の have に相当する、所有や経験を表す極めて重要な動詞です。1人称単数 je の後ろでは、母音が衝突するため j'ai と縮約（エリジオン）します。",
                "headers": ["人称", "活用形", "発音", "例文"],
                "rows": [
                    ["je (j')", "ai", "エ", "J'ai un couteau. (私はナイフを持っています)"],
                    ["tu", "as", "ア", "Tu as une assiette. (君はお皿を持っています)"],
                    ["il / elle", "a", "ア", "Il a du temps. (彼は時間があります)"],
                    ["nous", "avons", "アヴォン", "Nous avons du sel. (私たちは塩を持っています)"],
                    ["vous", "avez", "アヴェ", "Vous avez du sucre. (あなたは砂糖を持っています)"],
                    ["ils / elles", "ont", "オン", "Ils ont des casseroles. (彼らは片手鍋を持っています)"]
                ]
            }
        ]
        part2_pages = [
            {
                "title": "否定の de (Règle du 'De')",
                "type": "custom",
                "text": "否定文 (ne...pas) の後ろに不特定名詞（通常不定冠詞 un, une, des が付くもの）が来る場合、冠詞は前置詞 'de' (母音または無声の h の前では d') に変化します。",
                "headers": ["肯定文 (Avoir)", "否定文 (de に変化)"],
                "rows": [
                    ["J'ai un couteau. (ナイフを持っています)", "Je n'ai pas de couteau. (ナイフを持っていません)"],
                    ["J'ai une casserole. (片手鍋を持っています)", "Je n'ai pas de casserole. (片手鍋を持っていません)"]
                ]
            },
            {
                "title": "不定冠詞と定冠詞",
                "referenceTopicId": "ref_definite_indefinite_articles",
                "sectionIndices": [0, 2]
            }
        ]
        part3_pages = [
            {
                "title": "数字 1〜10",
                "referenceTopicId": "ref_numbers",
                "sectionIndices": [0]
            }
        ]
    else:
        # Episode 2 Pages
        part1_pages = [
            {
                "title": "定冠詞と不定冠詞の使い分け",
                "referenceTopicId": "ref_definite_indefinite_articles",
                "sectionIndices": [0, 2]
            },
            {
                "title": "数字と計量表現",
                "referenceTopicId": "ref_numbers",
                "sectionIndices": [0]
            }
        ]
        part2_pages = [
            {
                "title": "複数名詞と冠詞",
                "referenceTopicId": "ref_numbers",
                "sectionIndices": [2, 3]
            },
            {
                "title": "数字 11〜20",
                "referenceTopicId": "ref_numbers",
                "sectionIndices": [1]
            }
        ]
        part3_pages = [
            {
                "title": "動詞 être の複数形活用",
                "type": "custom",
                "text": "複数人称の être 活用形です。厨房内での指示や状況確認で多用します。",
                "headers": ["人称", "活用形", "発音", "例文"],
                "rows": [
                    ["nous", "sommes", "ソム", "Nous sommes prêts. (私たちは準備完了です)"],
                    ["vous", "êtes", "エット", "Vous êtes en retard. (あなたは遅刻です)"],
                    ["ils / elles", "sont", "ソン", "Ils sont dans la cuisine. (彼らは厨房にいます)"]
                ]
            },
            {
                "title": "動詞 avoir の複数形活用",
                "type": "custom",
                "text": "複数人称の avoir 活用形です。食材やツールの在庫状況を確認する際に用います。",
                "headers": ["人称", "活用形", "発音", "例文"],
                "rows": [
                    ["nous", "avons", "アヴォン", "Nous avons du sel. (私たちは塩を持っています)"],
                    ["vous", "avez", "アヴェ", "Vous avez du sucre. (あなたは砂糖を持っています)"],
                    ["ils / elles", "ont", "オン", "Ils ont des casseroles. (彼らは片手鍋を持っています)"]
                ]
            }
        ]

    # --- 1. Episode Start Goal Card (NO reference preview) ---
    targets1 = goals_map.get("part1", ["フランス語 of 基本コミュニケーション"])
    sequence.append({
        "type": "tutorial",
        "title": "今日の学習目標",
        "goal": ep_goal,
        "targets": targets1
    })
    
    # --- 2. Scene 1 Dialogues ---
    scene1_text = scenes.get("Scene 1", "")
    scene1_steps = parse_dialogue_string(scene1_text)
    for s in scene1_steps:
        s["background"] = "restaurant" if ep_num == 1 else "kitchen"
        sequence.append(s)
        
    # --- 3. Pre-Battle Study Dashboard (FORCED study pages) ---
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part1_pages
    })
    
    if ep_num == 1:
        battle1_criteria = [{"tag": "#greetings", "count": 2}, {"tag": "#subjects", "count": 1}, {"tag": "#etre", "count": 2}]
        battle2_criteria = [{"tag": "#articles", "count": 4}, {"tag": "#negation", "count": 3}]
        battle3_criteria = [{"tag": "#numbers", "count": 4}, {"tag": "#plurals", "count": 3}, {"tag": "#avoir", "count": 3}]
    else:
        battle1_criteria = [{"tag": "#units", "count": 3}, {"tag": "#numbers", "count": 2}]
        battle2_criteria = [{"tag": "#numbers", "count": 3}, {"tag": "#plurals", "count": 4}]
        battle3_criteria = [{"tag": "#negation", "count": 3}, {"tag": "#numbers", "count": 3}, {"tag": "#etre", "count": 2}, {"tag": "#avoir", "count": 2}]

    sequence.append({
        "type": "fixedBattle",
        "enemyName": "ジャン＝ピエール (シェフ)" if ep_num == 1 else "ガエル (製菓長)",
        "enemyHp": 5,
        "enemyDamage": 2,
        "criteria": battle1_criteria
    })
    
    # --- 4. Scene 2 Dialogues ---
    scene2_text = scenes.get("Scene 2", "")
    scene2_steps = parse_dialogue_string(scene2_text)
    for s in scene2_steps:
        s["background"] = "kitchen"
        sequence.append(s)
        
    # --- 5. Applied Pre-Battle Study Dashboard (FORCED study pages) ---
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "応用問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part2_pages
    })
    
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "エロディ (先輩)" if ep_num == 1 else "佐伯 (スーシェフ)",
        "enemyHp": 7,
        "enemyDamage": 2,
        "criteria": battle2_criteria
    })
    
    # --- 6. Scene 3 Dialogues ---
    scene3_text = scenes.get("Scene 3", "")
    scene3_steps = parse_dialogue_string(scene3_text)
    for s in scene3_steps:
        s["background"] = "kitchen"
        sequence.append(s)
        
    # --- 7. Mixed Pre-Battle Study Dashboard (FORCED study pages) ---
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "総合復習の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part3_pages
    })
    
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "ジャン＝ピエール (シェフ)",
        "enemyHp": 10,
        "enemyDamage": 2,
        "criteria": battle3_criteria
    })
    
    # --- 8. Scene 4/5 Dialogues ---
    scene4_text = scenes.get("Scene 4〜5", "") or scenes.get("Scene 4", "")
    scene4_steps = parse_dialogue_string(scene4_text)
    for s in scene4_steps:
        s["background"] = "restaurant"
        sequence.append(s)
        
    # --- 9. Reward Stamp Stage ---
    sequence.append({
        "type": "reward",
        "xp": 100,
        "unlockedEpisodeId": f"career_ep_0_2" if ep_num == 1 else None
    })
    
    return {
        "episodeId": f"career_ep_0_{ep_num}",
        "episodeTitle": "第0-1話：フランス料理店へようこそ" if ep_num == 1 else "第0-2話：最初の注文 (La Première Commande)",
        "recommendedPlayTime": "5 mins",
        "backgrounds": {
            "bgBlack": "#000000",
            "restaurant": "url('assets/story/career_story/restaurant.webp')",
            "kitchen": "url('assets/story/career_story/kitchen.webp')",
            "gael_sweets": "url('assets/story/career_story/gael_sweets.webp')"
        },
        "characters": {
            "hero": { "name": "主人公" },
            "kanetake": {
                "name": "金竹満",
                "images": { "default": "assets/story/career_story/kanetake.webp" }
            },
            "saeki": {
                "name": "佐伯博",
                "images": { "default": "assets/story/career_story/saeki.webp" }
            },
            "elodie": {
                "name": "エロディ",
                "images": { "default": "assets/story/career_story/elodie.webp" }
            },
            "gael": {
                "name": "ガエル",
                "images": { "default": "assets/story/career_story/gael.webp" }
            },
            "jean_pierre": {
                "name": "ジャン＝ピエール",
                "images": { "default": "assets/story/career_story/jean_pierre.webp" }
            }
        },
        "sequence": sequence
    }

def main():
    episodes = []
    
    # Parse Ep 1
    file_ep1 = os.path.join(src_dir, "chapter_0_ep_1.md")
    ep1_data = compile_file(file_ep1, 1)
    if ep1_data:
        episodes.append(ep1_data)
        print("Compiled Episode 1 successfully.")
        
    # Parse Ep 2
    file_ep2 = os.path.join(src_dir, "chapter_0_ep_2.md")
    ep2_data = compile_file(file_ep2, 2)
    if ep2_data:
        episodes.append(ep2_data)
        print("Compiled Episode 2 successfully.")
        
    chapter_data = {
        "chapterId": "career_0",
        "chapterTitle": "第0章: 金竹満「はじまりへの招待」",
        "notes": "フランス料理店でのアルバイトから始まり、一人前の料理人へと成長していくストーリー",
        "episodes": episodes
    }
    
    dest_file = os.path.join(dest_dir, "chapter_career_0.json")
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    print(f"Saved compiled VN JSON to {dest_file}")

if __name__ == "__main__":
    main()
