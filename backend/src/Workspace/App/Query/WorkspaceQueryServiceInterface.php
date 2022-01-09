<?php
declare(strict_types=1);

namespace App\Workspace\App\Query;

use App\Workspace\App\Data\NoteData;
use App\Workspace\App\Data\WorkspaceData;

interface WorkspaceQueryServiceInterface
{
    public function getWorkspaceData(string $workspaceId): ?WorkspaceData;

    /**
     * @param string $userId
     * @return WorkspaceData[]
     */
    public function getUserWorkspaces(string $userId): array;

    /**
     * @param string $workspaceId
     * @return array
     */
    public function getWorkspaceUserIds(string $workspaceId): array;

    /**
     * @param string $workspaceId
     * @return array
     */
    public function getNotesByWorkspaceId(string $workspaceId): array;

    /**
     * @param string $noteId
     * @return NoteData|null
     */
    public function getNoteContentById(string $noteId): ?NoteData;
}