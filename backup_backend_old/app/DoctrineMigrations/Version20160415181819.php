<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160415181819 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('
            CREATE TABLE `s_estate_agent_phone`(
                `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
                `phone` CHAR(12) NOT NULL,
                `inserted` DATETIME NOT NULL,
                UNIQUE KEY UNIQUE_PHONE (`phone`)
            );
        ');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
