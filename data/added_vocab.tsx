export interface Example {
  fr: string;
  en: string;
  ja: string;
}

export interface VocabularyItem {
  id: string;
  category: "Préposition" | "Adverbe" | "Conjonction";
  level: "A1" | "A2" | "B1" | "B2";
  tags: string[];
  french: string;
  english: string;
  japanese: string;
  definition_fr: string;
  is_professional: boolean;
  examples: Example[];
}

export const ADDED_VOCABULARY: VocabularyItem[] = [
  // ==========================================
  // PRÉPOSITIONS (前置詞)
  // ==========================================
  {
    id: "prep_sur",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Cuisine"],
    french: "sur",
    english: "on / upon",
    japanese: "(Prép) 〜の上に、〜に接して",
    definition_fr: "Indique la position sur une surface ou le support d'un objet.",
    is_professional: true,
    examples: [
      {
        fr: "Posez le poisson sur la planche à découper.",
        en: "Place the fish on the cutting board.",
        ja: "まな板の上に魚を置いてください。"
      }
    ]
  },
  {
    id: "prep_sous",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Cuisine"],
    french: "sous",
    english: "under / beneath",
    japanese: "(Prép) 〜の下に",
    definition_fr: "Indique une position inférieure par rapport à un objet.",
    is_professional: true,
    examples: [
      {
        fr: "Placez le bac inox sous le plan de travail.",
        en: "Place the stainless steel container under the worktop.",
        ja: "作業台の下にステンレスバットを置いてください。"
      }
    ]
  },
  {
    id: "prep_dans",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Cuisine"],
    french: "dans",
    english: "in / inside",
    japanese: "(Prép) 〜の中に",
    definition_fr: "Indique la présence ou l'introduction à l'intérieur d'un récipient ou d'un lieu.",
    is_professional: true,
    examples: [
      {
        fr: "Versez le lait chaud dans la casserole.",
        en: "Pour the hot milk into the saucepan.",
        ja: "片手鍋の中に温かい牛乳を注ぎ入れます。"
      }
    ]
  },
  {
    id: "prep_avec",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Moyen", "Cuisine"],
    french: "avec",
    english: "with / using",
    japanese: "(Prép) 〜と一緒に、〜を使って",
    definition_fr: "Marque l'accompagnement ou l'outil utilisé pour effectuer une tâche.",
    is_professional: true,
    examples: [
      {
        fr: "Fouettez la crème avec un fouet en inox bien propre.",
        en: "Whip the cream with a clean stainless steel whisk.",
        ja: "清潔なステンレス製ホイッパーを使って生クリームを泡立てます。"
      }
    ]
  },
  {
    id: "prep_sans",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Exclusion", "Restaurant"],
    french: "sans",
    english: "without",
    japanese: "(Prép) 〜なしで、〜抜きで",
    definition_fr: "Indique l'absence ou l'exclusion d'un ingrédient ou d'un objet.",
    is_professional: true,
    examples: [
      {
        fr: "Préparez cette salade sans oignon pour le client allergique.",
        en: "Prepare this salad without onion for the allergic customer.",
        ja: "アレルギーのお客様のために、このサラダは玉ねぎ抜きで準備してください。"
      }
    ]
  },
  {
    id: "prep_pour",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "But", "Cuisine"],
    french: "pour",
    english: "for / in order to",
    japanese: "(Prép) 〜のために、〜の目的で",
    definition_fr: "Indique la destination, l'usage ou le destinataire d'une préparation.",
    is_professional: true,
    examples: [
      {
        fr: "Ce couteau de chef est idéal pour trancher la viande.",
        en: "This chef's knife is ideal for slicing meat.",
        ja: "このシェフナイフは肉を薄切りにするのに最適です。"
      }
    ]
  },
  {
    id: "prep_par",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Moyen", "Cuisine"],
    french: "par",
    english: "by / through / per",
    japanese: "(Prép) 〜によって、〜経由で、〜ごとに",
    definition_fr: "Indique le moyen, la manière ou la répartition.",
    is_professional: true,
    examples: [
      {
        fr: "Commencez par éplucher tous les légumes de la soupe.",
        en: "Start by peeling all the soup vegetables.",
        ja: "まずスープ用の野菜の皮をすべてむくことから始めてください。"
      }
    ]
  },
  {
    id: "prep_en",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Matière", "Manière", "Cuisine"],
    french: "en",
    english: "in / into / made of",
    japanese: "(Prép) 〜で、〜の状態で、〜製で",
    definition_fr: "Exprime la matière, la forme d'une découpe ou un état.",
    is_professional: true,
    examples: [
      {
        fr: "Coupez les pommes de terre en petits dés réguliers.",
        en: "Cut the potatoes into small, even cubes.",
        ja: "じゃがいもを均一な小さなさいの目切りにしてください。"
      }
    ]
  },
  {
    id: "prep_a",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Lieu", "Cuisson", "Cuisine"],
    french: "à",
    english: "at / to / with (flavor or style)",
    japanese: "(Prép) 〜に、〜で、〜風味の",
    definition_fr: "Indique le lieu, la température, le mode de cuisson ou le parfum d'un plat.",
    is_professional: true,
    examples: [
      {
        fr: "Cuisez la tarte aux pommes au four à 180 degrés.",
        en: "Bake the apple tart in the oven at 180 degrees.",
        ja: "アップルタルトをオーブンで180度で焼き上げます。"
      }
    ]
  },
  {
    id: "prep_de",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Origine", "Quantité", "Cuisine"],
    french: "de",
    english: "of / from",
    japanese: "(Prép) 〜の、〜から（産地・原料）",
    definition_fr: "Indique la provenance, l'appartenance ou le contenu.",
    is_professional: true,
    examples: [
      {
        fr: "Ajoutez un filet de jus de citron frais.",
        en: "Add a drizzle of fresh lemon juice.",
        ja: "新鮮なレモン果汁をひとしずく加えてください。"
      }
    ]
  },
  {
    id: "prep_devant",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Restaurant"],
    french: "devant",
    english: "in front of",
    japanese: "(Prép) 〜の前に",
    definition_fr: "Indique la présence sur la face antérieure d'un objet ou d'un client.",
    is_professional: true,
    examples: [
      {
        fr: "Le serveur dresse l'assiette chaude devant le client.",
        en: "The server places the hot plate in front of the customer.",
        ja: "ウェイターはお客様の前に温かいお皿を盛り付けて出します。"
      }
    ]
  },
  {
    id: "prep_derriere",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Restaurant"],
    french: "derrière",
    english: "behind",
    japanese: "(Prép) 〜の後ろに",
    definition_fr: "Indique la position à l'arrière d'un lieu ou d'un comptoir.",
    is_professional: true,
    examples: [
      {
        fr: "Le barman range les bouteilles de sirop derrière le comptoir.",
        en: "The bartender stores the syrup bottles behind the counter.",
        ja: "バーテンダーはカウンターの後ろにシロップの瓶を収納します。"
      }
    ]
  },
  {
    id: "prep_chez",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Lieu", "Approvisionnement"],
    french: "chez",
    english: "at the shop/place of",
    japanese: "(Prép) 〜の店で、〜のところで",
    definition_fr: "Désigne la boutique, l'atelier ou l'exploitation d'un artisan/commerçant.",
    is_professional: true,
    examples: [
      {
        fr: "Le chef achète le fromage frais chez le crémier du marché.",
        en: "The chef buys fresh cheese at the market cheesemonger's.",
        ja: "シェフは市場の乳製品店（クレミエ）でフレッシュチーズを購入します。"
      }
    ]
  },
  {
    id: "prep_entre",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Position", "Technique"],
    french: "entre",
    english: "between",
    japanese: "(Prép) 〜の間に",
    definition_fr: "Indique une situation intermédiaire entre deux objets ou limites.",
    is_professional: true,
    examples: [
      {
        fr: "Étalez la pâte feuilletée entre deux feuilles de papier cuisson.",
        en: "Roll out the puff pastry between two sheets of baking paper.",
        ja: "クッキングシート2枚の間にパイ生地を挟んで伸ばします。"
      }
    ]
  },
  {
    id: "prep_vers",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Direction", "Temps"],
    french: "vers",
    english: "towards / around (time)",
    japanese: "(Prép) 〜の方へ、〜頃に",
    definition_fr: "Marque la direction du mouvement ou une approximation temporelle.",
    is_professional: true,
    examples: [
      {
        fr: "Versez le sirop chaud vers le centre de la cuve.",
        en: "Pour the hot syrup towards the center of the bowl.",
        ja: "温かいシロップをボウルの中央に向かって注ぎ入れます。"
      }
    ]
  },
  {
    id: "prep_contre",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Contact", "Technique"],
    french: "contre",
    english: "against",
    japanese: "(Prép) 〜に押し当てて、〜に対して",
    definition_fr: "Exprime la proximité immédiate ou le contact appuyé.",
    is_professional: true,
    examples: [
      {
        fr: "Plaquez la lame du couteau contre l'arête centrale du poisson.",
        en: "Press the knife blade against the central bone of the fish.",
        ja: "包丁の刃を魚の中骨にしっかりと押し当ててください。"
      }
    ]
  },
  {
    id: "prep_depuis",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Temps", "Cuisson"],
    french: "depuis",
    english: "since / for (duration)",
    japanese: "(Prép) 〜前から、〜以来",
    definition_fr: "Marque le point de départ d'une action qui continue dans le présent.",
    is_professional: true,
    examples: [
      {
        fr: "La sauce consommé mijote doucement depuis deux heures.",
        en: "The consommé sauce has been simmering gently for two hours.",
        ja: "コンソメソースは2時間前から弱火でじっくり煮込まれています。"
      }
    ]
  },
  {
    id: "prep_pendant",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Temps", "Cuisson"],
    french: "pendant",
    english: "during / for",
    japanese: "(Prép) 〜の間に、〜期間",
    definition_fr: "Désigne la durée complète d'un processus ou d'une cuisson.",
    is_professional: true,
    examples: [
      {
        fr: "Laissez reposer la pâte à brioche pendant trente minutes.",
        en: "Let the brioche dough rest for thirty minutes.",
        ja: "ブリオッシュ生地を30分間休ませてください。"
      }
    ]
  },
  {
    id: "prep_selon",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Condition", "Cuisine"],
    french: "selon",
    english: "according to / depending on",
    japanese: "(Prép) 〜に応じて、〜に従って",
    definition_fr: "Indique la conformité ou l'adaptation à une norme/préférence.",
    is_professional: true,
    examples: [
      {
        fr: "Assaisonnez le bouillon avec du sel et du poivre selon votre goût.",
        en: "Season the broth with salt and pepper according to your taste.",
        ja: "お好みに応じてブイヨンに塩・コショウで味付けしてください。"
      }
    ]
  },
  {
    id: "prep_a_cote_de",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Service"],
    french: "à côté de",
    english: "next to / beside",
    japanese: "(Prép) 〜の隣に、〜の側に",
    definition_fr: "Indique la proximité immédiate sur un même plan.",
    is_professional: true,
    examples: [
      {
        fr: "Placez le verre à eau juste à côté du verre à vin rouge.",
        en: "Place the water glass right next to the red wine glass.",
        ja: "水用グラスを赤ワイングラスのすぐ隣に配置してください。"
      }
    ]
  },
  {
    id: "prep_en_face_de",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Position", "Organisation"],
    french: "en face de",
    english: "opposite / facing",
    japanese: "(Prép) 〜の向かいに",
    definition_fr: "Indique une position vis-à-visの対面にあること。",
    is_professional: true,
    examples: [
      {
        fr: "Le poste de dressage se trouve juste en face de la zone de cuisson.",
        en: "The plating station is located directly opposite the cooking zone.",
        ja: "盛り付けコーナーは調理エリアのちょうど向かい側にあります。"
      }
    ]
  },
  {
    id: "prep_au_dessus_de",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Position", "Technique"],
    french: "au-dessus de",
    english: "above / over",
    japanese: "(Prép) 〜の上に（接触せず上方）",
    definition_fr: "Marque une position plus élevée sans contact direct.",
    is_professional: true,
    examples: [
      {
        fr: "Tenez la passoire fine au-dessus du cul-de-poule pour filtrer la sauce.",
        en: "Hold the fine strainer above the mixing bowl to filter the sauce.",
        ja: "ソースを漉すために、ボウルの上で細目ざるを保持してください。"
      }
    ]
  },
  {
    id: "prep_au_dessous_de",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Position", "Hygiène"],
    french: "au-dessous de",
    english: "below / under",
    japanese: "(Prép) 〜の下に、〜未満で",
    definition_fr: "Marque une position plus basse ou une valeur inférieure.",
    is_professional: true,
    examples: [
      {
        fr: "Conservez les préparations sensibles au-dessous de trois degrés.",
        en: "Store sensitive preparations below three degrees.",
        ja: "傷みやすい仕込み品は3度以下で保存してください。"
      }
    ]
  },
  {
    id: "prep_autour_de",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Position", "Dressage"],
    french: "autour de",
    english: "around",
    japanese: "(Prép) 〜のまわりに、周囲に",
    definition_fr: "Indique une disposition en cercle ou encerclant un élément central.",
    is_professional: true,
    examples: [
      {
        fr: "Disposez les légumes étuvés autour du filet de bœuf rôti.",
        en: "Arrange the steamed vegetables around the roasted beef fillet.",
        ja: "牛フィレ肉のローストの周りに蒸し野菜をあしらいます。"
      }
    ]
  },
  {
    id: "prep_au_milieu_de",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Position", "Dressage"],
    french: "au milieu de",
    english: "in the middle of",
    japanese: "(Prép) 〜の中央に、真ん中に",
    definition_fr: "Désigne le centre exact d'une surface ou d'une assiette.",
    is_professional: true,
    examples: [
      {
        fr: "Déposez une quenelle de glace au milieu de l'assiette à dessert.",
        en: "Place a scoop of ice cream in the middle of the dessert plate.",
        ja: "デザート皿の中央にアイスクリームのクネルを1つ置きます。"
      }
    ]
  },
  {
    id: "prep_pres_de",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Sécurité"],
    french: "près de",
    english: "near / close to",
    japanese: "(Prép) 〜の近くに",
    definition_fr: "Indique la faible distance spatiale.",
    is_professional: true,
    examples: [
      {
        fr: "Ne laissez pas le beurre doux près de la plaque de cuisson chaude.",
        en: "Do not leave the unsalted butter near the hot cooking plate.",
        ja: "無塩バターを熱い加熱プレートの近くに放置しないでください。"
      }
    ]
  },
  {
    id: "prep_loin_de",
    category: "Préposition",
    level: "A1",
    tags: ["Préposition", "Position", "Hygiène"],
    french: "loin de",
    english: "far from",
    japanese: "(Prép) 〜から遠くに、離して",
    definition_fr: "Exprime une grande distance ou la séparation obligatoire par sécurité.",
    is_professional: true,
    examples: [
      {
        fr: "Stockez les produits d'entretien loin de la réserve d'ingrédients.",
        en: "Store cleaning products far from the ingredient storage.",
        ja: "洗剤類は食材保管庫から遠く離れた場所に保管してください。"
      }
    ]
  },
  {
    id: "prep_jusqu_a",
    category: "Préposition",
    level: "A2",
    tags: ["Préposition", "Limite", "Cuisson"],
    french: "jusqu'à",
    english: "until / up to",
    japanese: "(Prép) 〜まで（限界・到達点）",
    definition_fr: "Indique le point d'aboutissement d'une action ou d'une température.",
    is_professional: true,
    examples: [
      {
        fr: "Chauffez le sirop de sucre jusqu'à cent dix degrés au thermomètre.",
        en: "Heat the sugar syrup up to one hundred and ten degrees on the thermometer.",
        ja: "シュガーシロップを温度計で110度になるまで加熱します。"
      }
    ]
  },

  // ==========================================
  // ADVERBES (副詞)
  // ==========================================
  {
    id: "adv_bien",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Manière", "Cuisine"],
    french: "bien",
    english: "well / thoroughly",
    japanese: "(Adv) よく、十分に、綺麗に",
    definition_fr: "Indique une action réalisée de façon correcte ou complète.",
    is_professional: true,
    examples: [
      {
        fr: "Mélangez bien la préparation pour obtenir une pâte lisse.",
        en: "Mix the preparation well to obtain a smooth batter.",
        ja: "滑らかな生地になるよう、生地をよく混ぜ合わせてください。"
      }
    ]
  },
  {
    id: "adv_mal",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Manière", "Qualité"],
    french: "mal",
    english: "badly / poorly",
    japanese: "(Adv) 悪く、不十分に",
    definition_fr: "Marque une exécution incorrecte ou insuffisante.",
    is_professional: true,
    examples: [
      {
        fr: "Si la viande est mal cuite, le client risque de la renvoyer.",
        en: "If the meat is poorly cooked, the customer might send it back.",
        ja: "肉の火の通し方が悪いと、お客様が焼き直しを求めて送り返す可能性があります。"
      }
    ]
  },
  {
    id: "adv_tres",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Intensité"],
    french: "très",
    english: "very",
    japanese: "(Adv) とても、大変",
    definition_fr: "Renforce le sens d'un adjectif ou d'un autre adverbe.",
    is_professional: true,
    examples: [
      {
        fr: "Ce bouillon de volaille est très parfumé et savoureux.",
        en: "This poultry broth is very flavorful and tasty.",
        ja: "この鶏のブイヨンはとても香りが高く味わい深いです。"
      }
    ]
  },
  {
    id: "adv_beaucoup",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Quantité"],
    french: "beaucoup",
    english: "a lot / much",
    japanese: "(Adv) たくさん、非常に",
    definition_fr: "Indique une grande quantité ou une forte intensité.",
    is_professional: true,
    examples: [
      {
        fr: "Le chef utilise beaucoup d'herbes fraîches au printemps.",
        en: "The chef uses a lot of fresh herbs in the spring.",
        ja: "シェフは春になると新鮮なハーブをたくさん使用します。"
      }
    ]
  },
  {
    id: "adv_peu",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Quantité"],
    french: "peu",
    english: "little / a little",
    japanese: "(Adv) 少し、わずかに",
    definition_fr: "Indique une petite quantité.",
    is_professional: true,
    examples: [
      {
        fr: "Ajoutez un peu de sel fin dans la pâte à crêpes.",
        en: "Add a little fine salt into the crepe batter.",
        ja: "クレープ生地に細塩を少量加えてください。"
      }
    ]
  },
  {
    id: "adv_trop",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Intensité", "Attention"],
    french: "trop",
    english: "too / too much",
    japanese: "(Adv) 〜すぎる、過剰に",
    definition_fr: "Indique un excès dépassant ce qui est souhaitable.",
    is_professional: true,
    examples: [
      {
        fr: "Attention, cette réduction de jus est trop salée.",
        en: "Be careful, this juice reduction is too salty.",
        ja: "注意してください。この煮詰めたソース（ジュ）は塩分が強すぎます。"
      }
    ]
  },
  {
    id: "adv_assez",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Quantité", "Suffisance"],
    french: "assez",
    english: "enough / sufficiently",
    japanese: "(Adv) 十分に、かなり",
    definition_fr: "Indique une quantité suffisante ou une intensité modérée.",
    is_professional: true,
    examples: [
      {
        fr: "La pâte est désormais assez souple pour être étalée.",
        en: "The dough is now flexible enough to be rolled out.",
        ja: "生地はもう伸ばすのに十分柔らかくなっています。"
      }
    ]
  },
  {
    id: "adv_toujours",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Fréquence", "Hygiène"],
    french: "toujours",
    english: "always",
    japanese: "(Adv) 常に、いつも",
    definition_fr: "Indique une constance sans exception dans le temps.",
    is_professional: true,
    examples: [
      {
        fr: "Désinfectez toujours vos mains avant de dresser les assiettes.",
        en: "Always sanitize your hands before plating the dishes.",
        ja: "お皿に盛り付ける前は常に手を消毒してください。"
      }
    ]
  },
  {
    id: "adv_souvent",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Fréquence"],
    french: "souvent",
    english: "often",
    japanese: "(Adv) よく、しばしば",
    definition_fr: "Indique une grande fréquence répétée.",
    is_professional: true,
    examples: [
      {
        fr: "Le chef de partie vérifie souvent la température du four.",
        en: "The station chef often checks the oven temperature.",
        ja: "部門シェフはしばしばオーブンの設定温度を確認します。"
      }
    ]
  },
  {
    id: "adv_jamais",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Négation", "Sécurité"],
    french: "jamais",
    english: "never",
    japanese: "(Adv) 決して〜ない",
    definition_fr: "Exprime l'absence totale de survenance d'un fait.",
    is_professional: true,
    examples: [
      {
        fr: "Ne laissez jamais un couteau aiguisé au fond du bac de plonge.",
        en: "Never leave a sharp knife at the bottom of the washing sink.",
        ja: "研いだ包丁を洗い場（ plonge ）のシンクの底に放置することは絶対におやめください。"
      }
    ]
  },
  {
    id: "adv_parfois",
    category: "Adverbe",
    level: "A2",
    tags: ["Adverbe", "Fréquence"],
    french: "parfois",
    english: "sometimes",
    japanese: "(Adv) ときどき、たまに",
    definition_fr: "Indique une fréquence occasionnelle.",
    is_professional: true,
    examples: [
      {
        fr: "Nous proposons parfois du poisson sauvage selon l'arrivage de la marée.",
        en: "We sometimes offer wild fish depending on the daily catch.",
        ja: "仕入れ状況に応じて、ときどき天然の魚を提供します。"
      }
    ]
  },
  {
    id: "adv_deja",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Temps"],
    french: "déjà",
    english: "already",
    japanese: "(Adv) すでに、もう",
    definition_fr: "Marque l'accomplissement d'un fait plus tôt que prévu.",
    is_professional: true,
    examples: [
      {
        fr: "L'eau bout déjà dans la grande marmite inox.",
        en: "The water is already boiling in the large stainless steel pot.",
        ja: "大きなステンレス鍋の中の水はすでに沸騰しています。"
      }
    ]
  },
  {
    id: "adv_encore",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Temps", "Quantité"],
    french: "encore",
    english: "still / again / more",
    japanese: "(Adv) まだ、さらに、もう一度",
    definition_fr: "Indique la continuation d'un état ou un ajout.",
    is_professional: true,
    examples: [
      {
        fr: "Laissez réduire la sauce encore deux minutes sur feu doux.",
        en: "Let the sauce reduce for two more minutes on low heat.",
        ja: "ソースを弱火でさらに2分間煮詰めさせてください。"
      }
    ]
  },
  {
    id: "adv_maintenant",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Temps", "Service"],
    french: "maintenant",
    english: "now",
    japanese: "(Adv) 今、ただちに",
    definition_fr: "Désigne le moment présent ou l'immédiateté d'un envoi.",
    is_professional: true,
    examples: [
      {
        fr: "Envoyez l'entrée chaude à la table quatre maintenant !",
        en: "Send the hot starter to table four now!",
        ja: "ただちに4番テーブルへ温かい前菜をお持ち（発送）してください！"
      }
    ]
  },
  {
    id: "adv_ici",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Lieu"],
    french: "ici",
    english: "here",
    japanese: "(Adv) ここで、ここに",
    definition_fr: "Désigne l'endroit où se trouve le locuteur.",
    is_professional: true,
    examples: [
      {
        fr: "Posez le plateau de vaisselle propre juste ici.",
        en: "Set the tray of clean dishes right here.",
        ja: "きれいな食器のトレーをちょうどここに置いてください。"
      }
    ]
  },
  {
    id: "adv_ensemble",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Manière", "Technique"],
    french: "ensemble",
    english: "together",
    japanese: "(Adv) 一緒に、併せて",
    definition_fr: "Marque la réunion ou le mélange simultané de plusieurs éléments.",
    is_professional: true,
    examples: [
      {
        fr: "Fouettez vigoureusement le sucre semoule et les jaunes d'œufs ensemble.",
        en: "Vigorously whisk the granulated sugar and egg yolks together.",
        ja: "グラニュー糖と卵黄を一緒に力強く泡立てます。"
      }
    ]
  },
  {
    id: "adv_vite",
    category: "Adverbe",
    level: "A1",
    tags: ["Adverbe", "Vitesse", "Cuisine"],
    french: "vite",
    english: "quickly / fast",
    japanese: "(Adv) 早く、迅速に",
    definition_fr: "Caractérise une vitesse d'exécution élevée nécessaire en coup de feu.",
    is_professional: true,
    examples: [
      {
        fr: "Travaillez vite pour éviter que le soufflé au chocolat ne retombe.",
        en: "Work fast to prevent the chocolate souffle from deflating.",
        ja: "チョコレートのスフレが萎んでしまわないよう、手早く作業してください。"
      }
    ]
  },
  {
    id: "adv_lentement",
    category: "Adverbe",
    level: "A2",
    tags: ["Adverbe", "Vitesse", "Technique"],
    french: "lentement",
    english: "slowly",
    japanese: "(Adv) ゆっくりと、時間をかけて",
    definition_fr: "Indique une vitesse réduite pour assurer la précision d'une émulsion.",
    is_professional: true,
    examples: [
      {
        fr: "Versez l'huile neutre très lentement en mince filet pour réussir la mayonnaise.",
        en: "Pour the neutral oil very slowly in a thin stream to succeed with the mayonnaise.",
        ja: "マヨネーズを成功させるために、味のない油（サラダ油等）を細い糸のようにゆっくり注ぎます。"
      }
    ]
  },

  // ==========================================
  // CONJONCTIONS (接続詞)
  // ==========================================
  {
    id: "conj_et",
    category: "Conjonction",
    level: "A1",
    tags: ["Conjonction", "Liaison"],
    french: "et",
    english: "and",
    japanese: "(Conj) 〜と、そして",
    definition_fr: "Reliant deux mots ou propositions de même fonction.",
    is_professional: true,
    examples: [
      {
        fr: "Assaisonnez la farce avec du sel et du poivre moulu.",
        en: "Season the stuffing with salt and ground pepper.",
        ja: "詰め物（ファルス）に塩と挽きコショウで味付けします。"
      }
    ]
  },
  {
    id: "conj_ou",
    category: "Conjonction",
    level: "A1",
    tags: ["Conjonction", "Choix", "Service"],
    french: "ou",
    english: "or",
    japanese: "(Conj) または、あるいは",
    definition_fr: "Marque une alternative entre deux possibilités.",
    is_professional: true,
    examples: [
      {
        fr: "Désirez-vous de l'eau minérale plate ou gazeuse ?",
        en: "Would you like still or sparkling mineral water?",
        ja: "ミネラルウォーターはガスなし（プレーン）とガス入りのどちらになさいますか？"
      }
    ]
  },
  {
    id: "conj_mais",
    category: "Conjonction",
    level: "A1",
    tags: ["Conjonction", "Opposition"],
    french: "mais",
    english: "but",
    japanese: "(Conj) しかし、だが",
    definition_fr: "Marque une restriction, une nuance ou une opposition.",
    is_professional: true,
    examples: [
      {
        fr: "Ce plat traditionnel est simple mais particulièrement savoureux.",
        en: "This traditional dish is simple but particularly tasty.",
        ja: "この伝統料理はシンプルですが、特に味わい深いです。"
      }
    ]
  },
  {
    id: "conj_donc",
    category: "Conjonction",
    level: "A2",
    tags: ["Conjonction", "Conséquence"],
    french: "donc",
    english: "so / therefore",
    japanese: "(Conj) したがって、だから",
    definition_fr: "Exprime une conclusion ou une conséquence logique.",
    is_professional: true,
    examples: [
      {
        fr: "Le poisson a atteint la bonne température à cœur, nous pouvons donc le dresser.",
        en: "The fish has reached the right core temperature, so we can plate it.",
        ja: "魚の中心温度が適温に達したため、お皿に盛り付けることができます。"
      }
    ]
  },
  {
    id: "conj_car",
    category: "Conjonction",
    level: "A2",
    tags: ["Conjonction", "Explication"],
    french: "car",
    english: "for / because",
    japanese: "(Conj) なぜなら、〜だからだ",
    definition_fr: "Introduit l'explication ou la justification d'un fait.",
    is_professional: true,
    examples: [
      {
        fr: "Réduisez l'intensité du feu car le beurre risque de brûler.",
        en: "Reduce the heat because the butter might burn.",
        ja: "バターが焦げるおそれがあるため、火力を弱めてください。"
      }
    ]
  },
  {
    id: "conj_ni",
    category: "Conjonction",
    level: "A2",
    tags: ["Conjonction", "Négation", "Service"],
    french: "ni",
    english: "neither / nor",
    japanese: "(Conj) 〜も…もない（否定の列挙）",
    definition_fr: "Sert à coordonner des éléments niés.",
    is_professional: true,
    examples: [
      {
        fr: "Ce potage végétalien ne contient ni crème ni beurre.",
        en: "This vegan soup contains neither cream nor butter.",
        ja: "このヴィーガンスープには生クリームもバターも含まれていません。"
      }
    ]
  },
  {
    id: "conj_parce_que",
    category: "Conjonction",
    level: "A2",
    tags: ["Conjonction", "Cause"],
    french: "parce que",
    english: "because",
    japanese: "(Conj) なぜなら〜だから",
    definition_fr: "Introduit une proposition exprimant la cause.",
    is_professional: true,
    examples: [
      {
        fr: "On plonge les légumes dans la glace parce que cela stoppe la cuisson immédiatement.",
        en: "We plunge vegetables into ice because it stops cooking immediately.",
        ja: "野菜を氷水に浸すのは、加熱（火の通り）をただちに止めるためです。"
      }
    ]
  },
  {
    id: "conj_si",
    category: "Conjonction",
    level: "A1",
    tags: ["Conjonction", "Condition", "Technique"],
    french: "si",
    english: "if",
    japanese: "(Conj) もし〜なら",
    definition_fr: "Exprime une condition ou une hypothèse.",
    is_professional: true,
    examples: [
      {
        fr: "Si la sauce béchamel est trop épaisse, détendez-la avec un peu de lait chaud.",
        en: "If the bechamel sauce is too thick, loosen it with a little hot milk.",
        ja: "ベシャメルソースが重すぎる（固すぎる）場合は、少量の温かい牛乳で伸ばしてください。"
      }
    ]
  },
  {
    id: "conj_quand",
    category: "Conjonction",
    level: "A1",
    tags: ["Conjonction", "Temps"],
    french: "quand",
    english: "when",
    japanese: "(Conj) 〜するとき",
    definition_fr: "Indique le moment où une action se réalise.",
    is_professional: true,
    examples: [
      {
        fr: "Retirez la casserole du feu quand le mélange commence à frémir.",
        en: "Remove the pan from the heat when the mixture begins to simmer.",
        ja: "混合物がフツフツと泡立ち始めたら（煮立ち始めたら）鍋を火から外してください。"
      }
    ]
  },
  {
    id: "conj_pendant_que",
    category: "Conjonction",
    level: "A2",
    tags: ["Conjonction", "Simultanéité"],
    french: "pendant que",
    english: "while / as",
    japanese: "(Conj) 〜している間に",
    definition_fr: "Exprime la simultanéité de deux actions.",
    is_professional: true,
    examples: [
      {
        fr: "Émincez les champignons de paris pendant que l'eau des pâtes chauffe.",
        en: "Slice the button mushrooms while the pasta water heats up.",
        ja: "パスタの湯が沸く間にマッシュルームを薄切りにします。"
      }
    ]