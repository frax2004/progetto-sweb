import * as themes from "../static-data/themes.json";

export namespace Themes {
  export class Theme {
    public readonly dominant: string;
    public readonly secondary: string;
    public readonly accent: string;
  
    public constructor(dominant: string, secondary: string, accent: string) {
      this.dominant = dominant;
      this.secondary = secondary;
      this.accent = accent;
    }

  }
  
  export function get(name: keyof typeof themes): Theme {
    return themes[name];
  }
}
