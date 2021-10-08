<?php
declare(strict_types=1);

namespace App\Authentication\App\Adapter;

use App\User\Api\ApiInterface;
use App\User\Api\Input\GetUserInput;
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
        $input = new GetUserInput($password, $username, $email);
        $output = $this->api->getUser($input);

        return $output->getUserData();
    }
}