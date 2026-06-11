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
import { isDeepStrictEqual } from 'util';
const RUNTIME_INPUT_DIR = "../old-data/";
const RUNTIME_OUTPUT_DIR = "../data/";
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
        const data = JSON.parse(fs.readFileSync(RUNTIME_INPUT_DIR + path, 'utf8'));
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
                array_idx: array_idx,
                item: x.index
            };
        }
    }
    __decorate([
        required(),
        __metadata("design:type", String)
    ], APIReference.prototype, "index", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], APIReference.prototype, "name", void 0);
    __decorate([
        required(),
        __metadata("design:type", String)
    ], APIReference.prototype, "url", void 0);
    data.APIReference = APIReference;
    class Choice {
        desc = "";
        choose = 0;
        type = "";
        from = OptionSet;
        static equals(lhs, rhs) {
            return lhs.id === getOrInsertId(data.option_sets, rhs.from);
        }
        static transform(x, array_id, array_idx) {
            return {
                array_id: array_id,
                array_idx: array_idx,
                id: getOrInsertId(data.option_sets, x.from)
            };
        }
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
        static equals(lhs, rhs) {
            return lhs.damage_type === rhs.damage_type?.index;
        }
        static transform(x, array_id, array_idx) {
            return {
                array_id: array_id,
                damage_type: x.damage_type?.index,
                damage_dice: x.damage_dice,
                dc: getOrInsertId(data.difficulty_classes, x.dc),
                array_idx: array_idx
            };
        }
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
    class OptionPrerequisite {
        type = "";
        proficiency = APIReference;
        static equals(lhs, rhs) {
            return lhs.item === rhs.proficiency?.index && lhs.string === rhs.type;
        }
        static transform(x, array_id, array_idx) {
            // console.log(x);
            return {
                string: x.type,
                item: x.proficiency?.index,
                array_id: array_id,
                array_idx: array_idx
            };
        }
    }
    data.OptionPrerequisite = OptionPrerequisite;
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
        prerequisites = [OptionPrerequisite];
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
        static equals(lhs, rhs) {
            return lhs.array_id === getOrInsertId(data.options, rhs);
            // if(rhs.option_type !== lhs.option_type) return false;
            // switch (rhs.option_type) {
            //   case 'reference':
            //     return rhs.item.index === lhs.reference_item;
            //   case 'choice':
            //     return getOrInsertId(data.option_sets,rhs.choice.from)===lhs.choice_id;
            //   case 'string':
            //     return rhs.string === lhs.string;
            //   case 'ability_bonus':
            //     return rhs.ability_score.index === lhs.ability_score_bonus
            //     && rhs.bonus === lhs.bonus;
            //   case 'action':
            //     return rhs.action_name === lhs.action_name
            //     && rhs.count === lhs.action_count
            //     && rhs.type === lhs.action_type
            //     && rhs.desc === lhs.action_desc;
            //   case 'breath':
            //     return rhs.name === lhs.breath_name
            //     && rhs.dc === lhs.breath_dc
            //     && getOrInsertArrayId(
            //       data.ArrayDamage,
            //       rhs.damage,
            //       data.Damage.equals,
            //       data.Damage.transform
            //     )===lhs.breath_damage;
            //   case 'counted_reference':
            //     return rhs.count === lhs.counted_reference_count
            //     && rhs.of?.index === lhs.counted_item
            //     && getOrInsertArrayId(
            //       data.ArrayPrerequisite,
            //       rhs.prerequisites,
            //       data.OptionPrerequisite.equals,
            //       data.OptionPrerequisite.transform
            //     )===lhs.prerequisites;
            //   case 'damage':
            //     return rhs.damage_dice === lhs.damage_dice
            //     && rhs.damage_type.index === lhs.damage_type
            //     && rhs.notes === lhs.damage_notes;
            //   case 'ideal':
            //     return getOrInsertArrayId(
            //       data.ArrayAPIReference,
            //       rhs.alignments,
            //       data.APIReference.equals,
            //       data.APIReference.transform
            //     )===lhs.alignments
            //     && rhs.desc === lhs.align_desc;
            //   case 'money':
            //     return rhs.count === lhs.money_count
            //     && rhs.unit === lhs.money_unit;
            //   case 'multiple':
            //     return getOrInsertArrayId(
            //       data.ArrayOption,
            //       rhs.items,
            //       data.Option.equals,
            //       data.Option.transform
            //     )===lhs.multiple_items
            //     && rhs.desc === lhs.multiple_desc;
            //   case 'score_prerequisite':
            //     return rhs.ability_score.index === lhs.ability_score_prerequisite
            //     && rhs.minimum_score === lhs.minimum_score_prerequisite;
            //   case 'size':
            //     return rhs.size === lhs.size;
            //   default:
            //     return false;
            // }
        }
        static transform(x, array_id, array_idx) {
            return {
                item_id: getOrInsertId(data.options, x),
                array_idx: array_idx,
                array_id: array_id
            };
            //   let res = new models.Option();
            //   res.option_type = x.option_type;
            //   switch (x.option_type) {
            //     case 'reference':
            //       res.reference_item = x.item.index;
            //       break;
            //     case 'choice':
            //       res.choice_id = getOrInsertId(data.option_sets,x.choice.from);
            //       break;
            //     case 'string':
            //       res.string = x.string;
            //       break;
            //     case 'ability_bonus':
            //       res.ability_score_bonus = x.ability_score.index;
            //       res.bonus = x.bonus;
            //       break;
            //     case 'action':
            //       res.action_name = x.action_name;
            //       res.action_count = x.count;
            //       res.action_type = x.type;
            //       res.action_desc = x.desc;
            //       break;
            //     case 'breath':
            //       res.breath_name = x.name;
            //       res.breath_dc = x.dc;
            //       res.breath_damage = getOrInsertArrayId(
            //         data.ArrayDamage,
            //         x.damage,
            //         data.Damage.equals,
            //         data.Damage.transform
            //       );
            //       break;
            //     case 'counted_reference':
            //       res.counted_reference_count = x.count;
            //       res.counted_item = x.of.index;
            //       res.prerequisites = getOrInsertArrayId(
            //         data.ArrayPrerequisite,
            //         x.prerequisites,
            //         data.OptionPrerequisite.equals,
            //         data.OptionPrerequisite.transform
            //       );
            //       break;
            //     case 'damage':
            //       res.damage_dice = x.damage_dice;
            //       res.damage_type = x.damage_type.index;
            //       res.damage_notes = x.notes;
            //       break;
            //     case 'ideal':
            //       res.alignments = getOrInsertArrayId(
            //         data.ArrayAPIReference,
            //         x.alignments,
            //         data.APIReference.equals,
            //         data.APIReference.transform
            //       );
            //       res.align_desc = x.desc;
            //       break;
            //     case 'money':
            //       res.money_count = x.count;
            //       res.money_unit = x.unit;
            //       break;
            //     case 'multiple':
            //       res.multiple_items = getOrInsertArrayId(
            //         data.ArrayOption,
            //         x.items,
            //         data.Option.equals,
            //         data.Option.transform
            //       );
            //       res.multiple_desc = x.desc;
            //       break;
            //     case 'score_prerequisite':
            //       res.ability_score_prerequisite = x.ability_score.index;
            //       res.minimum_score_prerequisite = x.minimum_score;  
            //       break;
            //     case 'size':
            //       res.size = x.size;
            //       break;
            //     default:
            //       break;
            //   }
            //   return res;
        }
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
        static equals(lhs, rhs) {
            return lhs.equipment === rhs.equipment?.index
                && lhs.quantity === rhs.quantity;
        }
        static transform(x, array_id, array_idx) {
            return {
                array_id: array_id,
                array_idx: array_idx,
                equipment: x.equipment?.index,
                quantity: x.quantity
            };
        }
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
        static equals(lhs, rhs) {
            return lhs.item === rhs.name;
        }
        static transform(x, array_id, array_idx) {
            return {
                array_id: array_id,
                array_idx: array_idx,
                item: x.name,
            };
        }
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
        static equals(lhs, rhs) {
            return lhs.item === getOrInsertId(data.multiclassing_prereqs, rhs);
        }
        static transform(x, array_id, array_idx) {
            return {
                item: getOrInsertId(data.multiclassing_prereqs, x),
                array_id: array_id,
                array_idx: array_idx
            };
        }
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
        static equals(lhs, rhs) {
            return lhs.item === rhs.item?.index
                && lhs.quantity === rhs.quantity;
        }
        static transform(x, array_id, array_idx) {
            return {
                item: x.item?.index,
                quantity: x.quantity,
                array_id: array_id,
                array_idx: array_idx,
            };
        }
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
        static equals(lhs, rhs) {
            return lhs.item === rhs.name
                && lhs.dc === getOrInsertId(data.difficulty_classes, rhs.dc);
        }
        static transform(x, array_id, array_idx) {
            return {
                array_id: array_id,
                array_idx: array_idx,
                item: x.name,
                dc: getOrInsertId(data.difficulty_classes, x.dc)
            };
        }
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
        rarity = class {
            name = "";
        };
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
        static equals(lhs, rhs) {
            return lhs.ability_score === rhs.ability_score?.index
                && lhs.bonus === rhs.bonus;
        }
        static transform(x, array_id, array_idx) {
            return {
                ability_score: x.ability_score?.index,
                bonus: x.bonus,
                array_id: array_id,
                array_idx: array_idx
            };
        }
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
        static equals(lhs, rhs) {
            return lhs.item === rhs.index;
        }
        static transform(x, array_id, array_idx) {
            return {
                array_id: array_id,
                array_idx: array_idx,
                item: x.index
            };
        }
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
        static equals(lhs, rhs) {
            return lhs.spell === rhs.spell?.index
                && lhs.prerequisite === getOrInsertArrayId(data.ArraySubclassSpellPrerequisite, rhs.prerequisites, data.SubclassSpellPrerequisite.equals, data.SubclassSpellPrerequisite.transform);
        }
        static transform(x, array_id, array_idx) {
            return {
                spell: x.spell?.index,
                prerequisite: getOrInsertArrayId(data.ArraySubclassSpellPrerequisite, x.prerequisites, data.SubclassSpellPrerequisite.equals, data.SubclassSpellPrerequisite.transform),
                array_id: array_id,
                array_idx: array_idx
            };
        }
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
        ability_bonuses = [AbilityBonus];
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
        higherLevelSlot = "";
        castingTrigger = "";
        castingTime = "";
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
        static equals(lhs, rhs) {
            return lhs.damage_type === rhs.damage_type?.index
                && lhs.character_level === JSON.stringify(rhs.damage_at_character_level);
        }
        static transform(x, array_id, array_idx) {
            return {
                damage_type: x.damage_type?.index,
                array_id: array_id,
                array_idx: array_idx,
                character_level: JSON.stringify(x.damage_at_character_level),
            };
        }
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
    data.ArrayPrerequisite = [];
    data.ArrayOption = [];
    data.ArrayDamage = [];
    data.ArrayStartingEquipment = [];
    data.ArrayChoice = [];
    data.ArraySpellcastingInfo = [];
    data.ArrayMultiClassingPrereqs = [];
    data.ArrayContents = [];
    data.ArrayUtilize = [];
    data.ArrayAbilityBonus = [];
    data.ArraySubclassSpell = [];
    data.ArraySubclassSpellPrerequisite = [];
    data.ArrayBreathWeaponDamage = [];
    data.ArrayCreatingSpellSlots = [];
    data.class_specifics = [];
    data.trait_specifics = [];
    data.area_of_effects = [];
    data.breath_weapons = [];
    data.multiclassings = [];
    data.option_sets = [];
    data.multiclassing_prereqs = [];
    data.difficulty_classes = [];
    data.options = [];
})(data || (data = {}));
function getOrInsertId(array, searched) {
    if (searched === undefined)
        return undefined;
    const id = array.findIndex(item => isDeepStrictEqual(searched, item));
    if (id < 0) {
        const result = array.length;
        array.push(searched);
        return result;
    }
    else
        return id;
}
function getOrInsertArrayId(table, actual, equals, transform) {
    if (actual === undefined)
        return undefined;
    if (actual.length === 0)
        return undefined;
    const i = table.findIndex(expected => {
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
    fs.writeFileSync(RUNTIME_OUTPUT_DIR + ctx.output, JSON.stringify(translated), 'utf8');
}
const allFiles = fs
    .readdirSync(RUNTIME_INPUT_DIR, 'utf8')
    .filter((path) => path.startsWith('5e'));
[
    {
        extractor: (extract),
        shape: new data.APIReference(),
        mapper: function (x) {
            return {
                idx: x.index,
                url: x.url,
                name: x.name,
                note: x.note,
            };
        },
        inputs: allFiles,
        output: "APIReference.json"
    },
    {
        extractor: (extract),
        shape: new data.Choice(),
        mapper: function (x) {
            return {
                choose: x.choose,
                desc: x.desc,
                type: x.type,
                id: getOrInsertId(data.option_sets, x.from)
            };
        },
        inputs: allFiles,
        output: "Choice.json"
    },
    {
        extractor: (extract),
        shape: new data.DifficultyClass(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.difficulty_classes, x),
                dc_type: x.dc_type?.index,
                dc_value: x.dc_value,
                success_type: x.success_type
            };
        },
        inputs: allFiles,
        output: "DifficultyClass.json"
    },
    {
        extractor: (extract),
        shape: new data.Damage(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "Damage.json"
    },
    {
        extractor: (extract),
        shape: new data.OptionSet(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.option_sets, x),
                option_set_type: x.option_set_type,
                equipment_category: x.equipment_category?.index,
                resource_list_url: x.resource_list_url,
                options_array: getOrInsertArrayId(data.ArrayOption, x.options, data.Option.equals, data.Option.transform)
            };
        },
        inputs: allFiles,
        output: "OptionSet.json"
    },
    {
        extractor: (extract),
        shape: new data.Option(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.options, x),
                option_type: x.option_type,
                reference_item: x.item?.index,
                choice_id: getOrInsertId(data.option_sets, x.choice?.from),
                string: x.string,
                ability_score_bonus: x.ability_score?.index,
                bonus: x.bonus,
                action_name: x.action_name,
                action_count: x.count,
                action_type: x.type,
                action_desc: x.desc,
                breath_name: x.name,
                breath_dc: getOrInsertId(data.difficulty_classes, x.dc),
                breath_damage: getOrInsertArrayId(data.ArrayDamage, x.damage, data.Damage.equals, data.Damage.transform),
                counted_reference_count: x.count,
                counted_item: x.item?.index,
                prerequisites: getOrInsertArrayId(data.ArrayPrerequisite, x.prerequisites, data.OptionPrerequisite.equals, data.OptionPrerequisite.transform),
                damage_dice: x.damage_dice,
                damage_type: x.damage_type?.index,
                alignments: getOrInsertArrayId(data.ArrayPrerequisite, x.alignments, data.OptionPrerequisite.equals, data.OptionPrerequisite.transform),
                money_count: x.count,
                money_unit: x.unit,
                multiple_items: getOrInsertArrayId(data.ArrayOption, x.items, data.Option.equals, data.Option.transform),
                ability_score_prerequisite: x.ability_score?.index,
                damage_notes: x.notes,
                align_desc: x.desc,
                multiple_desc: x.desc,
                minimum_score_prerequisite: x.minimum_score,
                size: x.size,
            };
        },
        inputs: allFiles,
        output: "Option.json"
    },
    {
        extractor: (extract),
        shape: new data.DamageType(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                description: x.description,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Damage-Types.json"],
        output: "DamageType.json"
    },
    {
        extractor: (extract),
        shape: new data.AbilityScore(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                full_name: x.full_name,
                description: x.description,
                skills: getOrInsertArrayId(data.ArrayAPIReference, x.skills, data.APIReference.equals, data.APIReference.transform),
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Ability-Scores.json"],
        output: "AbilityScore.json"
    },
    {
        extractor: (extract),
        shape: new data.StartingEquipment(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Classes.json"],
        output: "StartingEquipment.json"
    },
    {
        extractor: (extract),
        shape: new data.Cost(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Backgrounds.json", "5e-SRD-Equipments.json"],
        output: "Cost.json"
    },
    {
        extractor: (extract),
        shape: new data.BackgroundFeature(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Backgrounds.json"],
        output: "BackgroundFeature.json"
    },
    {
        extractor: (extract),
        shape: new data.Background(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                starting_proficiencies: getOrInsertArrayId(data.ArrayAPIReference, x.starting_proficiencies, data.APIReference.equals, data.APIReference.transform),
                language_options: getOrInsertId(data.option_sets, x.language_options?.from),
                starting_equipment: getOrInsertArrayId(data.ArrayStartingEquipment, x.starting_equipment, data.StartingEquipment.equals, data.StartingEquipment.transform),
                starting_gold_quantity: x.starting_gold?.quantity,
                starting_gold_unit: x.starting_gold?.unit,
                starting_equipment_options: getOrInsertArrayId(data.ArrayChoice, x.starting_equipment_options, data.Choice.equals, data.Choice.transform),
                feature_name: x.feature?.name,
                feature_desc: x.feature?.desc,
                personality_traits: getOrInsertId(data.option_sets, x.personality_traits?.from),
                ideals: getOrInsertId(data.option_sets, x.ideals?.from),
                bonds: getOrInsertId(data.option_sets, x.bonds?.from),
                flaws: getOrInsertId(data.option_sets, x.flaws?.from),
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Backgrounds.json"],
        output: "Background.json"
    },
    {
        extractor: (extract),
        shape: new data.SpellcastingInfo(),
        mapper: function (x) {
            return {
                name: x.name,
                desc: x.desc?.join("$$$"),
            };
        },
        inputs: ["5e-SRD-Classes.json"],
        output: "SpellcastingInfo.json"
    },
    {
        extractor: (extract),
        shape: new data.SpellCasting(),
        mapper: function (x) {
            return {
                level: x.level,
                spellcasting_ability: x.spellcasting_ability?.index,
                info: getOrInsertArrayId(data.ArraySpellcastingInfo, x.info, data.SpellcastingInfo.equals, data.SpellcastingInfo.transform)
            };
        },
        inputs: ["5e-SRD-Classes.json"],
        output: "Spellcasting.json"
    },
    {
        extractor: (extract),
        shape: new data.MultiClassingPrereq(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.multiclassing_prereqs, x),
                ability_score: x.ability_score?.index,
                minimum_score: x.minimum_score,
            };
        },
        inputs: ["5e-SRD-Classes.json"],
        output: "MultiClassingPrereq.json"
    },
    {
        extractor: (extract),
        shape: new data.MultiClassing(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.multiclassings, x),
                prerequisites: getOrInsertArrayId(data.ArrayMultiClassingPrereqs, x.prerequisites, data.MultiClassingPrereq.equals, data.MultiClassingPrereq.transform),
                prerequisite_options: getOrInsertId(data.option_sets, x.prerequisite_options),
                proficiencies: getOrInsertArrayId(data.ArrayAPIReference, x.proficiencies, data.APIReference.equals, data.APIReference.transform),
                proficiency_choices: getOrInsertArrayId(data.ArrayChoice, x.proficiency_choices, data.Choice.equals, data.Choice.transform),
            };
        },
        inputs: ["5e-SRD-Classes.json"],
        output: "MultiClassing.json"
    },
    {
        extractor: (extract),
        shape: new data.Class(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                hit_die: x.hit_die,
                class_levels: x.class_levels,
                multi_classing: getOrInsertId(data.multiclassings, x.multi_classing),
                proficiencies: getOrInsertArrayId(data.ArrayAPIReference, x.proficiencies, data.APIReference.equals, data.APIReference.transform),
                proficiency_choices: getOrInsertArrayId(data.ArrayChoice, x.proficiency_choices, data.Choice.equals, data.Choice.transform),
                saving_throws: getOrInsertArrayId(data.ArrayAPIReference, x.saving_throws, data.APIReference.equals, data.APIReference.transform),
                starting_equipment: getOrInsertArrayId(data.ArrayStartingEquipment, x.starting_equipment, data.StartingEquipment.equals, data.StartingEquipment.transform),
                starting_equipment_options: getOrInsertArrayId(data.ArrayChoice, x.starting_equipment_options, data.Choice.equals, data.Choice.transform),
                subclasses: getOrInsertArrayId(data.ArrayAPIReference, x.subclasses, data.APIReference.equals, data.APIReference.transform),
                spellcasting: x.spellcasting?.spellcasting_ability?.index,
                spells: x.spells,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Classes.json"],
        output: "Class.json"
    },
    {
        extractor: (extract),
        shape: new data.Condition(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                description: x.description,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Conditions.json"],
        output: "Condition.json"
    },
    {
        extractor: (extract),
        shape: new data.EquipmentCategory(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                url: x.url,
                equipment: getOrInsertArrayId(data.ArrayAPIReference, x.equipment, data.APIReference.equals, data.APIReference.transform)
            };
        },
        inputs: ["5e-SRD-Equipment-Categories.json"],
        output: "EquipmentCategory.json"
    },
    {
        extractor: (extract),
        shape: new data.ArmorClass(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "ArmorClass.json"
    },
    {
        extractor: (extract),
        shape: new data._Range(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "Range.json"
    },
    {
        extractor: (extract),
        shape: new data.ThrowRange(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Equipments.json"],
        output: "ThrowRange.json"
    },
    {
        extractor: (extract),
        shape: new data.Content(),
        mapper: function (x) {
            return {
                item: x.item?.index,
                quantity: x.quantity
            };
        },
        inputs: ["5e-SRD-Equipments.json"],
        output: "Content.json"
    },
    {
        extractor: (extract),
        shape: new data.Utilize(),
        mapper: function (x) {
            return {
                name: x.name,
                dc: getOrInsertId(data.difficulty_classes, x.dc)
            };
        },
        inputs: ["5e-SRD-Equipments.json"],
        output: "Utilize.json"
    },
    {
        extractor: (extract),
        shape: new data.Equipment(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                equipment_categories: getOrInsertArrayId(data.ArrayAPIReference, x.equipment_categories, data.APIReference.equals, data.APIReference.transform),
                cost_quantity: x.cost?.quantity,
                cost_unit: x.cost?.unit,
                url: x.url,
                description: x.description,
                weight: x.weight,
                ammunition: x.ammunition?.index,
                armor_class_base: x.armor_class?.base,
                armor_class_dex_bonus: x.armor_class?.dex_bonus,
                armor_class_max_bonus: x.armor_class?.max_bonus,
                contents: getOrInsertArrayId(data.ArrayContents, x.contents, data.Content.equals, data.Content.transform),
                ability: x.ability?.index,
                craft: getOrInsertArrayId(data.ArrayAPIReference, x.craft, data.APIReference.equals, data.APIReference.transform),
                damage_type: x.damage?.damage_type?.index,
                damage_dice: x.damage?.damage_dice,
                damage_dc: getOrInsertId(data.difficulty_classes, x.damage?.dc),
                doff_time: x.doff_time,
                don_time: x.don_time,
                image: x.image,
                mastery: x.mastery?.index,
                notes: x.notes?.join("$$$"),
                properties: getOrInsertArrayId(data.ArrayAPIReference, x.properties, data.APIReference.equals, data.APIReference.transform),
                quantity: x.quantity,
                storage: x.storage?.index,
                range_normal: x.range?.normal,
                range_long: x.range?.long,
                stealth_disadvantage: x.stealth_disadvantage,
                str_minimum: x.str_minimum,
                throw_range_normal: x.throw_range?.normal,
                throw_range_long: x.throw_range?.long,
                two_handed_damage_type: x.two_handed_damage?.damage_type?.index,
                two_handed_damage_dice: x.two_handed_damage?.damage_dice,
                two_handed_damage_dc: getOrInsertId(data.difficulty_classes, x.two_handed_damage?.damage_dc),
                utilize: getOrInsertArrayId(data.ArrayUtilize, x.utilize, data.Utilize.equals, data.Utilize.transform),
            };
        },
        inputs: ["5e-SRD-Equipments.json"],
        output: "Equipment.json"
    },
    {
        extractor: (extract),
        shape: new data.FeatPrerequisites(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Feats.json"],
        output: "FeatPrereq.json"
    },
    {
        extractor: (extract),
        shape: new data.Feat(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                description: x.description,
                type: x.type,
                repeatable: x.repeatable,
                prerequisite_minimum_level: x.prerequisites?.minimum_level,
                prerequisite_feature_named: x.prerequisites?.feature_named,
                prerequisite_options: getOrInsertId(data.option_sets, x.prerequisite_options?.from),
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Feats.json"],
        output: "Feat.json"
    },
    {
        extractor: (extract),
        shape: new data.Language(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                is_rare: x.is_rare,
                note: x.note,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Languages.json"],
        output: "Language.json"
    },
    {
        extractor: (extract),
        shape: new data.MagicItem(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                url: x.url,
                image: x.image,
                equipment_category: x.equipment_category?.index,
                variant: x.variant,
                variants: getOrInsertArrayId(data.ArrayAPIReference, x.variants, data.APIReference.equals, data.APIReference.transform),
                attunement: x.attunement,
                rarity: x.rarity?.name,
                desc: x.desc,
                limited_to: x["limited-to"],
            };
        },
        inputs: ["5e-SRD-Magic-Items.json"],
        output: "MagicItem.json"
    },
    {
        extractor: (extract),
        shape: new data.MagicSchool(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                description: x.description,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Magic-Schools.json"],
        output: "MagicSchool.json"
    },
    {
        extractor: (extract),
        shape: new data.Proficiency(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                type: x.type,
                backgrounds: getOrInsertArrayId(data.ArrayAPIReference, x.backgrounds, data.APIReference.equals, data.APIReference.transform),
                classes: getOrInsertArrayId(data.ArrayAPIReference, x.classes, data.APIReference.equals, data.APIReference.transform),
                reference: x.reference?.index,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Proficiencies.json"],
        output: "Proficiency.json"
    },
    {
        extractor: (extract),
        shape: new data.Skill(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                description: x.description,
                ability_score: x.ability_score?.index,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Skills.json"],
        output: "Skill.json"
    },
    {
        extractor: (extract),
        shape: new data.AbilityBonus(),
        mapper: (x) => x,
        inputs: allFiles,
        output: "AbilityBonus.json"
    },
    {
        extractor: (extract),
        shape: new data.Species(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                speed: x.speed,
                ability_bonuses: getOrInsertArrayId(data.ArrayAbilityBonus, x.ability_bonuses, data.AbilityBonus.equals, data.AbilityBonus.transform),
                ability_bonus_options: getOrInsertId(data.option_sets, x.ability_bonus_options?.from),
                alignment: x.alignment,
                age: x.age,
                starting_proficiencies: getOrInsertArrayId(data.ArrayAPIReference, x.starting_proficiencies, data.APIReference.equals, data.APIReference.transform),
                starting_proficiency_options: getOrInsertId(data.option_sets, x.starting_proficiency_options?.from),
                languages: getOrInsertArrayId(data.ArrayAPIReference, x.languages, data.APIReference.equals, data.APIReference.transform),
                language_desc: x.language_desc,
                language_options: getOrInsertId(data.option_sets, x.language_options?.from),
                url: x.url,
                size: x.size,
                size_description: x.size_description,
                traits: getOrInsertArrayId(data.ArrayAPIReference, x.traits, data.APIReference.equals, data.APIReference.transform),
                subspecies: getOrInsertArrayId(data.ArrayAPIReference, x.subraces, data.APIReference.equals, data.APIReference.transform),
            };
        },
        inputs: ["5e-SRD-Species.json"],
        output: "Species.json"
    },
    {
        extractor: (extract),
        shape: new data.SubclassSpellPrerequisite(),
        mapper: function (x) {
            return {
                idx: x.index,
                type: x.type,
                name: x.name,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Subclasses.json"],
        output: "SubclassSpellPrereq.json"
    },
    {
        extractor: (extract),
        shape: new data.SubclassSpell(),
        mapper: (x) => {
            return {
                prerequisites: getOrInsertArrayId(data.ArraySubclassSpellPrerequisite, x.prerequisites, data.SubclassSpellPrerequisite.equals, data.SubclassSpellPrerequisite.transform),
                spell: x.spell?.index,
            };
        },
        inputs: ["5e-SRD-Subclasses.json"],
        output: "SubclassSpell.json"
    },
    {
        extractor: (extract),
        shape: new data.Subclass(),
        mapper: function (x) {
            return {
                idx: x.index,
                url: x.url,
                name: x.name,
                class: x.class?.index,
                subclass_flavor: x.subclass_flavor,
                desc: x.desc?.join("$$$"),
                subclass_levels: x.subclass_levels,
                spells: getOrInsertArrayId(data.ArraySubclassSpell, x.spells, data.SubclassSpell.equals, data.SubclassSpell.transform),
            };
        },
        inputs: ["5e-SRD-Subclasses.json"],
        output: "Subclass.json"
    },
    {
        extractor: (extract),
        shape: new data.Subrace(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                url: x.url,
                species: x.race?.index,
                desc: x.desc,
                ability_bonuses: getOrInsertArrayId(data.ArrayAbilityBonus, x.ability_bonuses, data.AbilityBonus.equals, data.AbilityBonus.transform),
                racial_traits: getOrInsertArrayId(data.ArrayAPIReference, x.racial_traits, data.APIReference.equals, data.APIReference.transform),
            };
        },
        inputs: ["5e-SRD-Subspecies.json"],
        output: "Subspecies.json"
    },
    {
        extractor: (extract),
        shape: new data.Spell(),
        mapper: function (x) {
            return {
                name: x.name,
                level: x.level,
                school: x.school,
                classes: x.classes?.join("$$$"),
                actionType: x.actionType,
                concentration: x.concentration,
                ritual: x.ritual,
                range: x.range,
                components: x.components?.join("$$$"),
                material: x.material,
                duration: x.duration,
                description: x.description,
                cantripUpgrade: x.cantripUpgrade,
                higherLevelSlot: x.higherLevelSlot,
                castingTrigger: x.castingTrigger,
                castingTime: x.castingTime,
            };
        },
        inputs: ["5e-SRD-Spells.json"],
        output: "Spell.json"
    },
    {
        extractor: (extract),
        shape: new data.AreaOfEffect(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.area_of_effects, x),
                size: x.size,
                type: x.type,
            };
        },
        inputs: allFiles,
        output: "AreaOfEffect.json"
    },
    {
        extractor: (extract),
        shape: new data.BreathWeaponUsage(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Traits.json"],
        output: "BreathWeaponUsage.json"
    },
    {
        extractor: (extract),
        shape: new data.BreathWeaponDamage(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Traits.json"],
        output: "BreathWeaponDamage.json"
    },
    {
        extractor: (extract),
        shape: new data.BreathWeapon(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.breath_weapons, x),
                name: x.name,
                desc: x.desc,
                area_of_effect: getOrInsertId(data.area_of_effects, x.area_of_effect),
                usage_type: x.usage?.type,
                usage_times: x.usage?.times,
                dc: getOrInsertId(data.difficulty_classes, x.dc),
                damage: getOrInsertArrayId(data.ArrayBreathWeaponDamage, x.damage, data.BreathWeaponDamage.equals, data.BreathWeaponDamage.transform),
            };
        },
        inputs: ["5e-SRD-Traits.json"],
        output: "BreathWeapon.json"
    },
    {
        extractor: (extract),
        shape: new data.TraitSpecific(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.trait_specifics, x),
                damage_type: x.damage_type?.index,
                breath_weapon: getOrInsertId(data.breath_weapons, x.breath_weapon),
                spell_options: getOrInsertId(data.option_sets, x.spell_options?.from),
                subtrait_options: getOrInsertId(data.option_sets, x.subtrait_options?.from),
            };
        },
        inputs: ["5e-SRD-Traits.json"],
        output: "TraitSpecific.json"
    },
    {
        extractor: (extract),
        shape: new data.Trait(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                url: x.url,
                desc: x.desc,
                species: getOrInsertArrayId(data.ArrayAPIReference, x.races, data.APIReference.equals, data.APIReference.transform),
                subspecies: getOrInsertArrayId(data.ArrayAPIReference, x.subraces, data.APIReference.equals, data.APIReference.transform),
                proficiencies: getOrInsertArrayId(data.ArrayAPIReference, x.proficiencies, data.APIReference.equals, data.APIReference.transform),
                proficiency_choices: getOrInsertId(data.option_sets, x.proficiency_choices?.from),
                language_options: getOrInsertId(data.option_sets, x.language_options?.from),
                parent: x.parent?.index,
                trait_specific: getOrInsertId(data.trait_specifics, x.trait_specific),
            };
        },
        inputs: ["5e-SRD-Traits.json"],
        output: "Trait.json"
    },
    {
        extractor: (extract),
        shape: new data.WeaponProperty(),
        mapper: function (x) {
            return {
                idx: x.index,
                name: x.name,
                description: x.description,
                url: x.url,
            };
        },
        inputs: ["5e-SRD-Weapon-Properties.json"],
        output: "WeaponProperty.json"
    },
    {
        extractor: (extract),
        shape: new data.ClassSpecific(),
        mapper: function (x) {
            return {
                id: getOrInsertId(data.class_specifics, x),
                action_surges: x.action_surges,
                arcane_recovery_levels: x.arcane_recovery_levels,
                aura_range: x.aura_range,
                bardic_inspiration_die: x.bardic_inspiration_die,
                brutal_critical_dice: x.brutal_critical_dice,
                channel_divinity_charges: x.channel_divinity_charges,
                creating_spell_slots: getOrInsertArrayId(data.ArrayCreatingSpellSlots, x.creating_spell_slots, (lhs, rhs) => {
                    return lhs.sorcery_point_cost === rhs.sorcery_point_cost
                        && lhs.spell_slot_level === rhs.spell_slot_level;
                }, function (x, array_id, array_idx) {
                    return {
                        array_idx: array_idx,
                        array_id: array_id,
                        sorcery_point_cost: x.sorcery_point_cost,
                        spell_slot_level: x.spell_slot_level,
                    };
                }),
                destroy_undead_cr: x.destroy_undead_cr,
                extra_attacks: x.extra_attacks,
                favored_enemies: x.favored_enemies,
                favored_terrain: x.favored_terrain,
                indomitable_uses: x.indomitable_uses,
                invocations_known: x.invocations_known,
                ki_points: x.ki_points,
                magical_secrets_max_5: x.magical_secrets_max_5,
                magical_secrets_max_7: x.magical_secrets_max_7,
                magical_secrets_max_9: x.magical_secrets_max_9,
                // i due qua sotto sono attributi "flattenati"
                martial_arts_dice_count: x.martial_arts?.dice_count,
                martial_arts_dice_value: x.martial_arts?.dice_value,
                metamagic_known: x.metamagic_known,
                mystic_arcanum_level_6: x.mystic_arcanum_level_6,
                mystic_arcanum_level_7: x.mystic_arcanum_level_7,
                mystic_arcanum_level_8: x.mystic_arcanum_level_8,
                mystic_arcanum_level_9: x.mystic_arcanum_level_9,
                rage_count: x.rage_count,
                rage_damage_bonus: x.rage_damage_bonus,
                // i due qua sotto sono attributi "flattenati"
                sneak_attack_dice_count: x.sneak_attack?.dice_count,
                sneak_attack_dice_value: x.sneak_attack?.dice_value,
                song_of_rest_die: x.song_of_rest_die,
                sorcery_points: x.sorcery_points,
                unarmored_movement: x.unarmored_movement,
                wild_shape_fly: x.wild_shape_fly,
                wild_shape_max_cr: x.wild_shape_max_cr,
                wild_shape_swim: x.wild_shape_swim,
            };
        },
        inputs: ["5e-SRD-Levels.json"],
        output: "ClassSpecific.json"
    },
    {
        extractor: (extract),
        shape: new data.LevelSpellcasting(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Levels.json"],
        output: "LevelSpellcasting.json"
    },
    {
        extractor: (extract),
        shape: new data.SubclassSpecific(),
        mapper: (x) => x,
        inputs: ["5e-SRD-Levels.json"],
        output: "SubclassSpecific.json"
    },
    {
        extractor: (extract),
        shape: new data.Level(),
        mapper: function (x) {
            return {
                idx: x.index,
                level: x.level,
                ability_score_bonuses: x.ability_score_bonuses,
                prof_bonus: x.prof_bonus,
                features: getOrInsertArrayId(data.ArrayAPIReference, x.features, data.APIReference.equals, data.APIReference.transform),
                character_class: x.class?.index,
                class_specific: getOrInsertId(data.class_specifics, x.class_specific),
                subclass: x.subclass?.index,
                url: x.url,
                cantrips_known: x.spellcasting?.cantrips_known,
                spell_slots_level_1: x.spellcasting?.spell_slots_level_1,
                spell_slots_level_2: x.spellcasting?.spell_slots_level_2,
                spell_slots_level_3: x.spellcasting?.spell_slots_level_3,
                spell_slots_level_4: x.spellcasting?.spell_slots_level_4,
                spell_slots_level_5: x.spellcasting?.spell_slots_level_5,
                spell_slots_level_6: x.spellcasting?.spell_slots_level_6,
                spell_slots_level_7: x.spellcasting?.spell_slots_level_7,
                spell_slots_level_8: x.spellcasting?.spell_slots_level_8,
                spell_slots_level_9: x.spellcasting?.spell_slots_level_9,
                spells_known: x.spellcasting?.spells_known,
                additional_magical_secrets_max_lvl: x.subclass_specific?.additional_magical_secrets_max_lvl,
                aura_range: x.subclass_specific?.aura_range,
            };
        },
        inputs: ["5e-SRD-Levels.json"],
        output: "Level.json"
    },
].forEach(translate);
function printArray(array, output) {
    fs.writeFileSync(RUNTIME_OUTPUT_DIR + output, JSON.stringify(array.flatMap(x => x)), 'utf8');
}
printArray(data.ArrayAPIReference, 'ArrayAPIReferenceItem.json');
printArray(data.ArrayPrerequisite, 'ArrayPrerequisiteItem.json');
printArray(data.ArrayOption, 'ArrayOptionItem.json');
printArray(data.ArrayDamage, 'ArrayDamageItem.json');
printArray(data.ArrayStartingEquipment, 'ArrayStartingEquipmentItem.json');
printArray(data.ArrayChoice, 'ArrayChoiceItem.json');
printArray(data.ArraySpellcastingInfo, 'ArraySpellcastingInfoItem.json');
printArray(data.ArrayMultiClassingPrereqs, 'ArrayMultiClassingPrereqItem.json');
printArray(data.ArrayContents, 'ArrayContentItem.json');
printArray(data.ArrayUtilize, 'ArrayUtilizeItem.json');
printArray(data.ArrayAbilityBonus, 'ArrayAbilityBonusItem.json');
printArray(data.ArraySubclassSpell, 'ArraySubclassSpellItem.json');
printArray(data.ArraySubclassSpellPrerequisite, 'ArraySubclassSpellPrerequisiteItem.json');
printArray(data.ArrayBreathWeaponDamage, 'ArrayBreathWeaponDamageItem.json');
printArray(data.ArrayCreatingSpellSlots, 'ArrayCreatingSpellSlotItem.json');
