CREATE DATABASE foodfy;

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

CREATE TABLE "users"(
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT,
  "reset_token" TEXT,
  "reset_token_expires" TEXT,
  "is_admin" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMP DEFAULT(now()),
  "updated_at" TIMESTAMP DEFAULT(now())
);
ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id_file") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id_chef") ;

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id_recipe") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id_file") ON UPDATE CASCADE ON DELETE CASCADE;

--create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN 
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--auto updated_at users
CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();