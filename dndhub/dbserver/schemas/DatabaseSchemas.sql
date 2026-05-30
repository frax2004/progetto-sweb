;-- tabelle di common.ts

create table if not exists APIReference (
    index text not null primary key,
    name text not null,
    url text not null,
    note text
);

create table if not exists DifficultyClass (
    -- in teoria questo dc_type dovrebbe essere riferimento
    -- 
    dc_type text not null primary key,
    dc_value number,
    success_type check(success_type='none' or  success_type='half' or  success_type='other'),

    foreign key (dc_type) references APIReference(index)
);

create table if not exists Damage (
    damage_type text not null primary key,
    damage_dice text not null,
    dc text,

    foreign key (damage_type)  references APIReference(index),
    foreign key (dc) references DifficultyClass(dc_type)
);

create table if not exists AreaOfEffect (
    size number not null primary key,
    type check(
        type='sphere'
        or type='cube'
        or type='cylinder'
        or type='line'
        or type='cone')
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

create table if not exists DamageArray (
    array_id number primary key not null,
    damage_item text not null,
    index number not null,

    foreign key (damage_item) references Damage(damage_type)
);

create table if not exists OptionAbilityBonus (
    ability_score text not null primary key,
    bonus number not null,
    
    foreign key (ability_score) references APIReference(index)
);

create table if not exists OptionAction (
    action_name text not null primary key,
    count number not null,
    type text not null,
    desc text
);

create table if not exists OptionBreath (
    name text not null primary key,
    dc text not null,
    damageArray_id number not null,
    -- breath voleva un array di option schema
    -- per fare ciò ho bisogno di una tabella in più

    foreign key (dc) references DifficultyClass(cd),
    foreign key (damageArray_id) references DamageArray(damageArray_id)
);

-- altra tabella array che mi serve per countedreference
create table if not exists PrerequisitesArray (
    type text not null,
    proficency text,
    index number not null,
    array_id number primary key not null,

    foreign key (proficency) references APIReference(proficency)
);

create table if not exists OptionCountedReference (
    count number not null,
    of text not null,
    prerequisites number,

    foreign key (of) references APIReference(index),
    foreign key (prerequisites) references PrerequisitesArray(array_id)
);

create table if not exists OptionDamage (
    -- TODO: non so quali di questi due attributi possano essere chiavi primarie
    damage_dice text not null,
    damage_type text not null,
    notes text,

    foreign key (damage_type) references APIReference(index)
);


-- In teoria questa tabella non ci serve perché
-- non stiamo mettendo alignment da nessuna parte
-- create table if not exists OptionIdeal (

-- )

create table if not exists OptionMoney (
    count number not null,
    unit text not null primary key
);

-- OptionArray mi serve per multiple
create table if not exists OptionArray (
    item_id number not null,
    index number not null,
    array_id number not null primary key 
);

create table if not exists OptionMultiple (
    array_id number not null,
    desc text,

    foreign key (array_id) references OptionArray(array_id)
);

create table if not exists OptionScorePrerequisite (
    -- anche qui quale chiave primaria?
    ability_score text not null,
    minimum_score number not null,

    foreign key (ability_score) references APIReference(index)
);

create table if not exists OptionSize (
    size text not null primary key
);

create table if not exists Option (
    -- ho dovuto mettere un id come chiave perché altrimenti che chiave metto?
    id number not null primary key,
    option_kind text check (
        option_kind='reference' or
        option_kind='choice' or
        option_kind='string' or
        option_kind='ability bonus' or 
        option_kind='action' or
        option_kind='breath' or
        option_kind='counted_reference' or
        option_kind='damage' or
        option_kind='ideal' or
        option_kind='money' or
        option_kind='multiple' or
        option_kind='score-prerequisite' or 
        option_kind='size'
    ) not null,
    item text,
    choice text,
    string text,
    ability_bonus text,
    action text,
    breath text,
    countedReference text,

    -- non so che chiavi usare, per ora lo lascio così

    foreign key (item) references APIReference(item),
    foreign key (choice) references Choice(choice),
    foreign key (string) references String(string)
);

create table if not exists EquipmentCategory (
    equipment_category text not null primary key,

    foreign key (equipment_category) references APIReference(index)
);

create table if not exists ResourceList (
    resource_list_url text not null primary key
);

create table if not exists OptionAndString (
    -- non sapevo che chiave dargli
    id number not null primary key,
    option_schema number not null,
    string text not null,

    foreign key (option_schema) references Option(id)
);

create table if not exists OptionsArray (
    opt_id number not null,
    index number not null,
    array_id number not null primary key,

    foreign key (opt_id) references OptionAndString(id)
);

create table if not exists OptionSet (
    id number not null primary key,
    option_kind text check (
        option_kind='equipment_category' or
        option_kind='resource_list' or
        option_kind='options_array' 
    ) not null,
    equip text,
    resourceList text,
    optArray_id number,

    foreign key (equip) references EquipmentCategory(equipment_category),
    foreign key (resourceList) references ResourceList(resource_list_url),
    foreign key (optArray_id) references OptionsArray(array_id)
);

-- tabelle di DamageTypes.ts

create table if not exists DamageTypes (
    index text not null primary key,
    name text not null,
    description text not null,
    url text not null
);

-- tabelle di AbilityScores.ts

create table if not exists AbilityScore (
    index text not null primary key,
    name text not null,
    full_name text not null,
    description text not null,
    skills text not null,
    url text not null,

    foreign key (skills) references APIReference(index)
);

-- tabelle di Alignments
-- in teoria inutili ma copiata comunque perché piccola

create table if not exists Alignment (
    index text not null primary key,
    name text not null,
    abbreviation text not null,
    description text not null,
    url text not null
);

-- tabelle di Backgrounds.ts

create table if not exists BackgroundFeatReference (
    index text not null primary key,
    name text not null,
    url text not null,
    note text
);

create table if not exists ArrayAPIReference (
    array_id number not null primary key,
    item text not null,
    index not null number,

    foreign key (item) references APIReference(index)
);

create table if not exists ArrayChoice (
    array_id number not null primary key,
    id number not null,
    index number not null,

    foreign key (id) references Choice(opt_id)
);

create table if not exists Background (
    index text not null primary key,
    name text not null,
    ability_scores number not null,
    feat text not null,
    proficiencies number not null,
    proficiency_choices number,
    equipment_options number,
    url text,


    foreign key (ability_scores) references ArrayAPIReference(array_id),
    foreign key (feat) references BackgroundFeatReference(index),
    foreign key (proficiencies) references ArrayAPIReference(array_id),
    foreign key (proficiency_choices) references ArrayChoice(id),
    foreign key (equipment_options) references ArrayChoice(id)
);

-- tabelle di Condition.ts

create table if not exists Condition (
    index text not null primary key,
    name text not null,
    description text not null,
    url text not null

);

-- tabelle di EquipmentCategories.ts

create table if not exists EquipmentCategory (
    index text not null primary key,
    name text not null,
    equipment number not null,
    url text not null,

    foreign key (equipment) references ArrayAPIReference(array_id)
); 

-- tabelle di Language.ts

create table if not exists Language (
    index text not null primary key,
    name text not null,
    is_rare boolean not null,
    note text not null,
    url text not null
);

-- tabelle di MagicSchools.ts

create table if not exists MagicSchool (
    index text not null primary key,
    name text not null,
    description text not null,
    url text not null
);

-- monsters non ci serve

-- tabelle di Proficiencies.ts

create table if not exists Proficiency (
    index text not null primary key,
    name text not null,
    type text not null,
    backgrounds number not null,
    classes number not null,
    reference text,
    url text,

    foreign key (backgrounds) references ArrayAPIReference(array_id),
    foreign key (classes) references ArrayAPIReference(array_id),
    foreign key (reference) references APIReference(index)
);

-- tabelle di Skills.ts

create table if not exists Skill (
    index text not null primary key,
    name text not null,
    description text not null,
    ability_score text not null,
    url text,

    foreign key (ability_score) references APIReference(index)
);

-- tabelle di WeaponMasteryProperties.ts

create table if not exists WeaponMasteryProperty (
    index text not null primary key,
    name text not null,
    description text not null,
    url text not null
);

-- tabelle di Classes.ts

create table if not exists SpellcastingInfo (
    name text not null 
);