// Interactive Seafood (Poisson & Crustacés) Data
export const fishCuts = [
  {
    id: "cut_kokotxa_de_merlu",
    number: "1",
    name_fr: "Kokotxa de merlu",
    name_en: "Hake Kokotxa (jaw meat)",
    name_ja: "ココチャ（メルルーサの顎肉）",
    pin: { x: 25, y: 52 },
    properties: { tenderness: "★★★★★", fat: "★★☆☆☆", collagen: "★★★★★" },
    cooking: "ピルピル乳化（Pil-pil）、ポシェ",
    science: "魚の頭部下にある最も動かす筋肉かつゼラチンの宝庫。熱を加えることで豊富な天然コラーゲンが容易に溶け出し、油と水分を結合させます。",
    classification: "Spécialité basque (バスク特産高級部位)",
    logic: "Low heat / Emulsification",
    chef_note: "オリーブ油の中で弱火で揺すり、魚から出たゼラチンだけで完全に乳化させて白い極上ソースを作ります。"
  },
  {
    id: "cut_fish_fillet",
    number: "2",
    name_fr: "Filet de poisson",
    name_en: "Fish Fillet",
    name_ja: "フィレ（魚の切り身）",
    pin: { x: 55, y: 48 },
    properties: { tenderness: "★★★★☆", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ソテー、ポワレ、蒸し（Vapeur）",
    science: "赤身および白身の筋肉繊維。陸上動物に比べて結合組織（コラーゲン）が非常に少ないため、短時間の精密な加熱が必須です。火が通り過ぎると一瞬でボソボソになります。",
    classification: "Poisson de fond (底生魚・白身)",
    logic: "Short cook / High-precision heat",
    chef_note: "皮目はクッキングペーパーでしっかりと水分を除き、フライパンに押し当てるようにしてパリパリに、身はしっとりと仕上げます。"
  },
  {
    id: "cut_fish_sole",
    number: "3",
    name_fr: "Sole",
    name_en: "Dover Sole",
    name_ja: "ソール（舌平目）",
    pin: { x: 45, y: 40 },
    properties: { tenderness: "★★★★☆", fat: "★☆☆☆☆", collagen: "★★☆☆☆" },
    cooking: "ムニエル（Meunière）、ソール・ノルマンド",
    science: "ヒラメ類特有の引き締まった細かな繊維質。上品なゼラチン質を含み、クラシックなムニエルにすると小麦粉がバターを吸って最高のテクスチャーになります。",
    classification: "Poisson plat (平らな魚の代表)",
    logic: "Butter pan-fry (Meunière)",
    chef_note: "皮を剥ぎ、バター（Beurre noisette）をスプーンで何度も身にかけながら香ばしく焼き上げます。"
  },
  {
    id: "cut_fish_turbot",
    number: "4",
    name_fr: "Turbot",
    name_en: "Turbot",
    name_ja: "テュルボ（イシビラメ）",
    pin: { x: 68, y: 42 },
    properties: { tenderness: "★★★★★", fat: "★★☆☆☆", collagen: "★★★☆☆" },
    cooking: "ポシェ、オーブン焼き（Rôti）、白ワインソース",
    science: "白身魚の王様。骨の周囲に極上のコラーゲンを含み、骨付きのまま調理（ポシェやロティ）することで、崩れやすい白身をしっとり保護し旨味を凝集させます。",
    classification: "Poisson plat de prestige",
    logic: "Poach or Bone-in roast",
    chef_note: "ソース・アルベール（ソース・シュプレームにマスタード等を加えたもの）やシャンパンソースが相性抜群。"
  }
];

export const crustaceanCuts = [
  {
    id: "cut_crustace_homard",
    number: "1",
    name_fr: "Homard bleu",
    name_en: "Blue lobster",
    name_ja: "オマール・ブルー（ロブスター）",
    pin: { x: 50, y: 55 },
    properties: { tenderness: "★★★★☆", fat: "★☆☆☆☆", collagen: "★★☆☆☆" },
    cooking: "ポシェ、ロティ、ソース・アメリケーヌ",
    science: "甲殻類特有の太い筋繊維。加熱温度が70°Cを超えるとタンパク質が急激に収縮してゴム状の食感になるため、殻付きで焼くか、優しくポシェします。殻に含まれるアスタキサンチンは脂溶性で、ソース・アメリケーヌの鮮やかな赤と香りを引き出します。",
    classification: "Crustacé noble",
    logic: "Shell-on cooking / Gentle poach",
    chef_note: "「Homard à l'Américaine（オマールのアメリカ風）」は殻やミソを余すことなく煮出してソースを作る宮廷料理。"
  },
  {
    id: "cut_crustace_langoustine",
    number: "2",
    name_fr: "Langoustine",
    name_en: "Scampi / Dublin Bay prawn",
    name_ja: "ラングスティーヌ（赤座海老）",
    pin: { x: 35, y: 58 },
    properties: { tenderness: "★★★★★", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ソテー、ポシェ、フリット",
    science: "オマールよりさらにデリケートで水分量が多い身。加熱時間は数秒〜1分程度にとどめ、中心部に生っぽさ（半透明の状態）を残すことで究極の甘みと滑らかさを表現します。",
    classification: "Crustacé délicat",
    logic: "Flash sear / Keep translucent",
    chef_note: "冷たいバターでアロゼしながらソテーすると、海老の甘みが引き立ちます。"
  }
];

export const shellfishCuts = [
  {
    id: "cut_coquillage_huitre",
    number: "1",
    name_fr: "Huître",
    name_en: "Oyster",
    name_ja: "ユイットル（生牡蠣、グラタン）",
    pin: { x: 45, y: 65 },
    properties: { tenderness: "★★★★★", fat: "★☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "生食（Cru）、サバイヨンソースのグラタン",
    science: "生のままだとグリコーゲンの甘みと海水塩分を楽しめます。温める場合は、サバイヨンソースをかけてオーブン上火で一瞬グラタンにし、タンパク質が硬化する前に取り出します。",
    classification: "Coquillages par excellence",
    logic: "Raw or Flash-gratinated",
    chef_note: "シャロットを細かく刻んだヴィネグレット（Mignonette）ソースとライ麦パンを添えるのが伝統。"
  },
  {
    id: "cut_coquillage_saint_jacques",
    number: "2",
    name_fr: "Coquille Saint-Jacques",
    name_en: "Sea scallop",
    name_ja: "コキーユ・サンジャック（ホタテ貝柱）",
    pin: { x: 55, y: 62 },
    properties: { tenderness: "★★★★★", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "両面を強火で短時間ポワレ、タルタル",
    science: "貝柱は速筋繊維（ほぼ純粋なタンパク質）。熱を加えるとすぐに縮んで水分が絞り出されてしまうため、片面を強火で数十秒キャラメリゼし、裏は一瞬当てる程度で中は人肌のロゼにします。",
    classification: "Coquillage haut de gamme",
    logic: "High-heat sear / Translucent center",
    chef_note: "バターの焦がし具合と塩のあて方がすべて。コーラル（卵巣）はムースやソースのベースに使います。"
  }
];

export const molluskCuts = [
  {
    id: "cut_mollusque_calamar",
    number: "1",
    name_fr: "Calamar / Encornet",
    name_en: "Squid",
    name_ja: "カラマール / アンコルネ（イカ）",
    pin: { x: 50, y: 72 },
    properties: { tenderness: "★★★☆☆", fat: "★☆☆☆☆", collagen: "★★★★☆" },
    cooking: "ソテー、ファルシ（詰め物）、イカ墨煮込み",
    science: "イカやタコの外套膜はコラーゲンが格子状に高密度で走っています。加熱時間は「数秒の超短時間」か「数時間の長時間」の二者択一。中間だとタンパク質が完全に収縮しゴムのように硬くなります。",
    classification: "Céphalopode",
    logic: "Flash cook (Sauté) or Very long braise",
    chef_note: "表面に細かく包丁を入れて熱による丸まりを防ぎ、強火でサッと炒めてレモンとオリーブ油で合わせます。"
  }
];
