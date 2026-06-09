-- tabelle di common.ts

create table if not exists APIReference (
  idx text  primary key,
  name text ,
  url text ,
  note text
);

create table if not exists ArrayAPIReferenceItem (
  array_id number ,
  item text ,
  array_idx number ,

  primary key (array_id,array_idx),
  foreign key (item) references APIReference(idx)
);

create table if not exists DifficultyClass (
  -- forse id può essere auto increment
  id number  primary key,
  dc_type text ,
  dc_value number,
  success_type check(success_type='none' or  success_type='half' or  success_type='other') ,

  foreign key (dc_type) references APIReference(idx)
);

create table if not exists AreaOfEffect (
  id number  primary key,
  size number ,
  type check(
  type='sphere'
  or type='cube'
  or type='cylinder'
  or type='line'
  or type='cone') 
);

create table if not exists Choice (
  desc text,
  choose number ,
  type text,
  id number  primary key,

  foreign key (id) references OptionSet(id)
);


create table if not exists ArrayDamageItem (
  array_id number ,
  damage_type text ,
  damage_dice text ,
  dc number,
  array_idx number ,

  foreign key (dc) references DifficultyClass(id)
  foreign key (damage_type) references APIReference(idx),
  primary key(array_id,array_idx)
);

-- OptionArray miItem serve per multiple
create table if not exists ArrayOptionItem (
  item_id number ,
  array_idx number ,
  array_id number ,

  primary key (array_id, array_idx),
  foreign key (item_id) references Option(id)
);

create table if not exists ArrayPrerequisiteItem (
  array_idx number ,
  array_id number ,
  item text ,
  string text ,

  primary key (array_id,array_idx),
  foreign key (item) references APIReference(idx)
);

create table if not exists Option (
  id number  primary key,
  option_type text , 
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
  breath_damage number, -- questo attributo potrebbe essere inutile, l'ho messo per si e per no
  -- pseudo-tabella countedReference
  counted_reference_count number,
  counted_item text,
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
  foreign key (choice_id) references Choice(id),
  foreign key (ability_score_bonus) references APIReference(idx),
  foreign key (breath_dc) references DifficultyClass(id), 
  foreign key (breath_damage) references ArrayDamageItem(array_id),
  foreign key (counted_item) references APIReference(idx),
  foreign key (prerequisites) references ArrayPrerequisiteItem(array_id),
  foreign key (damage_type) references APIReference(idx),
  foreign key (alignments) references ArrayAPIReferenceItem(array_id),
  foreign key (multiple_items) references ArrayOptionItem(array_id),
  foreign key (ability_score_prerequisite) references APIReference(idx)
);

create table if not exists OptionSet (
  id number  primary key,
  option_set_type text ,
  -- pseudo-tabella equipment_category
  equipment_category text, -- foreign key
  -- pseudo-tabella resource_list
  resource_list_url text,
  -- pseudo_tabella options_array
  options_array number, -- foreign key

  foreign key (equipment_category) references APIReference(idx),
  foreign key (options_array) references ArrayOptionItem(array_id)
);

-- tabelle di DamageType.ts

create table if not exists DamageType (
  idx text  primary key,
  name text ,
  description text ,
  url text 
);

-- tabelle di AbilityScores.ts

create table if not exists AbilityScore (
  idx text  primary key,
  name text ,
  full_name text ,
  description text ,
  skills number,
  url text ,

  foreign key (skills) references ArrayAPIReferenceItem(array_id)
);

-- tabelle di Alignments
-- in teoria inutili ma copiata comunque perché piccola

create table if not exists Alignment (
  idx text  primary key,
  name text ,
  abbreviation text ,
  description text ,
  url text 
);

-- tabelle di Backgrounds.ts


create table if not exists ArrayChoiceItem (
  array_id number ,
  id number ,
  array_idx number ,

  primary key (array_id,array_idx),
  foreign key (id) references Choice(id)
);


create table if not exists ArrayStartingEquipmentItem (
  array_id number ,
  array_idx number ,
  equipment text ,
  quantity number ,

  primary key (array_id,array_idx),
  foreign key (equipment) references APIReference(idx)
);

-- originalmente questa tabelle farebbe riferimento
-- ad altre tre tabelle ma essendo esse molto semplici, faccio flatten
create table if not exists Background (
  idx text  primary key,
  name text ,
  starting_proficiencies number , -- foreign key
  language_options number, -- foreign key
  starting_equipment number, -- foreign key
  starting_equipment_options number, -- foreign key
  -- primo flatten
  starting_gold_quantity number,
  starting_gold_unit text,
  -- secondo flatten
  feature_name text,
  feature_desc text, -- in teoria è array di string ma posssiamo fare flatMap
  --
  personality_traits number, -- foreign key
  ideals number, -- foreign key
  bonds number, -- foreign key
  flaws number, -- foreign key
  url text,


  foreign key (language_options) references Choice(id),
  foreign key (starting_proficiencies) references ArrayAPIReferenceItem(array_id),
  foreign key (starting_equipment) references ArrayStartingEquipmentItem(array_id),
  foreign key (starting_equipment_options) references ArrayChoiceItem(array_id),
  foreign key (personality_traits) references Choice(id),
  foreign key (ideals) references Choice(id),
  foreign key (bonds) references Choice(id),
  foreign key (flaws) references Choice(id)
);

-- tabelle di Condition.ts

create table if not exists Condition (
  idx text  primary key,
  name text ,
  description text ,
  url text 

);

-- tabelle di EquipmentCategories.ts

create table if not exists EquipmentCategory (
  idx text  primary key,
  name text ,
  equipment number ,
  url text ,

  foreign key (equipment) references ArrayAPIReferenceItem(array_id)
); 

-- tabelle di Language.ts

create table if not exists Language (
  idx text  primary key,
  name text ,
  is_rare boolean ,
  note text ,
  url text 
);

-- tabelle di MagicSchools.ts

create table if not exists MagicSchool (
  idx text  primary key,
  name text ,
  description text ,
  url text 
);

-- monsters non ci serve

-- tabelle di Proficiencies.ts

create table if not exists Proficiency (
  idx text  primary key,
  name text ,
  type text ,
  backgrounds number,
  classes number,
  reference text,
  url text,

  foreign key (backgrounds) references ArrayAPIReferenceItem(array_id),
  foreign key (classes) references ArrayAPIReferenceItem(array_id),
  foreign key (reference) references APIReference(idx)
);

-- tabelle di Skills.ts

create table if not exists Skill (
  idx text  primary key,
  name text ,
  description text ,
  ability_score text ,
  url text,

  foreign key (ability_score) references APIReference(idx)
);


-- tabelle di Classes.ts

create table if not exists SpellcastingInfo (
  name text  primary key,
  desc text 
);

create table if not exists ArraySpellcastingInfoItem (
  array_id number ,
  array_idx number ,
  item text ,
  
  primary key (array_id, array_idx),
  foreign key (item) references SpellcastingInfo(name)
);

create table if not exists Spellcasting (
  level number ,
  spellcasting_ability text  primary key,
  info number ,

  foreign key (spellcasting_ability) references APIReference(idx),
  foreign key (info) references ArraySpellcastingInfoItem(array_id)
);

create table if not exists MultiClassingPrereq (
  id number  primary key,
  ability_score text,
  minimum_score number ,

  foreign key (ability_score) references APIReference(idx)
);


create table if not exists ArrayMultiClassingPrereqItem (
  array_id number ,
  array_idx number ,
  item number ,

  primary key (array_id, array_idx),
  foreign key (item) references MultiClassingPrereq(id)
);

create table if not exists MultiClassing (
  id number  primary key,
  prerequisites number,
  prerequisite_options number,
  proficiencies number,
  proficiency_choices number,

  foreign key (prerequisites) references ArrayMultiClassingPrereqItem(array_id), 
  foreign key (prerequisite_options) references Choice(id),
  foreign key (proficiencies) references ArrayAPIReferenceItem(array_id),
  foreign key (proficiency_choices) references ArrayChoiceItem(array_id)
);

create table if not exists Class (
  idx text ,
  name text  primary key,
  hit_die number ,
  class_levels text ,
  multi_classing number,
  proficiencies number,
  proficiency_choices number ,
  saving_throws number,
  starting_equipment number, -- foreign key
  starting_equipment_options number ,
  subclasses number,
  spellcasting text,
  spells text,
  url text ,

  foreign key (multi_classing) references MultiClassing(id),
  foreign key (proficiencies) references ArrayAPIReferenceItem(array_id),
  foreign key (proficiency_choices) references ArrayChoiceItem(array_id),
  foreign key (saving_throws) references ArrayAPIReferenceItem(array_id),
  foreign key (starting_equipment_options) references ArrayChoiceItem(array_id),
  foreign key (subclasses) references ArrayAPIReferenceItem(array_id),
  foreign key (spellcasting) references Spellcasting(spellcasting_ability),
  foreign key (starting_equipment) references ArrayStartingEquipmentItem(array_id)
);

-- tabelle di Equipments.ts

-- create table if not exists Content (
--   item text ,
--   quantity number ,

--   primary key ()
--   foreign key (item) references APIReference(idx)
-- );

create table if not exists ArrayContentItem (
  item text ,
  quantity number ,
  array_id number ,
  array_idx number ,

  foreign key (item) references APIReference(idx),
  primary key (array_id,array_idx)
);

-- create table if not exists Utilize (
--   name text  primary key,
--   dc number ,

--   foreign key (dc) references DifficultyClass(id)
-- );

create table if not exists ArrayUtilizeItem (
  array_id number ,
  array_idx number ,
  item text ,
  dc number ,

  primary key (array_id,array_idx),
  foreign key (dc) references DifficultyClass(id)
);

create table if not exists Equipment (
  idx text  primary key,
  name text ,
  equipment_categories number ,
  cost_quantity number ,
  cost_unit number ,
  url text ,
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

  foreign key (equipment_categories) references ArrayAPIReferenceItem(array_id),
  foreign key (ammunition) references APIReference(idx),
  foreign key (contents) references ArrayContentItem(array_id),
  foreign key (ability) references APIReference(idx),
  foreign key (craft) references ArrayAPIReferenceItem(array_id),
  foreign key (damage_type) references APIReference(idx),
  foreign key (mastery) references APIReference(idx),
  foreign key (properties) references ArrayAPIReferenceItem(array_id),
  foreign key (storage) references APIReference(idx),
  foreign key (utilize) references ArrayUtilizeItem(array_id),
  foreign key (damage_dc) references DifficultyClass(id),
  foreign key (two_handed_damage_dc) references DifficultyClass(id)
);

-- tabelle di Feats.ts

create table if not exists Feat (
  idx text  primary key,
  name text ,
  description text ,
  type text ,
  repeatable text,
  prerequisite_minimum_level number,
  prerequisite_feature_named text,
  prerequisite_options number,
  url text ,

  foreign key (prerequisite_options) references Choice(id)
);

-- tabelle di MagicItems.ts

create table if not exists MagicItem (
  idx text  primary key,
  name text ,
  url text ,
  image text ,
  equipment_category text,
  variant boolean ,
  variants number,
  attunement boolean ,
  rarity text ,
  desc text ,
  limited_to text,

  foreign key (equipment_category) references APIReference(idx),
  foreign key (variants) references ArrayAPIReferenceItem(array_id)
);

-- tabelle di species

create table if not exists ArrayAbilityBonusItem (
  ability_score text ,
  bonus number ,
  array_id number ,
  array_idx number ,

  primary key (array_id,array_idx),
  foreign key (ability_score) references APIReference(idx)
);

create table if not exists Species (
  idx text primary key,
  name text,
  speed number,
  ability_bonuses number, -- foreign key
  ability_bonus_options number,
  alignment text,
  age text,
  size text,
  size_description text,
  starting_proficiencies number, -- foreign key
  starting_proficiency_options number, -- foreign key
  languages number, -- foreign key
  language_desc text,
  language_options number, -- foreign key
  traits number, -- foreign key
  subspecies number, -- subraces nella versione 2014, foreign key
  url text,

  foreign key (ability_bonuses) references ArrayAbilityBonusItem(array_id),
  foreign key (ability_bonus_options) references Choice(id),
  foreign key (starting_proficiencies) references ArrayAPIReferenceItem(array_id),
  foreign key (starting_proficiency_options) references Choice(id),
  foreign key (languages) references ArrayAPIReferenceItem(array_id),
  foreign key (language_options) references Choice(id),
  foreign key (traits) references ArrayAPIReferenceItem(array_id),
  foreign key (subspecies) references ArrayAPIReferenceItem(array_id)
);

-- tabelle di Subclass.ts

create table if not exists SubclassSpellPrereq (
  idx text  primary key,
  type text ,
  name text ,
  url text 
);

create table if not exists ArraySubclassSpellPrerequisiteItem (
  item text ,
  array_id number ,
  array_idx number , 

  primary key (array_id,array_idx),
  foreign key (item) references SubclassSpellPrereq(idx)
);

create table if not exists ArraySubclassSpellItem (
  prerequisite number ,
  spell text ,
  array_id number ,
  array_idx number ,

  primary key (array_id,array_idx),
  foreign key (prerequisite) references ArraySubclassSpellPrerequisiteItem(array_id),
  foreign key (spell) references APIReference(idx)
);

create table if not exists Subclass (
  idx text  primary key,
  url text ,
  name text ,
  class text ,
  subclass_flavor text ,
  desc text , -- dovrebbe essere un'array, facciamo flatmap
  subclass_levels text ,
  spells number,

  foreign key (class) references APIReference(idx),
  foreign key (spells) references ArraySubclassSpellItem(array_id)
);

-- tabelle di Subspecies.ts


create table if not exists Subspecies (
  idx text  primary key,
  name text ,
  url text ,
  species text , -- si chiama race nel 2014
  desc text ,
  ability_bonuses number , -- foreign key
  racial_traits number, -- foreign key

  foreign key (species) references APIReference(idx),
  foreign key (ability_bonuses) references ArrayAbilityBonusItem(array_id),
  foreign key (racial_traits) references ArrayAPIReferenceItem(array_id)
); 

-- tabelle di Traits.ts

create table if not exists ArrayBreathWeaponDamageItem (
  damage_type text ,
  array_id number ,
  array_idx number ,
  character_level text ,

  primary key (array_id,array_idx), 
  foreign key (damage_type) references APIReference(idx)
);

create table if not exists BreathWeapon (
  id number  primary key,
  name text ,
  desc text ,
  area_of_effect number ,
  -- i prossimi due sono flatten
  usage_type text ,
  usage_times number ,
  dc number ,
  damage number ,

  foreign key (damage) references ArrayBreathWeaponDamageItem(array_id),
  foreign key (area_of_effect) references AreaOfEffect(id),
  foreign key (dc) references DifficultyClass(id)
);

create table if not exists TraitSpecific (
  id number  primary key,
  damage_type text,
  breath_weapon number,
  spell_options number,
  subtrait_options number,

  foreign key (damage_type) references APIReference(idx),
  foreign key (breath_weapon) references BreathWeapon(id),
  foreign key (spell_options) references Choice(id),
  foreign key (subtrait_options) references Choice(id)
);

create table if not exists Trait (
  idx text  primary key,
  name text ,
  url text ,
  desc text ,
  species number ,
  subspecies number,
  proficiencies number,
  proficiency_choices number,
  language_options number,
  parent text,
  trait_specific number,


  foreign key (species) references ArrayAPIReferenceItem(array_id),
  foreign key (subspecies) references ArrayAPIReferenceItem(array_id),
  foreign key (proficiency_choices) references Choice(id),
  foreign key (proficiencies) references ArrayAPIReferenceItem(array_id),
  foreign key (language_options) references Choice(id),
  foreign key (parent) references APIReference(idx),
  foreign key (trait_specific) references TraitSpecific(id)
);

-- tabelle di WeaponProperties.ts

create table if not exists WeaponProperty (
  idx text  primary key,
  name text ,
  description text ,
  url text 
);

-- tabelle di Spell.ts


create table if not exists Spell (
  name text  primary key,
  level number ,
  school text ,
  classes text ,
  actionType text ,
  concentration boolean ,
  ritual boolean ,
  range text ,
  components text,
  material text,
  duration text ,
  description text ,
  cantripUpgrade text,

  foreign key (school) references MagicSchool(idx)
);

-- tabelle di level.ts

create table if not exists ArrayCreatingSpellSlotItem (
  array_idx number ,
  array_id number ,
  sorcery_point_cost number ,
  spell_slot_level number ,

  primary key (array_id,array_idx)
);

create table if not exists ClassSpecific (
  id number  primary key,
  action_surges number,
  arcane_recovery_levels number,
  aura_range number,
  bardic_inspiration_die number,
  brutal_critical_dice number,
  channel_divinity_charges number,
  creating_spell_slots number,
  destroy_undead_cr number,
  extra_attacks number,
  favored_enemies number,
  favored_terrain number,
  indomitable_uses number,
  invocations_known number,
  ki_points number,
  magical_secrets_max_5 number,
  magical_secrets_max_7 number,
  magical_secrets_max_9 number,
  -- i due qua sotto sono attributi "flattenati"
  martial_arts_dice_count number,
  martial_arts_dice_value number,
  metamagic_known number,
  mystic_arcanum_level_6 number,
  mystic_arcanum_level_7 number,
  mystic_arcanum_level_8 number,
  mystic_arcanum_level_9 number,
  rage_count number,
  rage_damage_bonus number,
  -- i due qua sotto sono attributi "flattenati"
  sneak_attack_dice_count number,
  sneak_attack_dice_value number,
  song_of_rest_die number,
  sorcery_points number,
  unarmored_movement number,
  wild_shape_fly boolean,
  wild_shape_max_cr number,
  wild_shape_swim boolean,

  foreign key (creating_spell_slots) references ArrayCreatingSpellSlotItem(array_id) 
);

create table if not exists Level (
  idx text  primary key,
  level number ,
  ability_score_bonuses number,
  prof_bonus number,
  features number,
  character_class text ,
  class_specific number,
  subclass text ,
  url text,
  -- le prossime cose sono tutte flatten di altre tabelle
  cantrips_known number,
  spell_slots_level_1 number,
  spell_slots_level_2 number,
  spell_slots_level_3 number,
  spell_slots_level_4 number,
  spell_slots_level_5 number,
  spell_slots_level_6 number,
  spell_slots_level_7 number,
  spell_slots_level_8 number,
  spell_slots_level_9 number,
  spells_known number,
  additional_magical_secrets_max_lvl number,
  aura_range number,

  foreign key (features) references ArrayAPIReferenceItem(array_id),
  foreign key (character_class) references APIReference(idx),
  foreign key (class_specific) references ClassSpecific(id),
  foreign key (subclass) references APIReference(idx)
);





-- a partire da qui in poi scrivo tabelle lato utente




create table if not exists Account (
  email text not null primary key,
  password text not null,
  username text not null
);

create table if not exists Amministratore (
  account text not null primary key,

  foreign key (account) references Account(email) on update cascade on delete cascade
);

create table if not exists UtenteGenerico (
  account text not null,
  -- le chiavi di utente giocatore e utente dm si potrebbero
  -- creare 'sommando' alla email delle stringhe 
  -- come '-giocatore' e '-dm'
  utente_giocatore text not null,
  utente_dungeon_master text not null,

  primary key (account, utente_giocatore, utente_dungeon_master),
  foreign key (account) references Account(email) on update cascade on delete cascade
);

create table if not exists ArrayFeatItem (
  item text not null,
  idx_personaggio text not null,
  array_idx number not null,

  primary key (idx_personaggio,array_idx),
  foreign key (idx_personaggio) references Personaggio(idx_personaggio) on update cascade on delete cascade,
  foreign key (item) references Feat(idx)
);

create table if not exists ArraySpellItem (
  item text not null,
  idx_personaggio text not null,
  array_idx number not null,

  primary key (idx_personaggio,array_idx),
  foreign key (idx_personaggio) references Personaggio(idx_personaggio) on update cascade on delete cascade,
  foreign key (item) references Spell(name)
);

create table if not exists ArrayEquipmentItem (
  item text not null,
  idx_personaggio text not null,
  array_idx number not null,

  primary key (idx_personaggio,array_idx),
  foreign key (idx_personaggio) references Personaggio(idx_personaggio) on update cascade on delete cascade,
  foreign key (item) references Equipment(idx)
);

create table if not exists ArrayLanguageItem (
  item text not null,
  idx_personaggio text not null,
  array_idx number not null,

  primary key (idx_personaggio,array_idx),
  foreign key (idx_personaggio) references Personaggio(idx_personaggio) on update cascade on delete cascade,
  foreign key (item) references Language(idx)
);

create table if not exists ArrayStatsItem (
  stat_idx text not null,
  stat_value number not null,
  idx_personaggio text not null,
  array_idx number not null,

  primary key (idx_personaggio,array_idx),
  foreign key (idx_personaggio) references Personaggio(idx_personaggio) on update cascade on delete cascade,
  foreign key (stat_idx) references AbilityScore(idx)
);

create table if not exists Personaggio (
  utente_giocatore text not null,
  nome text not null,
  -- primary key creata da interpolazione
  -- utente_giocatore + nome
  idx_personaggio text not null primary key,
  campagna text, -- un personaggio una sola campagna altrimenti problemi di modifica pg
  classe text not null,
  sottoclasse text,
  specie text not null,
  sottospecie text,
  background text not null,
  livello text not null,
  -- i talenti sono salvati su un array come foreign keys
  -- stessa cosa vale per equipaggiamenti, incantesimi e lingue parlate
  -- e anche per statistiche

 -- tranne che non li salviamo come ArrayAPIReference?

  -- in teoria la proprietà è array di 
  -- stringhe, lascio come semplice stringa?
  abilita_extra text,
  descrizione_personaggio text,

  foreign key (classe) references Class(idx),
  foreign key (campagna) references Campagna(idx_campagna),
  foreign key (idx_personaggio) references ArrayFeatItem(idx_personaggio),
  foreign key (idx_personaggio) references ArraySpellItem(idx_personaggio),
  foreign key (idx_personaggio) references ArrayEquipmentItem(idx_personaggio),
  foreign key (idx_personaggio) references ArrayLanguageItem(idx_personaggio),
  foreign key (idx_personaggio) references ArrayStatsItem(idx_personaggio),
  foreign key (utente_giocatore) references UtenteGiocatore(utente_giocatore) on update cascade on delete cascade,
  foreign key (sottoclasse) references Subclass(idx),
  foreign key (specie) references Species(idx),
  foreign key (sottospecie) references Subspecies(idx),
  foreign key (background) references Background(idx),
  foreign key (livello) references Level(idx)
);

create table if not exists ArrayPostItem (
  idx_campagna text not null,
  timestamp text not null,
  contenuto text not null,

  primary key (idx_campagna,timestamp),
  foreign key (idx_campagna) references Personaggio(idx_campagna) on update cascade on delete cascade,
  foreign key (idx_campagna) references Campagna(idx_campagna)
);

create table if not exists ArrayCampagnaPersonaggiItem (
  idx_campagna text not null,
  idx_personaggio text not null,

  primary key (idx_campagna,idx_personaggio),
  foreign key (idx_personaggio) references Personaggio(idx_personaggio) on update cascade on delete cascade,
  foreign key (idx_campagna) references Campagna(idx_campagna) on update cascade on delete cascade
);

create table if not exists Campagna (
  utente_dungeon_master text not null,
  nome text not null,
  -- primary key creata da interpolazione
  -- utente_dungeon_master + nome
  idx_campagna text not null primary key,
  banner text,
  descrizione text,
  -- i post vengono acceduti tramite foreign key
  -- non so cosa fare con i personaggi
  -- avrebbe più senso avere un array di giocatori?

  -- comunque personaggi sono anch'essi acceduti come foreign key

  foreign key (utente_dungeon_master) references UtenteGenerico(utente_dungeon_master) on update cascade on delete cascade
);

create table if not exists ArrayIdxPersonaggioItem (
  utente_giocatore text not null,
  idx_personaggio text not null,

  primary key (utente_giocatore,idx_personaggio),
  foreign key (utente_giocatore) references UtenteGiocatore(utente_giocatore) on update cascade on delete cascade,
  foreign key (idx_personaggio) references Personaggio(idx_personaggio) on update cascade on delete cascade,
  foreign key (idx_personaggio) references ArrayCampagnaPersonaggiItem(idx_personaggio)
);

-- create table if not exists UtenteGiocatore (
--   utente_giocatore text not null primary key,
--   utente_generico text not null,

  
--   -- personaggi e campagne acceduti con idx personaggio
--   -- tramite tabella direttamente sopra
--   foreign key (utente_generico) references UtenteGenerico(account),
--   foreign key (utente_giocatore) references ArrayIdxPersonaggioItem(utente_giocatore)
-- );

create table if not exists ArrayIdxCampagnaItem (
  utente_dungeon_master text not null,
  idx_campagna text not null,

  primary key (utente_dungeon_master,idx_campagna),
  foreign key (utente_dungeon_master) references UtenteGenerico(utente_dungeon_master) on update cascade on delete cascade,
  foreign key (idx_campagna) references Campagna(idx_campagna) on update cascade on delete cascade
);

-- create table if not exists UtenteDungeonMaster (
--   utente_dungeon_master text not null primary key,
--   utente_generico text not null,

--   -- campagne si raggiungono tramite 
--   -- foreign key a tabella sopra
--   foreign key (utente_generico) references UtenteGenerico(account),
--   foreign key (utente_dungeon_master) references ArrayIdxCampagnaItem(utente_dungeon_master)
-- );