// Interactive Cheese & Wine Data
export const cheeseCuts = [
  {
    id: "ing_camembert",
    number: "1",
    name_fr: "Camembert de Normandie",
    name_en: "Camembert (Normandy)",
    name_ja: "カマンベール・ド・ノルマンディー",
    pin: { x: 35, y: 45 },
    properties: { tenderness: "★★★★★", fat: "★★★★☆", collagen: "☆☆☆☆☆" },
    cooking: "そのまま、焼きカマンベール（Camembert au four）",
    science: "表面の白カビ（Penicillium camemberti）が分泌するプロテアーゼ（タンパク質分解酵素）により、カゼインが分解され、中心部に向かって徐々に柔らかくクリーミーな状態へと熟成が進みます。",
    classification: "Fromage à pâte molle à croûte fleurie（白カビソフトタイプ）",
    logic: "AOP Protected / Raw milk product",
    chef_note: "冷蔵庫から食べる1時間前には出し、室温に戻しておくことで、独特の芳醇な香りと滑らかなテクスチャーが最大限に引き出されます。"
  },
  {
    id: "ing_roquefort",
    number: "2",
    name_fr: "Roquefort",
    name_en: "Roquefort (Blue cheese)",
    name_ja: "ロックフォール",
    pin: { x: 50, y: 55 },
    properties: { tenderness: "★★★★☆", fat: "★★★★★", collagen: "☆☆☆☆☆" },
    cooking: "そのまま、ステーキソース（Sauce Roquefort）、サラダのトッピング",
    science: "ラコーヌ種の羊乳から作られ、コンバルー山の自然洞窟内に生息する青カビ（Penicillium roqueforti）によって熟成されます。青カビが生み出すリパーゼが脂肪を脂肪酸に分解し、特有の強い刺激臭とコクを生みます。",
    classification: "Fromage à pâte persillée（青カビタイプ）",
    logic: "AOP Protected / Sheep's milk cheese",
    chef_note: "甘口貴腐ワインのソーテルヌ（Sauternes）と合わせるのが、古典フランス料理における最高の“マリアージュ”（Mariage）です。"
  },
  {
    id: "ing_comte",
    number: "3",
    name_fr: "Comté",
    name_en: "Comté",
    name_ja: "コンテ",
    pin: { x: 65, y: 42 },
    properties: { tenderness: "★★★☆☆", fat: "★★★★☆", collagen: "☆☆☆☆☆" },
    cooking: "そのまま、チーズフォンデュ、シュー生地（Gougère）",
    science: "牛乳を加熱圧搾して水分を抜き、長期間（4ヶ月から36ヶ月以上）熟成させた硬質チーズ。熟成に伴いタンパク質が分解され、アミノ酸結晶（主にチロシン）が生じ、噛むとジャリッとした食感と濃厚な旨味が広がります。",
    classification: "Fromage à pâte pressée cuite（加熱圧搾硬質タイプ）",
    logic: "AOP Protected / Long maturation",
    chef_note: "熟成月数（12ヶ月、24ヶ月など）によりナッツ、栗、ドライフルーツなど劇的に香りが変化します。削ってグラタンの焼き色をつけるのにも最適。"
  },
  {
    id: "ing_chevre",
    number: "4",
    name_fr: "Sainte-Maure de Touraine",
    name_en: "Goat Cheese (Sainte-Maure)",
    name_ja: "サント・モール・ド・トゥーレーヌ（山羊乳チーズ）",
    pin: { x: 42, y: 62 },
    properties: { tenderness: "★★★★☆", fat: "★★★☆☆", collagen: "☆☆☆☆☆" },
    cooking: "そのまま、サラダ・ド・シェーヴル・ショー（温製サラダ）",
    science: "山羊乳（Lait de chèvre）で作られるチーズ。中央に1本の麦わらが通されており、崩れやすい脆い組織を補強するとともに、内部の酸素供給を助けます。表面には木炭粉がまぶされ、酸度を調整し、カビの繁殖を促します。",
    classification: "Fromage de chèvre（山羊乳タイプ）",
    logic: "AOP Protected / Ash-coated",
    chef_note: "バゲットスライスに乗せてオーブンで軽く焼き、ハチミツをかけてサラダに乗せるのが定番ビストロ料理。"
  }
];

export const wineCuts = [
  {
    id: "ing_vin_rouge",
    number: "1",
    name_fr: "Vin rouge",
    name_en: "Red Wine",
    name_ja: "ヴァン・ルージュ（赤ワイン）",
    pin: { x: 45, y: 35 },
    properties: { tenderness: "☆☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "赤ワインソース、デグラサージュ、マリネ液、煮込み（ボルドレーズ、ブルギニョン）",
    science: "ブドウの果皮や種子を一緒に発酵させるため、ポリフェノール化合物（タンニン）が多く溶け込んでいます。タンニンが肉のタンパク質と結合して凝集するため、口の中の脂っぽさを引き締め、肉質を柔らかく感じさせます。",
    classification: "Ingrédient liquide aromatique",
    logic: "Deglazing / Meat tenderizer / Color agent",
    chef_note: "料理に使うワインは「飲むのと同じ品質のもの」を使うこと。酸味と渋みが加熱で凝縮されるため、安物の粗悪なワインは仕上がりを壊します。"
  },
  {
    id: "ing_vin_blanc",
    number: "2",
    name_fr: "Vin blanc",
    name_en: "White Wine",
    name_ja: "ヴァン・ブラン（白ワイン）",
    pin: { x: 55, y: 35 },
    properties: { tenderness: "☆☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "白ワインソース、魚のポシェ（コルトン・ブイヨン）、デグラサージュ",
    science: "ブドウをすぐに搾汁し皮などを除いて発酵させるため、タンニンは少なく、リンゴ酸や酒石酸などの豊かな有機酸が主体です。この酸が魚介の生臭さ成分（アミン）を中和し、すっきりとした爽やかさと旨味を与えます。",
    classification: "Ingrédient liquide aromatique",
    logic: "Deglazing / Acidity balancer",
    chef_note: "エシャロット、キノコをバターで炒めたフライパンを白ワインでデグラセし、煮詰めてクリームを加えるだけで、クラシックな万能ソースが完成します。"
  },
  {
    id: "ing_champagne",
    number: "3",
    name_fr: "Champagne",
    name_en: "Champagne",
    name_ja: "シャンパン",
    pin: { x: 50, y: 25 },
    properties: { tenderness: "☆☆☆☆☆", fat: "☆☆☆☆☆", collagen: "☆☆☆☆☆" },
    cooking: "シャンパンソース、アペリティフ",
    science: "瓶内二次発酵により二酸化炭素（炭酸）を溶け込ませたスパークリングワイン。酵母の自己融解によるアミノ酸（旨味成分）が豊富で、白ワインベースのソースよりもさらに深みと華やかな風味をソースに与えます。",
    classification: "AOC Champagne de prestige",
    logic: "Maturation flavors / Carbonic acidity",
    chef_note: "シャンパンの泡自体はソースを煮詰める過程で消失しますが、アミノ酸の香りとコク、きめ細かな酸味が最高級の魚介ソースに変化します。"
  }
];
