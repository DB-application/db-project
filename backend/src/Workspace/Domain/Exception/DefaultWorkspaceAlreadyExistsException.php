<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Exception;

class DefaultWorkspaceAlreadyExistsException extends \Exception
{
    public function __construct()
    {
        parent::__construct('Default workspace already exists');
    }
}