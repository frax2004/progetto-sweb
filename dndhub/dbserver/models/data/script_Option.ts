import fs from 'fs';

export function decompose<T>(root: unknown, predicate: (obj: any) => boolean): T[] {
  const result: T[] = [];

  const visit = (value: unknown) => {
    if (value === null || typeof value !== "object") {
      return;
    } else if (predicate(value)) {
      result.push(value as T);
      return;
    } else if (Array.isArray(value)) {
      for (const item of value) {
        visit(item);
      }
      return;
    } else {
      for (const child of Object.values(value)) {
        visit(child);
      }
      return;
    }
  };

  visit(root);
  return result;
}


const options = fs
.readdirSync('.', 'utf8')
.filter((path: string) => path.startsWith('5e'))
.flatMap(
  (path: any) => {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    
    // come differenziare tra i diversi name?
    // script incompleto

    class Option {
      //id non esiste nel ts quindi non lo metto?
      //id! = number;
      option_type!: string;
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

    return decompose<Option>(data, (obj: any) => {
      const actual = Object.keys(obj);
    
      const expected = [
        'reference_item',
        'choice_id',
        'string',
        'ability_score_bonus'
      ];
    
      return actual.every(s => expected.includes(s)) && (
        typeof obj === "object" 
        && obj !== null 
        && (
          obj.desc === undefined 
          || typeof obj.desc === "string"
        ) &&
        typeof obj.choose === "number" && (
          obj.type === undefined 
          || typeof obj.type === "string"
        ) 
        && typeof obj.from === "object"
      );
    });
  }
);


console.log(JSON.stringify(options).split("index").join("idx"));