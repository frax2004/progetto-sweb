import fs from 'fs';
import 'reflect-metadata';
import { models } from '../models.js';
import { isDeepStrictEqual } from 'util';


const RUNTIME_INPUT_DIR = "../old-data/";
const RUNTIME_OUTPUT_DIR = "../data/";
const REQUIRED_META = Symbol('required');

function required() {
  return Reflect.metadata(REQUIRED_META, true);
}

function isRequired(self: any, field: string) {
  return Reflect.getMetadata(REQUIRED_META, self, field);
}


export class Shapes {
  static match(obj: any, shape: any): boolean {
    if(shape === obj) return true;

    if(typeof shape == 'function') shape = new shape();

    const T = typeof shape;
    const U = typeof obj;
    
    if(T !== U) return false;
    if(T !== 'object') return true;
    
    if(Array.isArray(shape) && Array.isArray(obj)) {
      return obj.every(o => Shapes.match(o, shape[0]));
    } else if(Array.isArray(shape) || Array.isArray(obj)) return false;

    const keyMatch = (key: any) => key in shape && Shapes.match(obj[key], shape[key]);

    return Object
    .keys(shape)
    .filter(key => isRequired(shape, key))
    .every(key => key in obj)
    && Object
    .keys(obj)
    .every(keyMatch);
  }

  static decompose<T>(obj: unknown, shape: any): T[] {
    let result: T[] = [];
    
    const visit = (value: unknown) => {
      if(value === null || typeof value !== "object") {
        return;
      } else if(Shapes.match(value, shape)) {
        result.push(value as T);
        return;
      } else if(Array.isArray(value)) {
        for(const item of value) {
          visit(item);
        }
        return;
      } else {
        for(const child of Object.values(value)) {
          visit(child);
        }
        return;
      }
    };
  
    visit(obj);
    return result;
  }
  
}


function extract<T>(shape: any, inputPaths: string[], transformer?: (s: any) => any) {
  return inputPaths
  .map(
    path => {
      const data = JSON.parse(fs.readFileSync(RUNTIME_INPUT_DIR + path, 'utf8'));
      return Shapes.decompose<T>(data, shape);
    }
  )
  .filter(array => array.length !== 0)
  .flatMap(x => x)
  .map(transformer || (x => x));
}

namespace data {
  export class APIReference {
    @required()
    index: string = "";
    @required()
    name: string = "";
    @required()
    url: string = "";
    note: string = "";

    static equals(lhs: models.ArrayAPIReferenceItem, rhs: data.APIReference): boolean {
      return lhs.item === rhs.index;
    }

    static transform(x: data.APIReference, array_id: number, array_idx: number): models.ArrayAPIReferenceItem {
      return {
        array_id: array_id,
        array_idx: array_idx,
        item: x.index
      };
    }
  }

  export class Choice {
    desc: string = "";
    choose: number = 0;
    type: string = "";
    from = OptionSet;
    
    public static equals(lhs: models.ArrayChoiceItem, rhs: any) {
      return lhs.id === getOrInsertId(
        data.option_sets,
        rhs.from
      );
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayChoiceItem {
      return {
        array_id: array_id,
        array_idx: array_idx,
        id: getOrInsertId(
          data.option_sets,
          x.from
        )
      };
    }
  }

  export class DifficultyClass {
    dc_type = APIReference;
    dc_value: number = 0;
    success_type: string = "";
  }

  export class Damage {
    damage_type = APIReference;
    damage_dice: string = "";
    dc = DifficultyClass;

    public static equals (lhs: models.ArrayDamageItem, rhs: any) {
      return lhs.damage_type === rhs.damage_type?.index;
    }
    
    public static transform (x: any, array_id: number, array_idx: number): models.ArrayDamageItem {
      return {
        array_id: array_id,
        damage_type: x.damage_type?.index,
        damage_dice: x.damage_dice,
        dc: getOrInsertId(data.difficulty_classes, x.dc),
        array_idx: array_idx
      }
    }
  }

  export class OptionSet {
    @required()
    option_set_type: string = "";
    equipment_category = APIReference;
    resource_list_url: string = "";
    options = [
      Option
    ]
  }

  export class OptionPrerequisite {
    type: string = "";
    proficiency = APIReference;

    public static equals(lhs: models.ArrayPrerequisitesItem, rhs: any) {
      
      return lhs.item === rhs.proficiency?.index && lhs.string === rhs.type;
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayPrerequisitesItem {
      // console.log(x);
      return {
        string: x.type,
        item: x.proficiency?.index,
        array_id: array_id,
        array_idx: array_idx
      };
    } 
  }

  export class Option {
    @required()
    option_type: string = "";
    item = APIReference;
    choice = Choice;
    string: string = "";
    ability_score = APIReference;
    bonus: number = 0;
    action_name: string = "";
    count: number = 0;
    type: string = "";
    desc: string = "";
    name: string = "";
    dc = DifficultyClass;
    damage = [
      Damage
    ];
    of = APIReference;
    prerequisites = [OptionPrerequisite];
    damage_dice: string = "";
    damage_type = APIReference;
    notes: string = "";
    alignments = [
      APIReference
    ];
    unit: string = "";
    items = [
      Option
    ];
    minimum_score: number = 0;
    size: string = "";

    public static equals(lhs: models.ArrayOptionItem, rhs: any) {
      return lhs.array_id === getOrInsertId(data.options, rhs);
      // if(rhs.option_type !== lhs.option_type) return false;
      // switch (rhs.option_type) {
      //   case 'reference':
      //     return rhs.item.index === lhs.reference_item;
      //   case 'choice':
      //     return getOrInsertId(data.option_sets,rhs.choice.from)===lhs.choice_id;
      //   case 'string':
      //     return rhs.string === lhs.string;
      //   case 'ability_bonus':
      //     return rhs.ability_score.index === lhs.ability_score_bonus
      //     && rhs.bonus === lhs.bonus;
      //   case 'action':
      //     return rhs.action_name === lhs.action_name
      //     && rhs.count === lhs.action_count
      //     && rhs.type === lhs.action_type
      //     && rhs.desc === lhs.action_desc;
      //   case 'breath':
      //     return rhs.name === lhs.breath_name
      //     && rhs.dc === lhs.breath_dc
      //     && getOrInsertArrayId(
      //       data.ArrayDamage,
      //       rhs.damage,
      //       data.Damage.equals,
      //       data.Damage.transform
      //     )===lhs.breath_damage;
      //   case 'counted_reference':
      //     return rhs.count === lhs.counted_reference_count
      //     && rhs.of?.index === lhs.counted_item
      //     && getOrInsertArrayId(
      //       data.ArrayPrerequisite,
      //       rhs.prerequisites,
      //       data.OptionPrerequisite.equals,
      //       data.OptionPrerequisite.transform
      //     )===lhs.prerequisites;
      //   case 'damage':
      //     return rhs.damage_dice === lhs.damage_dice
      //     && rhs.damage_type.index === lhs.damage_type
      //     && rhs.notes === lhs.damage_notes;
      //   case 'ideal':
      //     return getOrInsertArrayId(
      //       data.ArrayAPIReference,
      //       rhs.alignments,
      //       data.APIReference.equals,
      //       data.APIReference.transform
      //     )===lhs.alignments
      //     && rhs.desc === lhs.align_desc;
      //   case 'money':
      //     return rhs.count === lhs.money_count
      //     && rhs.unit === lhs.money_unit;
      //   case 'multiple':
      //     return getOrInsertArrayId(
      //       data.ArrayOption,
      //       rhs.items,
      //       data.Option.equals,
      //       data.Option.transform
      //     )===lhs.multiple_items
      //     && rhs.desc === lhs.multiple_desc;
      //   case 'score_prerequisite':
      //     return rhs.ability_score.index === lhs.ability_score_prerequisite
      //     && rhs.minimum_score === lhs.minimum_score_prerequisite;
      //   case 'size':
      //     return rhs.size === lhs.size;
      //   default:
      //     return false;
      // }
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayOptionItem {
      return {
        item_id: getOrInsertId(data.options, x),
        array_idx: array_idx,
        array_id: array_id
      }
    //   let res = new models.Option();
    //   res.option_type = x.option_type;
    //   switch (x.option_type) {
    //     case 'reference':
    //       res.reference_item = x.item.index;
    //       break;
    //     case 'choice':
    //       res.choice_id = getOrInsertId(data.option_sets,x.choice.from);
    //       break;
    //     case 'string':
    //       res.string = x.string;
    //       break;
    //     case 'ability_bonus':
    //       res.ability_score_bonus = x.ability_score.index;
    //       res.bonus = x.bonus;
    //       break;
    //     case 'action':
    //       res.action_name = x.action_name;
    //       res.action_count = x.count;
    //       res.action_type = x.type;
    //       res.action_desc = x.desc;
    //       break;
    //     case 'breath':
    //       res.breath_name = x.name;
    //       res.breath_dc = x.dc;
    //       res.breath_damage = getOrInsertArrayId(
    //         data.ArrayDamage,
    //         x.damage,
    //         data.Damage.equals,
    //         data.Damage.transform
    //       );
    //       break;
    //     case 'counted_reference':
    //       res.counted_reference_count = x.count;
    //       res.counted_item = x.of.index;
    //       res.prerequisites = getOrInsertArrayId(
    //         data.ArrayPrerequisite,
    //         x.prerequisites,
    //         data.OptionPrerequisite.equals,
    //         data.OptionPrerequisite.transform
    //       );
    //       break;
    //     case 'damage':
    //       res.damage_dice = x.damage_dice;
    //       res.damage_type = x.damage_type.index;
    //       res.damage_notes = x.notes;
    //       break;
    //     case 'ideal':
    //       res.alignments = getOrInsertArrayId(
    //         data.ArrayAPIReference,
    //         x.alignments,
    //         data.APIReference.equals,
    //         data.APIReference.transform
    //       );
    //       res.align_desc = x.desc;
    //       break;
    //     case 'money':
    //       res.money_count = x.count;
    //       res.money_unit = x.unit;
    //       break;
    //     case 'multiple':
    //       res.multiple_items = getOrInsertArrayId(
    //         data.ArrayOption,
    //         x.items,
    //         data.Option.equals,
    //         data.Option.transform
    //       );
    //       res.multiple_desc = x.desc;
    //       break;
    //     case 'score_prerequisite':
    //       res.ability_score_prerequisite = x.ability_score.index;
    //       res.minimum_score_prerequisite = x.minimum_score;  
    //       break;
    //     case 'size':
    //       res.size = x.size;
    //       break;
    //     default:
    //       break;
    //   }
    //   return res;
    }
  }

  export class DamageType {
    @required()
    index: string = "";
    @required()
    name: string = "";
    @required()
    description: string = "";
    @required()
    url: string = "";
  }

  export class AbilityScore {
    @required()
    index: string = "";
    name: string = ""
    @required()
    full_name: string = "";
    description: string = "";
    skills = [
      APIReference
    ];
    url: string = "";
  }

  //non faccio alignment, c'è già tutto nel file dedicato

  export class StartingEquipment {
    equipment = APIReference;
    quantity: number = 0;

    public static equals(lhs: models.ArrayStartingEquipmentItem, rhs: any) {
      return lhs.equipment === rhs.equipment?.index
      && lhs.quantity === rhs.quantity;
    }
    public static transform(x: any, array_id: number, array_idx: number): models.ArrayStartingEquipmentItem {
      return {
        array_id: array_id,
        array_idx: array_idx,
        equipment: x.equipment?.index,
        quantity: x.quantity
      };
    }
  }

  // cost e backgroundFeature non esistono nel db, 
  // mi servono ai fini del riconoscimento di background

  export class Cost {
    quantity: number = 0;
    unit: string = "";
  }

  export class BackgroundFeature {
    name: string = "";
    desc = [""];
  }

  export class Background {
    @required()
    index: string = "";
    @required()
    name: string = "";
    starting_proficiencies = [
      APIReference
    ];
    language_options = Choice;
    starting_equipment = [
      StartingEquipment
    ];
    starting_equipment_options = [
      Choice
    ];
    starting_gold = Cost;
    feature = BackgroundFeature;
    personality_traits = Choice;
    ideals = Choice;
    bonds = Choice;
    flaws = Choice;
    url: string = "";
  }


  export class SpellcastingInfo {
    name: string = "";
    desc = [""];
    
    public static equals(lhs: models.ArraySpellcastingInfoItem, rhs: any) {
      return lhs.item === rhs.name;
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArraySpellcastingInfoItem {
      return {
        array_id: array_id,
        array_idx: array_idx,
        item: x.name,
      };
    }
  }

  export class SpellCasting {
    level: number = 0;
    spellcasting_ability = APIReference;
    info = [SpellcastingInfo];
  }

  export class MultiClassingPrereq {
    ability_score = APIReference;
    minimum_score: number = 0;

    public static equals(lhs: models.ArrayMultiClassingPrereqItem, rhs: any) {
      return lhs.item === getOrInsertId(data.multiclassing_prereqs, rhs);
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayMultiClassingPrereqItem {
      return {
        item: getOrInsertId(data.multiclassing_prereqs, x),
        array_id: array_id,
        array_idx: array_idx
      };
    }
  }

  export class MultiClassing {
    prerequisites = [MultiClassingPrereq];
    prerequisite_options = Choice;
    proficiencies = [APIReference];
    proficiency_choices = [Choice];
  }

  export class Class {
    @required()
    index: string = "";
    @required()
    name: string = "";
    @required()
    hit_die: number = 0;
    @required()
    class_levels: string = "";
    multi_classing = MultiClassing;
    proficiencies = [APIReference];
    proficiency_choices = [Choice];
    saving_throws = [APIReference];
    starting_equipment = [StartingEquipment];
    starting_equipment_options = [Choice];
    subclasses = [APIReference];
    spellcasting = SpellCasting;
    spells: string = "";
    url: string = "";
  }

  export class Condition {
    index: string = "";
    name: string = "";
    description: string = "";
    url: string = "";
  }

  export class EquipmentCategory {
    index: string = "";
    name: string = "";
    equipment = [APIReference];
    url: string = "";
  }

  export class ArmorClass {
    @required()
    base: number = 0;
    @required()
    dex_bonus: boolean = false;
    max_bonus: number = 0;
  }

  export class _Range {
    @required()
    normal: number = 0;
    long: number = 0;
  }

  export class ThrowRange {
    @required()
    normal: number = 0;
    @required()
    long: number = 0;
  }

  export class Content {
    @required()
    item = APIReference;
    @required()
    quantity: number = 0;

    public static equals(lhs: models.ArrayContentItem, rhs: any) {
      return lhs.item === rhs.item?.index
      && lhs.quantity === rhs.quantity;
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayContentItem {
      return {
        item: x.item?.index,
        quantity: x.quantity,
        array_id: array_id,
        array_idx: array_idx,
      };
    }
  }

  export class Utilize {
    @required()
    name: string = "";
    @required()
    dc = DifficultyClass;

    public static equals(lhs: models.ArrayUtilizeItem, rhs: any) {
      return lhs.item === rhs.name
      && lhs.dc === getOrInsertId(data.difficulty_classes, rhs.dc);
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayUtilizeItem {
      return {
        array_id: array_id,
        array_idx: array_idx,
        item: x.name,
        dc: getOrInsertId(data.difficulty_classes, x.dc)
      };
    }
  }

  export class Equipment {
    index: string = "";
    name: string = "";
    equipment_categories = [APIReference];
    cost = Cost;
    url: string = "";
    description: string = "";
    weight: number = 0;
    ammunition = APIReference;
    armor_class = ArmorClass;
    contents = [Content];
    ability = APIReference;
    craft = [APIReference];
    damage = Damage;
    doff_time: string = "";
    don_time: string = "";
    image: string = "";
    mastery = APIReference;
    notes = [""];
    properties = [APIReference];
    quantity: number = 0;
    storage = APIReference;
    range = _Range;
    stealth_disadvantage: boolean = false;
    str_minimum: number = 0;
    throw_range = ThrowRange;
    two_handed_damage = Damage;
    utilize = [Utilize];
  }

  export class FeatPrerequisites {
    minimum_level: number = 0;
    feature_named: string = "";
  }

  export class Feat {
    index: string = "";
    name: string = "";
    description: string = "";
    type: string = "";
    repeatable: string = "";
    prerequisites = FeatPrerequisites;
    prerequisite_options = Choice;
    url: string = "";
  }

  export class Language {
    index: string = "";
    name: string = "";
    is_rare: boolean = false;
    note: string = "";
    url: string = "";
  }

  export class MagicItem {
    name: string = "";
    index: string = "";
    url: string = "";
    image: string = "";
    equipment_category = APIReference;
    variant: boolean = false;
    variants = [APIReference];
    attunement: boolean = false;
    rarity = class {
      name: string = "";
    };
    desc: string = "";
    'limited-to': string = "";
  }

  export class MagicSchool {
    @required()
    index: string = "";
    @required()
    name: string = "";
    @required()
    description: string = "";
    @required()
    url: string = "";
  }

  export class Proficiency {
    @required()
    index: string = "";
    @required()
    name: string = "";
    @required()
    type: string = "";
    backgrounds = [APIReference];
    classes = [APIReference];
    reference = APIReference;
    url: string = "";
  }

  export class Skill {
    @required()
    index: string = "";
    @required()
    name: string = "";
    @required()
    description: string = "";
    @required()
    url: string = "";
    ability_score = APIReference;
  }

  export class AbilityBonus {
    ability_score = APIReference;
    bonus: number = 0;

    public static equals(lhs: models.ArrayAbilityBonusItem, rhs: any) {
      return lhs.ability_score === rhs.ability_score?.index
      && lhs.bonus === rhs.bonus;
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayAbilityBonusItem {
      return {
        ability_score: x.ability_score?.index,
        bonus: x.bonus,
        array_id: array_id,
        array_idx: array_idx
      };
    }
  }

  export class Species {
    @required()
    index: string = "";
    @required()
    name: string = "";
    @required()
    speed: number = 0;
    ability_bonuses = [AbilityBonus];
    ability_bonus_options = Choice;
    alignment: string = "";
    age: string = "";
    size: string = "";
    size_description: string = "";
    starting_proficiencies = [APIReference];
    starting_proficiency_options = Choice;
    languages = [APIReference];
    language_desc: string = "";
    language_options = Choice;
    traits = [APIReference];
    subraces = [APIReference];
    url: string = "";
  }

  export class SubclassSpellPrerequisite {
    @required()
    index: string = "";
    @required()
    type: string = "";
    @required()
    name: string = "";
    @required()
    url: string = "";

    public static equals(lhs: models.ArraySubclassSpellPrerequisiteItem, rhs: any) {
      return lhs.item === rhs.index;
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArraySubclassSpellPrerequisiteItem {
      return {
        array_id: array_id,
        array_idx: array_idx,
        item: x.index
      };
    }
  }

  export class SubclassSpell {
    prerequisites = [SubclassSpellPrerequisite];
    spell = APIReference;

    public static equals(lhs: models.ArraySubclassSpellItem, rhs: any) {
      return lhs.spell === rhs.spell?.index
      && lhs.prerequisite === getOrInsertArrayId(
        data.ArraySubclassSpellPrerequisite,
        rhs.prerequisites,
        data.SubclassSpellPrerequisite.equals,
        data.SubclassSpellPrerequisite.transform
      );
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArraySubclassSpellItem {
      return {
        spell: x.spell?.index,
        prerequisite: getOrInsertArrayId(
          data.ArraySubclassSpellPrerequisite,
          x.prerequisites,
          data.SubclassSpellPrerequisite.equals,
          data.SubclassSpellPrerequisite.transform
        ),
        array_id: array_id,
        array_idx: array_idx
      };
    }
  }

  export class Subclass {
    index: string = "";
    name: string = "";
    //si chiama class, problema?
    class = APIReference;
    subclass_flavor: string = "";
    desc = [""];
    subclass_levels: string = "";
    spells = [SubclassSpell];
    url: string = "";
  }

  export class Subrace {
    index: string = "";
    name: string = "";
    race = APIReference;
    desc: string = "";
    ability_bonuses = [AbilityBonus];
    racial_traits = [APIReference];
    url: string = "";
  }

  export class Spell {
    name: string = "";
    level: number = 0;
    school: string = "";
    classes = [""];
    actionType: string = "";
    concentration: boolean = false;
    ritual: boolean = false;
    range: string = "";
    components = [""];
    material: string = "";
    duration: string = "";
    description: string = "";
    cantripUpgrade: string = "";
  }

  export class AreaOfEffect {
    @required()
    size: number = 0;
    @required()
    type: string = "";
  }

  export class BreathWeaponUsage {
    @required()
    type: string = "";
    @required()
    times: number = 0;
  }

  export class BreathWeaponDamage {
    damage_type = APIReference;
    damage_at_character_level = class {
      "1": string = "";
      "6": string = "";
      "11": string = "";
      "16": string = "";
    }

    public static equals(lhs: models.ArrayBreathWeaponDamageItem, rhs: any) {
      return lhs.damage_type === rhs.damage_type?.index
      && lhs.character_level === JSON.stringify(rhs.damage_at_character_level);
    }

    public static transform(x: any, array_id: number, array_idx: number): models.ArrayBreathWeaponDamageItem {
      return {
        damage_type: x.damage_type?.index,
        array_id: array_id,
        array_idx: array_idx,
        character_level: JSON.stringify(x.damage_at_character_level),
      };
    }
  }

  export class BreathWeapon {
    name: string = "";
    desc: string = "";
    area_of_effect = AreaOfEffect;
    usage = BreathWeaponUsage;
    dc = DifficultyClass;
    damage = [BreathWeaponDamage];
  }

  export class TraitSpecific {
    damage_type = APIReference;
    breath_weapon = BreathWeapon;
    spell_options = Choice;
    subtrait_options = Choice;
  }

  export class Trait {
    index: string = "";
    name: string = "";
    desc = [""];
    races = [APIReference];
    subraces = [APIReference];
    proficiencies = [APIReference];
    url: string = "";
    proficiency_choices = Choice;
    language_options = Choice;
    parent = APIReference;
    trait_specific = TraitSpecific;
  }

  export class WeaponProperty {
    index: string = "";
    description: string = "";
    name: string = "";
    url: string = "";
  }

  export class ClassSpecific {
    action_surges: number = 0;
    arcane_recovery_levels: number = 0;
    aura_range: number = 0;
    bardic_inspiration_die: number = 0;
    brutal_critical_dice: number = 0;
    channel_divinity_charges: number = 0;
    creating_spell_slots = [
      class { // models.ArrayCreatingSpellSlotsItem
        sorcery_point_cost: number = 0;
        spell_slot_level: number = 0;
      }
    ]; 
    destroy_undead_cr: number = 0;
    extra_attacks: number = 0;
    favored_enemies: number = 0;
    favored_terrain: number = 0;
    indomitable_uses: number = 0;
    invocations_known: number = 0;
    ki_points: number = 0;
    magical_secrets_max_5: number = 0;
    magical_secrets_max_7: number = 0;
    magical_secrets_max_9: number = 0;
    martial_arts = class {
      dice_count: number = 0;
      dice_value: number = 0;
    };
    metamagic_known: number = 0;
    mystic_arcanum_level_6: number = 0;
    mystic_arcanum_level_7: number = 0;
    mystic_arcanum_level_8: number = 0;
    mystic_arcanum_level_9: number = 0;
    rage_count: number = 0;
    rage_damage_bonus: number = 0;
    sneak_attack = class {
      dice_count: number = 0;
      dice_value: number = 0;
    };
    song_of_rest_die: number = 0;
    sorcery_points: number = 0;
    unarmored_movement: number = 0;
    wild_shape_fly: boolean = false;
    wild_shape_max_cr: number = 0;
    wild_shape_swim: boolean = false;
  }

  export class LevelSpellcasting {
    cantrips_known: number = 0;
    spell_slots_level_1: number = 0;
    spell_slots_level_2: number = 0;
    spell_slots_level_3: number = 0;
    spell_slots_level_4: number = 0;
    spell_slots_level_5: number = 0;
    spell_slots_level_6: number = 0;
    spell_slots_level_7: number = 0;
    spell_slots_level_8: number = 0;
    spell_slots_level_9: number = 0;
    spells_known: number = 0;
  }

  export class SubclassSpecific {
    additionale_magical_secrets_max_lvl: number = 0;
    aura_range: number = 0;
  }

  export class Level {
    index: string = "";
    level: number = 0;
    ability_score_bonuses: number = 0;
    prof_bonus: number = 0;
    features = [APIReference];
    class = APIReference;
    class_specific = ClassSpecific;
    spellcasting = LevelSpellcasting;
    subclass = APIReference;
    subclass_specific = SubclassSpecific;
    url: string = "";
  }

  // prima di scrivere il json che conterrà questo oggetto
  // si assegnaerà ad ogni elemento di ogni array, l'indice del proprio array
  // e poi si farà il flatten: [[{index: 0}, {}, {}], [{index: 1}], [...]]
  export let ArrayAPIReference: models.ArrayAPIReferenceItem[][] = [];
  export let ArrayPrerequisite: models.ArrayPrerequisitesItem[][] = [];
  export let ArrayOption: models.ArrayOptionItem[][] = [];
  export let ArrayDamage: models.ArrayDamageItem[][] = [];
  export let ArrayStartingEquipment: models.ArrayStartingEquipmentItem[][] = [];
  export let ArrayChoice: models.Choice[][] = [];
  export let ArraySpellcastingInfo: models.SpellcastingInfo[][] = [];
  export let ArrayMultiClassingPrereqs: models.ArrayMultiClassingPrereqItem[][] = [];
  export let ArrayContents: models.ArrayContentItem[][] = [];
  export let ArrayUtilize: models.Utilize[][] = [];
  export let ArrayAbilityBonus: models.ArrayAbilityBonusItem[][] = [];
  export let ArraySubclassSpell: models.ArraySubclassSpellItem[][] = [];
  export let ArraySubclassSpellPrerequisite: models.ArraySubclassSpellPrerequisiteItem[][] = [];
  export let ArrayBreathWeaponDamage: models.ArrayBreathWeaponDamageItem[][] = [];
  export let ArrayCreatingSpellSlots: models.ArrayCreatingSpellSlotsItem[][] = [];

  export let class_specifics: any[] = [];
  export let trait_specifics: any[] = [];
  export let area_of_effects: any[] = [];
  export let breath_weapons: any[] = [];
  export let multiclassings: any[] = [];
  export let option_sets: any[] = [];
  export let multiclassing_prereqs: any[] = [];
  export let difficulty_classes: any[] = [];
  export let options: any[] = [];
}

function getOrInsertId(array: any[], searched: any): number | undefined {
  if(searched === undefined) return undefined;

  const id = array.findIndex(item => isDeepStrictEqual(searched, item));
  if(id < 0) {
    const result = array.length;
    array.push(searched);
    return result;
  } else return id;
}

function getOrInsertArrayId(table: any[], actual: any[], equals: (lhs: any, rhs: any) => boolean, transform: (x: any, array_id: number, array_idx: number) => any): number | undefined {
  if (actual===undefined) return undefined;
  if (actual.length === 0) return undefined;
  const i = table.findIndex(expected => {
    if(expected.length !== actual.length) return false;
    for(let j = 0; j < expected.length; ++j) {
      if(!equals(expected[j], actual[j])) return false;
    }
    return true;
  });

  if(i < 0) {
    const id = table.length;
    table.push(actual.map((x, k) => transform(x, id, k)));
    return id;
  } else return i;
}


interface TranslateContext {
  extractor: (shape: any, inputs: string[]) => any;
  shape: any;
  inputs: string[]; 
  output: string;
  mapper: (json: any) => any;
}

function translate(ctx: TranslateContext): void {
  const extracted = ctx.extractor(ctx.shape, ctx.inputs);
  const translated = extracted.map(ctx.mapper);
  fs.writeFileSync(RUNTIME_OUTPUT_DIR + ctx.output, JSON.stringify(translated), 'utf8');
}



const allFiles = fs
.readdirSync(RUNTIME_INPUT_DIR, 'utf8')
.filter((path: string) => path.startsWith('5e'));

[
  {
    extractor: extract<data.APIReference>,
    shape: new data.APIReference(),
    mapper: function (x: any): models.APIReference {
      return {
        idx: x.index,
        url: x.url,
        name: x.name,
        note: x.note,
      };
    },
    inputs: allFiles,
    output: "APIReference.json"
  },
  {
    extractor: extract<data.Choice>,
    shape: new data.Choice(),
    mapper: function (x: any): models.Choice {
      return {
        choose: x.choose,
        desc: x.desc,
        type: x.type,
        id: getOrInsertId(data.option_sets, x.from)
      }
    },
    inputs: allFiles,
    output: "Choice.json"
  },
  {
    extractor: extract<data.DifficultyClass>,
    shape: new data.DifficultyClass(),
    mapper: function (x: any): models.DifficultyClass {
      return {
        id: getOrInsertId(data.difficulty_classes, x),
        dc_type: x.dc_type?.index,
        dc_value: x.dc_value,
        success_type: x.success_type
      };
    },
    inputs: allFiles,
    output: "DifficultyClass.json"
  },
  {
    extractor: extract<data.Damage>,
    shape: new data.Damage(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "Damage.json"
  },
  {
    extractor: extract<data.OptionSet>,
    shape: new data.OptionSet(),
    mapper: function (x: any): models.OptionSet {
      return {
        id: getOrInsertId(data.option_sets, x),
        option_set_type: x.option_set_type,
        equipment_category: x.equipment_category?.index,
        resource_list_url: x.resource_list_url,
        options_array: getOrInsertArrayId(
          data.ArrayOption,
          x.options,
          data.Option.equals,
          data.Option.transform
        )
      };
    },
    inputs: allFiles,
    output: "OptionSet.json"
  },
  {
    extractor: extract<data.Option>,
    shape: new data.Option(),
    mapper: function(x: any): models.Option {
      return {
        id: getOrInsertId(data.options, x),
        option_type: x.option_type,
        reference_item: x.item?.index,
        choice_id: getOrInsertId(data.option_sets, x.choice?.from),
        string: x.string,
        ability_score_bonus: x.ability_score?.index,
        bonus: x.bonus,
        action_name: x.action_name,
        action_count: x.count,
        action_type: x.type,
        action_desc: x.desc,
        breath_name: x.name,
        breath_dc: getOrInsertId(data.difficulty_classes, x.dc),
        breath_damage: getOrInsertArrayId(
          data.ArrayDamage,
          x.damage,
          data.Damage.equals,
          data.Damage.transform
        ),
        counted_reference_count: x.count,
        counted_item: x.item?.index,
        prerequisites: getOrInsertArrayId(
          data.ArrayPrerequisite, 
          x.prerequisites, 
          data.OptionPrerequisite.equals,
          data.OptionPrerequisite.transform
        ),
        damage_dice: x.damage_dice,
        damage_type: x.damage_type?.index, 
        alignments: getOrInsertArrayId(
          data.ArrayPrerequisite, 
          x.alignments,
          data.OptionPrerequisite.equals,
          data.OptionPrerequisite.transform
        ), 
        money_count: x.count,
        money_unit: x.unit,
        multiple_items: getOrInsertArrayId(
          data.ArrayOption,
          x.items,
          data.Option.equals,
          data.Option.transform
        ), 
        ability_score_prerequisite: x.ability_score?.index,
        damage_notes: x.notes,
        align_desc: x.desc,
        multiple_desc: x.desc,
        minimum_score_prerequisite: x.minimum_score,
        size: x.size,
      }
    },
    inputs: allFiles,
    output: "Option.json"
  },
  {
    extractor: extract<data.DamageType>,
    shape: new data.DamageType(),
    mapper: function (x: any): models.DamageTypes {
      return {
        idx: x.index,
        name: x.name,
        description: x.description,
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Damage-Types.json"],
    output: "DamageType.json"
  },
  {
    extractor: extract<data.AbilityScore>,
    shape: new data.AbilityScore(),
    mapper: function (x: any): models.AbilityScore {
      return {
        idx: x.index,
        name: x.name,
        full_name: x.full_name,
        description: x.description,
        skills: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.skills,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        url: x.url,
      }
    },
    inputs: ["5e-SRD-Ability-Scores.json"],
    output: "AbilityScore.json"
  },
  {
    extractor: extract<data.StartingEquipment>,
    shape: new data.StartingEquipment(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Classes.json"],
    output: "StartingEquipment.json"
  },
  {
    extractor: extract<data.Cost>,
    shape: new data.Cost(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Equipments.json"],
    output: "Cost.json"
  },
  {
    extractor: extract<data.BackgroundFeature>,
    shape: new data.BackgroundFeature(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Backgrounds.json"],
    output: "BackgroundFeature.json"
  },
  {
    extractor: extract<data.Background>,
    shape: new data.Background(),
    mapper: function (x: any): models.Background {
      return {
        idx: x.index,
        name: x.name,
        starting_proficiencies: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.starting_proficiencies,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        language_options: getOrInsertId(
          data.option_sets,
          x.language_options?.from
        ),
        starting_equipment: getOrInsertArrayId(
          data.ArrayStartingEquipment,
          x.starting_equipment,
          data.StartingEquipment.equals,
          data.StartingEquipment.transform
        ),
        starting_gold_quantity: x.starting_gold?.quantity,
        starting_gold_unit: x.starting_gold?.unit,
        starting_equipment_options: getOrInsertArrayId(
          data.ArrayChoice,
          x.starting_equipment_options,
          data.Choice.equals,
          data.Choice.transform
        ),
        feature_name: x.feature?.name,
        feature_desc: x.feature?.desc,
        personality_traits: getOrInsertId(
          data.option_sets,
          x.personality_traits?.from
        ),
        ideals: getOrInsertId(
          data.option_sets,
          x.ideals?.from
        ),
        bonds: getOrInsertId(
          data.option_sets,
          x.bonds?.from
        ),
        flaws: getOrInsertId(
          data.option_sets,
          x.flaws?.from
        ),
        url: x.url,
      }
    },
    inputs: ["5e-SRD-Backgrounds.json"],
    output: "Background.json"
  },
  {
    extractor: extract<data.SpellcastingInfo>,
    shape: new data.SpellcastingInfo(),
    mapper: function(x: any): models.SpellcastingInfo {
      return {
        name: x.name,
        desc: x.desc?.join("$$$"),
      };
    },
    inputs: ["5e-SRD-Classes.json"],
    output: "SpellcastingInfo.json"
  },
  {
    extractor: extract<data.SpellCasting>,
    shape: new data.SpellCasting(),
    mapper: function(x: any): models.Spellcasting {
      return {
        level: x.level,
        spellcasting_ability: x.spellcasting_ability?.index,
        info: getOrInsertArrayId(
          data.ArraySpellcastingInfo,
          x.info,
          data.SpellcastingInfo.equals,
          data.SpellcastingInfo.transform
        )
      };
    },
    inputs: ["5e-SRD-Classes.json"],
    output: "Spellcasting.json"
  },
  {
    extractor: extract<data.MultiClassingPrereq>,
    shape: new data.MultiClassingPrereq(),
    mapper: function(x: any): models.MultiClassingPrereq {
      return {
        id: getOrInsertId(data.multiclassing_prereqs, x),
        ability_score: x.ability_score?.index,
        minimum_score: x.minimum_score,
      };
    },
    inputs: ["5e-SRD-Classes.json"],
    output: "MultiClassingPrereq.json"
  },
  {
    extractor: extract<data.MultiClassing>,
    shape: new data.MultiClassing(),
    mapper: function(x: any): models.MultiClassing {
      return {
        id: getOrInsertId(data.multiclassings, x),
        prerequisites: getOrInsertArrayId(
          data.ArrayMultiClassingPrereqs,
          x.prerequisites,
          data.MultiClassingPrereq.equals,
          data.MultiClassingPrereq.transform
        ),
        prerequisite_options: getOrInsertId(
          data.option_sets,
          x.prerequisite_options
        ),
        proficiencies: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.proficiencies,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        proficiency_choices: getOrInsertArrayId(
          data.ArrayChoice,
          x.proficiency_choices,
          data.Choice.equals,
          data.Choice.transform
        ),
      };
    },
    inputs: ["5e-SRD-Classes.json"],
    output: "MultiClassing.json"
  },
  {
    extractor: extract<data.Class>,
    shape: new data.Class(),
    mapper: function(x: any): models.Class {
      return {
        idx: x.index,
        name: x.name,
        hit_die: x.hit_die,
        class_levels: x.class_levels,
        multi_classing: getOrInsertId(
          data.multiclassings,
          x.multi_classing
        ),
        proficiencies: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.proficiencies,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        proficiency_choices: getOrInsertArrayId(
          data.ArrayChoice,
          x.proficiency_choices,
          data.Choice.equals,
          data.Choice.transform
        ),
        saving_throws: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.saving_throws,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        starting_equipment: getOrInsertArrayId(
          data.ArrayStartingEquipment,
          x.starting_equipment,
          data.StartingEquipment.equals,
          data.StartingEquipment.transform
        ),
        starting_equipment_options: getOrInsertArrayId(
          data.ArrayChoice,
          x.starting_equipment_options,
          data.Choice.equals,
          data.Choice.transform
        ),
        subclasses: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.subclasses,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        spellcasting: x.spellcasting?.spellcasting_ability?.index,
        spells: x.spells,
        url: x.url,
      }
    },
    inputs: ["5e-SRD-Classes.json"],
    output: "Class.json"
  },
  {
    extractor: extract<data.Condition>,
    shape: new data.Condition(),
    mapper: function(x: any): models.Condition {
      return {
        idx: x.index,
        name: x.name,
        description: x.description,
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Conditions.json"],
    output: "Condition.json"
  },
  {
    extractor: extract<data.EquipmentCategory>,
    shape: new data.EquipmentCategory(),
    mapper: function(x: any): models.EquipmentCategory {
      return {
        idx: x.index,
        name: x.name,
        url: x.url,
        equipment: getOrInsertArrayId(
          data.ArrayAPIReference, 
          x.equipment, 
          data.APIReference.equals,
          data.APIReference.transform
        )
      };
    },
    inputs: ["5e-SRD-Equipment-Categories.json"],
    output: "EquipmentCategory.json"
  },
  {
    extractor: extract<data.ArmorClass>,
    shape: new data.ArmorClass(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "ArmorClass.json"
  },
  {
    extractor: extract<data._Range>,
    shape: new data._Range(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "Range.json"
  },
  {
    extractor: extract<data.ThrowRange>,
    shape: new data.ThrowRange(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "ThrowRange.json"
  },
  {
    extractor: extract<data.Content>,
    shape: new data.Content(),
    mapper: function (x: any): models.Content {
      return {
        item: x.item?.index,
        quantity: x.quantity
      };
    },
    inputs: ["5e-SRD-Equipments.json"],
    output: "Content.json"
  },
  {
    extractor: extract<data.Utilize>,
    shape: new data.Utilize(),
    mapper: function (x: any): models.Utilize {
      return {
        name: x.name,
        dc: getOrInsertId(
          data.difficulty_classes,
          x.dc
        )
      };
    },
    inputs: ["5e-SRD-Equipments.json"],
    output: "Utilize.json"
  },
  {
    extractor: extract<data.Equipment>,
    shape: new data.Equipment(),
    mapper: function(x: any): models.Equipment {
      return {
        idx: x.index,
        name: x.name,
        equipment_categories: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.equipment_categories,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        cost_quantity: x.cost?.quantity,
        cost_unit: x.cost?.unit,
        url: x.url,
        description: x.description,
        weight: x.weight,
        ammunition: x.ammunition?.index,
        armor_class_base: x.armor_class?.base,
        armor_class_dex_bonus: x.armor_class?.dex_bonus,
        armor_class_max_bonus: x.armor_class?.max_bonus,
        contents: getOrInsertArrayId(
          data.ArrayContents,
          x.contents,
          data.Content.equals,
          data.Content.transform
        ), 
        ability: x.ability?.index,
        craft: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.craft,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        damage_type: x.damage?.damage_type?.index,
        damage_dice: x.damage?.damage_dice,
        damage_dc: getOrInsertId(
          data.difficulty_classes,
          x.damage?.dc
        ),
        doff_time: x.doff_time,
        don_time: x.don_time,
        image: x.image,
        mastery: x.mastery?.index,
        notes: x.notes?.join("$$$"),
        properties: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.properties,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        quantity: x.quantity,
        storage: x.storage?.index,
        range_normal: x.range?.normal,
        range_long: x.range?.long,
        stealth_disadvantage: x.stealth_disadvantage,
        str_minimum: x.str_minimum,
        throw_range_normal: x.throw_range?.normal,
        throw_range_long: x.throw_range?.long,
        two_handed_damage_type: x.two_handed_damage?.damage_type?.index,
        two_handed_damage_dice: x.two_handed_damage?.damage_dice,
        two_handed_damage_dc: getOrInsertId(
          data.difficulty_classes,
          x.two_handed_damage?.damage_dc
        ),
        utilize: getOrInsertArrayId(
          data.ArrayUtilize,
          x.utilize,
          data.Utilize.equals,
          data.Utilize.transform
        ),
      };
    },
    inputs: ["5e-SRD-Equipments.json"],
    output: "Equipment.json"
  },
  {
    extractor: extract<data.FeatPrerequisites>,
    shape: new data.FeatPrerequisites(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Feats.json"],
    output: "FeatPrereq.json"
  },
  {
    extractor: extract<data.Feat>,
    shape: new data.Feat(),
    mapper: function (x: any): models.Feat {
      return {
        idx: x.index,
        name: x.name,
        description: x.description,
        type: x.type,
        repeatable: x.repeatable,
        prerequisite_minimum_level: x.prerequisites?.minimum_level,
        prerequisite_feature_named: x.prerequisites?.feature_named,
        prerequisite_options: getOrInsertId(
          data.option_sets,
          x.prerequisite_options?.from
        ),
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Feats.json"],
    output: "Feat.json"
  },
  {
    extractor: extract<data.Language>,
    shape: new data.Language(),
    mapper: function (x: any): models.Language {
      return {
        idx: x.index,
        name: x.name,
        is_rare: x.is_rare,
        note: x.note,
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Languages.json"],
    output: "Language.json"
  },
  {
    extractor: extract<data.MagicItem>,
    shape: new data.MagicItem(),
    mapper: function (x: any): models.MagicItem {
      return {
        idx: x.index,
        name: x.name,
        url: x.url,
        image: x.image,
        equipment_category: x.equipment_category?.index,
        variant: x.variant,
        variants: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.variants,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        attunement: x.attunement,
        rarity: x.rarity?.name,
        desc: x.desc,
        limited_to: x["limited-to"],
      }
    },
    inputs: ["5e-SRD-Magic-Items.json"],
    output: "MagicItem.json"
  },
  {
    extractor: extract<data.MagicSchool>,
    shape: new data.MagicSchool(),
    mapper: function (x: any): models.MagicSchool {
      return {
        idx: x.index,
        name: x.name,
        description: x.description,
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Magic-Schools.json"],
    output: "MagicSchool.json"
  },
  {
    extractor: extract<data.Proficiency>,
    shape: new data.Proficiency(),
    mapper: function(x: any): models.Proficiency {
      return {
        idx: x.index,
        name: x.name,
        type: x.type,
        backgrounds: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.backgrounds,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        classes: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.classes,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        reference: x.reference?.index,
        url: x.url,
      }
    },
    inputs: ["5e-SRD-Proficiencies.json"],
    output: "Proficiency.json"
  },
  {
    extractor: extract<data.Skill>,
    shape: new data.Skill(),
    mapper: function(x: any): models.Skill {
      return {
        idx: x.index,
        name: x.name,
        description: x.description,
        ability_score: x.ability_score?.index,
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Skills.json"],
    output: "Skill.json"
  },
  {
    extractor: extract<data.AbilityBonus>,
    shape: new data.AbilityBonus(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "AbilityBonus.json"
  },
  {
    extractor: extract<data.Species>,
    shape: new data.Species(),
    mapper: function (x: any): models.Species {
      return {
        idx: x.index,
        name: x.name,
        speed: x.speed,
        ability_bonuses: getOrInsertArrayId(
          data.ArrayAbilityBonus,
          x.ability_bonuses,
          data.AbilityBonus.equals,
          data.AbilityBonus.transform
        ),
        ability_bonus_options: getOrInsertId(
          data.option_sets,
          x.ability_bonus_options?.from
        ),
        alignment: x.alignment,
        age: x.age,
        starting_proficiencies: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.starting_proficiencies,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        starting_proficiency_options: getOrInsertId(
          data.option_sets,
          x.starting_proficiency_options?.from
        ),
        languages: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.languages,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        language_desc: x.language_desc,
        language_options: getOrInsertId(
          data.option_sets,
          x.language_options?.from
        ),
        url: x.url,
        size: x.size,
        size_description: x.size_description,
        traits: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.traits,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        subspecies: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.subspecies,
          data.APIReference.equals,
          data.APIReference.transform
        ),
      };
    },
    inputs: ["5e-SRD-Species.json"],
    output: "Species.json"
  },
  {
    extractor: extract<data.SubclassSpellPrerequisite>,
    shape: new data.SubclassSpellPrerequisite(),
    mapper: function (x: any): models.SubclassSpellPrerequisite {
      return {
        idx: x.index,
        type: x.type,
        name: x.name,
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Subclasses.json"],
    output: "SubclassSpellPrereq.json"
  },
  {
    extractor: extract<data.SubclassSpell>,
    shape: new data.SubclassSpell(),
    mapper: (x: any) => {
      return {
        prerequisites: getOrInsertArrayId(
          data.ArraySubclassSpellPrerequisite,
          x.prerequisites,
          data.SubclassSpellPrerequisite.equals,
          data.SubclassSpellPrerequisite.transform,
        ),
        spell: x.spell?.index,
      };
    },
    inputs: ["5e-SRD-Subclasses.json"],
    output: "SubclassSpell.json"
  },
  {
    extractor: extract<data.Subclass>,
    shape: new data.Subclass(),
    mapper: function (x: any): models.Subclass {
      return {
        idx: x.index,
        url: x.url,
        name: x.name,
        class: x.class?.index,
        subclass_flavor: x.subclass_flavor,
        desc: x.desc?.join("$$$"),
        subclass_levels: x.subclass_levels,
        spells: getOrInsertArrayId(
          data.ArraySubclassSpell,
          x.spells,
          data.SubclassSpell.equals,
          data.SubclassSpell.transform
        ),
      };
    },
    inputs: ["5e-SRD-Subclasses.json"],
    output: "Subclass.json"
  },
  {
    extractor: extract<data.Subrace>,
    shape: new data.Subrace(),
    mapper: function(x: any): models.Subspecies {
      return {
        idx: x.index,
        name: x.name,
        url: x.url,
        species: x.race?.index,
        desc: x.desc,
        ability_bonuses: getOrInsertArrayId(
          data.ArrayAbilityBonus,
          x.ability_bonuses,
          data.AbilityBonus.equals,
          data.AbilityBonus.transform
        ),
        racial_traits: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.racial_traits,
          data.APIReference.equals,
          data.APIReference.transform
        ),
      }
    },
    inputs: ["5e-SRD-Subspecies.json"],
    output: "Subspecies.json"
  },
  {
    extractor: extract<data.Spell>,
    shape: new data.Spell(),
    mapper: function (x: any): models.Spell {
      return {
        name: x.name,
        level: x.level,
        school: x.school,
        classes: x.classes?.join("$$$"),
        actionType: x.action_type,
        concentration: x.concentration,
        ritual: x.ritual,
        range: x.range,
        components: x.components?.join("$$$"),
        material: x.material,
        duration: x.duration,
        description: x.description,
        cantripUpgrade: x.cantripUpgrade,
      };
    },
    inputs: ["5e-SRD-Spells.json"],
    output: "Spell.json"
  },
  {
    extractor: extract<data.AreaOfEffect>,
    shape: new data.AreaOfEffect(),
    mapper: function (x: any): models.AreaOfEffect {
      return {
        id: getOrInsertId(data.area_of_effects, x),
        size: x.size,
        type: x.type,
      }
    },
    inputs: allFiles,
    output: "AreaOfEffect.json"
  },
  {
    extractor: extract<data.BreathWeaponUsage>,
    shape: new data.BreathWeaponUsage(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Traits.json"],
    output: "BreathWeaponUsage.json"
  },
  {
    extractor: extract<data.BreathWeaponDamage>,
    shape: new data.BreathWeaponDamage(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Traits.json"],
    output: "BreathWeaponDamage.json"
  },
  {
    extractor: extract<data.BreathWeapon>,
    shape: new data.BreathWeapon(),
    mapper: function (x: any): models.BreathWeapon {
      return {
        id: getOrInsertId(data.breath_weapons, x),
        name: x.name,
        desc: x.desc,
        area_of_effect: getOrInsertId(data.area_of_effects, x.area_of_effect),
        usage_type: x.usage?.type,
        usage_times: x.usage?.times,
        dc: getOrInsertId(data.difficulty_classes, x.dc),
        damage: getOrInsertArrayId(
          data.ArrayBreathWeaponDamage,
          x.damage,
          data.BreathWeaponDamage.equals,
          data.BreathWeaponDamage.transform,
        ),
      };
    },
    inputs: ["5e-SRD-Traits.json"],
    output: "BreathWeapon.json"
  },
  {
    extractor: extract<data.TraitSpecific>,
    shape: new data.TraitSpecific(),
    mapper: function (x: any): models.TraitSpecific {
      return {
        id: getOrInsertId(data.trait_specifics, x),
        damage_type: x.damage_type?.index,
        breath_weapon: getOrInsertId(
          data.breath_weapons, 
          x.breath_weapon
        ),
        spell_options: getOrInsertId(
          data.option_sets,
          x.spell_options?.from
        ),
        subtrait_options: getOrInsertId(
          data.option_sets,
          x.subtrait_options?.from
        ),
      };
    },
    inputs: ["5e-SRD-Traits.json"],
    output: "TraitSpecific.json"
  },
  {
    extractor: extract<data.Trait>,
    shape: new data.Trait(),
    mapper: function (x: any): models.Trait {
      return {
        idx: x.index,
        name: x.name,
        url: x.url,
        desc: x.desc,
        species: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.races,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        subspecies: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.subraces,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        proficiencies: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.proficiencies,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        proficiency_choices: getOrInsertId(
          data.option_sets,
          x.proficiency_choices?.from
        ),
        language_options: getOrInsertId(
          data.option_sets,
          x.language_options?.from
        ),
        parent: x.parent?.index,
        trait_specific: getOrInsertId(
          data.trait_specifics,
          x.trait_specific
        ),
      };
    },
    inputs: ["5e-SRD-Traits.json"],
    output: "Trait.json"
  },
  {
    extractor: extract<data.WeaponProperty>,
    shape: new data.WeaponProperty(),
    mapper: function (x: any): models.WeaponProperty {
      return {
        idx: x.index,
        name: x.name,
        description: x.description,
        url: x.url,
      };
    },
    inputs: ["5e-SRD-Weapon-Properties.json"],
    output: "WeaponProperty.json"
  },
  {
    extractor: extract<data.ClassSpecific>,
    shape: new data.ClassSpecific(),
    mapper: function (x: any): models.ClassSpecific {
      return {
        id: getOrInsertId(data.class_specifics, x),
        action_surges: x.action_surges,
        arcane_recovery_levels: x.arcane_recovery_levels,
        aura_range: x.aura_range,
        bardic_inspiration_die: x.bardic_inspiration_die,
        brutal_critical_dice: x.brutal_critical_dice,
        channel_divinity_charges: x.channel_divinity_charges,
        creating_spell_slots: getOrInsertArrayId(
          data.ArrayCreatingSpellSlots,
          x.creating_spell_slots,
          (lhs: models.ArrayCreatingSpellSlotsItem, rhs: any) => {
            return lhs.sorcery_point_cost === rhs.sorcery_point_cost
            && lhs.spell_slot_level === rhs.spell_slot_level;
          },
          function (x: any, array_id: number, array_idx: number): models.ArrayCreatingSpellSlotsItem {
            return {
              array_idx: array_idx,
              array_id: array_id,
              sorcery_point_cost: x.sorcery_point_cost,
              spell_slot_level: x.spell_slot_level,
            };
          }
        ),
        destroy_undead_cr: x.destroy_undead_cr,
        extra_attacks: x.extra_attacks,
        favored_enemies: x.favored_enemies,
        favored_terrain: x.favored_terrain,
        indomitable_uses: x.indomitable_uses,
        invocations_known: x.invocations_known,
        ki_points: x.ki_points,
        magical_secrets_max_5: x.magical_secrets_max_5,
        magical_secrets_max_7: x.magical_secrets_max_7,
        magical_secrets_max_9: x.magical_secrets_max_9,
        // i due qua sotto sono attributi "flattenati"
        martial_arts_dice_count: x.martial_arts?.dice_count,
        martial_arts_dice_value: x.martial_arts?.dice_value,
        metamagic_known: x.metamagic_known,
        mystic_arcanum_level_6: x.mystic_arcanum_level_6,
        mystic_arcanum_level_7: x.mystic_arcanum_level_7,
        mystic_arcanum_level_8: x.mystic_arcanum_level_8,
        mystic_arcanum_level_9: x.mystic_arcanum_level_9,
        rage_count: x.rage_count,
        rage_damage_bonus: x.rage_damage_bonus,
        // i due qua sotto sono attributi "flattenati"
        sneak_attack_dice_count: x.sneak_attack?.dice_count,
        sneak_attack_dice_value: x.sneak_attack?.dice_value,
        song_of_rest_die: x.song_of_rest_die,
        sorcery_points: x.sorcery_points,
        unarmored_movement: x.unarmored_movement,
        wild_shape_fly: x.wild_shape_fly,
        wild_shape_max_cr: x.wild_shape_max_cr,
        wild_shape_swim: x.wild_shape_swim,
      };
    },
    inputs: ["5e-SRD-Levels.json"],
    output: "ClassSpecific.json"
  },
  {
    extractor: extract<data.LevelSpellcasting>,
    shape: new data.LevelSpellcasting(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Levels.json"],
    output: "LevelSpellcasting.json"
  },
  {
    extractor: extract<data.SubclassSpecific>,
    shape: new data.SubclassSpecific(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Levels.json"],
    output: "SubclassSpecific.json"
  },
  {
    extractor: extract<data.Level>,
    shape: new data.Level(),
    mapper: function (x: any): models.Level {
      return {
        idx: x.index,
        level: x.level,
        ability_score_bonuses: x.ability_score_bonuses,
        prof_bonus: x.prof_bonus,
        features: getOrInsertArrayId(
          data.ArrayAPIReference,
          x.features,
          data.APIReference.equals,
          data.APIReference.transform
        ),
        character_class: x.class?.index,
        class_specific: getOrInsertId(
          data.class_specifics,
          x.class_specific
        ),
        subclass: x.subclass?.index,
        url: x.url,
        cantrips_known: x.spellcasting?.cantrips_known,
        spell_slots_level_1: x.spellcasting?.spell_slots_level_1,
        spell_slots_level_2: x.spellcasting?.spell_slots_level_2,
        spell_slots_level_3: x.spellcasting?.spell_slots_level_3,
        spell_slots_level_4: x.spellcasting?.spell_slots_level_4,
        spell_slots_level_5: x.spellcasting?.spell_slots_level_5,
        spell_slots_level_6: x.spellcasting?.spell_slots_level_6,
        spell_slots_level_7: x.spellcasting?.spell_slots_level_7,
        spell_slots_level_8: x.spellcasting?.spell_slots_level_8,
        spell_slots_level_9: x.spellcasting?.spell_slots_level_9,
        spells_known: x.spellcasting?.spells_known,
        additional_magical_secrets_max_lvl: x.subclass_specific?.additional_magical_secrets_max_lvl,
        aura_range: x.subclass_specific?.aura_range,
      };
    },
    inputs: ["5e-SRD-Levels.json"],
    output: "Level.json"
  },
].forEach(translate);


function printArray(array: any[], output: string): void {
  fs.writeFileSync(RUNTIME_OUTPUT_DIR + output, JSON.stringify(array.flatMap(x => x)), 'utf8');
}


printArray(data.ArrayAPIReference, 'ArrayApiReferenceItem.json');
printArray(data.ArrayPrerequisite, 'ArrayPrerequisiteItem.json');
printArray(data.ArrayOption, 'ArrayOptionItem.json');
printArray(data.ArrayDamage, 'ArrayDamageItem.json');
printArray(data.ArrayStartingEquipment, 'ArrayStartingEquipmentItem.json');
printArray(data.ArrayChoice, 'ArrayChoiceItem.json');
printArray(data.ArraySpellcastingInfo, 'ArraySpellcastingInfoItem.json');
printArray(data.ArrayMultiClassingPrereqs, 'ArrayMultiClassingPrereqItem.json');
printArray(data.ArrayContents, 'ArrayContentItem.json');
printArray(data.ArrayUtilize, 'ArrayUtilizeItem.json');
printArray(data.ArrayAbilityBonus, 'ArrayAbilityBonusItem.json');
printArray(data.ArraySubclassSpell, 'ArraySubclassSpellItem.json');
printArray(data.ArraySubclassSpellPrerequisite, 'ArraySubclassSpellPrerequisiteItem.json');
printArray(data.ArrayBreathWeaponDamage, 'ArrayBreathWeaponDamageItem.json');
printArray(data.ArrayCreatingSpellSlots, 'ArrayCreatingSpellSlotItem.json');
