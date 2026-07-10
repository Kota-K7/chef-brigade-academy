// Interactive Other Livestock Data (Agneau, Veau, Canard)
export const lambCuts = [
  {
    id: "cut_agneau_carre",
    number: "1",
    name_fr: "Carré d'agneau",
    name_en: "Rack of lamb",
    name_ja: "キャレ・ダニョー（骨付き背肉）",
    pin: { x: 50, y: 35 },
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "★★☆☆☆" },
    cooking: "ロティ（オーブン焼き）、グリル",
    science: "骨付きの肉は骨周辺からの穏やかな熱伝導により、肉汁の流出が少なく、しっとりとジューシーに仕上がります。",
    classification: "Rôti cut（ロースト用高級部位）",
    logic: "Medium-high heat / Bone-in roast",
    chef_note: "香草パン粉（persillade）をまぶして焼くのがクラシックな調理法。"
  },
  {
    id: "cut_agneau_gigot",
    number: "2",
    name_fr: "Gigot d'agneau",
    name_en: "Leg of lamb",
    name_ja: "ジゴ・ダニョー（もも肉）",
    pin: { x: 75, y: 48 },
    properties: { tenderness: "★★★☆☆", fat: "★★☆☆☆", collagen: "★★★☆☆" },
    cooking: "丸ごとロースト、長時間ブレゼ（煮込み）",
    science: "大きな筋肉群であり、赤身の比率が高い。低温で時間をかけて中心まで熱を通すことで均一な仕上がりを目指します。",
    classification: "Roast cut / Braise cut",
    logic: "Low & slow roast or Braise",
    chef_note: "フランスの復活祭（Pâques）に欠かせない、家族で分かち合う伝統のロースト肉。"
  },
  {
    id: "cut_agneau_epaule",
    number: "3",
    name_fr: "Épaule d'agneau",
    name_en: "Lamb shoulder",
    name_ja: "エポール・ダニョー（肩肉）",
    pin: { x: 28, y: 42 },
    properties: { tenderness: "★★★☆☆", fat: "★★★★☆", collagen: "★★★★☆" },
    cooking: "ナヴァラン（煮込み）、オーブン焼き（ロティ）",
    science: "コラーゲンと脂肪が豊富に絡み合う部位。熱が通るとゼラチン化し、ソースにとろみとコクを与えます。",
    classification: "Braise cut",
    logic: "Low heat / Long simmer",
    chef_note: "春野菜とラムを煮込む「Navarin d'agneau」の主役。"
  }
];

export const vealCuts = [
  {
    id: "cut_veau_ris",
    number: "1",
    name_fr: "Ris de veau",
    name_en: "Sweetbreads",
    name_ja: "リ・ド・ヴォー（胸腺肉）",
    pin: { x: 30, y: 55 },
    properties: { tenderness: "★★★★★", fat: "★★★★☆", collagen: "★★☆☆☆" },
    cooking: "ポシェ後のムニエル、ブレゼ、ソテー",
    science: "仔牛の発育期にのみ発達する器官で、極めて柔らかな食感が特徴。エラスチンが少なく保水性に優れています。",
    classification: "Abats nobles（高級内臓肉）",
    logic: "Blanch / Press / Sauté crisp",
    chef_note: "塩水で血抜きをし、軽く茹でて膜を除き、プレスしてから粉をはたいてバターでカリッと焼き上げます。"
  },
  {
    id: "cut_veau_filet",
    number: "2",
    name_fr: "Filet de veau",
    name_en: "Veal tenderloin",
    name_ja: "フィレ・ド・ヴォー（ヒレ）",
    pin: { x: 60, y: 38 },
    properties: { tenderness: "★★★★★", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ソテー、ポワレ、低温ロースト",
    science: "脂肪が極めて少なく水分が多い淡白な肉質。強火で一気に過加熱するとパサつくため、アロゼ（油を回しかける）で優しく火を入れます。",
    classification: "Premium steak cut",
    logic: "Gentle heat / Butter baste",
    chef_note: "フォンドヴォーにモリーユ茸の香りを乗せた濃厚なソースがベストマッチ。"
  },
  {
    id: "cut_veau_quasi",
    number: "3",
    name_fr: "Quasi de veau",
    name_en: "Veal rump",
    name_ja: "カジ・ド・ヴォー（お尻に近いもも肉）",
    pin: { x: 75, y: 45 },
    properties: { tenderness: "★★★★☆", fat: "★★☆☆☆", collagen: "★★☆☆☆" },
    cooking: "ロティ（ロースト）、ポワレ",
    science: "きめ細やかな赤身肉で、ローストするのに最適な部位。適度に締まった繊維がジューシーな旨味を保持します。",
    classification: "Roast cut / Premium steak",
    logic: "Medium heat / Steady roast",
    chef_note: "ゆっくり塊のままローストし、ロゼ色に仕上げるのがシェフの技術の見せ所。"
  }
];

export const duckCuts = [
  {
    id: "cut_magret_de_canard",
    number: "1",
    name_fr: "Magret de canard",
    name_en: "Duck breast (Fattened)",
    name_ja: "マグレ・ド・カナール（鴨胸肉）",
    pin: { x: 45, y: 48 },
    properties: { tenderness: "★★★★☆", fat: "★★★★★", collagen: "★★☆☆☆" },
    cooking: "皮目からじっくりポワレ、ロティ",
    science: "フォアグラ用に肥育された鴨の胸肉。非常に厚い皮下脂肪を熱で溶かし（レンダリング）、その脂をかけながらロゼ（ミディアムレア）に仕上げます。",
    classification: "Volaille de prestige",
    logic: "Fat rendering / Medium-rare finish",
    chef_note: "皮目に格子状の切れ込みを入れ、冷たいフライパンから焼き始めることで効率よく脂を抜きます。"
  },
  {
    id: "cut_confit_de_canard",
    number: "2",
    name_fr: "Cuisse de canard (Confit)",
    name_en: "Duck leg (Confit)",
    name_ja: "キュイス・ド・カナール（もも肉コンフィ）",
    pin: { x: 68, y: 65 },
    properties: { tenderness: "★★★★★", fat: "★★★★☆", collagen: "★★★★☆" },
    cooking: "コンフィ（低温の脂で煮込む）、焼き上げ",
    science: "筋繊維と結合組織が強いもも肉。鴨自身の脂（グレープシードやダックファット）の中で80〜90°Cで数時間煮ることで、コラーゲンが完全に溶け柔らかくなります。",
    classification: "Plat classique du Sud-Ouest",
    logic: "Low heat fat-poach / Crisp skin to finish",
    chef_note: "仕上げにオーブンやグリルで皮目をパリパリに焼き上げ、フォークで崩れる柔らかさを楽しみます。"
  },
  {
    id: "cut_foie_gras_canard",
    number: "3",
    name_fr: "Foie gras de canard",
    name_en: "Duck foie gras",
    name_ja: "フォアグラ・ド・カナール（鴨フォアグラ）",
    pin: { x: 38, y: 55 },
    properties: { tenderness: "★★★★★", fat: "★★★★★", collagen: "☆☆☆☆☆" },
    cooking: "テリーヌ、ポワレ（ソテー）",
    science: "ほぼ100%が脂肪組織。急激な高温加熱で一気に脂が液化して流れ出すため、冷たい状態から表面を強火で短時間で焼き固め、中心は余熱で温めます。",
    classification: "Mets de fête（祝祭の高級食材）",
    logic: "Flash sear / Keep chilled before cooking",
    chef_note: "バルサミコや甘口のワイン（ソーテルヌなど）、イチジクの甘味ソースと完璧に調和します。"
  }
];
