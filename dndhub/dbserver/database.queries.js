import { Database } from "./database.js";


export class DatabaseQueries {
  static async map(array, mapper) {
    let result = [];
    for(const item of array) {
      result.push(await mapper(item));
    }
    return result;
  }

  static async unwrapAbilityScore(score) {
    let skills = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${score.skills}`);
    
    return {
      idx: score.idx,
      name: score.name,
      full_name: score.full_name,
      description: score.description,
      skills: await DatabaseQueries.map(await skills, DatabaseQueries.unwrapArrayAbilityBonusItem),
    };
  }

  static async unwrapBackground(bg) {
    let starting_proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${bg.starting_proficiencies}`);
    let language_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.language_options}`);
    let starting_equipment = Database.queryAll(`SELECT * FROM ArrayStartingEquipmentItem WHERE array_id = ${bg.starting_equipment}`);
    let starting_equipment_options = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${bg.starting_equipment_options}`);
    let personality_traits = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.personality_traits}`);
    let ideals = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.ideals}`);
    let bonds = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.bonds}`);
    let flaws = Database.queryAll(`SELECT * FROM Choice WHERE id = ${bg.flaws}`);

    return {
      idx: bg.idx,
      name: bg.name, 
      starting_gold_quantity: bg.starting_gold_quantity, 
      starting_gold_unit: bg.starting_gold_unit, 
      feature: {
        name: bg.feature_name,
        desc: bg.feature_desc,
      },
      starting_proficiencies: await DatabaseQueries.map(await starting_proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      language_options: (await DatabaseQueries.map(await language_options, DatabaseQueries.unwrapChoice))[0],
      starting_equipment: await DatabaseQueries.map(await starting_equipment, DatabaseQueries.unwrapArrayStartingEquipmentItem),
      starting_equipment_options: await DatabaseQueries.map(await starting_equipment_options, DatabaseQueries.unwrapArrayChoiceItem),
      personality_traits: (await DatabaseQueries.map(await personality_traits, DatabaseQueries.unwrapChoice))[0],
      ideals: (await DatabaseQueries.map(await ideals, DatabaseQueries.unwrapChoice))[0],
      bonds: (await DatabaseQueries.map(await bonds, DatabaseQueries.unwrapChoice))[0],
      flaws: (await DatabaseQueries.map(await flaws, DatabaseQueries.unwrapChoice))[0],
    };
  }

  static async unwrapArrayAbilityBonusItem(item) {
    let ref = Database.queryAll(`SELECT * FROM APIReference WHERE idx = ${item.ability_score}`);
    return {
      ability_score: (await DatabaseQueries.map(await ref, DatabaseQueries.unwrapAPIReference))[0],
      bonus: item.bonus
    };
  }

  static async unwrapSpecies(species) {
    let ability_bonuses = Database.queryAll(`SELECT * FROM ArrayAbilityBonusItem WHERE array_id = ${species.ability_bonuses}`);
    let ability_bonus_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.ability_bonus_options}`);
    let starting_proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.starting_proficiencies}`);
    let starting_proficiency_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.starting_proficiency_options}`);
    let languages = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.languages}`);
    let language_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${species.language_options}`);
    let traits = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.traits}`);
    let subspecies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${species.subspecies}`);

    return {
      idx: species.idx,
      name: species.name,
      speed: species.speed,
      alignment: species.alignment,
      age: species.age,
      size: species.size,
      size_description: species.size_description,
      language_desc: species.language_desc,
      ability_bonuses: await DatabaseQueries.map(await ability_bonuses, DatabaseQueries.unwrapArrayAbilityBonusItem),
      ability_bonus_options: (await DatabaseQueries.map(await ability_bonus_options, DatabaseQueries.unwrapChoice))[0],
      starting_proficiencies: await DatabaseQueries.map(await starting_proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      starting_proficiency_options: (await DatabaseQueries.map(await starting_proficiency_options, DatabaseQueries.unwrapChoice))[0],
      languages: await DatabaseQueries.map(await languages, DatabaseQueries.unwrapArrayAPIReferenceItem),
      language_options: (await DatabaseQueries.map(await language_options, DatabaseQueries.unwrapChoice))[0],
      traits: await DatabaseQueries.map(await traits, DatabaseQueries.unwrapArrayAPIReferenceItem),
      subspecies: await DatabaseQueries.map(await subspecies, DatabaseQueries.unwrapArrayAPIReferenceItem),
    };
  }

  static async unwrapAPIReference(ref) {
    return {
      idx: ref.idx,
      name: ref.name
    };
  }
  
  
  static async unwrapMultiClassingPrereq(prereq) {
    let ability_scores = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${prereq.ability_score}'`);

    return {
      ability_score: (await DatabaseQueries.map(await ability_scores, DatabaseQueries.unwrapAPIReference))[0],
      minimum_score: prereq.minimum_score
    };
  }
  
  
  static async unwrapArrayMultiClassingPrereqItem(prereq) {
    let items = Database.queryAll(`SELECT * FROM MultiClassingPrereq WHERE id = ${prereq.item}`);
    return (await DatabaseQueries.map(await items, DatabaseQueries.unwrapMultiClassingPrereq))[0];
  }
  
  static async unwrapArrayPrerequisiteItem(prereq) {
    let item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${prereq.item}'`);
    return {
      prereq_item: (await DatabaseQueries.map(await item, DatabaseQueries.unwrapAPIReference))[0],
      prereq_string: prereq.string
    };
  }
  
  static async unwrapOption(option) {
    let reference_item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.reference_item}'`);
    let ability_score_bonus = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.ability_score_bonus}'`);
    let counted_item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.counted_item}'`);
    let prerequisites = Database.queryAll(`SELECT * FROM ArrayPrerequisiteItem where array_id = ${option.prerequisites}`);
    let damage_type = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.damage_type}'`);
    let multiple_items = Database.queryAll(`SELECT * FROM ArrayOptionItem WHERE array_id = ${option.multiple_items}`);
    let choice = Database.queryAll(`SELECT * FROM Choice WHERE id = ${option.choice_id}`);
    let ability_score_prerequisite = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${option.ability_score_prerequisite}'`);
  
    return {
      reference_item: (await DatabaseQueries.map(await reference_item, DatabaseQueries.unwrapAPIReference))[0],
      ability_score_bonus: (await DatabaseQueries.map(await ability_score_bonus, DatabaseQueries.unwrapAPIReference))[0],
      counted_item: (await DatabaseQueries.map(await counted_item, DatabaseQueries.unwrapAPIReference))[0],
      prerequisites: await DatabaseQueries.map(await prerequisites, DatabaseQueries.unwrapArrayPrerequisiteItem),
      damage_type: (await DatabaseQueries.map(await damage_type, DatabaseQueries.unwrapAPIReference))[0],
      multiple_items: await DatabaseQueries.map(await multiple_items, DatabaseQueries.unwrapArrayOptionItem),
      choice: (await DatabaseQueries.map(await choice, DatabaseQueries.unwrapChoice))[0],
      ability_score_prerequisite: (await DatabaseQueries.map(await ability_score_prerequisite, DatabaseQueries.unwrapAPIReference))[0],
      string: option.string,
      bonus: option.bonus,
      action: {
        name: option.action_name,
        count: option.action_count,
        type: option.action_type,
        desc: option.action_desc,
      },
      counted_reference_count: option.counted_reference_count,
      damage: {
        dice: option.damage_dice,
        type: option.damage_type,
        notes: option.damage_notes,
      },
      money: {
        count: option.count,
        unit: option.unit,
      },
      multiple_desc: option.multiple_desc,
      minimium_score_prerequisite: option.minimium_score_prerequisite,
      size: option.size
    };
  }
  
  static async unwrapArrayOptionItem(optionItem) {
    let items = Database.queryAll(`SELECT * FROM Option WHERE id = ${optionItem.item_id}`);
    return (await DatabaseQueries.map(await items, DatabaseQueries.unwrapOption))[0];
  }
  
  static async unwrapOptionSet(opt_set) {
    let options_array = Database.queryAll(`SELECT * FROM ArrayOptionItem WHERE array_id = ${opt_set.options_array}`);
    let equipment_category = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${opt_set.equipment_category}'`);
  
    return {
      equipment_category: (await DatabaseQueries.map(await equipment_category, DatabaseQueries.unwrapAPIReference))[0],
      options_array: await DatabaseQueries.map(await options_array, DatabaseQueries.unwrapArrayOptionItem)
    };
  }
  
  static async unwrapChoice(choice) {
    let option_set = Database.queryAll(`SELECT * FROM OptionSet WHERE id = ${choice.id}`);
  
    return {
      option_set: (await DatabaseQueries.map(await option_set, DatabaseQueries.unwrapOptionSet))[0],
      desc: choice.desc,
      choose: choice.choose,
      text: choice.text
    };
  }
  
  static async unwrapArrayAPIReferenceItem(ref) {
    let item = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${ref.item}'`);
    return (await DatabaseQueries.map(await item, DatabaseQueries.unwrapAPIReference))[0];
  }
  
  static async unwrapArrayChoiceItem(choiceItem) {
    let id = Database.queryAll(`SELECT * FROM Choice WHERE id = ${choiceItem.id}`);
    return (await DatabaseQueries.map(await id, DatabaseQueries.unwrapChoice))[0];
  }
  
  static async unwrapMultiClassing(multiclassing) {
    let prerequisites = Database.queryAll(`SELECT * FROM ArrayMultiClassingPrereqItem where array_id = ${multiclassing.prerequisites}`);
    let prerequisite_options = Database.queryAll(`SELECT * FROM Choice WHERE id = ${multiclassing.prerequisite_options}`);
    let proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${multiclassing.proficiencies}`);
    let proficiency_choices = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${multiclassing.proficiency_choices}`);
  
    return {
      prerequisites: await DatabaseQueries.map(await prerequisites, DatabaseQueries.unwrapArrayMultiClassingPrereqItem),
      prerequisite_options: (await DatabaseQueries.map(await prerequisite_options, DatabaseQueries.unwrapChoice))[0],
      proficiencies: await DatabaseQueries.map(await proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      proficiency_choices: await DatabaseQueries.map(await proficiency_choices, DatabaseQueries.unwrapArrayChoiceItem),
    };
  }
  
  static async unwrapArrayStartingEquipmentItem(equipItem) {
    let equipment = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${equipItem.equipment}'`);
  
    return {
      equipment: (await DatabaseQueries.map(await equipment, DatabaseQueries.unwrapAPIReference))[0],
      quantity: equipItem.quantity
    };
  }
  
  // TODO TRY CATCH E VIRGOLETTE E ARRAY FLATTEN
  
  static async unwrapSpellcastingInfo(info) {
    return {
      name: info.name,
      desc: info.desc
    };
  }
  
  static async unwrapArraySpellcastingInfoItem(infoItem) {
    let item = Database.queryAll(`SELECT * FROM SpellcastingInfo WHERE name = '${infoItem.item}'`);
    return (await DatabaseQueries.map(await item, DatabaseQueries.unwrapSpellcastingInfo))[0];
  }
  
  static async unwrapSpellcasting(casting) {
    let spellcasting_ability = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${casting.spellcasting_ability}'`);
    let info = Database.queryAll(`SELECT * FROM ArraySpellcastingInfoItem WHERE array_id = ${casting.info}`);
  
    return {
      ability: (await DatabaseQueries.map(await spellcasting_ability, DatabaseQueries.unwrapAPIReference))[0],
      info: await DatabaseQueries.map(await info, DatabaseQueries.unwrapArraySpellcastingInfoItem),
      level: casting.level
    };
  }
  
  static async unwrapArrayCreatingSpellSlotItem(slotItem) {
    return {
      sorcery_point_cost: slotItem.sorcery_point_cost,
      spell_slot_level: slotItem.spell_slot_level
    };
  }
  
  static async unwrapClassSpecific(specific) {
    let creating_spell_slots = Database.queryAll(`SELECT * FROM ArrayCreatingSpellSlotItem WHERE array_id = ${specific.creating_spell_slots}`);
  
    return {
      creating_spell_slots: await DatabaseQueries.map(await creating_spell_slots, DatabaseQueries.unwrapArrayCreatingSpellSlotItem),
      action_surges: specific.action_surges,
      arcane_recovery_levels: specific.arcane_recovery_levels,
      aura_range: specific.aura_range,
      bardic_inspiration_die: specific.bardic_inspiration_die,
      brutal_critical_dice: specific.brutal_critical_dice,
      channel_divinity_charges: specific.channel_divinity_charges,
      destroy_undead_cr: specific.destroy_undead_cr,
      extra_attacks: specific.extra_attacks,
      favored_enemies: specific.favored_enemies,
      favored_terrain: specific.favored_terrain,
      indomitable_uses: specific.indomitable_uses,
      invocations_known: specific.invocations_known,
      ki_points: specific.ki_points,
      magical_secrets_max_5: specific.magical_secrets_max_5,
      magical_secrets_max_7: specific.magical_secrets_max_7,
      magical_secrets_max_9: specific.magical_secrets_max_9,
      martial_arts: {
        dice_count: specific.martial_arts_dice_count,
        dice_value: specific.martial_arts_dice_value,
      },
      metamagic_known: specific.metamagic_known,
      mystic_arcanum_level_6: specific.mystic_arcanum_level_6,
      mystic_arcanum_level_7: specific.mystic_arcanum_level_7,
      mystic_arcanum_level_8: specific.mystic_arcanum_level_8,
      mystic_arcanum_level_9: specific.mystic_arcanum_level_9,
      rage_count: specific.rage_count,
      rage_damage_bonus: specific.rage_damage_bonus,
      sneak_attack: {
        dice_count: specific.sneak_attack_dice_count, 
        dice_value: specific.sneak_attack_dice_value,
      },
      song_of_rest_die: specific.song_of_rest_die,
      sorcery_points: specific.sorcery_points,
      unarmored_movement: specific.unarmored_movement,
      wild_shape: {
        fly: specific.wild_shape_fly,
        max_cr: specific.wild_shape_max_cr,
        swim: specific.wild_shape_swim,
      }
    }
  }
  
  
  static async unwrapLevel(level) {
    let features = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${level.features}`);
    let character_class = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${level.character_class}'`);
    let class_specific = Database.queryAll(`SELECT * FROM ClassSpecific WHERE id = ${level.class_specific}`);
    let subclass = Database.queryAll(`SELECT * FROM APIReference WHERE idx = '${level.subclass}'`);
  
    return {
      features: await DatabaseQueries.map(await features, DatabaseQueries.unwrapArrayAPIReferenceItem),
      character_class: (await DatabaseQueries.map(await character_class, DatabaseQueries.unwrapAPIReference))[0],
      class_specific: (await DatabaseQueries.map(await class_specific, DatabaseQueries.unwrapClassSpecific))[0],
      subclass: (await DatabaseQueries.map(await subclass, DatabaseQueries.unwrapAPIReference))[0],
      idx: level.idx,
      level: level.level,
      ability_score_bonuses: level.ability_score_bonuses,
      prof_bonus: level.prof_bonus,
      cantrips_known: level.cantrips_known,
      spell_slots_level_1: level.spell_slots_level_1,
      spell_slots_level_2: level.spell_slots_level_2,
      spell_slots_level_3: level.spell_slots_level_3,
      spell_slots_level_4: level.spell_slots_level_4,
      spell_slots_level_5: level.spell_slots_level_5,
      spell_slots_level_6: level.spell_slots_level_6,
      spell_slots_level_7: level.spell_slots_level_7,
      spell_slots_level_8: level.spell_slots_level_8,
      spell_slots_level_9: level.spell_slots_level_9,
      spells_known: level.spells_known,
      additional_magical_secrets_max_lvl: level.additional_magical_secrets_max_lvl,
      aura_range: level.aura_range
    };
  }
  
  static async unwrapMagicSchool(school) {
    return {
      idx: school.idx,
      name: school.name,
      description: school.description,
    };
  }
  
  static async unwrapSpell(spell) {
    let magicSchool = Database.queryAll(`SELECT * FROM MagicSchool WHERE idx = '${spell.school}'`);
  
    return {
      magicSchool: (await DatabaseQueries.map(await magicSchool, DatabaseQueries.unwrapMagicSchool))[0],
      classes: spell.classes.split("$$$"),
      name: spell.name,
      level: spell.level,
      action_type: spell.actionType,
      concentration: spell.concentration,
      ritual: spell.ritual,
      range: spell.range,
      material: spell.material,
      duration: spell.duration,
      description: spell.description,
      components: spell.components.split("$$$"),
      cantrip_upgrade: spell.cantripUpgrade
    }
  }
  
  
  static async unwrapClass(classRow) {
    let multiclassing = Database.queryAll(`SELECT * FROM MultiClassing WHERE id = ${classRow.multi_classing}`);
    let proficiencies = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${classRow.proficiencies}`);
    let proficiency_choices = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${classRow.proficiency_choices}`);
    let saving_throws = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${classRow.saving_throws}`);
    let starting_equipment = Database.queryAll(`SELECT * FROM ArrayStartingEquipmentItem WHERE array_id = ${classRow.starting_equipment}`);
    let starting_equipment_options = Database.queryAll(`SELECT * FROM ArrayChoiceItem WHERE array_id = ${classRow.starting_equipment_options}`);
    let subclasses = Database.queryAll(`SELECT * FROM ArrayAPIReferenceItem WHERE array_id = ${classRow.subclasses}`);
    let spellcasting = Database.queryAll(`SELECT * FROM Spellcasting WHERE spellcasting_ability = '${classRow.spellcasting}'`);
    let levels = Database.queryAll(`SELECT * FROM Level WHERE character_class = '${classRow.idx}'`);
    let spells = Database.queryAll(`SELECT * FROM Spell WHERE classes LIKE '%${classRow.idx}%'`);
  
    return {
      name: classRow.name,
      spells: await DatabaseQueries.map(await spells, DatabaseQueries.unwrapSpell), 
      multiclassing: (await DatabaseQueries.map(await multiclassing, DatabaseQueries.unwrapMultiClassing))[0],
      proficiencies: await DatabaseQueries.map(await proficiencies, DatabaseQueries.unwrapArrayAPIReferenceItem),
      proficiency_choices: await DatabaseQueries.map(await proficiency_choices, DatabaseQueries.unwrapArrayChoiceItem),
      saving_throws: await DatabaseQueries.map(await saving_throws, DatabaseQueries.unwrapArrayAPIReferenceItem),
      starting_equipment: await DatabaseQueries.map(await starting_equipment, DatabaseQueries.unwrapArrayStartingEquipmentItem),
      starting_equipment_options: await DatabaseQueries.map(await starting_equipment_options, DatabaseQueries.unwrapArrayChoiceItem),
      subclasses: await DatabaseQueries.map(await subclasses, DatabaseQueries.unwrapArrayAPIReferenceItem),
      spellcasting: (await DatabaseQueries.map(await spellcasting, DatabaseQueries.unwrapSpellcasting))[0],
      levels: await DatabaseQueries.map(await levels, DatabaseQueries.unwrapLevel),
      hit_die: classRow.hit_die,
    };
  }

  static retrieve(query, unwrapper) {
    const executor = (resolve, reject) => {
      Database
      .queryAll(query)
      .catch(err => reject(err))
      .then(values => {
        DatabaseQueries
        .map(values, unwrapper)
        .catch(suberr => reject(suberr))
        .then(objs => resolve(objs));
      });
    };
  
    return new Promise(executor);
  }
}