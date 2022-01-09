<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220109151523 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'create note table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE note
            (
                id VARCHAR(64) PRIMARY KEY,
                workspace_id VARCHAR(64) NOT NULL,
                name VARCHAR(128) NOT NULL,
                content LONGTEXT NOT NULL,
                FOREIGN KEY (workspace_id) REFERENCES workspace (id) ON DELETE CASCADE
            );
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE note;
SQL
        );
    }
}
