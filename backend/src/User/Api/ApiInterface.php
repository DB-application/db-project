<?php

namespace App\User\Api;

use App\User\Api\Input\CreateUserInput;
use App\User\Domain\Exception\InvalidUserEmail;

interface ApiInterface
{
    /**
     * @param CreateUserInput $input
     * @throws InvalidUserEmail
     */
    public function createUser(CreateUserInput $input): void;
}