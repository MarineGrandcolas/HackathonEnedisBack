CREATE DATABASE hackathon;
USE hackathon;

CREATE TABLE `users` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `pseudo` varchar(25) NOT NULL,
    `password` varchar(20) NOT NULL,
    `level` int  NOT NULL DEFAULT 1,
    `experience` int NOT NULL DEFAULT 0,
    `role` varchar(255), 
    `email` varchar(255),
    `avatar` varchar(255) NOT NULL DEFAULT ('https://i.ibb.co/ckgRshd/pexels-9889007-1.jpg'),
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `quests` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `quest_title` varchar(255)  NOT NULL,
    `quest_time` varchar(100) NOT NULL,
    `experience` int NOT NULL,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `steps` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `step` varchar(255)  NOT NULL,
    `threshold` varchar(255)  NOT NULL,
    `message` varchar(255)  NOT NULL,
    `quest_id` int NOT NULL,  
    `experience` int NOT NULL,
    PRIMARY KEY (
        `id`
    )
);

ALTER TABLE steps ADD CONSTRAINT `fk_steps_quest_id` FOREIGN KEY(`quest_id`)
REFERENCES `quests` (`id`);

INSERT INTO users (pseudo, password, level, experience, avatar) VALUES
("Sylvain", "marabout34", "1", "0", "https://cdn.pixabay.com/photo/2016/11/22/23/49/bright-1851267_1280.jpg");

INSERT INTO quests (quest_title, quest_time, experience) VALUES 
("Être attentif lors de ses déplacements", "quotidien", 600),
("Réfléchir avant d'agir (TOP)", "quotidien", 500),
("Adapter sa vitesse de conduite et sans téléphone", "quotidien", 500),
("Ni drogue, ni alcool", "quotidien", 400),
("Port des EPI (Equipement de Protection Individuel) adaptés", "quotidien", 900);

INSERT INTO steps (step, threshold, message, experience, quest_id) VALUES
("L'organisation sur mes interventions de la journée permet des déplacements en toute sécurité", 600, "Bien joué !", 300, 1),
("J'ai favorisé des aller-retours plutôt que de m'encombrer", 600, "Bien joué !", 300, 1),
("J'ai appliqué les pratiques TOP sur chacune de mes interventions", 1300, "Bien joué !", 350, 2),
("Je n'ai rencontré aucun problème, ou à défaut, ai appelé mon superviseur", 1300, "Bien joué !", 350, 2),
("Je n'ai pas consulté mon téléphone au volant de la journée", 2100, "Bien joué !", 400, 3),
("J'ai respecté les limites de vitesse sur la route toute la journée", 2100, "Bien joué !", 400, 3),
("Je suis sobre sur mon lieu de travail", 2800, "Bien joué !", 350, 4),
("Je ne conduis pas en état d'ébriété", 2800, "Bien joué !", 350, 4),
("Je porte l'intégralité de mes EPI", 3700, "Bien joué !", 450, 5),
("Mes collègues portent l'intégralité de leurs EPI", 3700, "Bien joué !", 450, 5);