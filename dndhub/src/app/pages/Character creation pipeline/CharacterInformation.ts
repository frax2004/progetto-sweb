export const StatModifierNumber = {
    0 : -5,
    1 : -5,
    2 : -4,
    3 : -4,
    4 : -3, 
    5 : -3, 
    6 : -2, 
    7 : -2, 
    8 : -1, 
    9 : -1, 
    10 : +0, 
    11 : +0, 
    12 : +1, 
    13 : +1, 
    14 : +2, 
    15 : +2, 
    16 : +3, 
    17 : +3, 
    18 : +4, 
    19 : +4, 
    20 : +5, 
    21 : +5, 
    22 : +6, 
    23 : +6, 
    24 : +7, 
    25 : +7, 
    26 : +8, 
    27 : +8, 
    28 : +9, 
    29 : +9, 
    30 : +10, 
};

export const StatModifierString = {
    0 : '-5',
    1 : '-5',
    2 : '-4',
    3 : '-4',
    4 : '-3', 
    5 : '-3', 
    6 : '-2', 
    7 : '-2', 
    8 : '-1', 
    9 : '-1', 
    10 : '+0', 
    11 : '+0', 
    12 : '+1', 
    13 : '+1', 
    14 : '+2', 
    15 : '+2', 
    16 : '+3', 
    17 : '+3', 
    18 : '+4', 
    19 : '+4', 
    20 : '+5', 
    21 : '+5', 
    22 : '+6', 
    23 : '+6', 
    24 : '+7', 
    25 : '+7', 
    26 : '+8', 
    27 : '+8', 
    28 : '+9', 
    29 : '+9', 
    30 : '+10', 
};


export class CharacterInstance {
  private static selected_class = undefined;
  private static selected_species = undefined;
  private static selected_background = undefined;
  private static selected_level = undefined;
  private static _statistics = {
    'strength': { value: 0, modifier: StatModifierNumber[0]},
    'dexterity': { value: 0, modifier: StatModifierNumber[0]},
    'constitution': { value: 0, modifier: StatModifierNumber[0]},
    'intelligence': { value: 0, modifier: StatModifierNumber[0]},
    'wisdom': { value: 0, modifier: StatModifierNumber[0]},
    'charisma': { value: 0, modifier: StatModifierNumber[0]},
  }


  constructor() {}
  
  static unsetAll() {
    this.selected_class = undefined;
    this.selected_species = undefined;
    this.selected_background = undefined;
  }

  static getStatistic(statName) {
    return this._statistics[statName];
  }

  static get statistics() {
    return this._statistics;
  }

  static setStatistics(statName,statValue) {
    this._statistics[statName].value = statValue;
    this._statistics[statName].modifier = StatModifierNumber[statValue]; 
  }

  static get selectedClass() {
    return this.selected_class;
  }

  static set selectedClass(className) {
    this.selected_class = className;
  }

  static get selectedSpecies() {
    return this.selected_species;
  }

  static set selectedSpecies(specName) {
    this.selected_species = specName;
  }

  static get selectedBackground() {
    return this.selected_background;
  }

  static set selectedBackground(bgName) {
    this.selected_background = bgName;
  }

  static get selectedLevel() {
    return this.selected_level;
  }

  static set selectedLevel(lvl) {
    this.selected_level = lvl;
  }

  // non credo mi serva un set o get totale

}


