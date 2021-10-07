<?php
declare(strict_types=1);

namespace App\User\App\Data;

class UserData
{
    /** @var string */
    private $userId;
    /** @var string */
    private $email;
    /** @var string */
    private $username;
    /** @var string */
    private $password;
    /** @var string|null */
    private $firstName;
    /** @var string|null */
    private $lastName;
    /** @var string|null */
    private $phone;
    /** @var string|null */
    private $avatarUrl;

    public function __construct(string $userId, string $email, string $password, string $username, ?string $firstName = null, ?string $lastName = null, ?string $phone = null, ?string $avatarUrl = null)
    {
        $this->userId = $userId;
        $this->email = $email;
        $this->password = $password;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->username = $username;
        $this->phone = $phone;
        $this->avatarUrl = $avatarUrl;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }
}