<?php
declare(strict_types=1);

namespace App\Workspace\App\Data;

class WorkspaceData
{
    /** @var string */
    private $workspaceId;
    /** @var string */
    private $name;
    /** @var bool */
    private $isDefault;
    /** @var string */
    private $ownerId;


    public function __construct(string $workspaceId, string $name, string $ownerId, bool $isDefault)
    {
        $this->workspaceId = $workspaceId;
        $this->name = $name;
        $this->isDefault = $isDefault;
        $this->ownerId = $ownerId;
    }

    public function getWorkspaceId(): string
    {
        return $this->workspaceId;
    }

    public function getOwnerId(): string
    {
        return $this->ownerId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function isDefault(): bool
    {
        return $this->isDefault;
    }
}