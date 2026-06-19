import { Database } from "./database.js";


export namespace dnd {
  
  export interface APIReference {
    index: string;
    name: string;
    note?: string;
  }

  export interface Choice {
    desc: string;
    choose: number;
    text: string;
    from: OptionSet;
  }

  export interface DifficultyClass {
    dc_type: APIReference;
    dc_value: number;
    success_type: string;
  }

  export interface Damage {
    type: APIReference;
    dice: string;
    dc: DifficultyClass;
  }

  export interface OptionSet {
    equipment_category: APIReference;
    options: Option[]
  }

  export interface OptionPrerequisite {
    type: string;
    proficiency: APIReference;
  }

  export interface Option {
    reference_item: APIReference;
    ability_score_bonus: APIReference;
    counted_item: APIReference;
    prerequisites: OptionPrerequisite[];
    damage_type: APIReference;
    multiple_items: Option[];
    choice: Choice
    ability_score_prerequisite: APIReference;
    string: string;
    bonus: number;
    action: {
      name: string;
      count: number;
      type: string;
      desc?: string;
    }
    counted_reference_count: number;
    damage: {
      dice: string;
      type: string;
      notes: string;
    }
    money: {
      count: number;
      unit: string;
    }
    multiple_desc: string;
    minimium_score_prerequisite: number;
    size: string;
  }

  export interface DamageType {
    index: string;
    name: string;
    description: string;
  }

  export interface AbilityScore {
    index: string;
    name: string
    full_name: string;
    description: string;
    skills: APIReference[];
  }

  export interface StartingEquipment {
    equipment: APIReference;
    quantity: number;
  }

  export interface Cost {
    quantity: number;
    unit: string;
  }

  export interface BackgroundFeature {
    name: string;
    desc: string[];
  }

  export interface Background {
    index: string;
    name: string;
    starting_proficiencies: APIReference[];
    language_options: Choice;
    starting_equipment: StartingEquipment[];
    starting_equipment_options: Choice[];
    starting_gold: Cost;
    feature: BackgroundFeature;
    personality_traits: Choice;
    ideals: Choice;
    bonds: Choice;
    flaws: Choice;
  }


  export interface SpellcastingInfo {
    name: string;
    desc: string[];
  }

  export interface SpellCasting {
    level: number;
    ability: APIReference;
    info: SpellcastingInfo[];
  }

  export interface MultiClassingPrereq {
    ability_score: APIReference;
    minimum_score: number;
  }


  export interface MultiClassing {
    prerequisites: MultiClassingPrereq[];
    prerequisite_options: Choice;
    proficiencies: APIReference[];
    proficiency_choices: Choice[];
  }

  export interface Class {
    name: string;
    hit_die: number;
    levels: Level[];
    multiclassing: MultiClassing;
    proficiencies: APIReference[];
    proficiency_choices: Choice[];
    saving_throws: APIReference[];
    starting_equipment: StartingEquipment[];
    starting_equipment_options: Choice[];
    subclasses: APIReference[];
    spellcasting: SpellCasting;
    spells: Spell[];
  }

  export interface Condition {
    index: string;
    name: string;
    description: string;
  }

  export interface EquipmentCategory {
    index: string;
    name: string;
    equipment: APIReference[];
  }

  export interface ArmorClass {
    base: number;
    dex_bonus: boolean;
    max_bonus: number;
  }

  export interface _Range {
    normal: number;
    long: number;
  }

  export interface ThrowRange {
    normal: number;
    long: number;
  }

  export interface Content {
    item: APIReference;
    quantity: number;
  }

  export interface Utilize {
    name: string;
    dc: DifficultyClass;
  }

  export interface Equipment {
    name: string;
    equipment_categories: APIReference[];
    cost: Cost;
    description: string;
    weight: number;
    ammunition: APIReference;
    armor_class: ArmorClass;
    contents: Content[];
    craft: APIReference[];
    damage: Damage;
    doff_time: string;
    don_time: string;
    image: string;
    mastery: APIReference;
    notes: string[];
    properties: APIReference[];
    quantity: number;
    storage: APIReference[];
    range: _Range;
    stealth_disadvantage: boolean;
    str_minimum: number;
    throw_range: ThrowRange;
    two_handed_damage: Damage;
    utilize: Utilize[];
  }

  export interface FeatPrerequisites {
    minimum_level: number;
    feature_named: string;
  }

  export interface Feat {
    index: string;
    name: string;
    description: string;
    type: string;
    repeatable: string;
    prerequisites: FeatPrerequisites;
    prerequisite_options: Choice;
  }

  export interface Language {
    index: string;
    name: string;
    is_rare: boolean;
    note: string;
  }

  export interface MagicItem {
    name: string;
    index: string;
    image: string;
    equipment_category: APIReference;
    variant: boolean;
    variants: APIReference[];
    attunement: boolean;
    rarity: {
      name: string;
    };
    desc: string;
    'limited-to': string;
  }

  export interface MagicSchool {
    index: string;
    name: string;
    description: string;
  }

  export interface Proficiency {
    index: string;
    name: string;
    type: string;
    backgrounds: APIReference[];
    classes: APIReference[];
    reference: APIReference;
  }

  export interface Skill {
    index: string;
    name: string;
    description: string;
    ability_score: APIReference;
  }

  export interface AbilityBonus {
    ability_score: APIReference;
    bonus: number;
  }

  export interface Species {
    index: string;
    name: string;
    speed: number;
    ability_bonuses: AbilityBonus[];
    ability_bonus_options: Choice;
    alignment: string;
    age: string;
    size: string;
    size_description: string;
    starting_proficiencies: APIReference[];
    starting_proficiency_options: Choice;
    languages: APIReference[];
    language_desc: string;
    language_options: Choice;
    traits: APIReference[];
    subraces: APIReference[];
  }

  export interface SubclassSpellPrerequisite {
    index: string;
    type: string;
    name: string;
  }

  export interface SubclassSpell {
    prerequisites: SubclassSpellPrerequisite[];
    spell: APIReference;
  }

  export interface Subclass {
    index: string;
    name: string;
    class: APIReference;
    subclass_flavor: string;
    desc: string[];
    subclass_levels: string;
    spells: SubclassSpell[];
  }

  export interface Subrace {
    index: string;
    name: string;
    race: APIReference;
    desc: string;
    ability_bonuses: AbilityBonus[];
    racial_traits: APIReference[];
  }

  export interface Spell {
    name: string;
    level: number;
    magic_school: string;
    classes: string[];
    action_type: string;
    concentration: boolean;
    ritual: boolean;
    range: string;
    components: string[];
    material: string;
    duration: string;
    description: string;
    cantrip_upgrade: string;
    higher_level_slot: string;
    casting_trigger: string;
    casting_time: string;
  }

  export interface AreaOfEffect {
    size: number;
    type: string;
  }

  export interface BreathWeaponUsage {
    type: string;
    times: number;
  }

  export interface BreathWeaponDamage {
    damage_type: APIReference;
    damage_at_character_level: {
      "1": string;
      "6": string;
      "11": string;
      "16": string;
    }
  }

  export interface BreathWeapon {
    name: string;
    desc: string;
    area_of_effect: AreaOfEffect;
    usage: BreathWeaponUsage;
    dc: DifficultyClass;
    damage: BreathWeaponDamage[];
  }

  export interface TraitSpecific {
    damage_type: APIReference;
    breath_weapon: BreathWeapon;
    spell_options: Choice;
    subtrait_options: Choice;
  }

  export interface Trait {
    index: string;
    name: string;
    desc: string[];
    races: APIReference[];
    subraces: APIReference[];
    proficiencies: APIReference[];
    proficiency_choices: Choice;
    language_options: Choice;
    parent: APIReference;
    trait_specific: TraitSpecific;
  }

  export interface WeaponProperty {
    index: string;
    description: string;
    name: string;
  }

  export interface CreatingSpellSlot {
    sorcery_point_cost: number;
    spell_slot_level: number;
  }

  export interface ClassSpecific {
    action_surges: number;
    arcane_recovery_levels: number;
    aura_range: number;
    bardic_inspiration_die: number;
    brutal_critical_dice: number;
    channel_divinity_charges: number;
    creating_spell_slots: CreatingSpellSlot[]; 
    destroy_undead_cr: number;
    extra_attacks: number;
    favored_enemies: number;
    favored_terrain: number;
    indomitable_uses: number;
    invocations_known: number;
    ki_points: number;
    magical_secrets_max_5: number;
    magical_secrets_max_7: number;
    magical_secrets_max_9: number;
    martial_arts: {
      dice_count: number;
      dice_value: number;
    };
    metamagic_known: number;
    mystic_arcanum_level_6: number;
    mystic_arcanum_level_7: number;
    mystic_arcanum_level_8: number;
    mystic_arcanum_level_9: number;
    rage_count: number;
    rage_damage_bonus: number;
    sneak_attack: {
      dice_count: number;
      dice_value: number;
    };
    song_of_rest_die: number;
    sorcery_points: number;
    unarmored_movement: number;
    wild_shape: {
      fly: boolean;
      max_cr: number;
      swim: boolean;
    }
  }

  export interface LevelSpellcasting {
    cantrips_known: number;
    spell_slots_level_1: number;
    spell_slots_level_2: number;
    spell_slots_level_3: number;
    spell_slots_level_4: number;
    spell_slots_level_5: number;
    spell_slots_level_6: number;
    spell_slots_level_7: number;
    spell_slots_level_8: number;
    spell_slots_level_9: number;
    spells_known: number;
  }

  export interface SubclassSpecific {
    additionale_magical_secrets_max_lvl: number;
    aura_range: number;
  }

  export interface Level {
    features: APIReference[];
    character_class: APIReference;
    class_specific: ClassSpecific;
    subclass: APIReference;
    index: string;
    level: number;
    ability_score_bonuses: number;
    prof_bonus: number;
    cantrips_known: number;
    spell_slots_level_1: number;
    spell_slots_level_2: number;
    spell_slots_level_3: number;
    spell_slots_level_4: number;
    spell_slots_level_5: number;
    spell_slots_level_6: number;
    spell_slots_level_7: number;
    spell_slots_level_8: number;
    spell_slots_level_9: number;
    spells_known: number;
    additional_magical_secrets_max_lvl: number;
    aura_range: number;
  }
};

export class DatabaseQueries {
  static async map(array, mapper) {
    let result = [];
    for(const item of array) {
      result.push(await mapper(item));
    }
    return result;
  }

  static async unwrapAbilityScore(score): Promise<dnd.AbilityScore> {
    let skills = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${score.skills}`);

    return {
      index: score.idx,
      name: score.name,
      full_name: score.full_name,
      description: score.description,
      skills: await DatabaseQueries.map(await skills, DatabaseQueries.unwrapArrayAPIReferenceItem),
    };
  }

  static async unwrapBackground(bg): Promise<dnd.Background> {
    let starting_proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${bg.starting_proficiencies}`);
    let language_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.language_options}`);
    let starting_equipment = Database.queryAll(`SELECT * FROM ArrayStartingEquipmentItem WHERE array_id = ${bg.starting_equipment}`);
    let starting_equipment_options = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${bg.starting_equipment_options}`);
    let personality_traits = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.personality_traits}`);
    let ideals = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.ideals}`);
    let bonds = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.bonds}`);
    let flaws = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.flaws}`);

    return {
      index: bg.idx,
      name: bg.name, 
      starting_gold: {
        quantity: bg.starting_gold_quantity, 
        unit: bg.starting_gold_unit, 
      },
      feature: {
        name: bg.feature_name,
        desc: bg.feature_desc,
      },
      starting_proficiencies: await DatabaseQueries.map(await starting_proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      language_options: (await DatabaseQueries.map(await language_options, DatabaseQueries.unwrapChoice))[0],
      starting_equipment: await DatabaseQueries.map(await starting_equipment, DatabaseQueries.unwrapArrayStartingEquipmentItem),
      starting_equipment_options: await DatabaseQueries.map(await starting_equipment_options, DatabaseQueries.unwrapArrayChoiceItem),
      personality_traits: (await DatabaseQueries.map(await personality_traits, DatabaseQueries.unwrapChoice))[0],
      ideals: (await DatabaseQueries.map(await ideals, DatabaseQueries.unwrapChoice))[0],
      bonds: (await DatabaseQueries.map(await bonds, DatabaseQueries.unwrapChoice))[0],
      flaws: (await DatabaseQueries.map(await flaws, DatabaseQueries.unwrapChoice))[0],
    };
  }

  static async unwrapArrayAbilityBonusItem(item): Promise<dnd.AbilityBonus> {
    let ref = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${item.ability_score}'`);
    return {
      ability_score: (await DatabaseQueries.map(await ref, DatabaseQueries.unwrapAPIReference))[0],
      bonus: item.bonus
    };
  }

  static async unwrapSpecies(species): Promise<dnd.Species> {
    let ability_bonuses = Database.queryAll(`SELECT * FROM ArrayAbilityBonusItem WHERE array_id = ${species.ability_bonuses}`);
    let ability_bonus_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.ability_bonus_options}`);
    let starting_proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.starting_proficiencies}`);
    let starting_proficiency_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.starting_proficiency_options}`);
    let languages = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.languages}`);
    let language_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.language_options}`);
    let traits = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.traits}`);
    let subspecies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.subspecies}`);

    return {
      index: species.idx,
      name: species.name,
      speed: species.speed,
      alignment: species.alignment,
      age: species.age,
      size: species.size,
      size_description: species.size_description,
      language_desc: species.language_desc,
      ability_bonuses: await DatabaseQueries.map(await ability_bonuses, DatabaseQueries.unwrapArrayAbilityBonusItem),
      ability_bonus_options: (await DatabaseQueries.map(await ability_bonus_options, DatabaseQueries.unwrapChoice))[0],
      starting_proficiencies: await DatabaseQueries.map(await starting_proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      starting_proficiency_options: (await DatabaseQueries.map(await starting_proficiency_options, DatabaseQueries.unwrapChoice))[0],
      languages: await DatabaseQueries.map(await languages, DatabaseQueries.unwrapArrayAPIReferenceItem),
      language_options: (await DatabaseQueries.map(await language_options, DatabaseQueries.unwrapChoice))[0],
      traits: await DatabaseQueries.map(await traits, DatabaseQueries.unwrapArrayAPIReferenceItem),
      subraces: await DatabaseQueries.map(await subspecies, DatabaseQueries.unwrapArrayAPIReferenceItem),
    };
  }

  static async unwrapAPIReference(ref): Promise<dnd.APIReference> {
    return {
      index: ref.idx,
      name: ref.name
    };
  }
  
  static async unwrapMultiClassingPrereq(prereq): Promise<dnd.MultiClassingPrereq> {
    let ability_scores = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${prereq.ability_score}'`);

    return {
      ability_score: (await DatabaseQueries.map(await ability_scores, DatabaseQueries.unwrapAPIReference))[0],
      minimum_score: prereq.minimum_score
    };
  }

  static async unwrapArrayMultiClassingPrereqItem(prereq): Promise<dnd.MultiClassingPrereq> {
    let items = Database.queryAll(`SELECT * FROM MultiClassingPrereq WHERE id = ${prereq.item}`);
    return (await DatabaseQueries.map(await items, DatabaseQueries.unwrapMultiClassingPrereq))[0];
  }
  
  static async unwrapArrayPrerequisiteItem(prereq): Promise<dnd.OptionPrerequisite> {
    let item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${prereq.item}'`);
    return {
      proficiency: (await DatabaseQueries.map(await item, DatabaseQueries.unwrapAPIReference))[0],
      type: prereq.string
    };
  }
  
  static async unwrapOption(option): Promise<dnd.Option> {
    let reference_item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.reference_item}'`);
    let ability_score_bonus = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.ability_score_bonus}'`);
    let counted_item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.counted_item}'`);
    let prerequisites = Database.queryAll(`SELECT * FROM ArrayPrerequisiteItem where array_id = ${option.prerequisites}`);
    let damage_type = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.damage_type}'`);
    let multiple_items = Database.queryAll(`SELECT * FROM ArrayOptionItem WHERE array_id = ${option.multiple_items}`);
    let choice = Database.queryAll(`SELECT * FROM Choice WHERE id = ${option.choice_id}`);
    let ability_score_prerequisite = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.ability_score_prerequisite}'`);

    return {
      reference_item: (await DatabaseQueries.map(await reference_item, DatabaseQueries.unwrapAPIReference))[0],
      ability_score_bonus: (await DatabaseQueries.map(await ability_score_bonus, DatabaseQueries.unwrapAPIReference))[0],
      counted_item: (await DatabaseQueries.map(await counted_item, DatabaseQueries.unwrapAPIReference))[0],
      prerequisites: await DatabaseQueries.map(await prerequisites, DatabaseQueries.unwrapArrayPrerequisiteItem),
      damage_type: (await DatabaseQueries.map(await damage_type, DatabaseQueries.unwrapAPIReference))[0],
      multiple_items: await DatabaseQueries.map(await multiple_items, DatabaseQueries.unwrapArrayOptionItem),
      choice: (await DatabaseQueries.map(await choice, DatabaseQueries.unwrapChoice))[0],
      ability_score_prerequisite: (await DatabaseQueries.map(await ability_score_prerequisite, DatabaseQueries.unwrapAPIReference))[0],
      string: option.string,
      bonus: option.bonus,
      action: {
        name: option.action_name,
        count: option.action_count,
        type: option.action_type,
        desc: option.action_desc,
      },
      counted_reference_count: option.counted_reference_count,
      damage: {
        dice: option.damage_dice,
        type: option.damage_type,
        notes: option.damage_notes,
      },
      money: {
        count: option.count,
        unit: option.unit,
      },
      multiple_desc: option.multiple_desc,
      minimium_score_prerequisite: option.minimium_score_prerequisite,
      size: option.size
    };
  }
  
  static async unwrapArrayOptionItem(optionItem): Promise<dnd.Option> {
    let items = Database.queryAll(`SELECT * FROM Option WHERE id = ${optionItem.item_id}`);
    return (await DatabaseQueries.map(await items, DatabaseQueries.unwrapOption))[0];
  }
  
  static async unwrapOptionSet(opt_set): Promise<dnd.OptionSet> {
    let options_array = Database.queryAll(`SELECT * FROM ArrayOptionItem WHERE array_id = ${opt_set.options_array}`);
    let equipment_category = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${opt_set.equipment_category}'`);
  
    return {
      equipment_category: (await DatabaseQueries.map(await equipment_category, DatabaseQueries.unwrapAPIReference))[0],
      options: await DatabaseQueries.map(await options_array, DatabaseQueries.unwrapArrayOptionItem)
    };
  }
  
  static async unwrapChoice(choice): Promise<dnd.Choice> {
    let option_set = Database.queryAll(`SELECT * FROM OptionSet WHERE id = ${choice.id}`);
  
    return {
      from: (await DatabaseQueries.map(await option_set, DatabaseQueries.unwrapOptionSet))[0],
      desc: choice.desc,
      choose: choice.choose,
      text: choice.text
    };
  }
  
  static async unwrapArrayAPIReferenceItem(ref): Promise<dnd.APIReference> {
    let item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${ref.item}'`);
    return (await DatabaseQueries.map(await item, DatabaseQueries.unwrapAPIReference))[0];
  }
  
  static async unwrapArrayChoiceItem(choiceItem): Promise<dnd.Choice> {
    let id = Database.queryAll(`SELECT * FROM Choice WHERE id = ${choiceItem.id}`);
    return (await DatabaseQueries.map(await id, DatabaseQueries.unwrapChoice))[0];
  }
  
  static async unwrapMultiClassing(multiclassing): Promise<dnd.MultiClassing> {
    let prerequisites = Database.queryAll(`SELECT * FROM ArrayMultiClassingPrereqItem where array_id = ${multiclassing.prerequisites}`);
    let prerequisite_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${multiclassing.prerequisite_options}`);
    let proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${multiclassing.proficiencies}`);
    let proficiency_choices = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${multiclassing.proficiency_choices}`);
  
    return {
      prerequisites: await DatabaseQueries.map(await prerequisites, DatabaseQueries.unwrapArrayMultiClassingPrereqItem),
      prerequisite_options: (await DatabaseQueries.map(await prerequisite_options, DatabaseQueries.unwrapChoice))[0],
      proficiencies: await DatabaseQueries.map(await proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      proficiency_choices: await DatabaseQueries.map(await proficiency_choices, DatabaseQueries.unwrapArrayChoiceItem),
    };
  }
  
  static async unwrapArrayStartingEquipmentItem(equipItem): Promise<dnd.StartingEquipment> {
    let equipment = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${equipItem.equipment}'`);
  
    return {
      equipment: (await DatabaseQueries.map(await equipment, DatabaseQueries.unwrapAPIReference))[0],
      quantity: equipItem.quantity
    };
  }
  
  // TODO TRY CATCH E VIRGOLETTE E ARRAY FLATTEN
  
  static async unwrapSpellcastingInfo(info): Promise<dnd.SpellcastingInfo> {
    return {
      name: info.name,
      desc: info.desc
    };
  }
  
  static async unwrapArraySpellcastingInfoItem(infoItem): Promise<dnd.SpellcastingInfo> {
    let item = Database.queryAll(`SELECT * FROM SpellcastingInfo WHERE name = '${infoItem.item}'`);
    return (await DatabaseQueries.map(await item, DatabaseQueries.unwrapSpellcastingInfo))[0];
  }
  
  static async unwrapSpellcasting(casting): Promise<dnd.SpellCasting> {
    let spellcasting_ability = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${casting.spellcasting_ability}'`);
    let info = Database.queryAll(`SELECT * FROM ArraySpellcastingInfoItem WHERE array_id = ${casting.info}`);
  
    return {
      ability: (await DatabaseQueries.map(await spellcasting_ability, DatabaseQueries.unwrapAPIReference))[0],
      info: await DatabaseQueries.map(await info, DatabaseQueries.unwrapArraySpellcastingInfoItem),
      level: casting.level
    };
  }
  
  static async unwrapArrayCreatingSpellSlotItem(slotItem): Promise<dnd.CreatingSpellSlot> {
    return {
      sorcery_point_cost: slotItem.sorcery_point_cost === null ? undefined : slotItem.sorcery_point_cost,
      spell_slot_level: slotItem.spell_slot_level === null ? undefined : slotItem.spell_slot_level
    };
  }
  
  static async unwrapClassSpecific(specific): Promise<dnd.ClassSpecific> {
    let creating_spell_slots = Database.queryAll(`SELECT * FROM ArrayCreatingSpellSlotItem WHERE array_id = ${specific.creating_spell_slots}`);
  
    return {
      creating_spell_slots: await DatabaseQueries.map(await creating_spell_slots, DatabaseQueries.unwrapArrayCreatingSpellSlotItem),
      action_surges: specific.action_surges === null ? undefined : specific.action_surges,
      arcane_recovery_levels: specific.arcane_recovery_levels === null ? undefined : specific.arcane_recovery_levels,
      aura_range: specific.aura_range === null ? undefined : specific.aura_range,
      bardic_inspiration_die: specific.bardic_inspiration_die === null ? undefined : specific.bardic_inspiration_die,
      brutal_critical_dice: specific.brutal_critical_dice === null ? undefined : specific.brutal_critical_dice,
      channel_divinity_charges: specific.channel_divinity_charges === null ? undefined : specific.channel_divinity_charges,
      destroy_undead_cr: specific.destroy_undead_cr === null ? undefined : specific.destroy_undead_cr,
      extra_attacks: specific.extra_attacks === null ? undefined : specific.extra_attacks,
      favored_enemies: specific.favored_enemies === null ? undefined : specific.favored_enemies,
      favored_terrain: specific.favored_terrain === null ? undefined : specific.favored_terrain,
      indomitable_uses: specific.indomitable_uses === null ? undefined : specific.indomitable_uses,
      invocations_known: specific.invocations_known === null ? undefined : specific.invocations_known,
      ki_points: specific.ki_points === null ? undefined : specific.ki_points,
      magical_secrets_max_5: specific.magical_secrets_max_5 === null ? undefined : specific.magical_secrets_max_5,
      magical_secrets_max_7: specific.magical_secrets_max_7 === null ? undefined : specific.magical_secrets_max_7,
      magical_secrets_max_9: specific.magical_secrets_max_9 === null ? undefined : specific.magical_secrets_max_9,
      martial_arts: {
        dice_count: specific.martial_arts_dice_count === null ? undefined : specific.martial_arts_dice_count,
        dice_value: specific.martial_arts_dice_value === null ? undefined : specific.martial_arts_dice_value,
      },
      metamagic_known: specific.metamagic_known === null ? undefined : specific.metamagic_known,
      mystic_arcanum_level_6: specific.mystic_arcanum_level_6 === null ? undefined : specific.mystic_arcanum_level_6,
      mystic_arcanum_level_7: specific.mystic_arcanum_level_7 === null ? undefined : specific.mystic_arcanum_level_7,
      mystic_arcanum_level_8: specific.mystic_arcanum_level_8 === null ? undefined : specific.mystic_arcanum_level_8,
      mystic_arcanum_level_9: specific.mystic_arcanum_level_9 === null ? undefined : specific.mystic_arcanum_level_9,
      rage_count: specific.rage_count === null ? undefined : specific.rage_count,
      rage_damage_bonus: specific.rage_damage_bonus === null ? undefined : specific.rage_damage_bonus,
      sneak_attack: {
        dice_count: specific.sneak_attack_dice_count=== null ? undefined : specific.sneak_attack_dice_count, 
        dice_value: specific.sneak_attack_dice_value=== null ? undefined : specific.sneak_attack_dice_value,
      },
      song_of_rest_die: specific.song_of_rest_die === null ? undefined : specific.song_of_rest_die,
      sorcery_points: specific.sorcery_points === null ? undefined : specific.sorcery_points,
      unarmored_movement: specific.unarmored_movement === null ? undefined : specific.unarmored_movement,
      wild_shape: {
        fly: specific.wild_shape_fly === null ? undefined : specific.wild_shape_fly,
        max_cr: specific.wild_shape_max_cr === null ? undefined : specific.wild_shape_max_cr,
        swim: specific.wild_shape_swim === null ? undefined : specific.wild_shape_swim,
      }
    }
  }
  
  
  static async unwrapLevel(level): Promise<dnd.Level> {
    let features = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${level.features}`);
    let character_class = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${level.character_class}'`);
    let class_specific = Database.queryAll(`SELECT * FROM ClassSpecific WHERE id = ${level.class_specific}`);
    let subclass = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${level.subclass}'`);
  
    return {
      features: await DatabaseQueries.map(await features, DatabaseQueries.unwrapArrayAPIReferenceItem),
      character_class: (await DatabaseQueries.map(await character_class, DatabaseQueries.unwrapAPIReference))[0],
      class_specific: (await DatabaseQueries.map(await class_specific, DatabaseQueries.unwrapClassSpecific))[0],
      subclass: (await DatabaseQueries.map(await subclass, DatabaseQueries.unwrapAPIReference))[0],
      index: level.idx,
      level: level.level,
      ability_score_bonuses: level.ability_score_bonuses,
      prof_bonus: level.prof_bonus,
      cantrips_known: level.cantrips_known,
      spell_slots_level_1: level.spell_slots_level_1,
      spell_slots_level_2: level.spell_slots_level_2,
      spell_slots_level_3: level.spell_slots_level_3,
      spell_slots_level_4: level.spell_slots_level_4,
      spell_slots_level_5: level.spell_slots_level_5,
      spell_slots_level_6: level.spell_slots_level_6,
      spell_slots_level_7: level.spell_slots_level_7,
      spell_slots_level_8: level.spell_slots_level_8,
      spell_slots_level_9: level.spell_slots_level_9,
      spells_known: level.spells_known,
      additional_magical_secrets_max_lvl: level.additional_magical_secrets_max_lvl,
      aura_range: level.aura_range
    };
  }
  
  static async unwrapMagicSchool(school): Promise<dnd.MagicSchool> {
    return {
      index: school.idx,
      name: school.name,
      description: school.description,
    };
  }
  
  static async unwrapSpell(spell): Promise<dnd.Spell> {
    let magicSchool = Database.queryAll(`SELECT * FROM MagicSchool WHERE idx = '${spell.school}'`);
  
    return {
      magic_school: (await DatabaseQueries.map(await magicSchool, DatabaseQueries.unwrapMagicSchool))[0],
      classes: spell.classes.split("$$$"),
      name: spell.name,
      level: spell.level,
      action_type: spell.actionType,
      concentration: spell.concentration,
      ritual: spell.ritual,
      range: spell.range,
      material: spell.material,
      duration: spell.duration,
      description: spell.description,
      components: spell.components.split("$$$"),
      cantrip_upgrade: spell.cantripUpgrade,
      higher_level_slot: spell.higherLevelSlot,
      casting_trigger: spell.castingTrigger,
      casting_time: spell.castingTime,
    }
  }

  static async unwrapArrayContentItem(content): Promise<dnd.Content> {
    let item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${content.item}'`);

    return {
      item: (await DatabaseQueries.map(await item, DatabaseQueries.unwrapAPIReference))[0],
      quantity: content.quantity
    };
  }

  static async unwrapDifficultyClass(dc): Promise<dnd.DifficultyClass> {
    let dc_type = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${dc.dc_type}'`);

    return {
      dc_type: (await DatabaseQueries.map(await dc_type, DatabaseQueries.unwrapAPIReference))[0],
      dc_value: dc.dc_value,
      success_type: dc.success_type,
    };
  }

  static async unwrapArrayUtilizeItem(utilize): Promise<dnd.Utilize> {
    let dc = Database.queryAll(`SELECT * FROM DifficultyClass WHERE id = ${utilize.dc}`);

    return {
      name: utilize.name,
      dc: (await DatabaseQueries.map(await dc, DatabaseQueries.unwrapDifficultyClass))[0]
    };
  }

  static async unwrapEquipment(equip): Promise<dnd.Equipment> {
    let equipment_categories = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${equip.equipment_categories}`);
    let ammunition = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${equip.ammunition}'`);
    let countens = Database.queryAll(`SELECT * FROM ArrayContentItem WHERE array_id = ${equip.contents}`);
    let craft = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${equip.craft}`);
    let damage_type = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${equip.damage_type}'`);
    let damage_dc = Database.queryAll(`SELECT * FROM DifficultyClass WHERE id = ${equip.damage_dc}`);
    let mastery = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${equip.mastery}'`);
    let storage = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${equip.storage}`);
    let two_handed_dc = Database.queryAll(`SELECT * FROM DifficultyClass WHERE id = ${equip.two_handed_dc}`);
    let utilize = Database.queryAll(`SELECT * FROM ArrayUtilizeItem WHERE array_id = ${equip.utilize}`);
    let properties = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem where array_id = ${equip.properties}`);
    
    return {
      properties: await DatabaseQueries.map(await properties, DatabaseQueries.unwrapArrayAPIReferenceItem),
      equipment_categories: await DatabaseQueries.map(await equipment_categories, DatabaseQueries.unwrapArrayAPIReferenceItem),
      ammunition: (await DatabaseQueries.map(await ammunition, DatabaseQueries.unwrapAPIReference))[0],
      contents: await DatabaseQueries.map(await countens, DatabaseQueries.unwrapArrayContentItem),
      craft: await DatabaseQueries.map(await craft, DatabaseQueries.unwrapArrayAPIReferenceItem),
      damage: {
        type: (await DatabaseQueries.map(await damage_type, DatabaseQueries.unwrapAPIReference))[0],
        dc: (await DatabaseQueries.map(await damage_dc, DatabaseQueries.unwrapDifficultyClass))[0],
        dice: equip.damage_dice
      },
      mastery: (await DatabaseQueries.map(await mastery, DatabaseQueries.unwrapAPIReference))[0],
      storage: await DatabaseQueries.map(await storage, DatabaseQueries.unwrapArrayAPIReferenceItem),
      two_handed_damage: {
        type: equip.two_handed_damage_type,
        dice: equip.two_handed_damage_dice,
        dc: (await DatabaseQueries.map(await two_handed_dc, DatabaseQueries.unwrapDifficultyClass))[0],
      },
      utilize: await DatabaseQueries.map(await utilize, DatabaseQueries.unwrapArrayUtilizeItem),
      name: equip.name,
      cost: {
        quantity: equip.cost_quantity,
        unit: equip.cost_unit
      },
      description: equip.description,
      weight: equip.weight,
      armor_class: {
        base: equip.armor_class_base,
        dex_bonus: equip.armor_class_dex_bonus,
        max_bonus: equip.armor_class_max_bonus
      },
      doff_time: equip.doff_time,
      don_time: equip.don_time,
      image: equip.image,
      notes: equip.notes.split("$$$"),
      quantity: equip.quantity,
      range: {
        long: equip.range_long,
        normal: equip.range_normal
      },
      stealth_disadvantage: equip.stealth_disadvantage,
      str_minimum: equip.str_minimum,
      throw_range: {
        normal: equip.throw_range.normal,
        long: equip.throw_range.long,
      },
    };
  }
  
  
  static async unwrapClass(classRow): Promise<dnd.Class> {
    let multiclassing = Database.queryAll(`SELECT * FROM MultiClassing WHERE id = ${classRow.multi_classing}`);
    let proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${classRow.proficiencies}`);
    let proficiency_choices = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${classRow.proficiency_choices}`);
    let saving_throws = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${classRow.saving_throws}`);
    let starting_equipment = Database.queryAll(`SELECT * FROM ArrayStartingEquipmentItem WHERE array_id = ${classRow.starting_equipment}`);
    let starting_equipment_options = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${classRow.starting_equipment_options}`);
    let subclasses = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${classRow.subclasses}`);
    let spellcasting = Database.queryAll(`SELECT * FROM Spellcasting WHERE spellcasting_ability = '${classRow.spellcasting}'`);
    let levels = Database.queryAll(`SELECT * FROM Level WHERE character_class = '${classRow.idx}'`);
    let spells = Database.queryAll(`SELECT * FROM Spell WHERE classes LIKE '%${classRow.idx}%'`);
  
    return {
      name: classRow.name,
      spells: await DatabaseQueries.map(await spells, DatabaseQueries.unwrapSpell), 
      multiclassing: (await DatabaseQueries.map(await multiclassing, DatabaseQueries.unwrapMultiClassing))[0],
      proficiencies: await DatabaseQueries.map(await proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      proficiency_choices: await DatabaseQueries.map(await proficiency_choices, DatabaseQueries.unwrapArrayChoiceItem),
      saving_throws: await DatabaseQueries.map(await saving_throws, DatabaseQueries.unwrapArrayAPIReferenceItem),
      starting_equipment: await DatabaseQueries.map(await starting_equipment, DatabaseQueries.unwrapArrayStartingEquipmentItem),
      starting_equipment_options: await DatabaseQueries.map(await starting_equipment_options, DatabaseQueries.unwrapArrayChoiceItem),
      subclasses: await DatabaseQueries.map(await subclasses, DatabaseQueries.unwrapArrayAPIReferenceItem),
      spellcasting: (await DatabaseQueries.map(await spellcasting, DatabaseQueries.unwrapSpellcasting))[0],
      levels: await DatabaseQueries.map(await levels, DatabaseQueries.unwrapLevel),
      hit_die: classRow.hit_die,
    };
  }

  static retrieve(query, unwrapper) {
    const executor = (resolve, reject) => {
      Database
      .queryAll(query)
      .catch(err => reject(err))
      .then(values => {
        DatabaseQueries
        .map(values, unwrapper)
        .catch(suberr => reject(suberr))
        .then(objs => resolve(objs));
      });
    };
  
    return new Promise(executor);
  }
}

