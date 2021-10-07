<?php
declare(strict_types=1);

namespace App\User\App\Data;

class GetUserRequest implements GetUserRequestInterface
{
    /** @var string|null */
    private $email;
    /** @var string|null */
    private $login;
    /** @var string */
    private $password;

    public function __construct(string $password, ?string $login = null, ?string $email = null)
    {
        $this->password = $password;
        $this->login = $login;
        $this->email = $email;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}