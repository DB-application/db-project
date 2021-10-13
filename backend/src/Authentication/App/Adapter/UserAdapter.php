<?php
declare(strict_types=1);

namespace App\Authentication\App\Adapter;

use App\User\Api\ApiInterface;
use App\User\Api\Input\AuthenticateUserInput;
use App\User\App\Data\UserData;

class UserAdapter
{
    /** @var ApiInterface */
    private $api;

    public function __construct(ApiInterface $api)
    {
        $this->api = $api;
    }

    public function authenticateUser(string $password, ?string $email, ?string $username): ?UserData
    {
        $input = new AuthenticateUserInput($password, $username, $email);
        $output = $this->api->authenticateUser($input);

        return $output->getUserData();
    }
}