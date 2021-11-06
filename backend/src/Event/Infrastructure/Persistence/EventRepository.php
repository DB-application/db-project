<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Persistence;

use App\Event\Domain\Model\Event;
use App\Event\Domain\Model\EventRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class EventRepository implements EventRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Event::class);
    }

    public function findEventByEmail(string $email): ?Event
    {
        return $this->repo->findOneBy(['email' => $email]);
    }

    public function findEventByEmailAndUsername(string $email, string $username): ?Event
    {
        return $this->repo->findOneBy(['email' => $email, 'username' => $username]);
    }

    public function findEventById(string $userId): Event
    {
        return $this->repo->findOneBy(['userId' => $userId]);
    }

    public function add(Event $event): void
    {
        $this->em->persist($event);
        $this->em->flush();
    }

    public function update(): void
    {
        $this->em->flush();
    }
}