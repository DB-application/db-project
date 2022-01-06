<?php
declare(strict_types=1);

namespace App\Workspace\Api;

use App\Workspace\App\Data\WorkspaceData;

interface ApiInterface
{
    /**
     * @param string $name
     * @param string $ownerId
     * @return string
     */
    public function createWorkspace(string $name, string $ownerId): string;

    /**
     * @param string $id
     * @param string $name
     */
    public function editWorkspace(string $id, string $name): void;

    /**
     * @param string $id
     */
    public function removeWorkspace(string $id): void;

    /**
     * @param string $id
     */
    public function getWorkspaceData(string $id): WorkspaceData;

    /**
     * @param string $userId
     * @return WorkspaceData[]
     */
    public function getUserWorkspaces(string $userId): array;
}