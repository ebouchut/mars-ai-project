-- backend/prisma/schema.sql
-- This file was used initially create the database structure
-- (tables, keys, indexes, constraints).
--
-- It is now an old artifact.
-- The source of truth is now the Prisma schema in
--   backend/prisma/schema.prisma

USE marsAI;

CREATE TABLE users (
	id              INT            PRIMARY KEY AUTO_INCREMENT,

	email           VARCHAR(150)   UNIQUE NOT NULL,
	password_hash   VARCHAR(255)   NOT NULL,
	role            ENUM('admin', 'filmmaker', 'screener', 'jury') NOT NULL,
	first_name      VARCHAR(60)    NOT NULL,
	last_name       VARCHAR(255)   NOT NULL,
	bio             TEXT,
	photo           VARCHAR(255),

	created_at      TIMESTAMP,
	updated_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE films (
	id              INT           PRIMARY KEY AUTO_INCREMENT,

	name            VARCHAR(255)  UNIQUE NOT NULL,
	video_url       VARCHAR(255)  NOT NULL,

	poster_url      VARCHAR(255),
	description     TEXT,
	status          ENUM(
	    'submitted', 'bookended', 'draft_published',
	    'copyright_cleared', 'copyright_flagged',
	    'screenable', 'screened',
	    'selected', 'pending_consensus', 'rejected',
	    'duration_exceeded',
	    'categorized', 'voting', 'scored',
	    'winner', 'runner_up'
	),

    created_at    TIMESTAMP     NOT NULL,
    updated_at    TIMESTAMP     NOT NULL DEFAULT NOW(),

    CONSTRAINT uk_films_name_video_url UNIQUE(name, video_url),

    INDEX idx_films_status(status)
);

CREATE TABLE partners (
	id            INT           PRIMARY KEY AUTO_INCREMENT,

	name          VARCHAR(100)  UNIQUE,
	description   VARCHAR(255),
	url           VARCHAR(255)  NOT NULL,
	logo          VARCHAR(255)   NOT NULL,
	display_order INT           DEFAULT 0,

	created_at    TIMESTAMP     NOT NULL,
	updated_at    TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE awards (
	id              INT          PRIMARY KEY AUTO_INCREMENT,
	partner_id      INT,

	name            VARCHAR(100) NOT NULL UNIQUE,
	description     TEXT,
	amount          DECIMAL(10,2),
	amount_currency ENUM('USD', 'EUR') NOT NULL,

	CONSTRAINT fk_awards_partners
	    FOREIGN KEY (partner_id) REFERENCES partners(id)
);

CREATE TABLE nominations (
	film_id    INT,
	award_id   INT,

	status     ENUM('pending', 'nominated', 'winner', 'runner_up')
        NOT NULL DEFAULT 'pending',

    PRIMARY KEY (film_id, award_id),

    CONSTRAINT fk_nominations_films
        FOREIGN KEY (film_id) REFERENCES films(id),

	CONSTRAINT fk_nominations_awards
	    FOREIGN KEY (award_id) REFERENCES awards(id)
);

CREATE TABLE screenings (
	user_id  INT,
	film_id  INT,

	status   ENUM('selected', 'rejected', 'pending_consensus') NOT NULL,
    comment  TEXT,

    PRIMARY KEY pk_screenings(user_id, film_id),

    CONSTRAINT fk_screenings_users
        FOREIGN KEY(user_id) REFERENCES users(id),
	CONSTRAINT fk_screenings_films
	    FOREIGN KEY(film_id) REFERENCES films(id)
);

CREATE TABLE social_networks (
    id    INT            PRIMARY KEY AUTO_INCREMENT,

    name  VARCHAR(100)   NOT NULL,
    url   VARCHAR(255)   NOT NULL,

    CONSTRAINT uk_social_networks_name_url UNIQUE(name, url)
);

CREATE TABLE user_social_networks (
	user_id           INT,
	social_network_id INT,

	profile_url       VARCHAR(255)  NOT NULL,

    PRIMARY KEY pk_user_social_networks(user_id, social_network_id),

    CONSTRAINT uk_user_social_networks
        UNIQUE(user_id, social_network_id, profile_url),

	CONSTRAINT fk_user_social_networks_users
        FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_user_social_networks_social_networks
            FOREIGN KEY(social_network_id) REFERENCES social_networks(id)
);

CREATE TABLE works (
	id          INT          PRIMARY KEY AUTO_INCREMENT,
	user_id     INT          NOT NULL,

	date        DATE,
	name        VARCHAR(100) NOT NULL UNIQUE,
	url         VARCHAR(255) NOT NULL UNIQUE,
	description TEXT,

	CONSTRAINT uk_works_name_url UNIQUE (name, url),
	CONSTRAINT fk_works_users
	    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE votes (
	id         INT        PRIMARY KEY AUTO_INCREMENT,

	user_id    INT        NOT NULL,
	film_id    INT        NOT NULL,
	award_id   INT        NOT NULL,

	score      INT         NOT NULL,
	comment    TEXT        NOT NULL,

	created_at TIMESTAMP   NOT NULL,
	updated_at TIMESTAMP   NOT NULL DEFAULT NOW(),

    CONSTRAINT uk_votes_user_id_film_id_award_id
        UNIQUE(user_id, film_id, award_id),

	CONSTRAINT fk_votes_users  FOREIGN KEY(user_id)  REFERENCES users(id),
	CONSTRAINT fk_votes_films  FOREIGN KEY(film_id)  REFERENCES films(id),
	CONSTRAINT fk_votes_awards FOREIGN KEY(award_id) REFERENCES awards(id)
);

CREATE TABLE production_tools (
    id          INT          PRIMARY KEY AUTO_INCREMENT,

    name        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    url         VARCHAR(255)
);

CREATE TABLE film_production_tools (
	film_id            INT,
	production_tool_id INT   NOT NULL,

	CONSTRAINT pk_film_production_tools
	    PRIMARY KEY (film_id, production_tool_id),

	CONSTRAINT fk_film_production_tools_films
        FOREIGN KEY(film_id) REFERENCES films(id),
    CONSTRAINT fk_film_production_tools_production_tools
        FOREIGN KEY(production_tool_id) REFERENCES production_tools(id)
);


CREATE TABLE newsletters (
	id                INT         PRIMARY KEY AUTO_INCREMENT,

	name              VARCHAR(150) NOT NULL UNIQUE,
	last_published_at TIMESTAMP,

	created_at TIMESTAMP          NOT NULL,
	updated_at TIMESTAMP          NOT NULL
);

CREATE TABLE newsletter_subscriptions
(
    id                INT                  PRIMARY KEY AUTO_INCREMENT,
    newsletter_id     INT,

    email             VARCHAR(150)         UNIQUE,
    status            ENUM('pending', 'subscribed', 'unsubscribed', 'error') NOT NULL,
    subscribed_at     TIMESTAMP            NOT NULL COMMENT 'local subscription date',

    esp_subscriber_id INT                           COMMENT 'Subscriber id on the Email Service Provider (ESP)',
    esp_synced_at     TIMESTAMP                     COMMENT 'When email was last synced/registered to Email Service Provider (ESP)',
    esp_updated_at    TIMESTAMP                     COMMENT 'ESP\'s own last update',

    created_at        TIMESTAMP            NOT NULL,
    updated_at        TIMESTAMP            NOT NULL DEFAULT NOW(),

    CONSTRAINT newsletters_registers_newsletter_subscriptions
        FOREIGN KEY(newsletter_id) REFERENCES newsletters(id),

    INDEX idx_newsletter_subscriptions_status(status)
);


CREATE TABLE jury_invitations (
	id          INT           PRIMARY KEY AUTO_INCREMENT,

	email       VARCHAR(150)  NOT NULL UNIQUE,
	token       VARCHAR(255)  NOT NULL,

	expires_at  TIMESTAMP     NOT NULL,
	accepted_at TIMESTAMP     DEFAULT NULL,

    created_at  TIMESTAMP     NOT NULL,
    updated_at TIMESTAMP        NOT NULL DEFAULT NOW(),

    INDEX idx_jury_invitations_token(token)
);

CREATE TABLE admins (
	id            INT           PRIMARY KEY AUTO_INCREMENT,

	email         VARCHAR(150)  NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,

	first_name    VARCHAR(100)  NOT NULL,
	last_name     VARCHAR(150)  NOT NULL,

	created_at TIMESTAMP        NOT NULL,
	updated_at TIMESTAMP        NOT NULL DEFAULT NOW()
);
