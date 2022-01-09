<?php
declare(strict_types=1);

namespace App\Workspace\Api;

use App\Workspace\App\Data\NoteData;
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
     * @param string $ownerId
     * @return string
     */
    public function createDefaultWorkspace(string $ownerId): string;

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

    /**
     * @param string $workspaceId
     * @param string $userId
     */
    public function inviteUser(string $workspaceId, string $userId): void;

    /**
     * @param string $workspaceId
     * @param string $userId
     */
    public function removeUser(string $workspaceId, string $userId): void;

    /**
     * @param string $workspaceId
     * @param string[] $invitedUserIds
     */
    public function updateInvitedUsers(string $workspaceId, array $invitedUserIds): void;

    /**
     * @param string $workspaceId
     * @return string[]
     */
    public function getWorkspaceUserIds(string $workspaceId): array;

    /**
     * @param string $name
     * @param string $content
     * @param string $workspaceId
     * @return string
     */
    public function createNote(string $name, string $content, string $workspaceId): string;

    /**
     * @param string $id
     * @param string $content
     */
    public function editNote(string $id, string $content): void;

    /**
     * @param string $id
     * @param string $name
     */
    public function renameNote(string $id, string $name): void;

    /**
     * @param string $id
     */
    public function removeNote(string $id): void;

    /**
     * @param string $workspaceId
     * @return NoteData[]
     */
    public function getWorkspaceNotes(string $workspaceId): array;

    /**
     * @param string $noteId
     * @return NoteData
     */
    public function getNoteContentById(string $noteId): NoteData;
}