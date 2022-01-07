<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Persistence;

use App\Common\Domain\UuidGenerator;
use App\Workspace\Domain\Model\Workspace;
use App\Workspace\Domain\Model\WorkspaceId;
use App\Workspace\Domain\Model\WorkspaceRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class WorkspaceRepository implements WorkspaceRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Workspace::class);
    }

    public function findById(WorkspaceId $id): ?Workspace
    {
        return $this->repo->findOneBy(['id' => $id]);
    }

    public function findByName(string $name): ?Workspace
    {
        return $this->repo->findOneBy(['name' => $name]);
    }

    public function findDefaultWorkspace(string $ownerId): ?Workspace
    {
        return $this->repo->findOneBy(['isDefault' => true, 'ownerId' => $ownerId]);
    }

    public function add(Workspace $workspace): void
    {
        $this->em->persist($workspace);
    }

    public function remove(Workspace $workspace): void
    {
        $this->em->remove($workspace);
    }

    public function nextId(): WorkspaceId
    {
        return new WorkspaceId(UuidGenerator::generateUuid());
    }

}