-- create table if not exists APIReference (
--     index text not null primary key,
--     name text not null,
--     url text not null,
--     note text
-- )

-- create table if not exists DifficultyClass (
--     -- in teoria questo dc_type dovrebbe essere riferimento
--     -- 
--     dc_type text not null primary key,
--     dc_value number,
--     success_type enum('none', 'half', 'other'),

--     foreign key (dc_type)
--     references APIReference(index)
-- )

-- create table if not exists Damage (
--     damage_type text not null primary key,
--     damage_dice text not null,
--     dc text,

--     foreign key (damage_type) 
--     references APIReference(index),
--     foreign key (dc)
--     references DifficultyClass(dc_type)
-- )

-- create table if not exists AreaOfEffect (
--     size number not null primary key,
--     type check(
--         type='sphere'
--         or type='cube'
--         or type='cylinder'
--         or type='line'
--         or type='cone'),
-- )

-- create table if not exists String (
--     string text not null primary key
-- )

-- create table if not exists DamageArray (
--     array_id number primary key not null,
--     damage_item text not null,
--     index number not null,

--     foreign key (damage_item)
--     references Damage(damage_type)
-- )

-- create table if not exists OptionAbilityBonus (
--     ability_score text not null primary key,
--     bonus number not null,
    
--     foreign key (ability_score)
--     references APIReference(index)
-- )

-- create table if not exists OptionAction (
--     action_name text not null primary key,
--     count number not null,
--     type text not null,
--     desc text
-- )

-- create table if not exists OptionBreath (
--     name text not null primary key,
--     dc text not null,
--     damageArray_id number not null,
--     -- breath voleva un array di option schema
--     -- per fare ciò ho bisogno di una tabella in più

--     foreign key (dc)
--     references DifficultyClass(cd),
--     foreign key (damageArray_id)
--     references DamageArray(damageArray_id)
-- )

-- -- altra tabella array che mi serve per countedreference
-- create table if not exists PrerequisitesArray (
--     type text not null,
--     proficency text,
--     index number not null,
--     array_id number primary key not null

--     foreign key (proficency)
--     references APIReference(proficency)
-- )

-- create table if not exists OptionCountedReference (
--     count number not null,
--     of text not null,
--     prerequisites number

--     foreign key (of)
--     references APIReference(index),
--     foreign key (prerequisites)
--     references PrerequisitesArray(array_id)
-- )

-- create table if not exists OptionDamage (
--     -- TODO: non so quali di questi due attributi possano essere chiavi primarie
--     damage_dice text not null,
--     damage_type text not null,
--     notes text

--     foreign key (damage_type)
--     references APIReference(index)
-- )


-- -- In teoria questa tabella non ci serve perché
-- -- non stiamo mettendo alignment da nessuna parte
-- -- create table if not exists OptionIdeal (

-- -- )

-- create table if not exists OptionMoney (
--     count number not null,
--     unit text not null primary key
-- )

-- -- OptionArray mi serve per multiple
-- create table if not exists OptionArray (
--     item_id number not null,
--     index number not null,
--     array_id number not null primary key 
-- )

-- create table if not exists OptionMultiple (
--     array_id number not null,
--     desc text

--     foreign key (array_id)
--     references OptionArray(array_id)
-- )

-- create table if not exists OptionScorePrerequisite (
--     -- anche qui quale chiave primaria?
--     ability_score text not null,
--     minimum_score number not null

--     foreign key (ability_score)
--     references APIReference(index)
-- )

-- create table if not exists OptionSize (
--     size text not null primary key
-- )

-- create table if not exists Option (
--     -- ho dovuto mettere un id come chiave perché altrimenti che chiave metto?
--     id number not null primary key,
--     option_kind text check (
--         option_kind='reference' or
--         option_kind='choice' or
--         option_kind='string' or
--         option_kind='ability bonus' or 
--         option_kind='action' or
--         option_kind='breath' or
--         option_kind='counted_reference' or
--         option_kind='damage' or
--         option_kind='ideal' or
--         option_kind='money' or
--         option_kind='multiple' or
--         option_kind='score-prerequisite' or 
--         option_kind='size'
--     ) 
--     not null,
--     item text,
--     choice text,
--     string text,
--     ability_bonus text,
--     action text,
--     breath text,
--     countedReference text,

--     -- non so che chiavi usare, per ora lo lascio così

--     foreign key (item)
--     references APIReference(item),
--     foreign key (choice)
--     references Choice(choice),
--     foreign key (string)
--     references String(string),
-- )