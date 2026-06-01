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

// prova commit

// export enum SuccessType {
//     'none',
//     'half',
//     'other',
// }

// da sistemare

const difficulty_classes = fs
.readdirSync('.', 'utf8')
.filter(path => path.startsWith('5e'))
.flatMap(
  path => {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    
    class DifficultyClass {
    // in teoria nei json non abbiamo id, lo devo aggiungere tramite funzione
      //id!: number;
      dc_type!: string; // è foreign key di api reference
      dc_value?: number;
      success_type!: string;
    }

    return decompose<APIReference>(data, (obj: any) => {
      const actual = Object.keys(obj);
    
      const expected = [
        'index',
        'name',
        'url',
        'note'
      ];
    
      return actual.every(s => expected.includes(s)) && (
        typeof obj === "object" 
        && obj !== null 
        &&
        //typeof obj.id === "number" &&
        typeof obj.dc_type === "object" && (
        typeof obj.dc_value === "number" 
        || obj.dc_value === undefined) &&
        // number perché in teoria è enum?
        typeof obj.success_type === "string"
      );
    });
  }
);


console.log(JSON.stringify(difficulty_classes).split("index").join("idx"));