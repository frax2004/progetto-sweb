// tabelle di common.ts
export var models;
(function (models) {
    class APIReference {
        idx;
        name;
        url;
        note;
    }
    models.APIReference = APIReference;
    let SuccessType;
    (function (SuccessType) {
        SuccessType[SuccessType["none"] = 0] = "none";
        SuccessType[SuccessType["half"] = 1] = "half";
        SuccessType[SuccessType["other"] = 2] = "other";
    })(SuccessType = models.SuccessType || (models.SuccessType = {}));
    class DifficultyClass {
        // forse id può essere auto increment
        id;
        dc_type;
        dc_value;
        success_type;
    }
    models.DifficultyClass = DifficultyClass;
    let AreaOfEffectType;
    (function (AreaOfEffectType) {
        AreaOfEffectType[AreaOfEffectType["sphere"] = 0] = "sphere";
        AreaOfEffectType[AreaOfEffectType["cube"] = 1] = "cube";
        AreaOfEffectType[AreaOfEffectType["cylinder"] = 2] = "cylinder";
        AreaOfEffectType[AreaOfEffectType["line"] = 3] = "line";
        AreaOfEffectType[AreaOfEffectType["cone"] = 4] = "cone";
    })(AreaOfEffectType = models.AreaOfEffectType || (models.AreaOfEffectType = {}));
    class AreaOfEffect {
        size;
        type;
    }
    models.AreaOfEffect = AreaOfEffect;
    class Choice {
        desc;
        choose;
        type;
        opt_id;
    }
    models.Choice = Choice;
    class ArrayDamageItem {
        array_id;
        damage_type;
        damage_dice;
        dc;
        idx;
    }
    models.ArrayDamageItem = ArrayDamageItem;
    // OptionArray mi serve per multiple
    class ArrayOptionItem {
        item_id;
        idx;
        array_id;
    }
    models.ArrayOptionItem = ArrayOptionItem;
    class ArrayPrerequisitesItem {
        array_idx;
        array_id;
        item;
        string;
    }
    models.ArrayPrerequisitesItem = ArrayPrerequisitesItem;
    class Option {
        id;
        option_type;
        // pseudo-tabella reference
        reference_item;
        // pseudo-tabella choice
        choice_id;
        // pseudo-tabella string
        string;
        // pseudo-tabella ability bonus 
        ability_score_bonus;
        bonus;
        // pseudo-tabella action
        action_name;
        action_count;
        action_type;
        action_desc;
        // pseudo-tabella breath
        breath_name;
        breath_dc;
        breath_damage; //foreign key
        // pseudo-tabella countedReference
        counted_reference_count;
        counted_item;
        prerequisites;
        // pseudo-tabella damage
        damage_dice;
        damage_type;
        damage_notes;
        // pseudo-tabella ideal
        // teoricamente inutile perché non stiamo facendo alignment ma la copio perché piccola
        alignments;
        align_desc;
        // pseudo-tabella money
        money_count;
        money_unit;
        // pseudo-tabella multiple
        multiple_items;
        multiple_desc;
        // pseudo-tabella score_prerequisite
        ability_score_prerequisite;
        minimum_score_prerequisite;
        // pseuso-tabella size
        size;
    }
    models.Option = Option;
    class ArrayOfOptionsAndStringItem {
        opt_id;
        string;
        idx;
        array_id;
    }
    models.ArrayOfOptionsAndStringItem = ArrayOfOptionsAndStringItem;
    class OptionSet {
        id;
        option_set_type;
        // pseudo-tabella equipment_category
        equipment_category;
        resource_list_url;
        // pseudo_tabella options_array
        options_array;
    }
    models.OptionSet = OptionSet;
    // tabelle di DamageTypes.ts
    class DamageTypes {
        idx;
        name;
        description;
        url;
    }
    models.DamageTypes = DamageTypes;
    // tabelle di AbilityScores.ts
    class AbilityScore {
        idx;
        name;
        full_name;
        description;
        skills;
        url;
    }
    models.AbilityScore = AbilityScore;
    // tabelle di Alignments
    // in teoria inutili ma copiata comunque perché piccola
    class Alignment {
        idx;
        name;
        abbreviation;
        description;
        url;
    }
    models.Alignment = Alignment;
    // tabelle di Backgrounds.ts
    class ArrayStartingEquipmentItem {
        array_id;
        array_idx;
        equipment;
        quantity;
    }
    models.ArrayStartingEquipmentItem = ArrayStartingEquipmentItem;
    class ArrayAPIReferenceItem {
        array_id;
        item;
        idx;
    }
    models.ArrayAPIReferenceItem = ArrayAPIReferenceItem;
    class ArrayChoiceItem {
        array_id;
        id;
        idx;
    }
    models.ArrayChoiceItem = ArrayChoiceItem;
    class Background {
        idx;
        name;
        starting_proficiencies;
        language_options;
        starting_equipment;
        // primo flatten
        starting_gold_quantity;
        starting_gold_unit;
        // secondo flatten
        starting_equipment_options;
        feature_name;
        feature_desc;
        personality_traits;
        ideals;
        bonds;
        flaws;
        url;
    }
    models.Background = Background;
    // tabelle di Condition.ts
    class Condition {
        idx;
        name;
        description;
        url;
    }
    models.Condition = Condition;
    // tabelle di EquipmentCategories.ts
    class EquipmentCategory {
        idx;
        name;
        equipment;
        url;
    }
    models.EquipmentCategory = EquipmentCategory;
    // tabelle di Language.ts
    class Language {
        idx;
        name;
        is_rare;
        note;
        url;
    }
    models.Language = Language;
    // tabelle di MagicSchools.ts
    class MagicSchool {
        idx;
        name;
        description;
        url;
    }
    models.MagicSchool = MagicSchool;
    // monsters non ci serve
    // tabelle di Proficiencies.ts
    class Proficiency {
        idx;
        name;
        type;
        backgrounds;
        classes;
        reference;
        url;
    }
    models.Proficiency = Proficiency;
    // tabelle di Skills.ts
    class Skill {
        idx;
        name;
        description;
        ability_score;
        url;
    }
    models.Skill = Skill;
    // tabelle di WeaponMasteryProperties.ts
    class WeaponMasteryProperty {
        idx;
        name;
        description;
        url;
    }
    models.WeaponMasteryProperty = WeaponMasteryProperty;
    // tabelle di Classes.ts
    class SpellcastingInfo {
        name;
        desc;
    }
    models.SpellcastingInfo = SpellcastingInfo;
    class ArraySpellcastingInfoItem {
        array_id;
        array_idx;
        item;
    }
    models.ArraySpellcastingInfoItem = ArraySpellcastingInfoItem;
    class Spellcasting {
        level;
        spellcasting_ability;
        info;
    }
    models.Spellcasting = Spellcasting;
    class MultiClassingPrereq {
        id;
        ability_score;
        minimum_score;
    }
    models.MultiClassingPrereq = MultiClassingPrereq;
    class ArrayMultiClassingPrereqItem {
        array_id;
        array_idx;
        item;
    }
    models.ArrayMultiClassingPrereqItem = ArrayMultiClassingPrereqItem;
    class MultiClassing {
        id;
        prerequisites;
        prerequisite_options;
        proficiencies;
        proficiency_choices;
    }
    models.MultiClassing = MultiClassing;
    class Class {
        idx;
        name;
        hit_die;
        class_levels;
        multi_classing;
        proficiencies;
        proficiency_choices;
        saving_throws;
        starting_equipment;
        starting_equipment_options;
        subclasses;
        spellcasting;
        spells;
        url;
    }
    models.Class = Class;
    // tabelle di Equipments.ts
    class Content {
        item;
        quantity;
    }
    models.Content = Content;
    class ArrayContentItem {
        item;
        quantity;
        array_id;
        array_idx;
    }
    models.ArrayContentItem = ArrayContentItem;
    class Utilize {
        name;
        dc;
    }
    models.Utilize = Utilize;
    class ArrayUtilizeItem {
        array_id;
        idx;
        item;
        dc;
    }
    models.ArrayUtilizeItem = ArrayUtilizeItem;
    ;
    class Equipment {
        idx;
        name;
        equipment_categories;
        cost_quantity;
        cost_unit;
        url;
        description;
        weight;
        ammunition;
        armor_class_base;
        armor_class_dex_bonus;
        armor_class_max_bonus;
        contents;
        ability;
        craft;
        damage_type;
        damage_dice;
        damage_dc;
        doff_time;
        don_time;
        image;
        mastery;
        notes;
        properties;
        quantity;
        storage;
        range_normal;
        range_long;
        stealth_disadvantage;
        str_minimum;
        throw_range_normal;
        throw_range_long;
        two_handed_damage_type;
        two_handed_damage_dice;
        two_handed_damage_dc;
        utilize;
    }
    models.Equipment = Equipment;
    // tabelle di Feats.ts
    class Feat {
        idx;
        name;
        description;
        type;
        repeatable;
        prerequisite_minimum_level;
        prerequisite_feature_named;
        prerequisite_options;
        url;
    }
    models.Feat = Feat;
    // tabelle di MagicItems.ts
    class MagicItem {
        idx;
        name;
        url;
        image;
        equipment_category;
        variant;
        variants;
        attunement;
        rarity;
        desc;
        limited_to;
    }
    models.MagicItem = MagicItem;
    // tabelle di species
    class ArrayAbilityBonusItem {
        ability_score;
        bonus;
        array_id;
        array_idx;
    }
    models.ArrayAbilityBonusItem = ArrayAbilityBonusItem;
    class Species {
        idx;
        name;
        speed;
        ability_bonuses;
        ability_bonus_options;
        alignment;
        age;
        starting_proficiencies;
        starting_proficiency_options;
        languages;
        languages_desc;
        language_options;
        url;
        size;
        size_description;
        traits;
        subspecies;
    }
    models.Species = Species;
    // tabelle di Subclass.ts
    class SubclassSpellPrerequisite {
        idx;
        type;
        name;
        url;
    }
    models.SubclassSpellPrerequisite = SubclassSpellPrerequisite;
    class ArraySubclassSpellPrerequisiteItem {
        item;
        array_id;
        array_idx;
    }
    models.ArraySubclassSpellPrerequisiteItem = ArraySubclassSpellPrerequisiteItem;
    class ArraySubclassSpellItem {
        prerequisite;
        spell;
        array_id;
        array_idx;
    }
    models.ArraySubclassSpellItem = ArraySubclassSpellItem;
    class Subclass {
        idx;
        url;
        name;
        class;
        subclass_flavor;
        desc;
        subclass_levels;
        spells;
    }
    models.Subclass = Subclass;
    // tabelle di Subspecies.ts
    class Subspecies {
        idx;
        name;
        url;
        species;
        desc;
        ability_bonuses;
        racial_traits;
    }
    models.Subspecies = Subspecies;
    // tabelle di Traits.ts
    class ArrayBreathWeaponDamageItem {
        damage_type;
        array_id;
        array_idx;
        character_level;
    }
    models.ArrayBreathWeaponDamageItem = ArrayBreathWeaponDamageItem;
    class BreathWeapon {
        id;
        name;
        desc;
        area_of_effect;
        usage_type;
        usage_times;
        dc;
        damage;
    }
    models.BreathWeapon = BreathWeapon;
    class TraitSpecific {
        id;
        damage_type;
        breath_weapon;
        spell_options;
        subtrait_options;
    }
    models.TraitSpecific = TraitSpecific;
    class Trait {
        idx;
        name;
        url;
        desc;
        species;
        subspecies;
        proficiencies;
        proficiency_choices;
        language_options;
        parent;
        trait_specific;
    }
    models.Trait = Trait;
    // tabelle di WeaponProperties.ts
    class WeaponProperty {
        idx;
        name;
        description;
        url;
    }
    models.WeaponProperty = WeaponProperty;
    class ArrayClassItem {
        array_id;
        array_idx;
        class;
    }
    models.ArrayClassItem = ArrayClassItem;
    let Components;
    (function (Components) {
        Components[Components["v"] = 0] = "v";
        Components[Components["s"] = 1] = "s";
        Components[Components["m"] = 2] = "m";
    })(Components = models.Components || (models.Components = {}));
    class ArrayComponentsItem {
        array_id;
        array_idx;
        item;
    }
    models.ArrayComponentsItem = ArrayComponentsItem;
    class Spell {
        name;
        level;
        school;
        classes;
        actionType;
        concentration;
        ritual;
        range;
        components;
        material;
        duration;
        description;
        cantripUpgrade;
    }
    models.Spell = Spell;
    class ArrayCreatingSpellSlotsItem {
        array_idx;
        array_id;
        sorcery_point_cost;
        spell_slot_level;
    }
    models.ArrayCreatingSpellSlotsItem = ArrayCreatingSpellSlotsItem;
    class ClassSpecific {
        id;
        action_surges;
        arcane_recovery_levels;
        aura_range;
        bardic_inspiration_die;
        brutal_critical_dice;
        channel_divinity_charges;
        creating_spell_slots;
        destroy_undead_cr;
        extra_attacks;
        favored_enemies;
        favored_terrain;
        indomitable_uses;
        invocations_known;
        ki_points;
        magical_secrets_max_5;
        magical_secrets_max_7;
        magical_secrets_max_9;
        // i due qua sotto sono attributi "flattenati"
        martial_arts_dice_count;
        martial_arts_dice_value;
        metamagic_known;
        mystic_arcanum_level_6;
        mystic_arcanum_level_7;
        mystic_arcanum_level_8;
        mystic_arcanum_level_9;
        rage_count;
        rage_damage_bonus;
        // i due qua sotto sono attributi "flattenati"
        sneak_attack_dice_count;
        sneak_attack_dice_value;
        song_of_rest_die;
        sorcery_points;
        unarmored_movement;
        wild_shape_fly;
        wild_shape_max_cr;
        wild_shape_swim;
    }
    models.ClassSpecific = ClassSpecific;
    class Level {
        index;
        level;
        ability_score_bonuses;
        prof_bonus;
        features;
        //non potevo chiamarla class
        character_class;
        class_specific;
        subclass;
        url;
        // le prossime cose sono tutte flatten di altre tabelle
        cantrips_known;
        spell_slots_level_1;
        spell_slots_level_2;
        spell_slots_level_3;
        spell_slots_level_4;
        spell_slots_level_5;
        spell_slots_level_6;
        spell_slots_level_7;
        spell_slots_level_8;
        spell_slots_level_9;
        spells_known;
        additional_magical_secrets_max_lvl;
        aura_range;
    }
    models.Level = Level;
    class Account {
        email;
        password;
        username;
    }
    models.Account = Account;
})(models || (models = {}));
