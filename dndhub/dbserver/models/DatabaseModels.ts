
export namespace models {
  export interface APIReference {
    index: string;
    name: string;
    url: string;
    note?: string;
  }

  export enum SuccessType {
    none,
    half,
    other,
  }

  export interface DifficultyClass {
    dc_type: string;
    dc_value?: number;
    success_type: SuccessType;
  }

  export enum AreaOfEffectType {
    sphere,
    cube,
    cylinder,
    line,
    cone,
  }

  export interface AreaOfEffect {
    size: number;
    type: AreaOfEffectType;
  }

  export interface Choice {
    desc?: string;
    choose: number;
    type?: string;
    opt_id: number;
  }

  export interface ArrayDamage {
    array_id: number;
    damage_type: string;
    damage_dice: string;
    dc?: string;
    index: number;

  }

  export interface OptionAbilityBonus {
    ability_score: string;
    bonus: number;
  }

  export interface OptionAction {
    action_name: string;
    count: number;
    type: string;
    desc?: string;
  }

  export interface OptionBreath {
    name: string;
    dc: string;
    damageArray_id: number;
  }

  export interface ArrayPrerequisites {
    type: string;
    proficency?: string;
    index: number;
    array_id: number;
  }

  export interface OptionCountedReference {
    count: number;
    of: string;
    prerequisites?: number;
  }

  export interface OptionDamage {
    damage_dice: string;
    damage_type: string;
    notes?: string;
  }

  export interface OptionMoney {
    count: number;
    unit: string;
  }

  export interface ArrayOption {
    item_id: number;
    index: number;
    array_id: number;

  }

  export interface OptionMultiple {
    array_id: number;
    desc?: string;

  }

  export interface OptionScorePrerequisite {
    ability_score: string;
    minimum_score: number;

  }

  export interface OptionSize {
    size: string;
  }

  export enum OptionType {
    "reference",
    "choice",
    "string",
    "ability-bonus",
    "action",
    "breath",
    "counted-reference",
    "damage",
    "ideal",
    "money",
    "multiple",
    "score-prerequisite",
    "size",
  }

  export interface Option {
    id: number;
    option_kind: OptionType;
    item?: string;
    choice?: string;
    string?: string;
    ability_bonus?: string;
    action?: string;
    breath?: string;
    countedReference?: string;
  }

  export interface EquipmentCategory {
    equipment_category: string;
  }

  export interface ResourceList {
    resource_list_url: string
  }

  export interface OptionAndString {
    id: number;
    option_schema: number;
    string: string;
  }

  export interface ArrayOfOptions {
    opt_id: number;
    index: number;
    array_id: number;
  }

  export enum OptionSetType {
    equipment_category,
    resource_list,
    options_array,
  } 

  export interface OptionSet {
    id: number;
    option_kind: OptionSetType;
    equip?: string;
    resourceList?: string;
    optArray_id?: number;
  }


  export interface DamageTypes {
    index: string;
    name: string;
    description: string;
    url: string;
  }


  export interface AbilityScore {
    index: string;
    name: string;
    full_name: string;
    description: string;
    skills: string;
    url: string;
  }


  export interface Alignment {
    index: string;
    name: string;
    abbreviation: string;
    description: string;
    url: string;
  }


  export interface BackgroundFeatReference {
    index: string;
    name: string;
    url: string;
    note?: string;
  }

  export interface ArrayAPIReference {
    array_id: number;
    item: string;
    index: number;
  }

  export interface ArrayChoice {
    array_id: number;
    id: number;
    index: number;
  }

  export interface Background {
    index: string;
    name: string;
    ability_scores: number;
    feat: string;
    proficiencies: number;
    proficiency_choices?: number;
    equipment_options?: number;
    url?: string;
  }


  export interface Condition {
    index: string;
    name: string;
    description: string;
    url: string;
  }


  export interface EquipmentCategory {
    index: string;
    name: string;
    equipment: number;
    url: string;
  } 


  export interface Language {
    index: string;
    name: string;
    is_rare: boolean;
    note: string;
    url: string;
  }


  export interface MagicSchool {
    index: string;
    name: string;
    description: string;
    url: string;
  }



  export interface Proficiency {
    index: string;
    name: string;
    type: string;
    backgrounds: number;
    classes: number;
    reference?: string;
    url?: string;
  }


  export interface Skill {
    index: string;
    name: string;
    description: string;
    ability_score: string;
    url?: string;
  }


  export interface WeaponMasteryProperty {
    index: string;
    name: string;
    description: string;
    url: string;
  }


  export interface SpellcastingInfo {
    name: string;
    desc: string;
  }

  export interface ArraySpellcastingInfo {
    array_id: number;
    array_idx: number;
    item: string;
  }

  export interface Spellcasting {
    level: number;
    spellcasting_ability: string;
    info: number;
  }

  export interface MultiClassingPrereq {
    id: number;
    ability_score?: string;
    minimum_score: number;
  }


  export interface ArrayMultiClassingPrereq {
    array_id: number;
    array_idx: number;
    item: number;
  }

  export interface MultiClassing {
    id: number;
    prerequisites?: number;
    prerequisite_options?: number;
    proficiencies?: number;
    proficiency_choices?: number;
  }

  export interface PrimaryAbility {
    desc: string;
    ability_scores?: number;
    ability_score_options?: number;

  }

  export interface Class {
    index: string;
    name: string;
    primary_ability: string;
    hit_die: number;
    class_levels: string;
    multi_classing?: number;
    proficiencies?: number;
    proficiency_choices: number;
    saving_throws?: number;
    starting_equipment_options: number;
    subclasses?: number;
    spellcasting?: string;
    spells?: string;
    url: string;
  }

  export interface Range {
    normal: number;
    long?: number;
  }

  export interface ThrowRange {
    normal: number;
    long: number;
  }
    

  export interface Content {
    item: string;
    quantity: number;
  }

  export interface ArrayContent {
    item: string;
    array_id: number;
    array_idx: number;
  }

  export interface Utilize {
    name: string;
    dc: string;
  }

  export interface Equipment {
    index: string;
    name: string;
    equipment_categories: number;
    cost_quantity: number;
    cost_unit: number;
    url: string;
    description?: string;
    weight?: string;
    ammunition?: string;
    armor_class_base?: number;
    armor_class_dex_bonus?: boolean;
    armor_class_max_bonus?: number;
    contents?: number; 
    ability?: string;
    craft?: number;
    damage: any; // TODO: da completare
  }
}