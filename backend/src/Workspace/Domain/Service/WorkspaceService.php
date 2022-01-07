<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Service;

use App\Workspace\Domain\Exception\CannotRemoveDefaultWorkspace;
use App\Workspace\Domain\Exception\DefaultWorkspaceAlreadyExistsException;
use App\Workspace\Domain\Exception\InvalidWorkspaceIdException;
use App\Workspace\Domain\Exception\InvitedUserNotFoundException;
use App\Workspace\Domain\Exception\UserAlreadyInvitedException;
use App\Workspace\Domain\Model\Workspace;
use App\Workspace\Domain\Model\WorkspaceId;
use App\Workspace\Domain\Model\WorkspaceRepositoryInterface;

class WorkspaceService
{
    private const DEFAULT_WORKSPACE_NAME = 'New workspace';

    /** @var WorkspaceRepositoryInterface */
    private $repository;

    public function __construct(WorkspaceRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $ownerId
     * @return WorkspaceId
     * @throws DefaultWorkspaceAlreadyExistsException
     */
    public function createDefaultWorkspace(string $ownerId): WorkspaceId
    {
        $this->assertNoDefaultWorkspace($ownerId);
        $workspace = new Workspace($this->repository->nextId(), self::DEFAULT_WORKSPACE_NAME, $ownerId, true);
        $this->repository->add($workspace);
        return $workspace->getId();
    }

    /**
     * @param string $name
     * @param string $ownerId
     * @return WorkspaceId
     */
    public function createWorkspace(string $name, string $ownerId): WorkspaceId
    {
        $workspace = new Workspace($this->repository->nextId(), $name, $ownerId, false);
        $this->repository->add($workspace);
        return $workspace->getId();
    }

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
     * @param WorkspaceId $workspaceId
     * @param string $userId
     * @throws InvalidWorkspaceIdException
     * @throws UserAlreadyInvitedException
     */
    public function inviteUser(WorkspaceId $workspaceId, string $userId): void
    {
        $workspace = $this->repository->findById($workspaceId);
        if ($workspace === null)
        {
            throw new InvalidWorkspaceIdException($workspaceId);
        }
        $workspace->addUser($userId);
    }

    /**
     * @param WorkspaceId $workspaceId
     * @param string $userId
     * @throws InvalidWorkspaceIdException
     * @throws InvitedUserNotFoundException
     */
    public function removeUser(WorkspaceId $workspaceId, string $userId): void
    {
        $workspace = $this->repository->findById($workspaceId);
        if ($workspace === null)
        {
            throw new InvalidWorkspaceIdException($workspaceId);
        }
        $workspace->removeUser($userId);
    }

    /**
     * @param WorkspaceId $workspaceId
     * @param array $invitedUserIds
     * @throws InvalidWorkspaceIdException
     * @throws InvitedUserNotFoundException
     * @throws UserAlreadyInvitedException
     */
    public function updateInvitedUsers(WorkspaceId $workspaceId, array $invitedUserIds): void
    {
        $workspace = $this->repository->findById($workspaceId);
        if ($workspace === null)
        {
            throw new InvalidWorkspaceIdException($workspaceId);
        }
        $usersToInvite = array_diff($invitedUserIds, $workspace->getInvitedUserIds());
        $usersToRemove = array_diff($workspace->getInvitedUserIds(), $invitedUserIds);
        foreach ($usersToInvite as $user)
        {
            $workspace->addUser($user);
        }
        foreach ($usersToRemove as $user)
        {
            $workspace->removeUser($user);
        }
    }

    /**
     * @throws DefaultWorkspaceAlreadyExistsException
     */
    private function assertNoDefaultWorkspace(string $ownerId): void
    {
        if ($this->repository->findDefaultWorkspace($ownerId) !== null)
        {
            throw new DefaultWorkspaceAlreadyExistsException();
        }
    }
}