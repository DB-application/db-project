<?php

namespace App\User\App\Data;

interface GetUserRequestInterface
{
    /**
     * @return string|null
     */
    public function getEmail(): ?string;

    /**
     * @return string|null
     */
    public function getLogin(): ?string;

    /**
     * @return string
     */
    public function getPassword(): string;
}