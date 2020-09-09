CREATE TABLE "chefs" (
  "id_chef" SERIAL PRIMARY KEY,
  "name_chef" text,
  "file_id" int NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "recipes" (
  "id_recipe" SERIAL PRIMARY KEY,
  "title" text,
  "chef_id" int NOT NULL,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp
);

CREATE TABLE "files" (
  "id_file" SERIAL PRIMARY KEY,
  "name_file" text,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "file_id" int
);

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id_file") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id_chef") ;

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id_recipe") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id_file") ON UPDATE CASCADE ON DELETE CASCADE;
