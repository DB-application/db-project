<?php

namespace App\User\App\Data;

interface GetUserRequestInterface
{
    /**
     * @return string|null
     */
    public function getUsernameOrEmail(): string;

    /**
     * @return string
     */
    public function getPassword(): string;
}