create database IF NOT EXISTS production_project_db;

create user IF NOT EXISTS 'dev'@'%.%.%.%' identified by 'user-password';
grant select, update, insert, delete on production_project_db.* to 'dev'@'%.%.%.%';
flush privileges;