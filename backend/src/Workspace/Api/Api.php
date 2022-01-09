<?php
declare(strict_types=1);

namespace App\Workspace\Api;

use App\Workspace\App\Data\NoteData;
use App\Workspace\App\Data\WorkspaceData;
use App\Workspace\App\Query\WorkspaceQueryServiceInterface;
use App\Workspace\App\Service\NoteAppService;
use App\Workspace\App\Service\WorkspaceAppService;

class Api implements ApiInterface
{
    /** @var WorkspaceAppService */
    private $workspaceAppService;
    /** @var WorkspaceQueryServiceInterface */
    private $workspaceQueryService;
    /** @var NoteAppService */
    private $noteAppService;

    public function __construct(WorkspaceAppService $workspaceAppService, WorkspaceQueryServiceInterface $workspaceQueryService, NoteAppService $noteAppService)
    {
        $this->workspaceAppService = $workspaceAppService;
        $this->workspaceQueryService = $workspaceQueryService;
        $this->noteAppService = $noteAppService;
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

    /**
     * @param string $name
     * @param string $content
     * @param string $workspaceId
     * @return string
     */
    public function createNote(string $name, string $content, string $workspaceId): string
    {
        //TODO обработка исключений
        return $this->noteAppService->createNote($workspaceId, $name, $content);
    }

    /**
     * @param string $id
     * @param string $content
     */
    public function editNote(string $id, string $content): void
    {
        //TODO обработка исключений
        $this->noteAppService->editNote($id, $content);
    }

    /**
     * @param string $id
     * @param string $name
     */
    public function renameNote(string $id, string $name): void
    {
        //TODO обработка исключений
        $this->noteAppService->renameNote($id, $name);
    }

    /**
     * @param string $id
     */
    public function removeNote(string $id): void
    {
        //TODO обработка исключений
        $this->noteAppService->removeNote($id);
    }

    /**
     * @param string $workspaceId
     * @return NoteData[]
     */
    public function getWorkspaceNotes(string $workspaceId): array
    {
        return $this->workspaceQueryService->getNotesByWorkspaceId($workspaceId);
    }

    public function getNoteContentById(string $noteId): NoteData
    {
        return $this->workspaceQueryService->getNoteContentById($noteId);
    }
}