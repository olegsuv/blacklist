<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160415210728 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql([
            '
                CREATE TABLE `s_advertisement` (
                    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
                    `comment` VARCHAR(255) NOT NULL,
                    `url` VARCHAR(255),
                    `title` VARCHAR(255),
                    `description` TEXT,
                    `inserted` DATETIME NOT NULL
                );
            ',
            '
                CREATE TABLE `s_advertisement_to_phone`(
                    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
                    `advertisement_id` INT(11),
                    `phone_id` INT(11)
                );
            '
        ]);
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
