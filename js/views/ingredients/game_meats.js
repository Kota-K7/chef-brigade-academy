// Interactive Game Meats (Gibier) Data
export const deerCuts = [
  {
    id: "cut_gibier_chevreuil",
    number: "1",
    name_fr: "Filet de chevreuil",
    name_en: "Venison loin (Roe deer)",
    name_ja: "フィレ・ド・シュヴルイユ（鹿ロース）",
    pin: { x: 55, y: 38 },
    properties: { tenderness: "★★★★☆", fat: "★☆☆☆☆", collagen: "★★★☆☆" },
    cooking: "ロティ、ポワレ、ソース・ポワブラード",
    science: "野生の鹿は脂肪がほとんどない高タンパク赤身肉。加熱しすぎると肉質が引き締まり強固に硬化するため、芯温54°C前後のロゼを狙います。",
    classification: "Gibier de poil (毛のある野生獣肉)",
    logic: "Delicate roast / Rare to Medium-rare",
    chef_note: "黒コショウを効かせた赤ワインソース（Poivrade）や、野生の果実（ブルーベリーなど）の酸味を添えます。"
  },
  {
    id: "cut_gibier_gigue",
    number: "2",
    name_fr: "Gigue de chevreuil",
    name_en: "Haunch of venison (Leg)",
    name_ja: "ジグ・ド・シュヴルイユ（鹿もも・お尻）",
    pin: { x: 75, y: 50 },
    properties: { tenderness: "★★★☆☆", fat: "★☆☆☆☆", collagen: "★★★★☆" },
    cooking: "シヴェ（赤ワイン煮込み）、長時間ロティ",
    science: "結合組織が多く、筋肉質な部位。酸味のある赤ワインやスパイスをブレンドした液でマリネし、繊維を軟化させてから煮込みます。",
    classification: "Gibier de poil",
    logic: "Acid marination / Low & slow braise",
    chef_note: "丸ごと焼き上げてクラシックな大皿料理にするか、細かく切ってポトフ風に煮込みます。"
  }
];

export const boarCuts = [
  {
    id: "cut_gibier_sanglier",
    number: "1",
    name_fr: "Filet de sanglier",
    name_en: "Wild boar loin",
    name_ja: "フィレ・ド・サングリエ（猪ロース）",
    pin: { x: 52, y: 38 },
    properties: { tenderness: "★★★★☆", fat: "★★☆☆☆", collagen: "★★★☆☆" },
    cooking: "ロティ、ソテー",
    science: "飼育豚に比べ、野生の猪肉は筋肉が引き締まり鉄分が豊富。脂質が少ない分、肉汁を閉じ込める焼き方が求められます。",
    classification: "Gibier de poil",
    logic: "Medium heat / Steady roast",
    chef_note: "豚肉に近い感覚で扱えますが、しっかり中まで熱を入れつつ（殺菌のため）、ジューシーさを残す火入れが必要です。"
  },
  {
    id: "cut_gibier_sanglier_epaule",
    number: "2",
    name_fr: "Épaule de sanglier",
    name_en: "Wild boar shoulder",
    name_ja: "エポール・ド・サングリエ（猪肩・首肉）",
    pin: { x: 28, y: 42 },
    properties: { tenderness: "★★☆☆☆ → ★★★★★", fat: "★★★☆☆", collagen: "★★★★★" },
    cooking: "シヴェ・ド・サングリエ（赤ワインと血の煮込み）",
    science: "咀嚼や運動でよく使われる部位。コラーゲンが極めて多く、長時間の煮込みで溶け出し、赤ワインと肉の血（またはカカオ）で煮汁を乳化させ重厚なとろみをつけます。",
    classification: "Gibier classique de braisage",
    logic: "Very long cook / Red wine stew",
    chef_note: "冬のジビエの王道。濃厚なソースには栗（marron）のピューレが最も合います。"
  }
];

export const pigeonCuts = [
  {
    id: "cut_gibier_pigeon",
    number: "1",
    name_fr: "Suprême de pigeon",
    name_en: "Pigeon breast",
    name_ja: "シュプレーム・ド・ピジョン（鳩胸肉）",
    pin: { x: 45, y: 42 },
    properties: { tenderness: "★★★★☆", fat: "★☆☆☆☆", collagen: "★★☆☆☆" },
    cooking: "ポワレ、ロティ（ロゼ仕立て）",
    science: "鳩の胸筋は鉄分（ミオグロビン）の塊。加熱しすぎるとレバーのような血生臭さとボソボソ感が出るため、芯温52〜54°Cのロゼに仕上げます。",
    classification: "Gibier de plume (羽のある野生鳥獣)",
    logic: "Flash sear / Precise rare cooking",
    chef_note: "皮をパリッと香ばしく焼き、中は均一なロゼ（Rosé）を保つのが職人の仕事。"
  },
  {
    id: "cut_gibier_pigeon_cuisse",
    number: "2",
    name_fr: "Cuisse de pigeon",
    name_en: "Pigeon leg",
    name_ja: "キュイス・ド・ピジョン（鳩もも肉）",
    pin: { x: 65, y: 55 },
    properties: { tenderness: "★★★☆☆", fat: "★★☆☆☆", collagen: "★★★☆☆" },
    cooking: "コンフィ、グリル",
    science: "極めて小さく薄いもも肉。胸肉に比べて結合組織が多いため、コンフィにするか、しっかり焼いて皮目をクリスピーにします。",
    classification: "Gibier de plume",
    logic: "Confit or Crisp grill",
    chef_note: "胸肉の横に可愛らしく添えられることが多い。小さいながらも旨味は非常に濃い。"
  }
];

export const hareCuts = [
  {
    id: "cut_gibier_lievre",
    number: "1",
    name_fr: "Râble de lièvre",
    name_en: "Saddle of hare",
    name_ja: "ラーブル・ド・リエーヴル（野ウサギの背肉）",
    pin: { x: 50, y: 40 },
    properties: { tenderness: "★★★★☆", fat: "★☆☆☆☆", collagen: "★★★☆☆" },
    cooking: "ロティ、ソテー、ソース・ポワブラード",
    science: "家ウサギ（Lapin）に比べて野ウサギ（Lièvre）は肉質が赤黒く、野性味が強い。背肉は一番柔らかい中心部位です。",
    classification: "Gibier de poil",
    logic: "Short cook / Roast medium",
    chef_note: "フランス料理で最も高貴とされるジビエの一つ。「Lièvre à la Royale（ウサギのロワイヤル）」は宮廷料理の流れを汲む伝説の一皿。"
  }
];
