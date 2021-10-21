<?php

namespace App\Common\Security;

interface SecurityContextInterface
{
    public function getAuthenticateUserId(): ?string;
}