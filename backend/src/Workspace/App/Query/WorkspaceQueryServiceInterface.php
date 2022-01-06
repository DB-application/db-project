<?php
declare(strict_types=1);

namespace App\Workspace\App\Query;

use App\Workspace\App\Data\WorkspaceData;

interface WorkspaceQueryServiceInterface
{
    public function getWorkspaceData(string $workspaceId): ?WorkspaceData;

    /**
     * @param string $userId
     * @return WorkspaceData[]
     */
    public function getUserWorkspaces(string $userId): array;
}