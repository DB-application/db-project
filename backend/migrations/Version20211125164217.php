<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211125164217 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'creates user_invitation table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE user_invitation
            (
                user_invitation_id VARCHAR(64) PRIMARY KEY,
                user_id VARCHAR(64) NOT NULL,
                event_id VARCHAR(64) NOT NULL,
                status SMALLINT,
                FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
                FOREIGN KEY (event_id) REFERENCES event (event_id) ON DELETE CASCADE
            );
SQL
        );

    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE user_invitation;
SQL
        );
    }
}
