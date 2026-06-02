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
            return obj.every(o => Shapes.match(o, new shape[0]()));
        }
        //else if(Array.isArray(shape) || Array.isArray(obj)) return false;
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
function extract(shape, outputPath, mapper) {
    const json = fs
        .readdirSync('.', 'utf8')
        .filter((path) => path.startsWith('5e'))
        .map(path => {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        return Shapes.decompose(data, shape);
    })
        .filter(array => array.length !== 0)
        .flatMap(x => x);
    let s = JSON.stringify(json);
    fs.writeFileSync(outputPath, mapper ? mapper(s) : s);
}
class APIReference {
    index = "";
    name = "";
    url = "";
    note = "";
}
class Choice {
    desc = "";
    choose = 0;
    type = "";
    from = OptionSet;
}
class DifficultyClass {
    dc_type = APIReference;
    dc_value = 0;
    success_type = "";
}
class Damage {
    damage_type = APIReference;
    damage_dice = "";
    dc = DifficultyClass;
}
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
// class AreaOfEffect {
//   size: number = 0;
//   type: string = "";
// }
class DamageTypes {
    index = "";
    name = "";
    description = "";
    url = "";
}
__decorate([
    required(),
    __metadata("design:type", String)
], DamageTypes.prototype, "index", void 0);
__decorate([
    required(),
    __metadata("design:type", String)
], DamageTypes.prototype, "name", void 0);
__decorate([
    required(),
    __metadata("design:type", String)
], DamageTypes.prototype, "description", void 0);
__decorate([
    required(),
    __metadata("design:type", String)
], DamageTypes.prototype, "url", void 0);
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
//non faccio alignment, c'è già tutto nel file dedicato
class StartingEquipment {
    equipment = APIReference;
    quantity = 0;
}
// cost e backgroundFeature non esistono nel db, 
// mi servono ai fini del riconoscimento di background
class Cost {
    quantity = 0;
    unit = "";
}
class BackgroundFeature {
    name = "";
    desc = [
        String
    ];
}
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
extract(new APIReference(), "api_references.json", (s) => s.split("index").join("idx"));
extract(new Option(), "options.json");
extract(new Choice(), "choices.json");
extract(new Damage(), "damage.json");
extract(new DifficultyClass(), "difficulty_class.json");
//extract<AreaOfEffect>(new AreaOfEffect(), "area_of_effect.json");
extract(new OptionSet(), 'option_set.json');
extract(new DamageTypes, 'damage_types.json');
extract(new AbilityScore, 'ability_score.json');
// salto alignment
extract(new StartingEquipment(), 'starting_equipment.json');
extract(new Background(), 'background.json');
