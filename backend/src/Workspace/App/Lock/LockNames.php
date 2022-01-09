<?php
declare(strict_types=1);

namespace App\Workspace\App\Lock;

class LockNames
{
    private const WORKSPACE_LOCK_NAME = 'workspace_lock_';
    private const NOTE_LOCK_NAME = 'note_lock_';

    public static function getWorkspaceLock(string $workspaceId): string
    {
        return self::WORKSPACE_LOCK_NAME . $workspaceId;
    }

    public static function getNoteLock(string $noteId): string
    {
        return self::NOTE_LOCK_NAME . $noteId;
    }
}