<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Exception;

class UserAlreadyInvitedException extends \Exception
{
    public function __construct(string $userId)
    {
        parent::__construct("User '$userId' already invited");
    }
}