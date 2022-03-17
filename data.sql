CREATE DATABASE hackathon;
USE hackathon;

CREATE TABLE `users` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `pseudo` varchar(25)  NOT NULL,
    `password` varchar(20) NOT NULL,
    `level` int  NOT NULL DEFAULT 1,
    `experience` int NOT NULL DEFAULT 0,
    `avatar` varchar(255) NOT NULL DEFAULT ('https://i.ibb.co/ckgRshd/pexels-9889007-1.jpg'),
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `quests` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `quest_title` varchar(100)  NOT NULL,
    `quest_description` TEXT NOT NULL,
    `point_exp` int  NOT NULL,
    `experience` int NOT NULL,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `steps` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `step_title` varchar(100)  NOT NULL,
    `step_description` TEXT NOT NULL,
    `image` varchar(255),
    `isFinish` boolean NOT NULL DEFAULT false,
    `quest_id` int NOT NULL,  
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `users_quests` (
    `user_id` int NOT NULL,
    `quest_id` int NOT NULL,
    `isFinish` boolean NOT NULL DEFAULT false
);

ALTER TABLE `steps` ADD CONSTRAINT `fk_steps_quest_id` FOREIGN KEY(`quest_id`)
REFERENCES `quests` (`id`);

ALTER TABLE `users_quests` ADD CONSTRAINT `fk_users_quests_user_id` FOREIGN KEY(`user_id`)
REFERENCES `users` (`id`);

ALTER TABLE `users_quests` ADD CONSTRAINT `fk_users_quests_quest_id` FOREIGN KEY(`quest_id`)
REFERENCES `quests` (`id`);


