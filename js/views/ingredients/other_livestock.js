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
  },
  {
    id: "cut_agneau_selle",
    number: "4",
    name_fr: "Selle d'agneau",
    name_en: "Saddle of lamb",
    name_ja: "セル・ダニョー（鞍下肉・腰肉）",
    pin: { x: 60, y: 35 },
    properties: { tenderness: "★★★★★", fat: "★★★☆☆", collagen: "★☆☆☆☆" },
    cooking: "ロティ（オーブン焼き）",
    science: "運動量が少なく、キャレ（背肉）に続く非常に柔らかい最高級部位。薄い筋膜を丁寧に下処理（デネルヴェ）することで、とろけるような食感を実現します。",
    classification: "Rôti cut（最高級ロースト用）",
    logic: "Dry heat / Careful trimming",
    chef_note: "骨を外してファルス（詰め物）を巻き込み、タコ糸で縛ってからローストする手法が古典的かつエレガント。"
  },
  {
    id: "cut_agneau_collier",
    number: "5",
    name_fr: "Collier d'agneau",
    name_en: "Lamb neck",
    name_ja: "コリエ・ダニョー（首肉）",
    pin: { x: 15, y: 30 },
    properties: { tenderness: "★★☆☆☆", fat: "★★★☆☆", collagen: "★★★★★" },
    cooking: "ブレゼ（蒸し煮）、ラグー（煮込み）",
    science: "よく動かす部位のため筋繊維が太く硬いですが、豊富な結合組織（コラーゲン）を含みます。長時間の湿式加熱によりコラーゲンがゼラチン化し、ソースに濃厚なとろみを与えます。",
    classification: "Braise cut（煮込み用部位）",
    logic: "Low & slow moist heat",
    chef_note: "クスクスや伝統的なナヴァランなど、郷土料理の煮込みに深いコクを与える不可欠な部位。"
  },
  {
    id: "cut_agneau_souris",
    number: "6",
    name_fr: "Souris d'agneau",
    name_en: "Lamb shank",
    name_ja: "スリ・ダニョー（すね肉）",
    pin: { x: 80, y: 70 },
    properties: { tenderness: "★☆☆☆☆", fat: "★★☆☆☆", collagen: "★★★★★" },
    cooking: "長時間ブレゼ（煮込み）、コンフィ",
    science: "運動量が最も多い脚の筋肉の下部。コラーゲンとエラスチンが密集しており、低温で長時間加熱することでゼラチン質に変わり、ねっとりとした極上の食感になります。",
    classification: "Braise cut（煮込み用最高級部位）",
    logic: "Low & extremely slow moist heat",
    chef_note: "『スリ（ねずみ）』と呼ばれる独特の涙滴型。骨付きのままニンニクとタイムでトロトロに煮込むのが至高。"
  },
  {
    id: "cut_agneau_poitrine",
    number: "7",
    name_fr: "Poitrine d'agneau",
    name_en: "Lamb breast",
    name_ja: "ポワトリーヌ・ダニョー（ばら肉・胸肉）",
    pin: { x: 45, y: 65 },
    properties: { tenderness: "★★★☆☆", fat: "★★★★★", collagen: "★★★☆☆" },
    cooking: "ファルスをしてロースト、煮込み",
    science: "脂肪層と赤身が交互に重なる部位。加熱により大量の脂が溶け出すため、適切な温度管理で脂を落とすか、詰め物をして内部からしっとりさせる必要があります。",
    classification: "Roast with stuffing / Braise cut",
    logic: "Fat rendering / Stuffing",
    chef_note: "骨を外して広げ、ハーブやミンチを巻いて調理する、伝統的なまかないや家庭料理の定番部位。"
  },
  {
    id: "cut_agneau_rognons",
    number: "8",
    name_fr: "Rognons d'agneau",
    name_en: "Lamb kidneys",
    name_ja: "ロニョン・ダニョー（腎臓）",
    pin: { x: 60, y: 45 },
    properties: { tenderness: "★★★★☆", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ソテー、グリル",
    science: "内臓肉（アバ）。特有のアンモニア臭を取り除く下処理が必要ですが、仔羊のものは癖が少ない。加熱しすぎると硬くパサつくため、中心はロゼに仕上げます。",
    classification: "Abats nobles（高級内臓肉）",
    logic: "Quick sear / Rosé finish",
    chef_note: "周りの白い脂（シュイフ）を少し残してソテーし、マスタードソース（ア・ラ・ムタルド）で仕上げるのがクラシック。"
  }
];


// --- 仔羊の品種・産地による違い（Breeds & Origins） ---
export const lambBreeds = [
  {
    id: "breed_agneau_pre_sale",
    name_fr: "Agneau de Pré-Salé",
    name_en: "Salt meadow lamb",
    name_ja: "アニョー・ド・プレ・サレ（塩田羊）",
    region: "フランス：ノルマンディー / ブルターニュ地方",
    characteristics: "潮の満ち引きによって海水をかぶる牧草地（プレ・サレ）で、塩分とミネラル、特有の海浜植物を食べて育ちます。",
    science: "高塩分・高ミネラルの食餌により、肉質にほのかな潮の香り（ヨード香）と自然な塩気が蓄積されます。脂肪の融点が低く、口どけが良いのが特徴です。",
    classification: "AOC (原産地呼称統制) / 超高級",
    chef_note: "その独特の風味を活かすため、強いソースは避け、シンプルなローストに微量の海塩を添えるのが最良。"
  },
  {
    id: "breed_agneau_pauillac",
    name_fr: "Agneau de Pauillac",
    name_en: "Pauillac milk-fed lamb",
    name_ja: "アニョー・ド・ポイヤック（乳飲み仔羊）",
    region: "フランス：ボルドー地方",
    characteristics: "生後最大75日まで母羊のミルクのみで育てられ、牧草を食べる前（離乳前）に出荷される「アニョー・ド・レ（乳飲み仔羊）」の最高峰。",
    science: "固形物を食べていないため筋肉に鉄分が少なく、非常に淡いピンク色をしています。特有の羊の匂い（マトン臭）の原因となる脂肪酸が形成されていません。",
    classification: "IGP (地理的表示保護) / Label Rouge",
    chef_note: "ミルキーで全くクセがなく、極めて柔らかい。繊細な風味を消さないよう、優しく火を入れます。"
  },
  {
    id: "breed_agneau_sisteron",
    name_fr: "Agneau de Sisteron",
    name_en: "Sisteron lamb",
    name_ja: "アニョー・ド・シストロン",
    region: "フランス：プロヴァンス地方",
    characteristics: "アルプスの麓で、タイム、ローズマリー、ラベンダーなどの野生のハーブ（ガリーグ）を食べて育ちます。",
    science: "ハーブ類に含まれるテルペン類などの香気成分が羊の脂肪組織に移行し、肉を焼いた際に清涼感のある自然なハーブの香りが立ち上ります。",
    classification: "IGP / Label Rouge",
    chef_note: "プロヴァンス風の調理（ニンニク、オリーブオイル、タイム）と遺伝子レベルで調和する、南仏料理の主役。"
  },
  {
    id: "breed_agneau_pyrenees",
    name_fr: "Agneau de lait des Pyrénées",
    name_en: "Pyrenees milk-fed lamb",
    name_ja: "ピレネー産乳飲み仔羊",
    region: "フランス：アキテーヌ地方（バスク・ベアルン）",
    characteristics: "生後45日以内で出荷される非常に小ぶりな乳飲み仔羊。地元のマネッシュ種などの羊の母乳のみで育ちます。",
    science: "ポイヤック同様に鉄分が少なく、肉質はパールローズ色。サイズが小さいため筋肉繊維が極めて細かく、驚くほど滑らかな舌触りになります。",
    classification: "IGP / Label Rouge",
    chef_note: "春の到来を告げる食材。小さいキャレを丸ごとローストし、バスク産のピマン・デスプレット（唐辛子）を軽く振るのが絶品。"
  },
  {
    id: "breed_agneau_welsh",
    name_fr: "Agneau du Pays de Galles",
    name_en: "Welsh Lamb",
    name_ja: "ウェルシュ・ラム",
    region: "イギリス：ウェールズ地方",
    characteristics: "起伏の激しい丘陵地帯で、豊富な雨によって育った栄養価の高い牧草とヘザー（ヒース）を食べて放牧されます。",
    science: "十分な運動量により赤身の発色が良く、筋肉に旨味が凝縮されます。ヘザーなどの野草の食餌が、肉に特有の甘み（スイートネス）をもたらします。",
    classification: "PGI (地理的表示保護)",
    chef_note: "フランスのシェフも高く評価する品質。しっかりとした羊の風味があり、ミントソースや力強い赤ワインソースと相性が抜群です。"
  },
  {
    id: "breed_agneau_nz",
    name_fr: "Agneau de Nouvelle-Zélande",
    name_en: "New Zealand Lamb",
    name_ja: "ニュージーランド産ラム",
    region: "ニュージーランド",
    characteristics: "世界中で最も広く流通しているラム。広大な土地で一年中牧草のみを食べるグラスフェッド（牧草飼育）が基本です。",
    science: "穀物飼料を与えない完全放牧のため、オメガ3脂肪酸の比率が高くなります。牧草由来のカロテンにより、脂肪がやや黄色みを帯び、特有の野性味のある香りを持ちます。",
    classification: "Global Standard（国際標準）",
    chef_note: "品質が安定しており赤身がしっかりしているため、香辛料を効かせたマリネや、力強いソース（ジュ・ダニョー）を合わせる調理に向いています。"
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
    chef_note: "塩水で血抜きをし、軽く茹でて膜を除き、プレスしてから粉をはたいてバターでカリッと焼き上げます。パイ生地に詰めた「ヴォロヴァン（Vol-au-vent）」という料理も有名。"
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
    chef_note: "フォンドヴォーにモリーユ茸の香りを乗せた濃厚なソースがベストマッチ。厚切りにした「メダイヨン・ド・ヴォー（Médaillon de veau）」という料理も有名。"
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
    chef_note: "ゆっくり塊のままローストし、ロゼ色に仕上げるのがシェフの技術の見せ所。塊のまま焼き上げる「ロティ・ド・ヴォー（Rôti de veau）」という料理も有名。"
  },
  {
    id: "cut_veau_cote",
    number: "4",
    name_fr: "Côte de veau",
    name_en: "Veal chop",
    name_ja: "コート・ド・ヴォー（骨付き背肉）",
    pin: { x: 50, y: 35 },
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "★★☆☆☆" },
    cooking: "ポワレ、ソテー",
    science: "骨周辺の旨味と適度な脂が特徴。骨付きのまま加熱することで肉の収縮を防ぎ、しっとりとした仕上がりになります。",
    classification: "Premium chop",
    logic: "Bone-in sear / Butter baste",
    chef_note: "フライパンでアロゼしながら香ばしく焼き、肉汁（ジュ）を活かします。リンゴとシードル、クリームを使った「コート・ド・ヴォー・ノルマンド（Côte de veau normande）」という料理も有名。"
  },
  {
    id: "cut_veau_epaule",
    number: "5",
    name_fr: "Épaule de veau",
    name_en: "Veal shoulder",
    name_ja: "エポール・ド・ヴォー（肩肉）",
    pin: { x: 28, y: 42 },
    properties: { tenderness: "★★★☆☆", fat: "★★☆☆☆", collagen: "★★★★☆" },
    cooking: "ブレゼ（蒸し煮）、ラグー（煮込み）",
    science: "よく動かす部位のためやや硬めですが、コラーゲンが豊富。水分と共に静かに煮込むことで、ゼラチン化してとろける食感になります。",
    classification: "Braise cut（煮込み用部位）",
    logic: "Low & slow moist heat",
    chef_note: "肉の色を白く保つため、焼き色をつけずにブイヨンで煮てクリームで仕上げる「ブランケット・ド・ヴォー（Blanquette de veau）」という料理も有名。"
  },
  {
    id: "cut_veau_jarret",
    number: "6",
    name_fr: "Jarret de veau",
    name_en: "Veal shank",
    name_ja: "ジャレ・ド・ヴォー（すね肉）",
    pin: { x: 80, y: 70 },
    properties: { tenderness: "★★☆☆☆", fat: "★☆☆☆☆", collagen: "★★★★★" },
    cooking: "長時間ブレゼ（煮込み）",
    science: "筋繊維が太く結合組織の塊ですが、骨髄（モワル）を含んで輪切りにされます。長時間の加熱により骨髄が溶け出し、ソースに強烈なコクを与えます。",
    classification: "Braise cut / Bone marrow cut",
    logic: "Long braise / Marrow extraction",
    chef_note: "骨の髄から出る旨味がソースに深みを与えます。元はミラノ料理ですがフランスでも愛される「オッソ・ブーコ（Osso buco）」という料理も有名。"
  },
  {
    id: "cut_veau_tete",
    number: "7",
    name_fr: "Tête de veau",
    name_en: "Calf's head",
    name_ja: "テート・ド・ヴォー（頭肉）",
    pin: { x: 10, y: 25 },
    properties: { tenderness: "★★★☆☆", fat: "★★★★☆", collagen: "★★★★★" },
    cooking: "ブイヨンでの長時間ボイル",
    science: "肉というよりほぼゼラチン質の皮と軟骨。白く茹で上げるために小麦粉とレモン汁を加えた「ブラン（Blanc）」と呼ばれる液体で長時間煮込みます。",
    classification: "Abats（伝統的内臓肉）",
    logic: "Blanc poaching / Gelatin softening",
    chef_note: "ねっとりとしたゼラチン質に、酸味のあるマスタードベースのソースを合わせます。「テート・ド・ヴォー・ソース・グリビッシュ（Tête de veau sauce gribiche）」という料理も有名。"
  }
];


// --- 仔牛の品種・飼育法による違い（Breeds & Rearing methods） ---
export const vealBreeds = [
  {
    id: "breed_veau_sous_la_mere",
    name_fr: "Veau sous la mère",
    name_en: "Milk-fed veal",
    name_ja: "ヴォー・スー・ラ・メール（母乳哺育仔牛）",
    region: "フランス：リムーザン、アキテーヌ地方など",
    characteristics: "生後3〜5ヶ月まで、牧草などを一切与えず母牛のミルク（または代用乳）のみを直接飲ませて育てる伝統的な最高級の飼育法です。",
    science: "固形物（鉄分）を摂取していないため、ミオグロビンの生成が抑えられ、肉色はパールホワイトからごく淡いピンク色になります。脂肪は純白で溶けやすく、極めてきめ細かい肉質になります。",
    classification: "Label Rouge / 最高級仔牛",
    chef_note: "フランス料理における仔牛の最高峰。薄く叩いてバターでソテーする「エスカロップ・ド・ヴォー（Escalope de veau）」という料理も有名。"
  },
  {
    id: "breed_veau_aveyron_segala",
    name_fr: "Veau de l'Aveyron et du Ségala",
    name_en: "Aveyron and Ségala veal",
    name_ja: "アヴェロンおよびセガラ産仔牛",
    region: "フランス：ミディ＝ピレネー地方",
    characteristics: "母乳を飲みながら、農場で栽培された穀物（シリアル）も食べて育つ仔牛。生後6〜10ヶ月とやや長めに飼育されます。",
    science: "穀物を摂取するため、純白ではなく美しい「ロゼ（ピンク）色」の肉になります。純粋なミルク飼育よりも肉の風味が強く、しっかりとした旨味と食べ応えが形成されます。",
    classification: "IGP (地理的表示保護) / Label Rouge",
    chef_note: "しっかりとした肉の旨味があるため、グリルやオーブン焼きに向いています。ニンニクと香草で風味付けした「ロティ・ド・ヴォー・オ・フール（Rôti de veau au four）」という料理も有名。"
  },
  {
    id: "breed_veau_broutard",
    name_fr: "Veau broutard (Veau rosé)",
    name_en: "Grazing veal / Rosé veal",
    name_ja: "ヴォー・ブルタール（放牧仔牛 / ロゼ・ヴィール）",
    region: "フランス全土、ヨーロッパ各地",
    characteristics: "離乳して牧草を食べ始めた生後半年〜1年未満の仔牛。完全に成牛（ブッフ）になる前の段階です。",
    science: "牧草からの鉄分摂取と運動により筋肉が発達し、肉色は赤みがかったロゼ色になります。仔牛の柔らかさと、成牛に近い力強い牛肉の風味を併せ持つのが特徴です。",
    classification: "Standard to Premium / 環境配慮型",
    chef_note: "近年アニマルウェルフェアの観点からも支持されている肉質。しっかり焼き目をつける「コート・ド・ヴォーのポワレ（Côte de veau poêlée）」という料理も有名。"
  }
];
export const duckCuts = [
  {
    id: "cut_magret_de_canard",
    number: "1",
    name_fr: "Magret de canard",
    name_en: "Duck breast (Fattened)",
    name_ja: "マグレ・ド・カナール（肥育鴨の胸肉）",
    pin: { x: 45, y: 48 },
    properties: { tenderness: "★★★★☆", fat: "★★★★★", collagen: "★★☆☆☆" },
    cooking: "皮目からじっくりポワレ、ロティ",
    science: "フォアグラ用に肥育された鴨の胸肉。非常に厚い皮下脂肪を熱で溶かし（レンダリング）、その脂をかけながらロゼ（ミディアムレア）に仕上げます。",
    classification: "Volaille de prestige（高級家禽）",
    logic: "Fat rendering / Medium-rare finish",
    chef_note: "皮目に格子状の切れ込みを入れ、冷たいフライパンから焼き始めることで効率よく脂を抜きます。甘酸っぱいソースを合わせた「マグレ・ド・カナール・オランジュ（Magret de canard à l'orange）」という料理も有名。"
  },
  {
    id: "cut_confit_de_canard",
    number: "2",
    name_fr: "Cuisse de canard",
    name_en: "Duck leg",
    name_ja: "キュイス・ド・カナール（もも肉）",
    pin: { x: 68, y: 65 },
    properties: { tenderness: "★★★★★", fat: "★★★★☆", collagen: "★★★★☆" },
    cooking: "コンフィ（低温の脂で煮込む）、焼き上げ",
    science: "筋繊維と結合組織が強いもも肉。鴨自身の脂の中で80〜90°Cで数時間煮ることで、コラーゲンが完全にゼラチン化し、保存性と極上の柔らかさを得ます。",
    classification: "Plat classique du Sud-Ouest（南西地方の定番）",
    logic: "Low heat fat-poach / Crisp skin to finish",
    chef_note: "仕上げにオーブンやフライパンで皮目をパリパリに焼き上げます。白インゲン豆やソーセージと共にオーブンで焼き上げる「カスレ（Cassoulet）」という料理も有名。"
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
    chef_note: "バルサミコや甘口ワイン、イチジクの甘味と完璧に調和します。牛ヒレ肉に乗せてトリュフソースをかける「トゥルヌド・ロッシーニ（Tournedos Rossini）」という料理も有名。"
  },
  {
    id: "cut_aiguillette_canard",
    number: "4",
    name_fr: "Aiguillette de canard",
    name_en: "Duck tenderloin",
    name_ja: "エギュイエット・ド・カナール（ささみ）",
    pin: { x: 44, y: 52 },
    properties: { tenderness: "★★★★★", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "短時間のソテー、グリル",
    science: "胸肉（マグレ）の内側にある細長い筋肉（小胸筋）。脂肪が全くなく、火を通しすぎると一瞬でパサパサになるため、数秒から数十秒の極めて短い加熱が要求されます。",
    classification: "Quick cook tender",
    logic: "High heat / Flash cooking",
    chef_note: "強火で表面の色が変わる程度にサッと焼き上げます。グリーンペッパーとクリームで仕上げる「エギュイエット・ド・カナールのポワヴル・ヴェール風味（Aiguillettes de canard au poivre vert）」という料理も有名。"
  },
  {
    id: "cut_gesier_canard",
    number: "5",
    name_fr: "Gésier de canard",
    name_en: "Duck gizzard",
    name_ja: "ジェジエ・ド・カナール（砂肝）",
    pin: { x: 35, y: 58 },
    properties: { tenderness: "★★★☆☆", fat: "★★☆☆☆", collagen: "★★★★★" },
    cooking: "コンフィ",
    science: "食べたものをすりつぶすための強靭な筋肉器官。そのままでは非常に硬いですが、鴨の脂で長時間コンフィにすることで、独特のコリコリ感と柔らかさが同居する食感になります。",
    classification: "Abats / Confit ingredient",
    logic: "Long confit processing",
    chef_note: "コンフィにしたものをスライスし、温かいまま提供します。フォアグラやクルミと共に葉野菜に乗せる南西地方の名物「サラダ・ランデーズ（Salade landaise）」という料理も有名。"
  }
];


// --- 鴨の品種・飼育法による違い（Breeds & Rearing methods） ---
export const duckBreeds = [
  {
    id: "breed_canard_mulard",
    name_fr: "Canard Mulard",
    name_en: "Moulard duck",
    name_ja: "カナール・ミュラール（ミュラール種）",
    region: "フランス：南西地方（ペリゴール、ガスコーニュなど）",
    characteristics: "バルバリー種のオスとペキン種のメスを掛け合わせた一代交配種（一代雑種）。フォアグラ生産の約90%を占める、体が大きく温厚な品種です。",
    science: "肝臓（フォアグラ）を肥大させる性質が強く、同時に胸肉には極めて分厚い皮下脂肪が蓄えられます。赤身の部分は鉄分が多く、牛肉に近い力強い旨味を持ちます。",
    classification: "Foie gras breed / マグレ生産用",
    chef_note: "フォアグラを取った後の副産物である胸肉（マグレ）と腿肉（コンフィ）を余すところなく使います。鴨の脂でじゃがいもを炒める「ポム・サルラデーズ（Pommes sarladaises）」という料理も有名。"
  },
  {
    id: "breed_canard_barbarie",
    name_fr: "Canard de Barbarie",
    name_en: "Muscovy duck",
    name_ja: "カナール・ド・バルバリー（バルバリー種）",
    region: "フランス全土（もとは南米原産）",
    characteristics: "顔に赤いイボ状の突起があるのが特徴。ミュラール種と違いフォアグラ用ではなく、純粋な肉用鴨として飼育されます。",
    science: "皮下脂肪が薄く、赤身の比率が非常に高い（リーンな）肉質です。野性味のある特有の香り（ムスク香）があり、肉の繊維がしっかりしています。",
    classification: "Roasting duck / 肉用高級鴨",
    chef_note: "脂が少ないため、ローストに向いています。イチジクやスパイスと合わせた「カナール・ロティ・オ・フィグ（Canard rôti aux figues）」という料理も有名。"
  },
  {
    id: "breed_canard_challans",
    name_fr: "Canard de Challans",
    name_en: "Challans duck",
    name_ja: "カナール・ド・シャラン（シャラン鴨）",
    region: "フランス：ヴァンデ県シャラン地方",
    characteristics: "海風を受けた湿地帯で半野生のように放し飼いにされるブランド鴨。「ナント鴨」とも呼ばれ、パリの高級レストランでこぞって使用されます。",
    science: "伝統的な「エトゥフェ（窒息屠殺）」という手法が用いられることが多く、血が肉に留まるため、肉色は濃い赤紫色となり、鉄分のニュアンスを含んだ極めて濃厚な味わいになります。",
    classification: "Label Rouge / 最高級ブランド鴨",
    chef_note: "火を入れすぎると血が凝固してパサつくため、徹底した温度管理が必要です。パリの老舗トゥール・ダルジャンの名物「カナール・オー・サン（Canard au sang / 血のソース）」という料理も有名。"
  },
  {
    id: "breed_canard_rouen",
    name_fr: "Canard de Rouen",
    name_en: "Rouen duck",
    name_ja: "カナール・ド・ルーアン（ルーアン鴨）",
    region: "フランス：ノルマンディー地方ルーアン",
    characteristics: "マガモを家禽化した歴史の古い大型の鴨。シャラン鴨と同様に「エトゥフェ」で処理されることが多く、フランスの伝統的ガストロノミーを象徴する食材です。",
    science: "脂肪が多めでありながら、血を肉に閉じ込めるため、ジビエ（野鳥）のような野性味と複雑な香り（ガストリック香）を発達させます。",
    classification: "Heritage breed / 伝統的最高級鴨",
    chef_note: "客席で銀のプレス機を使って骨から血と髄液を搾り出し、コニャックなどと合わせてソースを作る「カナール・ア・ラ・ルネーズ（Canard à la rouennaise）」という料理も有名。"
  }
];