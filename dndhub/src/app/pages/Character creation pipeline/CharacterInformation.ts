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
  private static level_specifics = undefined;
  private static base_equipment = undefined;
  private static base_proficiencies = undefined;
  private static base_saving_throws = undefined;
  private static hp_die = undefined;
  private static species_ab_bonus = undefined;
  private static species_languages = undefined;
  private static species_traits = undefined;
  private static species_speed = undefined;
  private static species_size = undefined;
  private static background_starting_gold = undefined;
  private static background_feature = undefined;
  private static background_equipment = undefined;
  private static _statistics = {
    'strength': { value: 0, modifier: StatModifierNumber[0]},
    'dexterity': { value: 0, modifier: StatModifierNumber[0]},
    'constitution': { value: 0, modifier: StatModifierNumber[0]},
    'intelligence': { value: 0, modifier: StatModifierNumber[0]},
    'wisdom': { value: 0, modifier: StatModifierNumber[0]},
    'charisma': { value: 0, modifier: StatModifierNumber[0]},
  }
  private static cantrips_known = undefined;
  private static spells_known = undefined;
  private static chosen_spells = undefined;
  private static chosen_cantrips = undefined;
  private static chosen_languages = undefined;
  private static chosen_regular_proficiencies = undefined;
  private static chosen_extra_proficiencies = undefined;
  //ricorda che optional_equipment non ha quantity all'interno ma solo nome, quantity è sempre 1
  private static optional_equipment = undefined;
  private static chosen_subclass = undefined;
  private static chosen_species_ability_bonuses = 
  {
    'strength' : 0,
    'dexterity' : 0,
    'constitution' : 0,
    'intelligence' : 0,
    'wisdom' : 0,
    'charisma' : 0,
  };
  private static chosen_subspecies = undefined;
  private static chosen_background_languages = undefined;
  //ricorda che chosen_background_equipment non ha quantity all'interno ma solo nome, quantity è sempre 1
  private static chosen_background_equipment = undefined;
  private static chosen_asi = undefined;
  private static chosen_ability_score_increments = undefined;

  constructor() {}
  
  static unsetAll() {
    this.chosen_class = undefined;
    this.chosen_species = undefined;
    this.chosen_background = undefined;
    this.chosen_level = undefined;
    this.level_specifics = undefined;
    this.base_equipment = undefined;
    this.base_proficiencies = undefined;
    this.base_saving_throws = undefined;
    this.hp_die = undefined;
    this.species_ab_bonus = undefined;
    this.species_languages = undefined;
    this.species_traits = undefined;
    this.species_speed = undefined;
    this.species_size = undefined;
    this.background_starting_gold = undefined;
    this.background_feature = undefined;
    this.background_equipment = undefined;
    this._statistics = {
      'strength': { value: 0, modifier: StatModifierNumber[0]},
      'dexterity': { value: 0, modifier: StatModifierNumber[0]},
      'constitution': { value: 0, modifier: StatModifierNumber[0]},
      'intelligence': { value: 0, modifier: StatModifierNumber[0]},
      'wisdom': { value: 0, modifier: StatModifierNumber[0]},
      'charisma': { value: 0, modifier: StatModifierNumber[0]},
    };
    this.cantrips_known = undefined;
    this.spells_known = undefined;
    this.chosen_spells = undefined;
    this.chosen_cantrips = undefined;
    this.chosen_languages = undefined;
    this.chosen_regular_proficiencies = undefined;
    this.chosen_extra_proficiencies = undefined;
    this.optional_equipment = undefined;
    this.chosen_subclass = undefined;
    this.chosen_species_ability_bonuses = 
    {
      'strength' : 0,
      'dexterity' : 0,
      'constitution' : 0,
      'intelligence' : 0,
      'wisdom' : 0,
      'charisma' : 0,
    };
    this.chosen_subspecies = undefined;
    this.chosen_background_languages = undefined;
    this.chosen_background_equipment = undefined;
    this.chosen_asi = undefined;
    this.chosen_ability_score_increments = undefined;
  }

  static set cantripsKnown(numOfCantrips) {
    this.cantrips_known = numOfCantrips;
  }

  static get cantripsKnown() {
    return this.cantrips_known;
  }

  static set spellsKnown(numOfSpells) {
    this.spells_known = numOfSpells;
  } 

  static get spellsKnown() {
    return this.spells_known;
  }

  static set hitDie(dice) {
    this.hp_die = dice;
  }  

  static get hitDie() {
    return this.hp_die;
  }

  static set speciesSize(size) {
    this.species_size = size;
  }

  static get speciesSize() {
    return this.species_size;
  }

  static set speciesSpeed(speed) {
    this.species_speed = speed;
  }

  static get speciesSpeed() {
    return this.species_speed;
  }

  static set chosenAbilityScoreIncrements(abilityScoreIncrements) {
    this.chosen_ability_score_increments = abilityScoreIncrements;
  }

  static get chosenAbilityScoreIncrements() {
    return this.chosen_ability_score_increments;
  }

  static set backgroundEquipment(equipment) {
    this.background_equipment = equipment;
  }

  static get backgroundEquipment() {
    return this.background_equipment;
  }

  static set backgroundFeature(feature) {
    this.background_feature = feature;
  }

  static get backgroundFeature() {
    return this.background_feature;
  }

  static set backgroundStartingGold(startingGold) {
    this.background_starting_gold = startingGold;
  }

  static get backgroundStartingGold() {
    return this.background_starting_gold;
  }

  static set levelSpecifics(levelspecifics) {
    this.level_specifics = levelspecifics;
  }

  static get levelSpecifics() {
    return this.level_specifics;
  }

  static set speciesTraits(traits) {
    this.species_traits = traits;
  }

  static get speciesTraits() {
    return this.species_traits;
  }

  static set speciesLanguages(languages) {
    this.species_languages = languages;
  }

  static get speciesLanguages() {
    return this.species_languages;
  }

  static setSpeciesAbilityBonusStatistic(statName,statValue) {
    this.species_ab_bonus[statName] = statValue;
  }

  static set speciesAbilityBonus(abBonus) {
    this.species_ab_bonus = abBonus;
  }

  static get speciesAbilityBonus() {
    return this.species_ab_bonus;
  }

  static set baseSavingThrows(savingThrows) {
    this.base_saving_throws = savingThrows;
  }

  static get baseSavingThrows() {
    return this.base_saving_throws;
  }

  static set baseProficiencies(proficiencies) {
    this.base_proficiencies = proficiencies;
  }

  static get baseProficiencies() {
    return this.base_proficiencies;
  }

  static set baseEquipment(equipment) {
    this.base_equipment = equipment;
  }

  static get baseEquipment() {
    return this.base_equipment;
  }

  static get chosenASI() {
    return this.chosen_asi;
  }

  static set chosenASI(numberOfASI) {
    this.chosen_asi = numberOfASI;
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

  static get chosenSpeciesAbilityBonuses() {
    return this.chosen_species_ability_bonuses;
  }

  static set chosenSpeciesAbilityBonuses(abilityBonuses) {
    this.chosen_species_ability_bonuses = abilityBonuses;
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