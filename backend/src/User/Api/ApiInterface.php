<?php

namespace App\User\Api;

use App\User\Api\Input\CreateUserInput;
use App\User\Api\Input\GetUserInput;
use App\User\Api\Output\GetUserOutput;
use App\User\Domain\Exception\InvalidUserEmail;

interface ApiInterface
{
    /**
     * @param CreateUserInput $input
     * @throws InvalidUserEmail
     */
    public function createUser(CreateUserInput $input): void;

    /**
     * @param GetUserInput $input
     * @return GetUserOutput
     */
    public function getUser(GetUserInput $input): GetUserOutput;
}
