import * as themes from "../static-data/themes.json";

class Theme {
  public readonly dominant: string;
  public readonly secondary: string;
  public readonly accent: string;

  constructor(dominant: string, secondary: string, accent: string) {
    this.dominant = dominant;
    this.secondary = secondary;
    this.accent = accent;
  }
}

class Themes {
  public static get(name: keyof typeof themes): Theme {
    return themes[name];
  }
}