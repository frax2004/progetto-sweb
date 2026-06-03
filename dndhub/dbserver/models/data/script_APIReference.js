var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import fs from 'fs';
import 'reflect-metadata';
const REQUIRED_META = Symbol('required');
function required() {
    return Reflect.metadata(REQUIRED_META, true);
}
function isRequired(self, field) {
    return Reflect.getMetadata(REQUIRED_META, self, field);
}
export class Shapes {
    static match(obj, shape) {
        if (shape === obj)
            return true;
        if (typeof shape == 'function')
            shape = new shape();
        const T = typeof shape;
        const U = typeof obj;
        if (T !== U)
            return false;
        if (T !== 'object')
            return true;
        if (Array.isArray(shape) && Array.isArray(obj)) {
            return obj.every(o => Shapes.match(o, shape[0]));
        }
        else if (Array.isArray(shape) || Array.isArray(obj))
            return false;
        const keyMatch = (key) => key in shape && Shapes.match(obj[key], shape[key]);
        return Object
            .keys(shape)
            .filter(key => isRequired(shape, key))
            .every(key => key in obj)
            && Object
                .keys(obj)
                .every(keyMatch);
    }
    static decompose(obj, shape) {
        let result = [];
        const visit = (value) => {
            if (value === null || typeof value !== "object") {
                return;
            }
            else if (Shapes.match(value, shape)) {
                result.push(value);
                return;
            }
            else if (Array.isArray(value)) {
                for (const item of value) {
                    visit(item);
                }
                return;
            }
            else {
                for (const child of Object.values(value)) {
                    visit(child);
                }
                return;
            }
        };
        visit(obj);
        return result;
    }
}
function extract(shape, inputPaths, transformer) {
    return inputPaths
        .map(path => {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        return Shapes.decompose(data, shape);
    })
        .filter(array => array.length !== 0)
        .flatMap(x => x)
        .map(transformer || (x => x));
}
var data;
(function (data) {
    class APIReference {
        index = "";
        name = "";
        url = "";
        note = "";
        static equals(lhs, rhs) {
            return lhs.item === rhs.index;
        }
        static transform(x, array_id, array_idx) {
            return {
                array_id: array_id,
                idx: array_idx,
                item: x.index
            };
        }
    }
    data.APIReference = APIReference;
    class Choice {
        desc = "";
        choose = 0;
        type = "";
        from = OptionSet;
    }
    data.Choice = Choice;
    class DifficultyClass {
        dc_type = APIReference;
        dc_value = 0;
        success_type = "";
    }
    data.DifficultyClass = DifficultyClass;
    class Damage {
        damage_type = APIReference;
        damage_dice = "";
        dc = DifficultyClass;
    }
    data.Damage = Damage;
    class OptionSet {
        option_set_type = "";
        equipment_category = APIReference;
        resource_list_url = "";
        options = [
            Option
        ];
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], OptionSet.prototype, "option_set_type", void 0);
    data.OptionSet = OptionSet;
    class Option {
        option_type = "";
        item = APIReference;
        choice = Choice;
        string = "";
        ability_score = APIReference;
        bonus = 0;
        action_name = "";
        count = 0;
        type = "";
        desc = "";
        name = "";
        dc = DifficultyClass;
        damage = [
            Damage
        ];
        of = APIReference;
        prerequisites = [
            class {
                type = "";
                proficiency = APIReference;
            }
        ];
        damage_dice = "";
        damage_type = APIReference;
        notes = "";
        alignments = [
            APIReference
        ];
        unit = "";
        items = [
            Option
        ];
        minimum_score = 0;
        size = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Option.prototype, "option_type", void 0);
    data.Option = Option;
    class DamageType {
        index = "";
        name = "";
        description = "";
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], DamageType.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], DamageType.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], DamageType.prototype, "description", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], DamageType.prototype, "url", void 0);
    data.DamageType = DamageType;
    class AbilityScore {
        index = "";
        name = "";
        full_name = "";
        description = "";
        skills = [
            APIReference
        ];
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], AbilityScore.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], AbilityScore.prototype, "full_name", void 0);
    data.AbilityScore = AbilityScore;
    //non faccio alignment, c'è già tutto nel file dedicato
    class StartingEquipment {
        equipment = APIReference;
        quantity = 0;
    }
    data.StartingEquipment = StartingEquipment;
    // cost e backgroundFeature non esistono nel db, 
    // mi servono ai fini del riconoscimento di background
    class Cost {
        quantity = 0;
        unit = "";
    }
    data.Cost = Cost;
    class BackgroundFeature {
        name = "";
        desc = [""];
    }
    data.BackgroundFeature = BackgroundFeature;
    class Background {
        index = "";
        name = "";
        starting_proficiencies = [
            APIReference
        ];
        language_options = Choice;
        starting_equipment = [
            StartingEquipment
        ];
        starting_equipment_options = [
            Choice
        ];
        starting_gold = Cost;
        feature = BackgroundFeature;
        personality_traits = Choice;
        ideals = Choice;
        bonds = Choice;
        flaws = Choice;
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Background.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Background.prototype, "name", void 0);
    data.Background = Background;
    class SpellcastingInfo {
        name = "";
        desc = [""];
    }
    data.SpellcastingInfo = SpellcastingInfo;
    class SpellCasting {
        level = 0;
        spellcasting_ability = APIReference;
        info = [SpellcastingInfo];
    }
    data.SpellCasting = SpellCasting;
    class MultiClassingPrereq {
        ability_score = APIReference;
        minimum_score = 0;
    }
    data.MultiClassingPrereq = MultiClassingPrereq;
    class MultiClassing {
        prerequisites = [MultiClassingPrereq];
        prerequisite_options = Choice;
        proficiencies = [APIReference];
        proficiency_choices = [Choice];
    }
    data.MultiClassing = MultiClassing;
    class Class {
        index = "";
        name = "";
        hit_die = 0;
        class_levels = "";
        multi_classing = MultiClassing;
        proficiencies = [APIReference];
        proficiency_choices = [Choice];
        saving_throws = [APIReference];
        starting_equipment = [StartingEquipment];
        starting_equipment_options = [Choice];
        subclasses = [APIReference];
        spellcasting = SpellCasting;
        spells = "";
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Class.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Class.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], Class.prototype, "hit_die", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Class.prototype, "class_levels", void 0);
    data.Class = Class;
    class Condition {
        index = "";
        name = "";
        description = "";
        url = "";
    }
    data.Condition = Condition;
    class EquipmentCategory {
        index = "";
        name = "";
        equipment = [APIReference];
        url = "";
    }
    data.EquipmentCategory = EquipmentCategory;
    class ArmorClass {
        base = 0;
        dex_bonus = false;
        max_bonus = 0;
    }
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], ArmorClass.prototype, "base", void 0);
    __decorate([
        required(),
        __metadata("design:type", Boolean)
    ], ArmorClass.prototype, "dex_bonus", void 0);
    data.ArmorClass = ArmorClass;
    class _Range {
        normal = 0;
        long = 0;
    }
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], _Range.prototype, "normal", void 0);
    data._Range = _Range;
    class ThrowRange {
        normal = 0;
        long = 0;
    }
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], ThrowRange.prototype, "normal", void 0);
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], ThrowRange.prototype, "long", void 0);
    data.ThrowRange = ThrowRange;
    class Content {
        item = APIReference;
        quantity = 0;
    }
    __decorate([
        required(),
        __metadata("design:type", Object)
    ], Content.prototype, "item", void 0);
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], Content.prototype, "quantity", void 0);
    data.Content = Content;
    class Utilize {
        name = "";
        dc = DifficultyClass;
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Utilize.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", Object)
    ], Utilize.prototype, "dc", void 0);
    data.Utilize = Utilize;
    class Equipment {
        index = "";
        name = "";
        equipment_categories = [APIReference];
        cost = Cost;
        url = "";
        description = "";
        weight = 0;
        ammunition = APIReference;
        armor_class = ArmorClass;
        contents = [Content];
        ability = APIReference;
        craft = [APIReference];
        damage = Damage;
        doff_time = "";
        don_time = "";
        image = "";
        mastery = APIReference;
        notes = [""];
        properties = [APIReference];
        quantity = 0;
        storage = APIReference;
        range = _Range;
        stealth_disadvantage = false;
        str_minimum = 0;
        throw_range = ThrowRange;
        two_handed_damage = Damage;
        utilize = [Utilize];
    }
    data.Equipment = Equipment;
    class FeatPrerequisites {
        minimum_level = 0;
        feature_named = "";
    }
    data.FeatPrerequisites = FeatPrerequisites;
    class Feat {
        index = "";
        name = "";
        description = "";
        type = "";
        repeatable = "";
        prerequisites = FeatPrerequisites;
        prerequisite_options = Choice;
        url = "";
    }
    data.Feat = Feat;
    class Language {
        index = "";
        name = "";
        is_rare = false;
        note = "";
        url = "";
    }
    data.Language = Language;
    class MagicItem {
        name = "";
        index = "";
        url = "";
        image = "";
        equipment_category = APIReference;
        variant = false;
        variants = [APIReference];
        attunement = false;
        rarity = "";
        desc = "";
        'limited-to' = "";
    }
    data.MagicItem = MagicItem;
    class MagicSchool {
        index = "";
        name = "";
        description = "";
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], MagicSchool.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], MagicSchool.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], MagicSchool.prototype, "description", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], MagicSchool.prototype, "url", void 0);
    data.MagicSchool = MagicSchool;
    class Proficiency {
        index = "";
        name = "";
        type = "";
        backgrounds = [APIReference];
        classes = [APIReference];
        reference = APIReference;
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Proficiency.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Proficiency.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Proficiency.prototype, "type", void 0);
    data.Proficiency = Proficiency;
    class Skill {
        index = "";
        name = "";
        description = "";
        url = "";
        ability_score = APIReference;
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Skill.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Skill.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Skill.prototype, "description", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Skill.prototype, "url", void 0);
    data.Skill = Skill;
    class AbilityBonus {
        ability_score = APIReference;
        bonus = 0;
    }
    data.AbilityBonus = AbilityBonus;
    class Species {
        index = "";
        name = "";
        speed = 0;
        ability_bonuses = [AbilityBonus];
        ability_bonus_options = Choice;
        alignment = "";
        age = "";
        size = "";
        size_description = "";
        starting_proficiencies = [APIReference];
        starting_proficiency_options = Choice;
        languages = [APIReference];
        language_desc = "";
        language_options = Choice;
        traits = [APIReference];
        subraces = [APIReference];
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Species.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], Species.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], Species.prototype, "speed", void 0);
    data.Species = Species;
    class SubclassSpellPrerequisite {
        index = "";
        type = "";
        name = "";
        url = "";
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], SubclassSpellPrerequisite.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], SubclassSpellPrerequisite.prototype, "type", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], SubclassSpellPrerequisite.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], SubclassSpellPrerequisite.prototype, "url", void 0);
    data.SubclassSpellPrerequisite = SubclassSpellPrerequisite;
    class SubclassSpell {
        prerequisites = [SubclassSpellPrerequisite];
        spell = APIReference;
    }
    data.SubclassSpell = SubclassSpell;
    class Subclass {
        index = "";
        name = "";
        //si chiama class, problema?
        class = APIReference;
        subclass_flavor = "";
        desc = [""];
        subclass_levels = "";
        spells = [SubclassSpell];
        url = "";
    }
    data.Subclass = Subclass;
    class Subrace {
        index = "";
        name = "";
        race = APIReference;
        desc = "";
        ability_bonus = [AbilityBonus];
        racial_traits = [APIReference];
        url = "";
    }
    data.Subrace = Subrace;
    class Spell {
        name = "";
        level = 0;
        school = "";
        classes = [""];
        actionType = "";
        concentration = false;
        ritual = false;
        range = "";
        components = [""];
        material = "";
        duration = "";
        description = "";
        cantripUpgrade = "";
    }
    data.Spell = Spell;
    class AreaOfEffect {
        size = 0;
        type = "";
    }
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], AreaOfEffect.prototype, "size", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], AreaOfEffect.prototype, "type", void 0);
    data.AreaOfEffect = AreaOfEffect;
    class BreathWeaponUsage {
        type = "";
        times = 0;
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], BreathWeaponUsage.prototype, "type", void 0);
    __decorate([
        required(),
        __metadata("design:type", Number)
    ], BreathWeaponUsage.prototype, "times", void 0);
    data.BreathWeaponUsage = BreathWeaponUsage;
    class BreathWeaponDamage {
        damage_type = APIReference;
        damage_at_character_level = class {
            "1" = "";
            "6" = "";
            "11" = "";
            "16" = "";
        };
    }
    data.BreathWeaponDamage = BreathWeaponDamage;
    class BreathWeapon {
        name = "";
        desc = "";
        area_of_effect = AreaOfEffect;
        usage = BreathWeaponUsage;
        dc = DifficultyClass;
        damage = [BreathWeaponDamage];
    }
    data.BreathWeapon = BreathWeapon;
    class TraitSpecific {
        damage_type = APIReference;
        breath_weapon = BreathWeapon;
        spell_options = Choice;
        subtrait_options = Choice;
    }
    data.TraitSpecific = TraitSpecific;
    class Trait {
        index = "";
        name = "";
        desc = [""];
        races = [APIReference];
        subraces = [APIReference];
        proficiencies = [APIReference];
        url = "";
        proficiency_choices = Choice;
        language_options = Choice;
        parent = APIReference;
        trait_specific = TraitSpecific;
    }
    data.Trait = Trait;
    class WeaponProperty {
        index = "";
        description = "";
        name = "";
        url = "";
    }
    data.WeaponProperty = WeaponProperty;
    class ClassSpecific {
        action_surges = 0;
        arcane_recovery_levels = 0;
        aura_range = 0;
        bardic_inspiration_die = 0;
        brutal_critical_dice = 0;
        channel_divinity_charges = 0;
        creating_spell_slots = [
            class {
                sorcery_point_cost = 0;
                spell_slot_level = 0;
            }
        ];
        destroy_undead_cr = 0;
        extra_attacks = 0;
        favored_enemies = 0;
        favored_terrain = 0;
        indomitable_uses = 0;
        invocations_known = 0;
        ki_points = 0;
        magical_secrets_max_5 = 0;
        magical_secrets_max_7 = 0;
        magical_secrets_max_9 = 0;
        martial_arts = class {
            dice_count = 0;
            dice_value = 0;
        };
        metamagic_known = 0;
        mystic_arcanum_level_6 = 0;
        mystic_arcanum_level_7 = 0;
        mystic_arcanum_level_8 = 0;
        mystic_arcanum_level_9 = 0;
        rage_count = 0;
        rage_damage_bonus = 0;
        sneak_attack = class {
            dice_count = 0;
            dice_value = 0;
        };
        song_of_rest_die = 0;
        sorcery_points = 0;
        unarmored_movement = 0;
        wild_shape_fly = false;
        wild_shape_max_cr = 0;
        wild_shape_swim = false;
    }
    data.ClassSpecific = ClassSpecific;
    class LevelSpellcasting {
        cantrips_known = 0;
        spell_slots_level_1 = 0;
        spell_slots_level_2 = 0;
        spell_slots_level_3 = 0;
        spell_slots_level_4 = 0;
        spell_slots_level_5 = 0;
        spell_slots_level_6 = 0;
        spell_slots_level_7 = 0;
        spell_slots_level_8 = 0;
        spell_slots_level_9 = 0;
        spells_known = 0;
    }
    data.LevelSpellcasting = LevelSpellcasting;
    class SubclassSpecific {
        additionale_magical_secrets_max_lvl = 0;
        aura_range = 0;
    }
    data.SubclassSpecific = SubclassSpecific;
    class Level {
        index = "";
        level = 0;
        ability_score_bonuses = 0;
        prof_bonus = 0;
        features = [APIReference];
        class = APIReference;
        class_specific = ClassSpecific;
        spellcasting = LevelSpellcasting;
        subclass = APIReference;
        subclass_specific = SubclassSpecific;
        url = "";
    }
    data.Level = Level;
    // prima di scrivere il json che conterrà questo oggetto
    // si assegnaerà ad ogni elemento di ogni array, l'indice del proprio array
    // e poi si farà il flatten: [[{index: 0}, {}, {}], [{index: 1}], [...]]
    data.ArrayAPIReference = [];
})(data || (data = {}));
function getOrInsertId(table, actual, equals, transform) {
    const i = table.findIndex(expected => {
        return false;
        if (expected.length !== actual.length)
            return false;
        for (let j = 0; j < expected.length; ++j) {
            if (!equals(expected[j], actual[j]))
                return false;
        }
        return true;
    });
    if (i < 0) {
        const id = table.length;
        table.push(actual.map((x, k) => transform(x, id, k)));
        return id;
    }
    else
        return i;
}
function translate(ctx) {
    const extracted = ctx.extractor(ctx.shape, ctx.inputs);
    const translated = extracted.map(ctx.mapper);
    fs.writeFileSync("new-data/" + ctx.output, JSON.stringify(translated), 'utf8');
}
const allFiles = fs
    .readdirSync('.', 'utf8')
    .filter((path) => path.startsWith('5e'));
[
    {
        extractor: (extract),
        shape: new data.APIReference(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "api_references.json"
    },
    {
        extractor: (extract),
        shape: new data.Choice(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "choices.json"
    },
    {
        extractor: (extract),
        shape: new data.DifficultyClass(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "difficulty_classes.json"
    },
    {
        extractor: (extract),
        shape: new data.Damage(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "damages.json"
    },
    {
        extractor: (extract),
        shape: new data.OptionSet(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "option_sets.json"
    },
    {
        extractor: (extract),
        shape: new data.Option(),
        mapper: (x) => x,
        // function(x: any): models.Option {
        //   return {
        //     id: models.Option.id(),
        //     reference_item: x.item,
        // choice_id: ,
        // string?: string,
        // ability_score_bonus?: string,
        // bonus?: number,
        // action_name?: string,
        // action_count?: number,
        // action_type?: string,
        // action_desc?: string,
        // breath_name?: string,
        // breath_dc?: number,
        // breath_damage_type?: string,
        // breath_damage_dice?: string,
        // breath_damage_dc?: number,
        // counted_reference_count?: number,
        // counted_item?: string,
        // prerequisites?: number,
        // damage_dice?: string,
        // damage_type?: string, 
        // alignments?: number, 
        // money_count?: number,
        // money_unit?: string,
        // multiple_items?: number, 
        // ability_score_prerequisite?: string,
        // size?: string
        //   }
        // },
        inputs: allFiles,
        output: "options.json"
    },
    {
        extractor: (extract),
        shape: new data.DamageType(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Damage-Types.json"],
        output: "damage_types.json"
    },
    {
        extractor: (extract),
        shape: new data.AbilityScore(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Ability-Scores.json"],
        output: "ability_scores.json"
    },
    {
        extractor: (extract),
        shape: new data.StartingEquipment(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Classes.json"],
        output: "starting_equipments.json"
    },
    {
        extractor: (extract),
        shape: new data.Cost(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Equipments.json"],
        output: "costs.json"
    },
    {
        extractor: (extract),
        shape: new data.BackgroundFeature(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Backgrounds.json"],
        output: "background_features.json"
    },
    {
        extractor: (extract),
        shape: new data.Background(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Backgrounds.json"],
        output: "backgronds.json"
    },
    {
        extractor: (extract),
        shape: new data.SpellcastingInfo(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Classes.json"],
        output: "spellcasting_infos.json"
    },
    {
        extractor: (extract),
        shape: new data.SpellCasting(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Classes.json"],
        output: "spellcastings.json"
    },
    {
        extractor: (extract),
        shape: new data.MultiClassingPrereq(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Classes.json"],
        output: "multi_classing_prereqs.json"
    },
    {
        extractor: (extract),
        shape: new data.MultiClassing(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Classes.json"],
        output: "multi_classing.json"
    },
    {
        extractor: (extract),
        shape: new data.Class(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Classes.json"],
        output: "classes.json"
    },
    {
        extractor: (extract),
        shape: new data.Condition(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Conditions.json"],
        output: "conditions.json"
    },
    {
        extractor: (extract),
        shape: new data.EquipmentCategory(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                url: x.url,
                equipment: getOrInsertId(data.ArrayAPIReference, x.equipment, data.APIReference.equals, data.APIReference.transform)
            };
        },
        inputs: ["5e-SRD-Equipment-Categories.json"],
        output: "equipment_categories.json"
    },
    {
        extractor: (extract),
        shape: new data.ArmorClass(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "armor_classes.json"
    },
    {
        extractor: (extract),
        shape: new data._Range(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "ranges.json"
    },
    {
        extractor: (extract),
        shape: new data.ThrowRange(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "throw_ranges.json"
    },
    {
        extractor: (extract),
        shape: new data.Content(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "contents.json"
    },
    {
        extractor: (extract),
        shape: new data.Utilize(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "utilizes.json"
    },
    {
        extractor: (extract),
        shape: new data.Equipment(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "equipments.json"
    },
    {
        extractor: (extract),
        shape: new data.FeatPrerequisites(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Feats.json"],
        output: "feat_prereqs.json"
    },
    {
        extractor: (extract),
        shape: new data.Feat(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Feats.json"],
        output: "feats.json"
    },
    {
        extractor: (extract),
        shape: new data.Language(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Languages.json"],
        output: "languages.json"
    },
    {
        extractor: (extract),
        shape: new data.MagicItem(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Magic-Items.json"],
        output: "magic_items.json"
    },
    {
        extractor: (extract),
        shape: new data.MagicSchool(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Magic-Schools.json"],
        output: "magic_schools.json"
    },
    {
        extractor: (extract),
        shape: new data.Proficiency(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Proficiencies.json"],
        output: "proficiencies.json"
    },
    {
        extractor: (extract),
        shape: new data.Skill(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Skills.json"],
        output: "skills.json"
    },
    {
        extractor: (extract),
        shape: new data.AbilityBonus(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "ability_bonuses.json"
    },
    {
        extractor: (extract),
        shape: new data.Species(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Species.json"],
        output: "species.json"
    },
    {
        extractor: (extract),
        shape: new data.SubclassSpellPrerequisite(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Subclasses.json"],
        output: "subclass_spell_prereqs.json"
    },
    {
        extractor: (extract),
        shape: new data.SubclassSpell(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Subclasses.json"],
        output: "subclass_spells.json"
    },
    {
        extractor: (extract),
        shape: new data.Subclass(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Subclasses.json"],
        output: "subclasses.json"
    },
    {
        extractor: (extract),
        shape: new data.Subrace(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Subspecies.json"],
        output: "subspecies.json"
    },
    {
        extractor: (extract),
        shape: new data.Spell(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Spells.json"],
        output: "spells.json"
    },
    {
        extractor: (extract),
        shape: new data.AreaOfEffect(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "areas_of_effect.json"
    },
    {
        extractor: (extract),
        shape: new data.BreathWeaponUsage(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Traits.json"],
        output: "breath_weapon_usages.json"
    },
    {
        extractor: (extract),
        shape: new data.BreathWeaponDamage(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Traits.json"],
        output: "breath_weapon_damages.json"
    },
    {
        extractor: (extract),
        shape: new data.BreathWeapon(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Traits.json"],
        output: "breath_weapons.json"
    },
    {
        extractor: (extract),
        shape: new data.TraitSpecific(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Traits.json"],
        output: "trait_specifics.json"
    },
    {
        extractor: (extract),
        shape: new data.Trait(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Traits.json"],
        output: "traits.json"
    },
    {
        extractor: (extract),
        shape: new data.WeaponProperty(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Weapon-Properties.json"],
        output: "weapon_properties.json"
    },
    {
        extractor: (extract),
        shape: new data.ClassSpecific(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Levels.json"],
        output: "class_specifics.json"
    },
    {
        extractor: (extract),
        shape: new data.LevelSpellcasting(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Levels.json"],
        output: "level_spellcastings.json"
    },
    {
        extractor: (extract),
        shape: new data.SubclassSpecific(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Levels.json"],
        output: "subclass_specifics.json"
    },
    {
        extractor: (extract),
        shape: new data.Level(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Levels.json"],
        output: "levels.json"
    },
].forEach(translate);
function printArray(array, output) {
    fs.writeFileSync("new-data/" + output, JSON.stringify(array.flatMap(x => x)), 'utf8');
}
printArray(data.ArrayAPIReference, 'array_api_references.json');
