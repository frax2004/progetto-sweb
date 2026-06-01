-- tabelle di common.ts

create table if not exists APIReference (
  idx text not null primary key,
  name text not null,
  url text not null,
  note text
);

create table if not exists DifficultyClass (
  -- forse id può essere auto increment
  id number primary key,
  dc_type text not null,
  dc_value number,
  success_type check(success_type='none' or  success_type='half' or  success_type='other'),

  foreign key (dc_type) references APIReference(idx)
);

create table if not exists AreaOfEffect (
  size number not null primary key,
  type check(
  type='sphere'
  or type='cube'
  or type='cylinder'
  or type='line'
  or type='cone') not null
);

create table if not exists Choice (
  desc text,
  choose number not null,
  type text,
  opt_id number not null primary key,

  foreign key (opt_id) references OptionSet(opt_id)
);

create table if not exists String (
  string text not null primary key
);

create table if not exists ArrayDamage (
  array_id number not null,
  damage_type text not null,
  damage_dice text not null,
  dc number,
  idx number not null,

  foreign key (dc) references DifficultyClass(id)
  foreign key (damage_type) references APIReference(idx),
  primary key(array_id,idx)
);

-- OptionArray mi serve per multiple
create table if not exists ArrayOption (
  item_id number not null,
  idx number not null,
  array_id number not null,

  primary key (array_id, idx),
  foreign key (item_id) references Option(id)
);

create table if not exists Option (
  id number not null primary key, 
  -- pseudo-tabella reference
  reference_item text,
  -- pseudo-tabella choice
  choice_id number,
  -- pseudo-tabella string
  string text,
  -- pseudo-tabella ability bonus 
  ability_score_bonus text,
  bonus number,
  -- pseudo-tabella action
  action_name text,
  action_count number,
  action_type text,
  action_desc text,
  -- pseudo-tabella breath
  breath_name text,
  breath_dc number,
  breath_damage_type text,
  breath_damage_dice text,
  breath_damage_dc number, -- questo attributo potrebbe essere inutile, l'ho messo per si e per no
  -- pseudo-tabella countedReference
  counted_reference_count number,
  of text,
  prerequisites number,
  -- pseudo-tabella damage
  damage_dice text,
  damage_type text, -- foreign key
  damage_notes text,
  -- pseudo-tabella ideal
  -- teoricamente inutile perché non stiamo facendo alignment ma la copio perché piccola
  alignments number, -- foreign key
  align_desc text,
  -- pseudo-tabella money
  money_count number,
  money_unit text,
  -- pseudo-tabella multiple
  multiple_items number, -- foreign key
  multiple_desc text,
  -- pseudo-tabella score_prerequisite
  ability_score_prerequisite text, -- foreign key 
  minimum_score_prerequisite number,
  -- pseuso-tabella size
  size text,

  foreign key (reference_item) references APIReference(idx),
  foreign key (choice_id) references Choice(opt_id),
  foreign key (ability_score_bonus) references APIReference(idx),
  foreign key (breath_dc) references DifficultyClass(id), 
  foreign key (breath_damage_type) references APIReference(idx),
  foreign key (breath_damage_dc) references DifficultyClass(id),
  foreign key (of) references APIReference(idx),
  foreign key (prerequisites) references ArrayPrerequisites(array_id),
  foreign key (damage_type) references APIReference(idx),
  foreign key (alignments) references ArrayAPIReference(array_id),
  foreign key (multiple_items) references ArrayOption(array_id),
  foreign key (ability_score_prerequisite) references APIReference(idx)
);

create table if not exists ArrayOfOptionsAndString (
  opt_id number not null,
  string text not null,
  idx number not null,
  array_id number not null,

  primary key (array_id,idx),
  foreign key (opt_id) references Option(id)
);

create table if not exists OptionSet (
  id number not null primary key,
  -- pseudo-tabella equipment_category
  equipment_category text, -- foreign key
  -- pseudo-tabella resource_list
  resource_list_url text,
  -- pseudo_tabella options_array
  options_array number, -- foreign key

  foreign key (equipment_category) references APIReference(idx),
  foreign key (options_array) references ArrayOfOptionsAndString(array,id)
);

-- tabelle di DamageTypes.ts

create table if not exists DamageTypes (
  idx text not null primary key,
  name text not null,
  description text not null,
  url text not null
);

-- tabelle di AbilityScores.ts

create table if not exists AbilityScore (
  idx text not null primary key,
  name text not null,
  full_name text not null,
  description text not null,
  skills text not null,
  url text not null,

  foreign key (skills) references APIReference(idx)
);

-- tabelle di Alignments
-- in teoria inutili ma copiata comunque perché piccola

create table if not exists Alignment (
  idx text not null primary key,
  name text not null,
  abbreviation text not null,
  description text not null,
  url text not null
);

-- tabelle di Backgrounds.ts

create table if not exists BackgroundFeatReference (
  idx text not null primary key,
  name text not null,
  url text not null,
  note text
);

create table if not exists ArrayAPIReference (
  array_id number not null,
  item text not null,
  idx number not null,

  primary key (array_id,idx),
  foreign key (item) references APIReference(idx)
);

create table if not exists ArrayChoice (
  array_id number not null,
  id number not null,
  idx number not null,

  primary key (array_id,idx),
  foreign key (id) references Choice(opt_id)
);

create table if not exists Background (
  idx text not null primary key,
  name text not null,
  ability_scores number not null,
  feat text not null,
  proficiencies number not null,
  proficiency_choices number,
  equipment_options number,
  url text,


  foreign key (ability_scores) references ArrayAPIReference(array_id),
  foreign key (feat) references BackgroundFeatReference(idx),
  foreign key (proficiencies) references ArrayAPIReference(array_id),
  foreign key (proficiency_choices) references ArrayChoice(id),
  foreign key (equipment_options) references ArrayChoice(id)
);

-- tabelle di Condition.ts

create table if not exists Condition (
  idx text not null primary key,
  name text not null,
  description text not null,
  url text not null

);

-- tabelle di EquipmentCategories.ts

create table if not exists EquipmentCategory (
  idx text not null primary key,
  name text not null,
  equipment number not null,
  url text not null,

  foreign key (equipment) references ArrayAPIReference(array_id)
); 

-- tabelle di Language.ts

create table if not exists Language (
  idx text not null primary key,
  name text not null,
  is_rare boolean not null,
  note text not null,
  url text not null
);

-- tabelle di MagicSchools.ts

create table if not exists MagicSchool (
  idx text not null primary key,
  name text not null,
  description text not null,
  url text not null
);

-- monsters non ci serve

-- tabelle di Proficiencies.ts

create table if not exists Proficiency (
  idx text not null primary key,
  name text not null,
  type text not null,
  backgrounds number not null,
  classes number not null,
  reference text,
  url text,

  foreign key (backgrounds) references ArrayAPIReference(array_id),
  foreign key (classes) references ArrayAPIReference(array_id),
  foreign key (reference) references APIReference(idx)
);

-- tabelle di Skills.ts

create table if not exists Skill (
  idx text not null primary key,
  name text not null,
  description text not null,
  ability_score text not null,
  url text,

  foreign key (ability_score) references APIReference(idx)
);

-- tabelle di WeaponMasteryProperties.ts

create table if not exists WeaponMasteryProperty (
  idx text not null primary key,
  name text not null,
  description text not null,
  url text not null
);

-- tabelle di Classes.ts

create table if not exists SpellcastingInfo (
  name text not null primary key,
  desc text not null
);

create table if not exists ArraySpellcastingInfo (
  array_id number not null,
  array_idx number not null,
  item text not null,
  
  primary key (array_id, array_idx),
  foreign key (item) references SpellcastingInfo(name)
);

create table if not exists Spellcasting (
  level number not null,
  spellcasting_ability text not null primary key,
  info number not null,

  foreign key (spellcasting_ability) references APIReference(idx),
  foreign key (info) references ArraySpellcastingInfo(array_id)
);

create table if not exists MultiClassingPrereq (
  id number not null primary key,
  ability_score text,
  minimum_score number not null,

  foreign key (ability_score) references APIReference(idx)
);


create table if not exists ArrayMultiClassingPrereq (
  array_id number not null,
  array_idx number not null,
  item number not null,

  primary key (array_id, array_idx),
  foreign key (item) references MultiClassingPrereq(id)
);

create table if not exists MultiClassing (
  id number not null primary key,
  prerequisites number,
  prerequisite_options number,
  proficiencies number,
  proficiency_choices number,

  foreign key (prerequisites) references ArrayMultiClassingPrereq(array_id), 
  foreign key (prerequisite_options) references Choice(opt_id),
  foreign key (proficiencies) references ArrayAPIReference(array_id),
  foreign key (proficiency_choices) references ArrayChoice(array_id)
);

create table if not exists PrimaryAbility (
  desc text not null primary key,
  ability_scores number,
  ability_score_options number,

  foreign key (ability_scores) references ArrayAPIReference(array_id),
  foreign key (ability_score_options) references Choice(opt_id)
);

create table if not exists Class (
  idx text not null,
  name text not null primary key,
  primary_ability text not null,
  hit_die number not null,
  class_levels text not null,
  multi_classing number,
  proficiencies number,
  proficiency_choices number not null,
  saving_throws number,
  starting_equipment_options number not null,
  subclasses number,
  spellcasting text,
  spells text,
  url text not null,

  foreign key (primary_ability) references PrimaryAbility(desc),
  foreign key (multi_classing) references MultiClassing(id),
  foreign key (proficiencies) references ArrayAPIReference(array_id),
  foreign key (proficiency_choices) references ArrayChoice(array_id),
  foreign key (saving_throws) references ArrayAPIReference(array_id),
  foreign key (starting_equipment_options) references ArrayChoice(array_id),
  foreign key (subclasses) references ArrayAPIReference(array_id),
  foreign key (spellcasting) references Spellcasting(spellcasting_ability)
);

-- tabelle di Equipments.ts

create table if not exists Content (
  item text not null primary key,
  quantity number not null,

  foreign key (item) references APIReference(idx)
);

create table if not exists ArrayContent (
  item text not null,
  array_id number not null,
  array_idx number not null,

  foreign key (item) references Content(item),
  primary key (array_id,array_idx)
);

create table if not exists Utilize (
  name text not null primary key,
  dc number not null,

  foreign key (dc) references DifficultyClass(id)
);

create table if not exists ArrayUtilize (
  array_id number not null,
  idx number not null,
  item text not null,

  primary key (array_id,idx),
  foreign key (item) references Utilize(name)
);

create table if not exists Equipment (
  idx text not null primary key,
  name text not null,
  equipment_categories number not null,
  cost_quantity number not null,
  cost_unit number not null,
  url text not null,
  description text,
  weight text,
  ammunition text,
  armor_class_base number,
  armor_class_dex_bonus boolean,
  armor_class_max_bonus number,
  contents number, 
  ability text,
  craft number,
  damage_type text,
  damage_dice text,
  damage_dc number,
  doff_time text,
  don_time text,
  image text,
  mastery text,
  notes text,
  properties number,
  quantity number,
  storage text,
  range_normal number,
  range_long number,
  stealth_disadvantage boolean,
  str_minimum number,
  throw_range_normal number,
  throw_range_long number,
  two_handed_damage_type text,
  two_handed_damage_dice text,
  two_handed_damage_dc number,
  utilize number,

  foreign key (equipment_categories) references ArrayAPIReference(array_id),
  foreign key (ammunition) references APIReference(idx),
  foreign key (contents) references ArrayContent(array_id),
  foreign key (ability) references APIReference(idx),
  foreign key (craft) references ArrayAPIReference(array_id),
  foreign key (damage_type) references APIReference(idx),
  foreign key (mastery) references APIReference(idx),
  foreign key (properties) references ArrayAPIReference(array_id),
  foreign key (storage) references APIReference(idx),
  foreign key (utilize) references ArrayUtilize(array_id),
  foreign key (damage_dc) references DifficultyClass(id),
  foreign key (two_handed_damage_dc) references DifficultyClass(id)
);

-- tabelle di Feats.ts

create table if not exists Feat (
  idx text not null primary key,
  name text not null,
  description text not null,
  type text not null,
  repeatable text,
  prerequisite_minimum_level number,
  prerequisite_feature_named text,
  prerequisite_options number,
  url text not null,

  foreign key (prerequisite_options) references Choice(opt_id)
);

-- tabelle di MagicItems.ts

create table if not exists MagicItem (
  idx text not null primary key,
  name text not null,
  url text not null,
  image text not null,
  equipment_category text,
  variant boolean not null,
  variants number not null,
  attunement boolean not null,
  rarity text not null,
  desc text not null,
  limited_to text,

  foreign key (equipment_category) references APIReference(idx),
  foreign key (variants) references ArrayAPIReference(array_id)
);

-- tabelle di species

create table if not exists Species (
  idx text not null primary key,
  name text not null,
  url text not null,
  type text not null,
  size text,
  size_options number,
  speed number not null,
  traits number,
  subspecies number,

  foreign key (size_options) references Choice(opt_id),
  foreign key (traits) references ArrayAPIReference(array_id),
  foreign key (subspecies) references ArrayAPIReference(array_id)
);

-- tabelle di Subclass.ts

create table if not exists ArraySubclassFeature (
  array_id number not null,
  array_idx number not null,
  name text not null,
  level number not null,
  description text not null,

  primary key (array_id,array_idx)
);

create table if not exists Subclass (
  idx text not null primary key,
  url text not null,
  name text not null,
  class text not null,
  summary text not null,
  description text not null,
  features number not null,

  foreign key (class) references APIReference(idx),
  foreign key (features) references ArraySubclassFeature(array_id)
);

-- tabelle di Subspecies.ts

create table if not exists ArraySubspeciesTrait (
  idx text not null,
  array_id number not null,
  array_idx number not null,
  name text not null,
  url text not null,
  level number not null,

  primary key (array_id,array_idx)
);

create table if not exists SubspeciesSchema (
  idx text not null primary key,
  name text not null,
  url text not null,
  species text not null,
  traits number not null,
  damage_type text,

  foreign key (species) references APIReference(idx),
  foreign key (traits) references ArraySubspeciesTrait(array_id),
  foreign key (damage_type) references APIReference(idx)
); 

-- tabelle di Traits.ts

create table if not exists ArraySpellTrait (
  array_id number not null,
  array_idx number not null,
  spell text not null,
  uses text,
  recovery text,

  primary key (array_id,array_idx),
  foreign key (spell) references APIReference(idx)
);

create table if not exists Trait (
  idx text not null primary key,
  name text not null,
  url text not null,
  description text not null,
  species number not null,
  spells number,
  subspecies number,
  proficency_choices number,
  speed number,

  foreign key (species) references ArrayAPIReference(array_id),
  foreign key (spells) references ArraySpellTrait(array_id), 
  foreign key (subspecies) references ArrayAPIReference(array_id),
  foreign key (proficency_choices) references Choice(opt_id)
);

-- tabelle di WeaponProperties.ts

create table if not exists WeaponProperty (
  idx text not null primary key,
  name text not null,
  description text not null,
  url text not null
);