import json

# 1. Load existing chapter_3.json
with open('rpg/history/chapter_3.json', 'r', encoding='utf-8') as f:
    ch3 = json.load(f)

# Update royal_domain in existing episodes (ep_3_1, ep_3_2, ep_3_3)
for ep in ch3['episodes']:
    if 'backgrounds' in ep and 'royal_domain' in ep['backgrounds']:
        ep['backgrounds']['royal_domain'] = "url('assets/story/backgrounds/french_royal_domain.webp')"

# 2. Define Episode 3 Ex 1
ep_3_ex1 = {
    "episodeId": "ep_3_ex1",
    "episodeTitle": "第3-外伝1: 教皇と十字軍の熱狂",
    "recommendedPlayTime": "15 mins",
    "backgrounds": {
        "bgBlack": "#000000",
        "pepin_donation": "url('assets/story/backgrounds/pepin_donation.webp')",
        "canossa": "url('assets/story/backgrounds/canossa.webp')",
        "church_history": "url('assets/story/backgrounds/church_history.webp')"
    },
    "characters": {
        "narrator": {
            "name": "ナレーター"
        }
    },
    "sequence": [
        {
            "type": "dialog",
            "background": "pepin_donation",
            "character": None,
            "text": "「イングランドとフランスの王たちが血みどろの領土争いに明け暮れていた12世紀から、少し時代を遡上り、『ローマ教皇の歴史』を見てみよう」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "pepin_donation",
            "character": None,
            "text": "「初期のローマ教皇は、精神的な権威こそあれど、自らの領土を持たない不安定な存在であった。しかし8世紀、教皇に土地を与える王が登場する。われらがピピンである（二章参照）」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "pepin_donation",
            "character": None,
            "text": "「ピピンは王位を簒奪する際、教皇の後ろ盾を得た。その見返りとして、彼はイタリア半島の敵（ランゴバルド族）を討伐し、獲得したラヴェンナなどの土地を教皇にプレゼントした。世に言う『ピピンの寄進（756年）』である。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "pepin_donation",
            "character": None,
            "text": "「Pépin est le roi qui a donné des terres au pape. (ピピンは教皇に土地を与えた王である)」",
            "characters": [],
            "learningPoint": {
                "title": "歴史・文法ポイント",
                "text": "解説: 意味: 「ピピンは教皇に土地を与えた王だ」\nPépin (ピピン) ＋ est le roi (王である) ＋ qui (〜であるところの: 主格の関係代名詞) ＋ a donné (与えた) ＋ des terres (土地を) ＋ au pape (教皇に)。\n★重要文法（#relative_pronouns_basic, #verbs）: 先行詞（le roi）を修飾し、動詞（a donné）の主語となる関係代名詞「qui」の基本用法です。"
            }
        },
        {
            "type": "battle",
            "background": "pepin_donation",
            "enemy": {
                "name": "ピピンの寄進と教皇領の誕生",
                "hp": 7,
                "damage": 2
            },
            "criteria": [
                {
                    "tag": "#relative_pronouns_basic",
                    "count": 4
                },
                {
                    "tag": "#verbs",
                    "count": 3
                }
            ]
        },
        {
            "type": "dialog",
            "background": "canossa",
            "character": None,
            "text": "「独自の領土と富を得た教皇の権力は、時代と共に巨大化していく。そして11世紀、教皇と世俗の最高権力者（神聖ローマ皇帝）は、教会の役職を誰が任命するか（叙任権）を巡って激しく衝突した。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "canossa",
            "character": None,
            "text": "「1077年、教皇グレゴリウス7世は、反抗的な皇帝ハインリヒ4世を破門。国を追われそうになった皇帝は許しを乞うため、雪降るカノッサ城の門前で三日三晩、裸足のまま立ち尽くした。世に言う『カノッサの屈辱』である。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "canossa",
            "character": None,
            "text": "「À cette époque, le pape avait un pouvoir absolu. (その当時、教皇は絶対的な権力を持っていた)」",
            "characters": [],
            "learningPoint": {
                "title": "歴史・文法ポイント",
                "text": "解説: 意味: 「その時代、教皇は絶対的な権力を持っていた」\nÀ cette époque (その当時) ＋ le pape (教皇) ＋ avait (持っていた: avoirの半過去) ＋ un pouvoir absolu (絶対的な権力)。\n★重要文法（#imparfait, #verbs）: 過去の「状態」や「背景」を描写する際は、複合過去ではなく「半過去（imparfait）」を使用します。"
            }
        },
        {
            "type": "dialog",
            "background": "canossa",
            "character": None,
            "text": "「『皇帝すら教皇に土下座する』。この出教会史、ヨーロッパにおける教皇の権威が王を超え、絶対的なものとして絶頂に達したことを決定づけたのである。」",
            "characters": []
        },
        {
            "type": "battle",
            "background": "canossa",
            "enemy": {
                "name": "叙任権闘争とカノッサの屈辱",
                "hp": 7,
                "damage": 2
            },
            "criteria": [
                {
                    "tag": "#imparfait",
                    "count": 4
                },
                {
                    "tag": "#verbs",
                    "count": 3
                }
            ]
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「絶頂に達した教皇の権威は、やがて国境を越えた巨大な軍事行動へと向かう。1095年、教皇ウルバヌス2世は『クレルモン公会議』を招集した。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「彼は、イスラム教徒の圧迫に苦しむ東ローマ帝国を救援し、聖地エルサレムを奪還するための『聖戦』を全ヨーロッパに向けて呼びかけたのである。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「『Deus vult!（神がそれを望んでおられる！）』。教皇の演説は人々の宗教的情熱を爆発させ、諸侯から農民に至るまで、十字架の印をつけた大群衆が東方へと進軍を開始した。十字軍の始まりである。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「C'est la guerre sainte que le pape a déclarée. (これは教皇が宣言した聖戦である)」",
            "characters": [],
            "learningPoint": {
                "title": "歴史・文法ポイント",
                "text": "解説: 意味: 「これは教皇が宣言した聖なる戦争だ」\nC'est (これは〜だ) ＋ la guerre sainte (聖戦) ＋ que (〜であるところの: 目的格の関係代名詞) ＋ le pape (教皇が) ＋ a déclarée (宣言した)。\n★重要文法（#relative_pronouns_basic）: 今度は先行詞（la guerre sainte）が動詞の「目的語」になる場合の関係代名詞「que」の用法です。"
            }
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「1099年、第1回十字軍は凄惨な戦闘の末、ついに聖地エルサレムを占領し『十字軍国家』を建設する。教皇の号令一つでヨーロッパが一つにまとまり、奇跡的な勝利を収めたこの瞬間こそが、教皇権と宗教的熱狂の最高潮であった。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「しかし、この神聖な熱狂は、時代が下るにつれて世俗の欲望にまみれ、やがて取り返しのつかない『狂気』へと変貌していくことになる――。」",
            "characters": []
        },
        {
            "type": "battle",
            "background": "church_history",
            "enemy": {
                "name": "クレルモン公会議と第1回十字軍",
                "hp": 12,
                "damage": 2
            },
            "criteria": [
                {
                    "tag": "#relative_pronouns_basic",
                    "count": 6
                },
                {
                    "tag": "#imparfait",
                    "count": 6
                }
            ]
        }
    ]
}

# 3. Define Episode 3 Ex 2
ep_3_ex2 = {
    "episodeId": "ep_3_ex2",
    "episodeTitle": "第3-外伝2: 教皇権の黄昏と世界",
    "recommendedPlayTime": "15 mins",
    "backgrounds": {
        "bgBlack": "#000000",
        "castle": "url('assets/story/backgrounds/castle.webp')",
        "church_history": "url('assets/story/backgrounds/church_history.webp')"
    },
    "characters": {
        "narrator": {
            "name": "ナレーター"
        },
        "eleanor": {
            "name": "エレオノール",
            "images": {
                "default": "assets/story/chapter_3/eleanor_default.webp",
                "normal": "assets/story/chapter_3/eleanor_default.webp",
                "smile": "assets/story/chapter_3/eleanor_smile.webp"
            }
        },
        "richard": {
            "name": "リチャード (獅子心王)",
            "images": {
                "default": "assets/story/chapter_3/richard_determined.webp",
                "normal": "assets/story/chapter_3/richard_determined.webp",
                "determined": "assets/story/chapter_3/richard_determined.webp"
            }
        },
        "john": {
            "name": "ジョン (失地王)",
            "images": {
                "default": "assets/story/chapter_3/john_dissatisfied.webp",
                "normal": "assets/story/chapter_3/john_dissatisfied.webp",
                "dissatisfied": "assets/story/chapter_3/john_dissatisfied.webp"
            }
        }
    },
    "sequence": [
        {
            "type": "dialog",
            "background": "castle",
            "character": None,
            "text": "「第1回十字軍の熱狂から約100年後の1189年。フランス王ルイ7世も、アンジュー帝国王ヘンリ2世も、すでにこの世を去っていた。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "castle",
            "character": "eleanor",
            "text": "「ふふっ……長く冷たい幽閉生活だったけれど、ついに私も自由の身ね。みなとうとういなくなってしまったわ」",
            "characters": [
                {
                    "id": "eleanor",
                    "expression": "default",
                    "position": "center"
                }
            ],
            "learningPoint": {
                "title": "歴史・人物解説",
                "text": "説明行: 息子たちのヘンリ2世への反乱を助けたとして、15年もの間幽閉されていたエレオノール。"
            }
        },
        {
            "type": "dialog",
            "background": "castle",
            "character": "richard",
            "text": "「母上。長きにわたる不遇、よくぞ耐え抜かれました。これより先は、このリチャードが貴女と帝国をお守りいたします」",
            "characters": [
                {
                    "id": "richard",
                    "expression": "determined",
                    "position": "center"
                }
            ],
            "learningPoint": {
                "title": "歴史・人物解説",
                "text": "説明行: 新たなイングランド王として即位した三男リチャード（獅子心王）。"
            }
        },
        {
            "type": "dialog",
            "background": "castle",
            "character": "eleanor",
            "text": "「ありがとう、リチャード。本当に立派になって……私の誇り高き、美しい獅子。あなた達にこの国を託せるなら、私はもう何も心配していないわ」",
            "characters": [
                {
                    "id": "eleanor",
                    "expression": "smile",
                    "position": "center"
                }
            ]
        },
        {
            "type": "dialog",
            "background": "castle",
            "character": "john",
            "text": "「（壁際でブツブツと）……兄上はいいよな。王冠も、母上の愛も、全部独り占めだ。俺なんて未だに何も……」",
            "characters": [
                {
                    "id": "john",
                    "expression": "dissatisfied",
                    "position": "center"
                }
            ],
            "learningPoint": {
                "title": "歴史・人物解説",
                "text": "説明行: 兄の輝かしい姿の影で、相変わらず嫉妬を漏らす四男ジョン。"
            }
        },
        {
            "type": "dialog",
            "background": "castle",
            "character": None,
            "text": "「幽閉から解放された母と、国を背負う高貴な息子。強固な信頼で結ばれた二人の元に、東方から『聖地エルサレムがイスラムの英雄によって陥落した』という急報が届く。新たなる聖戦【第3回十字軍】の幕開けである。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "castle",
            "character": None,
            "text": "「Pendant que Jean boudait, Richard a pris la couronne. (ジョンがすねている間に、リチャードは王冠を取った)」",
            "characters": [],
            "learningPoint": {
                "title": "歴史・文法ポイント",
                "text": "解説: 意味: 「ジョンがふてくされていた間、リチャードは王冠を手にした」\nPendant que Jean boudait (ジョンがすねていた間: bouderの半過去) ＋ Richard a pris (リチャードは取った: prendreの複合過去) ＋ la couronne (王冠を)。\n★重要文法（#imparfait_vs_past_compose）: 過去の「継続している状態（半過去）」の中で、「起きた出来事（複合過去）」を対比させるフランス語特有の表現です。"
            }
        },
        {
            "type": "battle",
            "background": "castle",
            "enemy": {
                "name": "王の代替わりと母子の絆",
                "hp": 7,
                "damage": 2
            },
            "criteria": [
                {
                    "tag": "#imparfait_vs_past_compose",
                    "count": 7
                }
            ]
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「さて、リチャードが出陣する前に、ここで少し『世界史の時計』を早回しにして、この先の【十字軍と教皇の末路】を予習しておこう。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「実は、彼らが参加する第3回十字軍以降、教皇が主導する聖戦は急速に腐敗していくことになる。その最悪の例が、1204年の【第4回十字軍】である。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「聖地を目指すはずの第4回十字軍は、ヴェネツィア商人の金銭的な思惑に操られ、なんと『同じキリスト教国』である東ローマ帝国を攻撃し、首都コンスタンティノープルを略奪してしまったのだ。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「Les villes qu'ils ont détruites étaient chrétiennes. (彼らが破壊した都市はキリスト教の都市だった)」",
            "characters": [],
            "learningPoint": {
                "title": "歴史・文法ポイント",
                "text": "解説: 意味: 「彼らが破壊した（それらの）都市はキリスト教の都市だった」\nLes villes (都市: 女性複数) ＋ qu' (関係代名詞) ＋ ils (彼らが) ＋ ont détruites (破壊した: 複合過去) ＋ étaient (〜であった: 半過去) ＋ chrétiennes (キリスト教の)。\n★重要文法（#past_participle_agreement）: 複合過去で、直接目的語（Les villes）が動詞の前に来ているため、過去分詞 détruit に「es」がついて性・数一致しています。"
            }
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「もはや信仰でも高貴な騎士道でもなく、ただの強盗団に成り下がった十字軍。これにより、教皇の神聖な権威は大きく失墜し始める。」",
            "characters": []
        },
        {
            "type": "battle",
            "background": "church_history",
            "enemy": {
                "name": "第4回十字軍の狂気",
                "hp": 7,
                "damage": 2
            },
            "criteria": [
                {
                    "tag": "#past_participle_agreement",
                    "count": 4
                },
                {
                    "tag": "#imparfait",
                    "count": 3
                }
            ]
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「さらに時計を早回ししよう。14世紀に入ると、十字軍の失敗で権威を落とした教皇は、ついに世俗の王に力でねじ伏せられる。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「1309年、後のフランス王（フィリップ4世）は教皇を南仏のアヴィニョンに強制的に移住させてしまった（教皇のバビロン捕囚）。かつて皇帝を土下座させた教皇は、フランス王の監視下に置かれることになったのだ。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「Le roi s'est opposé aux ordres du pape. (王は教皇の命令に反対した)」",
            "characters": [],
            "learningPoint": {
                "title": "歴史・文法ポイント",
                "text": "解説: 意味: 「王は教皇の命令に逆らった」\nLe roi (王) ＋ s'est opposé à (〜に反対した) ＋ les ordres (命令) ＋ de le pape (教皇の)。\n★重要文法（#contracted_articles）: 「à ＋ les ＝ aux（〜に）」、「de ＋ le ＝ du（〜の）」という、前置詞と定冠詞が合体する『縮約冠詞』のルールです。"
            }
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「その後、教会の権威はさらに落ち込み、資金繰りのために『免罪符（お金を出せば罪が許される札）』を売り出す。これに1517年、ドイツのルターが激怒して【宗教改革】が勃発。教皇の絶対支配は完全に崩壊することになるのだ。」",
            "characters": []
        },
        {
            "type": "battle",
            "background": "church_history",
            "enemy": {
                "name": "教皇権の崩壊と宗教改革",
                "hp": 12,
                "damage": 2
            },
            "criteria": [
                {
                    "tag": "#contracted_articles",
                    "count": 12
                }
            ]
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「――時計の針を1189年に戻そう。」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「やがて十字軍は腐敗し、教皇の権威も地に落ちる。……しかし！ 逆に言えば、これから始まる【第3回十字軍】こそ激熱『王たちの聖戦』であったのだ」",
            "characters": []
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": "richard",
            "text": "「エルサレムを落としたイスラムの指導者サラディン……彼もまた、義を重んじる高潔な王だと聞く。ならば、キリスト教圏の王として、我が誇りを懸けてこの剣で応えねばなるまい」",
            "characters": [
                {
                    "id": "richard",
                    "expression": "determined",
                    "position": "center"
                }
            ]
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": "eleanor",
            "text": "「ええ、行きなさいリチャード。あなたのその気高き剣で、プランタジネットの誇りを世界に示しておやりなさい」",
            "characters": [
                {
                    "id": "eleanor",
                    "expression": "default",
                    "position": "center"
                }
            ]
        },
        {
            "type": "dialog",
            "background": "church_history",
            "character": None,
            "text": "「高潔なるイスラムの英雄サラディンに対し、騎士の模範たる獅子心王リチャード、そしてフランスからは若き天才策士フィリップ2世が出陣する！ 歴史に名を刻むオールスターの大決戦が、今、幕を開ける――！！」",
            "characters": []
        }
    ]
}

# Check if ep_3_ex1 and ep_3_ex2 already exist
ep_ids = [e['episodeId'] for e in ch3['episodes']]
if 'ep_3_ex1' not in ep_ids:
    ch3['episodes'].append(ep_3_ex1)
else:
    for i, e in enumerate(ch3['episodes']):
        if e['episodeId'] == 'ep_3_ex1':
            ch3['episodes'][i] = ep_3_ex1

if 'ep_3_ex2' not in ep_ids:
    ch3['episodes'].append(ep_3_ex2)
else:
    for i, e in enumerate(ch3['episodes']):
        if e['episodeId'] == 'ep_3_ex2':
            ch3['episodes'][i] = ep_3_ex2

with open('rpg/history/chapter_3.json', 'w', encoding='utf-8') as f:
    json.dump(ch3, f, ensure_ascii=False, indent=2)

count = len(ch3['episodes'])
print(f'Successfully updated chapter_3.json! Total episodes: {count}')
