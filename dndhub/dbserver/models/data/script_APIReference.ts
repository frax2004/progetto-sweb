import fs from 'fs';
import 'reflect-metadata';

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
      return obj.every(o => Shapes.match(o, new shape[0]()));
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

class APIReference {
  index: string = "";
  name: string = "";
  url: string = "";
  note: string = "";
}

class Choice {
  desc: string = "";
  choose: number = 0;
  type: string = "";
  from = OptionSet;
}

class DifficultyClass {
  dc_type = APIReference;
  dc_value: number = 0;
  success_type: string = "";
}

class Damage {
  damage_type = APIReference;
  damage_dice: string = "";
  dc = DifficultyClass;
}

class OptionSet {
  @required()
  option_set_type: string = "";
  equipment_category = APIReference;
  resource_list_url: string = "";
  options = [
    Option
  ]
}

class Option {
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

// class AreaOfEffect {
//   size: number = 0;
//   type: string = "";
// }

class DamageTypes {
  @required()
  index: string = "";
  @required()
  name: string = "";
  @required()
  description: string = "";
  @required()
  url: string = "";
}

class AbilityScore {
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

class StartingEquipment {
  equipment = APIReference;
  quantity: number = 0;
}

// cost e backgroundFeature non esistono nel db, 
// mi servono ai fini del riconoscimento di background

class Cost {
  quantity: number = 0;
  unit: string = "";
}

class BackgroundFeature {
  name: string = "";
  desc = [
    String
  ];
}

class Background {
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


class SpellcastingInfo {
  name: string = "";
  desc = [String];
}

class SpellCasting {
  level: number = 0;
  spellcasting_ability = APIReference;
  info = [SpellcastingInfo];
}

class MultiClassingPrereq {
  ability_score = APIReference;
  minimum_score: number = 0;
}

class MultiClassing {
  prerequisites = [MultiClassingPrereq];
  prerequisite_options = Choice;
  proficiencies = [APIReference];
  proficiency_choices = [Choice];
}

class Class {
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

class Condition {
  index: string = "";
  name: string = "";
  desc = [String];
  url: string = "";
}

class EquipmentCategory {
  index: string = "";
  name: string = "";
  equipment = [APIReference];
  url: string = "";
}

class ArmorClass {
  @required()
  base: number = 0;
  @required()
  dex_bonus: boolean = false;
  max_bonus: number = 0;
}

class _Range {
  @required()
  normal: number = 0;
  long: number = 0;
}

class ThrowRange {
  @required()
  normal: number = 0;
  @required()
  long: number = 0;
}

class Content {
  @required()
  item = APIReference;
  @required()
  quantity: number = 0;
}

class Utilize {
  @required()
  name: string = "";
  @required()
  dc = DifficultyClass;
}

class Equipment {
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
  notes = [String];
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

class FeatPrerequisites {
  minimum_level: number = 0;
  feature_named: string = "";
}

class Feat {
  index: string = "";
  name: string = "";
  description: string = "";
  type: string = "";
  repeatable: string = "";
  prerequisites = FeatPrerequisites;
  prerequisite_options = Choice;
  url: string = "";
}

class Language {
  index: string = "";
  name: string = "";
  is_rare: boolean = false;
  note: string = "";
  url: string = "";
}

class MagicItem {
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

class MagicSchool {
  @required()
  index: string = "";
  @required()
  name: string = "";
  @required()
  description: string = "";
  @required()
  url: string = "";
}

class Proficiency {
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

class Skill {
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

class AbilityBonus {
  ability_score = APIReference;
  bonus: number = 0;
}

class Species {
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

const allFiles = fs
.readdirSync('.', 'utf8')
.filter((path: string) => path.startsWith('5e'));

extract<APIReference>(new APIReference(), allFiles);

extract<Option>(new Option(), allFiles);
extract<Choice>(new Choice(), allFiles);
extract<Damage>(new Damage(), allFiles);
extract<DifficultyClass>(new DifficultyClass(), allFiles);

extract<OptionSet>(new OptionSet(), allFiles);
extract<DamageTypes>(new DamageTypes(), allFiles);
extract<AbilityScore>(new AbilityScore(), ["5e-SRC-Ability-Scores.json"]);

extract<StartingEquipment>(new StartingEquipment(), ["5e-SRD-Backgrounds.json", "5e-SRD-Classes.json"]);
extract<Background>(new Background(), ["5e-SRD-Backgrounds.json"]);
extract<Class>(new Class(), ["5e-SRD-Classes.json"]);