alter table public."LGS_Player"
add column if not exists "Category" character varying;

update public."LGS_Player"
set "Category" = 'Regular'
where "Category" isnull;