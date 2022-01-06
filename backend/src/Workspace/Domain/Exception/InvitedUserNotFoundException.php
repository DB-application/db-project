<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Exception;

use App\Workspace\Domain\Model\WorkspaceId;

class InvitedUserNotFoundException extends \Exception
{
    public function __construct(string $userId, WorkspaceId $workspaceId)
    {
        parent::__construct("User '$userId' not invited at workspace '$workspaceId'");
    }
}