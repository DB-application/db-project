<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Persistent;

use App\User\Domain\Model\User;
use App\User\Domain\Model\UserRepositoryInterface;
use Doctrine\ORM\EntityManager;

class UserRepository implements UserRepositoryInterface
{
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function findUserByEmail(string $email): ?User
    {
        $qb = $this->em->createQueryBuilder();
        return $qb->where('u.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getResult();
    }

    public function add(User $user): void
    {
        $this->em->persist($user);
        $this->em->flush();
    }
}