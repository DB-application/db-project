<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Exception;

class DuplicateNameException extends \Exception
{
    public function __construct(string $name)
    {
        parent::__construct("Workspace with name '$name' already exists");
    }
}