  // tabelle di common.ts

export namespace models {
  export class APIReference {
    index!: string;
    name!: string;
    url!: string;
    note?: string;
  }
    
  export enum SuccessType {
    none,
    half,
    other,
  }

  export class DifficultyClass {
    // forse id può essere auto increment
    id!: number;
    dc_type!: string;
    dc_value?: number;
    success_type!: SuccessType;
  }

  export enum AreaOfEffectType {
    sphere,
    cube,
    cylinder,
    line,
    cone,
  }

  export class AreaOfEffect {
    size!: number;
    type!: AreaOfEffect;
  }

  export class Choice {
    desc?: string;
    choose!: number;
    type?: string;
    opt_id!: number;
  }

  export class ArrayDamage {
    array_id!: number;
    damage_type!: string;
    damage_dice!: string;
    dc?: number;
    index!: number;
  }

  // OptionArray mi serve per multiple
  export class ArrayOption {
    item_id!: number;
    index!: number;
    array_id!: number;
  }

  export class Option {
    id!: number;
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
    breath_damage_type?: string;
    breath_damage_dice?: string;
    breath_damage_dc?: number; // questo attributo potrebbe essere inutile; l'ho messo per si e per no
    // pseudo-tabella countedReference
    counted_reference_count?: number;
    counted_item?: string;
    prerequisites?: number;
    // pseudo-tabella damage
    damage_dice?: string;
    damage_type?: string; 
    // pseudo-tabella ideal
    // teoricamente inutile perché non stiamo facendo alignment ma la copio perché piccola
    alignments?: number; 
    // pseudo-tabella money
    money_count?: number;
    money_unit?: string;
    // pseudo-tabella multiple
    multiple_items?: number; 
    // pseudo-tabella score_prerequisite
    ability_score_prerequisite?: string;
    // pseuso-tabella size
    size?: string;
  }

  export class ArrayOfOptionsAndString {
    opt_id!: number;
    string!: string;
    index!: number;
    array_id!: number;
  }

  export class OptionSet {
    id!: number;
    // pseudo-tabella equipment_category
    equipment_category?: string;
    resource_list_url?: string;
    // pseudo_tabella options_array
    options_array?: number; 
  }

  // tabelle di DamageTypes.ts

  export class DamageTypes {
    index!: string;
    name!: string;
    description!: string;
    url!: string
  }

  // tabelle di AbilityScores.ts

  export class AbilityScore {
    index!: string;
    name!: string;
    full_name!: string;
    description!: string;
    skills!: string;
    url!: string;
  }

  // tabelle di Alignments
  // in teoria inutili ma copiata comunque perché piccola

  export class Alignment {
    index!: string;
    name!: string;
    abbreviation!: string;
    description!: string;
    url!: string;
  }

  // tabelle di Backgrounds.ts

  export class BackgroundFeatReference {
    index!: string;
    name!: string;
    url!: string;
    note?: string;
  }

  export class ArrayAPIReference {
    array_id!: number;
    item!: string;
    index!: number;
  }

  export class ArrayChoice {
    array_id!: number;
    id!: number;
    index!: number;
  }

  export class Background {
    index!: string;
    name!: string;
    ability_scores!: number;
    feat!: string;
    proficiencies!: number;
    proficiency_choices?: number;
    equipment_options?: number;
    url?: string;
  }

  // tabelle di Condition.ts

  export class Condition {
    index!: string;
    name!: string;
    description!: string;
    url!: string;
  }

  // tabelle di EquipmentCategories.ts

  export class EquipmentCategory {
    index!: string;
    name!: string;
    equipment!: number;
    url!: string;
  } 

  // tabelle di Language.ts

  export class Language {
    index!: string;
    name!: string;
    is_rare!: boolean;
    note!: string;
    url!: string;
  }

  // tabelle di MagicSchools.ts

  export class MagicSchool {
    index!: string;
    name!: string;
    description!: string;
    url!: string;
  }

  // monsters non ci serve

  // tabelle di Proficiencies.ts

  export class Proficiency {
    index!: string;
    name!: string;
    type!: string;
    backgrounds!: number;
    classes!: number;
    reference?: string;
    url?: string;
  }

  // tabelle di Skills.ts

  export class Skill {
    index!: string;
    name!: string;
    description!: string;
    ability_score!: string;
    url?: string;

  }

  // tabelle di WeaponMasteryProperties.ts

  export class WeaponMasteryProperty {
    index!: string;
    name!: string;
    description!: string;
    url!: string;
  }

  // tabelle di Classes.ts

  export class SpellcastingInfo {
    name!: string;
    desc!: string;
  }

  export class ArraySpellcastingInfo {
    array_id!: number;
    array_idx!: number;
    item!: string;
  }

  export class Spellcasting {
    level!: number;
    spellcasting_ability!: string;
    info!: number;
  }

  export class MultiClassingPrereq {
    id!: number;
    ability_score?: string;
    minimum_score!: number;
  }


  export class ArrayMultiClassingPrereq {
    array_id!: number;
    array_idx!: number;
    item!: number;
  }

  export class MultiClassing {
    id!: number;
    prerequisites?: number;
    prerequisite_options?: number;
    proficiencies?: number;
    proficiency_choices?: number;
  }

  export class PrimaryAbility {
    desc!: string;
    ability_scores?: number;
    ability_score_options?: number;
  }

  export class Class {
    index!: string;
    name!: string;
    primary_ability!: string;
    hit_die!: number;
    class_levels!: string;
    multi_classing?: number;
    proficiencies?: number;
    proficiency_choices!: number;
    saving_throws?: number;
    starting_equipment_options!: number;
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

  export class ArrayContent {
    item!: string;
    array_id!: number;
    array_idx!: number;
  }

  export class Utilize {
    name!: string;
    dc!: number;
  }

  export class ArrayUtilize {
    array_id!: number;
    index!: number;
    item!: string;
  };

  export class Equipment {
    index!: string;
    name!: string;
    equipment_categories!: number;
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
    index!: string;
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
    index!: string;
    name!: string;
    url!: string;
    image!: string;
    equipment_category?: string;
    variant!: boolean;
    variants!: number;
    attunement!: boolean;
    rarity!: string;
    desc!: string;
    limited_to?: string;
  }

  // tabelle di species

  export class Species {
    index!: string;
    name!: string;
    url!: string;
    type!: string;
    size?: string;
    size_options?: number;
    speed!: number;
    traits?: number;
    subspecies?: number;
  }

  // tabelle di Subclass.ts

  export class ArraySubclassFeature {
    array_id!: number;
    array_idx!: number;
    name!: string;
    level!: number;
    description!: string;
  }

  export class Subclass {
    index!: string;
    url!: string;
    name!: string;
    class!: string;
    summary!: string;
    description!: string;
    features!: number;
  }

  // tabelle di Subspecies.ts

  export class ArraySubspeciesTrait {
    index!: string;
    array_id!: number;
    array_idx!: number;
    name!: string;
    url!: string;
    level!: number;
  }

  export class SubspeciesSchema {
    index!: string;
    name!: string;
    url!: string;
    species!: string;
    traits!: number;
    damage_type?: string;
  } 

  // tabelle di Traits.ts

  export class ArraySpellTrait {
    array_id!: number;
    array_idx!: number;
    spell!: string;
    uses?: string;
    recovery?: string;
  }

  export class Trait {
    index!: string;
    name!: string;
    url!: string;
    description!: string;
    species!: number;
    spells?: number;
    subspecies?: number;
    proficency_choices?: number;
    speed?: number;
  }

  // tabelle di WeaponProperties.ts

  export class WeaponProperty {
    index!: string;
    name!: string;
    description!: string;
    url!: string;
  }
}