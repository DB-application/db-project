<?php
declare(strict_types=1);

namespace App\User\Domain\Model;

interface UserRepositoryInterface
{
    /**
     * @param string $email
     * @return User|null
     */
    public function findUserByEmail(string $email): ?User;

    /**
     * @param string $email
     * @param string $username
     * @return User|null
     */
    public function findUserByEmailAndUsername(string $email, string $username): ?User;

    /**
     * @param string $userId
     * @return User
     */
    public function findUserById(string $userId): User;

    /**
     * @param User $user
     */
    public function add(User $user): void;

    public function update(): void;
}