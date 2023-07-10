use production_project_db;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS challenge;
DROP TABLE IF EXISTS result;
DROP TABLE IF EXISTS question;

create table users (
    uuid varchar(36) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    password varchar(50) default null,
    firstname varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    roles varchar(50) default 'Student',
    created_at datetime,
    updated_at datetime,
    PRIMARY KEY (uuid),
    INDEX idx_email (email)
);

create table challenges (
    uuid varchar(36) NOT NULL,
    name varchar(50) NOT NULL,
    creator_uuid varchar(36) NOT NULL,
    status varchar(15) default 'pending',
    total int default 0,
    created_at datetime,
    updated_at datetime,
    PRIMARY KEY (uuid),
    INDEX idx_creator_id (creator_uuid),
    FOREIGN KEY(creator_uuid) REFERENCES users(uuid) on delete cascade
);

create table results (
    challenge_uuid varchar(36) NOT NULL,
    user_uuid varchar(36) NOT NULL,
    grade int default 0,
    steps_validated int default 0,
    database_credentials JSON,
    created_at datetime,
    updated_at datetime,
    PRIMARY KEY (challenge_uuid, user_uuid),
    INDEX idx_challenge_id (challenge_uuid),
    INDEX idx_user_id (user_uuid),
    FOREIGN KEY(challenge_uuid) REFERENCES challenge(uuid) on delete cascade,
    FOREIGN KEY(user_uuid) REFERENCES users(uuid) on delete cascade
);

create table questions (
    id int NOT NULL AUTO_INCREMENT,
    challenge_uuid varchar(36) NOT NULL,
    question TEXT NOT NULL,
    expected_answer TEXT NOT NULL,
    command TEXT,
    note int NOT NULL default 1,
    created_at datetime,
    updated_at datetime,
    PRIMARY KEY(id),
    INDEX idx_challenge_id (challenge_uuid),
    FOREIGN KEY(challenge_uuid) REFERENCES challenge(uuid) on delete cascade
)

SET FOREIGN_KEY_CHECKS = 1;