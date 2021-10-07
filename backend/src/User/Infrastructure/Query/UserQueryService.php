<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Query;

use App\User\App\Data\UserData;
use App\User\Infrastructure\Query\Hydrator\UserDataHydrator;
use App\User\Infrastructure\Query\Table\UserTable;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

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
        $qb->where("u.email = :email AS {$const(UserTable::EMAIL)}");
        $qb->andWhere("u.password = :password AS {$const(UserTable::PASSWORD)}");
        $result = $qb->getQuery()->execute(['password' => $password, 'email' => $email]);

        return $this->hydrator->hydrateAll($result);
    }

    public function getUserDataByLoginAndPassword(string $username, string $password): UserData
    {

    }

    private function addUserFieldSelect(QueryBuilder $qb, string $alias = 'u')
    {
        $qb->addSelect($alias . UserTable::EMAIL);
        $qb->addSelect($alias . UserTable::PASSWORD);
        $qb->addSelect($alias . UserTable::USERNAME);
        $qb->addSelect($alias . UserTable::FIRST_NAME);
        $qb->addSelect($alias . UserTable::LAST_NAME);
        $qb->addSelect($alias . UserTable::LOGIN_KEY);
        $qb->addSelect($alias . UserTable::LOGIN_KEY);
        $qb->addSelect($alias . UserTable::LOGIN_KEY);
    }
}