-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(150) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `awards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partner_id` INTEGER NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `amount` DECIMAL(10, 2) NULL,
    `amount_currency` ENUM('USD', 'EUR') NOT NULL,

    UNIQUE INDEX `name`(`name`),
    INDEX `fk_awards_partners`(`partner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `film_production_tools` (
    `film_id` INTEGER NOT NULL,
    `production_tool_id` INTEGER NOT NULL,

    INDEX `fk_film_production_tools_production_tools`(`production_tool_id`),
    PRIMARY KEY (`film_id`, `production_tool_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `films` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `video_url` VARCHAR(255) NOT NULL,
    `poster_url` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `status` ENUM('submitted', 'bookended', 'draft_published', 'copyright_cleared', 'copyright_flagged', 'screenable', 'screened', 'selected', 'pending_consensus', 'rejected', 'duration_exceeded', 'categorized', 'voting', 'scored', 'winner', 'runner_up') NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `name`(`name`),
    INDEX `idx_films_status`(`status`),
    UNIQUE INDEX `uk_films_name_video_url`(`name`, `video_url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jury_invitations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires_at` TIMESTAMP(0) NOT NULL,
    `accepted_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_jury_invitations_token`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletter_subscriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `newsletter_id` INTEGER NULL,
    `email` VARCHAR(150) NULL,
    `status` ENUM('pending', 'subscribed', 'unsubscribed', 'error') NOT NULL,
    `subscribed_at` TIMESTAMP(0) NOT NULL,
    `esp_subscriber_id` INTEGER NULL,
    `esp_synced_at` TIMESTAMP(0) NULL,
    `esp_updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_newsletter_subscriptions_status`(`status`),
    INDEX `newsletters_registers_newsletter_subscriptions`(`newsletter_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `last_published_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nominations` (
    `film_id` INTEGER NOT NULL,
    `award_id` INTEGER NOT NULL,
    `status` ENUM('pending', 'nominated', 'winner', 'runner_up') NOT NULL DEFAULT 'pending',

    INDEX `fk_nominations_awards`(`award_id`),
    PRIMARY KEY (`film_id`, `award_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `description` VARCHAR(255) NULL,
    `url` VARCHAR(255) NOT NULL,
    `logo` VARCHAR(255) NOT NULL,
    `display_order` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `production_tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `url` VARCHAR(255) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `screenings` (
    `user_id` INTEGER NOT NULL,
    `film_id` INTEGER NOT NULL,
    `status` ENUM('selected', 'rejected', 'pending_consensus') NOT NULL,
    `comment` TEXT NULL,

    INDEX `fk_screenings_films`(`film_id`),
    PRIMARY KEY (`user_id`, `film_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_networks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `uk_social_networks_name_url`(`name`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_social_networks` (
    `user_id` INTEGER NOT NULL,
    `social_network_id` INTEGER NOT NULL,
    `profile_url` VARCHAR(255) NOT NULL,

    INDEX `fk_user_social_networks_social_networks`(`social_network_id`),
    UNIQUE INDEX `uk_user_social_networks`(`user_id`, `social_network_id`, `profile_url`),
    PRIMARY KEY (`user_id`, `social_network_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'filmmaker', 'screener', 'jury') NOT NULL,
    `first_name` VARCHAR(60) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `bio` TEXT NULL,
    `photo` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `film_id` INTEGER NOT NULL,
    `award_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_votes_awards`(`award_id`),
    INDEX `fk_votes_films`(`film_id`),
    UNIQUE INDEX `uk_votes_user_id_film_id_award_id`(`user_id`, `film_id`, `award_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `works` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATE NULL,
    `name` VARCHAR(100) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `url`(`url`),
    INDEX `fk_works_users`(`user_id`),
    UNIQUE INDEX `uk_works_name_url`(`name`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `awards` ADD CONSTRAINT `fk_awards_partners` FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `film_production_tools` ADD CONSTRAINT `fk_film_production_tools_films` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `film_production_tools` ADD CONSTRAINT `fk_film_production_tools_production_tools` FOREIGN KEY (`production_tool_id`) REFERENCES `production_tools`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `newsletter_subscriptions` ADD CONSTRAINT `newsletters_registers_newsletter_subscriptions` FOREIGN KEY (`newsletter_id`) REFERENCES `newsletters`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nominations` ADD CONSTRAINT `fk_nominations_awards` FOREIGN KEY (`award_id`) REFERENCES `awards`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nominations` ADD CONSTRAINT `fk_nominations_films` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `screenings` ADD CONSTRAINT `fk_screenings_films` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `screenings` ADD CONSTRAINT `fk_screenings_users` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_social_networks` ADD CONSTRAINT `fk_user_social_networks_social_networks` FOREIGN KEY (`social_network_id`) REFERENCES `social_networks`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_social_networks` ADD CONSTRAINT `fk_user_social_networks_users` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `fk_votes_awards` FOREIGN KEY (`award_id`) REFERENCES `awards`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `fk_votes_films` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `fk_votes_users` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `fk_works_users` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
