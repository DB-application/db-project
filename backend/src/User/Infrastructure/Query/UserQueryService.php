<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Query;

use App\User\App\Data\UserData;
use App\User\App\Query\UserQueryServiceInterface;
use App\User\Infrastructure\Query\Hydrator\UserDataHydrator;
use App\User\Infrastructure\Query\Table\UserTable;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

class UserQueryService implements UserQueryServiceInterface
{
    /** @var Connection */
    private $conn;
    /** @var EntityManagerInterface */
    private $em;
    /** @var UserDataHydrator */
    private $hydrator;

    public function __construct(EntityManagerInterface $em, UserDataHydrator $hydrator)
    {
        $this->conn = $em->getConnection();
        $this->em = $em;
        $this->hydrator = $hydrator;
    }

    public function getUserDataByEmailAndPassword(string $email, string $password): ?UserData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->conn->createQueryBuilder();
        $qb->from('user', 'u');
        $this->addUserFieldSelect($qb);
        $qb->where("{$const(UserTable::EMAIL)} = ':email'");
        $qb->andWhere("{$const(UserTable::PASSWORD)} = ':password'");
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, ['email' => $email, 'password' => $password])->fetchOne();

        return $result ? $this->hydrator->hydrateAll($result) : null;
    }

    public function getUserDataByUsernameAndPassword(string $username, string $password): ?UserData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->conn->createQueryBuilder();
        $qb->from('user', 'u');
        $this->addUserFieldSelect($qb);
        $qb->where("{$const(UserTable::USERNAME)} = :username");
        $qb->andWhere("{$const(UserTable::PASSWORD)} = :password");
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, [':password' => $password, ':username' => $username])->fetchAssociative();

        return $result ? $this->hydrator->hydrateAll($result) : null;
    }

    private function addUserFieldSelect(QueryBuilder $qb, string $alias = 'u'): void
    {
        $qb->addSelect($alias . '.' . UserTable::USER_ID);
        $qb->addSelect($alias . '.' . UserTable::EMAIL);
        $qb->addSelect($alias . '.' . UserTable::PASSWORD);
        $qb->addSelect($alias . '.' . UserTable::USERNAME);
        $qb->addSelect($alias . '.' . UserTable::FIRST_NAME);
        $qb->addSelect($alias . '.' . UserTable::LAST_NAME);
        $qb->addSelect($alias . '.' . UserTable::LOGIN_KEY);
        $qb->addSelect($alias . '.' . UserTable::PHONE);
        $qb->addSelect($alias . '.' . UserTable::AVATAR_URL);
    }
}