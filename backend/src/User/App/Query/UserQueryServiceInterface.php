<?php
declare(strict_types=1);

namespace App\User\App\Query;

use App\User\App\Data\UserData;

interface UserQueryServiceInterface
{
    /**
     * @param string $email
     * @param string $password
     * @return UserData|null
     */
    public function getUserDataByEmailAndPassword(string $email, string $password): ?UserData;

    /**
     * @param string $username
     * @param string $password
     * @return UserData|null
     */
    public function getUserDataByUsernameAndPassword(string $username, string $password): ?UserData;
}