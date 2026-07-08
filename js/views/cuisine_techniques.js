export const techniques = {
  sauter: {
    name_fr: "Sauter",
    name_en: "Sauté / Pan-fry",
    name_ja: "ソテー（炒め焼き）",
    def: "少量の油を用いて高温かつ短時間で食材を加熱する技法。表面を香ばしく焼き固め、旨味を閉じ込める。",
    temp: "160°C - 200°C",
    science: "メイラード反応による香気成分の生成と、急速な熱伝導による表面の結晶化。"
  },
  braiser: {
    name_fr: "Braiser",
    name_en: "Braise",
    name_ja: "ブレゼ（蒸し煮）",
    def: "少量の液体（ブイヨンやワイン）を加え、蓋をして密閉状態で低温かつ長時間加熱する技法。",
    temp: "85°C - 95°C",
    science: "湿分を保ちながら熱を加え、硬い結合理構造（コラーゲン）を水溶性のゼラチンへ変化させる。"
  },
  pocher: {
    name_fr: "Pocher",
    name_en: "Poach",
    name_ja: "ポシェ（茹でる）",
    def: "沸騰直前（気泡がわずかに立つ程度）の液体の中で食材を優しく加熱する技法。",
    temp: "70°C - 85°C",
    science: "急激なタンパク質凝固による身の縮みや乾燥を防ぎ、水分を保持してしっとり仕上げる。"
  },
  confire: {
    name_fr: "Confire",
    name_en: "Confit",
    name_ja: "コンフィ（低温の油脂煮）",
    def: "食材（主に肉や魚）を低温の油脂の中でゆっくりと時間をかけて加熱する技法。",
    temp: "75°C - 90°C",
    science: "水分の蒸発を防ぎつつ、肉内部の結合組織をゼラチン化し、油の浸透による防腐効果を高める。"
  },
  griller: {
    name_fr: "Griller",
    name_en: "Grill",
    name_ja: "グリエ（網焼き）",
    def: "直火または熱した格子（グリッド）の上で食材を直接加熱し、独特の焼き目をつける技法。",
    temp: "200°C以上",
    science: "強い放射熱によって短時間で表面に焼き目をつけ、内部の水分を逃がさないようにする。"
  },
  rotir: {
    name_fr: "Rôtir",
    name_en: "Roast",
    name_ja: "ロティ（ロースト）",
    def: "オーブンや串焼き機などの乾いた熱空気中で、油脂をかけながら食材の全体を均一に焼き上げる技法。",
    temp: "150°C - 220°C",
    science: "熱対流によって外側を香ばしく焼き上げ、脂肪層をゆっくり溶かしつつ内部へ熱を通す。"
  },
  mijoter: {
    name_fr: "Mijoter",
    name_en: "Simmer / Stew",
    name_ja: "ミジョテ（コトコト煮込む）",
    def: "弱火で液体を軽く波打たせる状態で、長時間じっくり煮込む技法。",
    temp: "85°C - 95°C",
    science: "水溶性の旨味成分をゆっくり抽出し、食材全体に味を染み込ませる。"
  },
  poeler: {
    name_fr: "Poêler",
    name_en: "Pan-sear",
    name_ja: "ポワレ（フライパン焼き）",
    def: "フライパンにバターや油をしき、表面に焼き色をつけながら、アロゼ（油をかける）して火を通す技法。",
    temp: "140°C - 180°C",
    science: "バターの乳化組織と食材の水分を調整し、ふっくらとしたテクスチャを維持する。"
  },
  gratiner: {
    name_fr: "Gratiner",
    name_en: "Gratin / Brown",
    name_ja: "グラチネ（グラタンにする）",
    def: "表面にチーズやパン粉、ソースを塗り、オーブンの上火で焼き色をつけて香ばしくする技法。",
    temp: "220°C以上",
    science: "タンパク質と糖のメイラード反応による膜形成と、脂質の熱酸化香の付与。"
  },
  friture: {
    name_fr: "Friture",
    name_en: "Deep-fry",
    name_ja: "フリチュール（揚げる）",
    def: "高温に熱した多量の油脂の中で食材を加熱する技法。表面を急速に脱水させ、パリッとした食感に仕上げる。",
    temp: "160°C - 190°C",
    science: "表面の水分が瞬時に蒸発して水蒸気バリアを作り、油の過度な浸透を防ぎつつ熱を伝える。"
  },
  embouter: {
    name_fr: "Embouter",
    name_en: "Sausage-filling",
    name_ja: "アンブテ（腸詰め）",
    def: "ひき肉や調味料を混ぜたファルス（詰め物）を豚や羊などの腸に詰める技法。ソーセージやアンドゥイエットの基本調理技術。",
    temp: "常温（加熱前調理）",
    science: "天然の腸繊維が内部の水分と肉汁を閉じ込め、加熱時に適度な圧力をかけて肉の弾力を生み出す。"
  },
  sous_vide: {
    name_fr: "Sous-vide",
    name_en: "Vacuum cooking / Sous-vide",
    name_ja: "真空低温調理",
    def: "食材と調味料を真空袋に密封し、正確に温度管理された温水中で加熱する技法。",
    temp: "54°C - 68°C",
    science: "タンパク質の凝固温度以下で精密に熱を通すことで、水分の損失を抑え極めてしっとりとした質感に仕上げる。"
  },
  saler: {
    name_fr: "Saler",
    name_en: "Curing / Salting",
    name_ja: "サレ（塩蔵・塩漬け）",
    def: "塩を直接まぶす、または塩水に浸けることで食材を脱水・長期保存可能にする技法。生ハムやコンフィの基礎処理。",
    temp: "冷暗所（加熱前調理）",
    science: "浸透圧によって食材から余分な水分を抽出し、微生物の繁殖を防ぐと同時に旨味を凝縮させる。"
  },
  mijoter: {
    name_fr: "Mijoter",
    name_en: "Simmer / Slow cook",
    name_ja: "ミジョテ（弱火煮込み）",
    def: "食材を液体の中で沸騰寸前の穏やかな火加減（とろ火）でコトコト煮込む技法。",
    temp: "85°C - 95°C",
    science: "タンパク質の急激な凝固を防ぎ、結合理構造を徐々に融解させ、旨味を液体へ優しく溶出させる。"
  },
  rotir_sur_braise: {
    name_fr: "Rôtir sur braise",
    name_en: "Roast over embers",
    name_ja: "ロティ・シュール・ブレーズ（炭火ロースト）",
    def: "薪や炭の直火による遠赤外線効果を利用し、表面を香ばしく焼き固めながら内部をジューシーに仕上げる技法。",
    temp: "180°C - 240°C",
    science: "木炭特有の熱輻射と揮発性フェノール化合物による薫香付与、および急激な表面糖化反応。"
  },
  emulser_au_pil_pil: {
    name_fr: "Émulsionner au pil-pil",
    name_en: "Pil-pil emulsification",
    name_ja: "ピルピル乳化（バスク式完全乳化）",
    def: "魚のゼラチン質とオリーブオイルを、熱と土鍋の微振動を利用して一切の乳化剤を使用せず完全乳化させるバスク独自の技法。",
    temp: "60°C - 70°C",
    science: "魚皮や顎肉（ココチャ）から溶け出た親水性ゼラチンコラーゲンと、疎水性オリーブオイルが物理的振動により均一なコロイド分散状態を形成する。"
  }
};
