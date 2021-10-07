<?php
declare(strict_types=1);

namespace App\Authentication\App\Adapter;

use App\User\Api\ApiInterface;

class UserAdapter
{
    /** @var ApiInterface */
    private $api;

    public function __construct(ApiInterface $api)
    {
        $this->api = $api;
    }

    public function authenticateUser()
    {
        $this->api->authenticateUser();
    }
}