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


const choices = fs
.readdirSync('.', 'utf8')
.filter((path: string) => path.startsWith('5e'))
.flatMap(
  (path: any) => {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    
    class Choice {
      desc?: string;
      choose!: string;
      type?: string;
      // in teoria opt_id è reference ad options, 
      // ho prima bisogno di quello?
      // from sarebbe opt_id
      opt_id!: number;
    }

    return decompose<Choice>(data, (obj: any) => {
      const actual = Object.keys(obj);
    
      const expected = [
        'desc',
        'choose',
        'type',
        'from'
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


console.log(JSON.stringify(choices).split("index").join("idx"));