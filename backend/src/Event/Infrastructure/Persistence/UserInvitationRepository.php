<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Event\Domain\Model\UserInvitation;
use App\Event\Domain\Model\UserInvitationRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;
use function Doctrine\ORM\QueryBuilder;

class UserInvitationRepository implements UserInvitationRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(UserInvitation::class);
    }

    public function findById(Uuid $id): ?UserInvitation
    {
        return $this->repo->findOneBy(['id' => $id]);
    }

    public function findByUserIdAndEventId(Uuid $userId, Uuid $eventId): ?UserInvitation
    {
        return $this->repo->findOneBy(['userId' => $userId, 'eventId' => $eventId]);
    }

    public function findByUserIdsAndEventId(array $userIds, Uuid $eventId): \Iterator
    {
        $qb = $this->repo->createQueryBuilder('ui');
        $qb->where($qb->expr()->in('userId', $userIds));
        $qb->where($qb->expr()->eq('eventId', $eventId));
        foreach ($qb->getQuery()->toIterable() as $row)
        {
            yield $row[0];
        }
    }

    public function add(UserInvitation $invitation): void
    {
        $this->em->persist($invitation);
        $this->em->flush();
    }

    public function update(): void
    {
        $this->em->flush();
    }

    public function remove(UserInvitation $invitation): void
    {
        $this->em->remove($invitation);
        $this->em->flush();
    }
}