import { state, toggleFavorite, isFavorite, ensureDataLoaded } from '../../app.js';
import { speakFrench } from '../utils/audio.js';

// Interactive Beef Cuts Data
const beefCuts = [
  {
    id: "cut_filet",
    number: "5",
    type: "regular",
    name_fr: "Filet de bœuf",
    name_en: "Tenderloin",
    name_ja: "ヒレ",
    top: "38%",
    left: "63%",
    properties: { tenderness: "★★★★★", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "強火ステーキ、ロースト、短時間ソテー",
    science: "運動量が最も少ない筋肉。結合組織が極少で加熱による硬化が起きにくい。",
    classification: "Steak cut（高級ステーキ部位）",
    logic: "High heat / Short cook",
    chef_note: "火入れの“1分”が品質を決める。"
  },
  {
    id: "cut_rumsteck",
    number: "2",
    type: "regular",
    name_fr: "Rumsteck",
    name_en: "Rump",
    name_ja: "ランプ",
    top: "37%",
    left: "72%",
    properties: { tenderness: "★★★★☆", fat: "★★☆☆☆", collagen: "★★☆☆☆" },
    cooking: "ステーキ、ロースト",
    science: "運動はあるが筋繊維が均質で、鉄分と旨味が強い。",
    classification: "Steak cut / Roast cut",
    logic: "High heat / Medium cook",
    chef_note: "「肉汁を噛む」ための部位。"
  },
  {
    id: "cut_aiguillette",
    number: "4",
    type: "regular",
    name_fr: "Aiguillette de rumsteck",
    name_en: "Sirloin cap (Aiguillette de baronne)",
    name_ja: "イチボ",
    top: "45%",
    left: "77%",
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "★★☆☆☆" },
    cooking: "ロースト、厚切りステーキ",
    science: "脂層が断熱材として働き、内部の水分保持力が高い。",
    classification: "Roast cut（塊肉向き）",
    logic: "Roast / Medium heat",
    chef_note: "“塊で焼くほど完成度が上がる部位”。"
  },
  {
    id: "cut_palette",
    number: "8",
    type: "regular",
    name_fr: "Dessus de palette",
    name_en: "Chuck flap",
    name_ja: "ザブトン",
    top: "35%",
    left: "35%",
    properties: { tenderness: "★★★★☆", fat: "★★★★★", collagen: "★★★☆☆" },
    cooking: "煮込み、低温ロースト",
    science: "脂と筋間コラーゲンが共存。加熱で乳化しソース化する。",
    classification: "Braise cut（煮込み用）",
    logic: "Low heat / Long cook",
    chef_note: "“焼くより溶かす部位”。"
  },
  {
    id: "cut_poitrine",
    number: "13",
    type: "regular",
    name_fr: "Poitrine de bœuf",
    name_en: "Brisket",
    name_ja: "ブリスケ",
    top: "60%",
    left: "35%",
    properties: { tenderness: "★★☆☆☆", fat: "★★★★☆", collagen: "★★★★★" },
    cooking: "ポトフ、長時間煮込み",
    science: "支持筋肉構造でコラーゲン密度が高い。低温長時間でゼラチン化。",
    classification: "Braise cut",
    logic: "Low heat / Very long cook",
    chef_note: "“時間が旨味に変わる典型”。"
  },
  {
    id: "cut_langue",
    number: "1",
    type: "offal",
    name_fr: "Langue de bœuf",
    name_en: "Langue de bœuf",
    name_ja: "タン",
    top: "42%",
    left: "12%",
    properties: { tenderness: "★★★☆☆（焼き） / ★★★★★（煮込み）", fat: "★★★☆☆", collagen: "★★★★☆" },
    cooking: "煮込み、スライスソテー",
    science: "筋＋結合組織が強く、加熱でゼラチン質化する。",
    classification: "Abats nobles（高級内臓）",
    logic: "Long cook",
    chef_note: "“煮込むほど格が上がる部位”。"
  },
  {
    id: "cut_onglet",
    number: "9",
    type: "offal",
    name_fr: "Onglet",
    name_en: "Skirt / Hanging tender",
    name_ja: "ハラミ",
    top: "60%",
    left: "55%",
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "★★☆☆☆" },
    cooking: "ステーキ（レア）",
    science: "横隔膜筋。筋繊維が粗く赤身の旨味が強い。",
    classification: "Boucher cut（肉屋が好む部位）",
    logic: "High heat / Very short cook",
    chef_note: "“焼きすぎると価値が消える”。"
  },
  {
    id: "cut_foie",
    number: "3",
    type: "offal",
    name_fr: "Foie de bœuf",
    name_en: "Liver",
    name_ja: "レバー",
    top: "48%",
    left: "50%",
    properties: { tenderness: "★★★★☆", fat: "★★☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ソテー、パテ",
    science: "実質臓器。加熱でタンパク質凝固が急速に進む。",
    classification: "Abats",
    logic: "Medium heat / Very short cook",
    chef_note: "“数十秒 of 差で別食材”。"
  },
  {
    id: "cut_tripe",
    number: "10",
    type: "offal",
    name_fr: "Tripes",
    name_en: "Honeycomb tripe",
    name_ja: "ハチノス",
    top: "64%",
    left: "46%",
    properties: { tenderness: "★☆☆☆☆ → ★★★★★（煮込み）", fat: "★☆☆☆☆", collagen: "★★★★★" },
    cooking: "長時間煮込み",
    science: "蜂 of 巣状コラーゲン構造。酸と時間で分解される。",
    classification: "Abats traditionnels",
    logic: "Very long cook",
    chef_note: "“時間が構造を壊す食材”。"
  },
  {
    id: "cut_boyaux",
    number: "14",
    type: "offal",
    name_fr: "Boyaux",
    name_en: "Intestine",
    name_ja: "腸",
    top: "72%",
    left: "88%",
    properties: { tenderness: "★★☆☆☆", fat: "★★★★☆", collagen: "★★★★☆" },
    cooking: "ソーセージ, グリル",
    science: "平滑筋＋脂肪層。発酵・香辛料と相性が良い。",
    classification: "Charcuterie",
    logic: "Medium heat / Processed",
    chef_note: "“単体ではなく構造として使う部位”。"
  }
];

// Interactive Poultry Cuts Data
const poultryCuts = [
  {
    id: "cut_chicken_breast",
    number: "4",
    type: "regular",
    name_fr: "Blanc de poulet",
    name_en: "Breast",
    name_ja: "むね",
    top: "75%",
    left: "41%",
    properties: { tenderness: "★★☆☆☆", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ポシェ、ソテー、低温調理",
    science: "結合組織が少なく、高温で加熱すると水分が抜けやすい。低温でゆっくり火入れするとしっとり仕上がる。",
    classification: "Suprême de volaille",
    logic: "Low temperature / Delicate heat",
    chef_note: "加熱の誤差がそのまま品質差になる部位。"
  },
  {
    id: "cut_chicken_tender",
    number: "6",
    type: "regular",
    name_fr: "Aiguillette de poulet",
    name_en: "Tenderloin",
    name_ja: "ささみ",
    top: "72%",
    left: "44%",
    properties: { tenderness: "★★★☆☆", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ソテー、パン粉焼き、軽いフリット",
    science: "筋繊維が細く水分保持が弱い。短時間加熱で内部水分を守る必要がある。",
    classification: "Aiguillettes de poulet panées",
    logic: "Short cook / Gentle heat",
    chef_note: "「火を入れる時間」より「火を止める判断」が重要。"
  },
  {
    id: "cut_chicken_thigh",
    number: "3",
    type: "regular",
    name_fr: "Cuisse de poulet",
    name_en: "Thigh",
    name_ja: "もも",
    top: "80%",
    left: "56%",
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "★★★☆☆" },
    cooking: "ロティ、ブレゼ、煮込み",
    science: "運動量が多くミオグロビンが豊富。長時間加熱でコラーゲンがゼラチン化し、旨味が増す。",
    classification: "Coq au vin",
    logic: "Long cook / Medium heat",
    chef_note: "火を入れるほど価値が上がる数少ない部位。"
  },
  {
    id: "cut_chicken_shoulder",
    number: "5",
    type: "regular",
    name_fr: "Épaule de poulet",
    name_en: "Shoulder (Furisode)",
    name_ja: "ふりそで",
    top: "69%",
    left: "43%",
    properties: { tenderness: "★★★☆☆", fat: "★★☆☆☆", collagen: "★★☆☆☆" },
    cooking: "ソテー、軽い煮込み",
    science: "むねとももの中間的構造。加熱耐性と保水性のバランスが良い。",
    classification: "Sauté de volaille",
    logic: "Medium heat / Balanced cook",
    chef_note: "万能だが「主役より補助」に向く部位。"
  },
  {
    id: "cut_chicken_drumette",
    number: "2",
    type: "regular",
    name_fr: "Pilon de poulet",
    name_en: "Drumette",
    name_ja: "手羽もと",
    top: "86%",
    left: "51%",
    properties: { tenderness: "★★★☆☆", fat: "★★★☆☆", collagen: "★★★★☆" },
    cooking: "ロティ、オーブン焼き、グリル",
    science: "骨周辺にコラーゲンが集中。長時間加熱でゼラチン化しジューシーになる。",
    classification: "Pilons rôtis aux épices",
    logic: "Medium-high heat / Bone-in cook",
    chef_note: "骨付き加熱の“旨味の設計図”が最も分かりやすい部位。"
  },
  {
    id: "cut_chicken_wing_joint",
    number: "1",
    type: "regular",
    name_fr: "Aileron de poulet",
    name_en: "Wing mid joint",
    name_ja: "手羽なか",
    top: "70%",
    left: "48%",
    properties: { tenderness: "★★★★☆", fat: "★★★★☆", collagen: "★★★★☆" },
    cooking: "コンフィ、低温ロースト",
    science: "皮・脂・コラーゲンの三層構造。低温長時間で完全にゼラチン化する。",
    classification: "Ailerons confits",
    logic: "Low heat / Long cook / Confit",
    chef_note: "「溶ける食感」を作るための部位。"
  },
  {
    id: "cut_chicken_wing",
    number: "1",
    type: "regular",
    name_fr: "Aile de poulet",
    name_en: "Wing",
    name_ja: "手羽先",
    top: "70%",
    left: "50%",
    properties: { tenderness: "★★★☆☆", fat: "★★★★☆", collagen: "★★★★★" },
    cooking: "ブイヨン、ロースト、揚げ",
    science: "コラーゲン含有量が極めて高く、加熱でゼラチン化しスープに濃度を与える。",
    classification: "Bouillon de volaille / Fond",
    logic: "Simmer / Long cook",
    chef_note: "フランス料理の“出汁の骨格”になる部位。"
  },
  {
    id: "cut_chicken_skin",
    number: "8",
    type: "regular",
    name_fr: "Peau de poulet",
    name_en: "Skin",
    name_ja: "かわ",
    top: "62%",
    left: "52%",
    properties: { tenderness: "★★★☆☆", fat: "★★★★★", collagen: "★★★★★" },
    cooking: "ロースト、テュイル、揚げ焼き",
    science: "加熱により脂が溶け、コラーゲンが乾燥・再構築されクリスピー化する。",
    classification: "Tuile de peau de poulet",
    logic: "High heat / Fat render",
    chef_note: "「脂を抜くと完成する」特殊部位。"
  },
  {
    id: "cut_chicken_heart",
    number: "12",
    type: "offal",
    name_fr: "Cœur de poulet",
    name_en: "Heart",
    name_ja: "ハツ",
    top: "83%",
    left: "47%",
    properties: { tenderness: "★★★☆☆", fat: "★★☆☆☆", collagen: "★★☆☆☆" },
    cooking: "グリル、串焼き",
    science: "心筋由来の高密度筋繊維。短時間加熱で弾力を残す。",
    classification: "Brochettes de cœurs de poulet",
    logic: "High heat / Quick cook",
    chef_note: "火を入れすぎると一気に硬化する。"
  },
  {
    id: "cut_chicken_cardiac_base",
    number: "12",
    type: "offal",
    name_fr: "Base de cœur",
    name_en: "Cardiac base",
    name_ja: "ハツモト",
    top: "83%",
    left: "48%",
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "★★★☆☆" },
    cooking: "フリカッセ、軽い煮込み",
    science: "血管・弾性繊維構造。クリーム系と相性が良い。",
    classification: "Fricassée d’abats de volaille",
    logic: "Medium heat / Gentle simmer",
    chef_note: "内臓の中でも“ソース適性が高い”部位。"
  },
  {
    id: "cut_chicken_liver",
    number: "13",
    type: "offal",
    name_fr: "Foie de poulet",
    name_en: "Liver",
    name_ja: "レバー",
    top: "86%",
    left: "46%",
    properties: { tenderness: "★★★★☆", fat: "★★☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "パテ、ソテー、ムース",
    science: "実質器官で構造が均質。加熱しすぎると急速に水分が抜ける。",
    classification: "Pâté de foies de volaille",
    logic: "Medium heat / Short cook",
    chef_note: "“火入れの1分差”で別食材になる。"
  },
  {
    id: "cut_chicken_gizzard",
    number: "11",
    type: "offal",
    name_fr: "Gésier de poulet",
    name_en: "Gizzard",
    name_ja: "砂肝",
    top: "80%",
    left: "49%",
    properties: { tenderness: "★★☆☆☆", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "コンフィ、煮込み、サラダ",
    science: "強い筋肉組織。低温長時間で繊維がほぐれる。",
    classification: "Salade Landaise",
    logic: "Low heat / Long cook / Confit",
    chef_note: "“砂肝の噛み応えの設計”を理解する部位。"
  },
  {
    id: "cut_chicken_tail",
    number: "9",
    type: "offal",
    name_fr: "Croupion",
    name_en: "Tail (Bonjiri)",
    name_ja: "ボンジリ",
    top: "68%",
    left: "56%",
    properties: { tenderness: "★★★★★", fat: "★★★★★", collagen: "★★★☆☆" },
    cooking: "ロースト、グリル",
    science: "脂肪の集中部位。加熱で純脂の旨味が凝縮する。",
    classification: "Poulet rôti",
    logic: "Medium heat / Crisp grill",
    chef_note: "最も“快楽的な脂”を持つ部位。"
  },
  {
    id: "cut_chicken_cartilage_yagen",
    number: "14",
    type: "offal",
    name_fr: "Cartilage de poulet",
    name_en: "Cartilage (Yagen)",
    name_ja: "ヤゲン軟骨",
    top: "86%",
    left: "43%",
    properties: { tenderness: "★☆☆☆☆", fat: "★☆☆☆☆", collagen: "★★★★★" },
    cooking: "スープ、フォン",
    science: "コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",
    classification: "Fonds de volaille",
    logic: "Simmer / Long extraction",
    chef_note: "“ソースの粘度を作る素材”。"
  },
  {
    id: "cut_chicken_cartilage_knee",
    number: "15",
    type: "offal",
    name_fr: "Cartilage de poulet",
    name_en: "Cartilage (Nankotsu)",
    name_ja: "ひざ軟骨",
    top: "96%",
    left: "54%",
    properties: { tenderness: "★☆☆☆☆", fat: "★☆☆☆☆", collagen: "★★★★★" },
    cooking: "スープ、フォン",
    science: "コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",
    classification: "Fonds de volaille",
    logic: "Simmer / Long extraction",
    chef_note: "“ソースの粘度を作る素材”。"
  }
];

// Interactive Pork Cuts Data
const porcCuts = [
  {
    id: "cut_pork_loin",
    number: "1",
    type: "regular",
    name_fr: "Longe de porc",
    name_en: "Pork Loin",
    name_ja: "ロース",
    top: "66%",
    left: "58%",
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "★☆☆☆☆" },
    cooking: "ロースト、ソテー",
    science: "背側筋。均質な筋繊維＋脂の蓋で水分保持。",
    classification: "Roast cut",
    logic: "High heat / Short roast",
    chef_note: "“最も安定したステーキ素材”。"
  },
  {
    id: "cut_pork_tenderloin",
    number: "2",
    type: "regular",
    name_fr: "Filet mignon",
    name_en: "Tenderloin",
    name_ja: "ヒレ",
    top: "61%",
    left: "61%",
    properties: { tenderness: "★★★★★", fat: "★☆☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "ソテー、低温ロースト",
    science: "大腰筋。運動ゼロに近く筋繊維が極細。",
    classification: "Premium steak cut",
    logic: "Very short cook / Precision heat",
    chef_note: "“過熱した瞬間に価値が落ちる”。"
  },
  {
    id: "cut_pork_shoulder_loin",
    number: "3",
    type: "regular",
    name_fr: "Échine",
    name_en: "Shoulder loin",
    name_ja: "かたロース",
    top: "59%",
    left: "42%",
    properties: { tenderness: "★★★★☆", fat: "★★★★☆", collagen: "★★★☆☆" },
    cooking: "煮込み、ロースト",
    science: "脂と赤身の網構造。熱耐性が高い。",
    classification: "Braise + Roast hybrid",
    logic: "Medium / Long cook対応",
    chef_note: "“焼きと煮込みの中間解”。"
  },
  {
    id: "cut_pork_belly",
    number: "4",
    type: "regular",
    name_fr: "Poitrine de porc",
    name_en: "Belly",
    name_ja: "ばら",
    top: "80%",
    left: "50%",
    properties: { tenderness: "★★★★☆", fat: "★★★★★", collagen: "★★★★☆" },
    cooking: "煮込み、塩漬け、ロースト",
    science: "層状脂肪構造。塩で水分活性が下がり熟成が進む。",
    classification: "Charcuterie base cut",
    logic: "Long cook / Cure / Roast",
    chef_note: "“加工前提で完成する部位”。"
  },
  {
    id: "cut_pork_ham",
    number: "5",
    type: "regular",
    name_fr: "Jambon",
    name_en: "Ham leg (Cuissot)",
    name_ja: "もも",
    top: "70%",
    left: "67%",
    properties: { tenderness: "★★★☆☆", fat: "★★☆☆☆", collagen: "★★☆☆☆" },
    cooking: "ハム、ロースト",
    science: "大筋肉群。塩分浸透と熟成に最適化。",
    classification: "Charcuterie premium",
    logic: "Cure / Low temp cook",
    chef_note: "“豚の価値はここで決まる”。"
  },
  {
    id: "cut_pork_cheek",
    number: "6",
    type: "offal",
    name_fr: "Joue de porc",
    name_en: "Cheek",
    name_ja: "頬肉",
    top: "79%",
    left: "35%",
    properties: { tenderness: "★☆☆☆☆ → ★★★★★", fat: "★★★☆☆", collagen: "★★★★★" },
    cooking: "コンフィ、煮込み",
    science: "咀嚼筋。高密度コラーゲンが長時間で崩壊。",
    classification: "Braise cut (premium offal)",
    logic: "Very long cook",
    chef_note: "“ゼラチン化の完成形”。"
  },
  {
    id: "cut_pork_liver",
    number: "7",
    type: "offal",
    name_fr: "Foie de porc",
    name_en: "Liver",
    name_ja: "レバー",
    top: "73%",
    left: "53%",
    properties: { tenderness: "★★★★☆", fat: "★★☆☆☆", collagen: "★☆☆☆☆" },
    cooking: "テリーヌ、パテ",
    science: "実質臓器。酸化が早く乳化処理が重要。",
    classification: "Charcuterie essential",
    logic: "Low heat / Emulsion",
    chef_note: "“単体より構造化して使う”。"
  },
  {
    id: "cut_pork_tongue",
    number: "8",
    type: "offal",
    name_fr: "Langue",
    name_en: "Tongue",
    name_ja: "タン",
    top: "78%",
    left: "29%",
    properties: { tenderness: "★★★☆☆ → ★★★★★", fat: "★★★☆☆", collagen: "★★★★☆" },
    cooking: "煮込み、ゼリー寄せ",
    science: "筋＋結合組織の複合体。加熱で一体化する。",
    classification: "Abats nobles",
    logic: "Long cook / Gel setting",
    chef_note: "“煮ると一つの構造になる”。"
  },
  {
    id: "cut_pork_trotter",
    number: "9",
    type: "offal",
    name_fr: "Pied de porc",
    name_en: "Trotter",
    name_ja: "豚足",
    top: "96%",
    left: "44%",
    properties: { tenderness: "★☆☆☆☆ → ★★★★★", fat: "★★★☆☆", collagen: "★★★★★" },
    cooking: "煮込み→焼き",
    science: "コラーゲン塊。ゼラチン→再加熱でテクスチャー分離。",
    classification: "Classic peasant cuisine",
    logic: "Very long cook + roast finish",
    chef_note: "“二段階変換で完成する部位”。"
  },
  {
    id: "cut_pork_intestine",
    number: "10",
    type: "offal",
    name_fr: "Boyaux",
    name_en: "Intestine",
    name_ja: "腸",
    top: "84%",
    left: "58%",
    properties: { tenderness: "★★☆☆☆", fat: "★★★★☆", collagen: "★★★★☆" },
    cooking: "ソーセージ、加工",
    science: "平滑筋＋脂。香辛料と発酵で価値が決まる。",
    classification: "Charcuterie core material",
    logic: "Processed / Seasoned",
    chef_note: "“単体ではなく設計素材”。"
  }
];

// Interactive Gastronomic France Regions Data
const regions = [
  {
    id: "reg_normandie",
    number: "N",
    name_fr: "Normandie",
    name_en: "Normandy",
    name_ja: "ノルマンディー地方",
    top: "25%",
    left: "32%",
    desc_fr: "Célèbre pour ses riches pâturages et ses vergers de pommiers. Cuisine dominée par les produits laitiers et les pommes. Ingrédients clés : Fromage Camembert, Pommes. Plats classiques : Sole Normande, Poulet Vallée d'Auge. (Débarquement de Normandie (1944) Normandie)",
    desc_en: "Famous for lush green dairy pastures and apple orchards. Normandy cuisine is defined by heavy cream, raw butter, world-class cheese, and apples. Key ingredients: Camembert cheese, Apples. Signature dishes: Sole Normande, Poulet Vallée d'Auge. (Normandy Landings (1944) Normandy)",
    desc_ja: "フランス北西部の沿岸地域。冷涼な気候を活かしたリンゴの栽培（シードル、カルヴァドス）と、フランス最高峰の乳製品の産地として高名。魚介類にも恵まれ、生クリームを贅沢に使ったコク深い味付けが特徴。代表食材：カマンベールチーズ、リンゴ。代表料理：ソール・ノルマンド、プーレ_ヴァレ_ドージュ。歴史的出来事：(ノルマンディー上陸作戦 (1944) ノルマンディー)"
  },
  {
    id: "reg_bourgogne",
    number: "B",
    name_fr: "Bourgogne",
    name_en: "Burgundy",
    name_ja: "ブルゴーニュ地方",
    top: "48%",
    left: "58%",
    desc_fr: "Le cœur de la gastronomie classique française et des vins de prestige. Réputée pour ses viandes de Charolais et ses sauces au vin rouge réduit. Ingrédients clés : Bœuf Charolais, Moutarde de Dijon. Plats classiques : Bœuf Bourguignon, Escargots à la persillade, Coq au Vin. (Bataille d'Alésia (-52) Alésia)",
    desc_en: "The historic heartland of French wine, Charolais cattle, and Dijon mustard. Reduced red wine is heavily featured in regional sauces. Key ingredients: Charolais Beef, Dijon Mustard. Signature dishes: Bœuf Bourguignon, Escargots de Bourgogne, Coq au Vin. (Battle of Alesia (-52) Alesia)",
    desc_ja: "名高き特級ワインと古典フランス料理の中心地。広大な牧草地で育つ最高級のシャロレー牛やディジョンマスタードが名産。ワイン煮込み料理の発祥地であり、濃厚なソースが基本です。代表食材：シャロレー牛、ディジョンマスタード。代表料理：ブフ_ブルギニョン、エスカルゴのブルゴーニュ風、コック_オ_ヴァン。歴史的出来事：(アレシアの戦い (2026年より紀元前52年) アレシア)"
  },
  {
    id: "reg_provence",
    number: "P",
    name_fr: "Provence",
    name_en: "Provence",
    name_ja: "プロヴァンス地方",
    top: "80%",
    left: "72%",
    desc_fr: "Région baignée de soleil, influencée par la mer Méditerranée. Se base sur l'huile d'olive, l'ail, la tomate et les herbes aromatiques au lieu du beurre. Ingrédients clés : Huile d'olive, Herbes de Provence. Plats classiques : Bouillabaisse, Ratatouille, Salade Niçoise. (Papauté d'Avignon (1309) Avignon)",
    desc_en: "Sun-drenched Mediterranean cooking. Unlike the north, Provence avoids butter, using olive oil, garlic, fresh tomatoes, and aromatic wild herbs instead. Key ingredients: Olive oil, Herbes de Provence. Signature dishes: Bouillabaisse, Ratatouille, Salade Niçoise. (Avignon Papacy (1309) Avignon)",
    desc_ja: "地中海に面した温暖な南仏地域。乳製品主体の北部とは対照的に、オリーブオイル、にんにく、トマト、ハーブ類を主役とする健康的で明るい地中海料理が魅力。代表食材：オリーブオイル、プロヴァンス_ハーブ。代表料理：ブイヤベース、ラタトゥイユ、ニース風サラダ。歴史的出来事：(アヴィニョン捕囚 (1309) アヴィニョン)"
  },
  {
    id: "reg_alsace",
    number: "A",
    name_fr: "Alsace",
    name_en: "Alsace",
    name_ja: "アルザス地方",
    top: "32%",
    left: "82%",
    desc_fr: "Région à la frontière allemande, combinant des ingrédients robustes et des vins blancs fruités. Célèbre pour ses charcuteries de porc et son chou. Ingrédients clés : Chou à choucroute, Saucisse de Strasbourg. Plats classiques : Choucroute Garnie, Flammekueche, Baeckeoffe. (Cession de l'Alsace-Lorraine (1871) Alsace)",
    desc_en: "Bordering Germany, Alsace combines hearty Germanic staples with dry, aromatic French white wines. Noted for curing meats, sausages, and sauerkraut. Key ingredients: Sauerkraut, Strasbourg Sausage. Signature dishes: Choucroute Garnie, Flammekueche, Baeckeoffe. (Ceding of Alsace-Lorraine (1871) Alsace)",
    desc_ja: "ドイツ国境沿いに位置する北東の地方。地元の白ワインと合わせる豚肉のスモーク、自家製ソーセージ、塩漬けキャベツ（シュークルート）が名物。ドイツの質実剛健さとフランスの洗練が融合。代表食材：シュークルート、ストラスブール_ソーセージ。代表料理：シュークルート_ガルニ、タルト_フランベ、ベッコフ。歴史的出来事：(アルザス・ロレーヌ割譲 (1871) アルザス)"
  },
  {
    id: "reg_bretagne",
    number: "BR",
    name_fr: "Bretagne",
    name_en: "Brittany",
    name_ja: "ブルターニュ地方",
    top: "35%",
    left: "15%",
    desc_fr: "Région maritime sauvage à l'ouest. Sa cuisine est marquée par l'océan, l'utilisation de beurre salé et de sarrasin pour ses crêpes. Ingrédients clés : Farine de sarrasin, Beurre salé. Plats classiques : Galette de sarrasin, Cotriade, Kouign-amann. (Union de la Bretagne à la France (1532) Vannes)",
    desc_en: "A rugged maritime region in the west. Its cuisine is heavily shaped by the Atlantic ocean, hearty buckwheat, and rich salted butter culture. Key ingredients: Buckwheat flour, Salted butter. Signature dishes: Buckwheat Galette, Cotriade, Kouign-amann. (Union of Brittany and France (1532) Vannes)",
    desc_ja: "大西洋に突き出た最西端の沿岸地域。豊かな海洋資源に加え、ガレット（クレープ）に使われるそば粉や有塩バターの文化が深く根付く独自の土地柄。代表食材：そば粉、有塩バター。代表料理：ガレット_ド_サラザン、コトリアード（魚介スープ）、クイニーアマン。歴史的出来事：(ブルターニュ公国のフランス併合 (1532) ヴァンヌ)"
  },
  {
    id: "reg_ile_de_france",
    number: "IF",
    name_fr: "Île-de-France",
    name_en: "Île-de-France",
    name_ja: "イル・ド・フランス地方",
    top: "28%",
    left: "50%",
    desc_fr: "Le centre politique et culturel de la France. Berceau de la haute gastronomie, influencé par les meilleurs produits de tout le pays. Ingrédients clés : Champignon de Paris, Brie de Meaux. Plats classiques : Pot-au-feu, Soupe à l'oignon, Entrecôte Bercy. (Révolution française (1789) Paris)",
    desc_en: "The political and cultural heartland of France. The historical birthplace of haute cuisine, featuring refined bistro classics and royal traditions. Key ingredients: Paris Mushroom, Brie de Meaux. Signature dishes: Pot-au-feu, French Onion Soup, Entrecôte Bercy. (French Revolution (1789) Paris)",
    desc_ja: "パリを中心とする首都圏地域。宮廷料理から発展した高級ガストロノミーと、洗練されたビストロ料理の発祥地。国内中から最高の一級食材が集まります。代表食材：マッシュルーム、ブリー_ド_モー（チーズ）。代表料理：ポトフ、オニオングラタンスープ、アントルコート_ベルシー。歴史的出来事：(フランス革命 (1789) パリ)"
  },
  {
    id: "reg_aquitaine",
    number: "AQ",
    name_fr: "Nouvelle-Aquitaine",
    name_en: "Aquitaine / Southwest",
    name_ja: "アキテーヌ（南西地方）",
    top: "65%",
    left: "34%",
    desc_fr: "Région du Sud-Ouest, réputée pour sa gastronomie généreuse et ses grands vins de Bordeaux. Spécialisée dans la cuisine du canard et du foie gras. Ingrédients clés : Foie gras, Canard. Plats classiques : Confit de canard, Cassoulet, Magret de canard. (Fin de la Guerre de Cent Ans (1453) Castillon)",
    desc_en: "A southwestern region famous for its rich, hearty cuisine and world-renowned Bordeaux wines. Highly specialized in duck fats and savory foie gras. Key ingredients: Foie gras, Duck meat. Signature dishes: Duck Confit, Cassoulet, Magret de canard. (End of the Hundred Years' War (1453) Castillon)",
    desc_ja: "ボルドーワインを擁するフランス南西部の美食地帯。フランス随一のフォアグラの産地であり、鴨の脂や肉を巧みに使った濃厚で贅沢な郷土料理が特徴。代表食材：フォアグラ、鴨肉。代表料理：鴨のコンフィ、カスレ、マグレ_ド_カナール。歴史的出来事：(百年戦争終結 (1453) カスティヨン)"
  },
  {
    id: "reg_rhone_alpes",
    number: "RA",
    name_fr: "Auvergne-Rhône-Alpes",
    name_en: "Rhône-Alpes / Lyonnais",
    name_ja: "ローヌ・アルプ（リヨン地方）",
    top: "60%",
    left: "68%",
    desc_fr: "Considérée comme la capitale mondiale de la gastronomie (Lyon). Cuisine riche, alliant les grands fromages des Alpes et les volailles de Bresse. Ingrédients clés : Volaille de Bresse, Saucisson de Lyon. Plats classiques : Quenelle de brochet, Poulet aux morilles, Gratin Dauphinois. (Révolte des Canuts (1831) Lyon)",
    desc_en: "Often crowned as the gastronomic capital of the world (Lyon). A rich culinary style combining premium alpine cheeses with legendary bistro fares. Key ingredients: Bresse Poultry, Lyon Sausage. Signature dishes: Pike Quenelle, Poulet de Bresse with morals, Gratin Dauphinois. (Silk weavers' revolts (1831) Lyon)",
    desc_ja: "「世界の美食の都」と称されるリヨンを擁する地方。アルプスの山岳チーズや最高峰の鶏肉を活かした、力強くも洗練されたビストロ（ブション）文化が息づく。代表食材：ブレス鶏、リヨン風ソーセージ。代表料理：川魚 of クネル、ブレス鶏のモリーユ茸クリーム煮、グラタン_ドフィノワ。歴史的出来事：(リヨン絹織物職人の蜂起 (1831) リヨン)"
  },
  {
    id: "reg_loire",
    number: "LO",
    name_fr: "Centre-Val de Loire",
    name_en: "Loire Valley",
    name_ja: "ロワール地方",
    top: "42%",
    left: "44%",
    desc_fr: "Surnommée le Jardin de la France. Connue pour ses châteaux royaux, ses vins élégants, ses fromages de chèvre et ses délicieux poissons de rivière. Ingrédients clés : Sainte-Maure de Touraine, Poissons de Loire. Plats classiques : Rillettes de Tours, Brochet au beurre blanc, Tarte Tatin. (Siège d'Orléans par Jeanne d'Arc (1429) Orléans)",
    desc_en: "Known as the Garden of France. Famous for fairy-tale châteaux, elegant white wines, delicate goat cheeses, and fresh river fish. Key ingredients: Sainte-Maure de Touraine (goat cheese), Loire River fish. Signature dishes: Rillettes of Tours, Pike with beurre blanc, Tarte Tatin. (Siege of Orléans (1429) Orléans)",
    desc_ja: "「フランスの庭園」と呼ばれる風光明媚な古城地帯。王侯貴族に愛された気品ある白ワイン、多種多様な山羊乳チーズ（シェーヴル）、豊かな川魚料理が魅力。代表食材：サント_モール_ド_トゥーレーヌ、ロワール川の川魚。代表料理：リエット、川魚のブールブランソース添え、タルトタタン。歴史的出来事：(ジャンヌ・ダルクによるオルレアン解放 (1429) オルレアン)"
  },
  {
    id: "reg_champagne",
    number: "CH",
    name_fr: "Grand Est (Champagne)",
    name_en: "Champagne",
    name_ja: "シャンパーニュ地方",
    top: "26%",
    left: "62%",
    desc_fr: "Célèbre dans le monde entier pour son vin effervescent unique. La cuisine locale propose des plats mijotés robustes pour contrer les hivers froids. Ingrédients clés : Vin de Champagne, Jambon des Ardennes. Plats classiques : Potée Champenoise, Biscuits roses de Reims. (Sacre de Clovis / Rois de France (496) Reims)",
    desc_en: "Northeast region celebrated globally for its unique sparkling wine. The local kitchen offers rustic pot-roasted meats to counter cold northern winters. Key ingredients: Champagne Wine, Ardennes Ham. Signature dishes: Potée Champenoise, Pink Biscuits of Reims. (Coronation of Clovis / Kings of France (496) Reims)",
    desc_ja: "世界で最も高貴なスパークリングワイン「シャンパン」の故郷。北東部の寒冷な気候をしのぐため、お肉や野菜をじっくり煮込んだ素朴で温かい伝統鍋が愛されています。代表食材：シャンパン、アルデンヌの生ハム。代表料理：ポテ_シャンプノワーズ、ビスキュイ_ローズ_ド_ランス。歴史的出来事：(フランク王国クローヴィスおよび歴代国王の戴カン式 (496) ランス)"
  },
  {
    id: "reg_languedoc",
    number: "LA",
    name_fr: "Occitanie (Languedoc)",
    name_en: "Languedoc / South",
    name_ja: "ラングドック地方",
    top: "78%",
    left: "46%",
    desc_fr: "Région méditerranéenne du Sud, marquée par des influences occitanes. Propose une cuisine de terroir généreuse, parfumée à l'ail, aux olives et aux fruits de mer. Ingrédients clés : Haricot lingot, Anchois de Collioure. Plats classiques : Cassoulet de Castelnaudary, Brandade de morue, Tielle sétoise. (Croisade des albigeois (1209) Béziers)",
    desc_en: "A southern Mediterranean region with strong Occitan roots. Features rustic landward cooking packed with garlic, rich olive oils, and fresh seafood. Key ingredients: Lingot Beans, Collioure Anchovies. Signature dishes: Cassoulet, Brandade de morue, Tielle sétoise. (Albigensian Crusade (1209) Béziers)",
    desc_ja: "地中海に面した南仏の西側エリア。オリーブやにんにく、トマトを多用し、カステルノーダリの伝統的な豆の煮込みや、豊かな海の幸を組み合わせた力強い郷土料理が特徴。代表食材：白インゲン豆、コリウールのアンチョビ。代表料理：カスレ、ブランダード_ド_モリュ、ティエル（タコのパイ）。歴史的出来事：(アルビジョワ十字軍 (1209) ベジエ)"
  },
  {
    id: "reg_corse",
    number: "CO",
    name_fr: "Corse",
    name_en: "Corsica",
    name_ja: "コルシカ島",
    top: "88%",
    left: "85%",
    desc_fr: "L'Île de Beauté au caractère sauvage. Sa cuisine est basée sur les produits de la montagne, les châtaignes, le fromage de brebis et la charcuterie. Ingrédients clés : Farine de châtaigne, Lonzu. Plats classiques : Civet de sanglier, Fiadone, Veau aux olives. (Naissance de Napoléon Bonaparte (1769) Ajaccio)",
    desc_en: "The Island of Beauty with a rugged mountain character. Its unique cuisine is driven by aromatic wild herbs, chestnut forests, sheep cheese, and cured pork. Key ingredients: Chestnut flour, Lonzu (cured pork). Signature dishes: Wild Boar Civet, Fiadone, Veau aux olives. (Birth of Napoleon Bonaparte (1769) Ajaccio)",
    desc_ja: "地中海に浮かぶ険しい山岳の島。独自の生態系が育む栗の粉、野生ハーブを食べて放牧された地豚の熟成肉（シャルキュトリー）、羊乳チーズなどを活かした力強い山のごちそう。代表食材：栗粉、ロンズ（豚肉の熟成肉）。代表料理：イノシシのシヴェ（煮込み）、フィアドーヌ（チーズケーキ）、子牛肉のオリーブ煮。歴史的出来事：(ナポレオン・ボナパルト誕生 (1769) アジャクシオ)"
  },
  {
    id: "reg_hauts_de_france",
    number: "HF",
    name_fr: "Hauts-de-France",
    name_en: "Northern France / Flanders",
    name_ja: "オー・ド・フランス地方（北フランス）",
    top: "14%",
    left: "51%",
    desc_fr: "Région du Nord influencée par la culture flamande. Connue pour sa cuisine mijotée à la bière, ses frites croustillantes et ses fromages forts. Ingrédients clés : Fromage Maroilles, Endive. Plats classiques : Carbonnade Flamande, Potjevleesch, Moules-frites. (Bataille de Dunkerque (1940) Dunkerque)",
    desc_en: "Northernmost region deeply influenced by Flemish culture. Noted for comforting beer-infused slow cooking, intense aromatic cheeses, and crispy fries. Key ingredients: Maroilles Cheese, Endive. Signature dishes: Carbonnade Flamande, Potjevleesch, Moules-frites. (Battle of Dunkirk (1940) Dunkirk)",
    desc_ja: "ベルギーと国境を接するフランス最北部。ワインではなくビールを使った煮込み料理や、独特な強い香りのマロワール・チーズ、野菜のチコリ（エンダイブ）が名物。フランドル文化の温かみがあります。代表食材：マロワール・チーズ、チコリ。代表料理：カルボナード（牛肉のビール煮）、ポチェブリーシュ、ムール_フリット。歴史的出来事：(ダンケルクの戦い (1940) ダンケルク)"
  }
];

export function renderCuisine() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Théorie de l'Art Culinaire";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Classical French culinary theory, stock making, classical sauces, and interactive gastronomy diagrams.";
  container.appendChild(subtitle);
  
  // Render sub-tabs navigation
  const tabsNav = document.createElement('div');
  tabsNav.className = 'cuisine-tabs';
  tabsNav.innerHTML = `
    <button class="cuisine-tab-btn active" data-tab="theory">📖 Théorie Classique</button>
    <button class="cuisine-tab-btn" data-tab="meat">🥩 Viandes (お肉)</button>
    <button class="cuisine-tab-btn" data-tab="map">🗺️ Carte Gastronomique</button>
  `;
  container.appendChild(tabsNav);
  
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'cuisine-content-wrapper';
  container.appendChild(contentWrapper);

  // Tab switching logic
  tabsNav.querySelectorAll('.cuisine-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabsNav.querySelectorAll('.cuisine-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const targetTab = e.target.getAttribute('data-tab');
      renderCuisineSubTab(targetTab);
    });
  });

  function renderCuisineSubTab(tab) {
    contentWrapper.innerHTML = '';
    
    if (tab === 'theory') {
      renderTheoryList();
    } else if (tab === 'meat') {
      renderMeatSection();
    } else if (tab === 'map') {
      renderGastronomyMap();
    }
  }

  // SUB-TAB 1: CLASSICAL TEXT GUIDES
  function renderTheoryList() {
    contentWrapper.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement de la théorie... (Loading theory...)</div>`;
    
    const activeLevel = state.settings?.targetLevel || 'ALL';
    ensureDataLoaded('cuisine', activeLevel).then(() => {
      contentWrapper.innerHTML = '';
      const theoryItems = state.db?.cuisine || [];
      const filteredItems = theoryItems.filter(item => activeLevel === 'ALL' || item.level === activeLevel);
      
      if (filteredItems.length === 0) {
        contentWrapper.innerHTML = `<p style="color: var(--color-text-muted);">Aucun document de théorie culinaire disponible pour ce niveau.</p>`;
        return;
      }
      
      const listContainer = document.createElement('div');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'column';
      listContainer.style.gap = '2rem';
      
      filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'block';
        card.style.padding = '2rem';
        
        const isFav = isFavorite(item.id);
        const frMatch = item.topic.match(/^([^(]+)/);
        const frTitle = frMatch ? frMatch[1].trim() : item.topic;
        
        card.innerHTML = `
          <div class="card-category" style="margin-bottom: 0.5rem;">${item.category}</div>
          <div class="term-header" style="border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.8rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-primary); margin: 0;">${item.topic}</h3>
              <button class="audio-btn" data-text="${frTitle}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
            </div>
            <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" style="font-size: 1.3rem;">
              ${isFav ? '★' : '☆'}
            </button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
                <button class="audio-btn" data-text="${item.content_fr}" title="Listen paragraph" style="background: none; border: none; font-size: 0.95rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
              </div>
              <p style="font-size: 0.95rem; color: var(--color-primary); font-style: italic; text-align: justify; line-height: 1.6;">${item.content_fr}</p>
            </div>
            <div>
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">English Explanation</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-main); text-align: justify; line-height: 1.6;">${item.content_en}</p>
            </div>
            <div style="background-color: rgba(10, 25, 49, 0.03); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-secondary);">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 600; margin-bottom: 0.3rem;">日本語解説</h4>
              <p style="font-size: 0.85rem; color: var(--color-text-main); line-height: 1.6; white-space: pre-line;">${item.content_ja}</p>
            </div>
          </div>
        `;
        
        // Favorite click handler
        card.querySelector('.fav-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFavorite(item.id);
          const button = e.target;
          const nowFav = isFavorite(item.id);
          button.classList.toggle('active', nowFav);
          button.innerText = nowFav ? '★' : '☆';
        });
        
        // Audio trigger
        card.querySelectorAll('.audio-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = e.target.closest('.audio-btn').getAttribute('data-text');
            speakFrench(text);
          });
        });
        
        listContainer.appendChild(card);
      });
      
      contentWrapper.appendChild(listContainer);
    });
  }

  // SUB-TAB 2: INTERACTIVE MEAT SECTION
  function renderMeatSection() {
    const sectionContainer = document.createElement('div');
    sectionContainer.className = 'meat-section-container';
    
    // Sub-sub tabs (Beef, Pork, Poultry)
    const subTabs = document.createElement('div');
    subTabs.className = 'meat-type-tabs';
    subTabs.innerHTML = `
      <button class="meat-tab-btn active" data-type="beef">🐂 Bœuf (牛)</button>
      <button class="meat-tab-btn" data-type="porc">🐖 Porc (豚)</button>
      <button class="meat-tab-btn" data-type="volaille">🐓 Volaille (鶏)</button>
    `;
    sectionContainer.appendChild(subTabs);
    
    const displayArea = document.createElement('div');
    displayArea.className = 'meat-display-area';
    sectionContainer.appendChild(displayArea);
    
    contentWrapper.appendChild(sectionContainer);
    
    // Inner Tab switching
    subTabs.querySelectorAll('.meat-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        subTabs.querySelectorAll('.meat-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = e.target.closest('.meat-tab-btn');
        activeBtn.classList.add('active');
        const meatType = activeBtn.getAttribute('data-type');
        renderMeatType(meatType, displayArea);
      });
    });
    
    // Initial display
    renderMeatType('beef', displayArea);
  }

  function renderMeatType(type, wrapper) {
    wrapper.innerHTML = '';
    
    if (type === 'beef') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="beef_maff_guide.pdf" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            📄 日本農水省 牛肉部位基準 (PDF)
          </a>
        </div>
        <div class="interactive-canvas-container">
          <img src="assets/beef_cuts.png" alt="French Beef Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Coupe+de+Boeuf'">
          ${beefCuts.map(cut => {
            const pinBg = cut.type === 'offal' ? '#A0522D' : '#202530';
            return `
              <button class="interactive-hotspot" style="top: ${cut.top}; left: ${cut.left}; background-color: ${pinBg}; color: #FFFFFF;" data-id="${cut.id}">
                ${cut.number}
              </button>
            `;
          }).join('')}
        </div>
        
        <div class="cuisine-detail-drawer" id="beef-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="beef-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="beef-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="beef-cut-sub">Coupe de Bœuf</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="beef-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="beef-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="beef-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="beef-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">フランス的分類</h4>
                <p class="meat-block-text" id="beef-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="beef-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="beef-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="beef-chef-note"></p>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#beef-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-hotspot');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = beefCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#beef-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#beef-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#beef-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#beef-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#beef-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#beef-cooking').innerText = cut.cooking;
            panel.querySelector('#beef-classification').innerText = cut.classification;
            panel.querySelector('#beef-logic').innerText = cut.logic;
            panel.querySelector('#beef-science').innerText = cut.science;
            panel.querySelector('#beef-chef-note').innerText = cut.chef_note;

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#beef-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });

    } else if (type === 'porc') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div style="background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent); margin-bottom: 1.5rem; text-align: center;">
          <span style="font-family: var(--font-serif); font-size: 1.1rem; font-style: italic; color: var(--color-primary);">"Tout est bon dans le cochon" (豚はすべてが使える食材である)</span>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="pork_maff_guide.pdf" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            📄 日本農水省 豚肉部位基準 (PDF)
          </a>
        </div>
        <div class="interactive-canvas-container">
          <img src="assets/porc_cuts.png" alt="French Pork Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Coupe+de+Porc'">
          ${porcCuts.map(cut => {
            const pinBg = cut.type === 'offal' ? '#A0522D' : '#202530';
            return `
              <button class="interactive-hotspot" style="top: ${cut.top}; left: ${cut.left}; background-color: ${pinBg}; color: #FFFFFF;" data-id="${cut.id}">
                ${cut.number}
              </button>
            `;
          }).join('')}
        </div>
        
        <div class="cuisine-detail-drawer" id="pork-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="pork-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="pork-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="pork-cut-sub">Coupe de Porc</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="pork-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="pork-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="pork-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="pork-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">フランス的分類</h4>
                <p class="meat-block-text" id="pork-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="pork-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="pork-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="pork-chef-note"></p>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#pork-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-hotspot');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = porcCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#pork-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#pork-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#pork-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#pork-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#pork-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#pork-cooking').innerText = cut.cooking;
            panel.querySelector('#pork-classification').innerText = cut.classification;
            panel.querySelector('#pork-logic').innerText = cut.logic;
            panel.querySelector('#pork-science').innerText = cut.science;
            panel.querySelector('#pork-chef-note').innerText = cut.chef_note;

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#pork-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });

    } else if (type === 'volaille') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="poultry_maff_guide.pdf" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            📄 日本農水省 鶏肉部位基準 (PDF)
          </a>
        </div>
        <div class="interactive-canvas-container">
          <img src="assets/poultry_cuts.png" alt="French Poultry Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Coupe+de+Volaille'">
          ${poultryCuts.map(cut => {
            const pinBg = cut.type === 'offal' ? '#A0522D' : '#202530';
            return `
              <button class="interactive-hotspot" style="top: ${cut.top}; left: ${cut.left}; background-color: ${pinBg}; color: #FFFFFF;" data-id="${cut.id}">
                ${cut.number}
              </button>
            `;
          }).join('')}
        </div>
        
        <div class="cuisine-detail-drawer" id="poultry-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="poultry-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="poultry-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="poultry-cut-sub">Coupe de Volaille</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="poultry-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="poultry-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="poultry-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="poultry-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">代表料理 (Plat Classique)</h4>
                <p class="meat-block-text" id="poultry-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="poultry-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="poultry-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="poultry-chef-note"></p>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#poultry-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-hotspot');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = poultryCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#poultry-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#poultry-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#poultry-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#poultry-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#poultry-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#poultry-cooking').innerText = cut.cooking;
            panel.querySelector('#poultry-classification').innerText = cut.classification;
            panel.querySelector('#poultry-logic').innerText = cut.logic;
            panel.querySelector('#poultry-science').innerText = cut.science;
            panel.querySelector('#poultry-chef-note').innerText = cut.chef_note;

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#poultry-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });
    }
  }

  // SUB-TAB 3: GEOGRAPHIC CULINARY MAP
  function renderGastronomyMap() {
    const panel = document.createElement('div');
    panel.innerHTML = `
      <div class="interactive-canvas-container">
        <img src="assets/france_map.png" alt="Gastronomic Map of France" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Carte+Gastronomique'">
        ${regions.map(reg => `
          <button class="interactive-hotspot" style="top: ${reg.top}; left: ${reg.left}; background-color: var(--color-secondary); color: var(--color-primary);" data-id="${reg.id}">
            ${reg.number}
          </button>
        `).join('')}
      </div>
      
      <div class="cuisine-detail-drawer" id="map-detail-drawer">
        <div class="detail-drawer-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <h3 class="detail-drawer-title" id="map-region-title">Select a Region</h3>
            <button class="audio-btn" id="map-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
          </div>
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="map-region-sub">Région Gastronomique</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
              <button class="audio-btn" id="map-audio-desc-btn" style="background: none; border: none; font-size: 0.95rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-primary); font-style: italic; line-height: 1.5; text-align: justify;" id="map-desc-fr"></p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">English Description</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5; text-align: justify;" id="map-desc-en"></p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">日本語解説</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5; text-align: justify;" id="map-desc-ja"></p>
          </div>
        </div>
      </div>
    `;

    contentWrapper.appendChild(panel);

    const drawer = panel.querySelector('#map-detail-drawer');
    const spots = panel.querySelectorAll('.interactive-hotspot');

    spots.forEach(spot => {
      spot.addEventListener('click', (e) => {
        spots.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');

        const regId = e.target.getAttribute('data-id');
        const reg = regions.find(r => r.id === regId);
        
        if (reg) {
          panel.querySelector('#map-region-title').innerText = `${reg.name_fr} (${reg.name_ja})`;
          panel.querySelector('#map-region-sub').innerText = `${reg.name_en} Region`;
          
          panel.querySelector('#map-desc-fr').innerText = reg.desc_fr;
          panel.querySelector('#map-desc-en').innerText = reg.desc_en;
          panel.querySelector('#map-desc-ja').innerText = reg.desc_ja;

          // Wire up audio
          const titleAudioBtn = panel.querySelector('#map-audio-title-btn');
          titleAudioBtn.style.display = 'inline-block';
          titleAudioBtn.onclick = () => speakFrench(reg.name_fr);

          const descAudioBtn = panel.querySelector('#map-audio-desc-btn');
          descAudioBtn.style.display = 'inline-block';
          descAudioBtn.onclick = () => speakFrench(reg.desc_fr);

          drawer.style.display = 'block';
        }
      });
    });
  }

  // Load default tab
  renderCuisineSubTab('theory');
  
  return container;
}
