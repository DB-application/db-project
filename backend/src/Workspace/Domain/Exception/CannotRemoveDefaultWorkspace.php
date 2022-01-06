<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Exception;

use App\Workspace\Domain\Model\WorkspaceId;

class CannotRemoveDefaultWorkspace extends \Exception
{
    public function __construct(WorkspaceId $id)
    {

    }
}