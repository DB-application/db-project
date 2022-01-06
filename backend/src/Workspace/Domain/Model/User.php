<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Model;

class User
{
    /** @var int */
    private $id;
    /** @var string */
    private $userId;
    /** @var WorkspaceId */
    private $workspaceId;

    public function __construct(WorkspaceId $workspaceId, string $userId)
    {
        $this->userId = $userId;
        $this->workspaceId = $workspaceId;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    /**
     * @return WorkspaceId
     */
    public function getWorkspaceId(): WorkspaceId
    {
        return $this->workspaceId;
    }
}