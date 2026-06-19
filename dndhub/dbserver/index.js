import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { Database } from './database.js';
import { DatabasePaths } from './database.paths.js';
import { authRouter } from './routes/auth.routes.js';
import { userUtilitiesRouter } from './routes/user.utilities.routes.js';
import { characterManagementRouter } from './routes/character.management.routes.js';
import { campagnaRouter } from './routes/campagna.routes.js';
import { reportsRouter } from './routes/reports.routes.js';


const app = express();
const PORT = 10000;


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user-utilities", userUtilitiesRouter);
app.use("/api/character-management", characterManagementRouter)
app.use('/api/campaign', campagnaRouter);
app.use('/api/reports', reportsRouter);

// per impostare la formattazione a 2 spazi di indentazione
app.set('json spaces', 2);


async function loadTable(name, base_dir) {
  const text = fs.readFileSync(
    base_dir + name + ".json", 
    'utf8'
  );

  const ObjToString = (x) => {
    return "'" + x.toString().split(/['"]/).join("") + "'";
  };


  const queries = JSON
  .parse(text)
  .map(obj => {""
    const keys = Object.keys(obj).join(", ");
    const values = Object.values(obj).map(ObjToString).join(", ");
    return `INSERT OR IGNORE INTO ${name} (${keys}) VALUES (${values})`;
  });

  for(const query of queries) {
    await Database.execOne(query);
  }

  console.log("Lodaded ", name, " table");
}


const tables = [
  "APIReference",
  "ArrayAPIReferenceItem",
  "DifficultyClass",
  "AreaOfEffect",
  "ArrayDamageItem",
  "ArrayPrerequisiteItem",
  "Option",
  "ArrayOptionItem",
  "OptionSet",
  "Choice",
  "DamageType",
  "AbilityScore",
  "ArrayChoiceItem",
  "ArrayStartingEquipmentItem",
  "Background",
  "Condition",
  "EquipmentCategory",
  "Language",
  "MagicSchool",
  "Proficiency",
  "Skill",
  "SpellcastingInfo",
  "ArraySpellcastingInfoItem",
  "Spellcasting",
  "MultiClassingPrereq",
  "ArrayMultiClassingPrereqItem",
  "MultiClassing",
  "Class",
  "ArrayContentItem",
  "ArrayUtilizeItem",
  "Equipment",
  "Feat",
  "MagicItem",
  "ArrayAbilityBonusItem",
  "Species",
  "SubclassSpellPrereq",
  "ArraySubclassSpellPrerequisiteItem",
  "ArraySubclassSpellItem",
  "Subclass",
  "Subspecies",
  "ArrayBreathWeaponDamageItem",
  "BreathWeapon",
  "TraitSpecific",
  "Trait",
  "WeaponProperty",
  "Spell",
  "ArrayCreatingSpellSlotItem",
  "ClassSpecific",
  "Level",
];

const new_tables = [
  "Account",
  "Amministratore",
  "UtenteGenerico",
  "Personaggio",
  "Campagna",
  "ArrayCampagnaPersonaggiItem",
  "Segnalazione",
  "ArrayPostItem",
];

await Database.load(DatabasePaths.SCHEMAS);

// for(const table of tables) {
//   await loadTable(table, DatabasePaths.DATA_DIR);
// }

// for(const table of new_tables) {
//   await loadTable(table, DatabasePaths.MOCK_DATA_DIR);
// }

await Database.execOne(
  'PRAGMA foreign_keys = ON;', 
  (pragmaErr) => {
    if (pragmaErr) {
      console.error("Errore attivazione chiavi esterne:", pragmaErr.message);
    } else {
      console.log("Chiavi esterne (CASCADE) attivate con successo!");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
