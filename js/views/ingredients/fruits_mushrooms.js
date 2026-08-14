// Interactive Fruits Mushrooms Data

export const fruitCuts = [
  {
    "id": "ing_pomme",
    "number": "1",
    "name_fr": "Pomme (Reine des Reinettes / Calville)",
    "name_en": "Apple",
    "name_ja": "ポム（リンゴ）",
    "pin": {
      "x": 10,
      "y": 45
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "タルトタタン（Tatin）、焼きリンゴ、豚肉・鴨肉のロースト添え、ノルマンディー風煮込み",
    "science": "リンゴには果糖、有機酸（リンゴ酸）、そして多量のペクチンが含まれます。加熱によりペクチンが細胞壁から溶出して熱分解され、バターや肉汁の水分を抱え込んでソースを乳化・安定させ、自然なとろみと甘みを与えます。（既存の解説: リンゴには果糖、有機酸（リンゴ酸）、そして多量の「ペクチン」（食物繊維）が含まれています。加熱することでペクチンが細胞壁から溶け出して熱分解され、バターや肉汁の水分を抱え込んでソースを乳化・安定させ、自然で濃厚なとろみと甘みを与えます。）",
    "classification": "Fruit pour cuisson / Pâtisserie & Gibier",
    "logic": "Pectin gelation / Acid balancing / Caramelization",
    "chef_note": "カルヴァドスでフランベした豚肉にリンゴのソテーを合わせるのはノルマンディーの王道。酸味のある品種（カルヴィル等）が加熱に適します。（既存の解説: カルヴァドス（リンゴのブランデー）でフランベした豚肉に、リンゴのソテーを合わせるのはノルマンディー地方の王道ペアリング。）"
  },
  {
    "id": "ing_poire",
    "number": "2",
    "name_fr": "Poire (Williams / Passe-Crassane)",
    "name_en": "Pear",
    "name_ja": "ポワール（洋梨）",
    "pin": {
      "x": 18,
      "y": 42
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ポワール・ベル・エレーヌ（Belle-Hélène）、タルト・ブーダルー、洋梨の赤ワイン煮（Poire au vin rouge）",
    "science": "洋梨特有の石細胞が熟成とともに酵素分解され滑らかな舌触りに変化。ソルビトールと糖度が高く、スパイス（シナモン、スターアニス）やタンニンを含む赤ワインで煮込むと果肉内部まで鮮やかなルビー色に染まります。",
    "classification": "Fruit noble de cuisson / Pâtisserie",
    "logic": "Wine infusion / Spice poach / Starch degradation",
    "chef_note": "洋梨の赤ワイン煮にはカシスリキュールを少量加えると、色艶と香りの立体感が格段に跳ね上がります。"
  },
  {
    "id": "ing_citron",
    "number": "3",
    "name_fr": "Citron de Menton IGP",
    "name_en": "Lemon",
    "name_ja": "シトロン（マントン産レモン） / シトロン（レモン）",
    "pin": {
      "x": 26,
      "y": 55
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ソースの仕上げ、ソース・オランデーズ、魚介のポワレ添え、タルト・オ・シトロン（既存の解説: ソースの仕上げ（酸味付け）、ソース・オランデーズ、魚介のポワレ添え）",
    "science": "クエン酸が豊富でpHが約2と強酸性。この酸が魚臭さの主因である揮発性アミン類を中和・不揮発化して生臭さを消します。また加熱調理の仕上げに一滴加えるだけでバターソースを軽やかに引き締めます。（既存の解説: クエン酸が豊富でpHが約2と極めて強酸性。この酸が魚臭さの主因であるアミン類（アルカリ性）と塩を形成して揮発を防ぎ、生臭さを完全に消し去ります。また、加熱調理の仕上げに一滴加えるだけで、鈍重になりがちなバターソースを一気に軽やかに引き締めます。）",
    "classification": "Correcteur d'acidité / Agrume d'exception",
    "logic": "Aromatics / PH control / Deodorizer / Lipid cut",
    "chef_note": "南仏マントン（Menton）のIGPレモンは糖度が高く皮の芳香油（リモネン）が豊かで苦味が少ない最高級品。（既存の解説: 皮の黄色の部分（Zeste）にはリモネンという香り高い精油が詰まっています。白い綿の部分は強い苦味があるため、絶対に削り落として使います。）"
  },
  {
    "id": "ing_orange",
    "number": "4",
    "name_fr": "Orange / Bigarade",
    "name_en": "Orange / Bitter orange",
    "name_ja": "オランジュ / ビガラード（オレンジ・ダイダイ）",
    "pin": {
      "x": 34,
      "y": 52
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "カナール・ア・ロランジュ（鴨のオレンジ煮）、クレープ・シュゼット、グラン・マルニエ風味",
    "science": "甘味（ショ糖）と酸味（クエン酸）、皮のリモネン精油が特徴。鴨肉など赤身肉の鉄分臭と濃厚な脂分を、オレンジ果汁の酸とガストリック（砂糖と酢をカラメル化したベース）で完璧に調和させます。",
    "classification": "Agrume noble pour sauce aigre-douce",
    "logic": "Gastrique reaction / Citrus deglazing / Bittersweet balance",
    "chef_note": "クラシックな鴨料理には苦味の効いたビガラード（苦オレンジ）のゼストを細切りにしてブランシール（下茹で）して使います。"
  },
  {
    "id": "ing_figue",
    "number": "5",
    "name_fr": "Figue de Solliès AOP",
    "name_en": "Fig",
    "name_ja": "フィグ（ソリエス産黒イチジク） / フィグ（イチジク）",
    "pin": {
      "x": 42,
      "y": 58
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "フォアグラのポワレ添え、コンフィチュール、ジビエ（野兎・鹿）の付け合わせ（既存の解説: フォアグラのポワレ添え、コンフィチュール、ジビエの付け合わせ）",
    "science": "イチジクの甘み（ショ糖・果糖）とねっとりした食感は、フォアグラやジビエの濃厚な脂や強い血の風味をマスキング。タンパク質分解酵素フィシンも含み、肉の軟化を促進します。（既存の解説: イチジクの甘み（ショ糖・果糖）とねっとりした食感は、フォアグラやジビエの極めて濃厚な脂や強い血の風味を口の中でマスキングし、まろやかに調和（Mariage）させます。果実に含まれるタンパク質分解酵素フィシンは、肉を一緒に漬け込むことで軟化させる作用もあります。）",
    "classification": "Fruit méditerranéen AOP / Mariage du foie gras",
    "logic": "Enzymatic tenderizing / Sugar glaze / Lipid pairing",
    "chef_note": "赤ワインとハチミツ、シナモンでイチジクをコトコト煮詰めたコンポートはフォアグラのテリーヌに欠かせない相棒です。（既存の解説: 赤ワインとハチミツ、シナモンでイチジクをコトコト煮詰めたコンポートは、フォアグラのパテに添える定番。）"
  },
  {
    "id": "ing_peche",
    "number": "6",
    "name_fr": "Pêche (Pêche de vigne)",
    "name_en": "Peach / Blood Peach",
    "name_ja": "ペーシュ（桃・ペーシュ・ド・ヴィーニュ）",
    "pin": {
      "x": 50,
      "y": 48
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ペーシュ・メルバ（Pêche Melba）、白ワインのサバイヨン、タルト",
    "science": "ガンマデカラクトンを主とする芳醇なピーチ香気とフルーティーな甘酸味。ブドウ畑の畝の端に植えられるペーシュ・ド・ヴィーニュ（赤肉ブドウ畑の桃）は酸味と渋みが強く、コンポートにすると深いワインレッドに染まります。",
    "classification": "Fruit noble d'été / Haute Pâtisserie",
    "logic": "Lactone aromatics / Poaching syrup / Escoffier heritage",
    "chef_note": "オーギュスト・エスコフィエが歌手ネリー・メルバのために考案した「ペーシュ・メルバ」（バニラアイス、桃のコンポート、フランボワーズクーリ）は不滅の古典。"
  },
  {
    "id": "ing_abricot",
    "number": "7",
    "name_fr": "Abricot (Bergeron / Rouge du Roussillon AOP)",
    "name_en": "Apricot",
    "name_ja": "アプリコ（アンズ・アプリコット）",
    "pin": {
      "x": 58,
      "y": 50
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ナパージュ（艶出しジュレ）、タルト・オ・ザブリコ、ロースト肉のチャツネ",
    "science": "加熱することで特有の芳香（リナロール等）と鮮やかな橙色（ベータカロテン）が強調され、強めの酸味（リンゴ酸）が甘味と調和します。ペクチンが豊富で、製菓のナパージュ（艶出し）用ジャムの主原料となります。",
    "classification": "Fruit riche en carotène et pectine / Nappage",
    "logic": "Pectin glaze / Acidity retention / Carotenoid stability",
    "chef_note": "タルト生地にアーモンドクリーム（クレーム・ダマンド）を敷き、半割りのアプリコットを並べて焼くと、果汁をアーモンドが吸って極上の味わいに。"
  },
  {
    "id": "ing_cerise",
    "number": "8",
    "name_fr": "Cerise (Burlat / Montmorency)",
    "name_en": "Cherry / Sour cherry",
    "name_ja": "スリーズ（さくらんぼ・チェリー）",
    "pin": {
      "x": 66,
      "y": 46
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "クラフティ（Clafoutis Limousin）、ジュビレ（Jubilé）、フォアグラや鴨のソース",
    "science": "ベンズアルデヒドによる杏仁様の甘い芳香と、鮮やかなアントシアニン色素。種（Noyau）の内部にアミグダリンを含み、種ごとクラフティを焼くことで加熱中に芳醇なアーモンド香が生地へ移行します。",
    "classification": "Fruit rouge à noyau / Clafoutis traditionnel",
    "logic": "Kernel benzaldehyde migration / Anthocyanin depth",
    "chef_note": "リムーザン地方の伝統クラフティは「種を抜かずに焼く」のが本流。種からアーモンドのような香りが生地全体に染み渡ります。"
  },
  {
    "id": "ing_prune",
    "number": "9",
    "name_fr": "Prune (Reine-Claude / Quetsche / Mirabelle AOP)",
    "name_en": "Plum / Greengage / Mirabelle",
    "name_ja": "プリュヌ（ミラベル・レーヌクロード・西洋スモモ）",
    "pin": {
      "x": 74,
      "y": 48
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "タルト・ア・ラ・ミラベル（ロレーヌ風）、ファー・ブルトン（乾燥プラム入り）、蒸留酒（オードヴィ）",
    "science": "ロレーヌ地方特産のミラベルは糖度が20度近くまで上がり、芳醇なハチミツ香を持ちます。ソルビトールと食物繊維が豊富で、加熱・乾燥（プルーン）させても身が崩れにくくジューシーさを保ちます。",
    "classification": "Fruit noble de terroir / Distillerie & Tarte",
    "logic": "High brix caramelization / Far Breton baking",
    "chef_note": "ロレーヌ地方の秋を象徴するミラベルのタルトは、あえて生クリームを使わず果実の純粋な甘みと薄いパイ生地のみで仕上げます。"
  },
  {
    "id": "ing_raisin",
    "number": "10",
    "name_fr": "Raisin (Chasselas de Moissac AOP / Muscat)",
    "name_en": "Table Grape",
    "name_ja": "レザン（ブドウ・シャスラ）",
    "pin": {
      "x": 82,
      "y": 45
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ウズラや仔牛のヴェロニク風（Sauce Véronique）、チーズプラッターの添え物",
    "science": "酒石酸とブドウ糖（グルコース）が豊富。皮を湯むきして種を取り除いたブドウ（Véronique風）を白ワインソースに加えることで、上品な甘味と爽やかな酸味で濃厚な白ワインソースの油分を軽やかにします。",
    "classification": "Fruit de table AOP / Garniture classique Véronique",
    "logic": "Tartaric acid brightness / Véronique emulsion garnish",
    "chef_note": "舌平目やウズラの「Véronique（ヴェロニク）」仕立ては、緑色のフレッシュブドウを仕上げに浮かべるエレガントな古典様式。"
  },
  {
    "id": "ing_fraise",
    "number": "11",
    "name_fr": "Fraise (Gariguette / Mara des Bois)",
    "name_en": "Strawberry",
    "name_ja": "フレーズ（ガリゲット・野イチゴ風味イチゴ）",
    "pin": {
      "x": 12,
      "y": 62
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "フレジェ（Fraisier）、スープ・ド・フレーズ、バルサミコ酢マリネ",
    "science": "フランスで大人気のガリゲット種は細長い形状で鮮烈な甘酸っぱさと強いフラネオール（イチゴ香気）を持ちます。熱に弱いため非加熱または低温の短時間マリネ（黒胡椒やバルサミコ、バジル）で香りを最大化します。",
    "classification": "Fruit rouge printanier de grand renom",
    "logic": "Furaneol aroma / Cold maceration / Fraisier structure",
    "chef_note": "粗挽きの黒胡椒や熟成バルサミコを数滴イチゴに振ると、甘味と香りが劇的に立体化するフレンチの定番テクニック。"
  },
  {
    "id": "ing_framboise",
    "number": "12",
    "name_fr": "Framboise",
    "name_en": "Raspberry",
    "name_ja": "フランボワーズ（ラズベリー・木苺）",
    "pin": {
      "x": 20,
      "y": 62
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "クーリ（Coulis de framboise）、ジビエのソース、ミルフィーユ、ビネガー",
    "science": "ラズベリーケトンによる華やかな芳香と強いクエン酸・リンゴ酸。赤いアントシアニン色素が非常に鮮やかで、ピュレを煮詰めて酸味を効かせたビネガーやジビエ用の甘酸っぱいソースのベースになります。",
    "classification": "Fruit rouge noble / Coulis & Vinaigre",
    "logic": "Raspberry ketone aroma / High-acid extraction",
    "chef_note": "木苺の種は舌触りを損なうため、裏ごし（Passer au chinois étamine）を徹底するのがグランメゾンの鉄則。"
  },
  {
    "id": "ing_cassis",
    "number": "13",
    "name_fr": "Cassis (Noir de Bourgogne)",
    "name_en": "Blackcurrant",
    "name_ja": "カシス（黒スグリ）",
    "pin": {
      "x": 28,
      "y": 62
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "クレーム・ド・カシス（キール・ロワイヤル）、鹿肉や鴨肉のグラン・ヴヌールソース",
    "science": "ポリフェノールとタンニン、強い酸味（ビタミンC・クエン酸）が極めて濃厚。渋みと重厚な酸味が赤ワインのタンニンやジビエ肉の鉄分・野性味と完璧に同調し、ソースに圧倒的な奥行きを与えます。",
    "classification": "Baie noire bourguignonne / Gibier & Liqueur",
    "logic": "Tannin alignment / Wild game pairing / Kir base",
    "chef_note": "ブルゴーニュの白ワイン（アリゴテ）とカシスリキュールを合わせた「Kir（キール）」はフランス全土のアペリティフの基本。"
  },
  {
    "id": "ing_groseille",
    "number": "14",
    "name_fr": "Groseille (Groseille rouge / à maquereau)",
    "name_en": "Redcurrant / Gooseberry",
    "name_ja": "グロゼイユ（赤スグリ・西洋スグリ）",
    "pin": {
      "x": 36,
      "y": 62
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "コンフィチュール（バル・ル・デュック名産）、サバのグロゼイユ添え、タルトの艶出し",
    "science": "半透明のルビー色の果実で、極めてシャープな酸味と高いペクチン含有率を誇ります。脂の乗った青魚（サバ＝Maquereau）の脂を切る付け合わせとして古くから重用されてきました。",
    "classification": "Petits fruits acides / Confiture royale",
    "logic": "High-pectin jelly / High-acid degreasing",
    "chef_note": "ガチョウの羽ペンで種だけを一粒ずつ抜いて作る「バル・ル・デュックの赤スグリジャム」は世界一高貴なジャムとして知られます。"
  },
  {
    "id": "ing_chataigne",
    "number": "15",
    "name_fr": "Châtaigne / Marron d'Ardèche AOP",
    "name_en": "Chestnut",
    "name_ja": "シャテーニュ / マロン（アルデーシュ産 栗）",
    "pin": {
      "x": 45,
      "y": 65
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "七面鳥やホロホロ鳥の詰め物（Farce）、ポタージュ、モンブラン、マロングラッセ",
    "science": "果物としては異例のデンプン含有量（約40%）を持ち、加熱によりデンプンが糊化してほくほくとした甘みと粘性を形成。鳥肉や豚肉の肉汁をデンプンが吸い込み、乾燥を防いで極上の旨味を含みます。",
    "classification": "Fruit amylacé (デンプン質) AOP / Garniture de fête",
    "logic": "Starch gelatinization / Lipid absorption / Winter feast",
    "chef_note": "1つのイガに果実が1個だけ入った丸く大きなものを「Marron」、複数入った小ぶりなものを「Châtaigne」と呼び分けます。"
  },
  {
    "id": "ing_noix",
    "number": "16",
    "name_fr": "Noix de Grenoble AOP / Noix du Périgord AOP",
    "name_en": "Walnut",
    "name_ja": "ノワ（クルミ）",
    "pin": {
      "x": 54,
      "y": 65
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★★",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "グルノーブル風サラダ（ロワール）、タルト・オ・ノワ、胡桃オイル（Huile de noix）",
    "science": "良質な多価不飽和脂肪酸（オメガ3・リノール酸）が約65%を占め、芳香族化合物による深いコクと渋皮のポリフェノールによる心地よい苦味を持ちます。ブルーチーズ（ロックフォール等）のカビの刺激を油分が包み込みます。",
    "classification": "Fruit à coque AOP / Huilerie & Fromage",
    "logic": "Lipid rich / Blue cheese pairing / Roasting pyrolysis",
    "chef_note": "フランスの二大産地「グルノーブル」と「ペリゴール」は共にAOPを取得。青カビチーズとクルミパンの組み合わせは絶対的。"
  },
  {
    "id": "ing_noisette",
    "number": "17",
    "name_fr": "Noisette",
    "name_en": "Hazelnut",
    "name_ja": "ノワゼット（ヘーゼルナッツ・ハシバミ）",
    "pin": {
      "x": 63,
      "y": 65
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★★",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "プラリネ（Praliné）、フィナンシェ、ブール・ノワゼット（焦がしバターの香り指標）",
    "science": "フィリベルトンという特有の香気成分を含み、ローストすることでピラジン類などの香ばしいナッツ香が爆発的に増加。バターを加熱して褐変させた「ブール・ノワゼット（ヘーゼルナッツ色バター）」の香りの語源でもあります。",
    "classification": "Fruit à coque noble / Praliné & Beurre noisette",
    "logic": "Pyrazine roasting / Praline caramel emulsion",
    "chef_note": "カラメリゼした砂糖とローストしたヘーゼルナッツをローラーですり潰した「プラリネ」はパリ・ブレスト等に欠かせない魂の素材。"
  },
  {
    "id": "ing_amande",
    "number": "18",
    "name_fr": "Amande de Provence",
    "name_en": "Almond",
    "name_ja": "アマンド（プロヴァンス産 アーモンド）",
    "pin": {
      "x": 72,
      "y": 65
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "トゥルート・ア・ラ・アマンド、ブラン・マンジェ、カリソン・デクス（Calisson d'Aix）、アマンド・エフィレ（魚のソテー）",
    "science": "ベンズアルデヒド前駆体とオレイン酸主体の脂質を含み、魚（鱒のアーモンド焼き＝Truite aux amandes）の魚臭さをマスキングしつつ、スライスしたアーモンドのカリッとしたクリスピーな食感を与えます。",
    "classification": "Fruit à coque provençal / Calisson & Poissonier",
    "logic": "Texture contrast (Crunch) / Pâtisserie foundation",
    "chef_note": "エクス・アン・プロヴァンスの名菓「カリソン」は、アーモンド粉とメロンのコンフィを練り合わせて作られます。"
  },
  {
    "id": "ing_coing",
    "number": "19",
    "name_fr": "Coing",
    "name_en": "Quince",
    "name_ja": "コワン（マルメロ・西洋カリン）",
    "pin": {
      "x": 81,
      "y": 65
    },
    "properties": {
      "tenderness": "★☆☆☆☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "パート・ド・フリュイ（Pâte de coing）、ジビエ肉の煮込み添え、コンフィチュール",
    "science": "生食不可能なほど硬い木質細胞と強烈な渋み（タンニン・ポリフェノール）を持ちますが、長時間砂糖と煮込むことでプロアントシアニジンが分解して鮮やかな琥珀〜ルビー色に変わり、芳醇なバラのような香気を放ちます。天然ペクチンの塊。",
    "classification": "Fruit ancien à gelée / Pâte de fruits",
    "logic": "Long braise color shift / Natural pectin block",
    "chef_note": "羊肉や鹿肉のタジン・煮込みにコワンを加えると、肉の臭みを消しながら芳醇な甘みととろみを与えます。"
  },
  {
    "id": "ing_rhubarbe",
    "number": "20",
    "name_fr": "Rhubarbe",
    "name_en": "Rhubarb",
    "name_ja": "リュバルブ（ルバーブ・食用大黄）",
    "pin": {
      "x": 90,
      "y": 62
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "タルト・ア・ラ・リュバルブ（アルザス風）、コンポート、鴨肉やフォアグラの付け合わせ",
    "science": "植物学的には野菜（タデ科の茎）ですが、フランスでは果物として扱われます。極めて強いシュウ酸・リンゴ酸を持ち、加熱すると瞬時に繊維が崩れてとろとろのジャム状に。多量の砂糖と合わせることで、比類なき爽快なキレのある酸味を生みます。",
    "classification": "Tige fruitière acide / Pâtisserie alsacienne",
    "logic": "Rapid cell collapse / High oxalic-malic tartness",
    "chef_note": "アルザス風ルバーブタルトは、酸っぱいルバーブの上にメレンゲや卵クリーム（フラン）を流して甘酸のバランスを取ります。"
  }
];

export const mushroomCuts = [
  {
    "id": "ing_cepe",
    "number": "1",
    "name_fr": "Cèpe (Boletus edulis / Cèpe de Bordeaux)",
    "name_en": "King Bolete / Porcini",
    "name_ja": "セープ（ヤマドリタケ・ポルチーニ）",
    "pin": {
      "x": 12,
      "y": 28
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ボルドー風ソテー（エシャロット・パセリ・にんにく）、ポタージュ、オムレツ（既存の解説: ソテー（塩コショウ・にんにく・パセリ）、オムレツ、スープ、ソース）",
    "science": "グルタミン酸とグアニル酸を共に大量に含み、噛むことで相乗効果による爆発的な旨味を生み出します。乾燥させることで水分が抜け、酵素作用でグアニル酸が数十倍に増大。加熱時に強いメイラード反応を起こしてナッツのような香ばしさを放ちます。（既存の解説: グルタミン酸（アミノ酸）とグアニル酸（核酸）の両方を豊富に含み、噛むことで口の中で相乗効果による爆発的な旨味を生み出します。乾燥させることで水分が抜け、細胞壁が壊れてグアニル酸が数十倍に激増し、戻し汁は濃厚な旨味出汁となります。）",
    "classification": "Roi des champignons sauvages",
    "logic": "Dry concentration / Umami synergy / Maillard sauté",
    "chef_note": "強火の澄ましバターで表面を焼き固め（Saisir）、余分な水分を出さずに旨味を閉じ込めるのがボルドー風の極意。（既存の解説: 「Cèpes à la Bordelaise（ボルドー風セープソテー）」は、エシャロット、パセリ、パン粉をまぶして強火でサッと炒める秋の風物詩料理。）"
  },
  {
    "id": "ing_morille",
    "number": "2",
    "name_fr": "Morille (Morchella esculenta)",
    "name_en": "Morel",
    "name_ja": "モリーユ（アミガサタケ）",
    "pin": {
      "x": 20,
      "y": 25
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "クリーム煮（Sauce aux morilles）、鶏肉のヴァン・ジョーヌ煮込み（Coq au Vin Jaune）（既存の解説: クリーム煮（Sauce aux morilles）、鶏肉のジュ・クリームソース）",
    "science": "網目状のハニカム構造の傘が、粘度のあるクリームソースを毛細管現象で大量に保持します。独特の燻製香・土香を持ち、ジュラ地方特産の黄ワイン（Vin Jaune）の酸化熟成香（ソトロン）と生クリームに完璧に調和します。（既存の解説: モリーユは傘が網の目状のハニカム構造になっており、この凹凸が粘度のあるクリームソースを物理的に大量に絡め取ります。加熱することで独特のナッツのような香ばしさと土の香りが引き立ち、動物性の生クリームのコクと完璧に融合します。）",
    "classification": "Champignon de printemps de prestige",
    "logic": "Capillary sauce retention / Vin Jaune harmony",
    "chef_note": "微量の毒性（ヒドラジン）があるため生食は厳禁。乾燥モリーユの戻し汁を煮詰めてソースのベースにするのが最高の技法。（既存の解説: 生は微量の毒性（ヒドラジン）があるため、必ずしっかり加熱して食べます。乾燥モリーユを戻して生クリームで煮詰めると究極のソースになります。）"
  },
  {
    "id": "ing_girolle",
    "number": "3",
    "name_fr": "Girolle / Chanterelle (Cantharellus cibarius)",
    "name_en": "Golden Chanterelle",
    "name_ja": "ジロール（アンズタケ）",
    "pin": {
      "x": 28,
      "y": 28
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "バターソテー、仔牛や鶏肉のフリカッセ、オムレツの具材",
    "science": "アンズや黄桃を思わせるフルーティーなエステル香気（オクタジエノール）とピリッとした胡椒様の辛味を持ちます。加熱してもシャキシャキとした繊維の歯ごたえが崩れず、バターの乳脂肪と結びつくことで華やかな香りが立ち昇ります。",
    "classification": "Champignon sauvage estival et automnal",
    "logic": "Ester aroma volatilization / Crisp texture retention",
    "chef_note": "水洗いするとスポンジのように水分を吸って風味が台無しになるため、専用ブラシと濡れ布巾で丁寧に土を落とします。"
  },
  {
    "id": "ing_truffe_noire",
    "number": "4",
    "name_fr": "Truffe noire du Périgord (Tuber melanosporum)",
    "name_en": "Black Périgord Truffle",
    "name_ja": "トリュフ（ペリゴール産 黒トリュフ） / トリュフ（黒トリュフ）",
    "pin": {
      "x": 36,
      "y": 25
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "トゥルヌド・ロッシーニ、スクランブルエッグ（Brouillade）、パイ包みスープ（既存の解説: スライスして仕上げに乗せる、バターや卵に香りを吸着させる）",
    "science": "ジメチルスルフィドやアンドロステノールなど超高揮発性の芳香化合物を含みます。香りは脂溶性が極めて高く、バター、生クリーム、卵黄などの脂質に吸着します。加熱しすぎると香りが飛ぶため、仕上げに削るか密閉加熱します。（既存の解説: トリュフの香りの正体は、ジメチルスルフィドなどの高揮発性の芳香族化合物です。この香りは「脂溶性」が極めて高く、バター、クリーム、卵黄などの脂質に非常によく吸着します。加熱しすぎると香りが揮発してすべて逃げてしまうため、火を止めた料理の上に薄くスライスして散らします。）",
    "classification": "Diamant noir de la gastronomie mondiale",
    "logic": "Lipophilic infusion / Heat-sensitive aromatics / Fat trapping",
    "chef_note": "生卵と一緒に密閉瓶に入れて冷蔵庫に数日置くと、殻の気孔を通して卵黄にトリュフの芳香が完全に移り絶品オムレツが焼けます。（既存の解説: 密閉容器の中に生卵とトリュフを一緒に入れて数日冷蔵庫に置いておくと、殻の気孔を通して卵黄にトリュフの香りが完璧に移り、絶品のオムレツが作れます。）"
  },
  {
    "id": "ing_truffe_blanche",
    "number": "5",
    "name_fr": "Truffe blanche d'Alba (Tuber magnatum)",
    "name_en": "White Alba Truffle",
    "name_ja": "白トリュフ（アルバ産 白トリュフ）",
    "pin": {
      "x": 44,
      "y": 22
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "リゾット、手打ちパスタ、温かい卵料理の上に生のまま削り落とす",
    "science": "黒トリュフよりもさらに揮発性が高く、ガーリックや発酵チーズに似た強烈で妖艶なメタンチオール系香気を放ちます。加熱すると香気成分が一瞬で全滅するため、「絶対に加熱調理しない（100%生食）」のが鉄則です。",
    "classification": "Reine absolue des champignons / Consommation 100% crue",
    "logic": "Non-thermal application / Raw shaving / Volatile gas burst",
    "chef_note": "温かいバターソースのパスタや半熟卵の上に、客席の目の前で専用スライサーを使って薄紙のように削り落とします。"
  },
  {
    "id": "ing_champignon_paris",
    "number": "6",
    "name_fr": "Champignon de Paris (Agaricus bisporus)",
    "name_en": "Button Mushroom",
    "name_ja": "シャンピニオン・ド・パリ（マッシュルーム）",
    "pin": {
      "x": 52,
      "y": 28
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "デュクセル（Duxelles＝微塵切り炒めペースト）、ヴルーテ、薄切り生サラダ",
    "science": "水分が約90%と多いですが、細かく刻んでバターで水分を完全に蒸発させるまで炒める（Duxelles）ことでグルタミン酸が濃縮。パイ包み焼き（ウェリントン等）や詰め物の水分を吸って旨味を補給する万能ペーストになります。",
    "classification": "Champignon cultivé fondamental",
    "logic": "Duxelles moisture evaporation / Glutamate concentration",
    "chef_note": "レモン汁とオリーブ油、塩を振った生のマッシュルームスライスサラダは、シャキッとした食感と爽やかな香りが美味。"
  },
  {
    "id": "ing_trompette_mort",
    "number": "7",
    "name_fr": "Trompette de la mort (Craterellus cornucopioides)",
    "name_en": "Black Trumpet / Horn of Plenty",
    "name_ja": "トランペット・ド・ラ・モール（死者のトランペット・黒ラッパタケ）",
    "pin": {
      "x": 60,
      "y": 25
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ジビエ肉の付け合わせ、テリーヌ、クリームソース、リゾット",
    "science": "漆黒の外観とは裏腹に、非常に繊細で芳醇なトリュフやドライフルーツに似たウッディな土の香りを持ちます。薄く柔らかい膜状の肉質で、油分やクリームソースを素早く吸い込み、黒い色彩のコントラストで皿の上を引き締めます。",
    "classification": "Champignon sauvage d'automne",
    "logic": "Color contrast / Rapid sauce absorption / Forest aromatics",
    "chef_note": "万聖節（11月初旬の諸聖人の日）の頃に森の落ち葉の下から一斉に顔を出すため「死者のトランペット」と呼ばれます。"
  },
  {
    "id": "ing_pied_de_mouton",
    "number": "8",
    "name_fr": "Pied-de-mouton (Hydnum repandum)",
    "name_en": "Hedgehog Mushroom",
    "name_ja": "ピエ・ド・ムートン（カノシタ・羊の足）",
    "pin": {
      "x": 68,
      "y": 28
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "しっかり煮込むフリカッセ、豚肉・鹿肉のロースト添え",
    "science": "傘の裏側がヒダではなく針状（トゲ状）の突起で覆われているのが特徴。肉質が非常に緻密で硬く、加熱しても縮んだり煮崩れたりしません。ほのかな心地よい苦味と甘みがあり、長時間の煮込みに耐えます。",
    "classification": "Champignon à aiguillons / Excellente tenue à la cuisson",
    "logic": "Firm dense tissue / Bittersweet depth / Braise resilience",
    "chef_note": "古い個体は傘の裏の針状突起が苦くなるため、包丁の背でこそげ落としてから調理するのが下処理のコツ。"
  },
  {
    "id": "ing_chanterelle_tube",
    "number": "9",
    "name_fr": "Chanterelle en tube (Craterellus tubaeformis)",
    "name_en": "Yellow Foot / Trumpet Chanterelle",
    "name_ja": "シャントレル・アン・テュブ（キモモタケ）",
    "pin": {
      "x": 76,
      "y": 25
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "キノコのスープ、ジビエのロティ添え、オムレツ",
    "science": "黄色い管状の柄と褐色の傘を持つ晩秋〜初冬のキノコ。ジロールよりもスモーキーで土のニュアンスが強く、水分が適度に抜けているため乾燥保存にも適し、戻し汁は極上のキノコブイヨンになります。",
    "classification": "Champignon sauvage d'hiver tardif",
    "logic": "Smoky forest aroma / Delicate hollow stem",
    "chef_note": "初冬のジビエシーズン終盤に森で収穫され、鹿肉や猪肉の煮込みの仕上げに投入されます。"
  },
  {
    "id": "ing_oronge",
    "number": "10",
    "name_fr": "Oronge / Amanite des Césars (Amanita caesarea)",
    "name_en": "Caesar's Mushroom",
    "name_ja": "オロンジュ（タマゴタケ・皇帝のキノコ）",
    "pin": {
      "x": 84,
      "y": 22
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "極薄切りカルパッチョ（生食）、上質なオリーブ油と塩、軽いソテー",
    "science": "古代ローマの皇帝（カエサル）が愛したことから名付けられたキノコの最高峰。鮮やかな橙赤色の傘と黄色いヒダを持ち、生食できる極めて希少なキノコ。ヘーゼルナッツのような上品な甘みと滑らかな舌触りを誇ります。",
    "classification": "Reine des champignons du Sud / Dégustation crue",
    "logic": "Raw carpaccio / Hazelnut notes / Imperial historic luxury",
    "chef_note": "南仏プロヴァンスで見つかる極上品。極薄にスライスして最高級フルール・ド・セルとレモン、オリーブ油だけで供します。"
  },
  {
    "id": "ing_mousseron",
    "number": "11",
    "name_fr": "Mousseron (Calocybe gambosa / Marasmius oreades)",
    "name_en": "St. George's Mushroom / Fairy Ring",
    "name_ja": "ムスロン（シバフタケ・春の白キノコ）",
    "pin": {
      "x": 92,
      "y": 26
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "春のオムレツ、子羊のロティ添え、仔牛のブランケット",
    "science": "春の聖ジョージの日（4月23日）頃に牧草地のフェアリーリング（菌輪）に生える春キノコ。小麦粉や焼きたてのパンを思わせる独特の穀物香（Farine香）を持ち、春野菜や仔牛の優しい味を引き立てます。",
    "classification": "Champignon noble du printemps",
    "logic": "Cereal flour aroma (Farineux) / Spring lamb pairing",
    "chef_note": "春の訪れを告げるキノコとしてフランスのシェフに愛され、春のモリーユと並ぶ季節の風物詩。"
  },
  {
    "id": "ing_bolet_bai",
    "number": "12",
    "name_fr": "Bolet bai (Imleria badia)",
    "name_en": "Bay Bolete",
    "name_ja": "ボレ・ベ（クリイロイグチ）",
    "pin": {
      "x": 50,
      "y": 35
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "☆☆☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "煮込み料理、キノコのリゾット、乾燥パウダーにしてソースの隠し味",
    "science": "セープ（ヤマドリタケ）の近縁種で、傘裏の管孔を指で押すと青変するのが特徴。セープに匹敵する豊かなグルタミン酸を含み、乾燥させて粉末（Poudre de cèpe/bolet）にするとソースのコク出しスパイスになります。",
    "classification": "Bolet forestier de choix",
    "logic": "Glutamate concentration / Blue-bruise oxidation / Powder seasoning",
    "chef_note": "セープよりも小ぶりで身が締まっており、オイル漬けやピクルス（Confit）にしても素晴らしい食感を保ちます。"
  }
];
