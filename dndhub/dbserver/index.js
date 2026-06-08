import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { Database } from './database.js';
import { DatabasePaths } from './database.paths.js';
import { authRouter } from './routes/auth.routes.js';
import { userUtilitiesRouter } from './routes/user.utilities.routes.js';
import { characterManagementRouter } from './routes/character.management.routes.js';
import { campagnaRouter } from './routes/campagna.routes.js';


const app = express();
const PORT = 10000;


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
// probabilmente ci andrà un middleware di autenticazione
app.use("/api/user-utilities", userUtilitiesRouter);
app.use("/api/character-management", characterManagementRouter)

// per impostare la formattazione a 2 spazi di indentazione
app.set('json spaces', 2);



function loadTable(name) {
  const text = fs.readFileSync(
    DatabasePaths.DATA_DIR + name + ".json", 
    'utf8'
  );

  const ObjToString = (x) => {
    return "'" + x.toString().split(/['"]/).join("") + "'";
  };

  const query = JSON
  .parse(text)
  .map(obj => {""
    const keys = Object.keys(obj).join(", ");
    const values = Object.values(obj).map(ObjToString).join(", ");
    return `INSERT OR IGNORE INTO ${name} (${keys}) VALUES (${values})`;
  })
  .join("; ");

// per impostare la formattazione a 2 spazi di indentazione
app.set('json spaces', 2);
app.use('/api/campagna', campagnaRouter);


function loadTable(name) {
  const text = fs.readFileSync(
    DatabasePaths.DATA_DIR + name + ".json", 
    'utf8'
  );

  const ObjToString = (x) => {
    return "'" + x.toString().split(/['"]/).join("") + "'";
  };

  const query = JSON
  .parse(text)
  .map(obj => {""
    const keys = Object.keys(obj).join(", ");
    const values = Object.values(obj).map(ObjToString).join(", ");
    return `INSERT OR IGNORE INTO ${name} (${keys}) VALUES (${values})`;
  })
  .join("; ");

  const db = Database.INSTANCE;

  db.exec(query, err => { if(err) console.log(err); else console.log("lodaded '", name, "' table"); });
}


const tables = [
  "AbilityScore",
  "APIReference",
  "AreaOfEffect",
  "ArrayAbilityBonusItem",
  "ArrayApiReferenceItem",
  "ArrayBreathWeaponDamageItem",
  "ArrayChoiceItem",
  "ArrayContentItem",
  "ArrayCreatingSpellSlotItem",
  "ArrayDamageItem",
  "ArrayMultiClassingPrereqItem",
  "ArrayOptionItem",
  "ArrayPrerequisiteItem",
  "ArraySpellcastingInfoItem",
  "ArrayStartingEquipmentItem",
  "ArraySubclassSpellItem",
  "ArraySubclassSpellPrerequisiteItem",
  "ArrayUtilizeItem",
  "Background",
  "BreathWeapon",
  "Choice",
  "Class",
  "ClassSpecific",
  "Condition",
  "DamageType",
  "DifficultyClass",
  "Equipment",
  "EquipmentCategory",
  "Feat",
  "Language",
  "Level",
  "MagicItem",
  "MagicSchool",
  "MultiClassing",
  "MultiClassingPrereq",
  "Option",
  "OptionSet",
  "Proficiency",
  "Skill",
  "Species",
  "Spell",
  "Spellcasting",
  "SpellcastingInfo",
  "Subclass",
  "SubclassSpellPrereq",
  "Subspecies",
  "Trait",
  "TraitSpecific",
  "WeaponProperty",
];

Database.load(DatabasePaths.SCHEMAS);
tables.forEach(table => loadTable(table));



app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
