<?php

namespace App\Common\Security;

use App\Common\Exception\UserNotAuthenticated;

interface SecurityContextInterface
{
    /**
     * @return string|null
     * @throws UserNotAuthenticated
     */
    public function getAuthenticatedUserId(): ?string;
}