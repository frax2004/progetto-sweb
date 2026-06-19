  // tabelle di common.ts

export namespace models {
  export class APIReference {
    idx?: string;
    name!: string;
    url!: string;
    note?: string;
  }
    
  export enum SuccessType {
    'none',
    'half',
    'other',
  }

  export class DifficultyClass {
    // forse id può essere auto increment
    id?: number;
    dc_type!: string;
    dc_value?: number;
    success_type!: SuccessType;
  }

  export enum AreaOfEffectType {
    'sphere',
    'cube',
    'cylinder',
    'line',
    'cone',
  }

  export class AreaOfEffect {
    id?: number;
    size!: number;
    type!: AreaOfEffect;
  }

  export class Choice {
    desc?: string;
    choose!: number;
    type?: string;
    id?: number;
  }

  export class ArrayDamageItem {
    array_id?: number;
    damage_type!: string;
    damage_dice!: string;
    dc?: number;
    array_idx?: number;
  }

  // OptionArray mi serve per multiple
  export class ArrayOptionItem {
    item_id?: number;
    array_idx?: number;
    array_id?: number;
  }

  export class ArrayPrerequisitesItem {
    array_idx?: number;
    array_id?: number;
    item!: string;
    string!: string;
  }

  export class Option {
    id?: number;
    option_type!: string;
    // pseudo-tabella reference
    reference_item?: string;
    // pseudo-tabella choice
    choice_id?: number;
    // pseudo-tabella string
    string?: string;
    // pseudo-tabella ability bonus 
    ability_score_bonus?: string;
    bonus?: number;
    // pseudo-tabella action
    action_name?: string;
    action_count?: number;
    action_type?: string;
    action_desc?: string;
    // pseudo-tabella breath
    breath_name?: string;
    breath_dc?: number;
    breath_damage?: number //foreign key
    // pseudo-tabella countedReference
    counted_reference_count?: number;
    counted_item?: string;
    prerequisites?: number;
    // pseudo-tabella damage
    damage_dice?: string;
    damage_type?: string; 
    damage_notes?: string;
    // pseudo-tabella ideal
    // teoricamente inutile perché non stiamo facendo alignment ma la copio perché piccola
    alignments?: number; 
    align_desc?: string;
    // pseudo-tabella money
    money_count?: number;
    money_unit?: string;
    // pseudo-tabella multiple
    multiple_items?: number; 
    multiple_desc?: string;
    // pseudo-tabella score_prerequisite
    ability_score_prerequisite?: string;
    minimum_score_prerequisite?: number;
    // pseuso-tabella size
    size?: string;
  }


  export class OptionSet {
    id?: number;
    option_set_type!: string;
    // pseudo-tabella equipment_category
    equipment_category?: string;
    resource_list_url?: string;
    // pseudo_tabella options_array
    options_array?: number; 
  }

  // tabelle di DamageTypes.ts

  export class DamageTypes {
    idx?: string;
    name!: string;
    description!: string;
    url!: string
  }

  // tabelle di AbilityScores.ts

  export class AbilityScore {
    idx?: string;
    name!: string;
    full_name!: string;
    description!: string;
    skills?: number;
    url!: string;
  }

  // tabelle di Alignments
  // in teoria inutili ma copiata comunque perché piccola

  export class Alignment {
    idx?: string;
    name!: string;
    abbreviation!: string;
    description!: string;
    url!: string;
  }

  // tabelle di Backgrounds.ts

  export class ArrayStartingEquipmentItem {
    array_id?: number;
    array_idx?: number;
    equipment!: string;
    quantity!: number;
  }

  export class ArrayAPIReferenceItem {
    array_id?: number;
    item!: string;
    array_idx?: number;
  }

  export class ArrayChoiceItem {
    array_id?: number;
    id?: number;
    array_idx?: number;
  }

  export class Background {
    idx?: string;
    name!: string;
    starting_proficiencies?: number;
    language_options?: number;
    starting_equipment?: number;
    // primo flatten
    starting_gold_quantity?: number;
    starting_gold_unit?: string;
    // secondo flatten
    starting_equipment_options?: number;
    feature_name?: string;
    feature_desc?: string;
    personality_traits?: number;
    ideals?: number;
    bonds?: number;
    flaws?: number;
    url?: string;
  }

  // tabelle di Condition.ts

  export class Condition {
    idx?: string;
    name!: string;
    description!: string;
    url!: string;
  }

  // tabelle di EquipmentCategories.ts

  export class EquipmentCategory {
    idx?: string;
    name!: string;
    equipment?: number;
    url!: string;
  } 

  // tabelle di Language.ts

  export class Language {
    idx?: string;
    name!: string;
    is_rare!: boolean;
    note!: string;
    url!: string;
  }

  // tabelle di MagicSchools.ts

  export class MagicSchool {
    idx?: string;
    name!: string;
    description!: string;
    url!: string;
  }

  // monsters non ci serve

  // tabelle di Proficiencies.ts

  export class Proficiency {
    idx?: string;
    name!: string;
    type!: string;
    backgrounds?: number;
    classes?: number;
    reference?: string;
    url?: string;
  }

  // tabelle di Skills.ts

  export class Skill {
    idx?: string;
    name!: string;
    description!: string;
    ability_score!: string;
    url?: string;

  }

  // tabelle di WeaponMasteryProperties.ts

  export class WeaponMasteryProperty {
    idx?: string;
    name!: string;
    description!: string;
    url!: string;
  }

  // tabelle di Classes.ts

  export class SpellcastingInfo {
    name!: string;
    desc!: string;
  }

  export class ArraySpellcastingInfoItem {
    array_id?: number;
    array_idx?: number;
    item!: string;
  }

  export class Spellcasting {
    level!: number;
    spellcasting_ability!: string;
    info?: number;
  }

  export class MultiClassingPrereq {
    id?: number;
    ability_score?: string;
    minimum_score!: number;
  }


  export class ArrayMultiClassingPrereqItem {
    array_id?: number;
    array_idx?: number;
    item?: number;
  }

  export class MultiClassing {
    id?: number;
    prerequisites?: number;
    prerequisite_options?: number;
    proficiencies?: number;
    proficiency_choices?: number;
  }

  export class Class {
    idx?: string;
    name!: string;
    hit_die!: number;
    class_levels!: string;
    multi_classing?: number;
    proficiencies?: number;
    proficiency_choices?: number;
    saving_throws?: number;
    starting_equipment?: number;
    starting_equipment_options?: number;
    subclasses?: number;
    spellcasting?: string;
    spells?: string;
    url!: string;
  }

  // tabelle di Equipments.ts

  export class Content {
    item!: string;
    quantity!: number;
  }

  export class ArrayContentItem {
    item!: string;
    quantity!: number;
    array_id?: number;
    array_idx?: number;
  }

  export class Utilize {
    name!: string;
    dc?: number;
  }

  export class ArrayUtilizeItem {
    array_id?: number;
    array_idx?: number;
    item!: string;
    dc?: number;
  };

  export class Equipment {
    idx?: string;
    name!: string;
    equipment_categories?: number;
    cost_quantity!: number;
    cost_unit!: number;
    url!: string;
    description?: string;
    weight?: string;
    ammunition?: string;
    armor_class_base?: number;
    armor_class_dex_bonus?: boolean;
    armor_class_max_bonus?: number;
    contents?: number; 
    ability?: string;
    craft?: number;
    damage_type?: string;
    damage_dice?: string;
    damage_dc?: number;
    doff_time?: string;
    don_time?: string;
    image?: string;
    mastery?: string;
    notes?: string;
    properties?: number;
    quantity?: number;
    storage?: string;
    range_normal?: number;
    range_long?: number;
    stealth_disadvantage?: boolean;
    str_minimum?: number;
    throw_range_normal?: number;
    throw_range_long?: number;
    two_handed_damage_type?: string;
    two_handed_damage_dice?: string;
    two_handed_damage_dc?: number;
    utilize?: number;
  }

  // tabelle di Feats.ts

  export class Feat {
    idx?: string;
    name!: string;
    description!: string;
    type!: string;
    repeatable?: string;
    prerequisite_minimum_level?: number;
    prerequisite_feature_named?: string;
    prerequisite_options?: number;
    url!: string;
  }

  // tabelle di MagicItems.ts

  export class MagicItem {
    idx?: string;
    name!: string;
    url!: string;
    image!: string;
    equipment_category?: string;
    variant!: boolean;
    variants?: number;
    attunement!: boolean;
    rarity!: string;
    desc!: string;
    limited_to?: string;
  }

  // tabelle di species

  export class ArrayAbilityBonusItem {
    ability_score!: string;
    bonus!: number; 
    array_id?: number; 
    array_idx?: number; 
  }

  export class Species {
    idx?: string;
    name!: string;
    speed!: number;
    ability_bonuses?: number;
    ability_bonus_options?: number;
    alignment?: string;
    age!: string;
    starting_proficiencies?: number;
    starting_proficiency_options?: number;
    languages?: number;
    language_desc!: string;
    language_options?: number;
    url!: string;
    size!: string;
    size_description!: string;
    traits?: number;
    subspecies?: number;
  }

  // tabelle di Subclass.ts

  export class SubclassSpellPrerequisite {    
    idx?: string;
    type!: string;
    name!: string;
    url!: string; 
  }

  export class ArraySubclassSpellPrerequisiteItem {    
    item!: string;
    array_id?: number;
    array_idx?: number; 
  }

  export class ArraySubclassSpellItem {    
    prerequisite?: number;
    spell!: string;
    array_id?: number;
    array_idx?: number;
  }

  export class Subclass {
    idx?: string;
    url!: string;
    name!: string;
    class!: string;
    subclass_flavor!: string;
    desc!: string;
    subclass_levels!: string;
    spells?: number;
  }

  // tabelle di Subspecies.ts

  export class Subspecies {
    idx?: string;
    name!: string;
    url!: string;
    species!: string;
    desc!: string;
    ability_bonuses?: number;
    racial_traits?: number;
  } 

  // tabelle di Traits.ts

  export class ArrayBreathWeaponDamageItem {
    damage_type!: string;
    array_id?: number;
    array_idx?: number;
    character_level!: string;
  }

  export class BreathWeapon {
    id?: number;
    name!: string;
    desc!: string;
    area_of_effect?: number;
    usage_type!: string;
    usage_times!: number;
    dc?: number;
    damage?: number;
  }

  export class TraitSpecific {
    id?: number;
    damage_type?: string;
    breath_weapon?: number;
    spell_options?: number;
    subtrait_options?: number;
  }

  export class Trait {
    idx?: string;
    name!: string;
    url!: string;
    desc!: string;
    species?: number;
    subspecies?: number;
    proficiencies?: number;
    proficiency_choices?: number;
    language_options?: number;
    parent?: string;
    trait_specific?: number;
  }

  // tabelle di WeaponProperties.ts

  export class WeaponProperty {
    idx?: string;
    name!: string;
    description!: string;
    url!: string;
  }

  export class ArrayClassItem {    
    array_id?: number;
    array_idx?: number;
    class?: string;
  }

  export enum Components {
    'v',
    's',
    'm',
  }

  export class ArrayComponentsItem {    
    array_id?: number;
    array_idx?: number;
    item!: Components;
  }

  export class Spell {    
    name!: string;
    level!: number;
    school!: string;
    classes!: number;
    actionType!: string;
    concentration!: boolean;
    ritual!: boolean ;
    range!: string ;
    components?: number;
    material?: string;
    duration!: string;
    description!: string;
    cantripUpgrade?: string;
    higherLevelSlot?: string;
    castingTrigger?: string;
    castingTime?: string;
  }

  export class ArrayCreatingSpellSlotsItem {    
    array_idx?: number;
    array_id?: number;
    sorcery_point_cost!: number;
    spell_slot_level!: number;
  }

  export class ClassSpecific {    
    id?: number;
    action_surges?: number;
    arcane_recovery_levels?: number;
    aura_range?: number;
    bardic_inspiration_die?: number;
    brutal_critical_dice?: number;
    channel_divinity_charges?: number;
    creating_spell_slots?: number;
    destroy_undead_cr?: number;
    extra_attacks?: number;
    favored_enemies?: number;
    favored_terrain?: number;
    indomitable_uses?: number;
    invocations_known?: number;
    ki_points?: number;
    magical_secrets_max_5?: number;
    magical_secrets_max_7?: number;
    magical_secrets_max_9?: number;
    // i due qua sotto sono attributi "flattenati"
    martial_arts_dice_count?: number;
    martial_arts_dice_value?: number;
    metamagic_known?: number;
    mystic_arcanum_level_6?: number;
    mystic_arcanum_level_7?: number;
    mystic_arcanum_level_8?: number;
    mystic_arcanum_level_9?: number;
    rage_count?: number;
    rage_damage_bonus?: number;
    // i due qua sotto sono attributi "flattenati"
    sneak_attack_dice_count?: number;
    sneak_attack_dice_value?: number;
    song_of_rest_die?: number;
    sorcery_points?: number;
    unarmored_movement?: number;
    wild_shape_fly?: boolean;
    wild_shape_max_cr?: number;
    wild_shape_swim?: boolean;
  }

  export class Level {    
    idx!: string;
    level!: number;
    ability_score_bonuses?: number;
    prof_bonus?: number;
    features?: number;
    //non potevo chiamarla class
    character_class!: string;
    class_specific?: number;
    subclass?: string;
    url!: string;
    // le prossime cose sono tutte flatten di altre tabelle
    cantrips_known?: number;
    spell_slots_level_1?: number;
    spell_slots_level_2?: number;
    spell_slots_level_3?: number;
    spell_slots_level_4?: number;
    spell_slots_level_5?: number;
    spell_slots_level_6?: number;
    spell_slots_level_7?: number;
    spell_slots_level_8?: number;
    spell_slots_level_9?: number;
    spells_known?: number;
    additional_magical_secrets_max_lvl?: number;
    aura_range?: number;
  }

  export class Account {
    email!: string;
    password!: string;
    username!: string;
  }

  export class Amministratore {
    account!: string;
  }

  export class UtenteGenerico {
    account!: string;
    utente_giocatore!: string;
    utente_dungeon_master!: string;
  }

  export class ArrayFeatItem {
    item!: string;
    idx_personaggio!: string;
    array_idx!: number;
  }

  export class ArraySpellItem {
    item!: string;
    idx_personaggio!: string;
    array_idx!: number;
  }

  export class ArrayEquipmentItem {
    item!: string;
    idx_personaggio!: string;
    array_idx!: number;
  }

  export class ArrayLanguageItem {
    item!: string;
    idx_personaggio!: string;
    array_idx!: number;
  }

  export class ArrayStatsItem {
    stat_idx!: string;
    stat_value!: number;
    stat_modifier!: number;
    idx_personaggio!: string;
    array_idx!: number;
  }

  export class ArrayProficienciesItem {
    proficiency!: string;
    idx_personaggio!: string;
    array_idx!: number;
  }

  export class Personaggio {
    utente_giocatore!: string;
    nome!: string;
    punti_vita?: number;
    bonus_competenza?: number;
    // primary key creata da interpolazione
    // utente_giocatore + nome
    idx_personaggio!: string;
    campagna?: string; // un personaggio una sola campagna altrimenti problemi di modifica pg
    classe!: string;
    sottoclasse?: string;
    specie!: string;
    sottospecie?: string;
    background!: string;
    livello!: string;
    quantita_oro?: number;
    numero_incantesimi?: number;
    numero_trucchetti?: number;
    slot_livello_1?: number;
    slot_livello_2?: number;
    slot_livello_3?: number;
    slot_livello_4?: number;
    slot_livello_5?: number;
    slot_livello_6?: number;
    slot_livello_7?: number;
    slot_livello_8?: number;
    slot_livello_9?: number;
    velocita?: number;
    taglia?: string;
    // i talenti sono salvati su un array come foreign keys
    // stessa cosa vale per equipaggiamenti, incantesimi e lingue parlate
    // e anche per statistiche

  // tranne che non li salviamo come ArrayAPIReference?

    // in teoria la proprietà è array di 
    // stringhe, lascio come semplice stringa?
    abilita_extra?: string;
    descrizione_personaggio?: string;
    imgURL?: string;
  }

  export class ArrayPostItem {
    idx_campagna!: string;
    timestamp!: string;
    contenuto!: string;
  }

  export class ArrayCampagnaPersonaggiItem {
    idx_campagna!: string;
    idx_personaggio!: string;
  }

  export class Campagna {
    utente_dungeon_master!: string;
    nome!: string;
    // primary key creata da interpolazione
    // utente_dungeon_master + nome
    idx_campagna!: string;
    banner?: string;
    descrizione?: string;
    // i post vengono acceduti tramite foreign key
    // non so cosa fare con i personaggi
    // avrebbe più senso avere un array di giocatori?

    // comunque personaggi sono anch'essi acceduti come foreign key
  }

  export class ArrayIdxPersonaggioItem {
    utente_giocatore!: string;
    idx_personaggio!: string;
  }

  export class ArrayIdxCampagnaItem {
    utente_dungeon_master!: string;
    idx_campagna!: string;
  }

 
}