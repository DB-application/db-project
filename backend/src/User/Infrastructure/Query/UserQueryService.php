<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Query;

use App\User\App\Data\UserData;
use App\User\Infrastructure\Query\Hydrator\UserDataHydrator;
use App\User\Infrastructure\Query\Table\UserTable;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;

class UserQueryService
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var UserDataHydrator */
    private $hydrator;

    public function __construct(EntityManagerInterface $em, UserDataHydrator $hydrator)
    {
        $this->em = $em;
        $this->hydrator = $hydrator;
    }

    public function getUserDataByEmailAndPassword(string $email, string $password): UserData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->em->createQueryBuilder();
        $qb->from('user', 'u');
        $this->addUserFieldSelect($qb);
        $qb->where("u.{$const(UserTable::EMAIL)} = :email AS {$const(UserTable::EMAIL)}");
        $qb->andWhere("u.{$const(UserTable::PASSWORD)} = :password AS {$const(UserTable::PASSWORD)}");
        $result = $qb->getQuery()->execute(['password' => $password, 'email' => $email]);

        return $this->hydrator->hydrateAll($result);
    }

    public function getUserDataByLoginAndPassword(string $username, string $password): UserData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->em->createQueryBuilder();
        $qb->from('user', 'u');
        $this->addUserFieldSelect($qb);
        $qb->where("u.{$const(UserTable::USERNAME)} = :username AS {$const(UserTable::USERNAME)}");
        $qb->andWhere("u.{$const(UserTable::PASSWORD)} = :password AS {$const(UserTable::PASSWORD)}");
        $result = $qb->getQuery()->execute(['password' => $password, 'username' => $username]);

        return $this->hydrator->hydrateAll($result);
    }

    private function addUserFieldSelect(QueryBuilder $qb, string $alias = 'u'): void
    {
        $qb->addSelect($alias . UserTable::USER_ID);
        $qb->addSelect($alias . UserTable::EMAIL);
        $qb->addSelect($alias . UserTable::PASSWORD);
        $qb->addSelect($alias . UserTable::USERNAME);
        $qb->addSelect($alias . UserTable::FIRST_NAME);
        $qb->addSelect($alias . UserTable::LAST_NAME);
        $qb->addSelect($alias . UserTable::LOGIN_KEY);
        $qb->addSelect($alias . UserTable::PHONE);
        $qb->addSelect($alias . UserTable::AVATAR_URL);
    }
}