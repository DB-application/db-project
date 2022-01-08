<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Persistence;

use App\Common\Domain\UuidGenerator;
use App\Workspace\Domain\Model\Note;
use App\Workspace\Domain\Model\NoteId;
use App\Workspace\Domain\Model\NoteRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class NoteRepository implements NoteRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Note::class);
    }

    public function findById(NoteId $id): ?Note
    {
        return $this->repo->findOneBy(['id' => $id]);
    }

    public function findByName(string $name): ?Note
    {
        return $this->repo->findOneBy(['name' => $name]);
    }

    public function add(Note $note): void
    {
        $this->em->persist($note);
    }

    public function remove(Note $note): void
    {
        $this->em->remove($note);
    }

    public function nextId(): NoteId
    {
        return new NoteId(UuidGenerator::generateUuid());
    }
}