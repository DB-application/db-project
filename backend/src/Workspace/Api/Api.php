<?php
declare(strict_types=1);

namespace App\Workspace\Api;

use App\Workspace\App\Data\WorkspaceData;
use App\Workspace\App\Query\WorkspaceQueryServiceInterface;
use App\Workspace\App\Service\WorkspaceAppService;

class Api implements ApiInterface
{
    /** @var WorkspaceAppService */
    private $workspaceAppService;
    /** @var WorkspaceQueryServiceInterface */
    private $workspaceQueryService;

    public function __construct(WorkspaceAppService $workspaceAppService, WorkspaceQueryServiceInterface $workspaceQueryService)
    {
        $this->workspaceAppService = $workspaceAppService;
        $this->workspaceQueryService = $workspaceQueryService;
    }

    /**
     * @param string $name
     * @param string $ownerId
     * @return string
     */
    public function createWorkspace(string $name, string $ownerId): string
    {
        //TODO обработка исключений
        return $this->workspaceAppService->createWorkspace($name, $ownerId);
    }

    public function createDefaultWorkspace(string $ownerId): string
    {
        return $this->workspaceAppService->createDefaultWorkspace($ownerId);
    }

    /**
     * @param string $id
     * @param string $name
     */
    public function editWorkspace(string $id, string $name): void
    {
        //TODO обработка исключений
        $this->workspaceAppService->editWorkspace($id, $name);
    }

    /**
     * @param string $id
     */
    public function removeWorkspace(string $id): void
    {
        //TODO обработка исключений
        $this->workspaceAppService->removeWorkspace($id);
    }

    public function getWorkspaceData(string $id): WorkspaceData
    {
        // TODO: Implement getWorkspaceData() method.
        return $this->workspaceQueryService->getWorkspaceData($id);
    }

    public function getUserWorkspaces(string $userId): array
    {
        return $this->workspaceQueryService->getUserWorkspaces($userId);
    }

    public function inviteUser(string $workspaceId, string $userId): void
    {
        $this->workspaceAppService->inviteUser($workspaceId, $userId);
    }

    public function removeUser(string $workspaceId, string $userId): void
    {
        $this->workspaceAppService->removeUser($workspaceId, $userId);
    }

    public function updateInvitedUsers(string $workspaceId, array $invitedUserIds): void
    {
        $this->workspaceAppService->updateInvitedUsers($workspaceId, $invitedUserIds);
    }

    public function getWorkspaceUserIds(string $workspaceId): array
    {
        return $this->workspaceQueryService->getWorkspaceUserIds($workspaceId);
    }
}