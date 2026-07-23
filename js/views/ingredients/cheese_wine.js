// Interactive Cheese & Wine Data

export const cheeseClassifications = [
  {
    "id": "type_frais",
    "number": "1",
    "name_fr": "Fromage frais",
    "name_en": "Fresh Cheese",
    "name_ja": "フレッシュタイプ（非熟成チーズ）",
    "method": "乳酸菌による酸凝固（レンネットの使用は極少量かゼロ）。凝固したカードからホエイ（乳清）を軽く切り、熟成させずに出荷する。",
    "science": "pHがカゼインの等電点（約4.6）に達することでタンパク質が凝集する。熟成工程がないためタンパク質や脂肪の分解が進んでおらず、高水分で乳酸由来の爽やかな酸味がそのまま残る。",
    "examples": "モッツァレッラ（伊）、リコッタ（伊）、クワルク（独）、パニール（印）、ラブネ（中東）",
    "chef_note": "水分が多く熱に弱いため、ソースに溶かし込むか、そのまま冷製の前菜やデザートに使用するのが基本。鮮度が命。"
  },
  {
    "id": "type_croute_fleurie",
    "number": "2",
    "name_fr": "Pâte molle à croûte fleurie",
    "name_en": "Bloomy Rind",
    "name_ja": "白カビタイプ（軟質・白カビ外皮）",
    "method": "カードを型に入れ自然に脱水し、表面にペニシリウム・カマンベルティ（Penicillium camemberti）を噴霧して数週間熟成させる。",
    "science": "白カビが分泌する「プロテアーゼ（タンパク質分解酵素）」が、外側から中心に向かってカゼインをアミノ酸やペプチドに分解（プロテオリシス）する。同時に表面の乳酸が消費されてpHが中性に近づき、不溶性のリン酸カルシウムが溶け出すため、生地がトロトロに軟化する。",
    "examples": "カマンベール（仏）、ブリー・ド・モー（仏）、カンボゾーラ（独・ハイブリッド）",
    "chef_note": "熟成が進むとアンモニア臭が出始めるため、中心部に少し芯（チョーク状）が残る程度〜全体が滑らかになった瞬間が食べ頃。"
  },
  {
    "id": "type_croute_lavee",
    "number": "3",
    "name_fr": "Pâte molle à croûte lavée",
    "name_en": "Washed Rind",
    "name_ja": "ウォッシュタイプ（軟質・洗皮外皮）",
    "method": "熟成中に表面を塩水や地元の酒（ワイン、ビール、ブランデーなど）で定期的に洗い、リネンス菌を繁殖させる。",
    "science": "塩分と高湿度を好むリネンス菌（Brevibacterium linens）の働きにより、表面に強い赤〜オレンジ色の粘着層が形成され、強力なタンパク質分解酵素を放出する。独特の腐敗臭に似た強烈な香りが生まれるが、中の生地は非常にクリーミーでマイルド。",
    "examples": "エポワス（仏）、マロワール（仏）、タレッジョ（伊）",
    "chef_note": "香りの強烈さに反して味は非常にミルキー。フルボディの赤ワインと抜群の相性を誇る。"
  },
  {
    "id": "type_persillee",
    "number": "4",
    "name_fr": "Pâte persillée",
    "name_en": "Blue Cheese",
    "name_ja": "青カビタイプ（ブルーチーズ）",
    "method": "凝固したカードに青カビ（Penicillium roqueforti）の胞子を混ぜ、金串で穴を開けて内部に酸素を送り込みながら熟成させる。",
    "science": "青カビは生育に酸素を必要とするため、金串の空気孔に沿って内側へ繁殖する。青カビ由来の強力な脂肪分解酵素（リパーゼ）により、トリグリセリドがメチルケトン類などの揮発性有機酸に分解され、独特の刺激的な風味と辛味が生じる。",
    "examples": "ロックフォール（仏）、ゴルゴンゾーラ（伊）、スティルトン（英）",
    "chef_note": "塩分と刺激が強いため、貴腐ワインやポートワイン、ハチミツなどの「甘味」と合わせることで味覚の完璧なバランスが取れる。"
  },
  {
    "id": "type_pressee_cuite",
    "number": "5",
    "name_fr": "Pâte pressée cuite",
    "name_en": "Hard Cheese",
    "name_ja": "加熱圧搾タイプ（硬質）",
    "method": "カードを細かく砕き、50〜55℃ of 高温で加熱しながら撹拌して水分を極限まで抜く。その後、型に入れて強い圧力をかけ、数ヶ月〜数年単位で長期熟成させる。",
    "science": "加熱によりホエイ（乳清）が排出され、耐熱性の乳酸菌（サーモフィルス菌など）のみが生き残る。低水分環境での長期熟成により、カゼインがアミノ酸に完全に分解され「チロシンの結晶（ジャリッとした旨味成分）」が生成される。エメンタール等のガス孔はプロピオン酸発酵によるもの。",
    "examples": "コンテ（仏）、パルミジャーノ・レッジャーノ（伊）、グリュイエール（スイス）",
    "chef_note": "アミノ酸の塊であり、料理のベースとなる最高の調味料。熱を加えると分離せずに綺麗に溶けるためグラタン等に最適。"
  },
  {
    "id": "type_pressee_non_cuite",
    "number": "6",
    "name_fr": "Pâte pressée non cuite",
    "name_en": "Semi-Hard Cheese",
    "name_ja": "非加熱圧搾タイプ（半硬質）",
    "method": "カードを加熱せず（または30℃台の微温）に圧力をかけて水分を抜く。加熱圧搾よりも水分が多く残るため、熟成期間は比較的短い（数週間〜数ヶ月）。",
    "science": "中温性（メソフィル）の乳酸菌が主体となる。水分（とそれに溶け込む乳糖・乳酸）と脂肪分のバランスが良く、タンパク質の網目構造が柔軟なため、熱を加えた際に脂肪が分離しにくく、滑らかなメルティング特性を示す。",
    "examples": "カンタル（仏）、ルブロション（仏）、チェダー（英）、ラクレット（スイス）",
    "chef_note": "日常食として最も消費されるタイプ。サンドイッチに挟んだり、オーブン焼きにして溶かして食べる用途に優れる。"
  },
  {
    "id": "type_filee",
    "number": "7",
    "name_fr": "Pâte filée",
    "name_en": "Stretched Curd",
    "name_ja": "パスタ・フィラータ／伸展タイプ（繊維状チーズ）",
    "method": "酸凝固させたカードに熱湯（80〜90℃）を注ぎ、餅のように練って引っ張りながら繊維状に組織を整える（フィラトゥーラ工程）。",
    "science": "pHが5.2前後まで下がると、カゼインミセルからカルシウムが部分的に抜け出し構造が緩む。そこに熱が加わることで乳脂肪が溶け、機械的に引っ張ることでタンパク質（カゼイン）が同じ方向に平行に並ぶ。これが独特の「裂けるような弾力」と加熱時の「伸び」の科学的根拠。",
    "examples": "モッツァレッラ、カチョカヴァッロ、ブッラータ（伊）、オアハカ（メキシコ）",
    "chef_note": "ピッツァに乗せて焼いた時に見事な糸を引くのは、このタンパク質の平行配列のおかげである。"
  },
  {
    "id": "lait_chevre",
    "number": "8",
    "name_fr": "Fromage de chèvre",
    "name_en": "Goat's Milk",
    "name_ja": "山羊乳チーズ（シェーブル）",
    "method": "山羊乳を使用。主に酸凝固ベースで作られ、表面に木炭粉（灰）をまぶす製法も多い。",
    "science": "山羊乳はカロテンを含まないため真っ白。カプロン酸、カプリル酸、カプリン酸（いずれもヤギ＝Capraが語源）などの「中鎖脂肪酸」を多く含み、これがシェーブル特有の野性的で酸味のある風味をもたらす。脂肪球が小さく、均質化されているため消化に良い。",
    "examples": "サント・モール、クロタン・ド・シャヴィニョル（仏）",
    "chef_note": "春から夏にかけて牧草を食べた山羊の乳で作るものが最も美味しい（旬があるチーズ）。"
  },
  {
    "id": "lait_brebis",
    "number": "9",
    "name_fr": "Fromage de brebis",
    "name_en": "Sheep's Milk",
    "name_ja": "羊乳チーズ",
    "method": "羊乳を使用. 水分を抜いて硬質にするか、青カビを繁殖させるものが多い。",
    "science": "羊乳は牛乳の約2倍のタンパク質と脂肪を含む極めてリッチな組成。固有のラクトン類（環状エステル）が含まれており、これが羊乳特有のナッツのような甘さと深いコクを生む。固形分が多いため、長期熟成に耐える強靭な組織を作ることができる。",
    "examples": "ロックフォール、オッソー・イラティ（仏）、ペコリーノ全般（伊）",
    "chef_note": "牛乳製チーズよりもコクが強いため、料理に力強さや塩気を足したい時のアクセントとして使う。"
  },
  {
    "id": "lait_bufflonne",
    "number": "10",
    "name_fr": "Fromage de bufflonne",
    "name_en": "Buffalo's Milk",
    "name_ja": "水牛乳チーズ",
    "method": "水牛（ブーファラ）の乳を使用。大半がフレッシュなパスタ・フィラータとして加工される。",
    "science": "乳脂肪分が8%前後（牛乳の約2.5倍）と極めて高く、タンパク質も豊富。カロテンを持たないため純白。高温で練るパスタ・フィラータ製法によって強固なタンパク質の膜を作り、その中に大量の脂肪とホエイを閉じ込めることで、噛むとジュワッとミルクが溢れる構造になる。",
    "examples": "モッツァレッラ・ディ・ブーファラ・カンパーナ（伊）",
    "chef_note": "極上の濃厚な生クリームのような風味。加熱するよりも、常温でオリーブオイルと合わせて食べるのが一番。"
  },
  {
    "id": "prod_fermier",
    "number": "11",
    "name_fr": "Fromage fermier",
    "name_en": "Farmhouse Cheese",
    "name_ja": "農家製チーズ",
    "method": "酪農家が自ら喜び搾乳した乳（主に無殺菌の生乳）を使用し、自らの農場内の工房で手作りするチーズ。",
    "science": "パスチャライズ（加熱殺菌）を行わないため、その土地の牧草や風土に由来する固有 of 土着菌叢（マイクロフローラ / Terroir）が乳にそのまま残る。熟成過程で多種多様な酵素が複雑に絡み合い、工業製では再現不可能な奥深いアロマと複雑な風味のレイヤーを生み出すが、季節やロットによるブレも大きい。",
    "examples": "AOP/DOP認定の厳格な伝統チーズ、ファームハウス・チェダー（英）",
    "chef_note": "「生きているチーズ」。保存状態によって味が劇的に変化するため、チーズ熟成士（アフィヌール）の腕が問われる。"
  },
  {
    "id": "prod_industriel",
    "number": "12",
    "name_fr": "Fromage industriel",
    "name_en": "Industrial Cheese",
    "name_ja": "工業製チーズ（工場製）",
    "method": "複数の酪農家から集乳した大量の乳を加熱殺菌し、工場で機械的に大量生産するチーズ。",
    "science": "加熱殺菌（63℃30分や72℃15秒など）により天然の微生物を一度リセットし、特定の商業用スターター（乳酸菌培養液）を添加して発酵をコントロールする。特定のカビや酵素だけを働かせるため、年間を通して品質・味・安全性が完全に均一に保たれるが、香気成分の複雑さは農家製に劣る。",
    "examples": "La Vache qui rit（仏）、クラフト社のチーズ、一般的なプロセスチーズ",
    "chef_note": "品質が極めて安定しており溶けやすさなども計算されているため、ハンバーガーやスープなどのレシピの標準化に不可欠。"
  }
];

export const cheeseCutsWorld = [
  {
    "id": "ing_gruyere",
    "number": "1",
    "name_local": "Gruyère",
    "name_en": "Gruyère",
    "name_ja": "グリュイエール",
    "region": "Switzerland",
    "pin": {
      "x": 50,
      "y": 50
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "チーズフォンデュ、クロックムッシュ、グラナタ（オニオンスープ）、グラタン",
    "science": "スイスを代表する加熱圧搾硬質チーズ。熟成によりタンパク質が高度に分解され、非常にマイルドでナッツのような豊かな香りと甘みが生まれる。融点が低く、加熱すると綺麗に均一に溶ける性質（メルティング特性）を持つ。",
    "classification": "Pâte pressée cuite（加熱圧搾硬質タイプ）",
    "logic": "AOC Protected / Excellent melting properties",
    "chef_note": "グラタンやラクレット、フォンデュなど温かいチーズ料理には欠かせないベース。味に上品な深みを与える。"
  },
  {
    "id": "ing_cheddar",
    "number": "2",
    "name_local": "Cheddar",
    "name_en": "Cheddar",
    "name_ja": "チェダー",
    "region": "United Kingdom",
    "pin": {
      "x": 45,
      "y": 45
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "バーガー、マカロニアンドチーズ、サンドイッチ、そのまま",
    "science": "「チェダリング」と呼ばれる、カードを積み重ねて酸度（乳酸）を上げ、水分を押し出す特殊な工程を踏む。これにより引き締まった崩れやすい組織になり、長期間熟成することでシャープで非常に濃厚な旨味が生じる。",
    "classification": "Pâte pressée non cuite（非加熱圧搾半硬質）",
    "logic": "Traditional Cheddaring process",
    "chef_note": "世界で最も生産されているチーズ。熟成が若いものはマイルドで溶けやすく、熟成物（ヴィンテージ）は濃厚でおつまみに最高。"
  },
  {
    "id": "ing_stilton",
    "number": "3",
    "name_local": "Stilton",
    "name_en": "Blue Stilton",
    "name_ja": "スティルトン",
    "region": "United Kingdom",
    "pin": {
      "x": 48,
      "y": 42
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、ステーキソース、サラダ（ブルーチーズドレッシング）、ポートワインと共に",
    "science": "イギリスを代表する青カビチーズ。水分を多めに残した組織の隙間に青カビが入り込み、脂肪分解を進めることで、ナッツのような濃厚な甘みと、青カビ特有の金属的でスパイシーな風味のコントラストが生まれる。",
    "classification": "Pâte persillée（青カビタイプ）",
    "logic": "PDO Protected / English blue classic",
    "chef_note": "世界三大ブルーチーズの一つ。ポートワイン（ポルトガルの甘口赤ワイン）との組み合わせは英国紳士の伝統的な夜のデザート。"
  },
  {
    "id": "ing_gouda",
    "number": "4",
    "name_local": "Gouda",
    "name_en": "Gouda",
    "name_ja": "ゴーダ",
    "region": "Netherlands",
    "pin": {
      "x": 52,
      "y": 40
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "スライスしてサンドイッチ、溶かしてグリル料理に、オムレツ",
    "science": "カードを温水で「洗う」ことで余分な乳糖（ラクトース）を洗い流し、乳酸発酵による酸度の上昇を穏やかに抑える（マイルドな甘口になる理由）。熟成が進むとアミノ酸の結晶が表れ、コク深くなる。",
    "classification": "Pâte pressée non cuite（非加熱圧搾半硬質）",
    "logic": "Curd washing to lower acidity",
    "chef_note": "マイルドで日本人の口に最も合うとされる。若いものはモチモチしてスライスしやすく、熟成物はからすみのような深いコクが出る。"
  },
  {
    "id": "ing_edam",
    "number": "5",
    "name_local": "Edam",
    "name_en": "Edam",
    "name_ja": "エダム",
    "region": "Netherlands",
    "pin": {
      "x": 51,
      "y": 38
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "粉末にして粉チーズとしてパスタやグラタンに、そのままオードブル",
    "science": "脱脂乳の一部を使用して作られる逆さのワックスコート（輸出用）が特徴のチーズ。脂肪分が低いため組織は引き締まって硬めで、マイルドで穏やかな酸味と塩味を持つ。水分が少なく保存性に優れる。",
    "classification": "Pâte pressée non cuite（非加熱圧搾硬質・低脂肪）",
    "logic": "Partially skimmed milk",
    "chef_note": "日本では「赤玉」として知られる。脂肪が少ないためあっさりしており、すりおろしてオーブンで焼くと非常に香ばしくなる。"
  },
  {
    "id": "ing_feta",
    "number": "6",
    "name_local": "Feta",
    "name_en": "Feta",
    "name_ja": "フェタ",
    "region": "Greece",
    "pin": {
      "x": 65,
      "y": 60
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ギリシャ風サラダ（ホリアティキ）、グリル、オムレツ",
    "science": "羊乳（および少量の山羊乳）で作られる、塩水（ブライン）に漬けて熟成・保存されるホワイトチーズ。塩水に漬けることで細菌の繁殖を防ぎ、長期の常温保存に耐えるが、同時に非常に強い塩気と爽やかな酸味を呈する。",
    "classification": "Fromage en saumure（塩水漬けフレッシュ）",
    "logic": "PDO Protected / Brined preservation",
    "chef_note": "塩気が強いため、水やミルクで少し塩抜きをしてからサラダに使うと、羊乳の優しい甘みとさっぱりした酸味が際立つ。"
  },
  {
    "id": "ing_manchego",
    "number": "7",
    "name_local": "Manchego",
    "name_en": "Manchego",
    "name_ja": "マンチェゴ",
    "region": "Spain",
    "pin": {
      "x": 38,
      "y": 68
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま薄切りにしてオリーブオイルやメンブリージョ（かりんジャム）と共に",
    "science": "ラ・マンチャ地方のマンチェガ種羊の生乳を使用。草の跡を模した網目模様の外皮を持つ。羊乳のリッチな脂肪分が長期熟成により独特のナッツやバターの香りと、ピリッとした複雑な後味をもたらす。",
    "classification": "Formaggio di pecora stagionato（硬質羊乳タイプ）",
    "logic": "DOP Protected / Manchega sheep milk",
    "chef_note": "スペインで最も有名なチーズ。スペイン産の生ハムやドライイチジク、そして地元の辛口シェリー酒や赤ワインと抜群の相性。"
  },
  {
    "id": "ing_cabrales",
    "number": "8",
    "name_local": "Cabrales",
    "name_en": "Cabrales",
    "name_ja": "カブラレス",
    "region": "Spain",
    "pin": {
      "x": 36,
      "y": 65
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★★★",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま（少しずつ）、ステーキのソース、シドラ（リンゴ酒）と共に",
    "science": "アストゥリアス地方の自然の石灰岩洞窟（高湿度で低温）で熟成される青カビチーズ。牛乳、羊乳、山羊乳をブレンドして作られ、外からカビを植え付けるのではなく、洞窟内に浮遊する天然の青カビが自然に繁殖するため、強烈に野生的な風味を持つ。",
    "classification": "Pâte persillée naturelle（天然青カビ混乳タイプ）",
    "logic": "DOP Protected / Cave aged natural blue",
    "chef_note": "世界で最も強烈とされるブルーチーズの一つ。刺激が非常に強いが、地元の酸味の強いリンゴ酒（シドラ）と合わせると不思議に調和する。"
  },
  {
    "id": "ing_oaxaca",
    "number": "9",
    "name_local": "Queso Oaxaca",
    "name_en": "Oaxaca Cheese",
    "name_ja": "オアハカ",
    "region": "Mexico",
    "pin": {
      "x": 20,
      "y": 80
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ケサディーヤ、タコス、そのまま（裂いて）",
    "science": "イタリアのパスタ・フィラータ（モッツァレッラなど）と同様の製法を、スペインの宣教師がメキシコに伝えて発展したもの。熱湯で練り伸ばしたカードをリボンのように長く引き伸ばし、それを球状に巻き上げて成形する。加熱すると非常に良く伸びる。",
    "classification": "Pâte filée（パスタ・フィラータタイプ）",
    "logic": "Stretched curd ribbon",
    "chef_note": "「メキシコのさけるチーズ」。繊維に沿って細かく裂き、トルティーヤに挟んで溶かして食べる「ケサディーヤ」はメキシコの国民食。"
  },
  {
    "id": "ing_monterey_jack",
    "number": "10",
    "name_local": "Monterey Jack",
    "name_en": "Monterey Jack",
    "name_ja": "モントレー・ジャック",
    "region": "United States",
    "pin": {
      "x": 22,
      "y": 75
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "サンドイッチ、バーガー、タコス、チリソース料理に溶かす",
    "science": "カリフォルニア州モントレーの修道院で作られ始めたアメリカ発祥のセミソフトチーズ。マイルドで酸味が少なく、非常に融点が低いため加熱すると脂肪が分離せずに滑らかに溶ける優れた特性を持つ。",
    "classification": "Semi-hard cheese（アメリカン・セミソフト）",
    "logic": "High moisture / Mild acidity / Great meltability",
    "chef_note": "クセがなく誰にでも愛される味。チェダーやコルビーチーズとブレンドして、メキシコ料理（テクス・メクス）によく溶かして使われる。"
  },
  {
    "id": "ing_parmigiano_reggiano",
    "number": "11",
    "name_it": "Parmigiano Reggiano",
    "name_en": "Parmigiano Reggiano",
    "name_ja": "パルミジャーノ・レッジャーノ",
    "region": "Italy (Emilia-Romagna)",
    "pin": {
      "x": 48,
      "y": 35
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "すりおろしてパスタやリゾットに、そのままおつまみとして",
    "science": "最低12ヶ月、長ければ36ヶ月以上熟成。水分が抜ける過程でカゼインが分解され、旨味成分のアミノ酸であるチロシンが結晶化し、ジャリジャリとした食感と深いコクを生む。",
    "classification": "Formaggio a pasta dura（硬質タイプ）",
    "logic": "DOP Protected / Long aged",
    "chef_note": "「イタリアチーズの王様」。すりおろすだけでなく、皮の部分（クロスタ）もスープに入れて煮込むと良い出汁が出る。"
  },
  {
    "id": "ing_gorgonzola",
    "number": "12",
    "name_it": "Gorgonzola",
    "name_en": "Gorgonzola",
    "name_ja": "ゴルゴンゾーラ",
    "region": "Italy (Lombardia / Piemonte)",
    "pin": {
      "x": 40,
      "y": 30
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "パスタソース（ペンネ・ゴルゴンゾーラ）、サラダのトッピング、ハチミツ添え",
    "science": "青カビ（Penicillium roqueforti）を繁殖させたチーズ。脂肪分解酵素の働きにより、特有のシャープな辛味と刺激臭が生まれ、クリーミーな生地と合わさる。マイルドなドルチェと辛口のピカンテがある。",
    "classification": "Formaggio a pasta erborinata（青カビタイプ）",
    "logic": "DOP Protected / Blue cheese",
    "chef_note": "塩気とコクが強いため、貴腐ワインやポートワインなどの極甘口ワイン、あるいはハチミツ、洋梨と合わせると完璧な調和を見せる。"
  },
  {
    "id": "ing_taleggio",
    "number": "13",
    "name_it": "Taleggio",
    "name_en": "Taleggio",
    "name_ja": "タレッジョ",
    "region": "Italy (Lombardia)",
    "pin": {
      "x": 42,
      "y": 28
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、リゾットやパスタに溶かす、ブルスケッタ",
    "science": "塩水で表面を洗いながら熟成させるウォッシュタイプ。リネンス菌の作用により外皮はオレンジ色で強い香気を放つが、内部はモチモチとしてミルクの甘みが強く非常に食べやすい。",
    "classification": "Formaggio a crosta lavata（ウォッシュタイプ）",
    "logic": "DOP Protected / Washed rind",
    "chef_note": "表皮の匂いは強いが、中は非常にマイルドでクリーミー。加熱すると非常によく溶けるため料理のコク出しに重宝する。"
  },
  {
    "id": "ing_quartirolo_lombardo",
    "number": "14",
    "name_it": "Quartirolo Lombardo",
    "name_en": "Quartirolo Lombardo",
    "name_ja": "クアルティローロ・ロンバルド",
    "region": "Italy (Lombardia)",
    "pin": {
      "x": 41,
      "y": 29
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "サラダ、パスタの仕上げ、そのままトマトとオリーブオイルで",
    "science": "秋の最後の若草（Quartirola）を食べた牛の乳で作る。短期間熟成のものは酸味がありホロホロとした食感で爽やか。熟成が進むとしなやかでコクが強くなる。",
    "classification": "Formaggio a pasta molle（半硬質〜軟質）",
    "logic": "DOP Protected / Autumn milk",
    "chef_note": "フェタチーズに少し似たさっぱりとした酸味がある。夏場に冷たいトマトやサラダと合わせるのが現地風。"
  },
  {
    "id": "ing_bitto",
    "number": "15",
    "name_it": "Bitto",
    "name_en": "Bitto",
    "name_ja": "ビット",
    "region": "Italy (Lombardia)",
    "pin": {
      "x": 43,
      "y": 25
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、そば粉のパスタ（ピッツォッケリ）に溶かす",
    "science": "夏のアルプス高地で搾乳された新鮮な牛乳に、少量の山羊乳（10%以下）を混入して作られる。山羊乳由来の中鎖脂肪酸が加わることで、長期熟成（最長10年）に耐える複雑でスパイシーな風味が生じる。",
    "classification": "Formaggio a pasta dura（硬質タイプ）",
    "logic": "DOP Protected / Alpine pasture summer milk",
    "chef_note": "ロンバルディア州のそば粉のパスタ「ピッツォッケリ」にキャベツやじゃがいもと合わせて溶かすのが伝統的な郷土料理。"
  },
  {
    "id": "ing_castelmagno",
    "number": "16",
    "name_it": "Castelmagno",
    "name_en": "Castelmagno",
    "name_ja": "カステルマーニョ",
    "region": "Italy (Piemonte)",
    "pin": {
      "x": 30,
      "y": 30
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "リゾット、パスタソース、ハチミツをかけてそのまま",
    "science": "凝固させたカードを細かく砕き、塩を混ぜてプレスする特殊製法。内部に自然な青カビ（エルボリナトゥーラ）が発生し、非常にホロホロとした崩れやすい組織と、ピリッとした複雑な旨味が生まれる。",
    "classification": "Formaggio a pasta erborinata o friabile（青カビ・崩壊性タイプ）",
    "logic": "DOP Protected / Double pressed card",
    "chef_note": "非常に希少な高級チーズ。ピエモンテのジャガイモのニョッキに、このチーズを溶かした濃厚なソースを合わせるのが定番。"
  },
  {
    "id": "ing_bra",
    "number": "17",
    "name_it": "Bra",
    "name_en": "Bra",
    "name_ja": "ブラ",
    "region": "Italy (Piemonte)",
    "pin": {
      "x": 32,
      "y": 32
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、サラダ、削ってパスタに",
    "science": "全乳で作るソフトタイプ（Tenero）と、脱脂乳を混ぜて長期熟成させるハードタイプ（Duro）がある。ハードタイプは引き占められた組織で、塩気とナッツのような香ばしさが凝縮されている。",
    "classification": "Formaggio a pasta semidura o dura（半硬質〜硬質）",
    "logic": "DOP Protected / Soft or Hard styles",
    "chef_note": "ピエモンテ州ブラの町の名を冠する。地元のバルベーラやネッビオーロといった赤ワインと非常によく合う。"
  },
  {
    "id": "ing_raschera",
    "number": "18",
    "name_it": "Raschera",
    "name_en": "Raschera",
    "name_ja": "ラスケーラ",
    "region": "Italy (Piemonte)",
    "pin": {
      "x": 31,
      "y": 34
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、溶かして野菜のソースに、郷土パスタ（フィオリーニ）",
    "science": "正方形の平たい形が特徴（山岳地帯での馬の背に乗せて運ぶための伝統的な形状）。しなやかで細かい気泡があり、山の牧草由来のハーブや土のニュアンスを含んだマイルドな旨味を持つ。",
    "classification": "Formaggio a pasta semidura（半硬質タイプ）",
    "logic": "DOP Protected / Square shaped",
    "chef_note": "丸型と角型があるが、角型（Quadrata）が運搬の歴史を象徴する伝統の形。マイルドな塩味で非常にとろけやすい。"
  },
  {
    "id": "ing_toma_piemontese",
    "number": "19",
    "name_it": "Toma Piemontese",
    "name_en": "Toma Piemontese",
    "name_ja": "トーマ・ピエモンテーゼ",
    "region": "Italy (Piemonte)",
    "pin": {
      "x": 33,
      "y": 28
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、フォンデュータ（チーズフォンデュ）、ポレンタに溶かす",
    "science": "ピエモンテのアルプス全域で作られる伝統のチーズ。乳酸発酵による程よい酸味とバターのようなコクがあり、熟成が進むとヘーゼルナッツのようなアロマが引き立つ。",
    "classification": "Formaggio a pasta semidura（半硬質タイプ）",
    "logic": "DOP Protected / Alpine pasture milk",
    "chef_note": "非常に素朴で親しみやすい味わい。ピエモンテ風のチーズフォンデュ「フォンデュータ」のベースとしてよく溶かして使う。"
  },
  {
    "id": "ing_robiola",
    "number": "20",
    "name_it": "Robiola di Roccaverano",
    "name_en": "Robiola",
    "name_ja": "ロビオラ・ディ・ロッカヴェラーノ",
    "region": "Italy (Piemonte)",
    "pin": {
      "x": 35,
      "y": 32
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、パンに塗る、ジャムやハチミツ添え",
    "science": "山羊乳（または牛乳や羊乳との混乳）で作られるフレッシュ〜超短期熟成のソフトチーズ。爽やかなレモンのような酸味と豊かなコクがあり、外皮はなく非常に滑らかでスプレッド状の質感を示す。",
    "classification": "Formaggio a pasta molle / fresco（フレッシュ〜軟質タイプ）",
    "logic": "DOP Protected / Goat milk blend",
    "chef_note": "フレッシュ（Fresco）は真っ白でジューシー。数週間熟成させたもの（Affinato）は表面に薄いカビがのり、濃厚なコクと野性味が加わる。"
  },
  {
    "id": "ing_grana_padano",
    "number": "21",
    "name_it": "Grana Padano",
    "name_en": "Grana Padano",
    "name_ja": "グラナ・パダーノ",
    "region": "Italy (Lombardia / Veneto / Emilia-Romagna)",
    "pin": {
      "x": 46,
      "y": 28
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "すりおろしてパスタやスープに、グリル料理、サラダのスライス",
    "science": "パルミジャーノと製法はほぼ同じだが、生産地域が広く、脱脂乳の割合がやや高いため、少しマイルドでバターのような風味が特徴。熟成期間も比較的短い（9〜20ヶ月以上）。",
    "classification": "Formaggio a pasta dura（硬質タイプ）",
    "logic": "DOP Protected / Grana style",
    "chef_note": "「キッチンのハチミツ（調味料）」。パルミジャーノより塩気が控えめで優しいため、デイリーユースのパスタやリゾットに最適。"
  },
  {
    "id": "ing_squacquerone",
    "number": "22",
    "name_it": "Squacquerone di Romagna",
    "name_en": "Squacquerone",
    "name_ja": "スクアックェローネ",
    "region": "Italy (Emilia-Romagna)",
    "pin": {
      "x": 48,
      "y": 38
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ピアディーナに挟む、そのまま生ハムと合わせて",
    "science": "超高温殺菌と素早い凝固により水分を極限まで残したフレッシュチーズ。熟成させないため、乳糖や乳酸の甘酸っぱいミルク感がストレートに味わえる。",
    "classification": "Formaggio fresco（フレッシュタイプ）",
    "logic": "DOP Protected / Spreadable",
    "chef_note": "ロマーニャ地方の薄焼きパン「ピアディーナ」にルッコラや生ハムと一緒に挟むのが絶対的なルール。"
  },
  {
    "id": "ing_formaggio_di_fossa",
    "number": "23",
    "name_it": "Formaggio di Fossa di Sogliano",
    "name_en": "Formaggio di Fossa",
    "name_ja": "フォルマッジョ・ディ・フォッサ",
    "region": "Italy (Emilia-Romagna / Marche)",
    "pin": {
      "x": 50,
      "y": 40
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "すりおろしてパスタに、ハチミツ添え",
    "science": "凝灰岩の洞窟（Fossa: 穴）の底に藁を敷き詰め、チーズを袋に入れて3ヶ月間密封熟成させる。無酸素状態での嫌気性発酵により、カゼインや脂質が分解されて独特の強烈なアロマと濃厚な旨味が形成される。",
    "classification": "Formaggio a pasta dura（硬質タイプ）",
    "logic": "DOP Protected / Cave aged",
    "chef_note": "強烈な香りとピリッとした辛味があるため、ハチミツをかけてそのまま食べるか、パスタやリゾットの仕上げにすりおろして使う。"
  },
  {
    "id": "ing_asiago",
    "number": "24",
    "name_it": "Asiago",
    "name_en": "Asiago",
    "name_ja": "アジアーゴ",
    "region": "Italy (Veneto / Trentino-Alto Adige)",
    "pin": {
      "x": 58,
      "y": 22
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、サンドイッチ、パスタ, リゾット",
    "science": "フレッシュな「プレス・アジアーゴ（Pressato）」と、長期間熟成させて硬質になった「アジアーゴ・ダレーヴォ（d'Allevo）」がある。熟成によって組織内の水分が抜け、アミノ酸の旨味成分が凝縮される。",
    "classification": "Formaggio a pasta semidura o dura（半硬質〜硬質タイプ）",
    "logic": "DOP Protected / Two distinct styles",
    "chef_note": "若ければしっとりしてサンドイッチに最適。熟成物はパルミジャーノのようにすりおろして使う。"
  },
  {
    "id": "ing_montasio",
    "number": "25",
    "name_it": "Montasio",
    "name_en": "Montasio",
    "name_ja": "モンタジオ",
    "region": "Italy (Friuli-Venezia Giulia / Veneto)",
    "pin": {
      "x": 65,
      "y": 20
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "フリコ（おやき）、そのまま",
    "science": "アルプスの高地でつくられてきた伝統の硬質チーズ。若いうちはマイルドで乳酸の甘みがあるが、18ヶ月以上の熟成で非常にアロマが強くスパイシーになる。フリコでは溶かして焼き、香ばしいカリカリの衣をつくる。",
    "classification": "Formaggio a pasta dura（硬質タイプ）",
    "logic": "DOP Protected / Frico ingredient",
    "chef_note": "フリコ（おやき）には欠かせない。じゃがいもと一緒に焼き上げるのが絶品。"
  },
  {
    "id": "ing_piave",
    "number": "26",
    "name_it": "Piave",
    "name_en": "Piave",
    "name_ja": "ピアーヴェ",
    "region": "Italy (Veneto)",
    "pin": {
      "x": 60,
      "y": 18
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、すりおろし、リゾット",
    "science": "ピアーヴェ川流域の牛乳を使用し、温度と湿度を厳しく管理したセラーで熟成される。若いうちは甘みがあるが、長期間熟成（ゴールド/リゼルヴァ）するとアミノ酸が結晶化し、トロピカルフルーツのような華やかな香りと凝縮したコクが生まれる。",
    "classification": "Formaggio a pasta cotta e dura（硬質・加熱圧搾タイプ）",
    "logic": "DOP Protected / Alpine pasture milk",
    "chef_note": "熟成が進んだものは非常に上品でコクがある。フルボディの赤ワインや、バルサミコ酢を数滴垂らしてそのまま楽しむ。"
  },
  {
    "id": "ing_provolone_valpadana",
    "number": "27",
    "name_it": "Provolone Valpadana",
    "name_en": "Provolone Valpadana",
    "name_ja": "プロヴォローネ・ヴァルパダーナ",
    "region": "Italy (Lombardia / Veneto / Emilia-Romagna)",
    "pin": {
      "x": 52,
      "y": 28
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "グリル、そのまま、パニーノ",
    "science": "パスタ・フィラータ（伸展）製法で作られる大型チーズ。甘口（ドルチェ）は子牛のレンネットを使用しマイルド。辛口（ピカンテ）は山羊や羊のレンネットに含まれるリパーゼ（脂肪分解酵素）の働きにより、遊離脂肪酸が生成され、独特の刺激的なピリッとした辛味が生まれる。",
    "classification": "Formaggio a pasta filata stagionata（熟成パスタ・フィラータタイプ）",
    "logic": "DOP Protected / Lipase lipolysis for piccante",
    "chef_note": "ピカンテは赤ワインと、ドルチェはスライスしてグリルで焼いてトロトロにして食べるのが一番。"
  },
  {
    "id": "ing_monte_veronese",
    "number": "28",
    "name_it": "Monte Veronese",
    "name_en": "Monte Veronese",
    "name_ja": "モンテ・ヴェロネーゼ",
    "region": "Italy (Veneto)",
    "pin": {
      "x": 55,
      "y": 24
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、パスタ、ポレンタ添え",
    "science": "レスシーニ山脈の放牧牛の乳から作られる。全乳で作るフレッシュ（D'Allevo）と、脱脂乳で作る硬質（D'Allevo Mezzano/Vecchio）があり、脱脂乳製は水分と脂肪分が少なくなるため、非常に引き締まった組織で旨味がシャープに立ち上がる。",
    "classification": "Formaggio a pasta semidura o dura（半硬質〜硬質タイプ）",
    "logic": "DOP Protected / Skimmed vs Whole milk",
    "chef_note": "ポレンタ（コーンミールの練り物）の上に乗せて溶かして食べると、山の素朴で豊かな風味が引き立つ。"
  },
  {
    "id": "ing_trentingrana",
    "number": "29",
    "name_it": "Trentingrana",
    "name_en": "Trentingrana",
    "name_ja": "トレンティグラーナ",
    "region": "Italy (Trentino-Alto Adige)",
    "pin": {
      "x": 58,
      "y": 20
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "すりおろし、そのまま",
    "science": "グラナ・パダーノの一種だが、トレンティーノの山岳地帯で作られ、リゾチーム（保存料・酵素）の添加が禁止されている。牧草由来のカロテンにより、より豊かな風味と黄色味を持つ。",
    "classification": "Formaggio a pasta dura（硬質タイプ）",
    "logic": "DOP Sub-zone / No Lysozyme",
    "chef_note": "山のパルミジャーノとも言える自然派の硬質チーズ。香りが良く高品質。"
  },
  {
    "id": "ing_stelvio",
    "number": "30",
    "name_it": "Stelvio (Stilfser)",
    "name_en": "Stelvio",
    "name_ja": "ステルヴィオ（シュティルフサー）",
    "region": "Italy (Trentino-Alto Adige)",
    "pin": {
      "x": 47,
      "y": 19
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "溶かして黒パンに乗せる、スペック（燻製生ハム）と共に",
    "science": "オーストリア文化圏（南チロル）の影響を受けたウォッシュチーズ。地元の特有の細菌叢（ミクロフローラ）を含む塩水で洗われ、ナッツのような風味としなやかな弾力を得る。",
    "classification": "Formaggio a crosta lavata（ウォッシュ・半硬質タイプ）",
    "logic": "DOP Protected / Alpine wash",
    "chef_note": "地元南チロルの赤ワイン（ラグレイン）や、スモーク生ハム「スペック」とのマリアージュが格別。"
  },
  {
    "id": "ing_fontina",
    "number": "31",
    "name_it": "Fontina",
    "name_en": "Fontina",
    "name_ja": "フォンティーナ",
    "region": "Italy (Valle d'Aosta)",
    "pin": {
      "x": 30,
      "y": 20
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "フォンデュータ（イタリア風チーズフォンデュ）、スープ、そのまま",
    "science": "アルプス最高峰近くで飼育されるヴァルドスタ牛の生乳を使用。銅製の大釜で温められ、プレスして熟成。非常に融点が低く滑らかに溶け、ナッツや山のキノコに似た大地の香気を放つ。",
    "classification": "Formaggio a pasta semidura（加熱・半硬質タイプ）",
    "logic": "DOP Protected / Low melting point",
    "chef_note": "イタリア風フォンデュ「フォンデュータ」の主役。加熱すると極上のクリーミーさと滑らかさを示す。"
  },
  {
    "id": "ing_fromadzo",
    "number": "32",
    "name_it": "Valle d'Aosta Fromadzo",
    "name_en": "Fromadzo",
    "name_ja": "フラマッツォ",
    "region": "Italy (Valle d'Aosta)",
    "pin": {
      "x": 28,
      "y": 22
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、スープ、ポレンタ添え",
    "science": "牛乳に少量の山羊乳を混ぜることが認められている、脱脂乳ベースのチーズ。低脂肪のため引き締まった組織をもち、熟成（最高数年）により野生のハーブや干し草の香りが濃縮される。",
    "classification": "Formaggio a pasta semidura o dura（半硬質〜硬質）",
    "logic": "DOP Protected / Low fat milk",
    "chef_note": "ヴァッレ・ダオスタ州の極めて古い伝統チーズ。熟成したものは非常にスパイシーで独特のコクがある。"
  },
  {
    "id": "ing_prescinseua",
    "number": "33",
    "name_it": "Prescinseua",
    "name_en": "Prescinseua",
    "name_ja": "プレシンセーア",
    "region": "Italy (Liguria)",
    "pin": {
      "x": 34,
      "y": 33
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★☆☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "ジェノバ風タルト（トルタ・パスクアリーナ）、フォカッチャ・ディ・レコ",
    "science": "レンネットを加えた後に少し酸味を発酵させる、ヨーグルトとリコッタの中間のような酸乳フレッシュチーズ。乳清（ホエイ）の水分が多く残り、爽やかな酸味をもたらす。",
    "classification": "Formaggio fresco / cagliata acidula（酸乳フレッシュタイプ）",
    "logic": "Traditional / Genoese pastry base",
    "chef_note": "ジェノバ名物のハーブと卵のタルト「トルタ・パスクアリーナ」のフィリングには絶対に欠かせない地元の味。"
  },
  {
    "id": "ing_san_ste",
    "number": "34",
    "name_it": "San Stè",
    "name_en": "San Stè",
    "name_ja": "サン・ステ",
    "region": "Italy (Liguria)",
    "pin": {
      "x": 36,
      "y": 32
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、グリル、パスタ",
    "science": "リグーリア州の内陸山岳地帯で作られる牛乳チーズ。適度な弾力と気泡があり、塩水で洗われながら短期間熟成されることで、マイルドでありながら引き締まったコクを持つ。",
    "classification": "Formaggio a pasta semidura（半硬質タイプ）",
    "logic": "Traditional / Ligurian mountain cheese",
    "chef_note": "スライスしてフライパンや鉄板でサッと焼いて食べる（アッロスティート）と、ミルクの香ばしさが際立ち非常に美味しい。"
  },
  {
    "id": "ing_pecorino_toscano",
    "number": "35",
    "name_it": "Pecorino Toscano",
    "name_en": "Pecorino Toscano",
    "name_ja": "ペコリーノ・トスカーノ",
    "region": "Italy (Toscana)",
    "pin": {
      "x": 48,
      "y": 45
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、そら豆（バッチェッリ）と共に、すりおろし",
    "science": "トスカーナ州の羊乳製チーズ。ローマのものよりマイルドで、羊乳の甘みとコクが際立つ。短期熟成（テネロ）は白くしなやか、長期熟成（スタジョナート）は黄色みを帯びてナッツ香とスパイシーさが出る。",
    "classification": "Formaggio di pecora（羊乳タイプ）",
    "logic": "DOP Protected / Mild sheep milk",
    "chef_note": "春のトスカーナの定番「そら豆（生のまま）とペコリーノ・トスカーノ、オリーブオイル」の組み合わせは、最高にシンプルなご馳走。"
  },
  {
    "id": "ing_marzolino",
    "number": "36",
    "name_it": "Marzolino di Lucardo",
    "name_en": "Marzolino",
    "name_ja": "マルゾリーノ",
    "region": "Italy (Toscana)",
    "pin": {
      "x": 46,
      "y": 46
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、ハチミツやジャムと共に",
    "science": "3月（Marzo）の最高の若草を食べた羊の乳で作られる楕円形の伝統的なチーズ。カードを布で包んでプレスするため独特の形状になる。非常にしっとりして羊乳のピュアな甘みがある。",
    "classification": "Formaggio di pecora fresco o stagionato（羊乳ソフトタイプ）",
    "logic": "Traditional / March spring milk",
    "chef_note": "ルネサンス期から愛される歴史的チーズ。春のわずかな期間しか作られない貴重な風味が特徴。"
  },
  {
    "id": "ing_pecorino_umbro",
    "number": "37",
    "name_it": "Pecorino Umbro",
    "name_en": "Pecorino Umbro",
    "name_ja": "ペコリーノ・ウンブロ",
    "region": "Italy (Umbria)",
    "pin": {
      "x": 52,
      "y": 48
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、トリュフソースと合わせて、スライス",
    "science": "ウンブリア州の丘陵地帯で放牧された羊の乳から作られる。地元の特産である黒トリュフを生地に練り込んだもの（Pecorino al Tartufo）も多く作られ、羊乳のコクとトリュフのアロマが相乗効果を生む。",
    "classification": "Formaggio di pecora（羊乳タイプ）",
    "logic": "Traditional / Truffle-infused variants",
    "chef_note": "地元の赤ワイン（サグランティーノ・ディ・モンテファルコ）のような力強くタンニンの豊富なワインと完璧な相性。"
  },
  {
    "id": "ing_raviggiolo",
    "number": "38",
    "name_it": "Raviggiolo",
    "name_en": "Raviggiolo",
    "name_ja": "ラヴィッジオーロ",
    "region": "Italy (Toscana / Emilia-Romagna)",
    "pin": {
      "x": 50,
      "y": 43
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのままスプーンで、ニョッキやラビオリのフィリング",
    "science": "シダの葉（またはイチジクの葉）の上に乗せて作られる、熟成を一切行わない超フレッシュな牛乳または羊乳のチーズ。極めて水分が多く、デリケートな甘みとほのかなハーブの香りが特徴。",
    "classification": "Formaggio fresco（フレッシュタイプ）",
    "logic": "Traditional / Fern leaf drain",
    "chef_note": "非常に傷みやすいため生産地以外で出会うことは極めて難しい。イタリアの最初期のガストロノミー本にも記載されている古典的チーズ。"
  },
  {
    "id": "ing_pecorino_romano",
    "number": "39",
    "name_it": "Pecorino Romano",
    "name_en": "Pecorino Romano",
    "name_ja": "ペコリーノ・ロマーノ",
    "region": "Italy (Lazio / Sardegna)",
    "pin": {
      "x": 53,
      "y": 55
    },
    "properties": {
      "tenderness": "★☆☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "カルボナーラ、カチョ・エ・ペペ、アマトリチャーナ、すりおろし",
    "science": "羊の生乳を使用し、熟成過程で大量の塩を擦り込む塩干（サロトゥーラ）を行う。これにより水分が抜け、保存性が高まると同時に、アミノ酸の旨味と極めて強い塩気が凝縮される。",
    "classification": "Formaggio di pecora a pasta dura（硬質羊乳タイプ）",
    "logic": "DOP Protected / Salt-cured sheep milk",
    "chef_note": "ローマ帝国時代から兵士の携帯食だったとされる。カルボナーラやカチョ・エ・ペペにはパルミジャーノではなく本品を使うのが絶対の掟。"
  },
  {
    "id": "ing_caciotta_romana",
    "number": "40",
    "name_it": "Caciotta Romana",
    "name_en": "Caciotta Romana",
    "name_ja": "カチョッタ・ロマーナ",
    "region": "Italy (Lazio)",
    "pin": {
      "x": 55,
      "y": 57
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、グリル、パニーノ",
    "science": "牛乳と羊乳の混乳（または羊乳のみ）で作られる丸く小さめのセミソフトチーズ。短期間熟成のため水分が適度に残っており、マイルドで穏やかなミルクの甘みを持つ。",
    "classification": "Formaggio a pasta semimolle（セミソフトタイプ）",
    "logic": "Traditional / Roman countryside classic",
    "chef_note": "クセがなく非常に食べやすい。現地ではハーブやサラミと一緒にパンに挟んで日常的に食される。"
  },
  {
    "id": "ing_casciotta_urbino",
    "number": "41",
    "name_it": "Casciotta d'Urbino",
    "name_en": "Casciotta d'Urbino",
    "name_ja": "カショッタ・ドゥルビーノ",
    "region": "Italy (Marche)",
    "pin": {
      "x": 54,
      "y": 45
    },
    "properties": {
      "tenderness": "★★★★☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、ジャムやハチミツ添え、サラダ",
    "science": "羊乳（70-80%）と牛乳（20-30%）の混乳を使用。羊乳の豊かなコクがありつつも、牛乳を加えることで組織がしなやかで優しくなり、酸味と甘みの絶妙なバランスが生み出される。",
    "classification": "Formaggio a pasta semimolle（セミソフト混乳タイプ）",
    "logic": "DOP Protected / Sheep & Cow blend",
    "chef_note": "芸術家ミケランジェロがこよなく愛し、生産地の農場を自ら買い取ったという逸話があるトスカーナ国境近くの歴史的チーズ。"
  },
  {
    "id": "ing_pecorino_abruzzo",
    "number": "42",
    "name_it": "Pecorino Abruzzese",
    "name_en": "Pecorino Abruzzese",
    "name_ja": "ペコリーノ・アブルツェーゼ",
    "region": "Italy (Abruzzo)",
    "pin": {
      "x": 58,
      "y": 54
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、パスタ、羊肉料理の仕上げ",
    "science": "アブルッツォ州の険しいアペニン山脈で放牧された羊の乳から伝統的手法で作られる。高地の多様な野生草や低木を食べるため、チーズには干し草や野生のタイムなどのスパイシーなハーブ香が宿る。",
    "classification": "Formaggio di pecora（羊乳タイプ）",
    "logic": "Traditional / Appenine pasture",
    "chef_note": "地元の郷土料理「アロスティチーニ（羊肉の串焼き）」と合わせたり、トマトソースのパスタにたっぷり削ってかけるのが定番。"
  },
  {
    "id": "ing_caciocavallo",
    "number": "43",
    "name_it": "Caciocavallo Silano",
    "name_en": "Caciocavallo",
    "name_ja": "カチョカヴァッロ・シラーノ",
    "region": "Italy (Campania / Basilicata / Calabria / Puglia)",
    "pin": {
      "x": 65,
      "y": 65
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "厚切りにしてステーキ（グリル）、そのまま",
    "science": "熱湯の中で練って引き伸ばしたカードを紐で縛り、木枠にまたがらせて（Cacio a cavallo = 馬の背に乗ったチーズ）吊るして熟成させるパスタ・フィラータ。熟成により表面は乾いて硬くなり、内部に独特の芳醇なコクが生じる。",
    "classification": "Formaggio a pasta filata stagionata（熟成パスタ・フィラータ）",
    "logic": "DOP Protected / Stretched curd hung to age",
    "chef_note": "ひょうたん型で吊るされている。厚切りにしてフライパンや鉄板で両面をカリッと焼く「カチョカヴァッロのステーキ」は極上の美味。"
  },
  {
    "id": "ing_mozzarella_bufala",
    "number": "44",
    "name_it": "Mozzarella di Bufala Campana",
    "name_en": "Buffalo Mozzarella",
    "name_ja": "モッツァレッラ・ディ・ブーファラ・カンパーナ",
    "region": "Italy (Campania)",
    "pin": {
      "x": 62,
      "y": 62
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "カプレーゼ（トマトとバジル添え）、マルゲリータピッツァ",
    "science": "水牛乳を使用。水牛乳は牛乳の約2倍の乳脂肪分を含み、カロテンを含まないため純白。熱湯で練る（パスタ・フィラータ）ことでタンパク質が整列し、噛むとミルクがジュワッと溢れるジューシーな繊維状組織を形成する。",
    "classification": "Formaggio fresco a pasta filata（水牛乳フレッシュパスタ・フィラータ）",
    "logic": "DOP Protected / High fat buffalo milk",
    "chef_note": "極上の生クリームのような甘みと濃厚さ。冷たいままちぎって、トマト、良質なオリーブオイル、塩、バジルと合わせるのが一番。"
  },
  {
    "id": "ing_provolone_monaco",
    "number": "45",
    "name_it": "Provolone del Monaco",
    "name_en": "Provolone del Monaco",
    "name_ja": "プロヴォローネ・デル・モナコ",
    "region": "Italy (Campania)",
    "pin": {
      "x": 64,
      "y": 63
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、パスタ（ネラーノ風スパゲッティ）、リゾット",
    "science": "ソレント半島のアイローラ牛の牛乳を使い、洋梨型に成形して最低6ヶ月熟成。カゼインの緩やかな分解により、最初はバターのような甘みがあり、熟成が進むと特有のピリッとした複雑な辛口アロマが現れる。",
    "classification": "Formaggio a pasta filata stagionata（熟成パスタ・フィラータ）",
    "logic": "DOP Protected / Sorrento peninsula heritage",
    "chef_note": "ソレント半島の名物「スパゲッティ・アッラ・ネラーノ（揚げズッキーニのパスタ）」にこのチーズを削って溶かし込むのが本場のレシピ。"
  },
  {
    "id": "ing_burrata",
    "number": "46",
    "name_it": "Burrata",
    "name_en": "Burrata",
    "name_ja": "ブッラータ",
    "region": "Italy (Puglia)",
    "pin": {
      "x": 70,
      "y": 58
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★★★",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま（生ハムや完熟トマト、フルーツと合わせて）、パスタの上に乗せる",
    "science": "モッツァレッラの薄い袋を作り、その中に細かく裂いたモッツァレッラと生クリーム（ストラッチャテッラ）を詰め込んで閉じる。ナイフを入れると、高い脂肪分のクリームが流れ出す液状〜ゲル状の二重構造。",
    "classification": "Formaggio fresco con panna（クリーム入りフレッシュタイプ）",
    "logic": "Traditional / Stretched bag with cream",
    "chef_note": "「バターのような」という意味の名を持つプーリア発祥の贅沢品。鮮度が命で、中のクリームが常温に戻ってから食べると香りが最大に引き立つ。"
  },
  {
    "id": "ing_canestrato_pugliese",
    "number": "47",
    "name_it": "Canestrato Pugliese",
    "name_en": "Canestrato Pugliese",
    "name_ja": "カネストラート・プグリエーゼ",
    "region": "Italy (Puglia)",
    "pin": {
      "x": 72,
      "y": 60
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、すりおろしてパスタやスープに、そら豆と共に",
    "science": "葦で編んだカゴ（Canestro）に入れてプレスし脱水するため、表面に特徴的なカゴ of 跡が残る羊の硬質チーズ。乾燥したプーリアの気候で熟成され、非常に引き締まった組織と強めの塩気、羊乳の深いコクを持つ。",
    "classification": "Formaggio di pecora a pasta dura（硬質羊乳タイプ）",
    "logic": "DOP Protected / Basket molded",
    "chef_note": "若いうちはマイルドだが、熟成したものは非常にパワフル。地元の太いパスタ（オレキエッテ）のトマトソースにたっぷり削って食べる。"
  },
  {
    "id": "ing_pecorino_filiano",
    "number": "48",
    "name_it": "Pecorino di Filiano",
    "name_en": "Pecorino di Filiano",
    "name_ja": "ペコリーノ・ディ・フィリアーノ",
    "region": "Italy (Basilicata)",
    "pin": {
      "x": 70,
      "y": 64
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、すりおろし、パスタ",
    "science": "バジリカータ州の火山性土壌の草地で放牧された羊の生乳を使用。カゴで成形され、オリーブオイルを表面に塗りながら洞窟やセラーで熟成。非常にスパイシーで、火山灰土壌由来の豊かなミネラル感を感じるコクがある。",
    "classification": "Formaggio di pecora a pasta dura（硬質羊乳タイプ）",
    "logic": "DOP Protected / Volcanic soil influence",
    "chef_note": "伝統的なオリーブオイル塗布熟成。地元のしっかりした赤ワイン（アリアーニコ・デル・ヴルトゥレ）と非常に相性が良い。"
  },
  {
    "id": "ing_pecorino_crotonese",
    "number": "49",
    "name_it": "Pecorino Crotonese",
    "name_en": "Pecorino Crotonese",
    "name_ja": "ペコリーノ・クロトネーゼ",
    "region": "Italy (Calabria)",
    "pin": {
      "x": 75,
      "y": 72
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、グリル、すりおろし",
    "science": "カラブリア州クロトーネ周辺で作られる。羊乳の脂肪分解が進み、ナッツのようなアロマと共に、カラブリア特有のスパイシーで力強い辛口（ピカンテ）の風味が生じる。",
    "classification": "Formaggio di pecora（硬質羊乳タイプ）",
    "logic": "DOP Protected / Calabrian sheep classic",
    "chef_note": "地元特産の唐辛子を練り込んだバリエーション（Pecorino con Peperoncino）も多く、カラブリアの情熱的な味覚を象徴する。"
  },
  {
    "id": "ing_pecorino_siciliano",
    "number": "50",
    "name_it": "Pecorino Siciliano",
    "name_en": "Pecorino Siciliano",
    "name_ja": "ペコリーノ・シチリアーノ",
    "region": "Italy (Sicilia)",
    "pin": {
      "x": 60,
      "y": 85
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、すりおろし、パスタ・アッラ・ノルマの仕上げ",
    "science": "シチリア最古の羊乳チーズ。塩を加えてプレスし、葦のカゴで脱水。黒胡椒の粒を丸ごと練り込む（Tumazzu di Bivona 等）伝統もあり、羊乳の野生のコクに胡椒の爽やかな辛味がアクセントを与える。",
    "classification": "Formaggio di pecora a pasta dura（硬質羊乳タイプ）",
    "logic": "DOP Protected / Ancient Sicilian recipe",
    "chef_note": "シチリアの名物ナスパスタ「パスタ・アッラ・ノルマ」に欠かせない。削るだけでシチリアの乾いた大地と太陽の香りを感じる。"
  },
  {
    "id": "ing_ragusano",
    "number": "51",
    "name_it": "Ragusano",
    "name_en": "Ragusano",
    "name_ja": "ラグサーノ",
    "region": "Italy (Sicilia)",
    "pin": {
      "x": 67,
      "y": 92
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "薄切りにしてフライパンで焼く、そのまま",
    "science": "四角いレンガのような形をした牛乳のパスタ・フィラータ。塩水に長く漬け込むため塩気が強く、オリーブオイルを塗って熟成させることで、繊維質の中に濃厚なコクと香ばしさが生まれる。",
    "classification": "Formaggio a pasta filata stagionata（熟成パスタ・フィラータタイプ）",
    "logic": "DOP Protected / Brick-shaped",
    "chef_note": "巨大な直方体で吊るされているのが特徴。焼くとモディカ地方の肉料理のような満足感が出る。"
  },
  {
    "id": "ing_vastedda_belice",
    "number": "52",
    "name_it": "Vastedda della Valle del Belice",
    "name_en": "Vastedda della Valle del Belice",
    "name_ja": "ヴァステッダ・デッラ・ヴァッレ・デル・ベリーチェ",
    "region": "Italy (Sicilia)",
    "pin": {
      "x": 62,
      "y": 88
    },
    "properties": {
      "tenderness": "★★★★★",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、サンドイッチ、オリーブオイルとオレガノをかけて",
    "science": "イタリアで唯一の「羊乳のパスタ・フィラータ（繊維状チーズ）」。元々は失敗したペコリーノを熱湯で練り直して再生したのが始まり。羊乳特有のコクがありつつも、フレッシュで極めて滑らか。",
    "classification": "Formaggio fresco a pasta filata di pecora（羊乳フレッシュ・パスタ・フィラータタイプ）",
    "logic": "DOP Protected / Sheep milk stretched curd",
    "chef_note": "平たい円盤状。トマトやオレガノと一緒にシチリアのパンに挟むと極上のパニーノになる。"
  },
  {
    "id": "ing_pecorino_sardo",
    "number": "53",
    "name_it": "Pecorino Sardo",
    "name_en": "Pecorino Sardo",
    "name_ja": "ペコリーノ・サルド",
    "region": "Italy (Sardegna)",
    "pin": {
      "x": 40,
      "y": 70
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、パスタ、ペストソース（ジェノベーゼ）",
    "science": "ローマのものより塩分が低く、マイルドな甘口（ドルチェ）と、長期間熟成させてピリッとした辛味を持つ熟成（マトゥーロ）がある。サルデーニャの自然な牧草由来のハーブ香を内包する。",
    "classification": "Formaggio di pecora（羊乳タイプ）",
    "logic": "DOP Protected / Two aging styles",
    "chef_note": "ジェノベーゼソース（ペスト）を作る際、パルミジャーノとこのペコリーノ・サルドをブレンドするのが本場のレシピ。"
  },
  {
    "id": "ing_fiore_sardo",
    "number": "54",
    "name_it": "Fiore Sardo",
    "name_en": "Fiore Sardo",
    "name_ja": "フィオーレ・サルド",
    "region": "Italy (Sardegna)",
    "pin": {
      "x": 42,
      "y": 68
    },
    "properties": {
      "tenderness": "★★☆☆☆",
      "fat": "★★★★☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、すりおろし",
    "science": "羊の生乳を使用し, 型に入れた後に暖炉の煙（マートルなどの地元の木材）で軽く燻製をかけてから熟成させる。スモーク香と羊乳の強い風味が相まり、非常に野性的で力強いアロマを放つ。",
    "classification": "Formaggio di pecora affumicato（燻製・硬質羊乳タイプ）",
    "logic": "DOP Protected / Smoked raw sheep milk",
    "chef_note": "「サルデーニャの花」という名前だが味は非常にワイルド。地元の強い赤ワイン（カンノナウ）と合わせる。"
  },
  {
    "id": "ing_casizolu",
    "number": "55",
    "name_it": "Casizolu",
    "name_en": "Casizolu",
    "name_ja": "カシゾル",
    "region": "Italy (Sardegna)",
    "pin": {
      "x": 38,
      "y": 69
    },
    "properties": {
      "tenderness": "★★★☆☆",
      "fat": "★★★☆☆",
      "collagen": "☆☆☆☆☆"
    },
    "cooking": "そのまま、焼いてハチミツをかける",
    "science": "羊乳が主流のサルデーニャでは珍しい、放牧された牛の乳で作るパスタ・フィラータ。洋梨のような形をしており、黄色みを帯びた組織からは牧草由来のカロテンと森の香りが感じられる。",
    "classification": "Formaggio a pasta filata（パスタ・フィラータタイプ）",
    "logic": "Traditional / Cow's milk in sheep land",
    "chef_note": "職人が手作業で湯の中で練り上げる希少なチーズ。少し火を入れると香りが一気に開く。"
  }
];

export const cheeseCutsFr = [
  {
    "id": "ing_camembert",
    "number": "1",
    "name_fr": "Camembert de Normandie",
    "name_en": "Camembert (Normandy)",
    "name_ja": "カマンベール・ド・ノルマンディー",
    "region": "Normandie",
    "pin": {
      "x": 35,
      "y": 45
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、焼きカマンベール（Camembert au four）",
    "science": "表面の白カビ（Penicillium camemberti）が分泌するプロテアーゼによりカゼインが分解され、中心部に向かって徐々に柔らかくクリーミーな状態へと熟成が進む。",
    "classification": "Fromage à pâte molle à croûte fleurie（白カビソフトタイプ）",
    "logic": "AOP Protected / Raw milk product",
    "chef_note": "冷蔵庫から食べる1時間前には出し、室温に戻しておくことで、独特の芳醇な香りと滑らかなテクスチャーが最大限に引き出される。"
  },
  {
    "id": "ing_pont_leveque",
    "number": "2",
    "name_fr": "Pont-l'Évêque",
    "name_en": "Pont-l'Évêque",
    "name_ja": "ポン・レヴェック",
    "region": "Normandie (Pays d’Auge)",
    "pin": {
      "x": 34,
      "y": 44
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、キッシュの具材",
    "science": "塩水で表面を洗うことでリネンス菌（Brevibacterium linens）を繁殖させる。これにより、特有の強い匂いとしなやかな生地が形成される。",
    "classification": "Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",
    "logic": "AOP Protected / Washed rind",
    "chef_note": "外皮の香りは強いが中身はマイルド。リンゴの蒸留酒カルヴァドスと合わせるのが現地流。"
  },
  {
    "id": "ing_brie_meaux",
    "number": "3",
    "name_fr": "Brie de Meaux",
    "name_en": "Brie de Meaux",
    "name_ja": "ブリー・ド・モー",
    "region": "Île-de-France (Brie)",
    "pin": {
      "x": 55,
      "y": 48
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★☆☆",
      "rarity": "★★☆☆☆"
    },
    "cooking": "そのまま、サンドイッチ（ジャンボン・ブール）",
    "science": "カマンベールと同じ白カビタイプだが、円盤が大きいため熟成がゆっくりと進み、キノコやヘーゼルナッツのようなより複雑な芳香成分が生成される。",
    "classification": "Fromage à pâte molle à croûte fleurie（白カビソフトタイプ）",
    "logic": "AOP Protected / The King of Cheeses",
    "chef_note": "「チーズの王様」と呼ばれる。完全に熟成すると中身がトロトロになるため、カットするタイミングが重要。"
  },
  {
    "id": "ing_epoisses",
    "number": "4",
    "name_fr": "Époisses",
    "name_en": "Époisses",
    "name_ja": "エポワス",
    "region": "Bourgogne (Côte-d’Or)",
    "pin": {
      "x": 65,
      "y": 55
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★★",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、バゲットに塗る",
    "science": "ブルゴーニュの地酒（マール・ド・ブルゴーニュ）を加えた塩水で表面を何度も洗うことで、強烈な発酵臭とスプーンですくえるほどのトロトロな組織が作られる。",
    "classification": "Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",
    "logic": "AOP Protected / Marc de Bourgogne washed",
    "chef_note": "香りの強烈さに反して味は非常にミルキー。フルボディの赤ワインと抜群の相性を誇る。"
  },
  {
    "id": "ing_charolais",
    "number": "5",
    "name_fr": "Charolais",
    "name_en": "Charolais",
    "name_ja": "シャロレ",
    "region": "Bourgogne (Saône-et-Loire)",
    "pin": {
      "x": 67,
      "y": 58
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★★☆"
    },
    "cooking": "そのまま、サラダのトッピング",
    "science": "山羊乳（または牛乳との混乳）を使用し、自然乾燥させることで凝縮した酸味とナッツの香りが際立つ。熟成により表面に青カビが生えることもある。",
    "classification": "Fromage de chèvre（山羊乳タイプ）",
    "logic": "AOP Protected / Large goat cheese",
    "chef_note": "他のシェーブルよりサイズが大きく、中がしっとりしている。白ワインとの相性が良い。"
  },
  {
    "id": "ing_comte",
    "number": "6",
    "name_fr": "Comté",
    "name_en": "Comté",
    "name_ja": "コンテ",
    "region": "Jura (Montagnes du Jura)",
    "pin": {
      "x": 75,
      "y": 50
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★☆☆",
      "rarity": "★★☆☆☆"
    },
    "cooking": "そのまま、チーズフォンデュ、シュー生地（Gougère）",
    "science": "長期間（4ヶ月から36ヶ月以上）熟成させた硬質チーズ。熟成に伴いタンパク質が分解され、アミノ酸結晶（主にチロシン）が生じ、噛むとジャリッとした食感と濃厚な旨味が広がる。",
    "classification": "Fromage à pâte pressée cuite（加熱圧搾硬質タイプ）",
    "logic": "AOP Protected / Long maturation",
    "chef_note": "熟成月数によりナッツ、栗、ドライフルーツなど劇的に香りが変化する。"
  },
  {
    "id": "ing_reblochon",
    "number": "7",
    "name_fr": "Reblochon",
    "name_en": "Reblochon",
    "name_ja": "ルブロション",
    "region": "Savoie (Haute-Savoie)",
    "pin": {
      "x": 80,
      "y": 53
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "タルティフレット（Tartiflette）",
    "science": "絞り残しの乳（より脂肪分が高い）から作られるため、クリーミーで豊かな脂質が含まれる。ウォッシュタイプだが洗いの回数が少なく、マイルドな仕上がり。",
    "classification": "Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",
    "logic": "AOP Protected / High fat content",
    "chef_note": "ジャガイモとベーコンと一緒にオーブンで焼くサヴォワの郷土料理「タルティフレット」には欠かせない。"
  },
  {
    "id": "ing_beaufort",
    "number": "8",
    "name_fr": "Beaufort",
    "name_en": "Beaufort",
    "name_ja": "ボーフォール",
    "region": "Savoie (Beaufortain, Tarentaise)",
    "pin": {
      "x": 82,
      "y": 55
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "チーズフォンデュ（Fondue savoyarde）、グラタン",
    "science": "夏に高山の牧草を食べた牛の乳（エテ）はカロテンが多く黄色味を帯びる。加熱圧搾により水分を抜き、高密度な旨味成分のアミノ酸が凝縮される。",
    "classification": "Fromage à pâte pressée cuite（加熱圧搾硬質タイプ）",
    "logic": "AOP Protected / Alpine cheese",
    "chef_note": "側面が内側に凹んでいるのが特徴。華やかな香りとフルーティーな甘みを持つ。"
  },
  {
    "id": "ing_bleu_queyras",
    "number": "9",
    "name_fr": "Bleu du Queyras",
    "name_en": "Bleu du Queyras",
    "name_ja": "ブルー・デュ・ケラス",
    "region": "Alpes du Sud (Provence-Alpes)",
    "pin": {
      "x": 85,
      "y": 65
    },
    "properties": {
      "saltiness": "★★★★☆",
      "aroma": "★★★★☆",
      "rarity": "★★★★★"
    },
    "cooking": "そのまま、サラダ",
    "science": "アルプスの高地で作られる牛乳製の青カビチーズ。カビの増殖による脂肪分解で独特のピリッとした風味と、山の牧草由来のフローラルな香りが混ざり合う。",
    "classification": "Fromage à pâte persillée（青カビタイプ）",
    "logic": "Mountain blue cheese",
    "chef_note": "生産量が少なく希少。ハチミツやドライフルーツと一緒に食べると辛味がマイルドになる。"
  },
  {
    "id": "ing_cantal",
    "number": "10",
    "name_fr": "Cantal",
    "name_en": "Cantal",
    "name_ja": "カンタル",
    "region": "Auvergne (Cantal)",
    "pin": {
      "x": 60,
      "y": 65
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★☆☆",
      "rarity": "★★☆☆☆"
    },
    "cooking": "アリゴ（Aligot）、トリュファード（Truffade）",
    "science": "カード（凝乳）を一度粉砕して塩を混ぜ、再度プレスして作る特殊な製法により、組織に細かいヒビが入り、ホロホロとした独特の食感と酸味が生まれる。",
    "classification": "Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",
    "logic": "AOP Protected / Double pressed",
    "chef_note": "フランス最古のチーズの一つ。オーヴェルニュの郷土料理には欠かせないベース食材。"
  },
  {
    "id": "ing_saint_nectaire",
    "number": "11",
    "name_fr": "Saint-Nectaire",
    "name_en": "Saint-Nectaire",
    "name_ja": "サン・ネクテール",
    "region": "Auvergne (Puy-de-Dôme)",
    "pin": {
      "x": 62,
      "y": 63
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、温野菜に乗せる",
    "science": "火山灰土壌の牧草を食べた牛の乳から作られ、湿気の多いカーヴ（洞窟）で熟成。複雑なカビが外皮に生え、ナッツや土、マッシュルームのような土着的なアロマ（Terroir）を形成する。",
    "classification": "Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",
    "logic": "AOP Protected / Earthy flavor",
    "chef_note": "外皮の独特の匂いとは裏腹に、中は非常にしなやかでミルクの甘味を感じる。"
  },
  {
    "id": "ing_fourme_ambert",
    "number": "12",
    "name_fr": "Fourme d'Ambert",
    "name_en": "Fourme d'Ambert",
    "name_ja": "フルム・ダンベール",
    "region": "Auvergne (Haute-Loire, Puy-de-Dôme)",
    "pin": {
      "x": 64,
      "y": 64
    },
    "properties": {
      "saltiness": "★★★★☆",
      "aroma": "★★★☆☆",
      "rarity": "★★☆☆☆"
    },
    "cooking": "そのまま、ソース、キッシュ",
    "science": "円柱形の青カビチーズ。青カビ（Penicillium roqueforti）を入れるが、他のブルーチーズより水分が多いためマイルドな風味に仕上がり、カゼインの分解によるなめらかさが際立つ。",
    "classification": "Fromage à pâte persillée（青カビタイプ）",
    "logic": "AOP Protected / Mild blue cheese",
    "chef_note": "青カビ初心者にも勧めやすい「高貴なブルーチーズ」。甘口ワインと相性が良い。"
  },
  {
    "id": "ing_sainte_maure",
    "number": "13",
    "name_fr": "Sainte-Maure de Touraine",
    "name_en": "Goat Cheese (Sainte-Maure)",
    "name_ja": "サント・モール・ド・トゥーレーヌ",
    "region": "Vallée de la Loire (Touraine)",
    "pin": {
      "x": 42,
      "y": 62
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、サラダ・ド・シェーヴル・ショー（温製サラダ）",
    "science": "山羊乳チーズ。中央の麦わらが組織を補強し内部の酸素供給を助ける。表面の木炭粉が酸度を調整し、特有の風味を持つ灰色の外皮を形成する。",
    "classification": "Fromage de chèvre（山羊乳タイプ）",
    "logic": "AOP Protected / Ash-coated",
    "chef_note": "バゲットに乗せて軽く焼き、ハチミツをかけてサラダに乗せるのが定番。"
  },
  {
    "id": "ing_crottin",
    "number": "14",
    "name_fr": "Crottin de Chavignol",
    "name_en": "Crottin de Chavignol",
    "name_ja": "クロタン・ド・シャヴィニョル",
    "region": "Vallée de la Loire (Berry)",
    "pin": {
      "x": 45,
      "y": 60
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、オーブン焼き",
    "science": "小型の山羊乳チーズ。熟成が進むと水分が抜け、組織が硬く締まり（脂肪とタンパク質の凝縮）、ピリッとした刺激と深いコクが生まれる。",
    "classification": "Fromage de chèvre（山羊乳タイプ）",
    "logic": "AOP Protected / Small goat cheese",
    "chef_note": "ロワール地方の白ワイン（サンセール）とのペアリングが完璧とされる。"
  },
  {
    "id": "ing_ossau_iraty",
    "number": "15",
    "name_fr": "Ossau-Iraty",
    "name_en": "Ossau-Iraty",
    "name_ja": "オッソー・イラティ",
    "region": "Pyrénées (Pays Basque, Béarn)",
    "pin": {
      "x": 30,
      "y": 80
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★☆☆",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、ジャム（黒サクランボ）を添える",
    "science": "羊乳は牛乳よりも脂肪分とタンパク質が多いため、圧搾して水分を抜くことで非常にリッチでミルキー、かつ甘みのある風味成分（ラクトン類）が濃縮される。",
    "classification": "Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",
    "logic": "AOP Protected / Sheep's milk",
    "chef_note": "バスク地方の伝統に従い、チェリージャムを添えて食べるのが最高。"
  },
  {
    "id": "ing_brocciu",
    "number": "16",
    "name_fr": "Brocciu",
    "name_en": "Brocciu",
    "name_ja": "ブロッチュ",
    "region": "Corse (Haute-Corse, Corse-du-Sud)",
    "pin": {
      "x": 90,
      "y": 90
    },
    "properties": {
      "saltiness": "★☆☆☆☆",
      "aroma": "★★☆☆☆",
      "rarity": "★★★★★"
    },
    "cooking": "そのまま、フィアドーネ（Fiadone: コルシカのチーズケーキ）",
    "science": "チーズ作りで余った乳清（ホエイ）を再加熱して作るため、カゼインではなくホエイタンパク質（アルブミンなど）が主成分となり、脂肪分が低く非常に軽い口当たりになる。",
    "classification": "Fromage à pâte fraîche（フレッシュタイプ / 乳清チーズ）",
    "logic": "AOP Protected / Whey cheese",
    "chef_note": "賞味期限が数日しかないため、地元以外では新鮮なものを食べるのが難しい幻のチーズ。"
  },
  {
    "id": "ing_maroilles",
    "number": "17",
    "name_fr": "Maroilles",
    "name_en": "Maroilles",
    "name_ja": "マロワル",
    "region": "Hauts-de-France (Pas-de-Calais, Nord)",
    "pin": {
      "x": 60,
      "y": 30
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★★",
      "rarity": "★★★★☆"
    },
    "cooking": "フラミッシュ（Flamiche: チーズタルト）、ソース",
    "science": "塩水で定期的に洗いながら熟成させることで赤色細菌が繁殖。これにより強烈なアンモニア臭を発するが、内部のタンパク質は完全に分解され極めて滑らかになる。",
    "classification": "Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",
    "logic": "AOP Protected / Square washed rind",
    "chef_note": "北フランスの修道院で作られ始めた歴史あるチーズ。ビールとの相性が抜群。"
  },
  {
    "id": "ing_roquefort",
    "number": "18",
    "name_fr": "Roquefort",
    "name_en": "Roquefort (Blue cheese)",
    "name_ja": "ロックフォール",
    "region": "Occitanie (Aveyron)",
    "pin": {
      "x": 50,
      "y": 75
    },
    "properties": {
      "saltiness": "★★★★★",
      "aroma": "★★★★★",
      "rarity": "★★☆☆☆"
    },
    "cooking": "そのまま、ステーキソース（Sauce Roquefort）、サラダのトッピング",
    "science": "ラコーヌ種の羊乳から作られ、コンバルー山の洞窟内に生息する青カビ（Penicillium roqueforti）によって熟成。青カビのリパーゼが脂肪を分解し、強い刺激とコクを生む。",
    "classification": "Fromage à pâte persillée（青カビタイプ）",
    "logic": "AOP Protected / Sheep's milk cheese",
    "chef_note": "甘口貴腐ワインのソーテルヌ（Sauternes）と合わせるのが古典フランス料理の最高の「マリアージュ」。"
  },
  {
    "id": "ing_rocamadour",
    "number": "19",
    "name_fr": "Rocamadour",
    "name_en": "Rocamadour",
    "name_ja": "ロカマドゥール",
    "region": "Occitanie (Lot)",
    "pin": {
      "x": 45,
      "y": 72
    },
    "properties": {
      "saltiness": "★★☆☆☆",
      "aroma": "★★★☆☆",
      "rarity": "★★★★☆"
    },
    "cooking": "そのまま、サラダ",
    "science": "非常に小さな円盤型の山羊乳チーズ。熟成期間が1〜2週間と短いため、酸味は穏やかで内部はクリームのように滑らかなテクスチャーを保持している。",
    "classification": "Fromage de chèvre（山羊乳タイプ）",
    "logic": "AOP Protected / Small soft goat cheese",
    "chef_note": "一口サイズで食べやすい。熟成が若いうちに食べるのがおすすめ。"
  },
  {
    "id": "ing_munster",
    "number": "20",
    "name_fr": "Munster (Munster-Géromé)",
    "name_en": "Munster",
    "name_ja": "マンステール",
    "region": "Alsace / Lorraine",
    "pin": {
      "x": 80,
      "y": 40
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★★",
      "rarity": "★★★☆☆"
    },
    "cooking": "そのまま、茹でたジャガイモに添えて、クミンシードをまぶす",
    "science": "高温多湿な環境でウォッシュ（塩水洗い）されるため、リネンス菌の働きが非常に活発。特有の納豆や強い発酵臭を持つが、口溶けは驚くほど良い。",
    "classification": "Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",
    "logic": "AOP Protected / Washed rind",
    "chef_note": "アルザスワイン（ゲヴュルツトラミネール）と合わせるのが鉄板。クミンを散らすと香りが調和する。"
  },
  {
    "id": "ing_banon",
    "number": "21",
    "name_fr": "Banon",
    "name_en": "Banon",
    "name_ja": "バノン",
    "region": "Provence",
    "pin": {
      "x": 75,
      "y": 80
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★★☆",
      "rarity": "★★★★☆"
    },
    "cooking": "そのまま",
    "science": "山羊乳チーズを栗の葉で包み、ラフィア（ヤシの繊維）で縛って熟成。葉から移行するタンニンや香気成分が、チーズの脂肪分の酸化を抑えつつ独特の風味を付与する。",
    "classification": "Fromage de chèvre（山羊乳タイプ）",
    "logic": "AOP Protected / Leaf-wrapped",
    "chef_note": "栗の葉の香りと強めの酸味、とろける食感が特徴。"
  },
  {
    "id": "ing_vache_qui_rit",
    "number": "22",
    "name_fr": "La Vache qui rit",
    "name_en": "The Laughing Cow",
    "name_ja": "ラ・ヴァシュ・キ・リ（笑う牛）",
    "region": "Générique (Processed)",
    "pin": {
      "x": 50,
      "y": 50
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★☆☆☆☆",
      "rarity": "★☆☆☆☆"
    },
    "cooking": "そのまま（スナック）、パンに塗る、スープのコク出し",
    "science": "複数のナチュラルチーズ（コンテやエメンタールなど）を加熱溶解し、乳化剤を添加して均一に混ぜ合わせたプロセスチーズ。微生物が死滅しているため保存性が極めて高い。",
    "classification": "Fromage fondu（プロセスチーズ）",
    "logic": "Industrial / Pasteurized / Emulsified",
    "chef_note": "ポタージュスープの最後に溶かし込むと、簡単にクリーミーさとコクを足すことができる。"
  },
  {
    "id": "ing_boursin",
    "number": "23",
    "name_fr": "Boursin",
    "name_en": "Boursin",
    "name_ja": "ブルサン",
    "region": "Générique (Industrial Fresh Cheese)",
    "pin": {
      "x": 50,
      "y": 50
    },
    "properties": {
      "saltiness": "★★★☆☆",
      "aroma": "★★★☆☆",
      "rarity": "★☆☆☆☆"
    },
    "cooking": "そのまま、クラッカーに乗せる、パスタソース",
    "science": "加熱殺菌した牛乳とクリームから作るフレッシュチーズに、ガーリックやハーブを練り込んだもの。乳酸発酵による爽やかな酸味と脂肪分のリッチな口どけが特徴。",
    "classification": "Fromage frais aromatisé（ハーブ・スパイス入りフレッシュタイプ）",
    "logic": "Industrial / Garlic & Fine Herbs",
    "chef_note": "アペリティフ（食前酒）のお供として非常にポピュラー。生クリーム代わりにソースに溶かしても使える。"
  }
];

export const wineCuts = [
  {
    "id": "ing_vin_rouge",
    "number": "1",
    "name_fr": "Vin rouge",
    "name_en": "Red Wine",
    "name_ja": "ヴァン・ルージュ（赤ワイン）",
    "region": "Générique",
    "pin": {
      "x": 45,
      "y": 35
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "赤ワインソース、デグラサージュ、マリネ液、煮込み（ボルドレーズ、ブルギニョン）",
    "science": "ブドウの果皮や種子を一緒に発酵させるため、ポリフェノール化合物（タンニン）が多く溶け込んでいる。タンニンが肉のタンパク質と結合して凝集するため、脂っぽさを引き締め、肉質を柔らかく感じさせる。",
    "classification": "Ingrédient liquide aromatique",
    "logic": "Deglazing / Meat tenderizer / Color agent",
    "chef_note": "料理に使うワインは「飲むのと同じ品質のもの」を使うこと。酸味と渋みが加熱で凝縮されるため、安物の粗悪なワインは仕上がりを壊す。"
  },
  {
    "id": "ing_vin_blanc",
    "number": "2",
    "name_fr": "Vin blanc",
    "name_en": "White Wine",
    "name_ja": "ヴァン・ブラン（白ワイン）",
    "region": "Générique",
    "pin": {
      "x": 55,
      "y": 35
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "白ワインソース、魚のポシェ（コルトン・ブイヨン）、デグラサージュ",
    "science": "ブドウをすぐに搾汁し皮などを除いて発酵させるため、タンニンは少なく、リンゴ酸や酒石酸などの豊かな有機酸が主体。この酸が魚介の生臭さ成分（アミン）を中和し、すっきりとした爽やかさと旨味を与える。",
    "classification": "Ingrédient liquide aromatique",
    "logic": "Deglazing / Acidity balancer",
    "chef_note": "エシャロット、キノコをバターで炒めたフライパンを白ワインでデグラセし、煮詰めてクリームを加えるだけで、クラシックな万能ソースが完成する。"
  },
  {
    "id": "ing_bordeaux_medoc",
    "number": "3",
    "name_fr": "Médoc",
    "name_en": "Médoc Red",
    "name_ja": "メドック",
    "region": "Bordeaux (Médoc)",
    "pin": {
      "x": 28,
      "y": 58
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★★"
    },
    "cooking": "牛肉のロースト、ソース・ボルドレーズ",
    "science": "カベルネ・ソーヴィニヨン主体。骨格のしっかりした豊富なタンニンが赤身肉のタンパク質と強く結びつき、脂の強さを中和する。",
    "classification": "AOC Médoc (Vin rouge)",
    "logic": "High Tannin / Protein binding",
    "chef_note": "ボルドーの王道。濃厚な肉料理やシャロレ牛のステーキと合わせるのが定石。"
  },
  {
    "id": "ing_bordeaux_graves",
    "number": "4",
    "name_fr": "Graves",
    "name_en": "Graves",
    "name_ja": "グラーヴ",
    "region": "Bordeaux (Graves)",
    "pin": {
      "x": 30,
      "y": 62
    },
    "properties": {
      "type": "赤ワイン / 白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★★☆"
    },
    "cooking": "仔牛のソテー（赤）、白身魚のグリル（白）",
    "science": "砂利質土壌由来のミネラル感とスモーキーな香りが特徴。赤はエレガントなタンニンを持ち、白はソーヴィニヨン・ブランの爽やかな酸と樽香が調和する。",
    "classification": "AOC Graves (Vin rouge / Vin blanc)",
    "logic": "Mineral & Smoky complexity",
    "chef_note": "赤白ともに高品質。料理の汎用性が高く、ロースト料理によく馴染む。"
  },
  {
    "id": "ing_bordeaux_st_emilion",
    "number": "5",
    "name_fr": "Saint-Émilion",
    "name_en": "Saint-Émilion",
    "name_ja": "サン・テミリオン",
    "region": "Bordeaux (Saint-Émilion)",
    "pin": {
      "x": 34,
      "y": 60
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "鴨のコンフィ、ジビエ料理",
    "science": "メルロー主体。タンニンが滑らかで果実味が豊かであり、ソースに煮詰めるとビロードのような口当たりとプラムのような甘いコクを生む。",
    "classification": "AOC Saint-Émilion (Vin rouge)",
    "logic": "Smooth Tannin / Fruit forward",
    "chef_note": "メドックより柔らかくふくよか。ソースのベースにすると丸みのある仕上がりになる。"
  },
  {
    "id": "ing_bordeaux_pomerol",
    "number": "6",
    "name_fr": "Pomerol",
    "name_en": "Pomerol",
    "name_ja": "ポムロール",
    "region": "Bordeaux (Pomerol)",
    "pin": {
      "x": 33,
      "y": 59
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★★"
    },
    "cooking": "トリュフを使った肉料理",
    "science": "粘土質土壌で育つ極上のメルローから作られ、熟成によりトリュフや腐葉土の土着的なアロマ成分（Terroir）が強まる。",
    "classification": "AOC Pomerol (Vin rouge)",
    "logic": "Earthy aromatics / High Merlot",
    "chef_note": "官能的でトリュフとの相性が抜群。ペリグーソースに少し加えると香りが爆発する。"
  },
  {
    "id": "ing_bordeaux_sauternes",
    "number": "7",
    "name_fr": "Sauternes",
    "name_en": "Sauternes",
    "name_ja": "ソーテルヌ",
    "region": "Bordeaux (Sauternes)",
    "pin": {
      "x": 31,
      "y": 64
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★★★★★",
      "alcohol": "★★★★☆",
      "body": "★★★★★"
    },
    "cooking": "フォアグラのテリーヌ、ソースの隠し味、デザート",
    "science": "貴腐菌（Botrytis cinerea）によりブドウの水分が蒸発し、糖分とグリセリンが極度に濃縮。特有の蜂蜜やアプリコットの芳香（ソトロンなど）を持つ。",
    "classification": "AOC Sauternes (Vin blanc liquoreux)",
    "logic": "Botrytis / High residual sugar",
    "chef_note": "フォアグラの脂の甘みとソーテルヌの酸味・甘味のペアリングはフランス料理界の究極のマリアージュ。"
  },
  {
    "id": "ing_bourgogne_chablis",
    "number": "8",
    "name_fr": "Chablis",
    "name_en": "Chablis",
    "name_ja": "シャブリ",
    "region": "Bourgogne (Chablis)",
    "pin": {
      "x": 56,
      "y": 40
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "生牡蠣、甲殻類のマリネ、チーズ（エポワス）",
    "science": "キンメリジャン土壌（小さな牡蠣の化石を含む石灰質）由来の豊富なミネラル（カルシウムやマグネシウム）と鋭い酸味が、生魚や貝類の臭みを断ち切る。",
    "classification": "AOC Chablis (Vin blanc sec)",
    "logic": "High Minerality / Malic acid",
    "chef_note": "樽香をつけないステンレスタンク発酵のものは、特に牡蠣との相性が完璧。"
  },
  {
    "id": "ing_bourgogne_cotes_de_nuits",
    "number": "9",
    "name_fr": "Côte de Nuits",
    "name_en": "Côte de Nuits",
    "name_ja": "コート・ド・ニュイ",
    "region": "Bourgogne (Côte de Nuits)",
    "pin": {
      "x": 62,
      "y": 46
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "ブッフ・ブルギニョン、コック・オー・ヴァン",
    "science": "世界最高峰のピノ・ノワール産地。タンニンは繊細だが、酸味とアミノ酸（旨味成分）のバランスが絶妙で、煮込み料理に深いコクと透明感を与える。",
    "classification": "AOC Côte de Nuits (Vin rouge)",
    "logic": "Elegant acidity / Umami enhancer",
    "chef_note": "ブルゴーニュの赤ワイン煮込みには、この地域のピノ・ノワールを使うのが本場の手法。"
  },
  {
    "id": "ing_bourgogne_cotes_de_beaune",
    "number": "10",
    "name_fr": "Côte de Beaune",
    "name_en": "Côte de Beaune",
    "name_ja": "コート・ド・ボーヌ",
    "region": "Bourgogne (Côte de Beaune)",
    "pin": {
      "x": 61,
      "y": 48
    },
    "properties": {
      "type": "白ワイン / 赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★★☆"
    },
    "cooking": "鶏肉のクリーム煮、オマール海老のソース",
    "science": "芳醇なシャルドネの聖地。マロラクティック発酵による乳酸のまろやかさとオーク樽由来のバニラ香（バニリン）が、バターや生クリームと見事に同化する。",
    "classification": "AOC Côte de Beaune (Vin blanc / Vin rouge)",
    "logic": "Malolactic fermentation / Oak aging",
    "chef_note": "濃厚なクリームソースのデグラサージュには、ここのリッチな白ワインが最高。"
  },
  {
    "id": "ing_bourgogne_chalonnaise",
    "number": "11",
    "name_fr": "Côte Chalonnaise",
    "name_en": "Côte Chalonnaise",
    "name_ja": "コート・シャロネーズ",
    "region": "Bourgogne (Côte Chalonnaise)",
    "pin": {
      "x": 60,
      "y": 51
    },
    "properties": {
      "type": "赤ワイン / 白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "シャルキュトリー、エスカルゴ（アリゴテ）",
    "science": "ピノ・ノワールとシャルドネに加え、酸の強いアリゴテ種も栽培される。カシスなどのフレッシュな果実味が特徴。",
    "classification": "AOC Côte Chalonnaise",
    "logic": "Fruit forward / Crisp acidity",
    "chef_note": "アリゴテはカシスリキュールと割って「キール（Kir）」にするのが定番。"
  },
  {
    "id": "ing_bourgogne_maconnais",
    "number": "12",
    "name_fr": "Mâconnais",
    "name_en": "Mâconnais",
    "name_ja": "マコネ",
    "region": "Bourgogne (Mâconnais)",
    "pin": {
      "x": 59,
      "y": 54
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "豚肉のロースト、白身魚のバターソテー",
    "science": "温暖な気候で育つシャルドネは、パイナップルやピーチなどのトロピカルなエステル香を豊富に含み、ふくよかな味わいを持つ。",
    "classification": "AOC Mâconnais (Vin blanc)",
    "logic": "Tropical esters / Ripe fruit",
    "chef_note": "プイィ・フュイッセなどの銘醸地を含む。コスパが良くビストロ料理に最適。"
  },
  {
    "id": "ing_champagne_reims",
    "number": "13",
    "name_fr": "Montagne de Reims",
    "name_en": "Montagne de Reims Champagne",
    "name_ja": "シャンパーニュ（モンターニュ・ド・ランス）",
    "region": "Champagne (Montagne de Reims)",
    "pin": {
      "x": 58,
      "y": 22
    },
    "properties": {
      "type": "スパークリング",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "アペリティフ、キャビア、肉のカルパッチョ",
    "science": "ピノ・ノワール（黒ブドウ）の比率が高く、アントシアニンは含まれないが、果皮由来のボディと豊かなアミノ酸により骨格のしっかりしたシャンパンとなる。",
    "classification": "AOC Champagne",
    "logic": "Pinot Noir dominant / Full body",
    "chef_note": "力強い味わいなので、魚介だけでなく白身肉の料理とも合わせられる。"
  },
  {
    "id": "ing_champagne_marne",
    "number": "14",
    "name_fr": "Vallée de la Marne",
    "name_en": "Vallée de la Marne Champagne",
    "name_ja": "シャンパーニュ（ヴァレ・ド・ラ・マルヌ）",
    "region": "Champagne (Vallée de la Marne)",
    "pin": {
      "x": 60,
      "y": 25
    },
    "properties": {
      "type": "スパークリング",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "フルーツタルト、パテ・ド・カンパーニュ",
    "science": "ピノ・ムニエ主体。フルーティーでしなやかな酸と豊かな果実味が特徴で、若いうちから親しみやすい風味成分を形成する。",
    "classification": "AOC Champagne",
    "logic": "Pinot Meunier dominant / Fruity",
    "chef_note": "親しみやすく、前菜全般をカバーする懐の広さがある。"
  },
  {
    "id": "ing_champagne_blancs",
    "number": "15",
    "name_fr": "Côte des Blancs",
    "name_en": "Côte des Blancs Champagne",
    "name_ja": "シャンパーニュ（コート・デ・ブラン）",
    "region": "Champagne (Côte des Blancs)",
    "pin": {
      "x": 61,
      "y": 27
    },
    "properties": {
      "type": "スパークリング",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "生牡蠣、ホタテのカルパッチョ",
    "science": "シャルドネ（白ブドウ）のみを使用（ブラン・ド・ブラン）。白亜質土壌からくる鋭いミネラルとシャープな酒石酸が際立ち、長期熟成で複雑なブリオッシュ香（酵母由来）を放つ。",
    "classification": "AOC Champagne (Blanc de Blancs)",
    "logic": "Chardonnay dominant / Minerality",
    "chef_note": "極めてエレガント。繊細な魚介料理の味を一切邪魔しない。"
  },
  {
    "id": "ing_champagne_bar",
    "number": "16",
    "name_fr": "Côte des Bar",
    "name_en": "Côte des Bar Champagne",
    "name_ja": "シャンパーニュ（コート・デ・バール）",
    "region": "Champagne (Côte des Bar)",
    "pin": {
      "x": 64,
      "y": 30
    },
    "properties": {
      "type": "スパークリング",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "チーズ（シャウルス）、シャルキュトリー",
    "science": "ブルゴーニュに近い南部エリア。ピノ・ノワール主体で、よりリッチで太陽を感じさせる果実の成熟度（高い糖度からのアルコール感）を持つ。",
    "classification": "AOC Champagne",
    "logic": "Southern terroir / Rich fruit",
    "chef_note": "地元の白カビチーズ「シャウルス」とのペアリングが定番。"
  },
  {
    "id": "ing_rhone_cote_rotie",
    "number": "17",
    "name_fr": "Côte-Rôtie",
    "name_en": "Côte-Rôtie",
    "name_ja": "コート・ロティ",
    "region": "Vallée du Rhône (Rhône Nord - Côte-Rôtie)",
    "pin": {
      "x": 66,
      "y": 60
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★★☆"
    },
    "cooking": "ジビエ、仔羊のロースト",
    "science": "シラーに少量のヴィオニエ（白ブドウ）を混醸する独特の製法。ヴィオニエのテルペン類（花のような香り）がシラーの胡椒香（ロトンディン）とスパイシーさを中和し、華やかさを付与する。",
    "classification": "AOC Côte-Rôtie (Vin rouge)",
    "logic": "Co-fermentation / Floral & Spicy",
    "chef_note": "「焼かれた丘」の名の通り日照が強く、力強いがヴィオニエのおかげで非常にエレガント。"
  },
  {
    "id": "ing_rhone_hermitage",
    "number": "18",
    "name_fr": "Hermitage",
    "name_en": "Hermitage",
    "name_ja": "エルミタージュ",
    "region": "Vallée du Rhône (Rhône Nord - Hermitage)",
    "pin": {
      "x": 67,
      "y": 64
    },
    "properties": {
      "type": "赤ワイン / 白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★★"
    },
    "cooking": "牛肉の赤ワイン煮、熟成肉",
    "science": "急斜面の花崗岩土壌で育つシラー。タンニンとアントシアニンが極めて濃密で、長期熟成により皮革や黒オリーブのような複雑なブーケを形成する。",
    "classification": "AOC Hermitage (Vin rouge / Vin blanc)",
    "logic": "Granite soil / Long aging potential",
    "chef_note": "ローヌ最高峰の赤。重厚でスパイシーなソースに負けない骨格を持つ。"
  },
  {
    "id": "ing_rhone_condrieu",
    "number": "19",
    "name_fr": "Condrieu",
    "name_en": "Condrieu",
    "name_ja": "コンドリュー",
    "region": "Vallée du Rhône (Rhône Nord - Condrieu)",
    "pin": {
      "x": 66,
      "y": 62
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "フォアグラ、アスパラガス、オマール海老",
    "science": "ヴィオニエ種100%。桃やアプリコット、白い花を思わせる非常に強いアロマ（テルペン類とエステル類）と、酸味が穏やかでオイリーなテクスチャーを持つ。",
    "classification": "AOC Condrieu (Vin blanc)",
    "logic": "Viognier / High aromatics",
    "chef_note": "香りが圧倒的。ソースを使わないシンプルな甲殻類のグリルに華やかさを添える。"
  },
  {
    "id": "ing_rhone_chateauneuf",
    "number": "20",
    "name_fr": "Châteauneuf-du-Pape",
    "name_en": "Châteauneuf-du-Pape",
    "name_ja": "シャトーヌフ・デュ・パプ",
    "region": "Vallée du Rhône (Rhône Sud - Châteauneuf-du-Pape)",
    "pin": {
      "x": 69,
      "y": 72
    },
    "properties": {
      "type": "赤ワイン / 白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★★",
      "body": "★★★★★"
    },
    "cooking": "カスレ、スパイスを効かせた肉料理",
    "science": "丸石（ガレ）が日中の熱を蓄える土壌。最大13品種のブドウをブレンド可能。グルナッシュ由来の高アルコールと甘苦いスパイス香が、複雑な化学反応のレイヤーを生む。",
    "classification": "AOC Châteauneuf-du-Pape (Vin rouge / Vin blanc)",
    "logic": "Multi-grape blend / High alcohol",
    "chef_note": "南ローヌの王様。ハーブやスパイスを多用したプロヴァンス風の煮込み料理に最適。"
  },
  {
    "id": "ing_rhone_gigondas",
    "number": "21",
    "name_fr": "Gigondas",
    "name_en": "Gigondas",
    "name_ja": "ジゴンダス",
    "region": "Vallée du Rhône (Rhône Sud - Gigondas)",
    "pin": {
      "x": 71,
      "y": 71
    },
    "properties": {
      "type": "赤ワイン / ロゼ",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "ジビエ、赤身肉のグリル",
    "science": "シャトーヌフに似るが標高が高く、昼夜の寒暖差によりグルナッシュに良質な酸と野性味（ガリーグの香り）が残る。",
    "classification": "AOC Gigondas (Vin rouge / Vin rosé)",
    "logic": "High altitude / Wild herbs (Garrigue)",
    "chef_note": "力強さとスパイシーさが特徴。胡椒を効かせたステーキとよく合う。"
  },
  {
    "id": "ing_rhone_vacqueyras",
    "number": "22",
    "name_fr": "Vacqueyras",
    "name_en": "Vacqueyras",
    "name_ja": "ヴァケラス",
    "region": "Vallée du Rhône (Rhône Sud - Vacqueyras)",
    "pin": {
      "x": 70,
      "y": 72
    },
    "properties": {
      "type": "赤ワイン / 白ワイン / ロゼ",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "バーベキュー、ラタトゥイユ",
    "science": "シラーの比率がやや高く、黒系果実とペッパーの香りが前面に出る。タンニンが豊富で骨太な構造を持つ。",
    "classification": "AOC Vacqueyras (Vin rouge / Vin blanc / Vin rosé)",
    "logic": "Robust structure / Syrah influence",
    "chef_note": "ジゴンダスより少し素朴で力強い。肉のグリルなど豪快な料理向け。"
  },
  {
    "id": "ing_loire_nantes",
    "number": "23",
    "name_fr": "Muscadet (Nantes)",
    "name_en": "Muscadet",
    "name_ja": "ミュスカデ（ナント）",
    "region": "Loire (Nantes)",
    "pin": {
      "x": 22,
      "y": 44
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★☆☆☆☆"
    },
    "cooking": "生牡蠣、ムール貝の白ワイン蒸し",
    "science": "シュール・リー製法（澱の上で熟成）により、酵母の自己融解によるアミノ酸とペプチドがワインに溶け込み、旨味と微炭酸の爽やかさを与える。",
    "classification": "AOC Muscadet (Vin blanc sec)",
    "logic": "Sur Lie aging / High acidity",
    "chef_note": "ロワール川河口のワイン。磯の香りがする魚介類を洗うように流し込むのに最適。"
  },
  {
    "id": "ing_loire_anjou",
    "number": "24",
    "name_fr": "Anjou",
    "name_en": "Anjou",
    "name_ja": "アンジュー",
    "region": "Loire (Anjou)",
    "pin": {
      "x": 30,
      "y": 43
    },
    "properties": {
      "type": "ロゼ / 白ワイン / 赤ワイン",
      "sweetness": "★★★☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "豚肉のリエット、アジア系スパイス料理（ロゼ）",
    "science": "やや甘口のロゼ（ロゼ・ダンジュー）が有名。シュナン・ブラン主体の白は、リンゴ酸のフレッシュさとほのかな残糖のバランスが良い。",
    "classification": "AOC Anjou (Vin rosé / Vin blanc / Vin rouge)",
    "logic": "Versatile / Residual sugar (Rosé)",
    "chef_note": "ロゼは甘みがあるため、エスニック料理やスパイスを使った前菜と合わせやすい。"
  },
  {
    "id": "ing_loire_saumur",
    "number": "25",
    "name_fr": "Saumur",
    "name_en": "Saumur",
    "name_ja": "ソミュール",
    "region": "Loire (Saumur)",
    "pin": {
      "x": 34,
      "y": 44
    },
    "properties": {
      "type": "赤ワイン / 白ワイン / スパークリング",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "鶏肉のロースト、マッシュルーム料理",
    "science": "石灰岩（テュフォー）土壌。カベルネ・フランの赤はピーマンのようなピラジン香を持ち、白やスパークリング（クレマン）はミネラル感が強い。",
    "classification": "AOC Saumur (Vin rouge / Vin blanc / Effervescent)",
    "logic": "Tuffeau limestone / Pyrazine notes",
    "chef_note": "ソミュール・シャンピニー（赤）は軽く冷やして飲むと、軽快な果実味が引き立つ。"
  },
  {
    "id": "ing_loire_touraine",
    "number": "26",
    "name_fr": "Touraine",
    "name_en": "Touraine",
    "name_ja": "トゥーレーヌ",
    "region": "Loire (Touraine)",
    "pin": {
      "x": 38,
      "y": 45
    },
    "properties": {
      "type": "白ワイン / 赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "山羊のチーズ（サント・モール）、川魚のソテー",
    "science": "ソーヴィニヨン・ブランのチオール類（パッションフルーツやグレープフルーツの香り）が豊かで、フレッシュな酸が山羊乳チーズの脂肪をすっきりと流す。",
    "classification": "AOC Touraine (Vin blanc / Vin rouge)",
    "logic": "Crisp Sauvignon / Thiol aromatics",
    "chef_note": "地元のシェーブルチーズとのマリアージュはフランスの基本中の基本。"
  },
  {
    "id": "ing_loire_sancerre",
    "number": "27",
    "name_fr": "Sancerre",
    "name_en": "Sancerre",
    "name_ja": "サンセール（サンセロワ）",
    "region": "Loire (Sancerrois)",
    "pin": {
      "x": 48,
      "y": 46
    },
    "properties": {
      "type": "白ワイン / 赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "クロタン・ド・シャヴィニョル、白身魚のハーブ焼き",
    "science": "シレックス（火打石）土壌由来の還元的な香り（スモーキーさ）と鋭角な酸味。ソーヴィニヨン・ブランのポテンシャルを極限まで引き出したクリーンな味わい。",
    "classification": "AOC Sancerre (Vin blanc / Vin rouge)",
    "logic": "Silex soil / Flinty minerality",
    "chef_note": "ハーブを使った料理や、レモンを絞りたくなるような魚介料理にレモンの代わりに合わせる。"
  },
  {
    "id": "ing_alsace_bas_rhin",
    "number": "28",
    "name_fr": "Alsace (Bas-Rhin)",
    "name_en": "Alsace (Bas-Rhin)",
    "name_ja": "アルザス（バ＝ラン）",
    "region": "Alsace (Bas-Rhin)",
    "pin": {
      "x": 84,
      "y": 26
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "シュークルート、タルト・フランベ",
    "science": "寒冷な気候で育つリースリングやシルヴァネールは、リンゴ酸主体の鋭い酸と純度の高い果実味（モノテルペン類）を持ち、豚肉の脂っこさを中和する。",
    "classification": "AOC Alsace (Vin blanc)",
    "logic": "Cool climate / Pure aromatics",
    "chef_note": "アルザス北部は軽快でフレッシュなスタイルが多い。郷土料理のシュークルートに欠かせない。"
  },
  {
    "id": "ing_alsace_haut_rhin",
    "number": "29",
    "name_fr": "Alsace (Haut-Rhin)",
    "name_en": "Alsace Grand Cru (Haut-Rhin)",
    "name_ja": "アルザス（オー＝ラン）",
    "region": "Alsace (Haut-Rhin)",
    "pin": {
      "x": 82,
      "y": 32
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★★☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "フォアグラ、マンステールチーズ、スパイシーな料理",
    "science": "より日照条件が良い南部。ゲヴュルツトラミネールのライチやバラの香気成分（ゲラニオールなど）が極めて高く、スパイシーさとオイリーなテクスチャーを持つ。",
    "classification": "AOC Alsace Grand Cru (Vin blanc)",
    "logic": "Rich aromatics / Full body white",
    "chef_note": "グラン・クリュが多く集まる。マンステールチーズ（ウォッシュタイプ）との組み合わせは絶品。"
  },
  {
    "id": "ing_provence_cotes",
    "number": "30",
    "name_fr": "Côtes de Provence",
    "name_en": "Côtes de Provence",
    "name_ja": "コート・ド・プロヴァンス",
    "region": "Provence (Côtes de Provence)",
    "pin": {
      "x": 74,
      "y": 78
    },
    "properties": {
      "type": "ロゼ",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "ブイヤベース、ニース風サラダ",
    "science": "ダイレクトプレス製法による淡いサーモンピンク色のロゼ。アントシアニン抽出を抑えつつ、グルナッシュやサンソーのフレッシュな酸味と海風由来の塩味を残す。",
    "classification": "AOC Côtes de Provence (Vin rosé)",
    "logic": "Direct press / Pale rosé",
    "chef_note": "地中海料理全般に合う万能ワイン。しっかりと冷やしてニンニクやオリーブオイルを使った料理と。"
  },
  {
    "id": "ing_provence_bandol",
    "number": "31",
    "name_fr": "Bandol",
    "name_en": "Bandol",
    "name_ja": "バンドール",
    "region": "Provence (Bandol)",
    "pin": {
      "x": 72,
      "y": 82
    },
    "properties": {
      "type": "赤ワイン / ロゼ",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★★"
    },
    "cooking": "仔羊の香草焼き、ジビエ",
    "science": "ムールヴェードル種主体。厚い果皮からの豊富なタンニンと高いアルコール度数を持ち、長期熟成によりなめし革やスパイスの複雑な香気を放つ。",
    "classification": "AOC Bandol (Vin rouge / Vin rosé)",
    "logic": "Mourvèdre dominant / Powerful structure",
    "chef_note": "プロヴァンス随一の力強い赤。ロゼも骨格がしっかりしており、食事を通して楽しめる。"
  },
  {
    "id": "ing_provence_cassis",
    "number": "32",
    "name_fr": "Cassis",
    "name_en": "Cassis",
    "name_ja": "カシ",
    "region": "Provence (Cassis)",
    "pin": {
      "x": 70,
      "y": 81
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "ウニ、地中海の白身魚",
    "science": "石灰質土壌で育つマルサンヌやクレレット（白ブドウ）。海からの湿った風により、ワインにヨード（塩分）のニュアンスと豊かなミネラルが溶け込む。",
    "classification": "AOC Cassis (Vin blanc)",
    "logic": "Limestone / Iodine notes",
    "chef_note": "プロヴァンスでは珍しく白ワインが有名。ブイヤベースには赤やロゼよりカシの白を推すシェフも多い。"
  },
  {
    "id": "ing_languedoc",
    "number": "33",
    "name_fr": "Languedoc",
    "name_en": "Languedoc",
    "name_ja": "ラングドック",
    "region": "Languedoc-Roussillon (Languedoc)",
    "pin": {
      "x": 48,
      "y": 76
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "カスレ、肉の煮込み",
    "science": "地中海性気候の豊富な日照により糖度が上がり、アルコール度数の高い力強い果実味が形成される。シラー、グルナッシュ、カリニャンのブレンドが主流。",
    "classification": "AOC Languedoc (Vin rouge)",
    "logic": "Sun-drenched / High extract",
    "chef_note": "南仏の太陽を感じる濃密な赤。コストパフォーマンスに優れ、日常の肉料理に合わせやすい。"
  },
  {
    "id": "ing_corbieres",
    "number": "34",
    "name_fr": "Corbières",
    "name_en": "Corbières",
    "name_ja": "コルビエール",
    "region": "Languedoc-Roussillon (Corbières)",
    "pin": {
      "x": 44,
      "y": 80
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "ジビエ、ソーセージのグリル",
    "science": "カリニャン種をマロラクティック発酵やマセラシオン・カルボニック（炭酸ガス浸漬法）で処理し、荒々しいタンニンを抑えつつ鮮やかな色素とベリー香を引き出す。",
    "classification": "AOC Corbières (Vin rouge)",
    "logic": "Carignan / Carbonic maceration",
    "chef_note": "野生のハーブ（ガリーグ）の香りが強く、野趣あふれる肉料理と相乗効果を生む。"
  },
  {
    "id": "ing_minervois",
    "number": "35",
    "name_fr": "Minervois",
    "name_en": "Minervois",
    "name_ja": "ミネルヴォワ",
    "region": "Languedoc-Roussillon (Minervois)",
    "pin": {
      "x": 45,
      "y": 78
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "鴨のロースト、黒オリーブのタプナード",
    "science": "シラーの比率が高めになることが多く、コルビエールよりもタンニンが滑らかで、スミレの花やブラックベリーの凝縮したアロマを持つ。",
    "classification": "AOC Minervois (Vin rouge)",
    "logic": "Smooth tannin / Syrah blend",
    "chef_note": "口当たりがビロードのように滑らか。濃いソースの鴨料理によく合う。"
  },
  {
    "id": "ing_roussillon",
    "number": "36",
    "name_fr": "Roussillon (Banyuls)",
    "name_en": "Roussillon / Banyuls",
    "name_ja": "ルーション（バニュルス）",
    "region": "Languedoc-Roussillon (Roussillon)",
    "pin": {
      "x": 42,
      "y": 83
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★★★★★",
      "alcohol": "★★★★★",
      "body": "★★★★★"
    },
    "cooking": "チョコレートデザート、ブルーチーズ",
    "science": "発酵途中にアルコールを添加して発酵を止める（ミュタージュ）。ブドウの天然の糖分が残り、酸化熟成によるナッツやドライフルーツ、カカオの香気成分が生じる。",
    "classification": "AOC Banyuls (Vin Doux Naturel)",
    "logic": "Mutage / Oxidative aging",
    "chef_note": "チョコレートとのペアリングが成立する数少ないワイン。食後酒として最適。"
  },
  {
    "id": "ing_sud_ouest_cahors",
    "number": "37",
    "name_fr": "Cahors",
    "name_en": "Cahors",
    "name_ja": "カオール",
    "region": "Sud-Ouest (Cahors)",
    "pin": {
      "x": 38,
      "y": 70
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★★"
    },
    "cooking": "鴨のコンフィ、トリュフ料理",
    "science": "マルベック（コット）種主体。「黒ワイン」と呼ばれるほどアントシアニン（色素）とタンニンが極めて濃く、長期熟成で重厚なタンパク質との親和性を発揮する。",
    "classification": "AOC Cahors (Vin rouge)",
    "logic": "Malbec / Extreme pigmentation",
    "chef_note": "非常に濃厚で力強い。南西地方の脂肪分豊かな郷土料理（鴨、フォアグラ）を洗い流す。"
  },
  {
    "id": "ing_sud_ouest_madiran",
    "number": "38",
    "name_fr": "Madiran",
    "name_en": "Madiran",
    "name_ja": "マディラン",
    "region": "Sud-Ouest (Madiran)",
    "pin": {
      "x": 32,
      "y": 76
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★★"
    },
    "cooking": "カスレ、牛ステーキ",
    "science": "タナ種（Tannat）。その名の通りタンニンが非常に豊富。ミクロ・ビュラージュ（微量酸素供給）技術により、強靭なタンニンを重合させ柔らかくする手法が取られる。",
    "classification": "AOC Madiran (Vin rouge)",
    "logic": "High Tannin / Micro-oxygenation",
    "chef_note": "若いうちは渋みが強いが、熟成すると素晴らしい骨格を見せる。肉の脂身と完璧に調ンダ調和する。"
  },
  {
    "id": "ing_sud_ouest_jurancon",
    "number": "39",
    "name_fr": "Jurançon",
    "name_en": "Jurançon",
    "name_ja": "ジュランソン",
    "region": "Sud-Ouest (Jurançon)",
    "pin": {
      "x": 30,
      "y": 80
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★★★★★",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "フォアグラのポワレ、ブルーチーズ",
    "science": "プティ・マンサン種。晩摘み（パスリヤージュ）により水分を蒸発させ糖度を凝縮。貴腐菌に頼らずとも高い糖度と、それを支える非常に強靭な酒石酸（酸味）を保持する。",
    "classification": "AOC Jurançon (Vin blanc doux)",
    "logic": "Late harvest / High acid & sugar",
    "chef_note": "ソーテルヌとは異なる、パイナップルやマンゴーのようなトロピカルな甘口。酸があるためベタつかない。"
  },
  {
    "id": "ing_sud_ouest_bergerac",
    "number": "40",
    "name_fr": "Bergerac",
    "name_en": "Bergerac",
    "name_ja": "ベルジュラック",
    "region": "Sud-Ouest (Bergerac)",
    "pin": {
      "x": 34,
      "y": 66
    },
    "properties": {
      "type": "赤ワイン / 白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "赤身肉のグリル、豚肉のソテー",
    "science": "ボルドーに隣接し、同じブドウ品種（カベルネ、メルロー）を使用。ボルドーより内陸のため昼夜の寒暖差があり、果実味がやや前面に出た親しみやすいバランスになる。",
    "classification": "AOC Bergerac (Vin rouge / Vin blanc)",
    "logic": "Bordeaux blend / Inland climate",
    "chef_note": "「ボルドーの弟分」。コスパが良く、デイリーのビストロ料理に気兼ねなく使える。"
  },
  {
    "id": "ing_jura_arbois",
    "number": "41",
    "name_fr": "Arbois",
    "name_en": "Arbois",
    "name_ja": "アルボワ",
    "region": "Jura (Arbois)",
    "pin": {
      "x": 72,
      "y": 48
    },
    "properties": {
      "type": "赤ワイン / 白ワイン / ロゼ",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "モルトー・ソーセージ、鶏肉とキノコの煮込み",
    "science": "プールサールやトゥルソーなどの地ブドウ。色が薄いが独特の土っぽさやスパイスの香りがあり、酸化的な熟成を経ることで複雑な旨味（アミノ酸）が付与される。",
    "classification": "AOC Arbois (Vin rouge / Vin blanc / Vin rosé)",
    "logic": "Indigenous grapes / Oxidative notes",
    "chef_note": "ジュラの赤は色が淡くロゼのようだが、味はしっかりしている。郷土の燻製ソーセージと合う。"
  },
  {
    "id": "ing_jura_chateau_chalon",
    "number": "42",
    "name_fr": "Château-Chalon",
    "name_en": "Château-Chalon (Vin Jaune)",
    "name_ja": "シャトー・シャロン（ヴァン・ジョーヌ）",
    "region": "Jura (Château-Chalon)",
    "pin": {
      "x": 71,
      "y": 50
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "鶏肉のヴァン・ジョーヌ煮込み（コック・オ・ヴァン・ジョーヌ）、コンテチーズ",
    "science": "サヴァニャン種を樽につぎ足しせずに6年以上熟成。産膜酵母（フルール・ド・ヴァン）の膜の下で酸化熟成し、ソトロンというクルミやカレー粉のような強烈な香気成分を生成する。",
    "classification": "AOC Château-Chalon (Vin Jaune)",
    "logic": "Flor aging / Sotolon aromatics",
    "chef_note": "フランスワインの異端児。コンテチーズやモリーユ茸を使ったクリーム煮込みには絶対不可欠。"
  },
  {
    "id": "ing_jura_etoile",
    "number": "43",
    "name_fr": "L’Étoile",
    "name_en": "L’Étoile",
    "name_ja": "レトワール",
    "region": "Jura (L’Étoile)",
    "pin": {
      "x": 70,
      "y": 51
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "川魚のクリームソース、チーズフォンデュ",
    "science": "星型のウミユリの化石を含む石灰質土壌。シャルドネを主体とし、ジュラ特有の酸化熟成のニュアンスを持ちつつも、極めてシャープな酸とミネラル感を併せ持つ。",
    "classification": "AOC L’Étoile (Vin blanc)",
    "logic": "Fossil limestone / Minerality",
    "chef_note": "レトワール（星）の名を持つエレガントな白。クリームを使った料理をスッキリとまとめる。"
  },
  {
    "id": "ing_savoie_chignin",
    "number": "44",
    "name_fr": "Chignin-Bergeron",
    "name_en": "Chignin-Bergeron",
    "name_ja": "シニャン・ベルジュロン",
    "region": "Savoie (Chignin-Bergeron)",
    "pin": {
      "x": 76,
      "y": 56
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★★☆"
    },
    "cooking": "グラタン、ボーフォールチーズ",
    "science": "ルーサンヌ（サヴォワでの呼称ベルジュロン）100%。アルプスの冷涼な気候ながら、南向きの急斜面で完熟し、アプリコットやハチミツの豊かなエステル香とリッチなボディを持つ。",
    "classification": "AOC Vin de Savoie Chignin-Bergeron",
    "logic": "Alpine Roussanne / Rich esters",
    "chef_note": "サヴォワの白の中でも特にふくよか。山のチーズを使ったグラタン料理と抜群に合う。"
  },
  {
    "id": "ing_savoie_apremont",
    "number": "45",
    "name_fr": "Apremont",
    "name_en": "Apremont",
    "name_ja": "アプルモン",
    "region": "Savoie (Apremont)",
    "pin": {
      "x": 75,
      "y": 57
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★☆☆☆☆"
    },
    "cooking": "チーズフォンデュ、ラクレット",
    "science": "ジャケール種主体。石灰岩の岩屑土壌で育ち、アルコール度数が低めで、極めてクリアな酸味と微炭酸（ガス残存）による爽快感を持つ。",
    "classification": "AOC Vin de Savoie Apremont",
    "logic": "Jacquère / Crisp alpine acid",
    "chef_note": "チーズフォンデュのベースに使い、さらに飲みながら合わせるのがサヴォワの伝統スタイル。"
  },
  {
    "id": "ing_savoie_crepy",
    "number": "46",
    "name_fr": "Crépy",
    "name_en": "Crépy",
    "name_ja": "クレピ",
    "region": "Savoie (Crépy)",
    "pin": {
      "x": 78,
      "y": 53
    },
    "properties": {
      "type": "白ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★☆☆☆",
      "body": "★☆☆☆☆"
    },
    "cooking": "レマン湖の魚料理、軽い前菜",
    "science": "シャスラ種を使用。レマン湖畔の微気候（ミクロクリマ）により、穏やかな酸と白い花やアーモンドの繊細な香りを生成する。",
    "classification": "AOC Crépy (Vin blanc)",
    "logic": "Lake microclimate / Floral Chasselas",
    "chef_note": "スイス国境近く。主張が強すぎないため、淡白な湖魚の料理の味を引き立てる。"
  },
  {
    "id": "ing_corse_patrimonio",
    "number": "47",
    "name_fr": "Patrimonio",
    "name_en": "Patrimonio",
    "name_ja": "パトリモニオ",
    "region": "Corse (Patrimonio)",
    "pin": {
      "x": 88,
      "y": 85
    },
    "properties": {
      "type": "赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★★☆",
      "body": "★★★★☆"
    },
    "cooking": "猪肉の煮込み、地中海風肉料理",
    "science": "ニエルキオ（サンジョヴェーゼのクローン）を使用。石灰粘土質土壌と海風の影響で、強いタンニンと酸を保ちながら、マキ（コルシカ特有の低木林）のスパイシーな香りを帯びる。",
    "classification": "AOC Patrimonio (Vin rouge)",
    "logic": "Nielluccio / Maquis aromatics",
    "chef_note": "コルシカ最古のAOC。肉厚でスパイシーな味わいは、野性味のあるジビエ料理に負けない。"
  },
  {
    "id": "ing_corse_ajaccio",
    "number": "48",
    "name_fr": "Ajaccio",
    "name_en": "Ajaccio",
    "name_ja": "アジャクシオ",
    "region": "Corse (Ajaccio)",
    "pin": {
      "x": 86,
      "y": 90
    },
    "properties": {
      "type": "赤ワイン / ロゼ",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★★☆☆"
    },
    "cooking": "仔羊のロースト、シャルキュトリー",
    "science": "シャカレッロ種主体。花崗岩土壌由来のミネラルと、色素が薄くタンニンが控えめながら、コショウや赤系果実の非常に高い芳香成分（テルペン類）を持つ。",
    "classification": "AOC Ajaccio (Vin rouge / Vin rosé)",
    "logic": "Sciaccarello / High aromatics",
    "chef_note": "エレガントでスパイシーな香りが特徴。コルシカ産の生ハム（コッパなど）と最高の相性。"
  },
  {
    "id": "ing_corse_vin_de_corse",
    "number": "49",
    "name_fr": "Vin de Corse",
    "name_en": "Vin de Corse",
    "name_ja": "ヴァン・ド・コルス",
    "region": "Corse (Vin de Corse)",
    "pin": {
      "x": 88,
      "y": 92
    },
    "properties": {
      "type": "白ワイン / ロゼ / 赤ワイン",
      "sweetness": "★☆☆☆☆",
      "alcohol": "★★★☆☆",
      "body": "★★☆☆☆"
    },
    "cooking": "魚介のグリル、ブロッチュチーズ",
    "science": "白はヴェルメンティーノ（マルヴォワジー・ド・コルス）主体。豊富な日照による果実の丸みと、地中海の風がもたらす海塩由来のミネラル感が、苦味を伴う爽やかな後味を作る。",
    "classification": "AOC Vin de Corse (Vin blanc / Vin rosé / Vin rouge)",
    "logic": "Vermentino / Saline finish",
    "chef_note": "白はフレッシュでミネラル豊か。コルシカのフレッシュチーズ「ブロッチュ」を使った料理に添える。"
  }
];
