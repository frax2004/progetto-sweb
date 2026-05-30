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


const api_references = fs
.readdirSync('.', 'utf8')
.filter(path => path.startsWith('5e'))
.flatMap(
  path => {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    
    class APIReference {
      index!: string;
      name!: string;
      url!: string;
      note?: string;
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
        typeof obj.index === "string" &&
        typeof obj.name === "string" &&
        typeof obj.url === "string" && (
          obj.note === undefined 
          || typeof obj.note === "string"
        )
      );
    });
  }
);


console.log(JSON.stringify(api_references).split("index").join("idx"));