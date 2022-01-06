<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Exception;

use App\Workspace\Domain\Model\WorkspaceId;

class InvalidWorkspaceIdException extends \Exception
{
    public function __construct(WorkspaceId $id)
    {
        parent::__construct("Workspace with id '$id' does not exists");
    }
}