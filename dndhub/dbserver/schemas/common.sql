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
    success_type enum('none', 'half', 'other'),

    foreign key (dc_type)
    references APIReference(index)
);

create table if not exists Damage (
    damage_type text not null primary key,
    damage_dice text not null,
    dc text,

    foreign key (damage_type) 
    references APIReference(index),
    foreign key (dc)
    references DifficultyClass(dc_type)
)

create table if not exists AreaOfEffect (
    size number not null primary key,
    type check(
        type='sphere'
        or type='cube'
        or type='cylinder'
        or type='line'
        or type='cone'),
)

create table if not exists String (
    string text not null primary key
)

create table if not exists AbilityBonus (
    ability_score text not null primary key,
    bonus number not null,

    foreign key (ability_score)
    references APIReference
)

create table if not exists Option (
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
    ) 
    not null,
    item text,
    choice text,
    string text,


    foreign key (item)
    references APIReference(item),
    foreign key (choice)
    references Choice(choice),
    foreign key (string)
    references String(string)
)