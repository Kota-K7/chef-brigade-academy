// Region relationships (Links only, no text definition)
export const regionRelations = {
  reg_normandie: {
    dishes: ["sole_normande", "poulet_vallee_d_auge"],
    ingredients: ["ing_camembert", "ing_pont_leveque", "ing_livarot", "ing_neufchatel", "apple"],
    techniques: ["pocher", "sauter"],
    sauces: ["sauce_creme", "sauce_normande"]
  },
  reg_bourgogne: {
    dishes: ["beef_bourguignon", "escargots_persillade", "coq_au_vin"],
    ingredients: ["beef_charolais", "mustard_dijon", "ing_epoisses", "ing_charolais", "ing_comte", "ing_morbier", "ing_mont_d_or", "ing_bourgogne_chablis", "ing_bourgogne_cotes_de_nuits", "ing_bourgogne_cotes_de_beaune", "ing_bourgogne_chalonnaise", "ing_bourgogne_maconnais"],
    techniques: ["braiser", "mijoter"],
    sauces: ["sauce_vin_rouge"]
  },
  reg_provence: {
    dishes: ["bouillabaisse", "ratatouille", "salade_nicoise"],
    ingredients: ["oil_olive", "herbes_de_provence", "ing_banon", "ing_bleu_queyras", "ing_provence_cotes", "ing_provence_bandol", "ing_provence_cassis"],
    techniques: ["mijoter", "griller"],
    sauces: ["rouille", "vinaigrette"]
  },
  reg_alsace: {
    dishes: ["choucroute_garnie", "flammekueche", "baeckeoffe"],
    ingredients: ["sauerkraut", "strasbourg_sausage", "ing_munster", "ing_alsace_bas_rhin", "ing_alsace_haut_rhin"],
    techniques: ["braiser", "mijoter"],
    sauces: []
  },
  reg_bretagne: {
    dishes: ["galette_sarrasin", "cotriade", "kouign_amann"],
    ingredients: ["buckwheat_flour", "salted_butter"],
    techniques: ["poeler", "griller"],
    sauces: ["beurre_blanc"]
  },
  reg_ile_de_france: {
    dishes: ["pot_au_feu", "soupe_oignon", "entrecote_bercy"],
    ingredients: ["mushroom_paris", "ing_brie_meaux", "ing_brie_melun"],
    techniques: ["mijoter", "griller"],
    sauces: ["sauce_bercy"]
  },
  reg_aquitaine: {
    dishes: ["confit_canard", "cassoulet", "magret_canard", "ttoro_basque", "axoa_de_veau", "poulet_basquaise"],
    ingredients: ["foie_gras", "duck", "cut_kokotxa_de_merlu", "ing_ossau_iraty", "ing_roquefort", "ing_rocamadour", "ing_bordeaux_medoc", "ing_bordeaux_graves", "ing_bordeaux_st_emilion", "ing_bordeaux_pomerol", "ing_bordeaux_sauternes", "ing_sud_ouest_cahors", "ing_sud_ouest_madiran", "ing_sud_ouest_jurancon", "ing_sud_ouest_bergerac"],
    techniques: ["confire", "braiser", "mijoter", "rotir_sur_braise"],
    sauces: ["sauce_piperade", "sauce_encre_basque"]
  },
  reg_rhone_alpes: {
    dishes: ["quenelle_brochet", "poulet_morilles", "gratin_dauphinois"],
    ingredients: ["poultry_bresse", "sausage_lyon", "ing_reblochon", "ing_beaufort", "ing_abondance", "ing_fourme_ambert", "ing_saint_nectaire", "ing_cantal", "ing_rhone_cote_rotie", "ing_rhone_hermitage", "ing_rhone_condrieu", "ing_rhone_chateauneuf", "ing_rhone_gigondas", "ing_rhone_vacqueyras", "ing_jura_arbois", "ing_jura_chateau_chalon", "ing_jura_etoile", "ing_savoie_chignin", "ing_savoie_apremont", "ing_savoie_crepy"],
    techniques: ["pocher", "braiser", "gratiner"],
    sauces: ["sauce_nantua", "sauce_supreme"]
  },
  reg_loire: {
    dishes: ["rillettes_tours", "brochet_beurre_blanc", "tarte_tatin"],
    ingredients: ["river_fish", "ing_sainte_maure", "ing_crottin_chavignol", "ing_crottin", "ing_valencay", "ing_pouligny", "ing_selles_sur_cher", "ing_loire_nantes", "ing_loire_anjou", "ing_loire_saumur", "ing_loire_touraine", "ing_loire_sancerre"],
    techniques: ["confire", "pocher"],
    sauces: ["beurre_blanc"]
  },
  reg_champagne: {
    dishes: ["potee_champenoise", "biscuits_roses"],
    ingredients: ["ham_ardennes", "ing_champagne_reims", "ing_champagne_marne", "ing_champagne_blancs", "ing_champagne_bar"],
    techniques: ["braiser", "mijoter"],
    sauces: []
  },
  reg_languedoc: {
    dishes: ["cassoulet", "brandade_morue", "tielle_setoise"],
    ingredients: ["lingot_bean", "anchovy", "ing_languedoc", "ing_corbieres", "ing_minervois", "ing_roussillon"],
    techniques: ["braiser", "mijoter"],
    sauces: []
  },
  reg_corse: {
    dishes: ["civet_sanglier", "fiadone", "veau_olives"],
    ingredients: ["chestnut_flour", "lonzu_charcuterie", "ing_brocciu", "ing_corse_patrimonio", "ing_corse_ajaccio", "ing_corse_vin_de_corse"],
    techniques: ["braiser", "mijoter"],
    sauces: []
  },
  reg_hauts_de_france: {
    dishes: ["carbonnade_flamande", "potjevleesch", "moules_frites"],
    ingredients: ["ing_maroilles", "endive"],
    techniques: ["braiser", "mijoter"],
    sauces: ["sauce_biere"]
  }
};

// Cut relationships (Links only, no text definition)
export const cutRelations = {
  // Beef Cuts
  cut_filet: {
    techniques: ["griller", "rotir", "sauter"],
    science: ["muscle_fibers", "low_collagen"],
    sauces: ["sauce_bearnaise", "sauce_madere"],
    dishes: ["tournedos_rossini"]
  },
  cut_rumsteck: {
    techniques: ["griller", "rotir"],
    science: ["iron_taste"],
    sauces: ["sauce_poivre"],
    dishes: []
  },
  cut_aiguillette: {
    techniques: ["rotir", "griller"],
    science: ["fat_insulation"],
    sauces: [],
    dishes: []
  },
  cut_palette: {
    techniques: ["braiser", "mijoter"],
    science: ["collagen_emulsification"],
    sauces: ["sauce_chasseur"],
    dishes: []
  },
  cut_poitrine: {
    techniques: ["braiser", "mijoter"],
    science: ["collagen_gelatinization"],
    sauces: [],
    dishes: ["pot_au_feu"]
  },
  cut_langue: {
    techniques: ["braiser", "mijoter", "sauter"],
    science: ["collagen_gelatinization"],
    sauces: ["sauce_gribiche", "sauce_madere"],
    dishes: []
  },
  cut_onglet: {
    techniques: ["griller", "sauter"],
    science: ["muscle_fibers"],
    sauces: ["sauce_echalote"],
    dishes: []
  },
  cut_foie: {
    techniques: ["sauter"],
    science: ["protein_coagulation"],
    sauces: [],
    dishes: ["pate_de_campagne"]
  },
  cut_tripe: {
    techniques: ["braiser", "mijoter"],
    science: ["collagen_breakdown"],
    sauces: [],
    dishes: ["tripes_a_la_mode_de_caen"]
  },
  cut_boyaux: {
    techniques: ["griller", "embouter"],
    science: ["curing_and_fermentation"],
    sauces: [],
    dishes: ["andouillette"]
  },

  // Poultry Cuts
  cut_chicken_breast: {
    techniques: ["pocher", "sauter", "sous_vide"],
    science: ["moisture_loss", "protein_coagulation"],
    sauces: ["sauce_supreme"],
    dishes: ["supreme_de_volaille"]
  },
  cut_chicken_tender: {
    techniques: ["sauter", "friture"],
    science: ["short_cook"],
    sauces: [],
    dishes: []
  },
  cut_chicken_thigh: {
    techniques: ["rotir", "braiser", "mijoter"],
    science: ["collagen_gelatinization"],
    sauces: ["sauce_chasseur"],
    dishes: ["coq_au_vin"]
  },
  cut_chicken_shoulder: {
    techniques: ["sauter", "braiser"],
    science: ["balanced_meat"],
    sauces: [],
    dishes: []
  },
  cut_chicken_drumette: {
    techniques: ["rotir", "griller"],
    science: ["bone_in_cooking"],
    sauces: [],
    dishes: []
  },
  cut_chicken_wing_joint: {
    techniques: ["confire", "rotir"],
    science: ["collagen_gelatinization"],
    sauces: [],
    dishes: []
  },
  cut_chicken_wing: {
    techniques: ["mijoter", "rotir"],
    science: ["gelatin_extraction"],
    sauces: [],
    dishes: ["fond_de_volaille"]
  },
  cut_chicken_skin: {
    techniques: ["rotir", "sauter"],
    science: ["fat_rendering", "crispy_skin"],
    sauces: [],
    dishes: []
  },
  cut_chicken_heart: {
    techniques: ["griller"],
    science: ["muscle_fibers"],
    sauces: [],
    dishes: []
  },
  cut_chicken_cardiac_base: {
    techniques: ["braiser", "mijoter"],
    science: ["cream_affinity"],
    sauces: [],
    dishes: []
  },
  cut_chicken_liver: {
    techniques: ["sauter"],
    science: ["moisture_loss"],
    sauces: [],
    dishes: ["pate_de_foie_de_volaille"]
  },
  cut_chicken_gizzard: {
    techniques: ["confire", "braiser"],
    science: ["muscle_fibers"],
    sauces: [],
    dishes: ["salade_landaise"]
  },
  cut_chicken_tail: {
    techniques: ["rotir", "griller"],
    science: ["fat_rendering"],
    sauces: [],
    dishes: []
  },
  cut_chicken_cartilage_yagen: {
    techniques: ["mijoter"],
    science: ["gelatin_extraction"],
    sauces: [],
    dishes: ["fond_de_volaille"]
  },
  cut_chicken_cartilage_knee: {
    techniques: ["mijoter"],
    science: ["gelatin_extraction"],
    sauces: [],
    dishes: ["fond_de_volaille"]
  },

  // Pork Cuts
  cut_pork_loin: {
    techniques: ["rotir", "sauter"],
    science: ["moisture_loss"],
    sauces: ["sauce_charcutiere"],
    dishes: []
  },
  cut_pork_tenderloin: {
    techniques: ["sauter", "rotir"],
    science: ["protein_coagulation"],
    sauces: ["sauce_moutarde"],
    dishes: []
  },
  cut_pork_shoulder_loin: {
    techniques: ["braiser", "rotir"],
    science: ["fat_and_lean_interweave"],
    sauces: [],
    dishes: []
  },
  cut_pork_belly: {
    techniques: ["braiser", "saler", "rotir"],
    science: ["curing_and_fermentation"],
    sauces: [],
    dishes: ["pate_de_campagne", "petit_sale_aux_lentilles"]
  },
  cut_pork_ham: {
    techniques: ["saler", "rotir"],
    science: ["curing_and_fermentation"],
    sauces: [],
    dishes: ["jambon_blanc", "jambon_cru"]
  },
  cut_pork_cheek: {
    techniques: ["confire", "braiser"],
    science: ["collagen_gelatinization"],
    sauces: [],
    dishes: []
  },
  cut_pork_liver: {
    techniques: ["sauter"],
    science: ["emulsification"],
    sauces: [],
    dishes: ["pate_de_campagne"]
  },
  cut_pork_tongue: {
    techniques: ["braiser", "mijoter"],
    science: ["collagen_gelatinization"],
    sauces: ["sauce_piquante"],
    dishes: []
  },
  cut_pork_trotter: {
    techniques: ["braiser", "rotir"],
    science: ["collagen_gelatinization"],
    sauces: [],
    dishes: ["pied_de_porc_pane"]
  },
  cut_pork_intestine: {
    techniques: ["griller", "confire"],
    science: ["curing_and_fermentation"],
    sauces: [],
    dishes: ["andouille", "andouillette"]
  },

  // Fish Cuts
  cut_kokotxa_de_merlu: {
    techniques: ["emulser_au_pil_pil", "pocher"],
    science: ["collagen_gelatinization"],
    sauces: ["sauce_verte_basque"],
    dishes: ["kokotxas_de_merlu_au_pil_pil"]
  },
  cut_fish_fillet: {
    techniques: ["sauter", "pocher"],
    science: ["protein_coagulation"],
    sauces: ["beurre_blanc"],
    dishes: []
  },

  // Other Meats Cuts
  cut_magret_de_canard: {
    techniques: ["sauter", "rotir"],
    science: ["fat_rendering"],
    sauces: ["sauce_echalote"],
    dishes: ["magret_canard", "salade_landaise"]
  },
  cut_gibier_chevreuil: {
    techniques: ["rotir", "sauter"],
    science: ["protein_coagulation"],
    sauces: ["sauce_poivre"],
    dishes: []
  }
};
