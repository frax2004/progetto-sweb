import fs from 'fs';
import 'reflect-metadata';
import { models } from '../DatabaseModels';
import { deepEqual } from 'assert';

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
      const data = JSON.parse(fs.readFileSync(path, 'utf8'));
      return Shapes.decompose<T>(data, shape);
    }
  )
  .filter(array => array.length !== 0)
  .flatMap(x => x)
  .map(transformer || (x => x));
}

namespace data {
  export class APIReference {
    index: string = "";
    name: string = "";
    url: string = "";
    note: string = "";
  }

  export class Choice {
    desc: string = "";
    choose: number = 0;
    type: string = "";
    from = OptionSet;
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
    prerequisites = [
      class {
        type: string = "";
        proficiency = APIReference;
      }
    ];
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
  }

  export class SpellCasting {
    level: number = 0;
    spellcasting_ability = APIReference;
    info = [SpellcastingInfo];
  }

  export class MultiClassingPrereq {
    ability_score = APIReference;
    minimum_score: number = 0;
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
  }

  export class Utilize {
    @required()
    name: string = "";
    @required()
    dc = DifficultyClass;
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
    rarity: string = "";
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
  }

  export class SubclassSpell {
    prerequisites = [SubclassSpellPrerequisite];
    spell = APIReference;
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
    ability_bonus = [AbilityBonus];
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
      class {
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
  export let ArrayAPIReference: models.APIReference[] = []
}


function getIndex(table: any[], array: any[]): number {
  const i = table.findIndex(x => deepEqual(x, array));
  if(i < 0) {
    return table.push(array)-1;
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
  fs.writeFileSync("new-data/" + ctx.output, JSON.stringify(translated), 'utf8');
}



const allFiles = fs
.readdirSync('.', 'utf8')
.filter((path: string) => path.startsWith('5e'));

[
  {
    extractor: extract<data.APIReference>,
    shape: new data.APIReference(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "api_references.json"
  },
  {
    extractor: extract<data.Choice>,
    shape: new data.Choice(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "choices.json"
  },
  {
    extractor: extract<data.DifficultyClass>,
    shape: new data.DifficultyClass(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "difficulty_classes.json"
  },
  {
    extractor: extract<data.Damage>,
    shape: new data.Damage(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "damages.json"
  },
  {
    extractor: extract<data.OptionSet>,
    shape: new data.OptionSet(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "option_sets.json"
  },
  {
    extractor: extract<data.Option>,
    shape: new data.Option(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "options.json"
  },
  {
    extractor: extract<data.DamageType>,
    shape: new data.DamageType(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Damage-Types.json"],
    output: "damage_types.json"
  },
  {
    extractor: extract<data.AbilityScore>,
    shape: new data.AbilityScore(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Ability-Scores.json"],
    output: "ability_scores.json"
  },
  {
    extractor: extract<data.StartingEquipment>,
    shape: new data.StartingEquipment(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Classes.json"],
    output: "starting_equipments.json"
  },
  {
    extractor: extract<data.Cost>,
    shape: new data.Cost(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Equipments.json"],
    output: "costs.json"
  },
  {
    extractor: extract<data.BackgroundFeature>,
    shape: new data.BackgroundFeature(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Backgrounds.json"],
    output: "background_features.json"
  },
  {
    extractor: extract<data.Background>,
    shape: new data.Background(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Backgrounds.json"],
    output: "backgronds.json"
  },
  {
    extractor: extract<data.SpellcastingInfo>,
    shape: new data.SpellcastingInfo(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Classes.json"],
    output: "spellcasting_infos.json"
  },
  {
    extractor: extract<data.SpellCasting>,
    shape: new data.SpellCasting(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Classes.json"],
    output: "spellcastings.json"
  },
  {
    extractor: extract<data.MultiClassingPrereq>,
    shape: new data.MultiClassingPrereq(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Classes.json"],
    output: "multi_classing_prereqs.json"
  },
  {
    extractor: extract<data.MultiClassing>,
    shape: new data.MultiClassing(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Classes.json"],
    output: "multi_classing.json"
  },
  {
    extractor: extract<data.Class>,
    shape: new data.Class(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Classes.json"],
    output: "classes.json"
  },
  {
    extractor: extract<data.Condition>,
    shape: new data.Condition(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Conditions.json"],
    output: "conditions.json"
  },
  {
    extractor: extract<data.EquipmentCategory>,
    shape: new data.EquipmentCategory(),
    mapper: function(x: any): models.EquipmentCategory {
      return {
        idx: x.index,
        name: x.name,
        url: x.url,
        equipment: getIndex(data.ArrayAPIReference, x.equipment)
      };
    },
    inputs: ["5e-SRD-Equipment-Categories.json"],
    output: "equipment_categories.json"
  },
  {
    extractor: extract<data.ArmorClass>,
    shape: new data.ArmorClass(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "armor_classes.json"
  },
  {
    extractor: extract<data._Range>,
    shape: new data._Range(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "ranges.json"
  },
  {
    extractor: extract<data.ThrowRange>,
    shape: new data.ThrowRange(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "throw_ranges.json"
  },
  {
    extractor: extract<data.Content>,
    shape: new data.Content(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "contents.json"
  },
  {
    extractor: extract<data.Utilize>,
    shape: new data.Utilize(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "utilizes.json"
  },
  {
    extractor: extract<data.Equipment>,
    shape: new data.Equipment(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Equipments.json"],
    output: "equipments.json"
  },
  {
    extractor: extract<data.FeatPrerequisites>,
    shape: new data.FeatPrerequisites(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Feats.json"],
    output: "feat_prereqs.json"
  },
  {
    extractor: extract<data.Feat>,
    shape: new data.Feat(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Feats.json"],
    output: "feats.json"
  },
  {
    extractor: extract<data.Language>,
    shape: new data.Language(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Languages.json"],
    output: "languages.json"
  },
  {
    extractor: extract<data.MagicItem>,
    shape: new data.MagicItem(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Magic-Items.json"],
    output: "magic_items.json"
  },
  {
    extractor: extract<data.MagicSchool>,
    shape: new data.MagicSchool(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Magic-Schools.json"],
    output: "magic_schools.json"
  },
  {
    extractor: extract<data.Proficiency>,
    shape: new data.Proficiency(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Proficiencies.json"],
    output: "proficiencies.json"
  },
  {
    extractor: extract<data.Skill>,
    shape: new data.Skill(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Skills.json"],
    output: "skills.json"
  },
  {
    extractor: extract<data.AbilityBonus>,
    shape: new data.AbilityBonus(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "ability_bonuses.json"
  },
  {
    extractor: extract<data.Species>,
    shape: new data.Species(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Species.json"],
    output: "species.json"
  },
  {
    extractor: extract<data.SubclassSpellPrerequisite>,
    shape: new data.SubclassSpellPrerequisite(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Subclasses.json"],
    output: "subclass_spell_prereqs.json"
  },
  {
    extractor: extract<data.SubclassSpell>,
    shape: new data.SubclassSpell(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Subclasses.json"],
    output: "subclass_spells.json"
  },
  {
    extractor: extract<data.Subclass>,
    shape: new data.Subclass(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Subclasses.json"],
    output: "subclasses.json"
  },
  {
    extractor: extract<data.Subrace>,
    shape: new data.Subrace(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Subspecies.json"],
    output: "subspecies.json"
  },
  {
    extractor: extract<data.Spell>,
    shape: new data.Spell(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Spells.json"],
    output: "spells.json"
  },
  {
    extractor: extract<data.AreaOfEffect>,
    shape: new data.AreaOfEffect(),
    mapper: (x: any) => x,
    inputs: allFiles,
    output: "areas_of_effect.json"
  },
  {
    extractor: extract<data.BreathWeaponUsage>,
    shape: new data.BreathWeaponUsage(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Traits.json"],
    output: "breath_weapon_usages.json"
  },
  {
    extractor: extract<data.BreathWeaponDamage>,
    shape: new data.BreathWeaponDamage(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Traits.json"],
    output: "breath_weapon_damages.json"
  },
  {
    extractor: extract<data.BreathWeapon>,
    shape: new data.BreathWeapon(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Traits.json"],
    output: "breath_weapons.json"
  },
  {
    extractor: extract<data.TraitSpecific>,
    shape: new data.TraitSpecific(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Traits.json"],
    output: "trait_specifics.json"
  },
  {
    extractor: extract<data.Trait>,
    shape: new data.Trait(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Traits.json"],
    output: "traits.json"
  },
  {
    extractor: extract<data.WeaponProperty>,
    shape: new data.WeaponProperty(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Weapon-Properties.json"],
    output: "weapon_properties.json"
  },
  {
    extractor: extract<data.ClassSpecific>,
    shape: new data.ClassSpecific(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Levels.json"],
    output: "class_specifics.json"
  },
  {
    extractor: extract<data.LevelSpellcasting>,
    shape: new data.LevelSpellcasting(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Levels.json"],
    output: "level_spellcastings.json"
  },
  {
    extractor: extract<data.SubclassSpecific>,
    shape: new data.SubclassSpecific(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Levels.json"],
    output: "subclass_specifics.json"
  },
  {
    extractor: extract<data.Level>,
    shape: new data.Level(),
    mapper: (x: any) => x,
    inputs: ["5e-SRD-Levels.json"],
    output: "levels.json"
  },
].forEach(translate);
