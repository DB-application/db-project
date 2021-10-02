<?php
declare(strict_types=1);

namespace App\User\Domain\Model;

use App\Common\Domain\Uuid;

class User
{
    /** @var Uuid */
    private $userId;
    /** @var string */
    private $email;
    /** @var string */
    private $username;
    /** @var string */
    private $password;
    /** @var string|null */
    private $name;
    /** @var string|null */
    private $lastName;
    /** @var string|null */
    private $phone;
    /** @var string|null */
    private $avatarUrl;

    public function __construct(Uuid $userId, Email $email, Password $password, string $username, ?string $name = null, ?string $lastName = null, ?string $phone = null, ?string $avatarUrl = null)
    {
        $this->userId = $userId;
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
        $this->lastName = $lastName;
        $this->username = $username;
        $this->phone = $phone;
        $this->avatarUrl = $avatarUrl;
    }

    public function getUserId(): Uuid
    {
        return $this->userId;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(Email $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(Password $password): void
    {
        $this->password = $password;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): void
    {
        $this->username = $username;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): void
    {
        $this->phone = $phone;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function setAvatarUrl(?string $avatarUrl): void
    {
        $this->avatarUrl = $avatarUrl;
    }
}