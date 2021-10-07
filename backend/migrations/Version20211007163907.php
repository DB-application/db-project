<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211007163907 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create user table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE user
            (
                user_id VARCHAR(64) PRIMARY KEY,
                email VARCHAR(256) UNIQUE NOT NULL,
                username VARCHAR(256) UNIQUE NOT NULL,
                password VARCHAR(256) NOT NULL,
                login_key VARCHAR(100) UNIQUE,
                first_name VARCHAR(256),
                last_name VARCHAR(256),
                phone VARCHAR(12) UNIQUE,
                avatar_url VARCHAR(12)
            );
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE user;
SQL
        );
    }
}
