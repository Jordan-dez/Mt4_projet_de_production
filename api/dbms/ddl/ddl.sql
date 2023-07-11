use production_project_db;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS questions;

create table users (
    uuid varchar(36) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    firstname varchar(50) default NULL,
    lastname varchar(50) default NULL,
    role varchar(50) NOT NULL default 'Student',
    token varchar(36) UNIQUE default NULL,
    created_at datetime NOT NULL,
    updated_at datetime default NULL,
    PRIMARY KEY (uuid),
    INDEX idx_email (email)
);

create table challenges (
    uuid varchar(36) NOT NULL,
    name varchar(50) NOT NULL,
    description TEXT default NULL,
    creator_uuid varchar(36) NOT NULL,
    status varchar(15) NOT NULL default 'opened',
    total int NOT NULL default 0,
    created_at datetime NOT NULL,
    updated_at datetime default NULL,
    PRIMARY KEY (uuid),
    INDEX idx_creator_id (creator_uuid),
    FOREIGN KEY(creator_uuid) REFERENCES users(uuid) on delete cascade
);

create table results (
    challenge_uuid varchar(36) NOT NULL,
    user_uuid varchar(36) NOT NULL,
    grade int NOT NULL default 0,
    steps_validated int NOT NULL default 0,
    server_username varchar(20) default NULL,
    server_ip_address varchar(20) default NULL,
    created_at datetime NOT NULL,
    updated_at datetime default NULL,
    PRIMARY KEY (challenge_uuid, user_uuid),
    INDEX idx_challenge_id (challenge_uuid),
    INDEX idx_user_id (user_uuid),
    FOREIGN KEY(challenge_uuid) REFERENCES challenges(uuid) on delete cascade,
    FOREIGN KEY(user_uuid) REFERENCES users(uuid) on delete cascade
);

create table questions (
    id int NOT NULL AUTO_INCREMENT,
    challenge_uuid varchar(36) NOT NULL,
    question TEXT NOT NULL,
    expected_answer TEXT NOT NULL,
    command TEXT default NULL,
    note int NOT NULL default 1,
    created_at datetime NOT NULL,
    updated_at datetime default NULL,
    PRIMARY KEY(id),
    INDEX idx_challenge_id (challenge_uuid),
    FOREIGN KEY(challenge_uuid) REFERENCES challenges(uuid) on delete cascade
);

SET FOREIGN_KEY_CHECKS = 1;

insert into users (uuid, email, firstname, lastname, role, created_at) values ('d0db4f33-473d-4696-9bf5-1ffff4b47537', 'demahmed02@gmail.com', 'Super', 'Admin', 'Admin', '2023-07-10 22:05:47');

insert into users (uuid, email, firstname, lastname, role, created_at) values ('d0db4f70-852r-4696-9bf5-2ffff4b47550', 'yajoah@gmail.com', 'Ahmed', 'DEM', 'Student', '2023-07-10 22:05:47');