<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20211024185730 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create event table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE event
            (
                event_id VARCHAR(64) PRIMARY KEY,
                name VARCHAR(60) NOT NULL,
                description TEXT,
                start_date DATETIME NOT NULL,
                end_date DATETIME NOT NULL,
                place VARCHAR(60),
                organizer_id VARCHAR(64) NOT NULL,
                repetition_schedule INT,
                is_repeatable TINYINT(1),
                FOREIGN KEY (organizer_id) REFERENCES user (user_id),
                INDEX (organizer_id)
            );
SQL
        );

    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE event;
SQL
        );
    }
}
