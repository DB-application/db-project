<?php
declare(strict_types=1);

namespace App\User\Api\Input;

class CreateUserInput
{
    /** @var string */
    private $email;
    /** @var string */
    private $password;
    /** @var string */
    private $username;

    public function __construct(string $email, string $password, string $username)
    {
        $this->password = $password;
        $this->username = $username;
        $this->email = $email;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getUsername(): string
    {
        return $this->username;
    }
}