<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Persistence;

use App\Event\Domain\Event;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class EventRepository
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

    public function add(Event $user): void
    {
        $this->em->persist($user);
        $this->em->flush();
    }

    public function update(): void
    {
        $this->em->flush();
    }
}