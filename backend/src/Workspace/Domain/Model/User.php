<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Model;

class User
{
    /** @var int */
    private $id;
    /** @var string */
    private $userId;
    /** @var Workspace */
    private $workspace;

    public function __construct(Workspace $workspace, string $userId)
    {
        $this->userId = $userId;
        $this->workspace = $workspace;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }
}