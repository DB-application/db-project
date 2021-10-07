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
     * @param string $password
     * @return User|null
     */
    public function findUserByEmailAndPassword(string $email, string $password): ?User;

    /**
     * @param string $username
     * @param string $password
     * @return User|null
     */
    public function findUserByUsernameAndPassword(string $username, string $password): ?User;

    /**
     * @param User $user
     */
    public function add(User $user): void;
}