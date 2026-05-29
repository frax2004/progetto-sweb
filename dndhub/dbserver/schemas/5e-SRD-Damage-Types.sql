create table if not exists DamageTypes (
    index text not null primary key,
    name text not null,
    description text not null,
    url text not null
)