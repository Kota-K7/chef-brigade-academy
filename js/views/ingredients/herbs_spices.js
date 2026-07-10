// Interactive Herbs & Spices Data
export const herbCuts = [
  {
    id: "ing_thym",
    number: "1",
    name_fr: "Thym",
    name_en: "Thyme",
    name_ja: "タイム",
    pin: { x: 35, y: 48 },
    properties: { tenderness: "★☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "ブーケガルニ、ロティの香り付け、マリネ",
    science: "チモールを主成分とする精油を多く含み、強力な抗菌・防腐・抗酸化作用を持ちます。熱に非常に強く、長時間（数時間）煮込んでも香りが壊れにくいため、煮込み料理やスープのベース出汁（フォン）に最初に投入されます。",
    classification: "Herbe aromatique résistante",
    logic: "Maturation / Simmer extraction",
    chef_note: "ローリエ、パセリの茎とともに糸で縛り、「Bouquet garni（ブーケガルニ）」として鍋に投入するのがフランス料理の不変のルールです。"
  },
  {
    id: "ing_romarin",
    number: "2",
    name_fr: "Romarin",
    name_en: "Rosemary",
    name_ja: "ローズマリー",
    pin: { x: 48, y: 42 },
    properties: { tenderness: "★☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "ラム肉・豚肉・じゃがいものロースト、グリル",
    science: "ボルネオールやシネオールを含み、極めて力強く浸透性の高いウッディな香りが特徴。肉の野生的な脂肪臭をシャープに中和します。熱に強く、オイルに香りが非常に移りやすいため、アロゼ（オイルを回しかける）の際に肉の上に乗せて使います。",
    classification: "Herbe aromatique forte",
    logic: "Oil infusion / High-heat roasting",
    chef_note: "香りが非常に強いため、使いすぎるとすべての食材がローズマリーの香りで塗りつぶされてしまうので注意が必要です。"
  },
  {
    id: "ing_persil",
    number: "3",
    name_fr: "Persil plat",
    name_en: "Flat-leaf Parsley",
    name_ja: "ペルシ・プラ（イタリアンパセリ）",
    pin: { x: 62, y: 55 },
    properties: { tenderness: "★★★★☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "アシェ（仕上げの散らし）、茎はブーケガルニ、ソース・ペルシヤード",
    science: "アピオールという爽やかな精油成分を含み、料理の重たさをリフレッシュする効果があります。葉の香りは熱に弱いため、必ず火を止めた直後や仕上げ（アシェ）に加えます。逆に茎は旨味成分（グルタミン酸など）と不揮発性芳香を含み、出汁のベースとして優秀です。",
    classification: "Herbe de finition / Garniture de base",
    logic: "Cold garnish / Finely chopped / Simmer (stem)",
    chef_note: "刻んだパセリとにんにくを合わせた「Persillade（ペルシヤード）」は、カエルの足（Grenouilles）や貝のソテーに欠かせない芳香の調味料です。"
  },
  {
    id: "ing_laurier",
    number: "4",
    name_fr: "Laurier",
    name_en: "Bay leaf",
    name_ja: "ローリエ（月桂樹）",
    pin: { x: 28, y: 38 },
    properties: { tenderness: "★☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "ソース・ベシャメル、トマト煮込み、ブイヨン",
    science: "シネオールが主成分。乾燥させることで苦味が抜け、芳醇で甘やかなウッディ香が前面に出ます。煮汁の中に徐々に溶け出して浸透するため、最初からスープに加えて加熱します。肉のタンパク質臭を包み込むマスキング効果が高いです。",
    classification: "Herbe de braisage / Bouquet garni core",
    logic: "Slow water-extraction",
    chef_note: "使用する前に葉の表面を軽く折り曲げて傷をつけることで、葉の中の油細胞が破壊され、煮汁に香りが溶け出しやすくなります。"
  },
  {
    id: "ing_estragon",
    number: "5",
    name_fr: "Estragon",
    name_en: "Tarragon",
    name_ja: "エストラゴン",
    pin: { x: 52, y: 62 },
    properties: { tenderness: "★★★★★", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "ソース・ベアルネーズ、鶏肉のエストラゴン煮込み",
    science: "アネトールを含み、アニス（アニスシード）や甘草に似た特有の甘くスパイシーな芳香を持ちます。「ハーブの女王」とも称され、酢や白ワインに香りを移すことで、まろやかで奥深い酸味をソースに与えます。",
    classification: "Herbe fine de prestige",
    logic: "Acid infusion / Vinegar steep / Emulsion flavor",
    chef_note: "エストラゴンを効かせた酢と卵黄、澄ましバターを乳化させた「Sauce Béarnaise（ベアルネーズ）」はステーキの最高峰パートナー。"
  }
];

export const spiceCuts = [
  {
    id: "ing_muscade",
    number: "1",
    name_fr: "Noix de muscade",
    name_en: "Nutmeg",
    name_ja: "ノワ・ド・ミュスカド（ナツメグ）",
    pin: { x: 45, y: 25 },
    properties: { tenderness: "★☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "ソース・ベシャメル、ポテトピューレ、キッシュの卵液（Appareil）",
    science: "ミリスチシンやエレミシンなどの強い甘い芳香成分を含みます。牛乳や生クリーム、卵などのアルカリ性の加熱臭（いわゆるコケ臭・生臭さ）を非常に効率よく中和し、すっきりとした上品なコクと甘い香りをプラスします。",
    classification: "Épice de base en laiterie",
    logic: "Dairy masking / Grated fresh",
    chef_note: "粉末で売られているものではなく、必ず丸ごとの実を「おろし金」で調理の直前にその場で削り入れます。香りの鮮度がまったく違います。"
  },
  {
    id: "ing_poivre_noir",
    number: "2",
    name_fr: "Poivre noir",
    name_en: "Black Pepper",
    name_ja: "ポワヴル・ノワール（黒コショウ）",
    pin: { x: 55, y: 25 },
    properties: { tenderness: "★☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "肉料理の味付け、ポワヴラードソース、ソースの仕上げ",
    science: "ピペリンという辛み成分が主体で、唾液や胃液の分泌を促し消化を助けます。また、ピネンなどの揮発性のウッディな香気も含み、加熱しすぎると香りが飛び辛みだけが残るため、香りを楽しみたい場合は「仕上げに粗挽き」が鉄則です。",
    classification: "Condiment universel",
    logic: "Finish spice / Digestif / Fragrance agent",
    chef_note: "「Steak au poivre（ペッパーステーキ）」では、ステーキの表面を粗挽きの黒胡椒で埋め尽くすようにして香ばしく焼き、ブランデーと生クリームで仕上げます。"
  }
];
