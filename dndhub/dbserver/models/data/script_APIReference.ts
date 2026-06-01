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


function extract<T>(shape: any, outputPath: string, mapper?: (s: string) => string) {
  const json = fs
  .readdirSync('.', 'utf8')
  .filter((path: string) => path.startsWith('5e'))
  .map(
    path => {
      const data = JSON.parse(fs.readFileSync(path, 'utf8'));
      return Shapes.decompose<T>(data, shape);
    }
  )
  .filter(array => array.length !== 0)
  .flatMap(x => x)

  let s = JSON.stringify(json);
  fs.writeFileSync(outputPath, mapper ? mapper(s) : s);
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

class AreaOfEffect {
  size: number = 0;
  type: string = "";
}


extract<APIReference>(
  new APIReference(),
  "api_references.json",
  (s: string) => s.split("index").join("idx")
);

extract<Option>(new Option(), "options.json");
extract<Choice>(new Choice(), "choices.json");
extract<Damage>(new Damage(), "damage.json");
extract<DifficultyClass>(new DifficultyClass(), "difficulty_class.json");
extract<AreaOfEffect>(new AreaOfEffect(), "area_of_effect.json");