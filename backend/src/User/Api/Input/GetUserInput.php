<?php
declare(strict_types=1);

namespace App\User\Api\Input;

use App\User\App\Data\GetUserRequestInterface;

class GetUserInput implements GetUserRequestInterface
{
    /** @var string|null */
    private $login;
    /** @var string */
    private $password;

    public function __construct(string $password, string $login)
    {
        $this->password = $password;
        $this->login = $login;
    }

    public function getUsernameOrEmail(): string
    {
        return $this->login;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}