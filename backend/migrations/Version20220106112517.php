<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220106112517 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE workspace_user
            (
                id INTEGER AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(64) NOT NULL,
                workspace_id VARCHAR(128) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
                FOREIGN KEY (workspace_id) REFERENCES workspace (id) ON DELETE CASCADE
            );
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE workspace_user;
SQL
        );
    }
}
