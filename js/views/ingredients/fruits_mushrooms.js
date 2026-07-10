// Interactive Fruits & Mushrooms Data
export const fruitCuts = [
  {
    id: "ing_pomme",
    number: "1",
    name_fr: "Pomme",
    name_en: "Apple",
    name_ja: "ポム（リンゴ）",
    pin: { x: 30, y: 48 },
    properties: { tenderness: "★★★☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "タルトタタン（Tatin）、焼きリンゴ、豚肉・鴨肉のロースト添え、ノルマンディー風煮込み",
    science: "リンゴには果糖、有機酸（リンゴ酸）、そして多量の「ペクチン」（食物繊維）が含まれています。加熱することでペクチンが細胞壁から溶け出して熱分解され、バターや肉汁の水分を抱え込んでソースを乳化・安定させ、自然で濃厚なとろみと甘みを与えます。",
    classification: "Fruit de base en pâtisserie / cuisine",
    logic: "Caramelization / Pectin gelation / Acid balancing",
    chef_note: "カルヴァドス（リンゴのブランデー）でフランベした豚肉に、リンゴのソテーを合わせるのはノルマンディー地方の王道ペアリング。"
  },
  {
    id: "ing_citron",
    number: "2",
    name_fr: "Citron",
    name_en: "Lemon",
    name_ja: "シトロン（レモン）",
    pin: { x: 42, y: 55 },
    properties: { tenderness: "★★★★★", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "ソースの仕上げ（酸味付け）、ソース・オランデーズ、魚介のポワレ添え",
    science: "クエン酸が豊富でpHが約2と極めて強酸性。この酸が魚臭さの主因であるアミン類（アルカリ性）と塩を形成して揮発を防ぎ、生臭さを完全に消し去ります。また、加熱調理の仕上げに一滴加えるだけで、鈍重になりがちなバターソースを一気に軽やかに引き締めます。",
    classification: "Correcteur d'acidité / Condiment essentiel",
    logic: "Aromatics / PH control / Deodorizer",
    chef_note: "皮の黄色の部分（Zeste）にはリモネンという香り高い精油が詰まっています。白い綿の部分は強い苦味があるため、絶対に削り落として使います。"
  },
  {
    id: "ing_figue",
    number: "3",
    name_fr: "Figue",
    name_en: "Fig",
    name_ja: "フィグ（イチジク）",
    pin: { x: 55, y: 58 },
    properties: { tenderness: "★★★★★", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "フォアグラのポワレ添え、コンフィチュール、ジビエの付け合わせ",
    science: "イチジクの甘み（ショ糖・果糖）とねっとりした食感は、フォアグラやジビエの極めて濃厚な脂や強い血の風味を口の中でマスキングし、まろやかに調和（Mariage）させます。果実に含まれるタンパク質分解酵素フィシンは、肉を一緒に漬け込むことで軟化させる作用もあります。",
    classification: "Liaison sucrée-salée (甘じょっぱい調和素材)",
    logic: "Enzymatic tenderizing / Sugar glaze",
    chef_note: "赤ワインとハチミツ、シナモンでイチジクをコトコト煮詰めたコンポートは、フォアグラのパテに添える定番。"
  }
];

export const mushroomCuts = [
  {
    id: "ing_cepe",
    number: "1",
    name_fr: "Cèpe",
    name_en: "Porcini / Cep",
    name_ja: "セープ（ヤマドリタケ・ポルチーニ）",
    pin: { x: 38, y: 35 },
    properties: { tenderness: "★★★★☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "ソテー（塩コショウ・にんにく・パセリ）、オムレツ、スープ、ソース",
    science: "グルタミン酸（アミノ酸）とグアニル酸（核酸）の両方を豊富に含み、噛むことで口の中で相乗効果による爆発的な旨味を生み出します。乾燥させることで水分が抜け、細胞壁が壊れてグアニル酸が数十倍に激増し、戻し汁は濃厚な旨味出汁となります。",
    classification: "Champignon sauvage noble",
    logic: "Dry concentration / Umami synergy",
    chef_note: "「Cèpes à la Bordelaise（ボルドー風セープソテー）」は、エシャロット、パセリ、パン粉をまぶして強火でサッと炒める秋の風物詩料理。"
  },
  {
    id: "ing_morille",
    number: "2",
    name_fr: "Morille",
    name_en: "Morel",
    name_ja: "モリーユ（アミガサタケ）",
    pin: { x: 50, y: 32 },
    properties: { tenderness: "★★★★★", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "クリーム煮（Sauce aux morilles）、鶏肉のジュ・クリームソース",
    science: "モリーユは傘が網の目状のハニカム構造になっており、この凹凸が粘度のあるクリームソースを物理的に大量に絡め取ります。加熱することで独特のナッツのような香ばしさと土の香りが引き立ち、動物性の生クリームのコクと完璧に融合します。",
    classification: "Champignon de printemps de prestige",
    logic: "Cream affinity / Capillary sauce retention",
    chef_note: "生は微量の毒性（ヒドラジン）があるため、必ずしっかり加熱して食べます。乾燥モリーユを戻して生クリームで煮詰めると究極のソースになります。"
  },
  {
    id: "ing_truffe",
    number: "3",
    name_fr: "Truffe noire",
    name_en: "Black Truffle",
    name_ja: "トリュフ（黒トリュフ）",
    pin: { x: 62, y: 35 },
    properties: { tenderness: "★★★★★", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "スライスして仕上げに乗せる、バターや卵に香りを吸着させる",
    science: "トリュフの香りの正体は、ジメチルスルフィドなどの高揮発性の芳香族化合物です。この香りは「脂溶性」が極めて高く、バター、クリーム、卵黄などの脂質に非常によく吸着します。加熱しすぎると香りが揮発してすべて逃げてしまうため、火を止めた料理の上に薄くスライスして散らします。",
    classification: "Diamant noir de la cuisine",
    logic: "Lipophilic infusion / Heat-sensitive aromatics",
    chef_note: "密閉容器の中に生卵とトリュフを一緒に入れて数日冷蔵庫に置いておくと、殻の気孔を通して卵黄にトリュフの香りが完璧に移り、絶品のオムレツが作れます。"
  }
];
