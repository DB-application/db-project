<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Service;

use App\Workspace\Domain\Exception\CannotRemoveDefaultWorkspace;
use App\Workspace\Domain\Exception\DefaultWorkspaceAlreadyExistsException;
use App\Workspace\Domain\Exception\DuplicateNameException;
use App\Workspace\Domain\Exception\InvalidWorkspaceIdException;
use App\Workspace\Domain\Model\Workspace;
use App\Workspace\Domain\Model\WorkspaceId;
use App\Workspace\Domain\Model\WorkspaceRepositoryInterface;

class WorkspaceService
{
    /** @var WorkspaceRepositoryInterface */
    private $repository;

    public function __construct(WorkspaceRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $name
     * @param string $ownerId
     * @return WorkspaceId
     * @throws DefaultWorkspaceAlreadyExistsException
     * @throws DuplicateNameException
     */
    public function createDefaultWorkspace(string $name, string $ownerId): WorkspaceId
    {
        $this->assertNameValid($name);
        $this->assertNoDefaultWorkspace();
        $workspace = new Workspace($this->repository->nextId(), $name, $ownerId, true);
        $this->repository->add($workspace);
        return $workspace->getId();
    }

    /**
     * @param string $name
     * @param string $ownerId
     * @return WorkspaceId
     * @throws DuplicateNameException
     */
    public function createWorkspace(string $name, string $ownerId): WorkspaceId
    {
        $this->assertNameValid($name);
        $workspace = new Workspace($this->repository->nextId(), $name, $ownerId, false);
        $this->repository->add($workspace);
        return $workspace->getId();
    }

    //TODO: подумать можно ли будет изменять стандартный воркспейс

    /**
     * @param WorkspaceId $id
     * @param string $name
     * @throws InvalidWorkspaceIdException
     */
    public function editWorkspace(WorkspaceId $id, string $name): void
    {
        $workspace = $this->repository->findById($id);
        if ($workspace === null)
        {
            throw new InvalidWorkspaceIdException($id);
        }
        $workspace->setName($name);
    }

    /**
     * @param WorkspaceId $id
     * @throws CannotRemoveDefaultWorkspace
     * @throws InvalidWorkspaceIdException
     */
    public function removeWorkspace(WorkspaceId $id): void
    {
        $workspace = $this->repository->findById($id);
        if ($workspace === null)
        {
            throw new InvalidWorkspaceIdException($id);
        }
        if ($workspace->isDefault())
        {
            throw new CannotRemoveDefaultWorkspace($id);
        }
        $this->repository->remove($workspace);
    }

    /**
     * @param string $name
     * @throws DuplicateNameException
     */
    private function assertNameValid(string $name): void
    {
        if ($this->repository->findByName($name) !== null)
        {
            throw new DuplicateNameException($name);
        }
    }

    /**
     * @throws DefaultWorkspaceAlreadyExistsException
     */
    private function assertNoDefaultWorkspace(): void
    {
        if ($this->repository->findDefaultWorkspace() !== null)
        {
            throw new DefaultWorkspaceAlreadyExistsException();
        }
    }
}