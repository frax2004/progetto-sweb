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
  private static chosen_class = undefined;
  private static chosen_species = undefined;
  private static chosen_background = undefined;
  private static chosen_level = undefined;
  private static _statistics = {
    'strength': { value: 0, modifier: StatModifierNumber[0]},
    'dexterity': { value: 0, modifier: StatModifierNumber[0]},
    'constitution': { value: 0, modifier: StatModifierNumber[0]},
    'intelligence': { value: 0, modifier: StatModifierNumber[0]},
    'wisdom': { value: 0, modifier: StatModifierNumber[0]},
    'charisma': { value: 0, modifier: StatModifierNumber[0]},
  }
  private static chosen_spells = undefined;
  private static chosen_cantrips = undefined;
  private static chosen_languages = undefined;
  private static chosen_regular_proficiencies = undefined;
  private static chosen_extra_proficiencies = undefined;
  private static optional_equipment = undefined;
  private static chosen_subclass = undefined;
  private static chosen_ability_bonuses = undefined;
  private static chosen_subspecies = undefined;
  private static chosen_background_languages = undefined;
  private static chosen_background_equipment = undefined;

  constructor() {}
  
  static unsetAll() {
    this.chosen_class = undefined;
    this.chosen_species = undefined;
    this.chosen_background = undefined;
  }

  static get chosenBackgroundEquipment() {
    return this.chosen_background_equipment;
  }

  static set chosenBackgroundEquipment(backgroundEquipment) {
    this.chosen_background_equipment = backgroundEquipment;
  }

  static get chosenBackgroundLanguages() {
    return this.chosen_background_languages;
  }

  static set chosenBackgroundLanguages(backgroundLanguages) {
    this.chosen_background_languages = backgroundLanguages;
  }

  static get chosenSubspecies() {
    return this.chosen_subspecies;
  }

  static set chosenSubspecies(subspecies) {
    this.chosen_subspecies = subspecies;
  }

  static get chosenAbilityBonuses() {
    return this.chosen_ability_bonuses;
  }

  static set chosenAbilityBonuses(abilityBonuses) {
    this.chosen_ability_bonuses = abilityBonuses;
  }

  static get chosenSubclass() {
    return this.chosen_subclass;
  }

  static set chosenSubclass(subclass) {
    this.chosen_subclass = subclass;
  }

  static get chosenOptionalEquipment() {
    return this.optional_equipment;
  }

  static set chosenOptionalEquipment(optEquip) {
    this.optional_equipment = optEquip;
  }

  static get chosenExtraProficiencies() {
    return this.chosen_extra_proficiencies;
  }

  static set chosenExtraProficiencies(extraProf) {
    this.chosen_extra_proficiencies = extraProf;
  }

  static get chosenRegularProficiencies() {
    return this.chosen_regular_proficiencies;
  }

  static set chosenRegularProficiencies(regularProf) {
    this.chosen_regular_proficiencies = regularProf;
  }

  static get chosenLanguages() {
    return this.chosen_languages;
  }

  static set chosenLanguages(languages) {
    this.chosen_languages = languages;
  }

  static get chosenSpells() {
    return this.chosen_spells;
  }

  static set chosenSpells(spells) {
    this.chosen_spells = spells;
  }

  static get chosenCantrips() {
    return this.chosen_cantrips;
  }

  static set chosenCantrips(cantrips) {
    this.chosen_cantrips = cantrips;
  }

  static getStatisticValue(statName) {
    return this._statistics[statName].value;
  }

  static getStatisticModifier(statName) {
    return this._statistics[statName].modifier;
  }

  static get statistics() {
    return this._statistics;
  }

  static setStatistics(statName,statValue) {
    this._statistics[statName].value = statValue;
    this._statistics[statName].modifier = StatModifierNumber[statValue]; 
  }

  static get chosenClass() {
    return this.chosen_class;
  }

  static set chosenClass(className) {
    this.chosen_class = className;
  }

  static get chosenSpecies() {
    return this.chosen_species;
  }

  static set chosenSpecies(specName) {
    this.chosen_species = specName;
  }

  static get chosenBackground() {
    return this.chosen_background;
  }

  static set chosenBackground(bgName) {
    this.chosen_background = bgName;
  }

  static get chosenLevel() {
    return this.chosen_level;
  }

  static set chosenLevel(lvl) {
    this.chosen_level = lvl;
  }

  // non credo mi serva un set o get totale

}