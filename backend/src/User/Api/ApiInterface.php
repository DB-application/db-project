<?php

namespace App\User\Api;

use App\User\Api\Input\AuthenticateUserInput;
use App\User\Api\Input\CreateUserInput;
use App\User\Api\Output\AuthenticateUserOutput;
use App\User\App\Data\UserData;
use App\User\Domain\Exception\InvalidUserEmail;

interface ApiInterface
{
    /**
     * @param CreateUserInput $input
     * @throws InvalidUserEmail
     */
    public function createUser(CreateUserInput $input): void;

    /**
     * @param AuthenticateUserInput $input
     * @return AuthenticateUserOutput
     */
    public function authenticateUser(AuthenticateUserInput $input): AuthenticateUserOutput;

    /**
     * @param string $userId
     * @return UserData|null
     */
    public function getUserData(string $userId): ?UserData;
}
